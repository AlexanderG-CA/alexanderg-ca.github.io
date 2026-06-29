import cvData from '../data/cv-data.json'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">AG</span>
          <p>
            Designad & byggd av {cvData.personal.name}
          </p>
        </div>

        <div className="footer-social">
          <a
            href={cvData.personal.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            GitHub
          </a>
          <a href={`mailto:${cvData.personal.email}`} aria-label="E-post">
            E-post
          </a>
          <button onClick={() => window.print()} className="footer-print">
            Skriv ut CV
          </button>
        </div>

        <p className="footer-copy">
          © {year} {cvData.personal.name}. Alla rättigheter förbehållna.
        </p>
      </div>
    </footer>
  )
}
