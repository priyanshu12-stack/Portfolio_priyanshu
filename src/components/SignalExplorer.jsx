import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { perspectives } from '@/constants'
import { useMotion } from '@/context/MotionContext'
import { handleAnchor } from '@/utils/scroll'
import SignalVisual from '@/components/SignalVisual'
import SignalText from '@/components/SignalText'

const MODES = { build: 'structure', learn: 'intelligence', data: 'signal', share: 'community' }
const EASE = [0.22, 1, 0.36, 1]

// Tabbed "perspective" explorer modelled on the reference's signal explorer.
// Auto-advances until the visitor picks a tab.
const SignalExplorer = () => {
  const [index, setIndex] = useState(0)
  const [auto, setAuto] = useState(true)
  const { reducedMotion } = useMotion()
  const rootRef = useRef(null)
  const p = perspectives[index]

  useEffect(() => {
    if (!auto || reducedMotion) return undefined
    let inView = false
    const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting))
    io.observe(rootRef.current)
    const id = setInterval(() => inView && setIndex((i) => (i + 1) % perspectives.length), 5200)
    return () => {
      clearInterval(id)
      io.disconnect()
    }
  }, [auto, reducedMotion])

  const choose = (i) => {
    setAuto(false)
    setIndex(i)
  }

  const onKeyDown = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (index + (e.key === 'ArrowRight' ? 1 : -1) + perspectives.length) % perspectives.length
    choose(next)
    rootRef.current.querySelectorAll('.signal-options button')[next]?.focus()
  }

  return (
    <div className="signal-explorer" ref={rootRef}>
      <div className="signal-topline">
        <span className="label-sm">Four disciplines. One engineer.</span>
        <span className="label-sm" aria-hidden="true">
          0{index + 1} / 0{perspectives.length}
        </span>
      </div>

      <div className="signal-visual">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.key}
            className="signal-canvas"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <SignalVisual mode={MODES[p.key]} />
          </motion.div>
        </AnimatePresence>
        <span className="signal-center-label" key={p.label}>
          <SignalText>{p.label}</SignalText>
        </span>
        {auto && !reducedMotion && <span className="signal-progress" key={`bar-${index}`} aria-hidden="true" />}
      </div>

      <div className="signal-options" role="tablist" aria-label="Explore my disciplines" onKeyDown={onKeyDown}>
        {perspectives.map((item, i) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            id={`tab-${item.key}`}
            aria-selected={i === index}
            aria-controls="signal-story"
            tabIndex={i === index ? 0 : -1}
            onClick={() => choose(i)}
          >
            {item.tab}
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>

      <div className="signal-story" id="signal-story" role="tabpanel" aria-labelledby={`tab-${p.key}`} aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <span className="label-sm accent">{p.role}</span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <a
              className="text-link"
              href={p.link.href}
              {...(p.link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : { onClick: handleAnchor(p.link.href.slice(1)) })}
            >
              {p.link.text} <span aria-hidden="true">↗</span>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="signal-hint label-sm">Choose a perspective.</p>
    </div>
  )
}

export default SignalExplorer
