import { motion } from 'framer-motion'
import { skillCategories } from '@/constants'
import SectionWrapper from '@/components/SectionWrapper'
import { fadeIn, staggerContainer } from '@/utils/motion'
import * as Si from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import ScrollIndicator from '@/components/ScrollIndicator'

const iconLookup = { ...Si, SiAmazonaws: FaAws }

const SkillBadge = ({ skill }) => {
  const Icon = iconLookup[skill.icon]
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="skill-badge flex items-center gap-2 px-4 py-2 md:px-4 md:py-2.5 rounded-xl border cursor-pointer"
    >
      {Icon ? (
        <Icon style={{ color: skill.color, fontSize: 20 }} className="shrink-0" />
      ) : (
        <span style={{ color: skill.color, fontSize: 16 }} className="shrink-0">?</span>
      )}
      <span className="font-semibold text-xs md:text-sm tracking-wide whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
        {skill.name}
      </span>
    </motion.div>
  )
}

const Skills = () => {
  return (
    <div className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-10 mb-20 md:mb-32 z-10">
      {/* Subtle background glow matching theme */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none" 
        style={{ background: 'rgba(16, 185, 129, 0.12)' }}
      />

      <motion.div
        variants={staggerContainer()}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full max-w-5xl flex flex-col gap-6 md:gap-10 z-10"
      >
        <div className="text-center px-2 md:px-4 w-full flex flex-col items-center mb-4 md:mb-0">
          <motion.div variants={fadeIn('up', 0.1)} initial="initial" whileInView="animate" viewport={{ once: true }} className="flex items-center gap-2 md:gap-4 mb-4 md:mb-5">
            <span className="w-6 md:w-16 h-[2px] rounded-full" style={{ background: '#10B981' }} />
            <h2
              className="text-[28px] md:text-5xl font-black uppercase tracking-widest"
              style={{ color: 'var(--text-primary)' }}
            >
              SKILLS
            </h2>
            <span className="w-6 md:w-16 h-[2px] rounded-full" style={{ background: '#10B981' }} />
          </motion.div>
          <motion.p
            variants={fadeIn('up', 0.2)}
            className="text-sm md:text-base md:text-lg max-w-3xl mx-auto opacity-80"
            style={{ color: 'var(--text-secondary)' }}
          >
            A collection of my technical skills and expertise honed through various projects and experiences.
          </motion.p>
        </div>

        {/* Skill categories 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full px-4 md:px-0">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              variants={fadeIn('up', 0.3 + catIdx * 0.1)}
              className="skill-category p-5 md:p-6 lg:p-8 rounded-[2rem] border relative overflow-hidden group flex flex-col h-full"
            >
              <h3
                className="text-xl md:text-2xl font-bold mb-5 md:mb-8 text-center tracking-wide shrink-0"
                style={{ color: '#10B981' }}
              >
                {category.title}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 flex-1 items-center content-center">
                {category.skills.map((skill) => (
                  <SkillBadge key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Unified Scroll Down Indicator */}
      <ScrollIndicator nextSection="experience" />
    </div>
  )
}

export default SectionWrapper(Skills, 'skills')
