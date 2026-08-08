import { motion } from 'framer-motion';
import { Sparkles, Download, Star } from 'lucide-react';

const CORMORANT = '"Cormorant Garamond", serif';
const JOST      = '"Jost", sans-serif';

const CONFETTI = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${(i * 3.4 + Math.sin(i * 0.8) * 15) % 100}%`,
  delay: `${(i * 0.5) % 10}s`,
  duration: `${10 + (i % 6) * 2}s`,
  color: i % 3 === 0 ? '#ff4d8d' : i % 3 === 1 ? '#ff6a3d' : '#ffb347',
  size: i % 4 === 0 ? '6px' : '3px',
}));

export default function RegisterCTA() {
  return (
    <section id="register" className="relative py-32 overflow-hidden">
      {/* Divider */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(90deg, transparent, rgba(255,77,141,0.7) 25%, rgba(255,106,61,0.8) 50%, rgba(255,179,71,0.7) 75%, transparent)',
        boxShadow: '0 0 20px rgba(255,77,141,0.4)',
      }} />

      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,106,61,0.15) 0%, rgba(255,77,141,0.08) 40%, transparent 70%)',
      }} />

      {/* Floating orbs */}
      <motion.div animate={{ x:[0,80,0], y:[0,-40,0], scale:[1,1.3,1] }} transition={{ duration:18, repeat:Infinity, ease:'linear' }}
        className="absolute top-10 right-10 w-96 h-96 rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle, rgba(255,77,141,0.3) 0%, transparent 70%)', filter:'blur(50px)' }} />
      <motion.div animate={{ x:[0,-80,0], y:[0,40,0], scale:[1,1.4,1] }} transition={{ duration:22, repeat:Infinity, ease:'linear' }}
        className="absolute bottom-10 left-10 w-96 h-96 rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle, rgba(255,106,61,0.3) 0%, transparent 70%)', filter:'blur(50px)' }} />

      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {CONFETTI.map(p => (
          <div key={p.id} className="absolute rounded-full" style={{
            left: p.left, bottom: '-10px', width: p.size, height: p.size,
            background: p.color, boxShadow: `0 0 8px ${p.color}, 0 0 16px ${p.color}`,
            animation: `particle-rise ${p.duration} ${p.delay} ease-in infinite`, opacity: 0,
          }} />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity:0, y:60, scale:0.92 }} whileInView={{ opacity:1, y:0, scale:1 }}
          viewport={{ once:true }} transition={{ duration:1, ease:'easeOut' }}
          className="glow-edge-intense" style={{ borderRadius:'1.5rem' }}
        >
          <div className="relative p-12 md:p-20 text-center overflow-hidden"
            style={{ background:'rgba(14,1,8,0.8)', backdropFilter:'blur(32px)', borderRadius:'1.5rem' }}>

            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse at center, rgba(255,106,61,0.12) 0%, transparent 60%)',
              borderRadius: '1.5rem',
            }} />

            <div className="relative z-10">
              

              {/* Eyebrow */}
              <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
                transition={{ duration:0.6, delay:0.2 }}
                style={{ fontFamily:JOST, fontWeight:600, fontSize:'0.65rem', letterSpacing:'0.32em', textTransform:'uppercase', color:'#ff4d8d', marginBottom:'1rem', filter:'drop-shadow(0 0 6px rgba(255,77,141,0.45))' }}>
                ✦ &nbsp; Step Into the Spotlight &nbsp; ✦
              </motion.p>

              {/* Main heading — Cormorant Garamond */}
              <motion.h2 initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.8, delay:0.25 }}
                style={{
                  fontFamily: CORMORANT, fontWeight:600,
                  fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                  letterSpacing: '0.06em', textTransform:'uppercase', lineHeight:1.1,
                  background:'linear-gradient(135deg, #F6C453 0%, #ff6a3d 50%, #E0A52B 100%)',
                  WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent',
                  filter:'drop-shadow(0 0 20px rgba(246,196,83,0.4))',
                  marginBottom: '1.5rem',
                }}>
                Ready to Perform?
              </motion.h2>

              {/* Subtitle */}
              <motion.p initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.8, delay:0.35 }}
                style={{
                  fontFamily:JOST, fontWeight:300, fontSize:'1.1rem', lineHeight:1.8,
                  color:'#E8D9DD', letterSpacing:'0.02em', marginBottom:'3rem',
                  maxWidth:'36rem', margin:'0 auto 3rem',
                }}>
                Showcase your talent in music, dance, art, games, and cultural competitions at CDC ARTX'26.
              </motion.p>

              {/* Buttons */}
              <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.8, delay:0.45 }}
                className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                <motion.a href="#" whileHover={{ scale:1.06, y:-3 }} whileTap={{ scale:0.96 }}
                  className="btn-primary text-white">
                  Register Now
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}