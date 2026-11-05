// Abstract, typographic project previews in the spirit of the reference's
// "artwork" cards. They describe the project's nature without pretending
// to be screenshots.

const CodeArt = () => (
  <div className="pv-inner pv-code dot-grid">
    <pre aria-hidden="true">
      <span className="c">{'// 3-tier AI fallback'}</span>{'\n'}
      <span className="k">const</span> model = <span className="s">await</span> pick([{'\n'}
      {'  '}<span className="s">'gemini'</span>, <span className="s">'ollama'</span>, <span className="s">'openai'</span>{'\n'}
      ]){'\n'}
      <span className="k">await</span> webcontainer.<span className="s">boot</span>(){'\n'}
      <span className="c">{'$ npm run dev'}</span> <span className="caret" />
    </pre>
  </div>
)

// Deterministic pseudo-waveform so the bars don't change between renders.
const WAVE = Array.from({ length: 42 }, (_, i) => {
  const base = Math.abs(Math.sin(i * 0.55) * 0.7 + Math.sin(i * 1.7) * 0.3)
  return { lo: (0.12 + base * 0.35).toFixed(2), hi: (0.35 + base * 0.65).toFixed(2), d: ((i % 7) * 0.11).toFixed(2) }
})

const WaveArt = () => (
  <div className="pv-inner pv-wave">
    <span className="wave-axis" />
    <div className="wave-bars" aria-hidden="true">
      {WAVE.map((b, i) => (
        <i key={i} style={{ '--lo': b.lo, '--hi': b.hi, animationDelay: `${b.d}s`, height: '100%' }} />
      ))}
    </div>
  </div>
)

const BARS = [34, 52, 41, 66, 48, 72, 58, 81, 63, 90, 70, 55, 77, 62]

const WordArt = ({ word }) => (
  <div className="pv-inner pv-word">
    <span className="word">{word}</span>
    <div className="ticks" aria-hidden="true">
      <span>Win probability</span>
      <span>Live</span>
    </div>
    <div className="bars" aria-hidden="true">
      {BARS.map((h, i) => (
        <i key={i} className={i === 9 ? 'hl' : ''} style={{ height: `${h}%` }} />
      ))}
    </div>
  </div>
)

// JobConnect: the three roles from the README and how a job moves between them.
const JOB_FLOW = [
  ['Recruiter', 'Posts & manages jobs'],
  ['Job-seeker', 'Searches & applies'],
  ['Admin', 'Oversees the platform'],
]

const JobsArt = () => (
  <div className="pv-inner pv-jobs dot-grid">
    <div className="jobs-flow" aria-hidden="true">
      {JOB_FLOW.map(([role, does], i) => (
        <div className={`jobs-node ${i === 1 ? 'hl' : ''}`} key={role}>
          <span className="role">{role}</span>
          <span className="does">{does}</span>
        </div>
      ))}
    </div>
    <div className="jobs-stack" aria-hidden="true">
      <span>React</span><i /><span>Express API</span><i /><span>MongoDB</span>
    </div>
    <span className="jobs-token" aria-hidden="true">JWT · protected routes</span>
  </div>
)

const ProjectVisual = ({ project, index }) => {
  const art =
    project.visual === 'code' ? <CodeArt />
      : project.visual === 'wave' ? <WaveArt />
      : project.visual === 'jobs' ? <JobsArt />
      : <WordArt word={project.word} />

  return (
    <div className={`project-visual ${project.visual === 'word' ? 'is-word' : ''}`}>
      {art}
      <div className="visual-meta">
        <span>{String(index + 1).padStart(2, '0')} / {project.type}</span>
        <span>{project.tags[0]}</span>
      </div>
      <div className="visual-footer">
        <span>{project.name}</span>
        <span className="visual-open">
          {project.live ? 'Open live' : 'View code'} <span aria-hidden="true">↗</span>
        </span>
      </div>
    </div>
  )
}

export default ProjectVisual
