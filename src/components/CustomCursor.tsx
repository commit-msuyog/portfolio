import { useEffect, useRef } from 'react';

/*
  Animated cat cursor.

  The original Windows .ani cursors cannot be used on a website, so the animation was split into:
    /cursors/cat.webp       53 animation frames of the cat, side by side (each frame is 64x64)
    /cursors/pointers.png   the 15 small pointer icons (arrow, hand, text beam...), each 16x16

  The cursor follows the mouse, swaps the pointer icon to match what you hover over,
  and loops the cat with the same timing as the original file.
*/

const CAT_FRAMES = 53;
const CAT_CELL = 64; // size of one cat frame in the image
const POINTER_CELL = 16; // size of one pointer icon in the image

// How big things are drawn. Keep POINTER_SCALE a whole number (1 or 2) so the pixel art stays sharp.
const POINTER_SCALE = 1;
const CAT_SCALE = 0.85;

// How long each cat frame is shown, in milliseconds (taken from the original cursor file).
const FRAME_MS = [67, 133, 67, 67, 133, 67, 67, 133, 67, 67, 133, 67, 67, 67, 117, 67, 67, 117, 67, 67, 117, 67, 67, 117, 67, 67, 117, 67, 67, 117, 67, 67, 117, 67, 67, 117, 67, 67, 117, 67, 67, 117, 67, 67, 117, 67, 67, 117, 67, 67, 117, 67, 67];
const CUMULATIVE: number[] = [];
FRAME_MS.reduce((sum, ms) => {
  sum += ms;
  CUMULATIVE.push(sum);
  return sum;
}, 0);
const LOOP_MS = CUMULATIVE[CUMULATIVE.length - 1];

// Which pointer icon to use, and where its "click point" is (in image pixels).
const POINTERS = {
  arrow: { i: 0, hot: [1, 1] },
  link: { i: 1, hot: [3, 0] },
  text: { i: 2, hot: [3, 5] },
  help: { i: 3, hot: [4, 0] },
  unavailable: { i: 4, hot: [6, 6] },
  working: { i: 5, hot: [1, 1] },
  busy: { i: 6, hot: [1, 1] },
  precision: { i: 7, hot: [6, 6] },
  move: { i: 8, hot: [6, 6] },
  ns: { i: 9, hot: [4, 6] },
  ew: { i: 10, hot: [6, 3] },
  nwse: { i: 11, hot: [5, 5] },
  nesw: { i: 12, hot: [5, 5] },
  alt: { i: 13, hot: [3, 0] },
  pen: { i: 14, hot: [0, 0] },
} as const;

type Kind = keyof typeof POINTERS;

const CURSOR_CLASS_TO_KIND: [RegExp, Kind][] = [
  [/(^|\s)cursor-(not-allowed|no-drop)(\s|$)/, 'unavailable'],
  [/(^|\s)cursor-help(\s|$)/, 'help'],
  [/(^|\s)cursor-(wait)(\s|$)/, 'busy'],
  [/(^|\s)cursor-(progress)(\s|$)/, 'working'],
  [/(^|\s)cursor-(crosshair|cell)(\s|$)/, 'precision'],
  [/(^|\s)cursor-(move|grab|grabbing|all-scroll)(\s|$)/, 'move'],
  [/(^|\s)cursor-(ns-resize|row-resize)(\s|$)/, 'ns'],
  [/(^|\s)cursor-(ew-resize|col-resize)(\s|$)/, 'ew'],
  [/(^|\s)cursor-text(\s|$)/, 'text'],
  [/(^|\s)cursor-pointer(\s|$)/, 'link'],
];

const CLICKABLE =
  'a[href], button, summary, select, label[for], [role="button"], [role="link"], [role="tab"], [role="menuitem"], [data-cursor], input[type="range"], input[type="checkbox"], input[type="radio"], input[type="button"], input[type="submit"]';
const TEXT_FIELD =
  'textarea, [contenteditable=""], [contenteditable="true"], input:not([type]), input[type="text"], input[type="search"], input[type="email"], input[type="url"], input[type="tel"], input[type="password"], input[type="number"]';

// Decides which pointer to show for the element under the mouse.
function kindFor(el: Element | null): Kind {
  if (!el) return 'arrow';

  if (el.closest(':disabled, [aria-disabled="true"]')) return 'unavailable';
  if (el.closest(TEXT_FIELD)) return 'text';

  // Tailwind classes like cursor-help or cursor-not-allowed
  const withCursorClass = el.closest('[class*="cursor-"]');
  if (withCursorClass) {
    const classes = withCursorClass.getAttribute('class') ?? '';
    for (const [pattern, kind] of CURSOR_CLASS_TO_KIND) if (pattern.test(classes)) return kind;
  }

  if (el.closest(CLICKABLE)) return 'link';
  return 'arrow';
}

export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const cat = catRef.current;
    const pointer = pointerRef.current;
    if (!root || !cat || !pointer) return;

    // Only for devices that have a real mouse. Phones and tablets keep their normal behaviour.
    if (!window.matchMedia('(any-hover: hover) and (any-pointer: fine)').matches) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const html = document.documentElement;
    const hideSystemCursor = document.createElement('style');
    hideSystemCursor.textContent = 'html.cc-active, html.cc-active * { cursor: none !important; }';
    document.head.appendChild(hideSystemCursor);

    let kind: Kind = 'arrow';
    let x = -200;
    let y = -200;
    let started = false;

    const place = () => {
      const [hx, hy] = POINTERS[kind].hot;
      root.style.transform = `translate3d(${x - hx * POINTER_SCALE}px, ${y - hy * POINTER_SCALE}px, 0)`;
    };

    const setKind = (next: Kind) => {
      if (next === kind) return;
      kind = next;
      pointer.style.backgroundPosition = `${-POINTERS[kind].i * POINTER_CELL * POINTER_SCALE}px 0`;
      place();
    };

    const show = (visible: boolean) => {
      root.style.opacity = visible ? '1' : '0';
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      if (!started) {
        started = true;
        html.classList.add('cc-active'); // hide the system cursor only once ours is ready
        show(true);
      }
      place();
    };

    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      setKind(kindFor(e.target as Element | null));
    };

    const onDown = () => {
      cat.style.transform = 'scale(0.9)';
    };
    const onUp = () => {
      cat.style.transform = 'scale(1)';
    };
    const onLeave = () => show(false);
    const onEnter = () => {
      if (started) show(true);
    };

    // Cat animation: only touches the page when the frame actually changes.
    let raf = 0;
    let shown = -1;
    const frameAt = (t: number) => {
      const m = t % LOOP_MS;
      let f = 0;
      while (f < CUMULATIVE.length - 1 && m >= CUMULATIVE[f]) f++;
      return f;
    };
    const tick = (t: number) => {
      const f = frameAt(t);
      if (f !== shown) {
        shown = f;
        cat.style.backgroundPosition = `${-f * CAT_CELL * CAT_SCALE}px 0`;
      }
      raf = requestAnimationFrame(tick);
    };
    if (!reduceMotion) raf = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, true);
    window.addEventListener('pointerdown', onDown, true);
    window.addEventListener('pointerup', onUp, true);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver, true);
      window.removeEventListener('pointerdown', onDown, true);
      window.removeEventListener('pointerup', onUp, true);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      html.classList.remove('cc-active');
      hideSystemCursor.remove();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        zIndex: 10001,
        pointerEvents: 'none',
        opacity: 0,
        willChange: 'transform',
        transition: 'opacity 0.15s',
      }}
    >
      {/* The dancing cat */}
      <div
        ref={catRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: CAT_CELL * CAT_SCALE,
          height: CAT_CELL * CAT_SCALE,
          backgroundImage: 'url(/cursors/cat.webp)',
          backgroundSize: `${CAT_FRAMES * CAT_CELL * CAT_SCALE}px ${CAT_CELL * CAT_SCALE}px`,
          backgroundRepeat: 'no-repeat',
          transformOrigin: '0 0',
          transition: 'transform 0.08s',
        }}
      />
      {/* The small pointer icon on top (arrow, hand, text beam...) */}
      <div
        ref={pointerRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: POINTER_CELL * POINTER_SCALE,
          height: POINTER_CELL * POINTER_SCALE,
          backgroundImage: 'url(/cursors/pointers.png)',
          backgroundSize: `${15 * POINTER_CELL * POINTER_SCALE}px ${POINTER_CELL * POINTER_SCALE}px`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '0 0',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
}