import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { ExternalLink } from 'lucide-react'

const bgColors = [
  '#C75B10', // Orange-ish like the image
  '#1D4ED8', // Blue
  '#8B5CF6', // Purple
  '#10B981', // Emerald
  '#F43F5E', // Rose
  '#0EA5E9', // Sky blue
]

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null)
  const bgColor = bgColors[index % bgColors.length]
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity }}
      className="relative w-full h-[70vh] min-h-[500px] mb-16 rounded-3xl overflow-hidden group flex items-center justify-center cursor-pointer"
    >
      {/* Dynamic Background Color */}
      <div 
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundColor: bgColor }}
      />
      
      {/* Huge Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.h2 
          style={{ y }}
          className="text-[12vw] font-black uppercase text-white/20 whitespace-nowrap text-center leading-none"
        >
          {project.name}
        </motion.h2>
      </div>

      {/* Floating Project Image */}
      <motion.div 
        whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
        className="relative z-10 w-[80%] max-w-3xl rounded-xl shadow-2xl overflow-hidden border border-white/20 transition-all duration-500"
        style={{ perspective: 1000 }}
      >
        <div className="px-4 py-2 flex gap-2 border-b" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
           <div className="w-3 h-3 rounded-full bg-red-500" />
           <div className="w-3 h-3 rounded-full bg-yellow-500" />
           <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-auto object-cover"
        />
        
        {/* Hover Overlay with Links */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-6">
          <h3 className="text-3xl font-bold text-white text-center px-4">{project.name}</h3>
          <p className="text-gray-300 text-center px-8 max-w-xl">{project.description}</p>
          <div className="flex gap-4 mt-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub size={20} /> Code
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white border border-white/50 font-bold hover:bg-black/80 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={20} /> View Project
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProjectCard
