import Navbar from './components/Navbar'
import SideLinks from './components/SideLinks'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useEasterEggs } from './hooks/useEasterEggs'
import { useLanguage } from './i18n/LanguageContext'
import './styles/components.css'

export default function App() {
  useEasterEggs()
  const { t } = useLanguage()

  return (
    <>
      <a href="#hem" className="skip-link">
        {t.skipLink}
      </a>
      <Navbar />
      <SideLinks />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
