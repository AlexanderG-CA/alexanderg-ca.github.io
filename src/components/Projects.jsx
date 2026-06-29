import { useReveal } from '../hooks/useReveal'
import { useGitHubRepos } from '../hooks/useGitHubRepos'

const LANG_COLORS = {
  'C#': '#178600',
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  CSS: '#563d7c',
  HTML: '#e34c26',
  React: '#61dafb',
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'short',
  })
}

export default function Projects() {
  const ref = useReveal()
  const { repos, loading, error } = useGitHubRepos()

  return (
    <section id="projekt" className="section projects">
      <div className="container">
        <div ref={ref} className="reveal">
          <span className="section-label">Projekt</span>
          <h2 className="section-title">Utvalda arbeten</h2>
          <p className="section-intro">
            Projekt hämtade direkt från GitHub — en levande portfolio som uppdateras i takt med att jag kodar.
          </p>
        </div>

        {loading && (
          <div className="projects-loading" role="status">
            <div className="spinner" aria-hidden="true" />
            <span>Hämtar projekt...</span>
          </div>
        )}

        {error && (
          <p className="projects-error" role="alert">
            {error}.{' '}
            <a href="https://github.com/AlexanderG-CA" target="_blank" rel="noopener noreferrer">
              Besök GitHub istället →
            </a>
          </p>
        )}

        {!loading && !error && (
          <div className="projects-grid">
            {repos.map((repo, i) => (
              <ProjectCard key={repo.id} repo={repo} delay={i % 4} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ repo, delay }) {
  const ref = useReveal()
  const langColor = LANG_COLORS[repo.language] || 'var(--accent)'

  return (
    <a
      ref={ref}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`project-card reveal reveal-delay-${delay + 1}`}
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
        {repo.description || 'Ingen beskrivning tillgänglig.'}
      </p>

      <div className="project-footer">
        {repo.language && (
          <span className="project-lang">
            <span className="project-lang-dot" style={{ background: langColor }} />
            {repo.language}
          </span>
        )}
        <span className="project-date">Uppdaterad {formatDate(repo.pushed_at)}</span>
      </div>
    </a>
  )
}
