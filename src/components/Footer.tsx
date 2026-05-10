import { Link } from 'react-router-dom'
import { Zap, Twitter, Instagram, Youtube, Twitch } from 'lucide-react'

const footerLinks = {
  Shop: ['Original', 'Zero Sugar', 'Summer Edition', 'Frost Edition'],
  Team: ['Athletes', 'Esports', 'Partners', 'Events'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
}

export default function Footer() {
  return (
    <footer className="relative bg-[#001B44] border-t border-white/5">
      <div className="w-full px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Logo & Tagline */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 relative">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <polygon
                    points="20,2 38,38 2,38"
                    fill="none"
                    stroke="#E31937"
                    strokeWidth="2"
                  />
                  <text
                    x="20"
                    y="30"
                    textAnchor="middle"
                    fill="#E31937"
                    fontSize="14"
                    fontFamily="Anton, sans-serif"
                  >
                    K
                  </text>
                </svg>
              </div>
              <span className="font-display text-3xl tracking-wider text-white">
                KHAOS
              </span>
            </div>
            <p className="font-body text-sm text-[#8A8F98] max-w-xs mb-8 leading-relaxed">
              Unleash the storm. Premium energy fuel for athletes, gamers, and
              those who push beyond limits.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Instagram, Youtube, Twitch].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/60 hover:text-[#E31937] hover:border-[#E31937]/50 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-2">
              <h4 className="font-secondary text-sm tracking-widest text-white mb-6">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-sm text-[#8A8F98] hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Subscribe */}
          <div className="lg:col-span-2">
            <h4 className="font-secondary text-sm tracking-widest text-white mb-6">
              STAY CHARGED
            </h4>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-transparent border border-white/10 px-4 py-3 font-body text-sm text-white placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#E31937]/50 transition-colors duration-300"
              />
              <button className="w-full bg-[#E31937] text-white font-secondary text-sm tracking-widest py-3 hover:bg-[#ff3344] transition-colors duration-300 flex items-center justify-center gap-2">
                <Zap size={14} />
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-[#8A8F98]">
            &copy; {new Date().getFullYear()} Khaos Energy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="font-body text-xs text-[#8A8F98] hover:text-[#4A90E2] transition-colors duration-300"
            >
              Admin Dashboard
            </Link>
            <span className="font-body text-xs text-[#8A8F98]">
              Crafted with chaos
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
