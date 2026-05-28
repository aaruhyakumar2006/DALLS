'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

// Code snippets that cycle with typewriter effect
const SNIPPETS = [
  [
    { text: 'const aaruhya = {',       color: 'text-white/70' },
    { text: '  role: "Full Stack Dev",', color: 'text-emerald-400/80' },
    { text: '  exp:  "1+ Years",',      color: 'text-emerald-400/80' },
    { text: '  stack: ["React","Python",', color: 'text-sky-400/80' },
    { text: '          "Flutter","MySQL"],', color: 'text-sky-400/80' },
    { text: '  status: "open_to_work",', color: 'text-amber-400/90' },
    { text: '}',                         color: 'text-white/70' },
  ],
  [
    { text: 'const achievements = {',   color: 'text-white/70' },
    { text: '  projects_shipped: 5,',   color: 'text-emerald-400/80' },
    { text: '  clients_served:  5,',    color: 'text-emerald-400/80' },
    { text: '  hackathons:       5,',   color: 'text-sky-400/80' },
    { text: '  cofounded: "Nascraft",', color: 'text-violet-400/80' },
    { text: '  coo_of: "Megsyra",',     color: 'text-violet-400/80' },
    { text: '}',                         color: 'text-white/70' },
  ],
  [
    { text: 'async function hire() {',       color: 'text-white/70' },
    { text: '  const dev = await find({',    color: 'text-sky-400/80' },
    { text: '    skill: "full_stack",',      color: 'text-emerald-400/80' },
    { text: '    location: "Chennai 🇮🇳",',  color: 'text-emerald-400/80' },
    { text: '    available: true,',          color: 'text-amber-400/90' },
    { text: '  });',                          color: 'text-sky-400/80' },
    { text: '  return dev; // aaruhya',       color: 'text-white/30' },
  ],
];

const METRICS = [
  { label: 'Projects', value: '5+', color: 'rgba(52,211,153,0.9)' },
  { label: 'Clients',  value: '5+', color: 'rgba(56,189,248,0.9)' },
  { label: 'Years',    value: '1+', color: 'rgba(167,139,250,0.9)' },
];

// Live IST clock
function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false,
      }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// Typewriter hook — types one char at a time, then erases
function useTypewriter(lines: { text: string; color: string }[], speed = 28) {
  const [display, setDisplay] = useState<{ text: string; color: string }[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'waiting' | 'erasing'>('typing');

  useEffect(() => {
    if (phase === 'typing') {
      if (lineIdx >= lines.length) {
        const t = setTimeout(() => setPhase('waiting'), 2200);
        return () => clearTimeout(t);
      }
      if (charIdx <= lines[lineIdx].text.length) {
        const t = setTimeout(() => {
          setDisplay(prev => {
            const next = [...prev];
            next[lineIdx] = { ...lines[lineIdx], text: lines[lineIdx].text.slice(0, charIdx) };
            return next;
          });
          setCharIdx(c => c + 1);
        }, speed);
        return () => clearTimeout(t);
      } else {
        setLineIdx(l => l + 1);
        setCharIdx(0);
      }
    }

    if (phase === 'waiting') {
      const t = setTimeout(() => setPhase('erasing'), 2000);
      return () => clearTimeout(t);
    }

    if (phase === 'erasing') {
      if (display.length === 0) {
        setPhase('typing');
        setLineIdx(0);
        setCharIdx(0);
        return;
      }
      const t = setTimeout(() => setDisplay(prev => prev.slice(0, -1)), 35);
      return () => clearTimeout(t);
    }
  }, [phase, lineIdx, charIdx, display, lines, speed]);

  return display;
}

// Cycling snippet index
function useCycleSnippet() {
  const [idx, setIdx] = useState(0);
  const next = useCallback(() => setIdx(i => (i + 1) % SNIPPETS.length), []);
  return { snippet: SNIPPETS[idx], next };
}

export function HeroTerminal() {
  const clock = useClock();
  const { snippet, next } = useCycleSnippet();
  const display = useTypewriter(snippet, 26);

  // When typewriter finishes erasing, cycle to next snippet
  const prevLen = useRef(display.length);
  useEffect(() => {
    if (prevLen.current > 0 && display.length === 0) next();
    prevLen.current = display.length;
  }, [display.length, next]);

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
    >
      {/* Terminal card */}
      <div
        className="w-full max-w-[420px]"
        style={{
          background: 'rgba(8,8,10,0.92)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '6px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.28), 0 2px 0 rgba(255,255,255,0.04) inset',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* ── Terminal header ─────────────────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Traffic-light dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FEBC2E' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28C840' }} />
          </div>

          {/* Title */}
          <span
            style={{
              fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.14em',
              color: 'rgba(255,255,255,0.28)',
              textTransform: 'uppercase',
            }}
          >
            aaruhya.config.ts
          </span>

          {/* Live clock */}
          <span
            style={{
              fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
              fontSize: '0.58rem',
              color: 'rgba(52,211,153,0.7)',
              letterSpacing: '0.06em',
            }}
          >
            {clock} IST
          </span>
        </div>

        {/* ── Code body ───────────────────────────────────────────────────────── */}
        <div className="px-5 py-5" style={{ minHeight: 210 }}>
          {/* Prompt line */}
          <div className="flex items-center gap-2 mb-3">
            <span style={{ fontFamily: 'ui-monospace, "JetBrains Mono", monospace', fontSize: '0.62rem', color: 'rgba(52,211,153,0.7)' }}>
              aaruhya@dalls
            </span>
            <span style={{ fontFamily: 'ui-monospace, "JetBrains Mono", monospace', fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)' }}>
              ~ $
            </span>
          </div>

          {/* Typewriter code lines */}
          <div className="space-y-0.5">
            {display.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                <span
                  className={line.color}
                  style={{ fontFamily: 'ui-monospace, "JetBrains Mono", monospace', fontSize: '0.72rem', lineHeight: 1.75 }}
                >
                  {line.text}
                </span>
              </motion.div>
            ))}

            {/* Blinking cursor */}
            <span
              style={{
                display: 'inline-block',
                width: 7,
                height: 14,
                background: 'rgba(52,211,153,0.8)',
                animation: 'blink 1.1s step-end infinite',
                verticalAlign: 'middle',
                marginLeft: 2,
              }}
            />
          </div>
        </div>

        {/* ── Metrics strip ────────────────────────────────────────────────────── */}
        <div
          className="grid grid-cols-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {METRICS.map(({ label, value, color }, i) => (
            <div
              key={label}
              className="flex flex-col items-center py-4 gap-0.5"
              style={{
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <span style={{ fontFamily: 'Satoshi, system-ui, sans-serif', fontWeight: 800, fontSize: '1.15rem', color, lineHeight: 1 }}>
                {value}
              </span>
              <span style={{ fontFamily: 'Satoshi, system-ui, sans-serif', fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Status footer ────────────────────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: '#28C840' }} />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: '#28C840' }} />
            </span>
            <span style={{ fontFamily: 'ui-monospace, "JetBrains Mono", monospace', fontSize: '0.52rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.1em' }}>
              Available for hire
            </span>
          </div>
          <span style={{ fontFamily: 'ui-monospace, "JetBrains Mono", monospace', fontSize: '0.5rem', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.1em' }}>
            Chennai, India · Remote OK
          </span>
        </div>
      </div>

      {/* Cursor blink keyframe */}
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </motion.div>
  );
}
