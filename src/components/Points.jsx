import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { pointsSystem } from '../data/rules';

const CORMORANT = '"Cormorant Garamond", serif';
const JOST      = '"Jost", sans-serif';

const categoryConfig = {
  individual: {
    icon: Award,
    title: 'Individual Events',
    gradient: 'linear-gradient(135deg, #ff4d8d, #ff2f6d)',
    glow: 'rgba(255,77,141,0.5)',
  },
  pair: {
    icon: Medal,
    title: 'Pair Events',
    gradient: 'linear-gradient(135deg, #ff6a3d, #ffb347)',
    glow: 'rgba(255,106,61,0.5)',
  },
  group: {
    icon: Trophy,
    title: 'Group Events',
    gradient: 'linear-gradient(135deg, #ffb347, #F6C453)',
    glow: 'rgba(255,179,71,0.5)',
  },
};

const placeEmoji = { 1: '🥇', 2: '🥈', 3: '🥉' };

export default function Points() {
  return (
    <section id="points" className="relative py-32 overflow-hidden">
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
        animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,179,71,0.2) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-1/3 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,77,141,0.2) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          title="Points & Prizes"
          subtitle="Compete, excel, and earn recognition. Points are awarded based on performance in each category."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(categoryConfig).map(([key, config], index) => {
            const IconComponent = config.icon;
            const data = pointsSystem[key];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 60, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.18, ease: 'easeOut' }}
                className="glow-edge glow-edge-static group relative overflow-hidden card-hover"
                style={{ borderRadius: '1rem' }}
              >
                <div
                  className="relative p-8 rounded-[1rem] h-full"
                  style={{ background: 'rgba(14,1,8,0.75)', backdropFilter: 'blur(24px)' }}
                >
                  {/* Hover inner glow */}
                  <div
                    className="absolute inset-0 rounded-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(ellipse at top, ${config.glow.replace('0.5', '0.1')} 0%, transparent 60%)` }}
                  />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.4 }}
                        className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: config.gradient,
                          boxShadow: `0 0 20px ${config.glow}, 0 0 40px ${config.glow.replace('0.5', '0.2')}`,
                        }}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3
                        className="font-heading text-2xl md:text-3xl"
                        style={{
                          fontFamily: CORMORANT,
                          fontWeight: 600,
                          letterSpacing: '0.06em',
                          background: 'linear-gradient(135deg, #F6C453 0%, #E0A52B 100%)',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 0 6px rgba(246,196,83,0.35))',
                        }}
                      >
                        {config.title}
                      </h3>
                    </div>

                    {/* Prize rows */}
                    <div className="space-y-3">
                      {data.map((prize, prizeIndex) => (
                        <motion.div
                          key={prize.position}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: prizeIndex * 0.08 }}
                          whileHover={{ scale: 1.03, x: 4 }}
                          className="flex items-center justify-between p-4 rounded-xl transition-all duration-300 relative overflow-hidden"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.07)',
                          }}
                        >
                          {/* Hover shimmer */}
                          <div
                            className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                            style={{ background: `linear-gradient(135deg, ${config.glow.replace('0.5', '0.08')}, transparent)` }}
                          />
                          <div className="flex items-center gap-3 relative z-10">
                            <span className="text-2xl">{placeEmoji[prizeIndex + 1] || '🎖️'}</span>
                            <span style={{ fontFamily: JOST, fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#FFF7F7' }}>{prize.position} Place</span>
                          </div>
                          <span
                            className="text-2xl font-bold relative z-10"
                            style={{
                              fontFamily: JOST,
                              fontWeight: 700,
                              background: config.gradient,
                              WebkitBackgroundClip: 'text',
                              backgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              filter: `drop-shadow(0 0 8px ${config.glow})`,
                            }}
                          >
                            {prize.points} pts
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {key === 'group' && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-6 text-xs text-[#BFAFB4] italic text-center leading-relaxed"
                      >
                        {pointsSystem.note}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}