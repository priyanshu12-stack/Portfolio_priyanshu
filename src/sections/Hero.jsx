import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { personalInfo, roles } from '@/constants'
import { useMotion } from '@/context/MotionContext'
import { RevealLines } from '@/components/Reveal'
import { handleAnchor } from '@/utils/scroll'

const EASE = [0.22, 1, 0.36, 1]

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
})

// Slow-turning orbital linework behind the hero — pure SVG, no WebGL.
const Orbits = () => (
  <div className="hero-orbits" aria-hidden="true">
    <svg viewBox="0 0 600 600" fill="none">
      <g className="orbit-spin">
        <circle cx="300" cy="300" r="290" stroke="var(--line)" />
        <circle cx="300" cy="300" r="214" stroke="var(--line)" strokeDasharray="2 7" />
        <circle cx="590" cy="300" r="4" fill="var(--accent)" />
        <circle cx="86" cy="300" r="3" fill="var(--muted)" />
      </g>
      <g className="orbit-spin rev">
        <ellipse cx="300" cy="300" rx="250" ry="120" stroke="var(--line-strong)" transform="rotate(-28 300 300)" />
        <ellipse cx="300" cy="300" rx="250" ry="120" stroke="var(--line)" transform="rotate(32 300 300)" />
        <circle cx="300" cy="180" r="3.5" fill="var(--ink)" transform="rotate(-28 300 300)" />
      </g>
      <circle cx="300" cy="300" r="120" stroke="var(--line)" />
      <path d="M300 280v40M280 300h40" stroke="var(--accent)" />
    </svg>
  </div>
)

// Cycles through the roles Priyanshu is targeting, with a masked vertical slide.
const RoleRotator = () => {
  const [i, setI] = useState(0)
  const { reducedMotion } = useMotion()
  useEffect(() => {
    if (reducedMotion) return undefined
    const id = setInterval(() => setI((n) => (n + 1) % roles.length), 2600)
    return () => clearInterval(id)
  }, [reducedMotion])
  return (
    <span className="role-rotator" aria-label={roles.join(', ')}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={roles[i]}
          aria-hidden="true"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const Hero = () => {
  const ref = useRef(null)
  const [showColor, setShowColor] = useState(false) // tap toggle for touch devices
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '-4%'])
  const frameY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section id="top" ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero-backdrop" />
      <Orbits />

      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <motion.div className="hero-topline" {...fadeUp(0.1)}>
          <span className="label">
            <span style={{ color: 'var(--ink)' }}>Software.</span> AI/ML. Data. Open source.
          </span>
          <span className="label hide-sm">Based in {personalInfo.city}</span>
        </motion.div>

        <div className="hero-grid">
          <div>
            <motion.div className="hero-kicker" {...fadeUp(0.2)}>
              <span className="tiny-cross" aria-hidden="true">+</span>
              <RoleRotator />
              <span className="label hide-sm">· {personalInfo.college}</span>
            </motion.div>

            <RevealLines
              as="h1"
              id="hero-title"
              className="display hero-name"
              animateOnMount
              delay={0.25}
              stagger={0.12}
              lines={[
                <>{personalInfo.firstName}</>,
                <>
                  {personalInfo.middleName} <em>{personalInfo.lastName}</em>
                  <span className="accent-dot">.</span>
                </>,
              ]}
            />

            <motion.p className="lead hero-description" {...fadeUp(0.65)}>
              {personalInfo.heroIntro}
            </motion.p>

            <motion.div className="hero-ctas" {...fadeUp(0.78)}>
              <a href="#work" onClick={handleAnchor('work')} className="btn btn-primary btn-down">
                Explore my work <ArrowDown size={16} />
              </a>
              <a href="#contact" onClick={handleAnchor('contact')} className="btn btn-ghost">
                Start a conversation <ArrowUpRight size={16} />
              </a>
            </motion.div>
          </div>

          <motion.figure
            className="hero-portrait"
            style={{ y: frameY, margin: 0 }}
            initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.3, delay: 0.35, ease: EASE }}
          >
            <div className="portrait-stage">
              <span className="portrait-glow" aria-hidden="true" />
              <motion.div
                className={`portrait-figure ${showColor ? 'is-color' : ''}`}
                style={{ y: imgY }}
                onClick={() => setShowColor((c) => !c)}
              >
                <img
                  className="portrait-cutout bw"
                  src="/assets/priyanshu-photo-bw.webp"
                  alt={`Portrait of ${personalInfo.name}`}
                  width="918"
                  height="1086"
                  fetchpriority="high"
                />
                <img
                  className="portrait-cutout color"
                  src="/assets/priyanshu-photo.webp"
                  alt=""
                  aria-hidden="true"
                  width="918"
                  height="1086"
                  loading="lazy"
                />
              </motion.div>
              <figcaption className="portrait-caption">
                <span className="live-dot" />
                <span className="label-sm">{personalInfo.currentRole}</span>
              </figcaption>
            </div>
            <div className="portrait-meta">
              <span className="label-sm">
                <span className="coordinate-line" />
                23.41° N, 85.44° E
              </span>
              <span className="label-sm">CGPA {personalInfo.cgpa}</span>
            </div>
          </motion.figure>
        </div>

        <motion.div className="hero-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.1 }}>
          <a href="#about" onClick={handleAnchor('about')} className="scroll-cue label">
            <span className="scroll-line" aria-hidden="true" />
            Scroll to discover
          </a>
          <span className="label hero-status"><span className="live-dot" /> {personalInfo.availability}</span>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
