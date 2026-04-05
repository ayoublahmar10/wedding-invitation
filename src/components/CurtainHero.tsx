import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface CurtainHeroProps {
  onOpened: () => void;
}

export function CurtainHero({ onOpened }: CurtainHeroProps) {
  const [phase, setPhase] = useState<'idle' | 'opening'>('idle');
  const calledRef = useRef(false);

  const handleClick = () => {
    if (phase !== 'idle') return;
    setPhase('opening');
    // Fire callback after animation (~1.55s)
    setTimeout(() => {
      if (!calledRef.current) {
        calledRef.current = true;
        onOpened();
      }
    }, 1550);
  };

  return (
    <div
      className="fixed inset-0 z-30 overflow-hidden"
      style={{ background: '#150404', cursor: phase === 'idle' ? 'pointer' : 'default' }}
      onClick={handleClick}
    >
      {/* ── Pelmet / valance at top ── */}
      <div className="curtain-pelmet absolute top-0 left-0 right-0 z-20 pointer-events-none" />

      {/* ── Left panel ── */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 curtain-velvet curtain-panel-left"
        style={{ width: '52%' }}
        animate={{ x: phase === 'opening' ? '-102%' : '0%' }}
        transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
      />

      {/* ── Right panel ── */}
      <motion.div
        className="absolute top-0 bottom-0 right-0 curtain-velvet curtain-panel-right"
        style={{ width: '52%' }}
        animate={{ x: phase === 'opening' ? '102%' : '0%' }}
        transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
      />

      {/* ── Center seam shadow + gold thread ── */}
      <div
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.55) 60%, transparent)',
        }}
      />
      <div
        className="absolute top-16 bottom-0 left-1/2 -translate-x-1/2 w-px z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(212,175,55,0.5), rgba(212,175,55,0.15) 40%, transparent)',
        }}
      />

      {/* ── Gold fringe at bottom ── */}
      <div className="curtain-fringe absolute bottom-0 left-0 right-0 z-20 pointer-events-none" />

      {/* ── CTA content (only in idle) ── */}
      {phase === 'idle' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 select-none px-6">
          {/* Tassel pendant from pelmet */}
          <div className="flex flex-col items-center mb-6">
            <div
              className="w-px h-14"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(212,175,55,0.9), rgba(212,175,55,0.4))',
              }}
            />
            <div
              className="w-6 h-6 rounded-full"
              style={{
                background: 'radial-gradient(circle at 35% 30%, #E8D48B, #D4AF37 55%, #9A7B1A)',
                boxShadow: '0 0 14px rgba(212,175,55,0.6), 0 0 30px rgba(212,175,55,0.2)',
              }}
            />
            <div
              className="w-px h-8"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(212,175,55,0.5), rgba(212,175,55,0.15))',
              }}
            />
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 35% 30%, #E8D48B, #D4AF37)',
              }}
            />
          </div>

          {/* Title in script */}
          <p
            className="font-script text-gold text-5xl sm:text-6xl mb-2"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 0 30px rgba(212,175,55,0.25)' }}
          >
            Invitation
          </p>

          {/* Decorative rule */}
          <div
            className="w-24 h-px my-4"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(212,175,55,0.6), transparent)',
            }}
          />

          {/* CTA label */}
          <p className="font-serif uppercase tracking-[0.35em] text-[11px] sm:text-xs mb-10"
            style={{ color: 'rgba(232,212,139,0.7)' }}>
            Appuyez pour ouvrir
          </p>

          {/* Animated arrow */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(232,212,139,0.6)"
              strokeWidth="1.5"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </div>
      )}
    </div>
  );
}
