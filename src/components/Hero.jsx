import { lazy, Suspense, useEffect, useState } from 'react'
import cvData from '../data/cv-data.json'
import BlurText from './react-bits/BlurText'
import ShinyText from './react-bits/ShinyText'
import StarBorder from './react-bits/StarBorder'
import TiltedCard from './react-bits/TiltedCard'

const LiquidEther = lazy(() => import('./react-bits/LiquidEther'))

const HERO_ETHER_COLORS = ['#06060a', '#1a1408', '#8a5518', '#e8a849', '#f0c06a']

export default function Hero() {
  const [showEther, setShowEther] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.querySelectorAll('#hem .reveal').forEach((el) => el.classList.add('visible'))
      })
    })
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileMq = window.matchMedia(
      '(max-width: 768px), (hover: none) and (pointer: coarse)',
    )
    const update = () => setShowEther(!reduceMq.matches && !mobileMq.matches)
    update()
    reduceMq.addEventListener('change', update)
    mobileMq.addEventListener('change', update)
    return () => {
      reduceMq.removeEventListener('change', update)
      mobileMq.removeEventListener('change', update)
    }
  }, [])

  return (
    <section id="hem" className="hero section">
      {showEther && (
        <div className="hero-liquid-bg" aria-hidden="true">
          <Suspense fallback={null}>
            <LiquidEther
              className="hero-liquid-ether"
              colors={HERO_ETHER_COLORS}
              mouseForce={33}
              cursorSize={75}
              isViscous={true}
              viscous={67}
              iterationsViscous={24}
              iterationsPoisson={64}
              resolution={0.5}
              isBounce={false}
              autoDemo={false}
              autoSpeed={1}
              autoIntensity={0.1}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
            />
          </Suspense>
          <div className="hero-liquid-overlay" />
        </div>
      )}

      <div className="hero-body">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-visual reveal">
              <div className="hero-avatar-ring">
                <TiltedCard
                  imageSrc={cvData.personal.avatar}
                  altText={cvData.personal.name}
                  containerHeight="clamp(110px, 20vmin, 240px)"
                  containerWidth="clamp(110px, 20vmin, 240px)"
                  imageHeight="clamp(110px, 20vmin, 240px)"
                  imageWidth="clamp(110px, 20vmin, 240px)"
                  imageClassName="hero-avatar"
                  rotateAmplitude={10}
                  scaleOnHover={1.04}
                />
              </div>
              <div className="hero-badge">
                <span className="hero-badge-role">
                  <ShinyText text={cvData.personal.title} speed={2.4} />
                </span>
                <span className="hero-badge-loc">{cvData.personal.location}</span>
              </div>
            </div>

            <div className="hero-content">
              <p className="hero-greeting">
                <span className="hero-dot" aria-hidden="true" />
                {cvData.personal.status}
              </p>

              <h1 className="hero-title">
                <span className="hero-title-prefix">Hej, jag heter</span>{' '}
                <span className="hero-name hero-name-glow">{cvData.personal.name}</span>
              </h1>

              <p className="hero-tagline">
                <BlurText
                  text={cvData.personal.tagline}
                  delay={22}
                  animateBy="words"
                  direction="bottom"
                />
              </p>

              <div className="hero-actions">
                <StarBorder
                  as="a"
                  href="#projekt"
                  className="btn btn-primary hero-star-btn"
                  color="var(--accent)"
                  speed="5s"
                >
                  Se mina projekt
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </StarBorder>
                <a href="#kontakt" className="btn btn-ghost">
                  Kontakta mig
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#om" className="hero-scroll" aria-label="Scrolla ner">
        <span />
      </a>
    </section>
  )
}
