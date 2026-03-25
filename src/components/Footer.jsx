import { FaGithub, FaLinkedin, FaTwitter, FaYoutube, FaInstagram, FaDev } from 'react-icons/fa'
import { socialLinks, personalInfo } from '@/constants'

const iconMap = { FaGithub, FaLinkedin, FaTwitter, FaYoutube, FaInstagram, FaDev }

const Footer = () => {
  return (
    <footer className="w-full py-12 relative overflow-hidden mt-4" style={{ background: 'var(--bg-primary)' }}>
      
      {/* Elegant Horizontal Divider signaling end of Contact */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Continuous Space Dotted Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Hero Green Glowing Ribbon */}
      <div 
        className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[120%] md:w-full max-w-4xl h-40 md:h-64 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(16, 185, 129, 0.4) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 100%)',
          filter: 'blur(40px)',
          zIndex: 0
        }}
      />
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center justify-center text-center gap-5 relative z-10">
        
        {/* Adjusted Size Name */}
        <h2 className="text-xl md:text-2xl font-bold tracking-wider relative z-10" style={{ color: 'var(--text-primary)' }}>
          {personalInfo.name}
        </h2>

        {/* Social Icons Flex Centered Tight */}
        <div className="flex items-center justify-center gap-5 md:gap-8 my-1">
          {socialLinks.map(({ name, url, icon }) => {
            const Icon = iconMap[icon] || FaGithub // Fallback
            return (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="transition-all duration-300 hover:scale-125"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#10B981')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <Icon size={20} className="md:w-6 md:h-6" />
              </a>
            )
          })}
        </div>

        {/* Quote */}
        <p className="text-sm italic tracking-wide" style={{ color: 'var(--text-secondary)' }}>
          "Success is when preparation meets opportunity"
        </p>

        {/* Copyright */}
        <p className="text-xs mt-4" style={{ color: 'var(--text-tertiary)' }}>
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>

      </div>
    </footer>
  )
}

export default Footer
