import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles, Star } from 'lucide-react';
import Countdown from './Countdown';

/* ── Shared style helpers ─────────────────────────────────────────────── */
const CORMORANT = '"Cormorant Garamond", serif';
const JOST      = '"Jost", sans-serif';

const eventInfo = [
  { label: 'Date',     value: '19 August 2026' },
  { label: 'Time',     value: '9:00 AM Onwards' },
  { label: 'Venue',    value: 'Municipal Conference Hall' },
  { label: 'Location', value: 'Kasaragod, Kerala' },
];

/* ─── Particle field ─────────────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: `${(i * 2.5 + Math.sin(i) * 10) % 100}%`,
  delay: `${(i * 0.6) % 14}s`,
  duration: `${14 + (i % 8) * 2}s`,
  size: i % 3 === 0 ? '3px' : i % 5 === 0 ? '5px' : '2px',
  color: i % 3 === 0 ? '#ff4d8d' : i % 3 === 1 ? '#ff6a3d' : '#ffb347',
}));

/* ─── Arc ring ────────────────────────────────────────────────────────── */
const ArcRing = () => (
  <svg viewBox="0 0 1200 500" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl pointer-events-none" style={{ zIndex: 1 }} fill="none" aria-hidden="true">
    <defs>
      <radialGradient id="arc-glow" cx="50%" cy="100%" r="70%">
        <stop offset="0%"   stopColor="#ffb347" stopOpacity="0.35" />
        <stop offset="50%"  stopColor="#ff6a3d" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#ff4d8d" stopOpacity="0"    />
      </radialGradient>
      <linearGradient id="arc-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="transparent" />
        <stop offset="20%"  stopColor="#ffb347" stopOpacity="0.6" />
        <stop offset="50%"  stopColor="#ff6a3d" stopOpacity="0.8" />
        <stop offset="80%"  stopColor="#ff4d8d" stopOpacity="0.6" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
      <filter id="arc-blur"><feGaussianBlur stdDeviation="3" /></filter>
    </defs>
    <ellipse cx="600" cy="500" rx="560" ry="380" fill="url(#arc-glow)" />
    <path d="M 60 500 A 540 400 0 0 1 1140 500" stroke="url(#arc-stroke)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 60 500 A 540 400 0 0 1 1140 500" stroke="url(#arc-stroke)" strokeWidth="8"   strokeLinecap="round" filter="url(#arc-blur)" opacity="0.5" />
    <path d="M 120 500 A 480 340 0 0 1 1080 500" stroke="#ffb347" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
    <path d="M 0 500 A 610 450 0 0 1 1200 500"   stroke="#ff4d8d" strokeWidth="0.5" strokeLinecap="round" opacity="0.2" />
  </svg>
);

/* ─── Grid ────────────────────────────────────────────────────────────── */
const GridLines = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" aria-hidden="true">
    <defs>
      <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
        <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.8" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

/* ─── Polygon silhouettes ─────────────────────────────────────────────── */

export default function Hero() {
  const { scrollY } = useScroll();
  const y1      = useTransform(scrollY, [0, 600], [0, -120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #2a0516 0%, #1a020d 40%, #0e0108 100%)' }}
    >
      <GridLines />

      {/* Scan-line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute w-full h-[2px] bg-white/[0.03]" style={{ animation: 'scan-line 8s linear infinite' }} />
      </div>

      {/* Ambient blobs */}
      <motion.div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle, rgba(255,77,141,0.22) 0%, transparent 70%)', filter:'blur(40px)', y:y1 }} />
      <motion.div className="absolute top-[-5%] right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle, rgba(255,106,61,0.18) 0%, transparent 70%)', filter:'blur(50px)', y:y1 }} />
      <motion.div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full pointer-events-none"
        style={{ background:'radial-gradient(ellipse, rgba(255,179,71,0.12) 0%, transparent 70%)', filter:'blur(60px)', y:y1 }} />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {PARTICLES.map(p => (
          <div key={p.id} className="absolute rounded-full" style={{
            left: p.left, bottom: '-10px', width: p.size, height: p.size,
            background: p.color, boxShadow: `0 0 6px ${p.color}, 0 0 12px ${p.color}`,
            animation: `particle-rise ${p.duration} ${p.delay} linear infinite`, opacity: 0,
          }} />
        ))}
      </div>

      <ArcRing />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <motion.div style={{ y: y1, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-56">
        
        {/* Desktop: Logo only (hidden on mobile) */}
        <div className="hidden md:block">
          {/* ── LOGO — centrepiece ───────────────────────────────────── */}
          <motion.div
            initial={{ scale: 0.65, opacity: 0, y: 60 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative inline-block"
          >
            {/* Dark vignette BEHIND logo — deepens contrast instead of washing out */}
            <div
              className="absolute pointer-events-none"
              aria-hidden="true"
              style={{
                inset: '-20%',
                background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(10,1,6,0.7) 0%, transparent 70%)',
                filter: 'blur(24px)',
                zIndex: 0,
              }}
            />

            {/* Logo image with edge-only neon drop-shadow (no halos underneath) */}
            <motion.div
              style={{ position: 'relative', zIndex: 1 }}
              animate={{ filter: [
                'drop-shadow(0 0 14px rgba(255,77,141,0.6)) drop-shadow(0 0 35px rgba(255,106,61,0.35))',
                'drop-shadow(0 0 26px rgba(255,77,141,0.9)) drop-shadow(0 0 60px rgba(255,106,61,0.55)) drop-shadow(0 0 90px rgba(255,179,71,0.3))',
                'drop-shadow(0 0 14px rgba(255,77,141,0.6)) drop-shadow(0 0 35px rgba(255,106,61,0.35))',
              ] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.img
                src="/logo.png" alt="ArtX'26 — CDC International"
                className="anim-glitch"
                style={{ width: 'clamp(280px, 50vw, 580px)', height: 'auto', mixBlendMode: 'screen', display: 'block', margin: '0 auto' }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile: Full content (hidden on desktop) */}
        <div className="md:hidden">
          {/* Top label */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="inline-flex items-center gap-4 mb-10"
          >
            <span style={{
              fontFamily: JOST,
              fontWeight: 600,
              fontSize: '0.55rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#FFF7F7',
            }}>
              CDC International Presents
            </span>
          </motion.div>

          {/* LOGO */}
          <motion.div
            initial={{ scale: 0.65, opacity: 0, y: 60 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative inline-block mb-1"
          >
            <div
              className="absolute pointer-events-none"
              aria-hidden="true"
              style={{
                inset: '-20%',
                background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(10,1,6,0.7) 0%, transparent 70%)',
                filter: 'blur(24px)',
                zIndex: 0,
              }}
            />
            <motion.div
              style={{ position: 'relative', zIndex: 1 }}
              animate={{ filter: [
                'drop-shadow(0 0 14px rgba(255,77,141,0.6)) drop-shadow(0 0 35px rgba(255,106,61,0.35))',
                'drop-shadow(0 0 26px rgba(255,77,141,0.9)) drop-shadow(0 0 60px rgba(255,106,61,0.55)) drop-shadow(0 0 90px rgba(255,179,71,0.3))',
                'drop-shadow(0 0 14px rgba(255,77,141,0.6)) drop-shadow(0 0 35px rgba(255,106,61,0.35))',
              ] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.img
                src="/logo.png" alt="ArtX'26 — CDC International"
                className="anim-glitch"
                style={{ width: 'clamp(280px, 50vw, 580px)', height: 'auto', mixBlendMode: 'screen', display: 'block', margin: '0 auto' }}
              />
            </motion.div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
            style={{
              fontFamily: JOST,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(0.8rem, 2.5vw, 1.75rem)',
              letterSpacing: '0.04em',
              color: '#FEC753',
              marginTop: '-1.5rem',
              marginBottom: '2.5rem',
            }}
          >
            A Celebration of Art, Music, Dance & Culture
          </motion.p>

          {/* Countdown */}
          <Countdown />

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            {/* <motion.a href="#register" whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.96 }}
              className="btn-primary text-white">
              Register Now
            </motion.a> */}
            <motion.a href="#events" whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.96 }}
              className="px-10 py-3.5 rounded-full transition-all duration-300 backdrop-blur-sm"
              style={{
                fontFamily: JOST, fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#ff4d8d',
                border: '2px solid rgba(255,77,141,0.45)',
                boxShadow: '0 0 18px rgba(255,77,141,0.12), inset 0 0 18px rgba(255,77,141,0.04)',
              }}>
              Explore Events
            </motion.a>
          </motion.div>

         
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0"
        style={{ zIndex: 0 }}>
        <span style={{ fontFamily:JOST, fontSize:'0.6rem', letterSpacing:'0.35em', textTransform:'uppercase', color:'#BFAFB4', fontWeight:500 }}>
          Scroll
        </span>
        <div className="relative w-screen h-60">
          <img
            src="/afrodesign.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            style={{ 
              zIndex: -1,
              filter: 'drop-shadow(0 0 12px rgba(255,179,71,0.5))',
              maskImage: 'linear-gradient(to bottom, black 0%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 100%)',
              opacity: 0.2
            }}
          />
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'relative', zIndex: 1 }} className="flex items-start justify-center h-full pt-1">
            <ChevronDown className="w-7 h-7" style={{ color: '#ffb347', filter: 'drop-shadow(0 0 8px rgba(255,179,71,0.6))' }} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}