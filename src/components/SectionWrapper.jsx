import { motion } from 'framer-motion'
import { staggerContainer } from '@/utils/motion'

const SectionWrapper = (Component, idName) => {
  const HOC = () => (
    <motion.section
      variants={staggerContainer(0.1, 0.1)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      className="relative py-20 md:py-24 overflow-hidden"
      id={idName}
    >
      <div className="max-w-7xl mx-auto px-6">
        <Component />
      </div>
    </motion.section>
  )

  HOC.displayName = `SectionWrapper(${Component.displayName || Component.name || 'Component'})`
  return HOC
}

export default SectionWrapper
