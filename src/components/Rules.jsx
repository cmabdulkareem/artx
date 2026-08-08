import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, Clock, Shield, Settings, ChevronDown, Sparkles } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { rulesGroups } from '../data/rules';

const CORMORANT = '"Cormorant Garamond", serif';
const JOST      = '"Jost", sans-serif';

const iconMap = { UserCheck, Clock, Shield, Settings };

export default function Rules() {
  return (
    <section id="rules" className="relative py-32 overflow-hidden">
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
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-20 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,77,141,0.2) 0%, transparent 70%)', filter: 'blur(50px)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-20 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,106,61,0.2) 0%, transparent 70%)', filter: 'blur(50px)' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          title="Rules & Regulations"
          subtitle="Please review the following guidelines to ensure a smooth and enjoyable experience for all participants."
        />

        <div className="space-y-4">
          {rulesGroups.map((group, groupIndex) => {
            const IconComponent = iconMap[group.icon] || Settings;

            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: groupIndex * 0.1, ease: 'easeOut' }}
                className="glow-edge glow-edge-static group relative overflow-hidden"
                style={{ borderRadius: '1rem' }}
              >
                <div
                  className="rounded-[1rem] overflow-hidden"
                  style={{ background: 'rgba(14,1,8,0.75)', backdropFilter: 'blur(24px)' }}
                >
                  <details>
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none group/summary">
                      <div className="flex items-center gap-4">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,77,141,0.15), rgba(255,179,71,0.1))',
                            border: '1px solid rgba(255,179,71,0.2)',
                            boxShadow: '0 0 0 rgba(255,77,141,0)',
                            transition: 'box-shadow 0.3s',
                          }}
                        >
                          <IconComponent className="w-7 h-7" style={{ color: '#ffb347', filter: 'drop-shadow(0 0 6px rgba(255,179,71,0.5))' }} />
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
                            filter: 'drop-shadow(0 0 6px rgba(246,196,83,0.3))',
                          }}
                        >
                          {group.title}
                        </h3>
                      </div>
                      <ChevronDown
                        className="w-6 h-6 transition-transform duration-300 flex-shrink-0"
                        style={{ color: '#ffb347', filter: 'drop-shadow(0 0 4px rgba(255,179,71,0.5))' }}
                      />
                    </summary>

                    {/* Separator line */}
                    <div
                      className="mx-6 h-px"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,77,141,0.4), rgba(255,179,71,0.4), transparent)',
                      }}
                    />

                    <ul className="px-6 py-5 space-y-3">
                      {group.rules.map((rule, ruleIndex) => (
                        <motion.li
                          key={ruleIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: ruleIndex * 0.04 }}
                          className="flex items-start gap-3 text-[#E8D9DD]"
                        >
                          <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#ff4d8d', filter: 'drop-shadow(0 0 4px rgba(255,77,141,0.5))' }} />
                          <span style={{ fontFamily: JOST, fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.75, letterSpacing: '0.01em' }} className="leading-relaxed text-sm">{rule}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </details>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}