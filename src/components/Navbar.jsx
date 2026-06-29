import { useState, useEffect, useRef, useCallback } from 'react'
import { LayoutGroup, motion, AnimatePresence } from 'framer-motion'
import { useScrollSpy } from '../hooks/useScrollSpy'
import cvData from '../data/cv-data.json'

const MOBILE_QUERY = '(max-width: 1024px)'
const MORPH_MS = 1000

const LAYOUT_SPRING = {
  type: 'spring',
  stiffness: 220,
  damping: 32,
  mass: 1.15,
}

const LINKS = [
  { id: 'hem', label: 'Hem' },
  { id: 'om', label: 'Om mig' },
  { id: 'kompetens', label: 'Kompetens' },
  { id: 'erfarenhet', label: 'Erfarenhet' },
  { id: 'projekt', label: 'Projekt' },
  { id: 'kontakt', label: 'Kontakt' },
]

function getIsMobile() {
  return window.matchMedia(MOBILE_QUERY).matches
}

function NavItems({ active, onNavigate, onGithubClick }) {
  return (
    <>
      <ul>
        {LINKS.map(({ id, label }, index) => (
          <motion.li
            key={id}
            layoutId={`nav-link-${id}`}
            className="navbar-nav-item"
            style={{ '--nav-i': index }}
            transition={LAYOUT_SPRING}
          >
            <button
              type="button"
              className={active === id ? 'active' : ''}
              onClick={() => onNavigate(id)}
            >
              {label}
            </button>
          </motion.li>
        ))}
      </ul>
      <motion.a
        layoutId="nav-link-github"
        href={cvData.personal.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="navbar-cta navbar-nav-item"
        style={{ '--nav-i': LINKS.length }}
        transition={LAYOUT_SPRING}
        onClick={onGithubClick}
      >
        GitHub
      </motion.a>
    </>
  )
}

export default function Navbar() {
  const active = useScrollSpy()
  const [isMobile, setIsMobile] = useState(getIsMobile)
  const [isMorphing, setIsMorphing] = useState(false)
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [entered, setEntered] = useState(false)
  const closeTimerRef = useRef(null)
  const morphTimerRef = useRef(null)

  const resetMenu = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setOpen(false)
    setClosing(false)
    setEntered(false)
  }, [])

  const startMorph = useCallback(
    (toMobile) => {
      if (morphTimerRef.current) clearTimeout(morphTimerRef.current)
      resetMenu()
      setIsMorphing(true)
      setIsMobile(toMobile)
      morphTimerRef.current = window.setTimeout(() => {
        setIsMorphing(false)
        morphTimerRef.current = null
      }, MORPH_MS)
    },
    [resetMenu],
  )

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const onChange = (e) => startMorph(e.matches)
    mq.addEventListener('change', onChange)
    return () => {
      mq.removeEventListener('change', onChange)
      if (morphTimerRef.current) clearTimeout(morphTimerRef.current)
    }
  }, [startMorph])

  const closeMenu = () => {
    if (!open && !closing) return
    setEntered(false)
    setClosing(true)
    setOpen(false)
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = window.setTimeout(() => {
      setClosing(false)
      closeTimerRef.current = null
    }, 420)
  }

  const toggleMenu = () => {
    if (!isMobile || isMorphing) return
    if (open) closeMenu()
    else {
      setClosing(false)
      setOpen(true)
    }
  }

  const scrollToTop = () => {
    if (isMobile && open) closeMenu()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollTo = (id) => {
    closeMenu()
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 180)
  }

  useEffect(() => {
    if (!open || !isMobile || isMorphing) {
      setEntered(false)
      return
    }

    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true))
    })
    return () => cancelAnimationFrame(id)
  }, [open, isMobile, isMorphing])

  const mobileMenuVisible = isMobile && (open || closing)
  const navClass = [
    'navbar-nav',
    isMobile && entered ? 'open' : '',
    isMobile && closing ? 'closing' : '',
    isMobile && isMorphing ? 'navbar-nav--morph' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header
      className={`navbar ${entered && isMobile ? 'navbar--open' : ''} ${isMorphing ? 'navbar--morphing' : ''}`}
    >
      <div className="container navbar-inner">
        <button
          className="navbar-logo"
          onClick={scrollToTop}
          aria-label="Tillbaka till startsidan"
        >
          <span className="navbar-logo-mark">AG</span>
          <span className="navbar-logo-text">{cvData.personal.name.split(' ')[0]}</span>
        </button>

        <LayoutGroup id="navbar-layout">
          <AnimatePresence mode="popLayout">
            {isMobile && (
              <motion.button
                key="navbar-toggle"
                className={`navbar-toggle ${open ? 'open' : ''}`}
                onClick={toggleMenu}
                aria-label={open ? 'Stäng meny' : 'Öppna meny'}
                aria-expanded={open}
                aria-controls="mobile-nav"
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ type: 'spring', stiffness: 260, damping: 32, mass: 1 }}
              >
                <span />
                <span />
                <span />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence mode="popLayout" initial={false}>
            {!isMobile ? (
              <motion.nav
                key="desktop-nav"
                className="navbar-nav navbar-nav--desktop"
                aria-label="Huvudnavigering"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
              >
                <NavItems
                  active={active}
                  onNavigate={scrollTo}
                  onGithubClick={() => {}}
                />
              </motion.nav>
            ) : (
              <motion.nav
                key="mobile-nav"
                id="mobile-nav"
                className={navClass}
                aria-label="Huvudnavigering"
                aria-hidden={!mobileMenuVisible && !isMorphing}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
              >
                <NavItems
                  active={active}
                  onNavigate={scrollTo}
                  onGithubClick={closeMenu}
                />
              </motion.nav>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </header>
  )
}
