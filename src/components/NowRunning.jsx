import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Sparkles, Radio } from 'lucide-react';

const CORMORANT = '"Cormorant Garamond", serif';
const JOST      = '"Jost", sans-serif';

// Event schedule with start and end times
const schedule = [
  // On-Stage
  { time: '09:00–10:00 AM', title: 'Speech', start: '09:00', end: '10:00', category: 'On-Stage', icon: 'Mic' },
  { time: '10:00–10:30 AM', title: 'Memory Challenge', start: '10:00', end: '10:30', category: 'On-Stage', icon: 'Mic' },
  { time: '10:30–11:00 AM', title: 'Quiz', start: '10:30', end: '11:00', category: 'On-Stage', icon: 'Mic' },
  { time: '11:00–12:00 AM', title: 'Ramp Walk', start: '11:00', end: '12:00', category: 'On-Stage', icon: 'Mic' },
  { time: '12:00–12:55 PM', title: 'Single Dance', start: '12:00', end: '12:55', category: 'On-Stage', icon: 'Mic' },
  { time: '12:55–02:10 PM', title: 'Single Song', start: '12:55', end: '14:10', category: 'On-Stage', icon: 'Mic' },
  { time: '02:10–02:30 PM', title: 'Group Song', start: '14:10', end: '14:30', category: 'On-Stage', icon: 'Mic' },
  { time: '02:30–03:30 PM', title: 'Group Dance', start: '14:30', end: '15:30', category: 'On-Stage', icon: 'Mic' },
  // Off-Stage
  { time: '09:00–10:00 AM', title: 'Mehandi', start: '09:00', end: '10:00', category: 'Off-Stage', icon: 'Sparkles' },
  { time: '10:00–10:30 AM', title: 'Musical Chair', start: '10:00', end: '10:30', category: 'Off-Stage', icon: 'Sparkles' },
  { time: '10:30–11:00 AM', title: 'Lemon and Spoon', start: '10:30', end: '11:00', category: 'Off-Stage', icon: 'Sparkles' },
  { time: '01:00–01:45 PM', title: 'UNO', start: '13:00', end: '13:45', category: 'Off-Stage', icon: 'Sparkles' },
  { time: '01:00–02:00 PM', title: 'Face Painting', start: '13:00', end: '14:00', category: 'Off-Stage', icon: 'Sparkles' },
  { time: '01:45–02:30 PM', title: 'Chess', start: '13:45', end: '14:30', category: 'Off-Stage', icon: 'Sparkles' },
  { time: '09:00 AM–01:30 PM', title: 'Reel Challenge', start: '09:00', end: '13:30', category: 'Off-Stage', icon: 'Sparkles' },
  { time: '01:30–03:30 PM', title: 'Reel Editing', start: '13:30', end: '15:30', category: 'Off-Stage', icon: 'Sparkles' },
];

// Site start date (same as countdown target)
const siteStart = new Date('2026-08-19T09:00:00');

function getCurrentEvents() {
  const now = new Date();
  if (now < siteStart) return [];

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  return schedule.filter(({ start, end }) => {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    const startMins = sh * 60 + sm;
    const endMins = eh * 60 + em;
    return currentMinutes >= startMins && currentMinutes < endMins;
  });
}

export default function NowRunning() {
  const [currentEvents, setCurrentEvents] = useState(getCurrentEvents());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEvents(getCurrentEvents());
    }, 60000); // Check every minute
    return () => clearInterval(timer);
  }, []);

  const now = new Date();
  const allDone = now >= new Date('2026-08-19T15:30:00');

  const onStage = currentEvents.filter(e => e.category === 'On-Stage');
  const offStage = currentEvents.filter(e => e.category === 'Off-Stage');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="inline-block mb-12 w-full max-w-3xl"
      style={{ borderRadius: '1rem' }}
    >
      <div className="glass-panel px-6 py-6 md:px-12 md:py-10" style={{ borderRadius: '1rem' }}>
        {/* Live badge */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#ff4d8d' }} />
            <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: '#ff4d8d' }} />
          </span>
          <p style={{
            fontFamily: JOST,
            fontWeight: 600,
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#ffb347',
            filter: 'drop-shadow(0 0 6px rgba(255,179,71,0.5))'
          }}>
            ✦ &nbsp; Now Running &nbsp; ✦
          </p>
        </div>

        {allDone ? (
          // Event over
          <>
            <p style={{
              fontFamily: CORMORANT,
              fontWeight: 600,
              fontSize: '2rem',
              letterSpacing: '0.06em',
              background: 'linear-gradient(135deg, #F6C453 0%, #E0A52B 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 6px rgba(246,196,83,0.3))',
              textAlign: 'center'
            }}>
              The Event Has Concluded
            </p>
            <p style={{ fontFamily: JOST, fontWeight: 300, fontSize: '0.95rem', color: '#BFAFB4', textAlign: 'center', marginTop: '0.5rem' }}>
              Thank you for being part of ArtX'26. See you next year!
            </p>
          </>
        ) : currentEvents.length === 0 ? (
          // Gap between events (e.g., lunch break)
          <>
            <p style={{
              fontFamily: CORMORANT,
              fontWeight: 600,
              fontSize: '2rem',
              letterSpacing: '0.06em',
              background: 'linear-gradient(135deg, #F6C453 0%, #E0A52B 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 6px rgba(246,196,83,0.3))',
              textAlign: 'center'
            }}>
              Break Time
            </p>
            <p style={{ fontFamily: JOST, fontWeight: 300, fontSize: '0.95rem', color: '#BFAFB4', textAlign: 'center', marginTop: '0.5rem' }}>
              Next programs will start shortly. Stay tuned!
            </p>
          </>
        ) : (
          // Events currently running
          <div className="space-y-5">
            {onStage.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3 justify-center">
                  <Mic className="w-4 h-4" style={{ color: '#ffb347' }} />
                  <span style={{ fontFamily: JOST, fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#ffb347' }}>
                    On-Stage
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  {onStage.map((e, i) => (
                    <motion.div
                      key={e.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-5 py-3 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,77,141,0.15), rgba(255,106,61,0.1))',
                        border: '1px solid rgba(255,77,141,0.3)',
                        boxShadow: '0 0 12px rgba(255,77,141,0.12)',
                      }}
                    >
                      <span style={{ fontFamily: CORMORANT, fontWeight: 600, fontSize: '1.1rem', color: '#F6C453' }}>{e.title}</span>
                      <span style={{ fontFamily: JOST, fontWeight: 400, fontSize: '0.7rem', color: '#BFAFB4', marginLeft: '0.5rem', letterSpacing: '0.1em' }}>
                        {e.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {offStage.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3 justify-center">
                  <Sparkles className="w-4 h-4" style={{ color: '#ffb347' }} />
                  <span style={{ fontFamily: JOST, fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#ffb347' }}>
                    Off-Stage
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  {offStage.map((e, i) => (
                    <motion.div
                      key={e.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-5 py-3 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,179,71,0.12), rgba(255,106,61,0.08))',
                        border: '1px solid rgba(255,179,71,0.25)',
                        boxShadow: '0 0 12px rgba(255,179,71,0.1)',
                      }}
                    >
                      <span style={{ fontFamily: CORMORANT, fontWeight: 600, fontSize: '1.1rem', color: '#F6C453' }}>{e.title}</span>
                      <span style={{ fontFamily: JOST, fontWeight: 400, fontSize: '0.7rem', color: '#BFAFB4', marginLeft: '0.5rem', letterSpacing: '0.1em' }}>
                        {e.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}