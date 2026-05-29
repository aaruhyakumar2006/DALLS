'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Medal } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

const HACKATHONS = [
  {
    id: 'alliance',
    rank: 'TOP 7',
    rankNum: 7,
    totalTeams: 40,
    name: 'Alliance One National Hackathon',
    year: '2026',
    type: 'National Level · 48 Hours',
    description:
      'Ranked Top 7 among 40 teams in a 48-hour national-level competition. Delivered a working product under extreme time pressure, demonstrating rapid prototyping and team leadership.',
    stack: ['React', 'Python', 'Rapid Prototyping', 'Team Leadership'],
    icon: Trophy,
    accent: 'rgba(255,255,255,0.9)',
    accentDim: 'rgba(255,255,255,0.12)',
    badge: 'FINALIST',
  },
  {
    id: 'stackathon',
    rank: '3RD',
    rankNum: 3,
    totalTeams: null,
    name: 'Stackathon Coding Challenge',
    year: '2025',
    type: 'Inter-Institutional · Coding',
    description:
      'Secured 3rd place in an inter-institutional coding competition. Demonstrated strong problem-solving and algorithmic thinking under competitive conditions.',
    stack: ['Algorithms', 'Problem Solving', 'C', 'Java'],
    icon: Medal,
    accent: 'rgba(255,255,255,0.75)',
    accentDim: 'rgba(255,255,255,0.09)',
    badge: 'PODIUM',
  },
] as const;

function RankMeter({ rank, total }: { rank: number; total: number | null }) {
  if (!total) return null;
  const pct = ((total - rank) / total) * 100;
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-1.5">
        <span
          className="text-[0.45rem] tracking-[0.2em] uppercase text-white/20"
          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
        >
          Percentile
        </span>
        <span
          className="text-[0.52rem] font-bold text-white/40 tabular-nums"
          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
        >
          Top {Math.round((rank / total) * 100)}%
        </span>
      </div>
      <div className="h-px w-full bg-white/8 relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-white/45"
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={{ scaleX: pct / 100 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function HackathonCard({
  hack,
  index,
}: {
  hack: (typeof HACKATHONS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const Icon = hack.icon;

  return (
    <motion.div
      ref={ref}
      className="relative border border-white/8 overflow-hidden group"
      style={{ background: 'rgba(255,255,255,0.02)' }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.12, ease: EASE }}
      whileHover={{ borderColor: 'rgba(255,255,255,0.16)' }}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-5 h-px bg-white/20" />
      <div className="absolute top-0 left-0 w-px h-5 bg-white/20" />
      <div className="absolute bottom-0 right-0 w-5 h-px bg-white/12" />
      <div className="absolute bottom-0 right-0 w-px h-5 bg-white/12" />

      {/* Hover gradient wash */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 40%, rgba(255,255,255,0.04) 0%, transparent 60%)',
          opacity: 0,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative z-10 p-[clamp(1.5rem,3vw,3rem)]">

        {/* Top row: badge + year */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <Icon size={13} style={{ color: hack.accent }} />
            <span
              className="text-[0.48rem] tracking-[0.28em] uppercase font-semibold px-2 py-0.5 border"
              style={{
                fontFamily: 'Satoshi, system-ui, sans-serif',
                borderColor: hack.accentDim,
                color: hack.accent,
              }}
            >
              {hack.badge}
            </span>
          </div>
          <span
            className="text-[0.52rem] tracking-[0.22em] uppercase text-white/20 tabular-nums"
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
          >
            {hack.year}
          </span>
        </div>

        {/* Giant rank number */}
        <div
          className="leading-none select-none mb-5"
          style={{
            fontFamily: 'var(--font-instrument), Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            color: 'rgba(255,255,255,0.08)',
            letterSpacing: '-0.04em',
          }}
        >
          {hack.rank}
        </div>

        {/* Divider */}
        <motion.div
          className="w-8 h-px mb-5"
          style={{ background: hack.accent, opacity: 0.4 }}
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 + index * 0.1, ease: EASE }}
        />

        {/* Name */}
        <h3
          className="font-black text-white tracking-[-0.03em] leading-tight mb-2"
          style={{
            fontFamily: 'Satoshi, system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(1.1rem, 2.2vw, 1.7rem)',
          }}
        >
          {hack.name}
        </h3>

        {/* Type */}
        <p
          className="text-[0.55rem] tracking-[0.2em] uppercase text-white/30 font-medium mb-4"
          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
        >
          {hack.type}
        </p>

        {/* Description */}
        <p
          className="text-white/35 leading-relaxed mb-5"
          style={{
            fontFamily: 'Satoshi, system-ui, sans-serif',
            fontSize: 'clamp(0.8rem, 1.1vw, 0.92rem)',
          }}
        >
          {hack.description}
        </p>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {hack.stack.map((t) => (
            <span
              key={t}
              className="border border-white/10 text-white/25 text-[0.45rem] tracking-[0.14em] uppercase px-2 py-0.5"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              {t}
            </span>
          ))}
        </div>

        <RankMeter rank={hack.rankNum} total={hack.totalTeams} />
      </div>
    </motion.div>
  );
}

export function Hackathons() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-12%' });

  return (
    <section
      ref={sectionRef}
      id="hackathons"
      data-theme="dark"
      className="w-full bg-[#0A0A0A] border-t border-white/[0.06] relative overflow-hidden"
    >
      {/* Background grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 60px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 60px)
          `,
        }}
      />

      {/* Ambient orb */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60vw',
          height: '60vw',
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.006) 45%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)] py-[clamp(5rem,10vw,11rem)]">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-[clamp(2rem,4vw,4rem)]">
          <motion.span
            className="text-[0.6rem] tracking-[0.22em] uppercase text-white/20 font-medium shrink-0"
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            initial={{ opacity: 0, x: -16 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            06 / Achievements
          </motion.span>
          <motion.div
            className="flex-1 h-px bg-white/8"
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={sectionInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
          />
        </div>

        {/* Headline */}
        <h2
          className="font-black text-white tracking-[-0.04em] leading-[0.9] mb-[clamp(3rem,6vw,7rem)]"
          style={{
            fontFamily: 'Satoshi, system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(3rem, 8vw, 10rem)',
          }}
        >
          {(['Wins', '&'] as const).map((word, i) => (
            <span key={word} className="inline-block overflow-hidden mr-[0.22em]">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={sectionInView ? { y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.05 + i * 0.1, ease: EASE }}
              >
                {word}
              </motion.span>
            </span>
          ))}{' '}
          <span className="inline-block overflow-hidden">
            <motion.span
              className="block"
              style={{
                fontFamily: 'var(--font-instrument), Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.22)',
              }}
              initial={{ y: '110%' }}
              animate={sectionInView ? { y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
            >
              Trophies
            </motion.span>
          </span>
        </h2>

        {/* Stats bar */}
        <div className="flex items-center gap-8 lg:gap-16 mb-[clamp(2.5rem,5vw,6rem)] border-b border-white/6 pb-6">
          {[
            { value: '3+', label: 'Competitions Entered' },
            { value: 'Top 7', label: 'National Hackathon' },
            { value: '3rd', label: 'Coding Challenge' },
          ].map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: EASE }}
            >
              <p
                className="text-white/75 font-black leading-none tabular-nums"
                style={{
                  fontFamily: 'Satoshi, system-ui, sans-serif',
                  fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                {value}
              </p>
              <p
                className="text-[0.5rem] tracking-[0.18em] uppercase text-white/22 mt-1"
                style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
              >
                {label}
              </p>
            </motion.div>
          ))}

          {/* Live status */}
          <motion.div
            className="ml-auto flex items-center gap-2 shrink-0"
            initial={{ opacity: 0 }}
            animate={sectionInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Zap size={11} className="text-white/30" />
            <span
              className="text-[0.5rem] tracking-[0.2em] uppercase text-white/22"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              Still competing
            </span>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {HACKATHONS.map((hack, i) => (
            <HackathonCard key={hack.id} hack={hack} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
