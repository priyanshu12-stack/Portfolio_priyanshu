import { motion } from 'framer-motion'
import { experiences } from '@/constants'
import { fadeIn } from '@/utils/motion'
import TimelineCard from '@/components/TimelineCard'
import SectionWrapper from '@/components/SectionWrapper'

const Experience = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center py-4 md:py-8 z-10 ">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          /* Pause the continuous rotation if the user hovers over the section to read it */
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Subtle background glow mimicking the Hero section */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[150px] pointer-events-none z-0" 
        style={{ background: 'rgba(16, 185, 129, 0.08)' }}
      />

      <div className="text-center mb-8 md:mb-12 w-full px-2 md:px-4 shrink-0 z-10 flex flex-col items-center">
        <motion.div variants={fadeIn('up', 0.1)} initial="initial" whileInView="animate" viewport={{ once: true }} className="flex items-center gap-2 md:gap-4 mb-2 md:mb-3">
          <span className="w-6 md:w-16 h-[2px] rounded-full" style={{ background: '#10B981' }} />
          <h2
            className="text-[25px] md:text-5xl pt-10 font-black uppercase tracking-widest"
            style={{ color: 'var(--text-primary)' }}
          >
            EXPERIENCE
          </h2>
          <span className="w-6 md:w-16 h-[2px] rounded-full" style={{ background: '#10B981' }} />
        </motion.div>
      </div>

      {/* Mobile Vertical Stack */}
      <div className="flex md:hidden flex-col gap-10 w-full items-center z-10 px-6 mt-4 pb-24">
        {experiences.map((item, index) => (
          <TimelineCard key={"mob-" + index} item={item} index={index} isMobile={true} />
        ))}
      </div>

      {/* Desktop Horizontal auto-scroll marquee container */}
      <div className="hidden md:flex relative w-full overflow-hidden items-center h-[580px] z-10 cursor-pointer">
        {/* Main Horizontal Line */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[2px] z-0" style={{ background: 'rgba(16, 185, 129, 0.25)' }} />

        {/* The Marquee Track seamlessly translating by -50% comprising two exact halves */}
        <div className="flex w-max animate-marquee h-full">
          {/* First loop (loop 0) */}
          <div className="flex gap-16 md:gap-24 pr-16 md:pr-24 items-center h-full">
            {experiences.map((item, index) => (
              <TimelineCard key={"first" + index} item={item} index={index} globalIndex={0 * experiences.length + index} />
            ))}
          </div>
          {/* Second identical loop (loop 1) */}
          <div className="flex gap-16 md:gap-24 pr-16 md:pr-24 items-center h-full">
            {experiences.map((item, index) => (
              <TimelineCard key={"second" + index} item={item} index={index} globalIndex={1 * experiences.length + index} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-400 opacity-60 z-10">
        <span className="text-[10px] md:text-xs font-code tracking-widest uppercase animate-pulse">
          Hover to pause and read
        </span>
      </div>

    </div>
  )
}

export default SectionWrapper(Experience, 'experience')
