import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiProps {
  active: boolean;
}

interface Particle {
  id: number;
  x: number;
  delay: number;
  color: string;
  size: number;
  rotate: number;
}

const COLORS = ['#D4AF37', '#E8D48B', '#8B1A1A', '#A52A2A', '#FAF6F0', '#B8941E'];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.8,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: Math.random() * 8 + 5,
    rotate: Math.random() * 360,
  }));
}

export function Confetti({ active }: ConfettiProps) {
  const particles = useRef<Particle[]>(generateParticles(60));

  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {particles.current.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: p.rotate }}
              animate={{ y: '110vh', opacity: [1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5 + Math.random(), delay: p.delay, ease: 'easeIn' }}
              style={{
                position: 'absolute',
                top: 0,
                width: p.size,
                height: p.size * 0.6,
                backgroundColor: p.color,
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
