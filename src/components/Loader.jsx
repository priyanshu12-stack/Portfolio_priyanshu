import { motion } from 'framer-motion'

const Loader = () => {
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Spinning rings */}
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{ borderTopColor: 'var(--accent)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-transparent"
            style={{ borderTopColor: 'var(--accent-light)' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          <div
            className="absolute inset-4 rounded-full"
            style={{ background: 'var(--accent)', opacity: 0.4 }}
          />
        </div>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="font-code text-sm"
          style={{ color: 'var(--accent-light)' }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  )
}

export default Loader
