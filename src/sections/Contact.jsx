import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { CheckCircle, Send } from 'lucide-react'
import { fadeIn, staggerContainer } from '@/utils/motion'

const Contact = () => {
  const formRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name || form.name.length < 2) e.name = 'Name must be at least 2 characters.'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email.'
    if (!form.service) e.service = 'Please select a service.'
    if (!form.message || form.message.length < 10) e.message = 'Message must be at least 10 characters.'
    return e
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setSuccess(true)
    } catch (err) {
      console.error(err)
      setErrors({ submit: 'Failed to send message. Please try again or email me directly.' })
    } finally {
      setLoading(false)
    }
  }

  const inputClass = `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 bg-transparent`
  const inputStyle = {
    background: 'var(--bg-primary)',
    borderColor: 'var(--border)',
    color: 'var(--text-primary)',
  }

  return (
    <motion.section 
      id="contact"
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="w-full min-h-screen relative overflow-hidden flex flex-col items-center justify-center mt-16 md:mt-24"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background Stars - Now guaranteed full screen because no parent container restricts it */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Main Section Heading matched to Experience styling */}
      <div className="text-center mb-10 md:mb-20 w-full px-2 md:px-4 shrink-0 z-10 flex flex-col items-center mt-6 md:mt-10">
        <motion.div variants={fadeIn('up', 0.1)} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex items-center gap-2 md:gap-4 mb-2 md:mb-3">
          <span className="w-6 md:w-16 h-[2px] rounded-full" style={{ background: '#10B981' }} />
          <h2 className="text-[26px] md:text-5xl font-black uppercase tracking-widest drop-shadow-lg" style={{ color: 'var(--text-primary)' }}>
            REACH ME <span style={{ color: '#10B981' }}>OUT!!</span>
          </h2>
          <span className="w-6 md:w-16 h-[2px] rounded-full" style={{ background: '#10B981' }} />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-7xl w-full mx-auto px-4 md:px-12 items-center relative z-10 pb-16 md:pb-20">
        
        {/* Left: Floating Astronaut Illustration */}
        <motion.div
          variants={fadeIn('right', 0.2)}
          className="flex justify-center md:justify-start hidden md:flex"
        >
          <motion.div
            animate={{
              y: [-15, 15, -15],
              rotateZ: [-2, 2, -2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src="/assets/astronaut.png" 
              onError={(e) => { 
                e.target.src = 'https://illustrations.popsy.co/amber/space-travel.svg' 
              }}
              alt="Astronaut floating" 
              className="w-[90%] max-w-[450px] drop-shadow-[0_0_40px_rgba(16,185,129,0.15)] hover:scale-105 hover:-rotate-3 transition-all duration-500"
            />
          </motion.div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div variants={fadeIn('left', 0.3)} className="w-full">
          <div 
            className="p-6 md:p-8 rounded-3xl border w-full backdrop-blur-md"
            style={{ 
              background: 'var(--bg-secondary)', 
              borderColor: 'var(--border)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                    <CheckCircle size={64} style={{ color: '#4ade80' }} />
                  </motion.div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Message Sent! 🎉</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <motion.form key="form" ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Your Name *</label>
                    <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} className={inputClass} style={{ ...inputStyle, borderColor: errors.name ? '#ef4444' : 'var(--border)' }} />
                    {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Your Email *</label>
                    <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} className={inputClass} style={{ ...inputStyle, borderColor: errors.email ? '#ef4444' : 'var(--border)' }} />
                    {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                  </div>

                  {/* Service Needed Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Service Needed *</label>
                    <div className="relative">
                      <select 
                        name="service" 
                        value={form.service} 
                        onChange={handleChange} 
                        className={`${inputClass} appearance-none cursor-pointer [&>option]:bg-[#111] dark:[&>option]:bg-[#111] light:[&>option]:bg-white`} 
                        style={{ ...inputStyle, borderColor: errors.service ? '#ef4444' : 'var(--border)' }}
                      >
                        <option value="" disabled style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>Something in mind?</option>
                        <option value="Full Stack Development" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>Full Stack Development</option>
                        <option value="Frontend Development" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>Frontend Development</option>
                        <option value="Backend Integration" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>Backend Integration</option>
                        <option value="Consulting/Mentoring" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>Consulting/Mentoring</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none" style={{ color: 'var(--text-secondary)' }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                    {errors.service && <span className="text-xs text-red-500">{errors.service}</span>}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Explain Your Idea *</label>
                    <textarea name="message" rows={4} placeholder="Explain your idea..." value={form.message} onChange={handleChange} className={inputClass} style={{ ...inputStyle, resize: 'none', borderColor: errors.message ? '#ef4444' : 'var(--border)' }} />
                    {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
                  </div>

                  {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}

                  {/* Send Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="mt-2 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white transition-all duration-200 bg-blue-600 hover:bg-blue-500"
                    style={{
                      opacity: loading ? 0.7 : 1,
                      boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)'
                    }}
                  >
                    {loading ? <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> : <Send size={18} />}
                    {loading ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Contact
