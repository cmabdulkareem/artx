import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CORMORANT = '"Cormorant Garamond", serif';
const JOST      = '"Jost", sans-serif';

const targetDate = new Date('2026-08-19T09:00:00');

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const diff = targetDate - new Date();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.65, ease: 'easeOut' }}
      className="glow-edge-intense inline-block mb-12 w-full max-w-3xl"
      style={{ borderRadius: '1rem' }}
    >
      <div className="glass-panel px-6 py-8 md:px-12 md:py-10" style={{ borderRadius: '1rem' }}>
        
        {/* Curiosity Text */}
        <div className="text-center mb-8">
          <p style={{
            fontFamily: JOST,
            fontWeight: 600,
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#ffb347',
            marginBottom: '0.5rem',
            filter: 'drop-shadow(0 0 6px rgba(255,179,71,0.5))'
          }}>
            ✦ &nbsp; The Stage is Being Set in : &nbsp; ✦
          </p>
        </div>

        {/* Countdown Digits */}
        <div className="flex justify-center items-center gap-3 md:gap-8">
          {timeUnits.map((unit, index, arr) => (
            <div key={unit.label} className="flex items-center">
              <div className="text-center w-16 md:w-24">
                <motion.div
                  key={unit.value}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{
                    fontFamily: '"Bebas Neue", monospace',
                    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                    background: 'linear-gradient(135deg, #ff4d8d 0%, #ff2f6d 20%, #ff6a3d 55%, #ffb347 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 12px rgba(255,106,61,0.4))',
                    lineHeight: 1
                  }}
                >
                  {String(unit.value).padStart(2, '0')}
                </motion.div>
                <div style={{
                  fontFamily: JOST,
                  fontWeight: 600,
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#BFAFB4',
                  marginTop: '0.5rem'
                }}>
                  {unit.label}
                </div>
              </div>
              
              {/* Separator Colon */}
              {index !== arr.length - 1 && (
                <div className="mx-1 md:mx-3 pb-6 md:pb-8" style={{
                  fontFamily: '"Bebas Neue", monospace',
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  color: 'rgba(255,106,61,0.4)',
                  lineHeight: 1
                }}>
                  :
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}