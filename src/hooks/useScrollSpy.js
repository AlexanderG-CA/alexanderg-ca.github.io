import { useState, useEffect } from 'react'

const SECTIONS = ['hem', 'om', 'kompetens', 'erfarenhet', 'projekt', 'kontakt']

export function useScrollSpy() {
  const [active, setActive] = useState('hem')

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY + 120

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i])
        if (el && el.offsetTop <= offset) {
          setActive(SECTIONS[i])
          return
        }
      }
      setActive('hem')
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return active
}
