import { motion } from 'framer-motion';

export default function SectionTitle({ title, subtitle, align = 'center' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {/* Eyebrow label */}
      <div className={`flex ${align === 'center' ? 'justify-center' : 'justify-start'} mb-3`}>
        <span
          style={{
            fontFamily: '"Jost", sans-serif',
            fontWeight: 600,
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#ff4d8d',
            filter: 'drop-shadow(0 0 6px rgba(255,77,141,0.5))',
          }}
        >
          CDC ARTX'26
        </span>
      </div>

      {/* Main heading — Cormorant Garamond */}
      <h2
        className="mb-4"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(2.0rem, 5.5vw, 4.8rem)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          lineHeight: 1.1,
          background: 'linear-gradient(135deg, #F6C453 0%, #ff6a3d 50%, #E0A52B 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 18px rgba(246,196,83,0.38))',
        }}
      >
        {title}
      </h2>

      {/* Glowing underbar */}
      <div className={`flex ${align === 'center' ? 'justify-center' : 'justify-start'} mb-5`}>
        <div className="relative h-px w-28">
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, transparent, #ff4d8d 20%, #ff6a3d 55%, #ffb347 80%, transparent)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, #ff4d8d 20%, #ff6a3d 55%, #ffb347 80%, transparent)',
              filter: 'blur(6px)',
              opacity: 0.65,
              transform: 'scaleY(5)',
            }}
          />
        </div>
      </div>

      {subtitle && (
        <p
          style={{
            fontFamily: '"Jost", sans-serif',
            fontWeight: 300,
            fontSize: '1.05rem',
            lineHeight: 1.75,
            color: '#E8D9DD',
            maxWidth: '36rem',
            margin: '0 auto',
            letterSpacing: '0.02em',
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}