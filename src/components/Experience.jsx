import { useReveal } from '../hooks/useReveal'
import cvData from '../data/cv-data.json'

export default function Experience() {
  const ref = useReveal()

  return (
    <section id="erfarenhet" className="section experience">
      <div className="container">
        <div ref={ref} className="reveal">
          <span className="section-label">Erfarenhet & utbildning</span>
          <h2 className="section-title">Min resa hittills</h2>
        </div>

        <div className="timeline">
          <h3 className="timeline-heading">Arbetslivserfarenhet</h3>
          {cvData.experience.map((item, i) => (
            <TimelineItem key={item.title} item={item} delay={i} type="work" />
          ))}

          <h3 className="timeline-heading timeline-heading--edu">Utbildning</h3>
          {cvData.education.map((item, i) => (
            <TimelineItem key={item.degree} item={item} delay={i} type="edu" />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ item, delay, type }) {
  const ref = useReveal()
  const isWork = type === 'work'

  return (
    <article
      ref={ref}
      className={`timeline-item reveal reveal-delay-${delay + 1}`}
    >
      <div className="timeline-marker" aria-hidden="true" />
      <div className="timeline-card">
        <div className="timeline-meta">
          <time>{item.period}</time>
          {isWork ? (
            <span className="timeline-org">{item.company}</span>
          ) : (
            <span className="timeline-org">{item.institution}</span>
          )}
        </div>
        <h4 className="timeline-title">
          {isWork ? item.title : item.degree}
        </h4>
        <p className="timeline-desc">{item.description}</p>
        {isWork && item.tags && (
          <div className="timeline-tags">
            {item.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
