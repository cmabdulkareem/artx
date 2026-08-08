import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import SectionTitle from './SectionTitle';

const CORMORANT = '"Cormorant Garamond", serif';
const JOST      = '"Jost", sans-serif';

const schedule = [
  { time: '9:00 AM', title: 'Registration & Welcome', description: 'Check-in, welcome kit distribution, and orientation.' },
  { time: '9:30 AM', title: 'Game Events Begin', description: 'Chess, UNO, Musical Chair, Lemon & Spoon, Memory Challenge kick off.' },
  { time: '11:30 AM', title: 'Quiz & Creative Competitions', description: 'Quiz, Mehendi, Face Painting, and other creative events start.' },
  { time: '1:00 PM', title: 'Lunch Break', description: 'Refreshments and networking break for all participants.' },
  { time: '2:00 PM', title: 'Solo Performances', description: 'Solo Song, Solo Dance, Speech, and Mimicry competitions.' },
  { time: '4:00 PM', title: 'Group Performances', description: 'Group Song, Group Dance, Oppana, and Ramp Walk.' },
  { time: '6:00 PM', title: 'Finale & Prize Distribution', description: 'Award ceremony, cultural performances, and closing remarks.' },
];

export default function Timeline() {
  return (
    <section id="schedule" className="relative py-32 overflow-hidden">
      {/* Divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,77,141,0.7) 25%, rgba(255,106,61,0.8) 50%, rgba(255,179,71,0.7) 75%, transparent)',
          boxShadow: '0 0 20px rgba(255,77,141,0.4)',
        }}
      />

      {/* Ambient orbs */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.22, 0.1] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-1/2 right-0 w-[450px] h-[450px] rounded-full pointer-events-none -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(255,179,71,0.18) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-1/2 left-0 w-[450px] h-[450px] rounded-full pointer-events-none -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(255,77,141,0.18) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          title="Festival Timeline"
          subtitle="A day packed with excitement, competition, and cultural celebration."
        />

        <div className="relative">
          {/* Glowing center line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(180deg, rgba(255,77,141,0.8) 0%, rgba(255,106,61,0.8) 50%, rgba(255,179,71,0.8) 100%)',
                boxShadow: '0 0 12px rgba(255,77,141,0.5), 0 0 30px rgba(255,106,61,0.2)',
              }}
            />
          </div>

          <div className="space-y-16">
            {schedule.map((item, index) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.08, ease: 'easeOut' }}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
              >
                {/* Glowing timeline node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                    className="relative"
                  >
                    {/* Outer glow ring */}
                    <div
                      className="absolute inset-0 w-5 h-5 rounded-full"
                      style={{
                        background: 'rgba(255,77,141,0.4)',
                        filter: 'blur(8px)',
                        transform: 'scale(2)',
                      }}
                    />
                    {/* Inner dot */}
                    <div
                      className="w-5 h-5 rounded-full relative"
                      style={{
                        background: 'linear-gradient(135deg, #ff4d8d, #ff6a3d)',
                        boxShadow: '0 0 12px rgba(255,77,141,0.7), 0 0 24px rgba(255,77,141,0.4)',
                      }}
                    />
                  </motion.div>
                </div>

                {/* Content card */}
                <div className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.04, y: -6 }}
                    className="glow-edge glow-edge-static group relative overflow-hidden"
                    style={{ borderRadius: '1rem', transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}
                  >
                    <div
                      className="relative p-6 rounded-[1rem]"
                      style={{ background: 'rgba(14,1,8,0.75)', backdropFilter: 'blur(24px)' }}
                    >
                      {/* Hover inner glow */}
                      <div
                        className="absolute inset-0 rounded-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: 'linear-gradient(135deg, rgba(255,77,141,0.1), rgba(255,106,61,0.06))' }}
                      />

                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-4 h-4" style={{ color: '#ffb347', filter: 'drop-shadow(0 0 4px rgba(255,179,71,0.6))' }} />
                          <span
                            className="text-sm font-bold"
                            style={{
                              fontFamily: JOST,
                              fontWeight: 600,
                              letterSpacing: '0.25em',
                              textTransform: 'uppercase',
                              fontSize: '0.65rem',
                              background: 'linear-gradient(135deg, #F6C453 0%, #E0A52B 100%)',
                              WebkitBackgroundClip: 'text',
                              backgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            {item.time}
                          </span>
                        </div>
                        <h3
                          className="font-heading text-2xl mb-2"
                          style={{
                            fontFamily: CORMORANT,
                            fontWeight: 600,
                            fontSize: '1.5rem',
                            letterSpacing: '0.06em',
                            background: 'linear-gradient(135deg, #F6C453 0%, #E0A52B 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 6px rgba(246,196,83,0.3))',
                          }}
                        >
                          {item.title}
                        </h3>
                        <p style={{ fontFamily: JOST, fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.75, color: '#BFAFB4', letterSpacing: '0.01em' }}>{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}