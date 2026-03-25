const Tag = ({ children, color, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-code border transition-colors duration-200 ${className}`}
      style={{
        color: color || 'var(--accent-light)',
        borderColor: color ? `${color}44` : 'var(--border-accent)',
        background: color ? `${color}14` : 'rgba(124,58,237,0.08)',
      }}
    >
      {children}
    </span>
  )
}

export default Tag
