import { motion, useScroll, useSpring } from 'framer-motion'
import { ThemeProvider } from '@/context/ThemeContext'
import { MotionProvider } from '@/context/MotionContext'
import SmoothScroll from '@/components/SmoothScroll'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProofStrip from '@/components/ProofStrip'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Projects from '@/sections/Projects'
import Skills from '@/sections/Skills'
import Experience from '@/sections/Experience'
import Education from '@/sections/Education'
import Contact from '@/sections/Contact'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}

const App = () => (
  <ThemeProvider>
    <MotionProvider>
      <SmoothScroll>
        <a href="#main" className="skip-link">Skip to content</a>
        <ScrollProgress />
        <Navbar />
        <main id="main">
          <Hero />
          <ProofStrip />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Education />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </MotionProvider>
  </ThemeProvider>
)

export default App
