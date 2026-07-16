import BlurText from './BlurText'
import GradientText from './GradientText'

export default function SectionHeading({ label, title, intro, className = '' }) {
  return (
    <div className={`section-heading ${className}`}>
      <GradientText className="section-label-gradient" animationSpeed={10}>
        {label}
      </GradientText>
      <h2 className="section-title">
        <BlurText text={title} delay={35} animateBy="words" />
      </h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  )
}
