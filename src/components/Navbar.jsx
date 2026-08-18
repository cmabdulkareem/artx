import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const moreLinks = [
  {
    name: 'Live Results',
    href: '/live-results',
    description: 'Real-time scoreboard',
    color: '#ff4d8d',
  },
  {
    name: 'Quiz Screen',
    href: '/quiz',
    description: 'Presentation display',
    color: '#F6C453',
  },
  {
    name: 'Quiz Master',
    href: '/quiz-master',
    description: 'Host control console',
    color: '#ffb347',
  },
  {
    name: 'Memory Challenge',
    href: '/memory-challenge',
    description: 'Memory game display',
    color: '#a78bfa',
  },
  {
    name: 'Memory Master',
    href: '/memory-master',
    description: 'Memory host console',
    color: '#c4b5fd',
  },
];

export default function Navbar({ isLiveResults }) {
  const [isScrolled,    setIsScrolled]    = useState(false);
  const [showLogo,      setShowLogo]      = useState(false);
  const [isMobileOpen,  setIsMobileOpen]  = useState(false);
  const [isMoreOpen,    setIsMoreOpen]    = useState(false);
  const [mobileMoreOpen,setMobileMoreOpen]= useState(false);
  const moreRef = useRef(null);

  const navLinks = [
    { name: 'Home',   href: isLiveResults ? '/' : '#home'   },
    { name: 'Events', href: isLiveResults ? '/events' : '#events' },
    { name: 'Rules',  href: isLiveResults ? '/rules'  : '#rules'  },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowLogo(window.scrollY >= window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close "More" dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0,    opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0e0108]/90 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      {/* Glowing bottom border when scrolled */}
      {isScrolled && (
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, #ff4d8d 30%, #ff6a3d 60%, #ffb347 80%, transparent)',
            boxShadow: '0 0 12px rgba(255,77,141,0.5), 0 0 30px rgba(255,106,61,0.2)',
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: showLogo ? 1 : 0, scale: showLogo ? 1 : 0.8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative"
            >
              <div
                className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(255,77,141,0.2) 0%, transparent 70%)', filter: 'blur(8px)' }}
              />
              <img
                src="/logo.png"
                alt="ArtX'26"
                className="h-10 w-auto relative z-10 transition-all duration-300 group-hover:scale-105"
                style={{ mixBlendMode: 'screen', filter: 'drop-shadow(0 0 8px rgba(255,77,141,0.5)) drop-shadow(0 0 20px rgba(255,106,61,0.3))' }}
              />
            </motion.div>
          </a>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-8">
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>

              {/* Regular links */}
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative group"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#BFAFB4',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#BFAFB4'}
                >
                  {link.name}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-[1.5px] group-hover:w-full transition-all duration-300 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #ff4d8d, #ff6a3d)', boxShadow: '0 0 8px rgba(255,77,141,0.7)' }}
                  />
                </a>
              ))}

              {/* More dropdown */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setIsMoreOpen(p => !p)}
                  className="flex items-center gap-1 relative group"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: isMoreOpen ? '#fff' : '#BFAFB4',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                  }}
                >
                  More
                  <motion.span animate={{ rotate: isMoreOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={13} strokeWidth={2.5} />
                  </motion.span>
                  <span
                    className={`absolute -bottom-1 left-0 h-[1.5px] rounded-full transition-all duration-300 ${isMoreOpen ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    style={{ background: 'linear-gradient(90deg, #ff4d8d, #ff6a3d)', boxShadow: '0 0 8px rgba(255,77,141,0.7)' }}
                  />
                </button>

                {/* Dropdown Panel */}
                <AnimatePresence>
                  {isMoreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0,  scale: 1    }}
                      exit={{ opacity: 0, y: 10, scale: 0.97    }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute right-0 mt-4 w-56 rounded-2xl border border-white/[0.07] overflow-hidden shadow-2xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(20,3,11,0.98) 0%, rgba(14,1,8,0.98) 100%)',
                        backdropFilter: 'blur(30px)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,77,141,0.05)',
                      }}
                    >
                      <div className="p-2 space-y-0.5">
                        {moreLinks.map((link) => (
                          <Link
                            key={link.href}
                            to={link.href}
                            onClick={() => setIsMoreOpen(false)}
                            className="flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group"
                            style={{ textDecoration: 'none' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            {/* color dot */}
                            <span
                              className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
                              style={{ background: link.color, boxShadow: `0 0 6px ${link.color}80` }}
                            />
                            <div>
                              <p
                                className="font-bold text-[11px] uppercase tracking-wider"
                                style={{ fontFamily: '"Jost", sans-serif', color: link.color }}
                              >
                                {link.name}
                              </p>
                              <p
                                className="text-[10px] mt-0.5 text-white/30"
                                style={{ fontFamily: '"Jost", sans-serif' }}
                              >
                                {link.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* bottom gradient accent */}
                      <div
                        className="h-px w-full"
                        style={{ background: 'linear-gradient(90deg, transparent, #ff4d8d40, transparent)' }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* ── Mobile burger ── */}
          <button
            onClick={() => { setIsMobileOpen(!isMobileOpen); setMobileMoreOpen(false); }}
            className="md:hidden text-[#FFF7F7] p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden backdrop-blur-2xl border-b border-white/[0.06]"
            style={{ background: 'rgba(14,1,8,0.97)' }}
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  style={{
                    display: 'block',
                    fontFamily: '"Jost", sans-serif',
                    fontWeight: 500,
                    fontSize: '1.05rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#E8D9DD',
                  }}
                >
                  {link.name}
                </a>
              ))}

              {/* Mobile More accordion */}
              <div className="border-t border-white/5 pt-4">
                <button
                  onClick={() => setMobileMoreOpen(p => !p)}
                  className="flex items-center justify-between w-full"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontWeight: 500,
                    fontSize: '1.05rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#E8D9DD',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <span>More</span>
                  <motion.span animate={{ rotate: mobileMoreOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={18} style={{ color: '#E8D9DD' }} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {mobileMoreOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 space-y-1 pl-2 border-l-2 border-white/10"
                    >
                      {moreLinks.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          onClick={() => { setIsMobileOpen(false); setMobileMoreOpen(false); }}
                          className="flex items-center gap-3 py-2.5 px-2 rounded-lg"
                          style={{ textDecoration: 'none' }}
                        >
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: link.color, boxShadow: `0 0 6px ${link.color}80` }}
                          />
                          <div>
                            <p
                              className="font-bold text-sm uppercase tracking-wider"
                              style={{ fontFamily: '"Jost", sans-serif', color: link.color }}
                            >
                              {link.name}
                            </p>
                            <p className="text-[11px] text-white/30" style={{ fontFamily: '"Jost", sans-serif' }}>
                              {link.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
