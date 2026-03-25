import { motion, useScroll, useSpring } from 'framer-motion'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: 'left',
        background: 'linear-gradient(to right, var(--accent), var(--accent-light))',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 100,
        transformBox: 'border-box',
      }}
    />
  )
}

export default ScrollProgress
