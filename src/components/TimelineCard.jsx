const TimelineCard = ({ item, index, globalIndex, isMobile }) => {
  const isTop = (globalIndex !== undefined ? globalIndex : index) % 2 === 0

  if (isMobile) {
    return (
      <div 
        className="timeline-card relative w-[92%] max-w-[380px] p-5 md:p-6 rounded-[22px] border overflow-hidden text-left mx-auto transition-all duration-300 hover:border-emerald-500/50"
        style={{
          background: 'var(--bg-card)',
          borderColor: 'var(--border)',
          boxShadow: '0 12px 35px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(16px)'
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, #10B981, #0EA5E9, #6366F1)' }} />
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 font-medium">
            {item.date}
          </span>
          {item.location && (
            <span className="text-[11px] text-gray-400 font-medium">
              {item.location}
            </span>
          )}
        </div>

        <h3 className="text-lg font-extrabold mb-1 leading-snug tracking-tight text-white group-hover:text-emerald-400 transition-colors">
          {item.title}
        </h3>

        <p className="text-xs mb-3 font-medium text-emerald-400/90">
          {item.company}
        </p>

        <div className="w-full h-[1px] mb-3 opacity-20" style={{ background: 'var(--border)' }} />

        <p className="text-[13px] leading-relaxed text-gray-300 line-clamp-3 mb-4">
          {Array.isArray(item.description) ? item.description[0] : item.description}
        </p>

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.tags.slice(0, 4).map((tag, tIdx) => (
              <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-300 font-code">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative flex flex-col justify-center w-[300px] md:w-[350px] shrink-0 h-[380px] md:h-[460px] group cursor-pointer">
      {/* Node Dot on central line */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-20 transition-all duration-300 group-hover:scale-125"
        style={{ 
          background: '#10B981', 
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.9), 0 0 40px rgba(16, 185, 129, 0.4)' 
        }}
      />

      {/* Vertical Connecting Line */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 w-[2px] z-10 transition-all duration-300 group-hover:w-[3px]"
        style={{
          background: isTop 
            ? 'linear-gradient(to top, #10B981, rgba(16, 185, 129, 0.3))' 
            : 'linear-gradient(to bottom, #10B981, rgba(16, 185, 129, 0.3))',
          height: '42px',
          top: isTop ? 'auto' : '50%',
          bottom: isTop ? '50%' : 'auto',
        }}
      />

      {/* Card Body */}
      <div
        className="absolute left-0 w-full p-5 md:p-6 text-left rounded-[22px] transition-all duration-300 border group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)]"
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          top: isTop ? 'auto' : 'calc(50% + 42px)',
          bottom: isTop ? 'calc(50% + 42px)' : 'auto',
          boxShadow: '0 10px 35px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(16px)'
        }}
      >
        {/* Glowing Top Accent Bar */}
        <div 
          className="absolute top-0 left-5 right-5 h-[2px] rounded-full transition-all duration-300 group-hover:left-2 group-hover:right-2" 
          style={{ background: 'linear-gradient(90deg, #10B981, #0EA5E9)' }} 
        />

        {/* Date & Location Header */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            {item.date}
          </span>
          {item.location && (
            <span className="text-[10px] md:text-[11px] text-gray-400 font-medium truncate max-w-[120px]">
              {item.location}
            </span>
          )}
        </div>

        {/* Job Title */}
        <h3 className="text-base md:text-lg font-black mb-1 leading-snug tracking-tight text-white group-hover:text-emerald-300 transition-colors">
          {item.title}
        </h3>

        {/* Company Name */}
        <p className="text-xs md:text-sm font-semibold text-emerald-400/90 mb-3 line-clamp-1">
          {item.company}
        </p>

        {/* Description Highlight */}
        <div className="text-xs md:text-[13px] leading-relaxed text-gray-300 mb-4">
          <p className="line-clamp-3">
            {Array.isArray(item.description) ? item.description[0] : item.description}
          </p>
        </div>

        {/* Tech Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
            {item.tags.slice(0, 4).map((tag, tIdx) => (
              <span 
                key={tIdx} 
                className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-emerald-200/80 font-mono tracking-wider"
              >
                {tag}
              </span>
            ))}
            {item.tags.length > 4 && (
              <span className="text-[10px] px-1.5 py-0.5 text-gray-400 font-mono">
                +{item.tags.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TimelineCard
