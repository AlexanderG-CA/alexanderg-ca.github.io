import { useLanguage } from '../i18n/LanguageContext'
import SectionHeading from './react-bits/SectionHeading'
import SpotlightCard from './react-bits/SpotlightCard'
import AnimatedContent from './react-bits/AnimatedContent'

export default function About() {
  const { t } = useLanguage()
  const about = t.about

  return (
    <section id="om" className="section about">
      <div className="container">
        <div className="about-grid">
          <AnimatedContent className="about-header">
            <SectionHeading label={about.label} title={about.headline} />
          </AnimatedContent>

          <AnimatedContent className="about-body" delay={0.1}>
            <p className="about-lead">{about.intro}</p>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="about-text">{p}</p>
            ))}

            <div className="about-cards">
              {about.highlights.map((h, i) => (
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
