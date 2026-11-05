import { ArrowUpRight } from 'lucide-react'
import { education, achievements, certifications, personalInfo } from '@/constants'
import { Reveal, RevealLines, SectionLabel } from '@/components/Reveal'

const Education = () => (
  <section id="journey" className="chapter" aria-labelledby="journey-title">
    <div className="wrap">
      <SectionLabel num="05" title="Journey" aside="Education & achievements" />

      <div className="journey-grid">
        <div>
          <RevealLines
            id="journey-title"
            className="h2"
            lines={[<>Foundations,</>, <><em>built early.</em></>]}
          />
          <Reveal delay={0.1}>
            <p className="body" style={{ marginTop: 28, maxWidth: 440 }}>
              Electronics & Communication at BIT Mesra, with competitive programming running alongside — the rigour that
              later went into production systems and research.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 28px', marginTop: 32 }}>
              <a href={personalInfo.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                LeetCode profile <ArrowUpRight size={15} />
              </a>
              <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                GitHub profile <ArrowUpRight size={15} />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="timeline">
          {education.map((e, i) => (
            <Reveal as="article" key={e.title} delay={i * 0.1}>
              <span className="label">{e.period}</span>
              <h3>{e.title}</h3>
              <div className="inst">
                <img src={e.logo} alt="" width="28" height="28" loading="lazy" />
                <span>{e.institution}</span>
              </div>
              <span className="score">{e.score}</span>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="achievements" aria-labelledby="achievements-title">
        <Reveal className="section-label" y={12}>
          <span className="label" id="achievements-title">Achievements & profiles</span>
        </Reveal>
        <div className="achievement-grid" style={{ borderTop: 0, marginTop: 0 }}>
          {achievements.map((a, i) => (
            <Reveal key={a.title} className="achievement" delay={i * 0.08}>
              <strong>
                {a.value.replace(/[+×%]$/, '')}
                <span className="accent">{a.value.match(/[+×%]$/)?.[0]}</span>
              </strong>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
              {a.url && (
                <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-link">
                  View profile <ArrowUpRight size={14} />
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>

      <div className="certs">
        <Reveal className="section-label" y={12}>
          <span className="label">Certifications</span>
          <span className="label hide-sm">{certifications.length} completed</span>
        </Reveal>
        <div className="cert-grid">
          {certifications.map((c, i) => (
            <Reveal key={c.title} className="cert" delay={i * 0.08}>
              <span className="label-sm">{String(i + 1).padStart(2, '0')} · {c.issuer}</span>
              <h3>{c.title}</h3>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default Education
