import { motion } from 'framer-motion';
import { useTranslation } from '../i18n';
import { weddingConfig } from '../config/wedding';

export function Venue() {
  const { t, language } = useTranslation();
  const isAr = language === 'ar';

  return (
    <section className="w-full bg-cream py-20 px-6 flex flex-col items-center">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="h-px w-8 bg-gold/40" />
          <span className="text-gold/60 text-xs">✦</span>
          <div className="h-px w-8 bg-gold/40" />
        </div>
        <p className={`${
          isAr
            ? 'font-arabic text-text-secondary text-sm'
            : 'font-serif uppercase tracking-[0.25em] text-text-secondary text-[11px] sm:text-xs'
        }`}>
          {t.venue}
        </p>
      </motion.div>

          {/* Venue image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="w-full max-w-sm mb-8"
      >
        <div className="relative overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
          {/* Gold border */}
          <div className="absolute inset-0 z-10 pointer-events-none rounded-[2rem] border border-gold/30" />

          {/* Soft overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none" />

          <img
            src={weddingConfig.venue.image}
            alt={weddingConfig.venue.name}
            className="w-full h-56 sm:h-72 object-cover transition-transform duration-700 hover:scale-105"
          />

          {/* Corner ornaments */}
          <span className="absolute top-3 left-3 z-20 text-gold/70 text-xs">✦</span>
          <span className="absolute top-3 right-3 z-20 text-gold/70 text-xs">✦</span>
          <span className="absolute bottom-3 left-3 z-20 text-gold/70 text-xs">✦</span>
          <span className="absolute bottom-3 right-3 z-20 text-gold/70 text-xs">✦</span>
        </div>
      </motion.div>

      {/* Venue name */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-2"
      >
        <h3 className="font-script text-curtain text-3xl sm:text-4xl mb-2">
          {weddingConfig.venue.name}
        </h3>
        <p className={`text-text-secondary text-sm ${isAr ? 'font-arabic' : 'font-serif tracking-wide'}`}>
          {weddingConfig.venue.address}
        </p>
      </motion.div>

      {/* Map button */}
      <motion.a
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        href={weddingConfig.venue.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-8 inline-flex items-center gap-2 px-7 py-3 transition-colors duration-200 group ${
          isAr ? 'font-arabic text-sm' : 'font-serif uppercase tracking-[0.2em] text-xs sm:text-[11px]'
        } text-text-primary hover:text-ivory`}
        style={{
          border: '1px solid rgba(212,175,55,0.5)',
          background: 'transparent',
          position: 'relative',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#8B1A1A'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#8B1A1A'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(212,175,55,0.5)'; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {t.seeOnMap}
      </motion.a>
    </section>
  );
}
