import { useState } from 'react'
import cvData from '../data/cv-data.json'
import SectionHeading from './react-bits/SectionHeading'
import SpotlightCard from './react-bits/SpotlightCard'
import AnimatedContent from './react-bits/AnimatedContent'
import StarBorder from './react-bits/StarBorder'

const WEB3FORMS_ACCESS_KEY = 'e82c100d-2985-4242-95cf-d06adc25c8e4'
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
    <path d="M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 7l-10 7L2 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.047.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.795 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const PinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
    <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'submitting') return

    const form = e.currentTarget
    const data = new FormData(form)

    if (data.get('botcheck')) return

    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()

    if (!name || !email || !message) {
      setStatus('error')
      setErrorMessage('Fyll i alla fält innan du skickar.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name,
          email,
          message,
          replyto: email,
          subject: `Portfolio-kontakt från ${name}`,
          from_name: 'Alexander Gorie Portfolio',
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Kunde inte skicka meddelandet.')
      }

      form.reset()
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Något gick fel. Försök igen eller mejla mig direkt.',
      )
    }
  }

  return (
    <section id="kontakt" className="section contact">
      <div className="container">
        <div className="contact-grid">
          <AnimatedContent className="contact-info">
            <SectionHeading
              label="Kontakt"
              title="Låt oss prata"
              intro="Har du ett projekt, en praktikplats eller bara vill säga hej? Jag svarar gärna."
            />

            <div className="contact-links">
              <a href={`mailto:${cvData.personal.email}`} className="contact-link">
                <span className="contact-link-icon" aria-hidden="true">
                  <MailIcon />
                </span>
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
                <span className="contact-link-icon" aria-hidden="true">
                  <GithubIcon />
                </span>
                <span>
                  <strong>GitHub</strong>
                  <span>@{cvData.personal.github}</span>
                </span>
              </a>
              <div className="contact-link contact-link--static">
                <span className="contact-link-icon" aria-hidden="true">
                  <PinIcon />
                </span>
                <span>
                  <strong>Plats</strong>
                  <span>{cvData.personal.location}</span>
                </span>
              </div>
            </div>
          </AnimatedContent>

          <AnimatedContent delay={0.12}>
            <SpotlightCard className="contact-form-wrap">
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                {status === 'success' ? (
                  <div className="contact-success" role="status">
                    <span className="contact-success-icon" aria-hidden="true">
                      <CheckIcon />
                    </span>
                    <h3>Tack för ditt meddelande!</h3>
                    <p>
                      Jag har fått det och återkommer så snart jag kan. Du kan också nå mig via{' '}
                      <a
                        href={cvData.personal.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                      .
                    </p>
                    <button
                      type="button"
                      className="btn btn-ghost contact-reset-btn"
                      onClick={() => setStatus('idle')}
                    >
                      Skicka ett till
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      name="botcheck"
                      className="contact-honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />

                    <div className="form-row">
                      <label htmlFor="name">Namn</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Ditt namn"
                        required
                        autoComplete="name"
                        disabled={status === 'submitting'}
                      />
                    </div>
                    <div className="form-row">
                      <label htmlFor="email">E-post</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="din@email.se"
                        required
                        autoComplete="email"
                        disabled={status === 'submitting'}
                      />
                    </div>
                    <div className="form-row">
                      <label htmlFor="message">Meddelande</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Berätta om ditt projekt..."
                        required
                        disabled={status === 'submitting'}
                      />
                    </div>

                    {status === 'error' && (
                      <p className="contact-error" role="alert">
                        {errorMessage}{' '}
                        <a href={`mailto:${cvData.personal.email}`}>Mejla mig direkt →</a>
                      </p>
                    )}

                    <StarBorder
                      as="button"
                      type="submit"
                      className="btn btn-primary contact-star-btn"
                      color="var(--accent)"
                      speed="5s"
                      disabled={status === 'submitting'}
                      aria-busy={status === 'submitting'}
                    >
                      {status === 'submitting' ? 'Skickar…' : 'Skicka meddelande'}
                    </StarBorder>
                  </>
                )}
              </form>
            </SpotlightCard>
          </AnimatedContent>
        </div>
      </div>
    </section>
  )
}
