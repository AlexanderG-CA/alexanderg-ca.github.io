import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function AnimatedContent({
  children,
  direction = 'vertical',
  distance = 48,
  delay = 0,
  className = '',
  as: Component = motion.div,
  viewport = { once: true, margin: '-8% 0px -8% 0px' },
}) {
  const ref = useRef(null)
  const inView = useInView(ref, viewport)
  const axis = direction === 'horizontal' ? 'x' : 'y'
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const visible = { opacity: 1, [axis]: 0 }
  const hidden = reduceMotion ? visible : { opacity: 0, [axis]: distance }

  return (
    <Component
      ref={ref}
      className={className}
      initial={hidden}
      animate={inView || reduceMotion ? visible : hidden}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }
      }
    >
      {children}
    </Component>
  )
}
