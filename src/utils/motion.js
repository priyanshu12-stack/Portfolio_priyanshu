// Reusable Framer Motion animation variants
// Import from this file throughout the app — never inline in JSX

export const fadeIn = (direction = 'up', delay = 0) => ({
  initial: {
    opacity: 0,
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 60 : direction === 'right' ? -60 : 0,
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: 'tween',
      duration: 0.7,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
})

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
})

export const textVariant = (delay = 0) => ({
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      duration: 0.6,
      delay,
      ease: 'easeOut',
    },
  },
})

export const slideIn = (direction = 'left', delay = 0, duration = 0.6) => ({
  initial: {
    opacity: 0,
    x: direction === 'left' ? -60 : direction === 'right' ? 60 : 0,
    y: direction === 'up' ? 60 : direction === 'down' ? -60 : 0,
  },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: 'tween',
      duration,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
})

export const zoomIn = (delay = 0, duration = 0.5) => ({
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'tween',
      delay,
      duration,
      ease: 'easeOut',
    },
  },
})

export const planetVariants = (direction = 'left') => ({
  initial: {
    x: direction === 'left' ? '-100%' : '100%',
    rotate: 120,
  },
  animate: {
    x: 0,
    rotate: 0,
    transition: {
      type: 'spring',
      duration: 1.8,
      delay: 0.5,
    },
  },
})

export const cardVariant = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
    },
  },
}

export const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}
