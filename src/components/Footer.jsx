import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { personalInfo, socialLinks } from '@/constants'
import { handleAnchor } from '@/utils/scroll'

const Footer = () => (
  <footer className="footer">
    <div className="wrap">
      <div className="footer-top">
        <a href="#top" onClick={handleAnchor('top')} className="footer-name">
          {personalInfo.name}
          <span className="accent">.</span>
        </a>
        <nav className="socials" aria-label="Social profiles">
          {socialLinks.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">
              {s.name} <ArrowUpRight size={13} />
            </a>
          ))}
        </nav>
        <a href="#top" onClick={handleAnchor('top')} className="icon-btn" aria-label="Back to top">
          <ArrowUp size={16} />
        </a>
      </div>

      <div className="footer-mega" aria-hidden="true">
        {personalInfo.firstName}
      </div>

      <div className="footer-bottom">
        <span className="label-sm">© {new Date().getFullYear()} {personalInfo.name}</span>
        <span className="label-sm">Designed & built with React · Framer Motion</span>
        <span className="label-sm">{personalInfo.location}</span>
      </div>
    </div>
  </footer>
)

export default Footer
