import { useEffect, useState } from 'react'
import { useScrollIdle } from '../hooks/useScrollIdle'
import cvData from '../data/cv-data.json'
import ShinyText from './react-bits/ShinyText'

const LINKS = [
  {
    href: cvData.personal.linkedinUrl,
    label: 'LinkedIn-profil',
    title: 'LinkedIn',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: cvData.personal.githubUrl,
    label: 'GitHub-profil',
    title: 'GitHub',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.047.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.795 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    href: cvData.personal.certificateUrl,
    label: 'Examensbevis från Chas Academy',
    title: 'Examensbevis',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function SideLinks() {
  const isIdle = useScrollIdle(1000)
  const [shinyDisabled, setShinyDisabled] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setShinyDisabled(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return (
    <aside
      className={`side-links ${isIdle ? 'side-links--visible' : ''}`}
      aria-label="Snabblänkar"
      aria-hidden={!isIdle}
    >
      {LINKS.map((link, index) => (
        <a
          key={link.title}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="side-link"
          style={{ '--side-i': index }}
          aria-label={link.label}
          title={link.title}
          tabIndex={isIdle ? undefined : -1}
        >
          <span className="side-link-iconBox" aria-hidden="true">
            <span className="side-link-icon" aria-hidden="true">
              {link.icon}
            </span>
          </span>
          <span className="side-link-text" aria-hidden="true">
            <ShinyText
              text={link.title}
              speed={2.2}
              disabled={shinyDisabled || !isIdle}
              className="side-link-shiny"
            />
          </span>
        </a>
      ))}
    </aside>
  )
}
