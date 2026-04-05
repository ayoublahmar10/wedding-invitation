import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScratchCanvas } from '../hooks/useScratchCanvas';
import { useTranslation } from '../i18n';
import { weddingConfig } from '../config/wedding';
import { Confetti } from './Confetti';

const RADIUS = 55; // 110px diameter

interface ScratchCircleProps {
  label: string;
  sublabel: string;
  size: number;
  onRevealed: () => void;
}

function ScratchCircle({ label, sublabel, size, onRevealed }: ScratchCircleProps) {
  const radius = size / 2;
  const { canvasRef, isRevealed } = useScratchCanvas({
    radius,
    revealThreshold: 0.6,
    onRevealed,
  });

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Hand animation hint — shown before any reveal on this circle */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ y: [0, -6, 0], opacity: [0.8, 1, 0.8] }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="text-2xl select-none"
          >
            👆
          </motion.div>
        )}
      </AnimatePresence>
      {isRevealed && <div className="h-8" />}

      {/* Circle */}
      <div
        className="relative rounded-full"
        style={{ width: size, height: size }}
      >
        {/* Gold metallic background (visible under scratch) */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 32% 28%, #F5E490 0%, #E8D48B 20%, #D4AF37 45%, #C49A2A 65%, #A07818 80%, #7A5A0C 100%)',
            boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.3), inset 0 -4px 12px rgba(0,0,0,0.3)',
          }}
        />

        {/* Revealed date text */}
        <div className="absolute inset-0 rounded-full flex flex-col items-center justify-center">
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col items-center"
              >
                <span
                  className="font-script text-curtain-dark leading-none"
                  style={{ fontSize: size * 0.38 }}
                >
                  {label}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Canvas scratch overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 rounded-full touch-none cursor-crosshair"
          style={{
            width: size,
            height: size,
            opacity: isRevealed ? 0 : 1,
            pointerEvents: isRevealed ? 'none' : 'auto',
            transition: 'opacity 0.5s ease',
          }}
        />
      </div>

      {/* Sublabel */}
      <p className="font-serif uppercase tracking-[0.18em] text-text-secondary/60 text-[10px]">
        {sublabel}
      </p>
    </div>
  );
}

function getDateParts(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: d.getDate().toString().padStart(2, '0'),
    month: (d.getMonth() + 1).toString().padStart(2, '0'),
    year: d.getFullYear().toString(),
  };
}

export function ScratchReveal() {
  const { t, language } = useTranslation();
  const [revealedCount, setRevealedCount] = useState(0);
  const allRevealed = revealedCount >= 3;
  const isAr = language === 'ar';

  const handleRevealed = () => setRevealedCount((n) => Math.min(n + 1, 3));
  const { day, month, year } = getDateParts(weddingConfig.weddingDate);

  return (
    <section className="relative w-full min-h-screen bg-cream flex flex-col items-center justify-center py-20 px-6">
      <Confetti active={allRevealed} />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        {/* Script title */}
        <h2 className={`mb-3 ${isAr ? 'font-script-ar text-curtain text-5xl' : 'font-script text-curtain text-5xl sm:text-6xl'}`}>
          {isAr ? 'اكتشف' : 'Révéler'}
        </h2>

        {/* Divider */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="h-px w-12 bg-gold/40" />
          <span className="text-gold/60 text-xs">✦</span>
          <div className="h-px w-12 bg-gold/40" />
        </div>

        {/* Instruction */}
        <p className={`${isAr ? 'font-arabic text-text-secondary text-sm' : 'font-serif uppercase tracking-[0.25em] text-text-secondary text-[11px] sm:text-xs'}`}>
          {t.scratchInstruction}
        </p>
      </motion.div>

      {/* Three scratch circles — middle one slightly larger */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="flex items-end justify-center gap-5 sm:gap-8 mb-6"
      >
        <ScratchCircle label={day}   sublabel={isAr ? 'يوم' : 'Jour'}  size={RADIUS * 2}      onRevealed={handleRevealed} />
        <ScratchCircle label={month} sublabel={isAr ? 'شهر' : 'Mois'}  size={RADIUS * 2 + 16} onRevealed={handleRevealed} />
        <ScratchCircle label={year}  sublabel={isAr ? 'سنة' : 'Année'} size={RADIUS * 2}      onRevealed={handleRevealed} />
      </motion.div>

      {/* Hint text */}
      {!allRevealed && (
        <p className={`text-center text-text-secondary/50 mt-2 ${isAr ? 'font-arabic text-sm' : 'font-serif text-xs tracking-wide'}`}>
          {t.scratchHint}
        </p>
      )}

      {/* All revealed — "On se marie !" */}
      <AnimatePresence>
        {allRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            className="text-center mt-10"
          >
            <h3 className={`leading-tight mb-4 ${isAr ? 'font-script-ar text-curtain text-5xl sm:text-6xl' : 'font-script text-curtain text-5xl sm:text-6xl'}`}>
              {t.gettingMarried}
            </h3>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gold" />
              <span className="text-gold">♥</span>
              <div className="h-px w-16 bg-gold" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
