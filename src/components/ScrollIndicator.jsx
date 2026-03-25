import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const ScrollIndicator = ({ nextSection }) => {
  const handleClick = () => {
    if (nextSection) {
      document.getElementById(nextSection)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 p-2 rounded-full border transition-all duration-300 hover:bg-[#10B981]/20 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.1)]"
      style={{
        borderColor: 'rgba(16, 185, 129, 0.4)',
        color: '#10B981',
        background: 'rgba(16, 185, 129, 0.05)',
      }}
    >
      <ChevronDown size={24} />
    </motion.button>
  )
}

export default ScrollIndicator
