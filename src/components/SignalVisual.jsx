import { useEffect, useRef } from 'react'
import { useMotion } from '@/context/MotionContext'

// Canvas "signal" art for the perspective explorer.
// Modes: structure (nested frames) · intelligence (graph network)
//        signal (layered waveforms) · community (orbits)

const ACCENT = [255, 140, 89]

const readInk = () => {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#f1eee8'
  const n = parseInt(v.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`

// Fixed pseudo-random graph so it doesn't jump between renders.
const NODES = Array.from({ length: 22 }, (_, i) => {
  const a = i * 2.399963
  const r = 0.18 + 0.78 * Math.sqrt((i + 0.5) / 22)
  return { x: Math.cos(a) * r, y: Math.sin(a) * r * 0.78, p: (i * 0.37) % 1 }
})
const EDGES = []
NODES.forEach((n, i) => {
  NODES.map((m, j) => ({ j, d: Math.hypot(n.x - m.x, n.y - m.y) }))
    .filter((e) => e.j > i)
    .sort((a, b) => a.d - b.d)
    .slice(0, 2)
    .forEach((e) => EDGES.push([i, e.j]))
})

const draw = {
  structure(ctx, w, h, t, ink) {
    const cx = w / 2, cy = h / 2, s = Math.min(w, h) * 0.36
    for (let i = 0; i < 6; i++) {
      const k = 1 - i * 0.16
      const rot = Math.sin(t * 0.4 + i * 0.5) * 0.12 * (i % 2 ? 1 : -1)
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(rot)
      ctx.strokeStyle = i === 0 ? rgba(ACCENT, 0.75) : rgba(ink, 0.12 + i * 0.07)
      ctx.lineWidth = 1
      ctx.strokeRect(-s * k, -s * k * 0.78, s * k * 2, s * k * 1.56)
      ctx.restore()
    }
    ctx.fillStyle = rgba(ACCENT, 0.9)
    ctx.fillRect(cx - 2, cy - 2, 4, 4)
  },
  intelligence(ctx, w, h, t, ink) {
    const cx = w / 2, cy = h / 2, s = Math.min(w * 0.42, h * 0.55)
    const pt = (n) => [cx + n.x * s + Math.sin(t * 0.6 + n.p * 6) * 4, cy + n.y * s + Math.cos(t * 0.5 + n.p * 6) * 4]
    ctx.lineWidth = 1
    EDGES.forEach(([a, b], k) => {
      const [x1, y1] = pt(NODES[a]); const [x2, y2] = pt(NODES[b])
      ctx.strokeStyle = rgba(ink, 0.14)
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
      const f = (t * 0.35 + k * 0.137) % 1 // message passing along edges
      ctx.fillStyle = rgba(ACCENT, 0.9 * Math.sin(f * Math.PI))
      ctx.beginPath(); ctx.arc(x1 + (x2 - x1) * f, y1 + (y2 - y1) * f, 1.8, 0, Math.PI * 2); ctx.fill()
    })
    NODES.forEach((n, i) => {
      const [x, y] = pt(n)
      const pulse = 0.5 + 0.5 * Math.sin(t * 1.4 + n.p * 9)
      ctx.fillStyle = i % 5 === 0 ? rgba(ACCENT, 0.6 + pulse * 0.4) : rgba(ink, 0.45 + pulse * 0.4)
      ctx.beginPath(); ctx.arc(x, y, i % 5 === 0 ? 4 : 2.6, 0, Math.PI * 2); ctx.fill()
    })
  },
  signal(ctx, w, h, t, ink) {
    const cy = h / 2
    for (let l = 0; l < 5; l++) {
      ctx.beginPath()
      for (let x = 0; x <= w; x += 4) {
        const u = x / w
        const env = Math.sin(u * Math.PI)
        const y = cy + env * (Math.sin(u * 14 + t * (1 + l * 0.3) + l) * 26 + Math.sin(u * 37 - t * 2 + l * 2) * (l === 0 ? 4 : 10)) * (1 - l * 0.12)
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.strokeStyle = l === 0 ? rgba(ACCENT, 0.85) : rgba(ink, 0.08 + (4 - l) * 0.05)
      ctx.lineWidth = l === 0 ? 1.6 : 1
      ctx.stroke()
    }
    ctx.strokeStyle = rgba(ink, 0.12)
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke()
  },
  community(ctx, w, h, t, ink) {
    const cx = w / 2, cy = h / 2, s = Math.min(w, h) * 0.42
    ;[0.35, 0.62, 0.9].forEach((r, ri) => {
      ctx.strokeStyle = rgba(ink, 0.1)
      ctx.beginPath(); ctx.ellipse(cx, cy, s * r * 1.25, s * r * 0.8, 0, 0, Math.PI * 2); ctx.stroke()
      const count = 4 + ri * 4
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + t * (0.25 - ri * 0.06) * (ri % 2 ? -1 : 1)
        const x = cx + Math.cos(a) * s * r * 1.25, y = cy + Math.sin(a) * s * r * 0.8
        ctx.strokeStyle = rgba(ink, 0.05)
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke()
        ctx.fillStyle = (i + ri) % 4 === 0 ? rgba(ACCENT, 0.9) : rgba(ink, 0.6)
        ctx.beginPath(); ctx.arc(x, y, 2.6, 0, Math.PI * 2); ctx.fill()
      }
    })
    ctx.fillStyle = rgba(ACCENT, 1)
    ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill()
  },
}

const SignalVisual = ({ mode }) => {
  const ref = useRef(null)
  const { reducedMotion } = useMotion()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let frame, visible = true, start = performance.now()
    const ink = readInk()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const render = (now) => {
      const { width, height } = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)
      const t = (now - start) / 1000
      const fadeIn = Math.min(1, t / 0.6)
      ctx.globalAlpha = fadeIn
      draw[mode](ctx, width, height, reducedMotion ? 2 : t + 2, ink)
      ctx.globalAlpha = 1
    }
    const loop = (now) => {
      if (visible) render(now)
      frame = requestAnimationFrame(loop)
    }

    resize()
    if (reducedMotion) {
      start = performance.now() - 1000
      render(performance.now())
    } else frame = requestAnimationFrame(loop)

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)
    const ro = new ResizeObserver(() => {
      resize()
      if (reducedMotion) render(performance.now())
    })
    ro.observe(canvas)
    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
    }
  }, [mode, reducedMotion])

  return <canvas ref={ref} aria-hidden="true" />
}

export default SignalVisual
