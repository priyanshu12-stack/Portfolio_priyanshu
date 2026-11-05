import { proofMetrics, marqueeItems } from '@/constants'
import { Reveal } from '@/components/Reveal'

// Splits "70,000+" into the number and an accented suffix.
const splitValue = (v) => {
  const m = v.match(/^(.*?)([+×%]*)$/)
  return { num: m[1], suffix: m[2] }
}

const ProofStrip = () => (
  <>
    <section className="proof-strip" aria-label="Highlights">
      <div className="wrap proof-grid">
        {proofMetrics.map((m, i) => {
          const { num, suffix } = splitValue(m.value)
          return (
            <Reveal key={m.label} className="proof-item" delay={i * 0.08} y={18}>
              <div className="proof-value">
                {num}
                {suffix && <span className="suffix">{suffix}</span>}
              </div>
              <p>{m.label}</p>
            </Reveal>
          )
        })}
      </div>
    </section>

    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}
            <span className="sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  </>
)

export default ProofStrip
