import { useState, useEffect } from 'react'

export function useScrollIdle(idleMs = 1000) {
  const [isIdle, setIsIdle] = useState(false)

  useEffect(() => {
    let idleTimer
    let initialTimer
    let mounted = true

    const scheduleIdle = () => {
      clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        if (mounted) setIsIdle(true)
      }, idleMs)
    }

    const onScroll = () => {
      setIsIdle(false)
      scheduleIdle()
    }

    initialTimer = window.setTimeout(() => {
      if (mounted) setIsIdle(true)
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
