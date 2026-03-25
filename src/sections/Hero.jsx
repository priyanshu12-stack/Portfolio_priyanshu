import { useRef, useState, useEffect, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Download } from 'lucide-react'
import { FaGithub, FaLinkedin, FaTwitter, FaDev, FaYoutube, FaInstagram } from 'react-icons/fa'
import { personalInfo, typingTexts, socialLinks } from '@/constants'
import Button from '@/components/Button'

const HeroCanvas = lazy(() => import('@/canvas/HeroCanvas'))

const iconMap = { FaGithub, FaLinkedin, FaTwitter, FaDev, FaYoutube, FaInstagram }

const TypingText = () => {
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    let timeout
    const currentText = typingTexts[textIndex]

    if (!isDeleting && charIndex < currentText.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, 80)
    } else if (!isDeleting && charIndex === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      }, 40)
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setTextIndex((prev) => (prev + 1) % typingTexts.length)
      timeout = setTimeout(() => {}, 500)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex])

  return (
    <div className="flex items-center gap-1 h-10">
      <span
        className="text-2xl md:text-3xl font-semibold"
        style={{ color: 'var(--accent-light)' }}
      >
        {displayText}
      </span>
      <span
        className="cursor-blink text-2xl md:text-3xl font-light"
        style={{ color: 'var(--accent)' }}
      >
        |
      </span>
    </div>
  )
}

const staggerVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const itemVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const Hero = () => {
  const mouse = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    mouse.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    }
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Starfield background */}
      <Suspense fallback={null}>
        <HeroCanvas mouse={mouse} />
      </Suspense>

      {/* Global Dotted Background Layer for Uniformity */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen z-0" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.12) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-[55%_45%] gap-8 items-center py-24 md:py-0 relative z-10">
        {/* Left: Text content */}
        <motion.div
          variants={staggerVariants}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-5 md:pl-16 z-10"
        >
          {/* Heading */}
          <motion.div variants={itemVariant} className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-5xl font-bold" style={{ color: '#10B981' }}>
              Hello, I'm
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
              {personalInfo.name}
            </h1>
            
            {/* Typewriter Animation Loop */}
            <div className="mt-1 md:mt-2">
              <TypingText />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariant}
            className="text-sm md:text-base max-w-xl leading-relaxed mt-2"
            style={{ color: 'var(--text-secondary)' }}
          >
             I turn complex ideas into seamless, high-impact web experiences — building modern, scalable, and lightning-fast applications that make a difference.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={itemVariant} className="flex flex-wrap gap-3 mt-4">
            <button 
              onClick={() => scrollTo('projects')} 
              className="px-6 py-2 rounded-full text-xs font-semibold text-white tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap" 
              style={{ background: 'linear-gradient(90deg, #10B981, #0EA5E9)', boxShadow: '0 2px 12px rgba(16, 185, 129, 0.3)' }}
            >
              View My Work
            </button>
            <a 
              href={personalInfo.resumeUrl} 
              download 
              className="px-6 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-105 whitespace-nowrap"
              style={{ color: 'var(--text-primary)', border: '1.5px solid var(--text-tertiary)', background: 'var(--bg-secondary)' }}
            >
              My Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariant} className="flex items-center gap-6 mt-6">
            {socialLinks.map(({ name, url, icon }) => {
              const Icon = iconMap[icon] || FaGithub
              return (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="transition-all duration-300 hover:scale-125"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#10B981')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  <Icon size={22} />
                </a>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Right: Robot Image Decoration */}
        <motion.div
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.4, duration: 1 }}
           className="hidden md:flex items-center justify-center relative w-full h-full"
        >
          {/* Backlight glow matching screenshot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full opacity-20 blur-[100px] pointer-events-none" style={{ background: '#10B981' }} />
          
          <motion.img 
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            src="/assets/robot-avatar.png" 
            alt="3D Robot Avatar" 
            className="w-[90%] max-w-[550px] object-contain drop-shadow-[0_0_40px_rgba(16,185,129,0.15)] z-10 relative"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('about')}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 p-2 rounded-full border transition-colors duration-200"
        style={{
          borderColor: 'var(--border-accent)',
          color: 'var(--accent)',
          background: 'rgba(124,58,237,0.05)',
        }}
      >
        <ChevronDown size={24} />
      </motion.button>


    </section>
  )
}

export default Hero
