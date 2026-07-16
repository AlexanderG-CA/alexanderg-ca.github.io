import cvData from '../data/cv-data.json'
import SectionHeading from './react-bits/SectionHeading'
import SpotlightCard from './react-bits/SpotlightCard'
import AnimatedContent from './react-bits/AnimatedContent'

export default function Experience() {
  return (
    <section id="erfarenhet" className="section experience">
      <div className="container">
        <AnimatedContent>
          <SectionHeading label="Erfarenhet & utbildning" title="Min resa hittills" />
        </AnimatedContent>

        <div className="timeline">
          <h3 className="timeline-heading">Arbetslivserfarenhet</h3>
          {cvData.experience.map((item, i) => (
            <TimelineItem key={`${item.title}-${item.company}`} item={item} delay={i} type="work" />
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
  const isWork = type === 'work'

  return (
    <AnimatedContent delay={0.07 * delay} distance={36} className="timeline-item-wrap">
      <article className="timeline-item">
        <div className="timeline-marker" aria-hidden="true" />
        <SpotlightCard className="timeline-card">
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
        </SpotlightCard>
      </article>
    </AnimatedContent>
  )
}
