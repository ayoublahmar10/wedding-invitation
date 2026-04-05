import { useRef, useEffect, useState } from 'react';

interface ScratchCanvasOptions {
  radius: number;
  revealThreshold?: number; // 0–1, default 0.6
  onRevealed?: () => void;
}

export function useScratchCanvas({ radius, revealThreshold = 0.6, onRevealed }: ScratchCanvasOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);
  const revealedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = radius * 2;
    canvas.width = size;
    canvas.height = size;

    // Draw the gold scratch surface
    const gradient = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius);
    gradient.addColorStop(0, '#E8D48B');
    gradient.addColorStop(0.5, '#D4AF37');
    gradient.addColorStop(1, '#B8941E');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(radius, radius, radius, 0, Math.PI * 2);
    ctx.fill();

    // Scratch texture lines
    ctx.strokeStyle = 'rgba(180, 140, 20, 0.4)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const len = Math.random() * radius * 0.8;
      const x = radius + Math.cos(angle) * Math.random() * radius * 0.7;
      const y = radius + Math.sin(angle) * Math.random() * radius * 0.7;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle + 0.5) * len * 0.3, y + Math.sin(angle + 0.5) * len * 0.3);
      ctx.stroke();
    }
  }, [radius]);

  const getPos = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement): { x: number; y: number } => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    checkReveal(canvas, ctx);
  };

  const checkReveal = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    if (revealedRef.current) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] < 10) transparent++;
    }
    const totalPixels = canvas.width * canvas.height;
    const revealedRatio = transparent / totalPixels;

    if (revealedRatio >= revealThreshold) {
      revealedRef.current = true;
      setIsRevealed(true);
      onRevealed?.();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMouseDown = (e: MouseEvent) => { isDrawing.current = true; scratch(...Object.values(getPos(e, canvas)) as [number, number]); };
    const onMouseMove = (e: MouseEvent) => { if (isDrawing.current) scratch(...Object.values(getPos(e, canvas)) as [number, number]); };
    const onMouseUp = () => { isDrawing.current = false; };

    const onTouchStart = (e: TouchEvent) => { e.preventDefault(); isDrawing.current = true; scratch(...Object.values(getPos(e, canvas)) as [number, number]); };
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); if (isDrawing.current) scratch(...Object.values(getPos(e, canvas)) as [number, number]); };
    const onTouchEnd = () => { isDrawing.current = false; };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return { canvasRef, isRevealed };
}
