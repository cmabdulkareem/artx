import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Sparkles } from 'lucide-react';
import SectionTitle from './SectionTitle';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Venue',
    details: ['Municipal Conference Hall', 'Kasaragod, Kerala'],
    gradient: 'from-accent-pink to-accent-rose',
  },
  {
    icon: Phone,
    title: 'Event Support',
    details: ['Registration Help', 'Event Coordination', 'Cultural Committee'],
    gradient: 'from-accent-orange to-accent-gold',
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['cdc.artx26@example.com'],
    gradient: 'from-accent-gold to-yellow-400',
  },
  {
    icon: Clock,
    title: 'Event Time',
    details: ['19 August 2026', '9:00 AM onwards'],
    gradient: 'from-accent-pink to-accent-orange',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent-pink/50 to-transparent" />
      
      {/* Animated glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-20 right-0 w-96 h-96 bg-accent-pink/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-20 left-0 w-96 h-96 bg-accent-orange/15 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          title="Contact Us"
          subtitle="Have questions? Reach out to us for any queries about registration, events, or participation."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="glass-panel glow-border p-6 card-hover group relative overflow-hidden text-center"
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-accent-pink/10 to-accent-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-pink/20 to-accent-orange/20 mb-4 border border-accent-gold/20"
                >
                  <item.icon className="w-8 h-8 text-accent-gold" />
                </motion.div>
                <h3 className="font-heading text-xl mb-3 gradient-text-gold">{item.title}</h3>
                {item.details.map((detail, i) => (
                  <p key={i} className="text-text-secondary text-sm leading-relaxed">
                    {detail}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Maps Embed */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="glass-panel glow-border p-2 relative overflow-hidden"
        >
          <div className="mapouter" style={{ position: 'relative', textAlign: 'right', width: '100%', height: '450px' }}>
            <div className="gmap_canvas" style={{ overflow: 'hidden', background: 'none!important', width: '100%', height: '450px' }}>
              <iframe
                className="gmap_iframe"
                width="100%"
                height="450"
                src="https://www.google.com/maps?q=municipal+conference+hall%2C+kasaragod&z=20&t=k&hl=en&output=embed"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                title="Municipal Conference Hall, Kasaragod"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}