import { useState, useEffect, useRef } from 'react';

interface AudioControls {
  isPlaying: boolean;
  toggle: () => void;
}

export function useAudio(src: string): AudioControls {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = 'auto';

    audioRef.current = audio;

    const startAudioOnFirstInteraction = async () => {
      if (hasStartedRef.current) return;

      try {
        await audio.play();
        setIsPlaying(true);
        hasStartedRef.current = true;

        window.removeEventListener('pointerdown', startAudioOnFirstInteraction);
      } catch (error) {
        console.error('Autoplay bloqué :', error);
      }
    };

    window.addEventListener('pointerdown', startAudioOnFirstInteraction);

    return () => {
      window.removeEventListener('pointerdown', startAudioOnFirstInteraction);
      audio.pause();
      audio.currentTime = 0;
      audio.src = '';
    };
  }, [src]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
        hasStartedRef.current = true;
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Erreur audio :', error);
    }
  };

  return { isPlaying, toggle };
}