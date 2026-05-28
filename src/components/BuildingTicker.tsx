'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ITEMS = [
  'Gramify — Rural E-Commerce App',
  'DARZO AI — PDF → Video Lectures',
  'Skill Swap — Multilingual EdTech',
  'NutriIntern — Health Platform',
  'Nascraft Digitals — Client Projects',
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function BuildingTicker() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  // Delay mount so it doesn't flash during page load
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => {
      setIndex(i => (i + 1) % ITEMS.length);
    }, 3200);
    return () => clearInterval(id);
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="fixed bottom-8 left-6 z-40 hidden md:flex items-center gap-3 pointer-events-none select-none"
    >
      {/* Pulsing dot */}
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
      </span>

      {/* Label */}
      <span
        style={{ fontFamily: 'Satoshi, system-ui, sans-serif', fontSize: '0.52rem', letterSpacing: '0.22em' }}
        className="uppercase text-black/30 font-medium"
      >
        Building
      </span>

      {/* Divider */}
      <span className="w-px h-3 bg-black/15" />

      {/* Rotating item */}
      <div className="overflow-hidden" style={{ height: '1rem' }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.42, ease: EASE }}
            style={{ fontFamily: 'var(--font-instrument), Georgia, serif', fontStyle: 'italic', fontSize: '0.62rem', letterSpacing: '0.02em' }}
            className="block text-black/50 whitespace-nowrap"
          >
            {ITEMS[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
