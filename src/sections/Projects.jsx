import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { ExternalLink } from 'lucide-react'
import { projects, personalInfo } from '@/constants'
import SectionWrapper from '@/components/SectionWrapper'
import { textVariant } from '@/utils/motion'

const accentColors = [
  { main: '#10B981', glow: 'rgba(16,185,129,0.15)', tint: 'rgba(16,185,129,0.08)', grad: 'linear-gradient(135deg, #10B981, #0EA5E9)' },
  { main: '#0EA5E9', glow: 'rgba(14,165,233,0.15)', tint: 'rgba(14,165,233,0.08)', grad: 'linear-gradient(135deg, #0EA5E9, #6366F1)' },
  { main: '#8B5CF6', glow: 'rgba(139,92,246,0.15)', tint: 'rgba(139,92,246,0.08)', grad: 'linear-gradient(135deg, #8B5CF6, #EC4899)' },
  { main: '#F43F5E', glow: 'rgba(244,63,94,0.15)', tint: 'rgba(244,63,94,0.08)', grad: 'linear-gradient(135deg, #F43F5E, #F97316)' },
  { main: '#06B6D4', glow: 'rgba(6,182,212,0.15)', tint: 'rgba(6,182,212,0.08)', grad: 'linear-gradient(135deg, #06B6D4, #10B981)' },
  { main: '#7C3AED', glow: 'rgba(124,58,237,0.15)', tint: 'rgba(124,58,237,0.08)', grad: 'linear-gradient(135deg, #7C3AED, #2563EB)' },
]

const ProjectStickyCard = ({ project, index, progress, isLast }) => {
  const scale = useTransform(progress, [0, 1], [1, isLast ? 1 : 0.92])
  const opacity = useTransform(progress, [0, 1], [1, isLast ? 1 : 0.5])
  const accent = accentColors[index % accentColors.length]
  const projectNum = String(index + 1).padStart(2, '0')

  return (
    <div className="h-screen w-full flex items-center justify-center sticky top-0 overflow-hidden" style={{ zIndex: index }}>
      <motion.div 
        className="project-card relative w-full max-w-[90vw] md:max-w-6xl h-auto min-h-[75vh] md:h-[80vh] rounded-[2rem] border overflow-hidden flex flex-col md:flex-row mx-auto origin-top"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ 
          boxShadow: `0 -8px 50px ${accent.glow}, 0 8px 40px rgba(0,0,0,0.08)`,
          scale,
          opacity,
          top: `calc(10vh + ${index * 15}px)`
        }}
      >
        {/* Top gradient accent line inside the border */}
        <div className="absolute top-0 left-0 right-0 h-[3px] z-20" style={{ background: `linear-gradient(90deg, ${accent.main}, transparent)` }} />

        {/* Left Side: Browser Window Screenshot */}
        <div className="w-full md:w-[55%] h-[250px] md:h-full relative overflow-hidden group project-card-image shrink-0">
          {/* Browser Chrome Bar */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center gap-1.5 px-4 py-2.5 backdrop-blur-xl border-b project-card-chrome">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <div className="flex-1 mx-3 rounded-md px-3 py-0.5 font-code text-[10px] truncate project-card-url">
              {project.live !== '#' ? project.live : 'localhost:3000'}
            </div>
          </div>

          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover pt-9 md:pt-10"
          />

          {/* Edge blend gradients */}
          <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none md:hidden" style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none hidden md:block" style={{ background: 'linear-gradient(to left, var(--bg-primary), transparent)' }} />
        </div>

        {/* Right Side: Project Info */}
        <div className="w-full md:w-[45%] flex flex-col justify-center p-6 md:p-10 lg:p-12 z-10 relative flex-1">
          
          {/* Subtle Accent Glow behind text */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full blur-[100px] pointer-events-none opacity-20"
            style={{ background: `radial-gradient(circle, ${accent.main} 0%, transparent 70%)` }}
          />

          {/* Large watermark number */}
          <span 
            className="absolute top-3 right-4 md:top-6 md:right-10 text-[60px] md:text-[120px] font-black leading-none pointer-events-none select-none"
            style={{ color: accent.main, opacity: 0.12 }}
          >
            {projectNum}
          </span>

          {/* Project number badge */}
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <div className="w-6 md:w-8 h-[2px] rounded-full" style={{ background: accent.main }} />
            <span 
              className="font-code text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: accent.main }}
            >
              PROJECT {projectNum}
            </span>
          </div>

          <h3 className="text-[22px] md:text-3xl lg:text-5xl font-extrabold leading-tight mb-2 md:mb-4 tracking-tight">
            {project.name}
          </h3>
          
          <p className="text-[12px] md:text-base leading-relaxed mb-4 md:mb-6 line-clamp-3 md:line-clamp-none project-card-desc" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 md:gap-2 lg:gap-3 mb-4 md:mb-8">
            {project.tags.map(tag => (
              <span 
                key={tag} 
                className="px-2.5 py-0.5 md:py-1 text-[10px] md:text-[11px] font-medium tracking-wider rounded-full"
                style={{ 
                  color: accent.main, 
                  background: accent.tint,
                  border: `1px solid ${accent.main}25`
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-auto md:mt-0">
            {project.github && (
              <a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 md:px-7 md:py-3.5 rounded-full text-[11px] md:text-sm font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl"
                style={{ background: `linear-gradient(135deg, ${accent.main}, ${accent.glow})` }}
              >
                <FaGithub size={14} /> Code
              </a>
            )}
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-btn flex items-center gap-2 px-4 py-2 md:px-7 md:py-3.5 rounded-full text-[11px] md:text-sm font-bold tracking-wide transition-all duration-300 hover:scale-105"
              style={{ 
                border: `1.5px solid ${accent.main}40`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accent.main
                e.currentTarget.style.color = accent.main
                e.currentTarget.style.background = accent.tint
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${accent.main}40`
                e.currentTarget.style.color = ''
                e.currentTarget.style.background = ''
              }}
            >
              <ExternalLink size={14} /> Visit Live
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const Projects = () => {
  const container = useRef(null)
  
  // Track scroll exactly over the entire container's massive height
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  // Smooth out the scroll calculations
  const projectsLength = projects.length

  return (
    <div className="relative w-full bg-transparent flex flex-col justify-start items-center pb-20 z-10" id="projects">
      
      {/* Absolute intro block that scroll up cleanly */}
      <div className="w-full flex flex-col items-center justify-center pt-24 pb-12 px-4 z-10 sticky top-0" style={{ backgroundImage: 'linear-gradient(to bottom, var(--bg-primary) 20%, transparent)' }}>
        <motion.div 
          variants={textVariant(0.1)} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center text-center w-full"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-widest drop-shadow-xl" style={{ color: 'var(--text-primary)' }}>
            Featured <span style={{ color: '#10B981' }}>Projects</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-sm md:text-base font-medium text-center flex items-center justify-center" style={{ color: 'var(--text-secondary)' }}>
            Real products built with real impact. Scroll down to explore my hand-picked selections.
          </p>
        </motion.div>
      </div>

      {/* The massive scroll container holding the stacked sticky cards */}
      <div ref={container} className="relative w-full" style={{ height: `${projectsLength * 100}vh` }}>
        {projects.map((project, index) => {
          
          const targetScale = 1 - ((projectsLength - index) * 0.04)
          const startProgress = index / projectsLength
          const endProgress = 1
          
          const cardProgress = useTransform(
            scrollYProgress,
            [startProgress, endProgress],
            [0, 1]
          )

          return (
            <ProjectStickyCard 
              key={project.id} 
              project={project} 
              index={index} 
              progress={cardProgress}
              isLast={index === projectsLength - 1}
            />
          )
        })}
      </div>

      {/* Explicit empty spacer to force an uncollapsible margin before the Contact section */}
      <div className="w-full h-[20vh] md:h-[30vh] bg-transparent pointer-events-none" />
      
    </div>
  )
}

export default SectionWrapper(Projects, 'projects')
