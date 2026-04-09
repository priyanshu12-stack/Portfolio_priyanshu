import { motion } from 'framer-motion'
import { personalInfo } from '@/constants'
import SectionWrapper from '@/components/SectionWrapper'
import { fadeIn, staggerContainer } from '@/utils/motion'

const About = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-12">
      {/* Background glowing orbs */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(16, 185, 129, 0.15)', transform: 'translate(30%, -30%)' }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'rgba(16, 185, 129, 0.1)', transform: 'translate(-30%, 30%)' }}
      />

      <motion.div
        variants={staggerContainer()}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-4xl w-full flex flex-col gap-6 md:gap-8 z-10"
      >
        {/* Top Header Card */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
          {/* Profile Image */}
          <motion.div variants={fadeIn('right', 0)} className="shrink-0">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-105" 
                 style={{ background: 'var(--bg-card)' }}>
              <img
                src="/profile.jpg"
                alt={personalInfo.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>

          {/* Intro Text */}
          <motion.div variants={fadeIn('left', 0.1)} className="flex flex-col flex-1 text-center md:text-left pt-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight" style={{ color: '#10B981', lineHeight: 1.1 }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h2>
            <p className="text-base md:text-lg font-medium mt-1 mb-3" style={{ color: 'var(--text-secondary)' }}>
              {personalInfo.role}
            </p>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
              I build scalable, modern applications with a strong focus on clean architecture, delightful UX, and performance. My toolkit spans React, Next.js, TypeScript, Tailwind CSS, and Node.js — bringing ideas to life from concept to production with robust APIs and smooth interfaces.
            </p>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div variants={fadeIn('up', 0.2)} className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
          {[
            { label: 'Experience', value: '1+ years' },
            { label: 'Specialty', value: 'Full Stack' },
            { label: 'Focus', value: 'Performance & UX' },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center justify-center w-[140px] md:w-[160px] p-3 md:p-4 rounded-2xl backdrop-blur-md border transition-colors hover:scale-105"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border)',
              }}
            >
              <span className="text-[10px] md:text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-tertiary)' }}>
                {stat.label}
              </span>
              <span className="text-base md:text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                {stat.value}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Buttons Row */}
        <motion.div variants={fadeIn('up', 0.3)} className="flex justify-center md:justify-start gap-3 md:gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('projects')
              if (window.__lenis) window.__lenis.scrollTo(el)
              else el?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-6 py-2.5 md:px-8 md:py-3 rounded-lg font-bold transition-transform hover:scale-105 text-sm md:text-base"
            style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}
          >
            View Projects
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('contact')
              if (window.__lenis) window.__lenis.scrollTo(el)
              else el?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-6 py-2.5 md:px-8 md:py-3 rounded-lg font-bold transition-transform hover:scale-105 border text-sm md:text-base"
            style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border)'
            }}
          >
            Get in Touch
          </button>
        </motion.div>

        {/* Full Bio */}
        <motion.div variants={fadeIn('up', 0.4)} className="mt-2 md:mt-4">
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4" style={{ color: 'var(--text-primary)' }}>
            About Me
          </h3>
          <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p>
              I'm a Software Developer and ECE undergrad at BIT Mesra — passionate about building fast, resilient applications and solving complex algorithmic challenges. 
            </p>
            <p>
              My coding journey started with competitive programming, where I tackled 500+ DSA problems and earned a 1600+ LeetCode rating. Today, I channel that problem-solving mindset into engineering user-friendly products that make a genuine impact. Currently working as Tech Lead at Explorify Trips, architecting a full-stack travel marketplace.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SectionWrapper(About, 'about')
