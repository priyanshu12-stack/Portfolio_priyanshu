import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  SiC, SiCplusplus, SiJavascript, SiTypescript, SiPython, SiReact, SiNextdotjs, SiTailwindcss, SiVite,
  SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiPostgresql, SiCloudinary, SiPytorch, SiScikitlearn,
  SiPandas, SiNumpy, SiHuggingface, SiJupyter, SiGit, SiGithub, SiDocker, SiVercel, SiRender,
  SiGithubcopilot, SiGooglegemini, SiAnthropic, SiLeetcode, SiLinux, SiCisco, SiOpencv,
  SiSqlalchemy,
} from 'react-icons/si'
import { FaAws, FaFileExcel } from 'react-icons/fa'
import { skillCategories, marqueeItems } from '@/constants'
import { Reveal, RevealLines, SectionLabel } from '@/components/Reveal'

const EASE = [0.22, 1, 0.36, 1]
const ICONS = {
  SiC, SiCplusplus, SiJavascript, SiTypescript, SiPython, SiReact, SiNextdotjs, SiTailwindcss, SiVite,
  SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiPostgresql, SiCloudinary, SiPytorch, SiScikitlearn,
  SiPandas, SiNumpy, SiHuggingface, SiJupyter, SiGit, SiGithub, SiDocker, SiVercel, SiRender,
  SiGithubcopilot, SiGooglegemini, SiAnthropic, SiLeetcode, SiLinux, SiCisco, SiOpencv,
  SiSqlalchemy,
  aws: FaAws, excel: FaFileExcel,
}
const resolveIcon = (name) => (name && ICONS[name]) || null
const initials = (s) => s.replace(/[^A-Za-z0-9 ]/g, '').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()

const totalSkills = skillCategories.reduce((n, c) => n + c.skills.length, 0)

const Skills = () => {
  const [active, setActive] = useState(0)
  const cat = skillCategories[active]

  const onKeyDown = (e) => {
    const k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    if (!k) return
    e.preventDefault()
    const next = (active + k + skillCategories.length) % skillCategories.length
    setActive(next)
    e.currentTarget.querySelectorAll('button')[next]?.focus()
  }

  return (
    <section id="approach" className="chapter" aria-labelledby="approach-title">
      <div className="wrap">
        <SectionLabel num="03" title="Skills & expertise" aside="How I build" />

        <div className="section-heading">
          <RevealLines id="approach-title" className="h2" lines={[<>How I</>, <><em>build.</em></>]} />
          <Reveal delay={0.1} className="skill-count">
            <div>
              <strong>{totalSkills}</strong>
              <span className="label-sm">Tools & concepts</span>
            </div>
            <div>
              <strong>{skillCategories.length}</strong>
              <span className="label-sm">Disciplines</span>
            </div>
          </Reveal>
        </div>

        <Reveal className="skills-explorer">
          <div className="skill-tabs" role="tablist" aria-label="Skill categories" aria-orientation="vertical" onKeyDown={onKeyDown}>
            {skillCategories.map((c, i) => (
              <button
                key={c.title}
                type="button"
                role="tab"
                id={`skill-tab-${i}`}
                aria-selected={i === active}
                aria-controls="skill-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
              >
                <span className="label-sm">{String(i + 1).padStart(2, '0')}</span>
                <span className="t">
                  <span className="full">{c.title}</span>
                  <span className="short">{c.short}</span>
                </span>
                {i === active && <motion.span layoutId="skill-tab-bg" className="tab-bg" transition={{ type: 'spring', stiffness: 380, damping: 36 }} />}
              </button>
            ))}
          </div>

          <div className="skill-panel" id="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${active}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="skill-panel-head">
                  <span className="label-sm accent">{String(active + 1).padStart(2, '0')} / {String(skillCategories.length).padStart(2, '0')}</span>
                  <h3>{cat.title}</h3>
                  <p className="body">{cat.summary}</p>
                </div>
                <ul className="skill-tiles">
                  {cat.skills.map((s, j) => {
                    const Icon = resolveIcon(s.icon)
                    return (
                      <motion.li
                        key={s.name}
                        className="skill-tile"
                        initial={{ opacity: 0, y: 18, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.05 + j * 0.035, duration: 0.5, ease: EASE }}
                      >
                        <span className="ico" aria-hidden="true">
                          {Icon ? <Icon /> : <span className="mono">{initials(s.name)}</span>}
                        </span>
                        <span className="nm">{s.name}</span>
                      </motion.li>
                    )
                  })}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>

      <div className="marquee marquee-alt" aria-hidden="true">
        <div className="marquee-track reverse">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span className="marquee-item" key={i}>
              {item}
              <span className="sep">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
