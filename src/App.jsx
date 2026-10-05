import { useEffect, useState } from 'react'
import ScrollProgress from './components/ui/ScrollProgress'
import CustomCursor from './components/ui/CustomCursor'
import Preloader from './components/ui/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingShapes from './components/three/FloatingShapes'

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light')
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <div className="relative min-h-screen">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <ScrollProgress />
      <CustomCursor />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="relative">
        <Hero />

        <div className="relative">
          <FloatingShapes className="fixed inset-0 -z-10 pointer-events-none" />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  )
}
