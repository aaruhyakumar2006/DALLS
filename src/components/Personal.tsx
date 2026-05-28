'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Music, Activity, BookOpen, Sword } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

const LANGUAGES = [
  { name: 'English',  level: 'Fluent',       pct: 97, script: 'Latin'    },
  { name: 'Hindi',    level: 'Fluent',       pct: 90, script: 'Devanagari' },
  { name: 'Tamil',    level: 'Native',       pct: 100, script: 'Tamil'   },
  { name: 'Telugu',   level: 'Native',       pct: 100, script: 'Telugu' },
  { name: 'Kannada',  level: 'Conversational', pct: 65, script: 'Kannada' },
] as const;

const INTERESTS = [
  {
    id: 'dancing',
    label: 'Dancing',
    icon: Activity,
    note: 'Expressive movement & rhythm',
  },
  {
    id: 'badminton',
    label: 'Badminton',
    icon: Sword,
    note: 'Sports Secretary · School rep',
  },
  {
    id: 'reading',
    label: 'Reading',
    icon: BookOpen,
    note: 'Tech, philosophy & fiction',
  },
  {
    id: 'music',
    label: 'Music',
    icon: Music,
    note: 'Listening & discovering genres',
  },
] as const;

function LangBar({
  lang,
  index,
  inView,
}: {
  lang: (typeof LANGUAGES)[number];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
    >
      {/* Name row */}
      <div className="flex items-baseline justify-between mb-2">
        <div className="flex items-baseline gap-3">
          <span
            className="font-black text-black tracking-[-0.02em] leading-none"
            style={{
              fontFamily: 'Satoshi, system-ui, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
            }}
          >
            {lang.name}
          </span>
          <span
            className="text-[0.62rem] tracking-[0.16em] uppercase text-black/45 font-semibold"
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
          >
            {lang.script}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-[0.65rem] tracking-[0.14em] uppercase border border-black/20 text-black/60 font-bold px-2.5 py-0.5"
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
          >
            {lang.level}
          </span>
          <span
            className="text-[0.7rem] font-black text-black/60 tabular-nums"
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
          >
            {lang.pct}%
          </span>
        </div>
      </div>

      {/* Bar */}
      <div className="h-px w-full bg-black/8 relative overflow-hidden mb-5">
        <motion.div
          className="absolute inset-y-0 left-0 bg-black"
          style={{ opacity: 0.35 + (lang.pct / 100) * 0.45 }}
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={inView ? { scaleX: lang.pct / 100 } : { scaleX: 0 }}
          transition={{
            duration: 1.4,
            delay: 0.3 + index * 0.09,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>
    </motion.div>
  );
}

function InterestCard({
  item,
  index,
  inView,
}: {
  item: (typeof INTERESTS)[number];
  index: number;
  inView: boolean;
}) {
  const Icon = item.icon;

  return (
    <motion.div
      className="group border border-black/10 p-[clamp(1.2rem,2vw,2rem)] relative overflow-hidden hover:border-black/25 transition-colors duration-300"
      initial={{ opacity: 0, y: 20, clipPath: 'inset(100% 0 0 0)' }}
      animate={
        inView
          ? { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }
          : {}
      }
      transition={{ duration: 0.65, delay: index * 0.09, ease: EASE }}
    >
      {/* Hover wash */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: 0 }}
        whileHover={{ opacity: 0.03 }}
        transition={{ duration: 0.3 }}
      />

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-4 h-px bg-black/15" />
      <div className="absolute top-0 right-0 w-px h-4 bg-black/15" />

      <div className="relative z-10 flex flex-col gap-3">
        <div className="w-7 h-7 border border-black/10 flex items-center justify-center group-hover:border-black/20 transition-colors duration-300">
          <Icon size={12} className="text-black/40" />
        </div>
        <p
          className="font-black text-black tracking-[-0.02em] leading-none"
          style={{
            fontFamily: 'Satoshi, system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
          }}
        >
          {item.label}
        </p>
        <p
          className="text-[0.72rem] tracking-[0.1em] text-black/55 leading-snug font-medium"
          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
        >
          {item.note}
        </p>
      </div>
    </motion.div>
  );
}

export function Personal() {
  const sectionRef = useRef<HTMLElement>(null);
  const langRef    = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-12%' });
  const langInView    = useInView(langRef,    { once: true, margin: '-8%'  });

  return (
    <section
      ref={sectionRef}
      id="personal"
      className="w-full bg-[#F5F5F3] border-t border-black/[0.07]"
    >
      <div className="max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)] py-[clamp(5rem,10vw,11rem)]">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-[clamp(2rem,4vw,4rem)]">
          <motion.span
            className="text-[0.6rem] tracking-[0.22em] uppercase text-black/28 font-medium shrink-0"
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            initial={{ opacity: 0, x: -12 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            08 / Personal
          </motion.span>
          <motion.div
            className="flex-1 h-px bg-black/10"
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={sectionInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
          />
        </div>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(3rem,7vw,9rem)]">

          {/* ── Left: Languages ───────────────────────────── */}
          <div>
            <motion.h2
              className="font-black text-black tracking-tighter leading-[0.88] mb-[clamp(2.5rem,5vw,5.5rem)]"
              style={{
                fontFamily: 'Satoshi, system-ui, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.8rem, 6vw, 7rem)',
              }}
              initial={{ opacity: 0, y: 28 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            >
              I{' '}
              <span
                style={{
                  fontFamily: 'var(--font-instrument), Georgia, serif',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'rgba(10,10,10,0.28)',
                }}
              >
                Speak
              </span>
            </motion.h2>

            {/* Pull quote */}
            <motion.p
              className="text-black/45 leading-relaxed mb-[clamp(2rem,4vw,4rem)]"
              style={{
                fontFamily: 'var(--font-instrument), Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            >
              "Communication is the bridge between confusion and clarity — across 5 languages."
            </motion.p>

            {/* Language bars */}
            <div ref={langRef}>
              {LANGUAGES.map((lang, i) => (
                <LangBar key={lang.name} lang={lang} index={i} inView={langInView} />
              ))}
            </div>

            {/* Total languages stat */}
            <motion.div
              className="mt-6 flex items-baseline gap-3"
              initial={{ opacity: 0 }}
              animate={langInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
            >
              <p
                className="font-black text-black leading-none tracking-tighter tabular-nums"
                style={{
                  fontFamily: 'Satoshi, system-ui, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(3rem, 6vw, 6rem)',
                }}
              >
                5
              </p>
              <p
                className="text-[0.72rem] tracking-[0.16em] uppercase text-black/55 font-bold"
                style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
              >
                Languages Spoken
              </p>
            </motion.div>
          </div>

          {/* ── Right: Interests ──────────────────────────── */}
          <div>
            <motion.h2
              className="font-black text-black tracking-tighter leading-[0.88] mb-[clamp(2.5rem,5vw,5.5rem)]"
              style={{
                fontFamily: 'Satoshi, system-ui, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.8rem, 6vw, 7rem)',
              }}
              initial={{ opacity: 0, y: 28 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            >
              I{' '}
              <span
                style={{
                  fontFamily: 'var(--font-instrument), Georgia, serif',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'rgba(10,10,10,0.28)',
                }}
              >
                Enjoy
              </span>
            </motion.h2>

            {/* Pull quote */}
            <motion.p
              className="text-black/45 leading-relaxed mb-[clamp(2rem,4vw,4rem)]"
              style={{
                fontFamily: 'var(--font-instrument), Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
            >
              "Beyond the screen — movement, competition, stories, and sound."
            </motion.p>

            {/* 2×2 grid of interest cards */}
            <div className="grid grid-cols-2 gap-3">
              {INTERESTS.map((item, i) => (
                <InterestCard key={item.id} item={item} index={i} inView={sectionInView} />
              ))}
            </div>

            {/* Soft skills strip */}
            <div className="mt-8 border-t border-black/8 pt-6">
              <p
                className="text-[0.72rem] tracking-[0.2em] uppercase text-black/55 font-bold mb-4"
                style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
              >
                Soft Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Leadership & Team Management',
                  'Client Relationship Management',
                  'Critical Thinking & Problem Solving',
                  'Event Coordination',
                ].map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="border border-black/20 text-black/60 text-[0.68rem] tracking-[0.1em] uppercase px-3 py-1.5 font-semibold"
                    style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                    initial={{ opacity: 0, y: 6, clipPath: 'inset(100% 0 0 0)' }}
                    animate={sectionInView ? { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' } : {}}
                    transition={{ duration: 0.45, delay: 0.5 + i * 0.07, ease: EASE }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
