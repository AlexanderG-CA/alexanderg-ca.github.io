import { useReveal } from '../hooks/useReveal'
import cvData from '../data/cv-data.json'

export default function Skills() {
  const ref = useReveal()

  return (
    <section id="kompetens" className="section skills">
      <div className="container">
        <div ref={ref} className="reveal">
          <span className="section-label">Kompetens</span>
          <h2 className="section-title">Tekniker jag arbetar med</h2>
          <p className="section-intro">
            En blandning av backend och frontend — med verktyg jag använder dagligen i projekt och utbildning.
          </p>
        </div>

        <div className="skills-grid">
          {cvData.skills.map((group, i) => (
            <SkillCard key={group.category} group={group} delay={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCard({ group, delay }) {
  const ref = useReveal()

  return (
    <div
      ref={ref}
      className={`skill-card reveal reveal-delay-${delay + 1}`}
    >
      <h3 className="skill-card-title">{group.category}</h3>
      <ul className="skill-list">
        {group.items.map((item) => (
          <li key={item}>
            <span className="tag">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
