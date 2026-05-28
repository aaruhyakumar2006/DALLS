'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function PageLoader({ onDone }: { onDone: () => void }) {
  const panelRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const countRef   = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const centerRef  = useRef<HTMLDivElement>(null);
  const nameRef    = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const markRef    = useRef<HTMLDivElement>(null);
  const hlineRef   = useRef<HTMLDivElement>(null);
  const vlineRef   = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [nameText, setNameText] = useState('');

  const FULL_NAME = 'AARUHYA';
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@_';

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // ── Scramble name in ──────────────────────────────────────────────────
    let frame = 0;
    const SCRAMBLE_DURATION = 40; // frames per char
    const totalFrames = FULL_NAME.length * SCRAMBLE_DURATION;
    let raf: number;

    const scramble = () => {
      frame++;
      const revealed = Math.floor((frame / totalFrames) * FULL_NAME.length);
      let result = '';
      for (let i = 0; i < FULL_NAME.length; i++) {
        if (i < revealed) {
          result += FULL_NAME[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setNameText(result);
      if (frame < totalFrames + 20) raf = requestAnimationFrame(scramble);
      else setNameText(FULL_NAME);
    };

    setTimeout(() => { raf = requestAnimationFrame(scramble); }, 200);

    // ── Center block entrance ─────────────────────────────────────────────
    gsap.fromTo(centerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.15 }
    );

    // ── Geometric mark — draws border ─────────────────────────────────────
    gsap.fromTo(markRef.current,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power3.inOut', delay: 0.3 }
    );

    // ── Cross lines draw in ───────────────────────────────────────────────
    gsap.fromTo(hlineRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 1.2, ease: 'power3.inOut', delay: 0.5 }
    );
    gsap.fromTo(vlineRef.current,
      { scaleY: 0, transformOrigin: 'top center' },
      { scaleY: 1, duration: 1.2, ease: 'power3.inOut', delay: 0.7 }
    );

    // ── Subtitle fade in ──────────────────────────────────────────────────
    gsap.fromTo(subtitleRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 1.2 }
    );

    // ── Count 0 → 100 over 2.6s ──────────────────────────────────────────
    const DURATION = 2600;
    const start = performance.now();
    let countRaf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setCount(Math.round(e * 100));
      if (t < 1) countRaf = requestAnimationFrame(tick);
    };
    countRaf = requestAnimationFrame(tick);

    // ── Progress line ─────────────────────────────────────────────────────
    gsap.to(lineRef.current, {
      scaleX: 1, duration: 2.6, ease: 'power2.inOut',
    });

    // ── Exit sequence ─────────────────────────────────────────────────────
    const tl = gsap.timeline({
      delay: 3.1,
      onComplete: () => {
        document.body.style.overflow = '';
        onDone();
      },
    });

    tl.to(centerRef.current, {
      opacity: 0, y: -20, duration: 0.45, ease: 'power2.in',
    });
    tl.to(countRef.current, {
      opacity: 0, duration: 0.3, ease: 'power2.in',
    }, '<');

    panelRefs.current.forEach((panel, i) => {
      tl.to(panel,
        { y: '-100%', duration: 0.75, ease: 'power4.inOut' },
        0.15 + i * 0.06
      );
    });

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(countRaf);
      document.body.style.overflow = '';
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">

      {/* ── 5 vertical panels ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { panelRefs.current[i] = el; }}
            className="flex-1"
            style={{ backgroundColor: '#0A0A0A' }}
          />
        ))}
      </div>

      {/* ── Horizontal rule across full width ─────────────────────────────── */}
      <div
        ref={hlineRef}
        className="absolute left-0 right-0 z-10 pointer-events-none"
        style={{
          top: '50%',
          height: '1px',
          backgroundColor: 'rgba(255,255,255,0.06)',
        }}
      />

      {/* ── Vertical rule down full height ────────────────────────────────── */}
      <div
        ref={vlineRef}
        className="absolute top-0 bottom-0 z-10 pointer-events-none"
        style={{
          left: '50%',
          width: '1px',
          backgroundColor: 'rgba(255,255,255,0.06)',
        }}
      />

      {/* ── Center content ────────────────────────────────────────────────── */}
      <div
        ref={centerRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
        style={{ opacity: 0 }}
      >
        {/* Geometric mark — square with inner cross */}
        <div
          ref={markRef}
          className="relative mb-8"
          style={{
            width: 'clamp(48px, 6vw, 72px)',
            height: 'clamp(48px, 6vw, 72px)',
            border: '1px solid rgba(255,255,255,0.25)',
          }}
        >
          {/* inner horizontal */}
          <div style={{
            position: 'absolute', top: '50%', left: '15%', right: '15%',
            height: '1px', backgroundColor: 'rgba(255,255,255,0.2)',
          }} />
          {/* inner vertical */}
          <div style={{
            position: 'absolute', left: '50%', top: '15%', bottom: '15%',
            width: '1px', backgroundColor: 'rgba(255,255,255,0.2)',
          }} />
          {/* center dot */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 4, height: 4, borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.6)',
          }} />
        </div>

        {/* Scrambling name */}
        <div
          ref={nameRef}
          style={{
            fontFamily: 'Satoshi, system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(3rem, 10vw, 9rem)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: 'rgba(255,255,255,0.92)',
            fontVariantNumeric: 'tabular-nums',
            userSelect: 'none',
          }}
        >
          {nameText}
        </div>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          style={{
            opacity: 0,
            marginTop: 'clamp(0.75rem, 1.5vw, 1.25rem)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div style={{ width: '1.5rem', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <span style={{
            fontFamily: 'var(--font-instrument), Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(0.85rem, 1.6vw, 1.1rem)',
            color: 'rgba(255,255,255,0.28)',
            letterSpacing: '0.02em',
          }}>
            Full Stack Developer
          </span>
          <div style={{ width: '1.5rem', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
        </div>
      </div>

      {/* ── Progress line — bottom ─────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
        style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }}
      >
        <div
          ref={lineRef}
          className="h-full origin-left"
          style={{ backgroundColor: 'rgba(255,255,255,0.35)', transform: 'scaleX(0)' }}
        />
      </div>

      {/* ── Counter — bottom right ─────────────────────────────────────────── */}
      <div
        ref={countRef}
        className="absolute bottom-6 right-6 z-20 pointer-events-none select-none tabular-nums"
        style={{
          fontFamily: 'Satoshi, system-ui, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(3.5rem, 8vw, 7rem)',
          letterSpacing: '-0.05em',
          lineHeight: 1,
          color: 'rgba(255,255,255,0.75)',
        }}
      >
        {count}%
      </div>

      {/* ── Label — bottom left ────────────────────────────────────────────── */}
      <div
        className="absolute bottom-7 left-6 z-20 pointer-events-none"
        style={{
          fontFamily: 'Satoshi, system-ui, sans-serif',
          fontSize: '0.5rem',
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.14)',
          fontWeight: 500,
        }}
      >
        Portfolio · 2026
      </div>

    </div>
  );
}
