import { useState, useEffect, useRef } from 'react'

export function useScrollIdle(idleMs = 1000) {
  const [isIdle, setIsIdle] = useState(false)
  const idleRef = useRef(false)

  useEffect(() => {
    let idleTimer
    let initialTimer
    let mounted = true

    const setIdle = (next) => {
      if (idleRef.current === next) return
      idleRef.current = next
      if (mounted) setIsIdle(next)
    }

    const scheduleIdle = () => {
      clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        setIdle(true)
      }, idleMs)
    }

    const onScroll = () => {
      // Hide immediately — never run exit motion during an active scroll
      setIdle(false)
      scheduleIdle()
    }

    initialTimer = window.setTimeout(() => {
      setIdle(true)
    }, 700)

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      mounted = false
      clearTimeout(idleTimer)
      clearTimeout(initialTimer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [idleMs])

  return isIdle
}
