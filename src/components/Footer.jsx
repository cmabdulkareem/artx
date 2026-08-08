import { motion } from 'framer-motion';

const CORMORANT = '"Cormorant Garamond", serif';
const JOST      = '"Jost", sans-serif';

export default function Footer() {
  return (
    <footer className="relative py-14 overflow-hidden">
      {/* Glowing top border */}
      <div className="absolute top-0 left-0 right-0" style={{ height: '2px' }}>
        <div className="w-full h-full" style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,77,141,0.8) 20%, rgba(255,106,61,0.9) 50%, rgba(255,179,71,0.8) 80%, transparent)',
          boxShadow: '0 0 24px rgba(255,77,141,0.5), 0 0 50px rgba(255,106,61,0.2)',
        }} />
      </div>

      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to top, rgba(14,1,8,1) 60%, rgba(14,1,8,0.85) 100%)',
      }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at top, rgba(255,77,141,0.12) 0%, transparent 70%)',
        filter: 'blur(30px)',
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.7 }}>

            {/* Logo with breathing glow */}
            <div className="flex justify-center mb-5 relative">
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
                background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,77,141,0.22) 0%, rgba(255,106,61,0.1) 40%, transparent 70%)',
                filter: 'blur(20px)', transform: 'scale(1.5)',
              }} />
              <motion.img src="/logo.png" alt="ArtX'26"
                animate={{ filter:[
                  'drop-shadow(0 0 10px rgba(255,77,141,0.45)) drop-shadow(0 0 24px rgba(255,106,61,0.25))',
                  'drop-shadow(0 0 20px rgba(255,77,141,0.7))  drop-shadow(0 0 45px rgba(255,106,61,0.4))',
                  'drop-shadow(0 0 10px rgba(255,77,141,0.45)) drop-shadow(0 0 24px rgba(255,106,61,0.25))',
                ] }}
                transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
                style={{ width:'clamp(180px, 28vw, 260px)', height:'auto', mixBlendMode:'screen', position:'relative' }}
              />
            </div>

            {/* Glowing underbar */}
            <div className="flex justify-center mb-5">
              <div className="relative h-px w-36">
                <div className="absolute inset-0" style={{ background:'linear-gradient(90deg, transparent, #ff4d8d 20%, #ff6a3d 55%, #ffb347 80%, transparent)' }} />
                <div className="absolute inset-0" style={{ background:'linear-gradient(90deg, transparent, #ff4d8d 20%, #ff6a3d 55%, #ffb347 80%, transparent)', filter:'blur(6px)', opacity:0.6, transform:'scaleY(5)' }} />
              </div>
            </div>

            {/* Venue line — Cormorant */}
            <p style={{ fontFamily:CORMORANT, fontStyle:'italic', fontWeight:400, fontSize:'1.05rem', letterSpacing:'0.04em', color:'#E8D9DD', marginBottom:'0.4rem' }}>
              Municipal Conference Hall, Kasaragod
            </p>

            {/* Date/time — Jost label */}
            <p style={{ fontFamily:JOST, fontWeight:500, fontSize:'0.72rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'#BFAFB4' }}>
              19 August 2026 &nbsp;·&nbsp; 9:00 AM onwards
            </p>
          </motion.div>

          <div className="pt-8 mt-4">
            <div className="w-full mb-6" style={{ height:'1px', background:'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }} />

            {/* Credit line — Jost */}
            <p style={{ fontFamily:JOST, fontWeight:300, fontSize:'0.78rem', letterSpacing:'0.1em', color:'#BFAFB4', marginBottom:'0.4rem' }}>
              Designed for CDC International &nbsp;·&nbsp; Celebrating Art, Culture &amp; Creativity
            </p>
            <p style={{ fontFamily:JOST, fontWeight:300, fontSize:'0.7rem', letterSpacing:'0.08em', color:'rgba(191,175,180,0.55)' }}>
              © 2026 CDC ARTX'26. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}