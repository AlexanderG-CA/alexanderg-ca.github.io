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
import './styles/components.css'

export default function App() {
  useEasterEggs()

  return (
    <>
      <a href="#hem" className="skip-link">
        Hoppa till innehåll
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
