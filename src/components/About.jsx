import { useReveal } from '../hooks/useReveal'
import cvData from '../data/cv-data.json'

export default function About() {
  const ref = useReveal()

  return (
    <section id="om" className="section about">
      <div className="container">
        <div ref={ref} className="about-grid reveal">
          <div className="about-header">
            <span className="section-label">Om mig</span>
            <h2 className="section-title">Utvecklare med öga för detaljer</h2>
          </div>

          <div className="about-body">
            <p className="about-lead">{cvData.about.intro}</p>
            {cvData.about.paragraphs.map((p, i) => (
              <p key={i} className="about-text">{p}</p>
            ))}

            <div className="about-cards">
              {cvData.about.highlights.map((h) => (
                <div key={h.label} className="about-card">
                  <span className="about-card-label">{h.label}</span>
                  <span className="about-card-value">{h.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
