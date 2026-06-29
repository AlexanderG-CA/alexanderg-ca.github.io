import { useScrollIdle } from '../hooks/useScrollIdle'
import cvData from '../data/cv-data.json'

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
        >
          {link.icon}
        </a>
      ))}
    </aside>
  )
}
