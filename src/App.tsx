import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './i18n';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { AudioPlayer } from './components/AudioPlayer';
import { InvitationContent } from './components/InvitationContent';
import { ScratchReveal } from './components/ScratchReveal';
import { Countdown } from './components/Countdown';
import { Venue } from './components/Venue';
import { RSVP } from './components/RSVP';

function AppContent() {
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleOpenCurtain = () => {
    if (curtainOpen) return;
    setCurtainOpen(true);
    setTimeout(() => setShowContent(true), 1500);
  };

  return (
    <div className="relative w-full">
      <LanguageSwitcher />
      <AudioPlayer />

      {/* ── Curtain overlay ─────────────────────────────────── */}
      <AnimatePresence>
        {!showContent && (
          <motion.div
            className="fixed inset-0 z-30"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Left curtain */}
            <div
              className={`absolute inset-y-0 left-0 w-1/2 curtain-panel curtain-left ${
                curtainOpen ? 'curtain-opening-left' : ''
              }`}
            />
            {/* Right curtain */}
            <div
              className={`absolute inset-y-0 right-0 w-1/2 curtain-panel curtain-right ${
                curtainOpen ? 'curtain-opening-right' : ''
              }`}
            />

            {/* Gold tassel */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none">
              <div className="w-px h-12 bg-gold" />
              <div className="w-4 h-4 rounded-full bg-gold shadow-[0_0_12px_#D4AF37]" />
              <div className="w-px h-8 bg-gold" />
              <div className="w-3 h-3 rounded-full bg-gold-light" />
            </div>

            {/* CTA overlay */}
            {!curtainOpen && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer select-none z-20"
                onClick={handleOpenCurtain}
              >
                <p className="font-script text-gold-light text-6xl sm:text-7xl drop-shadow-lg mb-2">✦</p>
                <p className="font-serif uppercase tracking-[0.3em] text-gold-light text-xs sm:text-sm mb-8">
                  Appuyez pour ouvrir
                </p>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8D48B" strokeWidth="1.5">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main content ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <InvitationContent />
        <ScratchReveal />
        <Countdown />
        <Venue />
        <RSVP />
      </motion.div>
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
