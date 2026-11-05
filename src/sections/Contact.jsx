import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { contactServices, personalInfo } from '@/constants'
import { Reveal, RevealLines } from '@/components/Reveal'

const channels = [
  { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { label: 'LinkedIn', value: 'priyanshu-raj-mishra', href: personalInfo.linkedinUrl, Icon: FaLinkedinIn },
  { label: 'GitHub', value: personalInfo.githubUsername, href: personalInfo.githubUrl, Icon: FaGithub },
  { label: 'LeetCode', value: `${personalInfo.dsaCount} solved · ${personalInfo.leetcodeRating}`, href: personalInfo.leetcodeUrl, Icon: SiLeetcode },
  { label: 'Resume', value: 'View PDF', href: personalInfo.resumeUrl },
]

const EMPTY = { name: '', email: '', service: '', message: '' }

const Contact = () => {
  const formRef = useRef(null)
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Name must be at least 2 characters.'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email.'
    if (!form.service) e.service = 'Please choose a topic.'
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters.'
    return e
  }

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name] || errors.submit) setErrors((er) => ({ ...er, [e.target.name]: null, submit: null }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setStatus('sending')
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setStatus('sent')
      setForm(EMPTY)
    } catch (err) {
      console.error(err)
      setStatus('idle')
      setErrors({ submit: 'Failed to send message. Please try again or email me directly.' })
    }
  }

  const fieldProps = (name) => ({
    id: `f-${name}`,
    name,
    value: form[name],
    onChange,
    className: `input ${errors[name] ? 'has-error' : ''}`,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `e-${name}` : undefined,
  })

  const Err = ({ name }) =>
    errors[name] ? (
      <span id={`e-${name}`} className="field-error" role="alert">
        {errors[name]}
      </span>
    ) : null

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="wrap contact-inner">
        <Reveal className="section-label" y={12}>
          <span className="label">
            <span className="num" style={{ color: 'var(--accent)' }}>06</span> / Contact
          </span>
          <span className="availability label">
            <span className="live-dot" /> {personalInfo.availability}
          </span>
        </Reveal>

        <RevealLines
          id="contact-title"
          className="contact-title"
          lines={[<>Let&rsquo;s build</>, <>something <em>real.</em></>]}
        />

        <Reveal delay={0.1}>
          <a href={`mailto:${personalInfo.email}`} className="contact-cta">
            {personalInfo.email} <ArrowUpRight size={26} strokeWidth={1.5} />
          </a>
        </Reveal>

        <div className="contact-grid">
          <Reveal>
            <p className="body" style={{ maxWidth: 440, marginBottom: 32 }}>
              Hiring for a full-stack or backend role, or have a project in mind? Reach out through any channel — I read
              everything.
            </p>
            <div className="contact-links">
              {channels.map(({ label, value, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="contact-link"
                  {...(href.startsWith('mailto') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  <span className="label-sm">{label}</span>
                  <span className="v" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    {Icon && <Icon size={14} aria-hidden="true" />}
                    {value}
                  </span>
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  className="form-status"
                  role="status"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <CheckCircle2 size={22} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <h3 style={{ fontSize: 22, letterSpacing: '-0.03em' }}>Message sent successfully</h3>
                    <p className="body" style={{ marginTop: 6 }}>Thank you for reaching out. I&rsquo;ll get back to you shortly.</p>
                    <button type="button" className="text-link" style={{ marginTop: 18 }} onClick={() => setStatus('idle')}>
                      Send another <ArrowUpRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={onSubmit}
                  className="form"
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="label">Or send a message</span>
                  <div className="field-row">
                    <div className="field">
                      <label className="label-sm" htmlFor="f-name">Name</label>
                      <input type="text" autoComplete="name" placeholder="Your name" {...fieldProps('name')} />
                      <Err name="name" />
                    </div>
                    <div className="field">
                      <label className="label-sm" htmlFor="f-email">Email</label>
                      <input type="email" autoComplete="email" placeholder="you@company.com" {...fieldProps('email')} />
                      <Err name="email" />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label-sm" htmlFor="f-service">Topic</label>
                    <select {...fieldProps('service')}>
                      <option value="" disabled>What&rsquo;s this about?</option>
                      {contactServices.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <Err name="service" />
                  </div>
                  <div className="field">
                    <label className="label-sm" htmlFor="f-message">Message</label>
                    <textarea rows={4} placeholder="Tell me about the role or idea…" {...fieldProps('message')} />
                    <Err name="message" />
                  </div>
                  {errors.submit && <span className="field-error" role="alert">{errors.submit}</span>}
                  <div>
                    <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                      {status === 'sending' ? (
                        <>Sending <Loader2 size={16} className="animate-spin" /></>
                      ) : (
                        <>Send message <ArrowUpRight size={16} /></>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
