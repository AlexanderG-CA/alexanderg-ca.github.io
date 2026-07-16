import { Children, cloneElement, useLayoutEffect, useRef, useCallback } from 'react'
import './ScrollStack.css'

export function ScrollStackItem({ children, itemClassName = '', index = 0 }) {
  return (
    <div
      className={`scroll-stack-card ${itemClassName}`.trim()}
      style={{ '--stack-index': index }}
    >
      {children}
    </div>
  )
}

function StickyScrollStack({
  children,
  className,
  stackPosition,
  itemStackDistance,
  childCount,
  scrollerRef,
}) {
  const enhancedChildren = Children.map(children, (child, index) => {
    if (!child) return child
    return cloneElement(child, { index })
  })

  return (
    <div
      ref={scrollerRef}
      className={`scroll-stack-scroller scroll-stack-scroller--sticky ${className}`.trim()}
      style={{
        '--stack-offset': stackPosition,
        '--stack-gap': `${itemStackDistance}px`,
        '--stack-count': childCount,
      }}
    >
      <div className="scroll-stack-inner">
        {enhancedChildren}
      </div>
    </div>
  )
}

function TransformScrollStack({
  children,
  className,
  itemDistance,
  itemScale,
  itemStackDistance,
  stackPosition,
  scaleEndPosition,
  baseScale,
  rotationAmount,
  blurAmount,
  useWindowScroll,
  onStackComplete,
  scrollerRef,
}) {
  const stackCompletedRef = useRef(false)
  const cardsRef = useRef([])
  const cardOffsetsRef = useRef([])
  const endOffsetRef = useRef(0)
  const lastTransformsRef = useRef(new Map())
  const rafRef = useRef(null)

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0
    if (scrollTop > end) return 1
    return (scrollTop - start) / (end - start)
  }, [])

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight
    }
    return parseFloat(value)
  }, [])

  const getScrollTop = useCallback(() => {
    if (useWindowScroll) return window.scrollY
    return scrollerRef.current?.scrollTop ?? 0
  }, [useWindowScroll, scrollerRef])

  const getContainerHeight = useCallback(() => {
    if (useWindowScroll) return window.innerHeight
    return scrollerRef.current?.clientHeight ?? window.innerHeight
  }, [useWindowScroll, scrollerRef])

  const measureLayout = useCallback(() => {
    const cards = cardsRef.current
    if (!cards.length) return

    cards.forEach((card) => {
      card.style.transform = 'translate3d(0, 0, 0) scale(1)'
      card.style.filter = 'none'
    })

    const scrollY = getScrollTop()
    cardOffsetsRef.current = cards.map((card) => {
      const rect = card.getBoundingClientRect()
      return rect.top + scrollY
    })

    const endElement = scrollerRef.current?.querySelector('.scroll-stack-end')
    if (endElement) {
      const rect = endElement.getBoundingClientRect()
      endOffsetRef.current = rect.top + scrollY
    }
  }, [getScrollTop, scrollerRef])

  const updateCardTransforms = useCallback(() => {
    const cards = cardsRef.current
    if (!cards.length || !cardOffsetsRef.current.length) return

    const scrollTop = getScrollTop()
    const containerHeight = getContainerHeight()
    const stackPositionPx = parsePercentage(stackPosition, containerHeight)
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight)
    const pinEnd = endOffsetRef.current - containerHeight / 2

    cards.forEach((card, i) => {
      const cardTop = cardOffsetsRef.current[i]
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i
      const triggerEnd = cardTop - scaleEndPositionPx
      const pinStart = triggerStart

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd)
      const targetScale = baseScale + i * itemScale
      const scale = 1 - scaleProgress * (1 - targetScale)
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0

      let translateY = 0
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i
      }

      card.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)}) rotate(${rotation.toFixed(2)}deg)`

      if (i === cards.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true
          onStackComplete?.()
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false
        }
      }
    })
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollTop,
    getContainerHeight,
  ])

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current !== null) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      updateCardTransforms()
    })
  }, [updateCardTransforms])

  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return undefined

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card'))
    cardsRef.current = cards

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`
      }
      card.style.willChange = 'transform'
      card.style.transformOrigin = 'top center'
      card.style.backfaceVisibility = 'hidden'
    })

    measureLayout()
    updateCardTransforms()

    scroller.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate, { passive: true })

    return () => {
      scroller.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      stackCompletedRef.current = false
      cardsRef.current = []
      cardOffsetsRef.current = []
      lastTransformsRef.current.clear()
    }
  }, [itemDistance, scheduleUpdate, measureLayout, updateCardTransforms, scrollerRef])

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" aria-hidden="true" />
      </div>
    </div>
  )
}

export default function ScrollStack({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) {
  const scrollerRef = useRef(null)
  const childCount = Children.count(children)

  if (useWindowScroll) {
    return (
      <StickyScrollStack
        scrollerRef={scrollerRef}
        className={className}
        stackPosition={stackPosition}
        itemStackDistance={itemStackDistance}
        childCount={childCount}
      >
        {children}
      </StickyScrollStack>
    )
  }

  return (
    <TransformScrollStack
      scrollerRef={scrollerRef}
      className={className}
      itemDistance={itemDistance}
      itemScale={itemScale}
      itemStackDistance={itemStackDistance}
      stackPosition={stackPosition}
      scaleEndPosition={scaleEndPosition}
      baseScale={baseScale}
      rotationAmount={rotationAmount}
      blurAmount={blurAmount}
      useWindowScroll={useWindowScroll}
      onStackComplete={onStackComplete}
    >
      {children}
    </TransformScrollStack>
  )
}
