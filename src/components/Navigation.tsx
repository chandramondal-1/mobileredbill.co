import { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUIStore } from '@/stores'
import gsap from 'gsap'

const navLinks = [
  { label: 'HOME', path: '/' },
  { label: 'PRODUCTS', path: '/products' },
  { label: 'ESPORTS', path: '/esports' },
  { label: 'ATHLETES', path: '/athletes' },
  { label: 'ABOUT', path: '/about' },
  { label: 'CONTACT', path: '/contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const menuOpen = useUIStore((s) => s.menuOpen)
  const toggleMenu = useUIStore((s) => s.toggleMenu)
  const menuRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen && menuRef.current) {
      const items = menuRef.current.querySelectorAll('.menu-item')
      gsap.fromTo(
        items,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
      )
    }
  }, [menuOpen])

  useEffect(() => {
    useUIStore.getState().setMenuOpen(false)
    useUIStore.getState().setCurrentPage(location.pathname)
  }, [location])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050507]/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 relative">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <polygon
                  points="20,2 38,38 2,38"
                  fill="none"
                  stroke="#E31937"
                  strokeWidth="2"
                  className="transition-all duration-300 group-hover:fill-[#E31937]/20"
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
            <span className="font-display text-xl tracking-wider text-white hidden sm:block">
              KHAOS
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-secondary text-sm tracking-widest transition-colors duration-300 hover:text-[#E31937] ${
                  location.pathname === link.path ? 'text-[#E31937]' : 'text-white/70'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col gap-1.5 z-50 relative w-8 h-8 items-center justify-center"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>

          <Link
            to="/dashboard"
            className="hidden lg:block font-secondary text-sm tracking-widest bg-[#E31937] text-white px-6 py-2 hover:bg-[#ff3344] transition-colors duration-300"
          >
            CMS DASHBOARD
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 bg-[#050507]/98 backdrop-blur-2xl flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => useUIStore.getState().setMenuOpen(false)}
                className={`menu-item font-display text-5xl sm:text-7xl tracking-wider transition-colors duration-300 hover:text-[#E31937] ${
                  location.pathname === link.path ? 'text-[#E31937]' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/dashboard"
              onClick={() => useUIStore.getState().setMenuOpen(false)}
              className="menu-item font-display text-5xl sm:text-7xl tracking-wider text-[#4A90E2] hover:text-[#6ab7ff] transition-colors duration-300 mt-4"
            >
              DASHBOARD
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
