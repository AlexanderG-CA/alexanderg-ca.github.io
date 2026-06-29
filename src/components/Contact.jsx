import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import cvData from '../data/cv-data.json'

export default function Contact() {
  const ref = useReveal()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="kontakt" className="section contact">
      <div className="container">
        <div className="contact-grid">
          <div ref={ref} className="contact-info reveal">
            <span className="section-label">Kontakt</span>
            <h2 className="section-title">Låt oss prata</h2>
            <p className="section-intro">
              Har du ett projekt, en praktikplats eller bara vill säga hej? Jag svarar gärna.
            </p>

            <div className="contact-links">
              <a href={`mailto:${cvData.personal.email}`} className="contact-link">
                <span className="contact-link-icon" aria-hidden="true">✉</span>
                <span>
                  <strong>E-post</strong>
                  <span>{cvData.personal.email}</span>
                </span>
              </a>
              <a
                href={cvData.personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-link-icon" aria-hidden="true">⌥</span>
                <span>
                  <strong>GitHub</strong>
                  <span>@{cvData.personal.github}</span>
                </span>
              </a>
              <div className="contact-link">
                <span className="contact-link-icon" aria-hidden="true">◎</span>
                <span>
                  <strong>Plats</strong>
                  <span>{cvData.personal.location}</span>
                </span>
              </div>
            </div>
          </div>

          <form
            className="contact-form reveal reveal-delay-2"
            onSubmit={handleSubmit}
            noValidate
          >
            {submitted ? (
              <div className="contact-success" role="status">
                <span className="contact-success-icon" aria-hidden="true">✓</span>
                <h3>Tack för ditt meddelande!</h3>
                <p>
                  Detta formulär är en demo. Skicka gärna ett mejl direkt till{' '}
                  <a href={`mailto:${cvData.personal.email}`}>{cvData.personal.email}</a>.
                </p>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <label htmlFor="name">Namn</label>
                  <input id="name" name="name" type="text" placeholder="Ditt namn" required />
                </div>
                <div className="form-row">
                  <label htmlFor="email">E-post</label>
                  <input id="email" name="email" type="email" placeholder="din@email.se" required />
                </div>
                <div className="form-row">
                  <label htmlFor="message">Meddelande</label>
                  <textarea id="message" name="message" rows={5} placeholder="Berätta om ditt projekt..." required />
                </div>
                <button type="submit" className="btn btn-primary">
                  Skicka meddelande
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
