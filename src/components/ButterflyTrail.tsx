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
  hueIdx: number;
  rot: number;
};

// Set to false if you want butterflies even when "reduce motion" is on.
const RESPECT_REDUCED_MOTION = true;

// ---- Easy knobs to tweak ----
const MAX_BUTTERFLIES = 18; // fewer = smoother
const SPAWN_DISTANCE = 46; // px the cursor must travel before the next butterfly
const MIN_SIZE = 6; // smallest butterfly
const MAX_SIZE = 12; // biggest butterfly
const HUES = [320, 190, 265, 45, 150]; // pink, cyan, violet, amber, mint
// -----------------------------

// Wing sprite settings (drawn once, reused every frame)
const SPRITE_S = 24;
const RES = 2; // sprite sharpness
const PAD = 8; // room for the glow
const OX = PAD;
const OY = Math.ceil(SPRITE_S * 1.35) + PAD;
const SW = Math.ceil(SPRITE_S * 1.6) + PAD * 2;
const SH = OY + Math.ceil(SPRITE_S * 0.95) + PAD;

function angleDiff(a: number, b: number) {
  return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

// Draws ONE wing pair half (right side) into an offscreen canvas, glow included.
function makeWingSprite(hue: number) {
  const c = document.createElement('canvas');
  c.width = SW * RES;
  c.height = SH * RES;
  const g = c.getContext('2d')!;
  g.scale(RES, RES);
  g.translate(OX, OY);
  const s = SPRITE_S;

  g.shadowColor = `hsla(${hue}, 100%, 65%, 0.85)`;
  g.shadowBlur = 8;
  g.lineJoin = 'round';

  // upper wing
  const upper = g.createRadialGradient(0, 0, 0, s * 0.9, -s * 0.5, s * 1.4);
  upper.addColorStop(0, `hsl(${hue} 95% 80%)`);
  upper.addColorStop(0.6, `hsl(${hue} 92% 63%)`);
  upper.addColorStop(1, `hsl(${hue} 88% 50%)`);
  g.fillStyle = upper;
  g.beginPath();
  g.moveTo(0, 0);
  g.bezierCurveTo(s * 0.2, -s * 1.35, s * 1.55, -s * 1.2, s * 1.1, -s * 0.1);
  g.bezierCurveTo(s * 0.9, s * 0.1, s * 0.3, s * 0.1, 0, 0);
  g.fill();
  g.shadowBlur = 0;
  g.strokeStyle = `hsla(${hue}, 70%, 28%, 0.5)`;
  g.lineWidth = 0.9;
  g.stroke();

  // lower wing
  const h2 = (hue + 35) % 360;
  const lower = g.createRadialGradient(0, 0, 0, s * 0.5, s * 0.5, s * 0.9);
  lower.addColorStop(0, `hsl(${h2} 95% 75%)`);
  lower.addColorStop(1, `hsl(${h2} 90% 52%)`);
  g.fillStyle = lower;
  g.beginPath();
  g.moveTo(0, 0);
  g.bezierCurveTo(s * 0.9, s * 0.1, s * 1.1, s * 0.95, s * 0.4, s * 0.95);
  g.bezierCurveTo(s * 0.1, s * 0.8, 0, s * 0.4, 0, 0);
  g.fill();
  g.stroke();

  // wing spots
  g.fillStyle = 'rgba(255,255,255,0.75)';
  g.beginPath();
  g.arc(s * 0.78, -s * 0.58, s * 0.14, 0, Math.PI * 2);
  g.fill();
  g.beginPath();
  g.arc(s * 0.95, -s * 0.3, s * 0.07, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = 'rgba(255,255,255,0.55)';
  g.beginPath();
  g.arc(s * 0.48, s * 0.55, s * 0.09, 0, Math.PI * 2);
  g.fill();

  return c;
}

export default function ButterflyTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (RESPECT_REDUCED_MOTION && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(any-hover: hover) and (any-pointer: fine)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sprites = HUES.map(makeWingSprite);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // lower = faster
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
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.4;
      const speed = 0.03 + Math.random() * 0.04;
      butterflies.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
        born: performance.now(),
        life: 1600 + Math.random() * 1200,
        phase: Math.random() * Math.PI * 2,
        wobble: 0.012 + Math.random() * 0.016,
        hueIdx: Math.floor(Math.random() * HUES.length),
        rot: angle + Math.PI / 2,
      });
      start();
    };

    const draw = (b: Butterfly, t: number) => {
      const age = (t - b.born) / b.life;
      const alpha = Math.min(age * 8, 1) * (1 - age * age);
      if (alpha <= 0.01) return;

      const flap = 0.25 + 0.75 * Math.abs(Math.sin(t * 0.017 + b.phase));
      const s = b.size;
      const k = s / SPRITE_S;
      const sprite = sprites[b.hueIdx];

      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot);
      ctx.globalAlpha = alpha;

      // two wings = same sprite, one mirrored
      for (const side of [-1, 1]) {
        ctx.save();
        ctx.scale(side * flap, 1);
        ctx.drawImage(sprite, -OX * k, -OY * k, SW * k, SH * k);
        ctx.restore();
      }

      // body + antennae
      ctx.strokeStyle = '#2a1b3d';
      ctx.lineWidth = Math.max(1, s * 0.11);
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
      const dt = Math.min(t - lastT, 50);
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
        b.vy -= 0.00002 * dt;
        b.x += (b.vx + wx) * dt;
        b.y += (b.vy + wy) * dt;

        const target = Math.atan2(b.vy + wy, b.vx + wx) + Math.PI / 2;
        b.rot += angleDiff(target, b.rot) * 0.08;

        draw(b, t);
      }

      if (butterflies.length > 0) {
        rafId = requestAnimationFrame(frame);
      } else {
        running = false;
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