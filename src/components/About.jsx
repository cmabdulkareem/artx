import { motion } from 'framer-motion';
import { Music, Trophy, Palette } from 'lucide-react';
import SectionTitle from './SectionTitle';

const CORMORANT = '"Cormorant Garamond", serif';
const JOST      = '"Jost", sans-serif';

function SectionDivider() {
  return (
    <div className="absolute top-0 left-0 right-0 w-full overflow-hidden" style={{ height: '1px' }}>
      <div
        className="w-full h-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,77,141,0.7) 25%, rgba(255,106,61,0.8) 50%, rgba(255,179,71,0.7) 75%, transparent)',
          boxShadow: '0 0 20px rgba(255,77,141,0.4), 0 0 40px rgba(255,106,61,0.2)',
        }}
      />
    </div>
  );
}

const features = [
  {
    icon: Music,
    title: 'Cultural Excellence',
    description: 'Music, dance, and artistic performances that celebrate tradition and innovation.',
    glowColor: 'rgba(255,77,141,0.5)',
    gradient: 'linear-gradient(135deg, rgba(255,77,141,0.12) 0%, rgba(255,106,61,0.06) 100%)',
  },
  {
    icon: Trophy,
    title: 'Competitive Spirit',
    description: 'Games, quizzes, and creative challenges that test skill and strategy.',
    glowColor: 'rgba(255,106,61,0.5)',
    gradient: 'linear-gradient(135deg, rgba(255,106,61,0.12) 0%, rgba(255,179,71,0.06) 100%)',
  },
  {
    icon: Palette,
    title: 'Creative Expression',
    description: 'Reels, face painting, mehendi, ramp walk, and more to unleash your creativity.',
    glowColor: 'rgba(255,179,71,0.5)',
    gradient: 'linear-gradient(135deg, rgba(255,179,71,0.12) 0%, rgba(246,196,83,0.06) 100%)',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <SectionDivider />

      {/* Background orbs */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 9, repeat: Infinity }}
        className="absolute top-1/2 -left-48 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,77,141,0.35) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.35, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 11, repeat: Infinity }}
        className="absolute top-1/2 -right-48 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,106,61,0.3) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          title="About the Fest"
          subtitle="CDC ARTX'26 is a vibrant inter-department cultural and game festival featuring performances, competitions, creativity, and student talent."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.18, ease: 'easeOut' }}
              className="glow-edge glow-edge-static group relative overflow-hidden card-hover"
              style={{ borderRadius: '1rem' }}
            >
              {/* Inner glass */}
              <div
                className="relative h-full p-8 rounded-[1rem]"
                style={{
                  background: `rgba(14,1,8,0.7)`,
                  backdropFilter: 'blur(24px)',
                }}
              >
                {/* Hover inner glow */}
                <div
                  className="absolute inset-0 rounded-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: feature.gradient }}
                />

                <div className="relative z-10">
                  {/* Icon and Title in same row */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 0.4 }}
                      className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 relative"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,77,141,0.15), rgba(255,179,71,0.1))',
                        border: '1px solid rgba(255,179,71,0.2)',
                        boxShadow: `0 0 0 0 ${feature.glowColor}`,
                        transition: 'box-shadow 0.3s',
                      }}
                      onHoverStart={(e) => {
                        e.target.style.boxShadow = `0 0 25px ${feature.glowColor}`;
                      }}
                      onHoverEnd={(e) => {
                        e.target.style.boxShadow = `0 0 0 0 ${feature.glowColor}`;
                      }}
                    >
                      <feature.icon className="w-8 h-8 text-accent-gold" />
                    </motion.div>
                    {/* Glow behind icon */}
                    <div
                      className="absolute inset-0 w-16 h-16 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: feature.gradient, filter: 'blur(16px)', zIndex: -1 }}
                    />
                  </div>

                  <h3
                    className="font-heading text-3xl mb-4"
                    style={{
                      fontFamily: CORMORANT,
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      background: 'linear-gradient(135deg, #F6C453 0%, #E0A52B 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 8px rgba(246,196,83,0.35))',
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ fontFamily: JOST, fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.75, color: '#BFAFB4', letterSpacing: '0.01em' }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}