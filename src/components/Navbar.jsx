import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home',     href: '#home' },
  { name: 'Events',   href: '#events' },
  { name: 'Schedule', href: '#schedule' },
  { name: 'Rules',    href: '#rules' },
  { name: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled]   = useState(false);
  const [showLogo, setShowLogo]       = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      // Show logo exactly when hero section is completely scrolled away
      setShowLogo(window.scrollY >= window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
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

          {/* Logo - only visible after hero section */}
          <a href="#home" className="flex items-center gap-3 group relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: showLogo ? 1 : 0,
                scale: showLogo ? 1 : 0.8
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative"
            >
              <div
                className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255,77,141,0.2) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
              />
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="ArtX'26"
                  className="h-10 w-auto relative z-10 transition-all duration-300 group-hover:scale-105"
                  style={{
                    mixBlendMode: 'screen',
                    filter: 'drop-shadow(0 0 8px rgba(255,77,141,0.5)) drop-shadow(0 0 20px rgba(255,106,61,0.3))',
                  }}
                />
              </div>
            </motion.div>
            <span
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(246,196,83,0.65)',
              }}
              className="hidden sm:block"
            >
              CDC Presents
            </span>
          </a>

          {/* Desktop nav — Jost, wide tracking */}
          <div className="hidden md:flex items-center gap-8">
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
                  style={{
                    background: 'linear-gradient(90deg, #ff4d8d, #ff6a3d)',
                    boxShadow: '0 0 8px rgba(255,77,141,0.7)',
                  }}
                />
              </a>
            ))}
            <a
              href="#register"
              className="btn-primary text-white"
            >
              Register
            </a>
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-[#FFF7F7] p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden backdrop-blur-2xl border-b border-white/[0.06]"
            style={{ background: 'rgba(14,1,8,0.96)' }}
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
              <a
                href="#register"
                onClick={() => setIsMobileOpen(false)}
                className="btn-primary block text-center text-white mt-4"
              >
                Register Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}