import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { experiences, impactNumbers } from '@/constants'
import { Reveal, RevealLines, SectionLabel } from '@/components/Reveal'

const splitValue = (v) => {
  const m = v.match(/^(.*?)([+×%]*|\s?pp)$/)
  return { num: m[1], suffix: m[2] }
}

const ExpRow = ({ exp, index }) => (
  <motion.article
    className="exp-row"
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '0px 0px -15% 0px' }}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
  >
    <motion.span
      className="exp-node"
      aria-hidden="true"
      initial={{ scale: 0.4, backgroundColor: 'var(--bg)' }}
      whileInView={{ scale: 1, backgroundColor: 'var(--accent)' }}
      viewport={{ margin: '-45% 0px -45% 0px' }}
      transition={{ duration: 0.4 }}
    />
    <div className="exp-when">
      <span className="exp-index">{String(index + 1).padStart(2, '0')}</span>
      <span className="label">{exp.period}</span>
      <span className="label-sm">{exp.location}</span>
      {exp.current && (
        <span className="label-sm current">
          <span className="live-dot" /> Current
        </span>
      )}
      {exp.stat && (
        <div className="exp-stat">
          <strong>{exp.stat[0]}</strong>
          <span className="label-sm">{exp.stat[1]}</span>
        </div>
      )}
    </div>
    <div className="exp-role">
      <span className="exp-kind">{exp.kind}</span>
      <h3>{exp.role}</h3>
      <p className="company">{exp.company}</p>
      {exp.companyNote && <p className="label-sm" style={{ marginTop: 6 }}>{exp.companyNote}</p>}
      <div className="tag-row">
        {exp.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
    <ul className="exp-points">
      {exp.points.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  </motion.article>
)

const Experience = () => {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="experience" className="chapter impact" aria-labelledby="experience-title">
      <div className="wrap">
        <SectionLabel num="04" title="Experience" aside={`${experiences.length} roles · industry, research & leadership`} />

        <div className="impact-heading">
          <RevealLines id="experience-title" className="h2" lines={[<>The work,</>, <>in <em>production.</em></>]} />
          <Reveal delay={0.1}>
            <p className="body" style={{ maxWidth: 400 }}>
              Research at IIT (ISM), a production portal at BCCL and a tech-lead role — systems and models that real
              people and organisations depend on.
            </p>
          </Reveal>
        </div>

        <div className="impact-numbers">
          {impactNumbers.map((n, i) => {
            const { num, suffix } = splitValue(n.value)
            return (
              <Reveal key={n.title} delay={i * 0.12}>
                <strong>
                  {num}
                  <span className="accent">{suffix}</span>
                </strong>
                <h3>{n.title}</h3>
                <p>{n.text}</p>
              </Reveal>
            )
          })}
        </div>

        <div className="exp-list" ref={listRef}>
          <span className="exp-rail" aria-hidden="true">
            <motion.span className="exp-rail-fill" style={{ scaleY: fill }} />
          </span>
          {experiences.map((exp, i) => (
            <ExpRow key={`${exp.company}-${exp.role}`} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
