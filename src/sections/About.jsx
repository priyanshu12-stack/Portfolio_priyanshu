import { ArrowUpRight } from 'lucide-react'
import { personalInfo, traits } from '@/constants'
import { Reveal, RevealLines, SectionLabel } from '@/components/Reveal'
import SignalExplorer from '@/components/SignalExplorer'

const facts = [
  ['Based in', personalInfo.location],
  ['Studying', 'B.Tech (final year), Electronics & Communication — BIT Mesra · CGPA 9.19'],
  ['Currently', personalInfo.currentProject],
  ['Looking for', 'Full-time SDE, AI/ML Engineer & Data Science roles'],
]

const About = () => (
  <section id="about" className="chapter" aria-labelledby="about-title">
    <div className="wrap">
      <SectionLabel num="01" title="About" aside="The person behind the work" />

      <div className="about-grid">
        <Reveal y={36} className="about-explorer">
          <SignalExplorer />
        </Reveal>

        <div className="about-copy">
          <RevealLines
            id="about-title"
            className="h2"
            lines={[
              <>Algorithms first,</>,
              <>
                <em>models &amp; products</em>
              </>,
              <>that ship.</>,
            ]}
          />
          <Reveal delay={0.1}>
            <p className="lead" style={{ marginTop: 36 }}>{personalInfo.bio1}</p>
            <p className="lead">{personalInfo.bio2}</p>
            <p className="lead">{personalInfo.bio3}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="fact-list">
              {facts.map(([k, v]) => (
                <div className="fact-row" key={k}>
                  <dt>{k}</dt>
                  <dd>
                    {k === 'Looking for' && <span className="live-dot" style={{ marginRight: 10, verticalAlign: 1 }} />}
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.18}>
            <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-link" style={{ marginTop: 32 }}>
              Read my resume <ArrowUpRight size={15} />
            </a>
            <div className="identity-notes" aria-label="Traits">
              {traits.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
)

export default About
