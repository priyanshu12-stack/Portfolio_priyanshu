import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Moon, Sun } from 'lucide-react'
import { navLinks, personalInfo } from '@/constants'
import { useTheme } from '@/context/ThemeContext'
import { useMotion } from '@/context/MotionContext'
import { handleAnchor } from '@/utils/scroll'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const lastY = useRef(0)
  const { theme, toggleTheme } = useTheme()
  const { reducedMotion, toggleMotion } = useMotion()

  // Solid background after leaving the hero; hide on scroll down, reveal on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      if (y <= 400) setHidden(false)
      else if (y > lastY.current + 4) setHidden(true)
      else if (y < lastY.current - 4) setHidden(false)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section indicator.
  useEffect(() => {
    const ids = [...navLinks.map((l) => l.id), 'contact']
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  // Lock page scroll while the mobile menu is open; close on Escape.
  useEffect(() => {
    if (!menuOpen) return undefined
    window.__lenis?.stop()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.__lenis?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  useEffect(() => {
    const onResize = () => window.innerWidth > 1024 && setMenuOpen(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <>
      <header className={`nav ${scrolled || menuOpen ? 'is-scrolled' : ''} ${hidden && !menuOpen ? 'is-hidden' : ''}`}>
        <div className="wrap nav-inner">
          <a href="#top" className="wordmark" onClick={handleAnchor('top', close)} aria-label={`${personalInfo.name} — back to top`}>
            <span className="brand-symbol" aria-hidden="true">P</span>
            <span>
              {personalInfo.name}
              <small>{personalInfo.role}</small>
            </span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {navLinks.map(({ id, title }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={handleAnchor(id)}
                className={`nav-link ${active === id ? 'is-active' : ''}`}
                aria-current={active === id ? 'true' : undefined}
              >
                {title}
                {active === id && (
                  <motion.span layoutId="nav-indicator" className="indicator" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />
                )}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="nav-toggle"
              onClick={toggleMotion}
              aria-pressed={reducedMotion}
              aria-label={reducedMotion ? 'Turn animations on' : 'Turn animations off'}
            >
              <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: reducedMotion ? 'var(--faint)' : 'var(--accent)' }} />
              <span className="txt">Motion {reducedMotion ? 'off' : 'on'}</span>
            </button>
            <button
              type="button"
              className="nav-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <a href="#contact" onClick={handleAnchor('contact')} className="btn btn-primary nav-cta">
              Let&rsquo;s talk <ArrowUpRight size={15} />
            </a>
            <button
              type="button"
              className="menu-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile">
              {[...navLinks, { id: 'contact', title: 'Contact' }].map(({ id, title }, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={handleAnchor(id, close)}
                  className={active === id ? 'is-active' : ''}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span>{title}</span>
                  <span className="label">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>
            <div className="mobile-menu-foot">
              <a href={`mailto:${personalInfo.email}`} className="text-link" style={{ alignSelf: 'flex-start' }}>
                {personalInfo.email} <ArrowUpRight size={15} />
              </a>
              <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                View resume <ArrowUpRight size={15} />
              </a>
              <span className="label-sm">{personalInfo.city} · {personalInfo.availability}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
