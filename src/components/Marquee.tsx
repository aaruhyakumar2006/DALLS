'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

const CLIENTS = [
  { name: 'RecoverDerm', logo: '/logo/ReCoverDerm Logo Varient (White).png' },
  { name: 'Autoboy', logo: '/logo/autoboy.png' },
  { name: 'NextGen', logo: '/logo/NEXTGEN PL (Landscape) WHITE.png' },
  { name: 'Axflo', logo: '/logo/AXFLOOILLOGOWHITE.png' },
  { name: 'Rokeyla', logo: '/logo/RokeylaSecondaryLogoWhite.png' },
  { name: 'DALLS', logo: '/logo/logo_white_horizontal.png' },
  { name: 'TQL', logo: '/logo/TQL LOGO 2-01.png' },
];

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2;
    gsap.to(track, {
      x: -totalWidth,
      duration: 22,
      ease: 'none',
      repeat: -1,
    });
    return () => gsap.killTweensOf(track);
  }, []);

  const items = [...CLIENTS, ...CLIENTS];

  return (
    <div data-theme="dark" className="w-full bg-[#0A0A0A] border-t border-white/6 py-8 overflow-hidden">
      <div ref={trackRef} className="flex items-center gap-16 w-max">
        {items.map((client, i) => (
          <div key={`${client.name}-${i}`} className="flex items-center gap-16 shrink-0">
            <div className="relative h-14 w-56 opacity-25 hover:opacity-60 transition-opacity duration-300">
              <Image
                src={client.logo}
                alt={client.name}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-white/10 text-xs">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
