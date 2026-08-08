import { motion } from 'framer-motion';
import { Trophy, Gamepad2, Music, Activity, Brain, Palette, Smile, HelpCircle, Mic, Music2, MessageSquare, Volume2, Users, Heart, Star, Video, Sparkles } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { gameEvents, culturalEvents } from '../data/events';

const CORMORANT = '"Cormorant Garamond", serif';
const JOST      = '"Jost", sans-serif';

const iconMap = { Trophy, Gamepad2, Music, Activity, Brain, Palette, Smile, HelpCircle, Mic, Music2, MessageSquare, Volume2, Users, Heart, Star, Video };

function EventCard({ event, index }) {
  const IconComponent = iconMap[event.icon] || Music;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: 'easeOut' }}
      className="glow-edge glow-edge-static group relative overflow-hidden card-hover"
      style={{ borderRadius: '1rem' }}
    >
      {/* Inner glass */}
      <div
        className="relative h-full p-6 rounded-[1rem]"
        style={{ background: 'rgba(14,1,8,0.72)', backdropFilter: 'blur(24px)' }}
      >
        {/* Hover inner gradient */}
        <div
          className="absolute inset-0 rounded-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(135deg, rgba(255,77,141,0.1) 0%, rgba(255,106,61,0.06) 100%)' }}
        />

        <div className="relative z-10">
          {event.image && (
            <div className="mb-4 rounded-xl overflow-hidden border border-accent-gold/20">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255,77,141,0.3))',
                }}
              />
            </div>
          )}
          
          <div className="flex items-start gap-4">
            {/* Icon box */}
            <div className="relative flex-shrink-0">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,77,141,0.15), rgba(255,179,71,0.1))',
                  border: '1px solid rgba(255,179,71,0.2)',
                }}
              >
                <IconComponent className="w-7 h-7" style={{ color: '#ffb347', filter: 'drop-shadow(0 0 6px rgba(255,179,71,0.6))' }} />
              </motion.div>
              {/* Icon glow */}
              <div
                className="absolute inset-0 w-14 h-14 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,77,141,0.4) 0%, transparent 70%)', filter: 'blur(10px)', zIndex: -1 }}
              />
            </div>

            <div className="flex-1 min-w-0">
              {/* Category badge */}
              <span
                className="inline-block text-xs px-3 py-1 rounded-full mb-3 font-bold tracking-wide"
                style={{
                  fontFamily: JOST,
                  fontWeight: 600,
                  fontSize: '0.65rem',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(135deg, rgba(255,77,141,0.15), rgba(255,106,61,0.1))',
                  border: '1px solid rgba(255,77,141,0.3)',
                  color: '#ff4d8d',
                  boxShadow: '0 0 10px rgba(255,77,141,0.12)',
                }}
              >
                {event.category}
              </span>
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
                {event.title}
              </h3>
              <p style={{ fontFamily: JOST, fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.75, color: '#BFAFB4', letterSpacing: '0.01em', marginBottom: '1rem' }}>{event.description}</p>
              <motion.button
                whileHover={{ x: 6 }}
                onClick={() => document.getElementById('rules')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
                style={{ fontFamily: JOST, fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', fontSize: '0.65rem', color: '#ff4d8d' }}
              >
                View Rules <span>→</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CategoryHeading({ label }) {
  return (
    <motion.h3
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="font-heading text-4xl md:text-5xl mb-10"
      style={{
        fontFamily: CORMORANT,
        fontWeight: 600,
        letterSpacing: '0.06em',
        background: 'linear-gradient(135deg, #F6C453 0%, #ff6a3d 60%, #E0A52B 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0 0 12px rgba(246,196,83,0.35))',
      }}
    >
      {label}
    </motion.h3>
  );
}

export default function Events() {
  return (
    <section id="events" className="relative py-32 overflow-hidden">
      {/* Divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,77,141,0.7) 25%, rgba(255,106,61,0.8) 50%, rgba(255,179,71,0.7) 75%, transparent)',
          boxShadow: '0 0 20px rgba(255,77,141,0.4)',
        }}
      />

      {/* Ambient glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 9, repeat: Infinity }}
        className="absolute top-20 right-0 w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,77,141,0.25) 0%, transparent 70%)', filter: 'blur(50px)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-20 left-0 w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,106,61,0.22) 0%, transparent 70%)', filter: 'blur(50px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          title="Events Showcase"
          subtitle="Discover a diverse range of cultural and game events designed to showcase your talent and celebrate creativity."
        />

        {/* Game Events */}
        <div className="mb-24">
          <CategoryHeading label="Game Events" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>

        {/* Cultural Events */}
        <div>
          <CategoryHeading label="Cultural Events" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {culturalEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}