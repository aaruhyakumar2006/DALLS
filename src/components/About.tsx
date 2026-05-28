'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: 'Projects Shipped',   target: 5,  suffix: '+' },
  { label: 'Clients Served',     target: 5,  suffix: '+' },
  { label: 'Hackathons Entered', target: 5,  suffix: '+' },
  { label: 'Years Building',     target: 1,  suffix: '+' },
];

const QUOTE_WORDS = [
  'I', 'build', 'products', 'that', 'solve', 'real', 'problems', '\u2014',
  'fast,', 'clean,', 'and', 'built', 'to', 'last.',
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* Smooth count-up, fires once on scroll into view */
function CountUp({
  target,
  suffix,
  inView,
  delay = 0,
}: {
  target: number;
  suffix: string;
  inView: boolean;
  delay?: number;
}) {
  const [display, setDisplay] = useState(0);
  const count   = useMotionValue(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const ctrl = animate(count, target, {
      duration: 2.2,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [inView, target, count, delay]);

  return <>{display}{suffix}</>;
}

/* Word-by-word animated pull quote */
function AnimatedQuote({ inView }: { inView: boolean }) {
  return (
    <p
      style={{
        fontFamily:    'var(--font-instrument), Georgia, serif',
        fontStyle:     'italic',
        fontSize:      'clamp(1.8rem, 3.5vw, 3.5rem)',
        letterSpacing: '-0.01em',
        lineHeight:    1.2,
        color:         '#0A0A0A',
      }}
    >
      &ldquo;
      {QUOTE_WORDS.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.55, delay: 0.05 + i * 0.045, ease: EASE }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
      &rdquo;
    </p>
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: '-10%' });
  const statsInView   = useInView(statsRef,   { once: true, margin: '-5%'  });

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {

      /* Horizontal rule draw-in */
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: lineRef.current, start: 'top 85%' },
          }
        );
      }

      /* Image clip-path reveal */
      gsap.fromTo(imageRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: imageRef.current, start: 'top 78%' },
        }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full bg-white border-t border-black/[0.08]"
    >
      <div className="max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)] py-[clamp(5rem,10vw,11rem)]">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-[clamp(2rem,4vw,4rem)]">
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-[0.6rem] tracking-[0.22em] uppercase text-black/30 font-medium"
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
          >
            01 / About
          </motion.span>
          <div ref={lineRef} className="flex-1 h-px bg-black/10" />
        </div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
          className="font-black text-black tracking-tighter leading-[0.88] mb-[clamp(3rem,6vw,7rem)]"
          style={{
            fontFamily: 'var(--font-clash), Satoshi, system-ui, sans-serif',
            fontWeight: 700,
            fontSize:   'clamp(4rem, 10vw, 13rem)',
            letterSpacing: '-0.03em',
          }}
        >
          About{' '}
          <span
            style={{
              fontFamily: 'var(--font-instrument), Georgia, serif',
              fontStyle:  'italic',
              fontWeight: 400,
              color:      'rgba(10,10,10,0.28)',
            }}
          >
            Me
          </span>
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(3rem,6vw,8rem)]">

          {/* Left: stats */}
          <div ref={statsRef} className="grid grid-cols-2 gap-x-8 gap-y-12 content-start">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 28, clipPath: 'inset(100% 0 0 0)' }}
                animate={statsInView ? { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              >
                <p
                  className="font-black text-black leading-none tracking-tighter tabular-nums"
                  style={{
                    fontFamily: 'Satoshi, system-ui, sans-serif',
                    fontWeight: 900,
                    fontSize:   'clamp(3.5rem, 7vw, 9rem)',
                  }}
                >
                  <CountUp
                    target={stat.target}
                    suffix={stat.suffix}
                    inView={statsInView}
                    delay={i * 0.12}
                  />
                </p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={statsInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: EASE }}
                  className="mt-2 text-[0.75rem] font-semibold tracking-[0.14em] uppercase text-black/40"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                >
                  {stat.label}
                </motion.p>

                {/* Underline draws in after the number settles */}
                <motion.div
                  className="mt-4 h-px bg-black/10"
                  initial={{ scaleX: 0, transformOrigin: 'left' }}
                  animate={statsInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: EASE }}
                />
              </motion.div>
            ))}
          </div>

          {/* Right: quote + body + image */}
          <div className="flex flex-col justify-between gap-10">

            <AnimatedQuote inView={sectionInView} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              className="space-y-5"
            >
              <p
                className="text-black/55 leading-relaxed"
                style={{
                  fontFamily: 'Satoshi, system-ui, sans-serif',
                  fontWeight: 400,
                  fontSize:   'clamp(1.05rem, 1.5vw, 1.3rem)',
                }}
              >
                Computer Science undergraduate, full stack developer, and entrepreneur. Co-Founder
                of Nascraft Digitals, where I have shipped 5+ projects for startups and local
                businesses. I work end-to-end: product design, development, testing, and deployment.
              </p>
              <p
                className="text-black/40 leading-relaxed"
                style={{
                  fontFamily: 'Satoshi, system-ui, sans-serif',
                  fontWeight: 400,
                  fontSize:   'clamp(1rem, 1.3vw, 1.15rem)',
                }}
              >
                Core stack: React, Python, Flutter, MySQL. Strong interest in AI-powered and
                multilingual platforms. I care about accessibility, collaboration, and building
                things that actually reach people.
              </p>

              <motion.div
                className="flex gap-4 pt-2"
                initial={{ opacity: 0 }}
                animate={sectionInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
              >
                <a
                  href="https://github.com/aaruhya06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.65rem] tracking-[0.18em] uppercase font-medium text-black/40 hover:text-black border-b border-black/20 hover:border-black pb-px transition-colors"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/aaruhya-kumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.65rem] tracking-[0.18em] uppercase font-medium text-black/40 hover:text-black border-b border-black/20 hover:border-black pb-px transition-colors"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                >
                  LinkedIn
                </a>
              </motion.div>
            </motion.div>

            {/* Headshot — GSAP clip reveal + mouse tilt */}
            <div
              ref={imageRef}
              className="relative aspect-4/3 w-full overflow-hidden bg-black/4"
              style={{ perspective: '800px' }}
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const inner = el.querySelector<HTMLDivElement>('.tilt-inner');
                if (!inner) return;
                const r = el.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width  - 0.5;
                const y = (e.clientY - r.top)  / r.height - 0.5;
                inner.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 10}deg) scale(1.03)`;
              }}
              onMouseLeave={(e) => {
                const inner = e.currentTarget.querySelector<HTMLDivElement>('.tilt-inner');
                if (inner) inner.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
              }}
            >
              <div
                className="tilt-inner relative w-full h-full"
                style={{ transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)', transformStyle: 'preserve-3d' }}
              >
                <Image
                  src="/aaruhya.jpg"
                  alt="Aaruhya Kumar N"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
