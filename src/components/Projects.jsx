import { useGitHubRepos } from '../hooks/useGitHubRepos'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeading from './react-bits/SectionHeading'
import SpotlightCard from './react-bits/SpotlightCard'
import AnimatedContent from './react-bits/AnimatedContent'

const LANG_COLORS = {
  'C#': '#178600',
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  CSS: '#563d7c',
  HTML: '#e34c26',
  React: '#61dafb',
}

const PROJECT_VIEWPORT = { once: true, margin: '0px 0px -22% 0px', amount: 0.2 }

export default function Projects() {
  const { lang, t } = useLanguage()
  const { repos, loading, error } = useGitHubRepos()
  const locale = lang === 'en' ? 'en-GB' : 'sv-SE'

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
    })

  return (
    <section id="projekt" className="section projects">
      <div className="container">
        <AnimatedContent>
          <SectionHeading
            label={t.projects.label}
            title={t.projects.title}
            intro={t.projects.intro}
          />
        </AnimatedContent>

        {loading && (
          <div className="projects-loading" role="status">
            <div className="spinner" aria-hidden="true" />
            <span>{t.projects.loading}</span>
          </div>
        )}

        {error && (
          <p className="projects-error" role="alert">
            {t.projects.error}.{' '}
            <a href="https://github.com/AlexanderG-CA" target="_blank" rel="noopener noreferrer">
              {t.projects.visitGithub}
            </a>
          </p>
        )}

        {!loading && !error && (
          <div className="projects-grid">
            {repos.map((repo) => (
              <ProjectCard
                key={repo.id}
                repo={repo}
                formatDate={formatDate}
                noDescription={t.projects.noDescription}
                updatedLabel={t.projects.updated}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ repo, formatDate, noDescription, updatedLabel }) {
  const langColor = LANG_COLORS[repo.language] || 'var(--accent)'

  return (
    <AnimatedContent
      className="project-card-anim"
      delay={0}
      distance={36}
      viewport={PROJECT_VIEWPORT}
    >
      <SpotlightCard className="project-card-wrap">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card"
        >
          <div className="project-card-top">
            <svg className="project-icon" width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8z"/>
            </svg>
            <svg className="project-external" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3h7v7M13 3L7 9M10 13H3V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h3 className="project-name">{repo.name}</h3>
          <p className="project-desc">
            {repo.description || noDescription}
          </p>

          <div className="project-footer">
            {repo.language && (
              <span className="project-lang">
                <span className="project-lang-dot" style={{ background: langColor }} />
                {repo.language}
              </span>
            )}
            <span className="project-date">{updatedLabel} {formatDate(repo.pushed_at)}</span>
          </div>
        </a>
      </SpotlightCard>
    </AnimatedContent>
  )
}
