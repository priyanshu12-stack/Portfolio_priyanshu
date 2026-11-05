import { motion } from 'framer-motion'
import SignalText from '@/components/SignalText'

const EASE = [0.22, 1, 0.36, 1]

// Fade-and-rise as the element scrolls into view (once).
export const Reveal = ({ as = 'div', delay = 0, y = 28, className, children, ...rest }) => {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Masked line-by-line text reveal. `lines` is an array of nodes.
// When `animateOnMount` is set it plays immediately (hero), otherwise on scroll.
export const RevealLines = ({ as = 'h2', lines, className, delay = 0, stagger = 0.09, animateOnMount = false, id }) => {
  const Tag = as
  const trigger = animateOnMount
    ? { animate: 'shown' }
    : { whileInView: 'shown', viewport: { once: true, margin: '0px 0px -10% 0px' } }

  return (
    <Tag className={className} id={id}>
      <motion.span style={{ display: 'block' }} initial="hidden" {...trigger}>
        {lines.map((line, i) => (
          <span className="line-mask" key={i}>
            <motion.span
              variants={{
                hidden: { y: '108%' },
                shown: { y: '0%', transition: { duration: 1.05, ease: EASE, delay: delay + i * stagger } },
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}

export const SectionLabel = ({ num, title, aside }) => (
  <Reveal className="section-label" y={12}>
    <span className="label">
      <SignalText>
        <span className="num">{num}</span> / {title}
      </SignalText>
    </span>
    {aside && <span className="label hide-sm">{aside}</span>}
  </Reveal>
)
