import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { FolderKanban, Calendar, GitCommit, Code2 } from 'lucide-react'

const iconMap = {
  FolderCode: FolderKanban,
  Calendar,
  GitCommit,
  Code2,
}

const StatsCard = ({ value, suffix, label, icon }) => {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const rafRef = useRef(null)
  const Icon = iconMap[icon] || Code2

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const start = performance.now()
    const animate = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, value])

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center p-6 rounded-2xl border card-hover"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
      <Icon size={32} style={{ color: 'var(--accent)' }} className="mb-3" />
      <div className="flex items-end gap-1">
        <span
          className="text-5xl font-extrabold leading-none"
          style={{ color: 'var(--text-primary)' }}
        >
          {count}
        </span>
        <span
          className="text-3xl font-bold leading-tight mb-1"
          style={{ color: 'var(--accent)' }}
        >
          {suffix}
        </span>
      </div>
      <p className="mt-2 text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </p>
    </div>
  )
}

export default StatsCard
