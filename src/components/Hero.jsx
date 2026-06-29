import { useEffect } from 'react'
import cvData from '../data/cv-data.json'

export default function Hero() {
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.querySelectorAll('#hem .reveal').forEach((el) => el.classList.add('visible'))
      })
    })
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section id="hem" className="hero section">
      <div className="hero-body">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-visual reveal">
              <div className="hero-avatar-ring">
                <img
                  src={cvData.personal.avatar}
                  alt={cvData.personal.name}
                  className="hero-avatar"
                  width={260}
                  height={260}
                />
              </div>
              <div className="hero-badge">
                <span className="hero-badge-role">{cvData.personal.title}</span>
                <span className="hero-badge-loc">{cvData.personal.location}</span>
              </div>
            </div>

            <div className="hero-content">
              <p className="hero-greeting reveal">
                <span className="hero-dot" aria-hidden="true" />
                Tillgänglig för nya möjligheter
              </p>

              <h1 className="hero-title reveal reveal-delay-1">
                Hej, jag heter{' '}
                <span className="hero-name">
                  {cvData.personal.name.split(' ').map((part) => (
                    <span key={part} className="hero-name-line">{part}</span>
                  ))}
                </span>
              </h1>

              <p className="hero-tagline reveal reveal-delay-2">
                {cvData.personal.tagline}
              </p>

              <div className="hero-actions reveal reveal-delay-3">
                <a href="#projekt" className="btn btn-primary">
                  Se mina projekt
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#kontakt" className="btn btn-ghost">
                  Kontakta mig
                </a>
              </div>

              <div className="hero-stats reveal reveal-delay-4">
                {cvData.about.highlights.map((h) => (
                  <div key={h.label} className="hero-stat">
                    <span className="hero-stat-value">{h.value}</span>
                    <span className="hero-stat-label">{h.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#om" className="hero-scroll" aria-label="Scrolla ner">
        <span />
      </a>
    </section>
  )
}
