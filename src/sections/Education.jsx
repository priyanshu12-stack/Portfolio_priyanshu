import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { education } from '@/constants'
import SectionWrapper from '@/components/SectionWrapper'
import { fadeIn } from '@/utils/motion'
import ScrollIndicator from '@/components/ScrollIndicator'

const EducationCard = ({ item, index }) => {
  const isLeft = index % 2 === 0
  
  // Custom tree variant: Cards animate downward sequentially
  const cardVariant = {
    hidden: { opacity: 0, y: -40, filter: 'blur(10px)' },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 70, damping: 15 }
    }
  }

  return (
    <motion.div
      variants={cardVariant}
      className={`relative w-full flex justify-between items-center md:mb-[7rem] ${
        isLeft ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Empty space block for alternating logic on desktop */}
      <div className="hidden md:block w-5/12" />

      {/* Central Logo Node */}
      <div 
        className="hidden md:flex absolute left-[32px] md:left-1/2 -translate-x-1/2 items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-4 z-10 overflow-hidden shadow-xl transition-transform hover:scale-110"
        style={{ borderColor: '#10B981', boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)', background: 'var(--bg-card)' }}
      >
        <img 
          src={item.iconUrl} 
          alt={item.institution}
          className="w-full h-full object-cover rounded-full p-0.5"
          onError={(e) => {
            // Fallbacks to initials if the user hasn't copied the images yet
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = `<span style="color:#10B981; font-weight:800; font-size:1.2rem;">${item.institution.slice(0, 1)}</span>`
          }}
        />
      </div>

      {/* Card Content Wrapper */}
      <div className="w-[92%] max-w-[400px] mx-auto md:mx-0 md:w-5/12 pl-0 pr-0 md:pl-0 md:pr-0">
        <div 
          className="education-card relative p-6 md:p-7 rounded-[20px] border overflow-hidden"
          style={{
            background: 'var(--bg-card)',
            borderColor: 'var(--border)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Top accent gradient strip */}
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, #10B981, #0EA5E9)' }} />

          {/* Directional Triangle */}
          <div 
            className={`hidden md:block absolute top-[28px] w-0 h-0 border-y-[12px] border-y-transparent ${
              isLeft ? 'right-[-12px] border-l-[12px] border-l-[#10B981]/20' : 'left-[-12px] border-r-[12px] border-r-[#10B981]/20'
            }`} 
          />

          <div className="flex flex-col gap-1 mb-4">
            <h3 className="text-lg md:text-2xl font-bold tracking-wide" style={{ color: '#10B981' }}>
              {item.title}
            </h3>
            <p className="text-[13px] md:text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              {item.institution}
            </p>
            <p className="text-xs tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
              {item.date}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <p className="font-bold text-[13px] md:text-base" style={{ color: 'var(--text-secondary)' }}>
              Grade: <span className="px-3 py-1 rounded-full text-[10px] md:text-xs ml-2 tracking-widest" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>{item.score}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Education = () => {
  const containerRef = useRef(null)
  
  // Track vertical scroll to dynamically draw the main green timeline line down
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="relative w-full min-h-screen py-20 flex flex-col items-center justify-center overflow-hidden z-10" id="education">
      
      {/* Background Aura */}
      <div 
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none z-0" 
        style={{ background: 'rgba(16, 185, 129, 0.05)' }}
      />

      <div className="text-center mb-20 md:mb-24 w-full px-4 flex flex-col items-center z-10">
        <motion.div variants={fadeIn('up', 0.1)} initial="initial" whileInView="animate" viewport={{ once: true }} className="flex items-center gap-4 mb-4">
          <span className="w-10 md:w-16 h-[2px] rounded-full" style={{ background: '#10B981' }} />
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-widest drop-shadow-xl"
            style={{ color: 'var(--text-primary)' }}
          >
            EDUCATION
          </h2>
          <span className="w-10 md:w-16 h-[2px] rounded-full" style={{ background: '#10B981' }} />
        </motion.div>
        
        <motion.p variants={fadeIn('up', 0.2)} initial="initial" whileInView="animate" viewport={{ once: true }} className="max-w-2xl mx-auto text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
          My education has been a journey of learning and development. Here are the details of my academic background.
        </motion.p>
      </div>

      <div ref={containerRef} className="relative w-full max-w-5xl mx-auto px-4 sm:px-8 z-10">
        {/* Faint background track for tree timeline */}
        <div className="hidden md:block absolute left-[32px] md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/10 rounded-full" />
        {/* Drawing progress bar (The Tree Line) */}
        <motion.div 
          className="hidden md:block absolute left-[32px] md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 rounded-full shadow-[0_0_10px_#10B981]"
          style={{ background: '#10B981', height }}
        />

        {/* Sequential Animation Container for Tree Nodes */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.5, delayChildren: 0.2 }
            }
          }}
          className="relative z-10 w-full flex flex-col gap-12 md:gap-0 pt-10"
        >
          {education.map((item, index) => (
            <EducationCard key={index} item={item} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Unified Scroll Down Indicator */}
      <ScrollIndicator nextSection="projects" />
    </div>
  )
}

export default SectionWrapper(Education, 'education')
