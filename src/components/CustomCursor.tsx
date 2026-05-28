'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type CursorVariant = 'default' | 'link' | 'view' | 'drag' | 'hire' | 'ask' | 'text';

interface CursorConfig {
  dotSize:     number;
  ringSize:    number;
  ringFilled:  boolean;
  label:       string;
  borderWidth: number;
}

const CONFIGS: Record<CursorVariant, CursorConfig> = {
  default: { dotSize: 6,  ringSize: 38, ringFilled: false, label: '',       borderWidth: 1.5 },
  link:    { dotSize: 0,  ringSize: 54, ringFilled: false, label: '',       borderWidth: 1   },
  view:    { dotSize: 0,  ringSize: 78, ringFilled: true,  label: 'VIEW',   borderWidth: 0   },
  drag:    { dotSize: 0,  ringSize: 84, ringFilled: true,  label: 'DRAG',   borderWidth: 0   },
  hire:    { dotSize: 0,  ringSize: 78, ringFilled: true,  label: 'HIRE',   borderWidth: 0   },
  ask:     { dotSize: 0,  ringSize: 72, ringFilled: true,  label: 'ASK AI', borderWidth: 0   },
  text:    { dotSize: 2,  ringSize: 20, ringFilled: false, label: '',       borderWidth: 1   },
};

const SPRING_FAST = { type: 'spring' as const, stiffness: 800, damping: 38, mass: 0.3 };
const SPRING_RING = { type: 'spring' as const, stiffness: 200, damping: 26, mass: 0.6 };
const EASE        = [0.22, 1, 0.36, 1] as const;

function DragArrows({ color }: { color: string }) {
  return (
    <svg width="26" height="10" viewBox="0 0 26 10" fill="none" aria-hidden>
      <path
        d="M0 5H26M0 5L4.5 1M0 5L4.5 9M26 5L21.5 1M26 5L21.5 9"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [variant,   setVariant]   = useState<CursorVariant>('default');
  const [isDark,    setIsDark]    = useState(false);
  const [clicking,  setClicking]  = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted,   setMounted]   = useState(false);

  const mouse      = useRef({ x: -400, y: -400 });
  const ringPos    = useRef({ x: -400, y: -400 });
  const variantRef = useRef<CursorVariant>('default');
  const rafRef     = useRef<number>(0);

  useEffect(() => { variantRef.current = variant; }, [variant]);

  const tick = useCallback(() => {
    const lag = variantRef.current === 'default' ? 0.095 : 0.075;
    ringPos.current.x += (mouse.current.x - ringPos.current.x) * lag;
    ringPos.current.y += (mouse.current.y - ringPos.current.y) * lag;
    if (ringRef.current) {
      ringRef.current.style.transform =
        `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.innerWidth < 768) return;

    setMounted(true);
    rafRef.current = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      setIsVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      // Dark-section detection
      const themeEl = el?.closest('[data-theme]');
      setIsDark(themeEl?.getAttribute('data-theme') === 'dark');

      // Explicit cursor override wins first
      const cursorEl = el?.closest('[data-cursor]');
      if (cursorEl) {
        setVariant(cursorEl.getAttribute('data-cursor') as CursorVariant);
        return;
      }
      // Auto-detect interactive elements
      if (el?.closest('button, a')) {
        setVariant('link');
      } else if (el?.closest('input, textarea')) {
        setVariant('text');
      } else {
        setVariant('default');
      }
    };

    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [tick]);

  if (!mounted) return null;

  const cfg   = CONFIGS[variant];
  const fg    = isDark ? '#FFFFFF' : '#0A0A0A';
  const bg    = isDark ? '#FFFFFF' : '#0A0A0A';
  const lbl   = isDark ? '#0A0A0A' : '#FFFFFF';
  const cm    = clicking ? 0.86 : 1;

  return (
    <>
      {/* ── Dot — instant, sticks to cursor ───────────────────────────────── */}
      <div
        ref={dotRef}
        aria-hidden
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none', willChange: 'transform' }}
      >
        <motion.div
          animate={{
            width:           cfg.dotSize * cm,
            height:          cfg.dotSize * cm,
            backgroundColor: fg,
            opacity:         isVisible && cfg.dotSize > 0 ? 1 : 0,
          }}
          transition={SPRING_FAST}
          style={{ borderRadius: '50%' }}
        />
      </div>

      {/* ── Ring — spring-lagged follower ─────────────────────────────────── */}
      <div
        ref={ringRef}
        aria-hidden
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 9998, pointerEvents: 'none', willChange: 'transform' }}
      >
        <motion.div
          animate={{
            width:           cfg.ringSize * cm,
            height:          cfg.ringSize * cm,
            borderWidth:     cfg.ringFilled ? 0 : cfg.borderWidth,
            borderColor:     fg,
            backgroundColor: cfg.ringFilled ? bg : 'transparent',
            opacity:         isVisible && cfg.ringSize > 0 ? 1 : 0,
          }}
          transition={SPRING_RING}
          style={{
            borderRadius: '50%',
            borderStyle: 'solid',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatePresence mode="wait">
            {cfg.label && (
              <motion.span
                key={cfg.label}
                initial={{ opacity: 0, scale: 0.65 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.65 }}
                transition={{ duration: 0.16, ease: EASE }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  userSelect: 'none',
                }}
              >
                {cfg.label === 'DRAG' ? (
                  <DragArrows color={lbl} />
                ) : (
                  <span
                    style={{
                      color:          lbl,
                      fontSize:       cfg.label.length > 4 ? 8 : 9.5,
                      letterSpacing:  '0.14em',
                      fontWeight:     800,
                      fontFamily:     'Satoshi, system-ui, sans-serif',
                      textTransform:  'uppercase',
                      whiteSpace:     'nowrap',
                      lineHeight:     1,
                    }}
                  >
                    {cfg.label}
                  </span>
                )}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
