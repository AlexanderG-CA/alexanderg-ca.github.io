import cvData from '../data/cv-data.json'
import SectionHeading from './react-bits/SectionHeading'
import SpotlightCard from './react-bits/SpotlightCard'
import AnimatedContent from './react-bits/AnimatedContent'

export default function About() {
  return (
    <section id="om" className="section about">
      <div className="container">
        <div className="about-grid">
          <AnimatedContent className="about-header">
            <SectionHeading label="Om mig" title={cvData.about.headline} />
          </AnimatedContent>

          <AnimatedContent className="about-body" delay={0.1}>
            <p className="about-lead">{cvData.about.intro}</p>
            {cvData.about.paragraphs.map((p, i) => (
              <p key={i} className="about-text">{p}</p>
            ))}

            <div className="about-cards">
              {cvData.about.highlights.map((h, i) => (
                <AnimatedContent key={h.label} delay={0.08 * i} distance={32}>
                  <SpotlightCard className="about-card">
                    <span className="about-card-label">{h.label}</span>
                    <span className="about-card-value">{h.value}</span>
                  </SpotlightCard>
                </AnimatedContent>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  )
}
