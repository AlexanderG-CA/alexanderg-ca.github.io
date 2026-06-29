import { useEffect } from 'react'

export function useEasterEggs() {
  useEffect(() => {
    let sequence = ''
    const secret = '1337'

    const onKeyDown = (e) => {
      sequence += e.key
      if (sequence.length > secret.length) {
        sequence = sequence.slice(-secret.length)
      }
      if (sequence === secret) {
        sequence = ''
        const toast = document.createElement('div')
        toast.textContent = '🎉 Grattis — du hittade ett påskägg!'
        Object.assign(toast.style, {
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '1rem 1.5rem',
          background: 'var(--accent)',
          color: 'var(--bg-deep)',
          fontWeight: '600',
          borderRadius: '999px',
          zIndex: '9999',
          boxShadow: '0 8px 30px var(--accent-glow)',
          animation: 'toastIn 0.4s ease',
        })
        document.body.appendChild(toast)
        setTimeout(() => {
          toast.style.opacity = '0'
          toast.style.transition = 'opacity 0.4s'
          setTimeout(() => toast.remove(), 400)
        }, 3000)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
}
