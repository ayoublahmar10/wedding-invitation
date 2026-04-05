import { motion } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';
import { useTranslation } from '../i18n';
import { weddingConfig } from '../config/wedding';

interface CountBoxProps {
  value: number;
  label: string;
}

function CountBox({ value, label }: CountBoxProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Box with fine bordeaux border */}
      <div
        className="w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem] md:w-20 md:h-20 flex items-center justify-center bg-ivory relative"
        style={{
          border: '1px solid rgba(139,26,26,0.35)',
          boxShadow: '0 1px 8px rgba(139,26,26,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
        }}
      >
        {/* Corner accents */}
        <span className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t border-l border-gold/40" />
        <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-t border-r border-gold/40" />
        <span className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-b border-l border-gold/40" />
        <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-b border-r border-gold/40" />

        <span className="font-serif font-bold text-curtain tabular-nums leading-none"
          style={{ fontSize: 'clamp(1.2rem, 7vw, 2.2rem)' }}>
          {String(value).padStart(2, '0')}
        </span>
      </div>

      {/* Label */}
      <span className="font-serif uppercase tracking-[0.12em] text-text-primary text-[11px] sm:text-xs">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <span
      className="font-serif text-gold/70 self-start pb-5"
      style={{ fontSize: 'clamp(1.4rem, 6vw, 1.8rem)', paddingTop: 'calc(2.25rem - 1em)' }}
    >
      :
    </span>
  );
}

export function Countdown() {
  const { t, language } = useTranslation();
  const { days, hours, minutes, seconds } = useCountdown(weddingConfig.weddingDate);
  const isAr = language === 'ar';

  return (
    <section className="w-full bg-ivory py-20 px-6 flex flex-col items-center">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="h-px w-8 bg-gold/40" />
          <span className="text-gold/60 text-xs">✦</span>
          <div className="h-px w-8 bg-gold/40" />
        </div>

        <h2 className={isAr
          ? 'font-script-ar text-curtain text-4xl sm:text-5xl'
          : 'font-script text-curtain text-4xl sm:text-5xl'}>
          {t.countdown}
        </h2>

        <div
          className="w-20 h-px mx-auto mt-4"
          style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.6), transparent)' }}
        />
      </motion.div>

      {/* Counter row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="flex items-end gap-1 sm:gap-2 md:gap-3"
      >
        <CountBox value={days}    label={t.days}  />
        <Colon />
        <CountBox value={hours}   label={t.hours} />
        <Colon />
        <CountBox value={minutes} label={t.min}   />
        <Colon />
        <CountBox value={seconds} label={t.sec}   />
      </motion.div>

      {/* Subline */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`mt-8 text-text-primary ${
          isAr
            ? 'font-arabic text-base'
            : 'font-serif italic text-sm tracking-wide'
        }`}
      >
        {t.untilBigDay}
      </motion.p>
    </section>
  );
}
