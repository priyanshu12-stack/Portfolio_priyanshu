import { createContext, useContext, useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'

const STORAGE_KEY = 'portfolio-reduced-motion'

const MotionContext = createContext({ reducedMotion: false, toggleMotion: () => {} })

const readStored = () => {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === null ? null : v === 'true'
  } catch {
    return null
  }
}

const systemPrefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const MotionProvider = ({ children }) => {
  // An explicit choice (via the MOTION toggle) wins; otherwise follow the OS setting.
  const [reducedMotion, setReducedMotion] = useState(() => readStored() ?? systemPrefersReduced())

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reducedMotion)
  }, [reducedMotion])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => {
      if (readStored() === null) setReducedMotion(e.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggleMotion = () =>
    setReducedMotion((prev) => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_KEY, String(next))
      } catch {
        /* storage unavailable — keep the in-memory choice */
      }
      return next
    })

  return (
    <MotionContext.Provider value={{ reducedMotion, toggleMotion }}>
      <MotionConfig reducedMotion={reducedMotion ? 'always' : 'never'}>{children}</MotionConfig>
    </MotionContext.Provider>
  )
}

export const useMotion = () => useContext(MotionContext)
