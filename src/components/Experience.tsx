'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;

const EXPERIENCE = [
  {
    year: '2026',
    role: 'Hackathon Finalist',
    company: 'Alliance One National Hackathon',
    type: 'Competition',
    image: '/exp_hackathon.png',
    bullets: [
      'Ranked Top 7 among 40 teams in a 48-hour national-level hackathon competition.',
      'Delivered a working product under extreme time pressure, demonstrating rapid prototyping and team leadership.',
    ],
    stack: ['React', 'Python', 'Rapid Prototyping'],
  },
  {
    year: '2025',
    role: 'Co-Founder & Full Stack Developer',
    company: 'Nascraft Digitals',
    type: 'Founder · Remote',
    image: '/exp_nascraft.png',
    bullets: [
      'Co-founded a digital agency delivering web development, UI/UX, branding, and digital solutions for startups and local businesses.',
      'Completed 5+ projects generating Rs.20K+ revenue. Led end-to-end project execution including client communication, development, testing, and deployment.',
      'Managed cross-functional teams of developers, designers, and content creators across multiple simultaneous engagements.',
    ],
    stack: ['React', 'Python', 'Flutter', 'MySQL'],
  },
  {
    year: '2025',
    role: 'Chief Operating Officer',
    company: 'Megsyra',
    type: 'Leadership · Remote',
    image: '/exp_megsyra.png',
    bullets: [
      'Overseeing day-to-day operations and cross-functional team coordination.',
      'Driving product development initiatives and aligning engineering efforts with business objectives.',
    ],
    stack: ['Leadership', 'Product Strategy', 'Operations'],
  },
  {
    year: '2025',
    role: 'Freelance Full Stack Developer',
    company: 'NutriIntern Application',
    type: 'Freelance · Remote',
    image: '/exp_nutriintern.png',
    bullets: [
      'Developed a nutrition internship platform with dietary planning, case-study modules, and progress tracking.',
      'Managed complete product lifecycle from requirement gathering through design, development, and deployment.',
    ],
    stack: ['React', 'Python', 'MySQL'],
  },
  {
    year: '2025',
    role: '3rd Place',
    company: 'Stackathon Coding Challenge',
    type: 'Competition',
    image: '/exp_stackathon.png',
    bullets: [
      'Secured 3rd place in an inter-institutional coding competition.',
      'Demonstrated strong problem-solving and algorithmic thinking under competitive conditions.',
    ],
    stack: ['Algorithms', 'Problem Solving', 'C', 'Java'],
  },
  {
    year: '2024',
    role: 'Secretary',
    company: 'Rotaract Club',
    type: 'Leadership · On-site',
    image: '/exp_rotaract.png',
    bullets: [
      'Led community initiatives, events, and team coordination as club secretary.',
      'Organized outreach programs and managed cross-functional volunteer teams.',
    ],
    stack: ['Leadership', 'Event Management', 'Community'],
  },
];

/* ── Mobile card (vertical scroll) ──────────────────────────────────────── */
function MobileCard({ exp, index }: { exp: (typeof EXPERIENCE)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6%' });
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      ref={ref}
      className="border-b border-black/8 py-10 px-6"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Top row: num + type */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-[0.55rem] tracking-[0.24em] uppercase text-black/30 font-medium"
          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
        >
          {num}
        </span>
        <span
          className="text-[0.55rem] tracking-[0.18em] uppercase text-black/28 font-medium"
          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
        >
          {exp.type}
        </span>
      </div>

      {/* Year */}
      <div
        className="leading-none select-none mb-6"
        style={{
          fontFamily: 'var(--font-instrument), Georgia, serif',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(5rem, 22vw, 9rem)',
          color: 'rgba(10,10,10,0.35)',
          letterSpacing: '-0.04em',
        }}
      >
        {exp.year}
      </div>

      {/* Image thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden mb-6 bg-black/5">
        <Image
          src={exp.image}
          alt={`${exp.company} — ${exp.role}`}
          fill
          className="object-cover object-center transition-transform duration-700 hover:scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-black/10 mb-6" />

      {/* Role + company */}
      <div className="mb-5">
        <h3
          className="font-black text-black tracking-[-0.03em] leading-tight mb-2"
          style={{
            fontFamily: 'Satoshi, system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(1.7rem, 7vw, 2.6rem)',
          }}
        >
          {exp.role}
        </h3>
        <p
          className="text-[0.72rem] tracking-[0.22em] uppercase text-black/50 font-bold"
          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
        >
          {exp.company}
        </p>
      </div>

      {/* Description */}
      <ul className="mb-6 flex flex-col gap-2.5">
        {exp.bullets.map((b, i) => (
          <li
            key={i}
            className="flex gap-2.5 text-black/70 leading-relaxed font-semibold"
            style={{
              fontFamily: 'Satoshi, system-ui, sans-serif',
              fontSize: 'clamp(0.88rem, 3vw, 1rem)',
            }}
          >
            <span className="mt-[0.45em] w-1 h-1 rounded-full bg-black/30 shrink-0" />
            {b}
          </li>
        ))}
      </ul>

      {/* Stack badges */}
      <div className="flex flex-wrap gap-2">
        {exp.stack.map((t) => (
          <span
            key={t}
            className="border border-black/20 bg-black/5 text-black/60 text-[0.65rem] tracking-widest uppercase font-semibold px-3 py-1.5"
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Desktop panel (horizontal scroll) ──────────────────────────────────── */
function DesktopPanel({
  exp,
  index,
  total,
}: {
  exp: (typeof EXPERIENCE)[0];
  index: number;
  total: number;
}) {
  const num = String(index + 1).padStart(2, '0');
  const tot = String(total).padStart(2, '0');

  return (
    <div
      className="relative shrink-0 h-full flex flex-col justify-between border-r border-black/8"
      style={{ width: '100vw', padding: 'clamp(2rem,4vw,4.5rem) clamp(2rem,5vw,5rem)' }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span
          className="text-[0.55rem] tracking-[0.24em] uppercase text-black/30 font-medium"
          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
        >
          {num} · {exp.type}
        </span>
        <span
          className="text-[0.55rem] tracking-[0.18em] uppercase text-black/20 font-medium tabular-nums"
          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
        >
          {num} / {tot}
        </span>
      </div>

      {/* Center: year + rule + content + image */}
      <div className="flex items-stretch flex-1 mt-8 mb-8 gap-0">
        {/* Year */}
        <div
          className="flex items-center shrink-0"
          style={{ width: 'clamp(220px, 32vw, 480px)' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-instrument), Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(6rem, 14vw, 18rem)',
              color: 'rgba(10,10,10,0.38)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            {exp.year}
          </span>
        </div>

        {/* Vertical rule */}
        <div className="w-px bg-black/12 self-stretch mx-[clamp(2rem,3.5vw,4rem)] shrink-0" />

        {/* Content */}
        <div className="flex flex-col justify-center gap-6 flex-1 min-w-0 max-w-2xl">
          <div className="flex flex-col gap-3">
            <h3
              style={{
                fontFamily: 'Satoshi, system-ui, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2rem, 3.8vw, 4.5rem)',
                color: 'rgba(10,10,10,0.92)',
                letterSpacing: '-0.035em',
                lineHeight: 1.02,
              }}
            >
              {exp.role}
            </h3>
            <p
              className="text-[0.75rem] tracking-[0.24em] uppercase text-black/55 font-bold"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              {exp.company}
            </p>
          </div>

          <ul className="flex flex-col gap-2" style={{ maxWidth: '54ch' }}>
            {exp.bullets.map((b, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-black/72 leading-relaxed font-semibold"
                style={{
                  fontFamily: 'Satoshi, system-ui, sans-serif',
                  fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
                }}
              >
                <span className="mt-[0.5em] w-1 h-1 rounded-full bg-black/30 shrink-0" />
                {b}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {exp.stack.map((t) => (
              <span
                key={t}
                className="border border-black/20 bg-black/5 text-black/60 text-[0.65rem] tracking-widest uppercase font-semibold px-3 py-1.5"
                style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Vertical rule before image */}
        <div className="w-px bg-black/12 self-stretch mx-[clamp(2rem,3.5vw,4rem)] shrink-0" />

        {/* Image panel */}
        <div
          className="relative shrink-0 self-stretch overflow-hidden bg-black/5"
          style={{ width: 'clamp(180px, 22vw, 360px)' }}
        >
          <Image
            src={exp.image}
            alt={`${exp.company} — ${exp.role}`}
            fill
            className="object-cover object-center transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 1280px) 22vw, 360px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          {/* Role label overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 z-10">
            <p
              className="text-white/80 text-[0.6rem] tracking-[0.18em] uppercase font-semibold"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              {exp.type}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom scroll hint — first panel only */}
      {index === 0 && (
        <p
          className="text-[0.52rem] tracking-[0.2em] uppercase text-black/22 font-medium"
          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
        >
          Scroll to explore →
        </p>
      )}
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────────── */
export function Experience() {
  const sectionRef    = useRef<HTMLElement>(null);
  const pinRef        = useRef<HTMLDivElement>(null);
  const trackRef      = useRef<HTMLDivElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-12%' });

  useEffect(() => {
    if (window.innerWidth < 1024) return; // desktop only

    const pin      = pinRef.current;
    const track    = trackRef.current;
    const progress = progressRef.current;
    if (!pin || !track) return;

    const ctx = gsap.context(() => {
      const getEnd = () => `+=${track.scrollWidth - window.innerWidth}`;

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: getEnd,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (progress) {
        gsap.to(progress, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: getEnd,
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Shared section header */
  const Header = (
    <div className="px-[clamp(1.25rem,5vw,5rem)] pt-[clamp(4rem,8vw,10rem)] pb-[clamp(2rem,4vw,4rem)]">
      <div className="flex items-center gap-4 mb-[clamp(2rem,4vw,4rem)]">
        <motion.span
          className="text-[0.6rem] tracking-[0.22em] uppercase text-black/30 font-medium shrink-0"
          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
          initial={{ opacity: 0, x: -16 }}
          animate={sectionInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
           04 / Experience
        </motion.span>
        <motion.div
          className="flex-1 h-px bg-black/10"
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={sectionInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
        />
      </div>

      <h2
        className="font-black text-black tracking-[-0.04em] leading-[0.9]"
        style={{
          fontFamily: 'Satoshi, system-ui, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(2.4rem, 7vw, 8rem)',
        }}
      >
        {(['Where', "I've"] as const).map((word, i) => (
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
        ))}
        {' '}
        <span className="inline-block overflow-hidden">
          <motion.span
            className="block"
            style={{
              fontFamily: 'var(--font-instrument), Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'rgba(10,10,10,0.28)',
            }}
            initial={{ y: '110%' }}
            animate={sectionInView ? { y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
          >
            Built
          </motion.span>
        </span>
      </h2>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="w-full border-t border-black/8"
    >
      {/* ── Mobile layout (< lg) ─────────────────────────────────────────── */}
      <div className="block lg:hidden relative overflow-hidden">
        {/* Video bg */}
        <video
          autoPlay muted loop playsInline preload="auto"
          poster="/ex_poster.jpg"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          <source src="/ex_video_opt.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/78 z-1 pointer-events-none" />

        <div className="relative z-10">
          {Header}
          <div>
            {EXPERIENCE.map((exp, i) => (
              <MobileCard key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Desktop layout (≥ lg) ────────────────────────────────────────── */}
      <div className="hidden lg:block">
        {/* Header sits above the pin — plain white bg */}
        <div className="bg-white">
          {Header}
        </div>

        {/* Pinned horizontal scroll */}
        <div ref={pinRef} data-cursor="drag" className="h-screen overflow-hidden relative">
          {/* Video bg — pinned with content */}
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          >
            <source src="/ex_video_opt.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-white/72 z-1 pointer-events-none" />

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-px bg-black/8 z-20 pointer-events-none">
            <div
              ref={progressRef}
              className="h-full bg-black/40 origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>

          {/* Track */}
          <div
            ref={trackRef}
            className="relative z-10 flex h-full"
            style={{ width: `${EXPERIENCE.length * 100}vw` }}
          >
            {EXPERIENCE.map((exp, i) => (
              <DesktopPanel
                key={i}
                exp={exp}
                index={i}
                total={EXPERIENCE.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
