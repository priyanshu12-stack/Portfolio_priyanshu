import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -300, y: -300 })
  const [isMobile, setIsMobile] = useState(false)

  const springX = useSpring(pos.x, { stiffness: 100, damping: 20 })
  const springY = useSpring(pos.y, { stiffness: 100, damping: 20 })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  if (isMobile) return null

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: springX,
        top: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.06,
        background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
      }}
    />
  )
}

export default CursorGlow
