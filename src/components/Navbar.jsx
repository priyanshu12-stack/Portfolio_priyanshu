import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { navLinks } from '@/constants'
import { personalInfo } from '@/constants'
import { useTheme } from '@/context/ThemeContext'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observers = navLinks.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0, rootMargin: "-30% 0px -30% 0px" }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b' : 'bg-transparent'
        }`}
        style={{
          background: scrolled ? 'var(--bg-primary)' : 'transparent',
          borderColor: scrolled ? 'var(--border)' : 'transparent',
          height: scrolled ? '64px' : '72px',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="text-lg font-semibold tracking-tight"
          >
            <span style={{ color: 'var(--text-primary)' }}>{personalInfo.firstName}</span>
            <span style={{ color: 'var(--accent)' }}>{personalInfo.lastName}</span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ id, title }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative text-sm font-medium transition-colors duration-200"
                style={{
                  color:
                    activeSection === id
                      ? 'var(--accent-light)'
                      : 'var(--text-secondary)',
                }}
              >
                {title}
                {activeSection === id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: 'var(--accent)' }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* CTA + Theme Toggle + Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo('contact')}
              className="hidden md:inline-flex items-center px-6 py-1.5 rounded-full text-[11px] font-semibold text-white tracking-wide transition-all duration-300 hover:scale-105 whitespace-nowrap"
              style={{
                background: 'linear-gradient(90deg, #10B981, #0EA5E9)',
                boxShadow: '0 2px 12px rgba(16, 185, 129, 0.3)',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.5)')
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(16, 185, 129, 0.3)')}
            >
              Reach Out
            </button>

            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: 'flex', color: '#FBBF24' }}
                  >
                    <Sun size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: 'flex', color: '#6D28D9' }}
                  >
                    <Moon size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-[64px] left-0 right-0 z-40 overflow-hidden border-b md:hidden"
            style={{
              background: 'var(--bg-primary)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map(({ id, title }, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(id)}
                  className="text-left py-3 text-base font-medium transition-colors duration-200 border-b last:border-0"
                  style={{
                    color:
                      activeSection === id
                        ? 'var(--accent-light)'
                        : 'var(--text-secondary)',
                    borderColor: 'var(--border)',
                  }}
                >
                  {title}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                onClick={() => scrollTo('contact')}
                className="mt-3 w-full py-3 rounded-full text-sm font-bold text-white transition-transform hover:scale-105"
                style={{ background: 'linear-gradient(90deg, #10B981, #0EA5E9)' }}
              >
                Reach Out
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
