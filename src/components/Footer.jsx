import cvData from '../data/cv-data.json'
import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="logo-mark footer-logo" aria-hidden="true">AG</span>
          <p>
            {t.footer.builtBy} {cvData.personal.name}
          </p>
        </div>

        <div className="footer-social">
          <a
            href={cvData.personal.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href={cvData.personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href={`mailto:${cvData.personal.email}`}>
            {t.footer.email}
          </a>
          <button type="button" onClick={() => window.print()} className="footer-print">
            {t.footer.print}
          </button>
        </div>

        <p className="footer-copy">
          © {year} {cvData.personal.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
