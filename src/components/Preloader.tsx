import { useEffect, useState } from 'react';
import { AnimatePresence, animate, motion } from 'motion/react';

// Total on-screen time is about 2.5s. Hero.tsx starts its entrance at 1.9s, just as the curtain lifts.
export default function Preloader() {
  const [visible, setVisible] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = 'hidden';

    const controls = animate(0, 100, {
      duration: 1.5,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        setTimeout(() => {
          setVisible(false);
          document.body.style.overflow = '';
        }, 150);
      },
    });

    return () => {
      controls.stop();
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          aria-hidden="true"
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[10000] flex flex-col justify-between bg-[#0A0A12] p-6 text-[#F8F7F3] sm:p-10"
        >
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#F8F7F3]/70">
            <span>Suyog Verma</span>
            <span>Portfolio '26</span>
          </div>

          <div className="flex items-end justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-[#F8F7F3]/50">
              Loading
            </span>
            <span className="font-display text-[clamp(6rem,26vw,22rem)] font-extrabold leading-[0.8] tabular-nums">
              {String(count).padStart(3, '0')}
            </span>
          </div>

          <div
            className="absolute bottom-0 left-0 h-1.5"
            style={{
              width: `${count}%`,
              background: 'linear-gradient(90deg, #2563EB, #A78BFA, #FF8FC7, #FFC933)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}