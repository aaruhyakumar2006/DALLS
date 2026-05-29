import type { Metadata } from 'next';
import { Instrument_Serif } from 'next/font/google';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

const BASE_URL = 'https://dalls.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'Aaruhya Kumar N — Full Stack Developer | DALLS',
    template: '%s | DALLS',
  },

  description:
    'Aaruhya Kumar N is a Full Stack Developer, Co-Founder of Nascraft Digitals, and COO of Megsyra Solutions. Building scalable web and mobile applications for startups and clients worldwide.',

  keywords: [
    'Full Stack Developer',
    'Aaruhya Kumar',
    'Nascraft Digitals',
    'React Developer',
    'Python Developer',
    'Flutter Developer',
    'Web Developer India',
    'Startup Founder',
    'UI/UX Developer',
    'Mobile App Developer',
    'Software Engineer for hire',
    'EdTech Developer',
    'AI Developer',
  ],

  authors: [{ name: 'Aaruhya Kumar N', url: BASE_URL }],
  creator: 'Aaruhya Kumar N',
  publisher: 'Aaruhya Kumar N',

  icons: {
    icon: [
      { url: '/logo/logo_white_horizontal.png', type: 'image/png' },
    ],
    apple: '/logo/logo_white_horizontal.png',
    shortcut: '/logo/logo_white_horizontal.png',
  },

  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'Aaruhya Kumar N',
    title: 'Aaruhya Kumar N — Full Stack Developer',
    description:
      'Full Stack Developer & Co-Founder of Nascraft Digitals. React · Python · Flutter · MySQL. Building for startups worldwide.',
    locale: 'en_US',
    images: [
      {
        url: '/dalls_og.png',
        width: 1200,
        height: 630,
        alt: 'Aaruhya Kumar N — Full Stack Developer | DALLS',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Aaruhya Kumar N — Full Stack Developer | DALLS',
    description:
      'Full Stack Developer & Co-Founder of Nascraft Digitals. React · Python · Flutter · MySQL.',
    images: ['/dalls_og.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
  },

  category: 'technology',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Aaruhya Kumar N',
  url: BASE_URL,
  image: `${BASE_URL}/dalls_og.png`,
  jobTitle: 'Full Stack Developer',
  description:
    'Full Stack Developer and entrepreneur building scalable web and mobile applications. Co-Founder of Nascraft Digitals, COO of Megsyra Solutions.',
  knowsAbout: [
    'React', 'Python', 'Flutter', 'HTML/CSS', 'JavaScript',
    'MySQL', 'Git', 'Android Studio', 'UI/UX', 'Machine Learning',
  ],
  sameAs: [
    'https://github.com/aaruhya06',
    'https://linkedin.com/in/aaruhya-kumar',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'nidigantiak@gmail.com',
    contactType: 'professional',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={instrumentSerif.variable} suppressHydrationWarning>
      <head>
        {/* Clash Display — premium high-contrast display font */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root { --font-clash: 'Clash Display', 'Satoshi', system-ui, sans-serif; }
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
