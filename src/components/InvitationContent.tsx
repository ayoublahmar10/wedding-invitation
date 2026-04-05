import { motion } from 'framer-motion';
import { useTranslation } from '../i18n';
import { weddingConfig } from '../config/wedding';

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const },
  transition: {
    delay,
    duration: 0.8,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  },
});

export function InvitationContent() {
  const { t, language } = useTranslation();
  const isAr = language === 'ar';

  return (
    <section className="relative w-full min-h-screen bg-ivory flex flex-col items-center justify-center overflow-hidden py-24 px-6">

      {/* Top gold ornament line */}
      <motion.div {...rise(0)} className="flex items-center gap-3 mb-10">
        <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/60" />
        <span className="text-gold text-lg tracking-[0.5em]">✦</span>
        <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/60" />
      </motion.div>

      {/* Invitation surtitle */}
      <motion.p
        {...rise(0.12)}
        className={`text-center max-w-xs sm:max-w-sm leading-relaxed mb-10 ${
          isAr
            ? 'font-arabic text-text-secondary text-sm leading-loose'
            : 'font-serif uppercase tracking-[0.25em] text-text-secondary text-[11px] sm:text-xs'
        }`}
      >
        {t.invitation}
      </motion.p>

      {/* Names block — always LTR */}
      <motion.div {...rise(0.26)} className="text-center mb-8" dir="ltr">
        {/* Groom name */}
        <h1
        className="font-weddingNames italic text-curtain leading-[0.9] font-medium"
          style={{ fontSize: 'clamp(3.5rem, 15vw, 5.5rem)' }}
        >
          {t.groomName}
        </h1>

        {/* Ampersand separator */}
        <div className="relative flex items-center justify-center my-3">
          <div className="h-px w-20 sm:w-28" style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
          <span
            className="font-script text-gold mx-4 leading-none"
            style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}
          >
            &amp;
          </span>
          <div className="h-px w-20 sm:w-28" style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
        </div>

        {/* Bride name */}
        <h1
        className="font-weddingNames italic text-curtain leading-[0.9] font-medium"
          style={{ fontSize: 'clamp(3.5rem, 15vw, 5.5rem)' }}
        >
         {t.brideName}
        </h1>
      </motion.div>

      {/* Divider */}
      <motion.div {...rise(0.4)} className="flex items-center gap-2 mb-10">
        <div className="h-px w-8 bg-gold/40" />
        <span className="text-gold/60 text-sm">✦</span>
        <div className="h-px w-16 bg-gold/60" />
        <span className="text-gold text-sm">✦</span>
        <div className="h-px w-16 bg-gold/60" />
        <span className="text-gold/60 text-sm">✦</span>
        <div className="h-px w-8 bg-gold/40" />
      </motion.div>

      {/* Message */}
      <motion.p
        {...rise(0.54)}
        className={`text-center max-w-xs sm:max-w-sm leading-loose ${
          isAr
            ? 'font-arabic text-text-secondary text-sm leading-loose'
            : 'font-serif uppercase tracking-[0.18em] text-text-secondary text-[11px] sm:text-xs'
        }`}
      >
        {t.message}
      </motion.p>

      {/* Bottom ornament */}
      <motion.div {...rise(0.68)} className="flex items-center gap-3 mt-10">
        <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/60" />
        <span className="text-gold text-lg tracking-[0.5em]">✦</span>
        <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/60" />
      </motion.div>
    </section>
  );
}
