'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Mic2, Award } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

const LEADERSHIP = [
  {
    id: 'rotaract',
    role: 'Secretary',
    org: 'Rotaract Club',
    period: '2024 – Present',
    type: 'Community Service',
    icon: Users,
    bullets: [
      'Led community initiatives, events, and team coordination as club secretary.',
      'Organized outreach programs and managed cross-functional volunteer teams.',
      'Represented the club in inter-club meets and district-level events.',
    ],
    tags: ['Leadership', 'Event Management', 'Community', 'Volunteering'],
  },
  {
    id: 'techvol',
    role: 'Technical Volunteer',
    org: 'Agni College of Technology',
    period: '2024 – Present',
    type: 'Technical Coordination',
    icon: Mic2,
    bullets: [
      'Managed event logistics and technical coordination for college technical fests.',
      'Assisted in AV setup, stage management, and participant coordination.',
      'Collaborated with teams to ensure smooth event execution under tight timelines.',
    ],
    tags: ['Technical Coordination', 'Events', 'Teamwork', 'Operations'],
  },
  {
    id: 'sports',
    role: 'Sports Secretary',
    org: 'RMK Residential School',
    period: '2022 – 2024',
    type: 'Sports Leadership',
    icon: Award,
    bullets: [
      'Organized sports events and represented school in badminton competitions.',
      'Managed scheduling, logistics, and team coordination for all sports activities.',
      'Received Highest Marks in Physical Education — Class XII recognition.',
    ],
    tags: ['Sports', 'Badminton', 'Leadership', 'Event Organization'],
  },
] as const;

function LeadershipRow({
  item,
  index,
  isLast,
}: {
  item: (typeof LEADERSHIP)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-16 ${!isLast ? 'border-b border-black/8 pb-[clamp(2.5rem,5vw,5rem)] mb-[clamp(2.5rem,5vw,5rem)]' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay: index * 0.1, ease: EASE }}
    >
      {/* Left: meta column */}
      <div className="flex flex-col gap-3">
        {/* Icon + number */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-black/12 flex items-center justify-center">
            <Icon size={13} className="text-black/40" />
          </div>
          <span
            className="text-[0.65rem] tracking-[0.22em] uppercase text-black/50 font-bold tabular-nums"
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Period */}
        <p
          className="text-[0.72rem] tracking-[0.18em] uppercase text-black/55 font-bold"
          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
        >
          {item.period}
        </p>

        {/* Type badge */}
        <span
          className="text-[0.65rem] tracking-[0.15em] uppercase border border-black/20 text-black/60 font-bold px-2.5 py-1 w-fit"
          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
        >
          {item.type}
        </span>

        {/* Tags — mobile hidden, desktop shown */}
        <div className="hidden lg:flex flex-col gap-1.5 mt-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[0.65rem] tracking-[0.12em] uppercase text-black/50 font-semibold"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              — {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right: content column */}
      <div>
        {/* Role + org */}
        <div className="mb-5">
          <h3
            className="font-black text-black tracking-[-0.03em] leading-tight"
            style={{
              fontFamily: 'Satoshi, system-ui, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(1.6rem, 3vw, 2.8rem)',
            }}
          >
            {item.role}
          </h3>
          <p
            className="text-[0.7rem] tracking-[0.22em] uppercase text-black/45 font-bold mt-1"
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
          >
            {item.org}
          </p>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-black/8 mb-5"
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2 + index * 0.1, ease: EASE }}
        />

        {/* Bullets */}
        <ul className="flex flex-col gap-2.5">
          {item.bullets.map((bullet, bi) => (
            <motion.li
              key={bi}
              className="flex gap-2.5 text-black/55 leading-relaxed"
              style={{
                fontFamily: 'Satoshi, system-ui, sans-serif',
                fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
              }}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.3 + bi * 0.06, ease: EASE }}
            >
              <span className="mt-[0.55em] w-1 h-1 rounded-full bg-black/25 shrink-0" />
              {bullet}
            </motion.li>
          ))}
        </ul>

        {/* Tags — mobile only */}
        <div className="flex flex-wrap gap-1.5 mt-5 lg:hidden">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="border border-black/20 text-black/55 text-[0.65rem] tracking-[0.12em] uppercase px-2.5 py-1 font-semibold"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Leadership() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-12%' });

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className="w-full bg-white border-t border-black/[0.08]"
    >
      <div className="max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)] py-[clamp(5rem,10vw,11rem)]">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-[clamp(2rem,4vw,4rem)]">
          <motion.span
            className="text-[0.6rem] tracking-[0.22em] uppercase text-black/30 font-medium shrink-0"
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            initial={{ opacity: 0, x: -12 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            07 / Leadership
          </motion.span>
          <div ref={lineRef} className="flex-1 h-px bg-black/10" />
        </div>

        {/* Headline */}
        <motion.h2
          className="font-black text-black tracking-tighter leading-[0.88] mb-[clamp(3rem,6vw,7rem)]"
          style={{
            fontFamily: 'Satoshi, system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(3.5rem, 9vw, 11rem)',
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
        >
          How I{' '}
          <span
            style={{
              fontFamily: 'var(--font-instrument), Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'rgba(10,10,10,0.25)',
            }}
          >
            Lead
          </span>
        </motion.h2>

        {/* Leadership rows */}
        <div>
          {LEADERSHIP.map((item, i) => (
            <LeadershipRow
              key={item.id}
              item={item}
              index={i}
              isLast={i === LEADERSHIP.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
