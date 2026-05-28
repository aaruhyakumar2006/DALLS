'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight } from 'lucide-react';
import { animate, createTimeline, scrambleText } from 'animejs';
import { HeroTerminal } from '@/components/HeroTerminal';

gsap.registerPlugin(ScrollTrigger);

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@_!∆';
const EASE = [0.22, 1, 0.36, 1] as const;
const STACK_TAGS = ['React', 'Python', 'Flutter', 'MySQL', 'Git', 'Android Studio'];

function runScramble(el: HTMLElement, duration = 900) {
  animate(el, {
    innerHTML: scrambleText({
      chars: SCRAMBLE_CHARS,
      duration,
      perturbation: 0.18,
      cursor: '█▓▒░',
      settleDuration: 280,
    }),
  });
}

// ── Dot-grid background canvas ──────────────────────────────────────────────
function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const SPACING = 34;
    const DOT_R  = 1.1;
    const WAVE_SPEED = 0.0009;
    const WAVE_AMP   = 0.55;
    const BASE_ALPHA = 0.13;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width  / SPACING) + 1;
      const rows = Math.ceil(canvas.height / SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING;
          const y = r * SPACING;
          // Wave based on diagonal distance
          const d = (c + r) * 0.18;
          const wave = Math.sin(d - t) * WAVE_AMP;
          const alpha = BASE_ALPHA + wave * 0.10;
          ctx.beginPath();
          ctx.arc(x, y, DOT_R, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(10,10,10,${Math.max(0.03, alpha)})`;
          ctx.fill();
        }
      }
      t += WAVE_SPEED * 60;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      aria-hidden
    />
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const nameRef      = useRef<HTMLHeadingElement>(null);
  const line1Ref     = useRef<HTMLSpanElement>(null);
  const line2Ref     = useRef<HTMLSpanElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const dotGridRef   = useRef<HTMLDivElement>(null);
  const statusRef    = useRef<HTMLDivElement>(null);
  const tagsRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scramble entrance
    const tl = createTimeline({ delay: 180 });
    if (line1Ref.current && line2Ref.current && subRef.current) {
      tl.add(line1Ref.current, {
        innerHTML: scrambleText({ chars: SCRAMBLE_CHARS, duration: 820, perturbation: 0.22, cursor: '█▓▒░', settleDuration: 260 }),
      });
      tl.add(line2Ref.current, {
        innerHTML: scrambleText({ chars: SCRAMBLE_CHARS, duration: 820, perturbation: 0.22, cursor: '█▓▒░', settleDuration: 260 }),
      }, '-=680');
      tl.add(subRef.current, {
        innerHTML: scrambleText({ chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz —', duration: 700, perturbation: 0.15, cursor: '░▒', settleDuration: 200 }),
      }, '-=500');
    }

    const ctx = gsap.context(() => {
      // Layer 1 — dot grid: fastest parallax (moves most)
      if (dotGridRef.current) {
        gsap.to(dotGridRef.current, {
          y: -80, ease: 'none',
          scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
        });
      }
      // Layer 2 — status pill + tags: medium speed
      if (statusRef.current) {
        gsap.to(statusRef.current, {
          y: -40, ease: 'none',
          scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
        });
      }
      if (tagsRef.current) {
        gsap.to(tagsRef.current, {
          y: -40, ease: 'none',
          scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
        });
      }
      // Layer 3 — name: slowest (barely moves, stays prominent)
      if (nameRef.current) {
        gsap.to(nameRef.current, {
          scale: 0.93, opacity: 0.35, y: -20, ease: 'none',
          scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 },
        });
      }
      // Layer 4 — tagline: slightly faster than name
      if (subRef.current) {
        gsap.to(subRef.current, {
          y: -55, opacity: 0, ease: 'none',
          scrollTrigger: { trigger: containerRef.current, start: 'top top', end: '60% top', scrub: 1 },
        });
      }
    }, containerRef);

    // Hover scramble
    const targets: [HTMLElement | null, number][] = [
      [line1Ref.current, 700],
      [line2Ref.current, 700],
      [subRef.current, 600],
    ];
    const cleanups: (() => void)[] = [];
    targets.forEach(([el, dur]) => {
      if (!el) return;
      const h = () => runScramble(el, dur);
      el.addEventListener('pointerenter', h);
      cleanups.push(() => el.removeEventListener('pointerenter', h));
    });

    return () => { ctx.revert(); cleanups.forEach(fn => fn()); };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col"
    >
      {/* ── Animated dot-grid background ──────────────────────────────────────── */}
      <div ref={dotGridRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <DotGrid />
      </div>

      {/* ── Subtle vignette corners ───────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 55%, rgba(255,255,255,0.4) 100%)',
      }} />

      {/* ── Content grid ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 w-full">

        {/* LEFT — text content ───────────────────────────────────────────────── */}
        <div className="flex flex-col flex-1 min-w-0 pl-[clamp(1.5rem,5vw,6rem)] pr-4">
          <div className="pt-24" />

          <div className="flex flex-col flex-1 justify-end pb-[clamp(3rem,7vw,7rem)]">

            {/* Status pill */}
            <motion.div
              ref={statusRef}
              className="flex items-center gap-3 mb-[clamp(1.5rem,3vw,3rem)]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.4, ease: EASE }}
            >
              <span className="inline-flex items-center gap-2 border border-black/12 px-3 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-black/40 opacity-60" />
                  <span className="relative rounded-full h-1.5 w-1.5 bg-black/70" />
                </span>
                <span className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-black/50"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                  Open to Opportunities
                </span>
              </span>
              <span className="text-[0.6rem] font-medium tracking-[0.15em] uppercase text-black/30"
                style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                Remote · India
              </span>
            </motion.div>

            {/* H1 */}
            <h1
              ref={nameRef}
              className="text-black leading-[0.88] tracking-tighter will-change-transform"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif', fontWeight: 800, fontSize: 'clamp(3.5rem, 10vw, 13rem)' }}
            >
              <span ref={line1Ref} className="block cursor-default select-none">Aaruhya</span>
              <span ref={line2Ref} className="block cursor-default select-none">Kumar N</span>
            </h1>

            {/* Tagline */}
            <p
              ref={subRef}
              className="mt-[clamp(1rem,2.5vw,2.5rem)] text-black/40 cursor-default select-none"
              style={{ fontFamily: 'var(--font-clash), Satoshi, system-ui, sans-serif', fontWeight: 400, fontStyle: 'normal', fontSize: 'clamp(1.1rem, 2.4vw, 2.6rem)', letterSpacing: '-0.01em', lineHeight: 1.25 }}
            >
              Full Stack Developer — building products that make a difference.
            </p>

            {/* Stack tags + CTAs */}
            <div ref={tagsRef} className="mt-[clamp(2rem,4vw,4.5rem)] flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
              <div className="flex flex-wrap gap-2">
                {STACK_TAGS.map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="border border-black/12 px-3 py-1 text-[0.65rem] font-medium tracking-[0.12em] uppercase text-black/40"
                    style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                    initial={{ opacity: 0, y: 10, clipPath: 'inset(100% 0 0 0)' }}
                    animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
                    transition={{ duration: 0.5, delay: 1.6 + i * 0.07, ease: EASE }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <motion.a
                  href="#work"
                  data-cursor="view"
                  className="group flex items-center gap-2 bg-black text-white px-6 py-3.5 text-[0.7rem] font-medium tracking-[0.18em] uppercase hover:bg-black/80 transition-colors duration-200"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.1, ease: EASE }}
                >
                  View Work
                  <ArrowDownRight size={12} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                </motion.a>
                <motion.button
                  data-cursor="hire"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
                  className="text-[0.7rem] font-medium tracking-[0.18em] uppercase text-black/40 hover:text-black border border-black/12 px-6 py-3.5 hover:border-black/40 transition-colors duration-200"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.2, ease: EASE }}
                >
                  Contact
                </motion.button>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-[clamp(1.5rem,5vw,6rem)] flex flex-col items-start gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-10 bg-gradient-to-b from-black/25 to-transparent"
            />
            <span className="text-[0.52rem] tracking-[0.22em] uppercase text-black/22"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
              Scroll
            </span>
          </motion.div>
        </div>

        {/* RIGHT — terminal panel (desktop only) ───────────────────────────── */}
        <div
          className="hidden lg:flex items-center justify-center shrink-0 pr-[clamp(2rem,5vw,6rem)]"
          style={{ width: 'clamp(360px, 38vw, 500px)' }}
        >
          <HeroTerminal />
        </div>
      </div>

      {/* Side label */}
      <div className="absolute right-[clamp(1rem,2vw,2.5rem)] top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-10">
        <span
          className="text-[0.52rem] tracking-[0.24em] uppercase text-black/18 [writing-mode:vertical-rl] rotate-180"
          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
        >
          Full Stack · Co-Founder · India
        </span>
      </div>
    </section>
  );
}
