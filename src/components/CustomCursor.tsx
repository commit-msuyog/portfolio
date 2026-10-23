import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for fluid trailing physics inspired by unseen.co
  const smoothX = useSpring(mouseX, { damping: 28, stiffness: 350, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 28, stiffness: 350, mass: 0.5 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hovered elements for cursor attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('[data-cursor], button, a, input, select, textarea');
      if (interactive) {
        setIsHovered(true);
        const label = interactive.getAttribute('data-cursor');
        setCursorLabel(label);
      } else {
        setIsHovered(false);
        setCursorLabel(null);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-9999 overflow-hidden transition-opacity duration-300">
      {/* Outer fluid follower ring / morphing badge */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isMouseDown ? 0.85 : isHovered ? (cursorLabel ? 1 : 1.4) : 1,
          width: cursorLabel ? 'auto' : isHovered ? 48 : 34,
          height: cursorLabel ? 32 : isHovered ? 48 : 34,
          paddingLeft: cursorLabel ? 14 : 0,
          paddingRight: cursorLabel ? 14 : 0,
          backgroundColor: cursorLabel
            ? 'rgba(18, 18, 18, 0.92)'
            : isHovered
            ? 'rgba(37, 99, 235, 0.15)'
            : 'transparent',
          borderColor: cursorLabel ? '#121212' : isHovered ? '#2563EB' : 'rgba(18, 18, 18, 0.55)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="flex items-center justify-center rounded-full border border-solid backdrop-blur-[1px]"
      >
        {cursorLabel ? (
          <span className="whitespace-nowrap font-mono text-[10px] font-semibold tracking-wider text-white uppercase">
            {cursorLabel}
          </span>
        ) : null}
      </motion.div>

      {/* Center sharp pinpoint dot */}
      {!cursorLabel && (
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isHovered ? 0.5 : 1,
            opacity: isHovered ? 0.7 : 1,
          }}
          className="h-1.5 w-1.5 rounded-full bg-[#121212]"
        />
      )}
    </div>
  );
}
