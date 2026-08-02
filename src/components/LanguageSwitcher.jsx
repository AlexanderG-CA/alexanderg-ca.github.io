import { useLanguage } from '../i18n/LanguageContext'

function FlagSE({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 16 10" width="18" height="12" aria-hidden="true">
      <rect width="16" height="10" fill="#006AA7" />
      <rect x="5" width="2" height="10" fill="#FECC00" />
      <rect y="4" width="16" height="2" fill="#FECC00" />
    </svg>
  )
}

function FlagGB({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 60 30" width="18" height="12" aria-hidden="true">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0 L60 30 M60 0 L0 30" stroke="#C8102E" strokeWidth="2" />
      <path d="M30 0 V30 M0 15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0 V30 M0 15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
}

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div
      className={`lang-switcher ${className}`.trim()}
      role="group"
      aria-label={t.lang.switchTo}
    >
      <button
        type="button"
        className={`lang-btn ${lang === 'sv' ? 'lang-btn--active' : ''}`}
        onClick={() => setLang('sv')}
        aria-pressed={lang === 'sv'}
        aria-label={t.lang.sv}
      >
        <FlagSE />
        <span>Svenska</span>
      </button>
      <button
        type="button"
        className={`lang-btn ${lang === 'en' ? 'lang-btn--active' : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        aria-label={t.lang.en}
      >
        <FlagGB />
        <span>English</span>
      </button>
    </div>
  )
}
