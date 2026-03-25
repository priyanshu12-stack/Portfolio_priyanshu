import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, Play, Pause } from 'lucide-react'
import { ThemeProvider } from '@/context/ThemeContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import CursorGlow from '@/components/CursorGlow'
import SmoothScroll from '@/components/SmoothScroll'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Skills from '@/sections/Skills'
import Experience from '@/sections/Experience'
import Projects from '@/sections/Projects'
import Contact from '@/sections/Contact'
import Education from '@/sections/Education'

const App = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [autoScrolling, setAutoScrolling] = useState(false)
  const autoScrollRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-scroll logic
  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      cancelAnimationFrame(autoScrollRef.current)
      autoScrollRef.current = null
    }
    setAutoScrolling(false)
  }, [])

  const startAutoScroll = useCallback(() => {
    setAutoScrolling(true)
    const scrollSpeed = 3 
    const step = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (window.scrollY >= maxScroll) {
        stopAutoScroll()
        return
      }
      window.scrollBy(0, scrollSpeed)
      autoScrollRef.current = requestAnimationFrame(step)
    }
    autoScrollRef.current = requestAnimationFrame(step)
  }, [stopAutoScroll])

  // Stop auto-scroll if user scrolls manually (wheel or touch)
  useEffect(() => {
    if (!autoScrolling) return
    const onUserScroll = () => stopAutoScroll()
    window.addEventListener('wheel', onUserScroll, { passive: true })
    window.addEventListener('touchstart', onUserScroll, { passive: true })
    return () => {
      window.removeEventListener('wheel', onUserScroll)
      window.removeEventListener('touchstart', onUserScroll)
    }
  }, [autoScrolling, stopAutoScroll])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current)
    }
  }, [])

  return (
    <ThemeProvider>
      <SmoothScroll>
      <div className="relative" style={{ background: 'var(--bg-primary)' }}>
        {/* Global effects */}
        <ScrollProgress />
        <CursorGlow />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main>
          {/* Hero — full viewport, no section wrapper */}
          <Hero />

          {/* Alternating backgrounds */}
          <div style={{ background: 'var(--bg-secondary)' }}>
            <About />
          </div>

          <div style={{ background: 'var(--bg-primary)' }}>
            <Skills />
          </div>

          <div style={{ background: 'var(--bg-secondary)' }}>
            <Experience />
          </div>

          <div style={{ background: 'var(--bg-primary)' }}>
            <Education />
          </div>

          <div style={{ background: 'var(--bg-secondary)' }}>
            <Projects />
          </div>

          <div style={{ background: 'var(--bg-secondary)' }}>
            <Contact />
          </div>
        </main>

        {/* Footer */}
        <Footer />

        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
              style={{
                background: 'var(--accent)',
                boxShadow: '0 4px 24px rgba(124,58,237,0.4)',
              }}
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Auto-scroll play/pause button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => autoScrolling ? stopAutoScroll() : startAutoScroll()}
          className="fixed bottom-6 right-20 z-50 w-11 h-11 rounded-full hidden md:flex items-center justify-center text-white shadow-lg transition-all duration-300"
          style={{
            background: autoScrolling
              ? 'linear-gradient(135deg, #0EA5E9, #6366F1)'
              : 'linear-gradient(135deg, #10B981, #059669)',
            boxShadow: autoScrolling
              ? '0 0 20px rgba(14,165,233,0.4)'
              : '0 0 20px rgba(16,185,129,0.4)',
          }}
        >
          {autoScrolling ? <Pause size={16} /> : <Play size={16} />}
        </motion.button>
      </div>
      </SmoothScroll>
    </ThemeProvider>
  )
}

export default App
