const TimelineCard = ({ item, index, isMobile }) => {
  const isTop = index % 2 === 0

  if (isMobile) {
    return (
      <div 
        className="timeline-card relative w-[92%] max-w-[360px] p-5 md:p-6 rounded-[20px] border overflow-hidden text-left mx-auto"
        style={{
          background: 'var(--bg-card)',
          borderColor: 'var(--border)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, #10B981, #0EA5E9)' }} />
        <h3 className="text-lg md:text-xl font-extrabold mb-1 md:mb-2 leading-tight" style={{ color: '#10B981' }}>{item.title}</h3>
        <p className="text-xs mb-3 md:mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <span className="font-bold text-[13px] md:text-sm" style={{ color: 'var(--text-primary)' }}>{item.company}</span>
          <span className="mx-2 opacity-50">|</span> 
          <span className="font-code uppercase tracking-wider">{item.date}</span>
        </p>
        <div className="w-full h-[1px] mb-4" style={{ background: 'var(--border)' }} />
        <p className="text-[12px] md:text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {item.description && item.description.length > 0 ? item.description[0] : item.description}
        </p>
      </div>
    )
  }

  return (
    <div className="relative flex flex-col justify-center w-[280px] md:w-[320px] shrink-0 h-[350px] md:h-[450px] group cursor-pointer">
      {/* Node Dot - colored Hero Green on hover */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-10 transition-all duration-300 group-hover:scale-125"
        style={{ background: '#10B981', boxShadow: '0 0 15px rgba(16, 185, 129, 0.8)' }}
      />

      {/* Vertical Connecting Line - Subtle Green */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 w-[2px] z-0 transition-colors duration-300 group-hover:bg-[#10B981]"
        style={{
          background: 'rgba(16, 185, 129, 0.3)',
          height: '40px',
          top: isTop ? 'auto' : '50%',
          bottom: isTop ? '50%' : 'auto',
        }}
      />

      {/* Card Content - Pure CSS driven for perfect Marquee rendering */}
      <div
        className="absolute left-0 w-full p-6 text-left rounded-[20px] transition-all duration-300 border hover:-translate-y-2"
        style={{
          background: 'var(--bg-card)',
          borderColor: 'var(--border)',
          top: isTop ? 'auto' : 'calc(50% + 40px)',
          bottom: isTop ? 'calc(50% + 40px)' : 'auto',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <h3 className="text-lg md:text-[20px] font-bold mb-2 leading-tight" style={{ color: '#10B981' }}>
          {item.title}
        </h3>
        <p className="text-xs md:text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{item.company}</span> <span className="mx-2 opacity-50">|</span> {item.date}
        </p>
        <div className="text-[13px] md:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {/* Show full array or compact first sentence for readability during scrolling */}
          <p className="line-clamp-4">{item.description && item.description.length > 0 ? item.description[0] : item.description}</p>
        </div>
      </div>
    </div>
  )
}

export default TimelineCard
