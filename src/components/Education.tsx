'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, BookOpen, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;

const EDUCATION = [
  {
    id: 'be',
    degree: 'BE — Computer Science & Engineering',
    institution: 'Agni College of Technology',
    period: '2024 – Expected 2028',
    status: 'In Progress',
    score: null,
    scoreLabel: null,
    icon: GraduationCap,
    highlight: null,
    description:
      'Pursuing a Bachelor of Engineering in Computer Science with a focus on full-stack development, AI/ML, and software engineering fundamentals.',
    tags: ['Computer Science', 'Engineering', 'Full Stack', 'AI/ML'],
  },
  {
    id: 'hsc',
    degree: 'HSC (Class XII)',
    institution: 'RMK Residential School',
    period: '2022 – 2024',
    status: 'Completed',
    score: 78.8,
    scoreLabel: '78.8%',
    icon: BookOpen,
    highlight: '🏆 Highest Marks in Physical Education',
    description:
      'Completed Higher Secondary Certificate with strong academic performance. Awarded Highest Marks in Physical Education.',
    tags: ['Class XII', 'Science Stream', 'Sports'],
  },
  {
    id: 'sslc',
    degree: 'SSLC (Class X)',
    institution: 'AM Jain School',
    period: '2020 – 2022',
    status: 'Completed',
    score: 80.0,
    scoreLabel: '80.0%',
    icon: BookOpen,
    highlight: null,
    description:
      'Completed Secondary School Leaving Certificate with a strong academic foundation across all subjects.',
    tags: ['Class X', 'CBSE', 'Foundation'],
  },
] as const;

function ScoreBar({ score, inView }: { score: number; inView: boolean }) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-1.5">
        <span
          className="text-[0.5rem] tracking-[0.22em] uppercase text-black/30 font-medium"
          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
        >
          Score
        </span>
        <span
          className="text-[0.6rem] font-black text-black/60 tabular-nums"
          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
        >
          {score}%
        </span>
      </div>
      <div className="w-full h-px bg-black/8 relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-black/40"
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={inView ? { scaleX: score / 100 } : { scaleX: 0 }}
          transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function EducationCard({
  edu,
  index,
  isLast,
}: {
  edu: (typeof EDUCATION)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const Icon = edu.icon;

  return (
    <div ref={ref} className="relative flex gap-6 sm:gap-10">
      {/* Timeline spine */}
      <div className="relative flex flex-col items-center shrink-0">
        {/* Node */}
        <motion.div
          className="relative z-10 flex items-center justify-center w-10 h-10 border border-black/15 bg-white"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.55, delay: index * 0.15, ease: EASE }}
        >
          <Icon size={14} className="text-black/50" />
          {/* Pulse ring */}
          {edu.status === 'In Progress' && (
            <motion.div
              className="absolute inset-0 border border-black/25"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <motion.div
            className="w-px bg-black/10 flex-1 mt-2"
            style={{ minHeight: '3rem' }}
            initial={{ scaleY: 0, transformOrigin: 'top' }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3 + index * 0.15, ease: EASE }}
          />
        )}
      </div>

      {/* Card content */}
      <motion.div
        className="flex-1 pb-[clamp(2rem,4vw,4rem)]"
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 + index * 0.12, ease: EASE }}
      >
        {/* Period + status */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-[0.52rem] tracking-[0.22em] uppercase text-black/30 font-medium tabular-nums"
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
          >
            {edu.period}
          </span>
          <span
            className={`text-[0.45rem] tracking-[0.18em] uppercase font-semibold px-2 py-0.5 border ${
              edu.status === 'In Progress'
                ? 'border-black/20 text-black/50'
                : 'border-black/10 text-black/30'
            }`}
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
          >
            {edu.status}
          </span>
        </div>

        {/* Degree */}
        <h3
          className="font-black text-black tracking-[-0.03em] leading-tight mb-1"
          style={{
            fontFamily: 'Satoshi, system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(1.3rem, 2.8vw, 2.2rem)',
          }}
        >
          {edu.degree}
        </h3>

        {/* Institution */}
        <p
          className="text-[0.68rem] tracking-[0.2em] uppercase font-bold text-black/40 mb-3"
          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
        >
          {edu.institution}
        </p>

        {/* Description */}
        <p
          className="text-black/45 leading-relaxed mb-4"
          style={{
            fontFamily: 'Satoshi, system-ui, sans-serif',
            fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
          }}
        >
          {edu.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {edu.tags.map((tag) => (
            <span
              key={tag}
              className="border border-black/10 text-black/35 text-[0.48rem] tracking-[0.14em] uppercase px-2.5 py-1"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Score bar */}
        {edu.score !== null && <ScoreBar score={edu.score} inView={inView} />}

        {/* Achievement highlight */}
        {edu.highlight && (
          <motion.div
            className="mt-4 flex items-center gap-2.5 border border-black/10 px-3 py-2.5 bg-black/[0.02] w-fit"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1, ease: EASE }}
          >
            <Trophy size={11} className="text-black/40 shrink-0" />
            <span
              className="text-[0.58rem] tracking-[0.14em] uppercase font-semibold text-black/50"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              {edu.highlight}
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-12%' });

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: lineRef.current, start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
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
            05 / Education
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
          Where{' '}
          <span
            style={{
              fontFamily: 'var(--font-instrument), Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'rgba(10,10,10,0.25)',
            }}
          >
            I Studied
          </span>
        </motion.h2>

        {/* Grid: timeline left, meta right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-[clamp(3rem,6vw,8rem)]">

          {/* Timeline */}
          <div className="flex flex-col">
            {EDUCATION.map((edu, i) => (
              <EducationCard
                key={edu.id}
                edu={edu}
                index={i}
                isLast={i === EDUCATION.length - 1}
              />
            ))}
          </div>

          {/* Right: summary stats */}
          <div className="hidden lg:flex flex-col gap-8 items-end pt-2 shrink-0 w-[200px]">
            {[
              { value: '3', label: 'Institutions' },
              { value: '80%', label: 'Avg Score (10th)' },
              { value: '2028', label: 'Expected Grad' },
            ].map(({ value, label }, i) => (
              <motion.div
                key={label}
                className="text-right"
                initial={{ opacity: 0, x: 20 }}
                animate={sectionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: EASE }}
              >
                <p
                  className="font-black text-black leading-none tracking-tighter tabular-nums"
                  style={{
                    fontFamily: 'Satoshi, system-ui, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                  }}
                >
                  {value}
                </p>
                <p
                  className="mt-1 text-[0.55rem] tracking-[0.18em] uppercase text-black/35 font-medium"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                >
                  {label}
                </p>
                <div className="mt-3 h-px bg-black/8 w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
