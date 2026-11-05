import { forwardRef, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { projects, projectFilters, personalInfo } from '@/constants'
import { Reveal, RevealLines, SectionLabel } from '@/components/Reveal'
import ProjectVisual from '@/components/ProjectVisual'

const EASE = [0.22, 1, 0.36, 1]

const ProjectLinks = ({ project }) => (
  <div className="project-links">
    {project.live && (
      <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-link">
        Live project <ArrowUpRight size={15} />
      </a>
    )}
    {project.github && (
      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-link">
        <FaGithub size={14} /> Source code
      </a>
    )}
  </div>
)

// Preview with scroll parallax and a cursor-following "View" pill.
const VisualLink = ({ project, index }) => {
  const ref = useRef(null)
  const [hover, setHover] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 300, damping: 30 })
  const sy = useSpring(my, { stiffness: 300, damping: 30 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <motion.a
      ref={ref}
      href={project.live || project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="project-visual-link"
      aria-label={`${project.name} — ${project.live ? 'open live project' : 'view source code'}`}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ y }}
      initial={{ opacity: 0, clipPath: 'inset(12% 12% 12% 12%)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      <ProjectVisual project={project} index={index} />
      <motion.span
        className="view-pill"
        aria-hidden="true"
        style={{ left: sx, top: sy, x: '-50%', y: '-50%' }}
        animate={{ scale: hover ? 1 : 0, opacity: hover ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        {project.live ? 'View live' : 'View code'} ↗
      </motion.span>
    </motion.a>
  )
}

const FeaturedProject = forwardRef(({ project, index }, ref) => (
  <motion.article
    ref={ref}
    layout
    className={`project ${index % 2 === 1 ? 'is-flipped' : ''}`}
    aria-labelledby={`p-${project.id}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.25 } }}
  >
    <Reveal className="project-copy">
      <div className="project-index">
        <span className="label" style={{ color: 'var(--accent)' }}>{String(index + 1).padStart(2, '0')}</span>
        <span className="label">{project.type}</span>
        {project.year && <span className="label">{project.year}</span>}
      </div>
      <h3 id={`p-${project.id}`}>{project.name}</h3>
      <p className="subtitle">{project.subtitle}</p>
      <p className="body">{project.description}</p>

      {project.metrics?.length > 0 && (
        <dl className="project-metrics">
          {project.metrics.map(([v, l]) => (
            <div key={l}>
              <dt>{v}</dt>
              <dd>{l}</dd>
            </div>
          ))}
        </dl>
      )}

      {project.highlights?.length > 0 && (
        <ul className="project-highlights">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}

      <div className="tag-row">
        {project.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <ProjectLinks project={project} />
    </Reveal>

    <VisualLink project={project} index={index} />
  </motion.article>
))
FeaturedProject.displayName = 'FeaturedProject'

const MoreItem = forwardRef(({ project, index, open, onToggle }, ref) => (
  <motion.div
    ref={ref}
    layout="position"
    className={`more-item ${open ? 'is-open' : ''}`}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, transition: { duration: 0.2 } }}
    transition={{ duration: 0.5, ease: EASE }}
  >
    <h4 style={{ margin: 0, fontWeight: 'inherit' }}>
      <button type="button" className="more-trigger" onClick={onToggle} aria-expanded={open} aria-controls={`more-${project.id}`}>
        <span className="label-sm">{String(index).padStart(2, '0')}</span>
        <span className="name">
          {project.name}
          <small>{project.subtitle}</small>
        </span>
        <span className="label-sm type">{project.type}</span>
        <span className="plus" aria-hidden="true" />
      </button>
    </h4>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={`more-${project.id}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ overflow: 'hidden' }}
        >
          <div className="more-detail">
            <span />
            <p className="body">{project.description}</p>
            <div className="side">
              <div className="tag-row">
                {project.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <ProjectLinks project={project} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
))
MoreItem.displayName = 'MoreItem'

const Projects = () => {
  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState(null)
  const visible = projects.filter((p) => filter === 'all' || p.track.includes(filter))
  const featured = visible.filter((p) => p.featured)
  const more = visible.filter((p) => !p.featured)

  return (
    <section id="work" className="chapter" aria-labelledby="work-title">
      <div className="wrap">
        <SectionLabel num="02" title="Selected work" aside="20+ projects · all on GitHub" />

        <div className="section-heading">
          <RevealLines id="work-title" className="h2" lines={[<>Ideas are a start.</>, <><em>This is the work.</em></>]} />
          <Reveal delay={0.1} className="work-intro">
            <p className="body">
              Applied deep learning, AI developer tools and full-stack products — each one built, shipped and published on
              GitHub.
            </p>
            <div className="filter-tabs" role="group" aria-label="Filter projects">
              {projectFilters.map((f) => (
                <button key={f.key} type="button" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div className="projects" layout>
          <AnimatePresence mode="popLayout">
            {featured.map((p, i) => (
              <FeaturedProject key={p.id} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {more.length > 0 && (
          <div className="more-work">
            <Reveal className="section-label" y={12} style={{ borderTop: 0, paddingTop: 0 }}>
              <span className="label">More ways I build</span>
              <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="label" style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                All repositories <ArrowUpRight size={13} />
              </a>
            </Reveal>
            <div className="more-work-list">
              <AnimatePresence mode="popLayout">
                {more.map((p, i) => (
                  <MoreItem
                    key={p.id}
                    project={p}
                    index={featured.length + i + 1}
                    open={openId === p.id}
                    onToggle={() => setOpenId((cur) => (cur === p.id ? null : p.id))}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        <Reveal className="more-projects-cta">
          <div>
            <span className="label-sm">20+ public repositories</span>
            <p>Want to see more? Everything else I&rsquo;ve built lives on GitHub.</p>
          </div>
          <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <FaGithub size={16} /> More projects on GitHub <ArrowUpRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

export default Projects
