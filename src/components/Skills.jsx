import cvData from '../data/cv-data.json'
import SectionHeading from './react-bits/SectionHeading'
import AnimatedContent from './react-bits/AnimatedContent'
import ScrollStack, { ScrollStackItem } from './react-bits/ScrollStack'

const skillGroups = cvData.skills.filter((group) => group.category !== 'Språk')

export default function Skills() {
  return (
    <section id="kompetens" className="section skills">
      <div className="container">
        <AnimatedContent>
          <SectionHeading
            label="Kompetens"
            title="Tekniker jag arbetar med"
            intro="Kompetenser från Chas Academy, LIA och projekt — backend, frontend, tillgänglighet och agilt arbetssätt."
          />
        </AnimatedContent>
      </div>

      <ScrollStack
        className="skills-scroll-stack skills-scroll-stack--fullscreen"
        useWindowScroll
        itemDistance={0}
        itemStackDistance={14}
        baseScale={0.98}
        itemScale={0.006}
        blurAmount={0}
        stackPosition="15%"
      >
        {skillGroups.map((group) => (
          <ScrollStackItem key={group.category} itemClassName="skill-stack-card">
            <div className="skill-stack-card__inner container">
              <h3 className="skill-card-title">{group.category}</h3>
              <ul className="skill-list">
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="tag">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  )
}
