import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play, Sparkles } from 'lucide-react';
import bgmUrl from '../assets/bgm.mp3';

const CONFETTI = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${(i * 3.4 + Math.sin(i * 0.8) * 15) % 100}%`,
  delay: `${(i * 0.5) % 10}s`,
  duration: `${10 + (i % 6) * 2}s`,
  color: i % 3 === 0 ? '#ff4d8d' : i % 3 === 1 ? '#ff6a3d' : '#ffb347',
  size: i % 4 === 0 ? '6px' : '3px',
}));

export default function MusicController() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element with preload
    audioRef.current = new Audio(bgmUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.preload = 'auto';
    
    // Set audio attributes for better autoplay chance
    audioRef.current.setAttribute('playsinline', '');
    audioRef.current.setAttribute('webkit-playsinline', '');

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleEnterSite = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.log('Playback failed on enter:', error);
    }
    setHasEntered(true);
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Playback toggle failed');
    }
  };

  return (
    <>
      {/* Intro Overlay Screen */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.15, filter: 'blur(20px)' }}
            transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
            onClick={handleEnterSite}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0e0108] cursor-pointer origin-center"
          >
            {/* Particles / Soda animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
              {CONFETTI.map(p => (
                <div key={p.id} className="absolute rounded-full" style={{
                  left: p.left, bottom: '-10px', width: p.size, height: p.size,
                  background: p.color, boxShadow: `0 0 8px ${p.color}, 0 0 16px ${p.color}`,
                  animation: `particle-rise ${p.duration} ${p.delay} ease-in infinite`, opacity: 0,
                }} />
              ))}
            </div>

            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,77,141,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }} />
            
            <motion.div
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative z-10 flex flex-col items-center gap-12"
            >
              <motion.img layoutId="main-logo" src="/logo.png" alt="ArtX'26" className="w-64 md:w-96 anim-glitch" 
                style={{ mixBlendMode: 'screen', filter: 'drop-shadow(0 0 20px rgba(255,77,141,0.5))' }} />

              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontWeight: 500,
                  fontSize: '0.8rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#BFAFB4',
                }}
              >
                touch to reveal more info
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Music Control Button */}
      <AnimatePresence>
        {hasEntered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
            onClick={togglePlay}
            className="fixed bottom-8 right-8 z-50 group cursor-pointer"
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            <div className="relative">
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle, rgba(255,77,141,0.4) 0%, transparent 70%)',
                  filter: 'blur(12px)',
                  transform: 'scale(1.5)',
                }}
              />
              
              {/* Button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-16 h-16 rounded-full flex items-center justify-center border-2 border-[#ffb347]/40 backdrop-blur-xl"
                style={{
                  background: 'rgba(14,1,8,0.85)',
                  boxShadow: '0 0 20px rgba(255,77,141,0.3), 0 0 40px rgba(255,106,61,0.2)',
                }}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-[#ffb347]" />
                ) : (
                  <Play className="w-6 h-6 text-[#ffb347] ml-1" />
                )}
                
                {/* Animated ring when playing */}
                {isPlaying && (
                  <motion.div
                    animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full border-2 border-[#ff4d8d]"
                  />
                )}
              </motion.div>

              {/* Tooltip */}
              <div
                className="absolute bottom-20 right-0 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none"
                style={{
                  background: 'rgba(14,1,8,0.95)',
                  border: '1px solid rgba(255,179,71,0.3)',
                  boxShadow: '0 0 20px rgba(255,77,141,0.2)',
                }}
              >
                <p
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#FFF7F7',
                  }}
                >
                  {isPlaying ? 'Pause Music' : 'Play Music'}
                </p>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}