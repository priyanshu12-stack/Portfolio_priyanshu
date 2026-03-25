import { motion } from 'framer-motion'

const Button = ({
  children,
  variant = 'primary',
  onClick,
  href,
  download,
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  target,
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-sm cursor-pointer transition-all duration-200 select-none relative overflow-hidden'

  const variants = {
    primary:
      'text-white bg-[var(--accent)] hover:scale-[1.03] hover:shadow-[0_0_24px_var(--accent-glow)]',
    secondary:
      'text-[var(--accent)] bg-transparent border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white',
    ghost:
      'text-[var(--text-secondary)] bg-transparent border border-[var(--border)] hover:text-white hover:border-[var(--border-accent)]',
  }

  const content = (
    <>
      {loading && (
        <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
      )}
      {children}
    </>
  )

  if (href) {
    return (
      <motion.a
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        href={href}
        download={download}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={`${base} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${className} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {content}
    </motion.button>
  )
}

export default Button
