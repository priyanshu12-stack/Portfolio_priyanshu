import { motion } from 'framer-motion'
import { stats, personalInfo } from '@/constants'
import SectionWrapper from '@/components/SectionWrapper'
import StatsCard from '@/components/StatsCard'
import { textVariant, fadeIn } from '@/utils/motion'

const Stats = () => {
  return (
    <>
      <motion.div variants={textVariant(0)} className="mb-2">
        <span className="section-label">By The Numbers</span>
      </motion.div>
      <motion.h2
        variants={textVariant(0.1)}
        className="text-4xl md:text-5xl font-bold mb-12"
        style={{ color: 'var(--text-primary)' }}
      >
        Impact in <span className="gradient-text">Numbers</span>
      </motion.h2>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 150, damping: 15 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

    </>
  )
}

export default SectionWrapper(Stats, 'stats')
