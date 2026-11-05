import { useEffect, useRef, useState } from 'react'

// Text with the reference's brief "signal interference" flicker:
// plays once when it scrolls into view and again on hover.
const SignalText = ({ children, className = '' }) => {
  const ref = useRef(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTick((n) => n + 1)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -15% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <span
      ref={ref}
      className={`signal-text ${tick ? 'is-live' : ''} ${className}`}
      key={tick}
      onMouseEnter={() => setTick((n) => n + 1)}
    >
      {children}
    </span>
  )
}

export default SignalText
