import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider, useTranslation } from './i18n';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { AudioPlayer } from './components/AudioPlayer';
import { CurtainHero } from './components/CurtainHero';
import { InvitationContent } from './components/InvitationContent';
import { ScratchReveal } from './components/ScratchReveal';
import { Countdown } from './components/Countdown';
import { Venue } from './components/Venue';
import { RSVP } from './components/RSVP';

// Width of the visible side drape after opening — responsive via CSS var
const DRAPE_WIDTH = 'var(--drape-w)';

function AppContent() {
  const [state, setState] = useState<'closed' | 'open'>('closed');
  const [showScroll, setShowScroll] = useState(true);
  const { t, language } = useTranslation();
  const isAr = language === 'ar';

  const handleOpened = () => setState('open');

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 60) setShowScroll(false); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative w-full">
      {/* ── Fixed UI ─────────────────────────────────────────── */}
      <LanguageSwitcher />
      <AudioPlayer />

      {/* ── Curtain closed (full screen) ─────────────────────── */}
      <AnimatePresence>
        {state === 'closed' && (
          <CurtainHero onOpened={handleOpened} />
        )}
      </AnimatePresence>

      {/* ── Side drapes — stay fixed after opening ───────────── */}
      <AnimatePresence>
        {state === 'open' && (
          <>
            {/* Pelmet across full top */}
            <motion.div
              key="pelmet"
              className="drape-pelmet fixed top-0 left-0 right-0 z-20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            />

            {/* Left drape */}
            <motion.div
              key="drape-left"
              className="curtain-drape-left fixed top-0 bottom-0 left-0 z-10 pointer-events-none"
              style={{ width: DRAPE_WIDTH }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            {/* Right drape */}
            <motion.div
              key="drape-right"
              className="curtain-drape-right fixed top-0 bottom-0 right-0 z-10 pointer-events-none"
              style={{ width: DRAPE_WIDTH }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </>
        )}
      </AnimatePresence>

      {/* ── Main content ─────────────────────────────────────── */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: state === 'open' ? 1 : 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <InvitationContent />
        <ScratchReveal />
        <Countdown />
        <Venue />
        <RSVP />
      </motion.main>

      {/* ── Scroll indicator — shown after curtain opens, hides on first scroll ── */}
     <AnimatePresence>
  {state === 'open' && showScroll && (
    <motion.div
      key="scroll-hint"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      className="fixed bottom-12 z-40 pointer-events-none select-none flex justify-center"
      style={{
        left: DRAPE_WIDTH,
        right: DRAPE_WIDTH,
      }}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <span
          className={`text-text-primary ${
            isAr ? 'font-arabic text-sm' : 'font-serif uppercase tracking-[0.15em] text-xs'
          }`}
          style={{
            textShadow:
              '0 1px 6px rgba(255,253,249,0.9), 0 0 12px rgba(255,253,249,0.9)',
          }}
        >
          {t.scrollHint}
        </span>

        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          className="text-gold text-3xl leading-none"
          style={{
            textShadow: '0 1px 8px rgba(255,253,249,0.8)',
          }}
        >
          ↓
        </motion.div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
