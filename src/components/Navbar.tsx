'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Work',        href: '#work'        },
  { label: 'About',       href: '#about'       },
  { label: 'Services',    href: '#services'    },
  { label: 'Experience',  href: '#experience'  },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact',     href: '#contact'     },
];

const SPRING = { type: 'spring' as const, stiffness: 260, damping: 30, mass: 0.8 };

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="px-3 py-1.5 rounded-full text-[0.6rem] font-medium tracking-widest uppercase text-white/55 hover:text-white hover:bg-white/8 transition-all duration-200 whitespace-nowrap"
      style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
    >
      {label}
    </a>
  );
}

function HireBtn() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
      className="group flex items-center bg-white rounded-full overflow-hidden hover:bg-white/80 transition-colors duration-200 shrink-0"
    >
      <span
        className="pl-4 pr-1.5 py-1.5 text-black text-[0.6rem] font-medium tracking-[0.14em] uppercase whitespace-nowrap"
        style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
      >
        Hire Me
      </span>
      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-black/10 group-hover:bg-black/15 transition-colors mr-0.5 shrink-0">
        <ArrowRight size={10} className="text-black" />
      </span>
    </button>
  );
}

const PILL_STYLE = {
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  backgroundColor: 'rgba(10,10,10,0.92)',
  border: '1px solid rgba(255,255,255,0.09)',
  boxShadow: '0 6px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)',
};

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      {/* ══ DESKTOP (md+) ════════════════════════════════════════════════════ */}
      <div
        data-theme="dark"
        className="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-center pointer-events-none"
      >
        <motion.div
          className="pointer-events-auto flex items-center gap-1 rounded-full mt-4"
          style={{
            ...PILL_STYLE,
            padding: '5px 8px 5px 16px',
          }}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Brand name */}
          <a
            href="#"
            aria-label="Aaruhya Kumar"
            className="shrink-0 mr-2"
          >
            <span
              style={{
                fontFamily: 'Satoshi, system-ui, sans-serif',
                fontWeight: 900,
                fontSize: '1rem',
                letterSpacing: '-0.03em',
                color: '#ffffff',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              Aaruhya
            </span>
          </a>

          {/* Divider */}
          <div className="h-4 w-px bg-white/12 shrink-0 mx-1" />

          {/* Nav links — inline in the flex row */}
          <div className="flex items-center">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.label} label={l.label} href={l.href} />
            ))}
          </div>

          {/* Divider */}
          <div className="h-4 w-px bg-white/12 shrink-0 mx-1" />

          {/* CTA */}
          <HireBtn />
        </motion.div>
      </div>

      {/* ══ MOBILE (< md) ════════════════════════════════════════════════════ */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden pointer-events-none">
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">

          {/* Logo pill */}
          <a href="#" className="flex items-center rounded-full px-4 py-2.5" style={PILL_STYLE}>
            <span
              style={{
                fontFamily: 'Satoshi, system-ui, sans-serif',
                fontWeight: 900,
                fontSize: '1rem',
                letterSpacing: '-0.03em',
                color: '#ffffff',
                lineHeight: 1,
              }}
            >
              Aaruhya
            </span>
          </a>

          {/* Hamburger pill */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center gap-2.5 rounded-full px-4 py-3"
            style={PILL_STYLE}
            aria-label="Menu"
          >
            <div className="flex flex-col gap-[5px] w-[15px]">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22 }}
                className="block h-px bg-white w-full origin-center"
              />
              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                transition={{ duration: 0.16 }}
                className="block h-px bg-white w-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22 }}
                className="block h-px bg-white w-full origin-center"
              />
            </div>
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              exit={{ clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-0 min-h-screen bg-black/95 backdrop-blur-2xl pt-24 px-6 pb-10 flex flex-col pointer-events-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors"
                aria-label="Close menu"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-between border-b border-white/8 py-5"
                >
                  <span
                    className="font-black tracking-[-0.04em] text-white"
                    style={{
                      fontFamily: 'Satoshi, system-ui, sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(2rem, 8vw, 2.8rem)',
                    }}
                  >
                    {link.label}
                  </span>
                  <ArrowRight size={18} className="text-white/20" />
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.3 }}
                className="mt-auto pt-8"
              >
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    window.dispatchEvent(new CustomEvent('open-contact-modal'));
                  }}
                  className="flex items-center justify-center gap-2 bg-white text-black rounded-full py-4 w-full"
                >
                  <span
                    className="text-[0.68rem] font-medium tracking-[0.18em] uppercase"
                    style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                  >
                    Hire Me
                  </span>
                  <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
                    <ArrowRight size={10} className="text-black" />
                  </span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
