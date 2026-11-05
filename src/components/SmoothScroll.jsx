import { useEffect } from 'react'
import Lenis from 'lenis'
import { useMotion } from '@/context/MotionContext'

// Lenis smooth scrolling — disabled entirely when motion is reduced.
const SmoothScroll = ({ children }) => {
  const { reducedMotion } = useMotion()

  useEffect(() => {
    if (reducedMotion) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    window.__lenis = lenis

    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      window.__lenis = null
    }
  }, [reducedMotion])

  return children
}

export default SmoothScroll
