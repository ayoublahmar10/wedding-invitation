import { useAudio } from '../hooks/useAudio';
import { weddingConfig } from '../config/wedding';

export function AudioPlayer() {
  const { isPlaying, toggle } = useAudio(weddingConfig.musicUrl);

  return (
    <button
      onClick={toggle}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      className={`fixed bottom-6 right-4 z-50 w-12 h-12 rounded-full bg-text-primary shadow-lg flex items-center justify-center transition-transform duration-200 hover:scale-110 ${
        isPlaying ? 'audio-pulse' : ''
      }`}
    >
      {isPlaying ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFDF9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFDF9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
}