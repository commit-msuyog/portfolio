import { useEffect, useRef } from 'react';

type Butterfly = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  born: number;
  life: number;
  phase: number;
  wobble: number;
  hue: number;
  rot: number;
};

// Set to false if you want butterflies even when the computer's "reduce motion" setting is on.
// (That setting is meant for people who get dizzy from moving things on screen, so true is the polite default.)
const RESPECT_REDUCED_MOTION = true;

const MAX_BUTTERFLIES = 30;
const SPAWN_DISTANCE = 34; // px the cursor must travel before the next butterfly appears
const HUES = [320, 190, 265, 45, 150]; // pink, cyan, violet, amber, mint

function angleDiff(a: number, b: number) {
  return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

export default function ButterflyTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // No effect for people who asked for less motion, or on devices with no mouse (phones, tablets).
    if (RESPECT_REDUCED_MOTION && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(any-hover: hover) and (any-pointer: fine)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const butterflies: Butterfly[] = [];
    let lastX = -9999;
    let lastY = -9999;
    let rafId = 0;
    let lastT = 0;
    let running = false;

    const spawn = (x: number, y: number) => {
      if (butterflies.length >= MAX_BUTTERFLIES) butterflies.shift();
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.4; // mostly upward, spreading out
      const speed = 0.035 + Math.random() * 0.05; // px per ms
      butterflies.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 10 + Math.random() * 8,
        born: performance.now(),
        life: 1800 + Math.random() * 1400,
        phase: Math.random() * Math.PI * 2,
        wobble: 0.015 + Math.random() * 0.02,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
        rot: angle + Math.PI / 2,
      });
      start();
    };

    const draw = (b: Butterfly, t: number) => {
      const age = (t - b.born) / b.life;
      const alpha = Math.min(age * 10, 1) * (1 - age * age);
      if (alpha <= 0) return;

      const flap = 0.2 + 0.8 * Math.abs(Math.sin(t * 0.021 + b.phase));
      const s = b.size;

      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot);
      ctx.globalAlpha = alpha;
      ctx.shadowColor = `hsl(${b.hue} 100% 65%)`;
      ctx.shadowBlur = 10;

      for (const side of [-1, 1]) {
        ctx.save();
        ctx.scale(side * flap, 1);

        // upper wing
        ctx.fillStyle = `hsl(${b.hue} 92% 63%)`;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(s * 0.2, -s * 1.35, s * 1.55, -s * 1.2, s * 1.1, -s * 0.1);
        ctx.bezierCurveTo(s * 0.9, s * 0.1, s * 0.3, s * 0.1, 0, 0);
        ctx.fill();

        // lower wing
        ctx.fillStyle = `hsl(${(b.hue + 35) % 360} 92% 58%)`;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(s * 0.9, s * 0.1, s * 1.1, s * 0.95, s * 0.4, s * 0.95);
        ctx.bezierCurveTo(s * 0.1, s * 0.8, 0, s * 0.4, 0, 0);
        ctx.fill();

        // wing spot
        ctx.fillStyle = 'rgba(255,255,255,0.65)';
        ctx.beginPath();
        ctx.arc(s * 0.75, -s * 0.55, s * 0.13, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // body + antennae
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#2a1b3d';
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.4);
      ctx.lineTo(0, s * 0.6);
      ctx.moveTo(0, -s * 0.4);
      ctx.lineTo(-s * 0.25, -s * 0.8);
      ctx.moveTo(0, -s * 0.4);
      ctx.lineTo(s * 0.25, -s * 0.8);
      ctx.stroke();

      ctx.restore();
    };

    const frame = (t: number) => {
      const dt = Math.min(t - lastT, 50); // avoid big jumps after tab switches
      lastT = t;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = butterflies.length - 1; i >= 0; i--) {
        const b = butterflies[i];
        if (t - b.born >= b.life) {
          butterflies.splice(i, 1);
          continue;
        }
        const wx = Math.sin(t * 0.005 + b.phase) * b.wobble;
        const wy = Math.cos(t * 0.004 + b.phase) * b.wobble * 0.6;
        b.vy -= 0.00002 * dt; // gentle upward drift
        b.x += (b.vx + wx) * dt;
        b.y += (b.vy + wy) * dt;

        const target = Math.atan2(b.vy + wy, b.vx + wx) + Math.PI / 2;
        b.rot += angleDiff(target, b.rot) * 0.08;

        draw(b, t);
      }

      if (butterflies.length > 0) {
        rafId = requestAnimationFrame(frame);
      } else {
        running = false; // stop the loop when idle so it costs nothing
      }
    };

    function start() {
      if (running) return;
      running = true;
      lastT = performance.now();
      rafId = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (dx * dx + dy * dy >= SPAWN_DISTANCE * SPAWN_DISTANCE) {
        lastX = e.clientX;
        lastY = e.clientY;
        spawn(e.clientX, e.clientY);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}