import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google';
import { courseLinks } from '@/data/courses';
import { siteConfig } from '@/data/site';
import { NOSCRIPT_CSS } from '@/lib/noscript-css';
import { organizationJsonLd } from '@/lib/seo';
import { FloatingEnquire } from '@/components/layout/floating-enquire';
import { Footer } from '@/components/layout/footer';
import { JsonLd } from '@/components/layout/json-ld';
import { Navbar } from '@/components/layout/navbar';
import { Providers } from '@/components/layout/providers';
import { SkipLink } from '@/components/layout/skip-link';
import { NoiseOverlay } from '@/components/sections/noise-overlay';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-bricolage',
});
const sans = Geist({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--font-geist' });
const mono = Geist_Mono({ subsets: ['latin'], weight: ['500'], display: 'swap', variable: '--font-geist-mono', preload: false });

// basePath is applied automatically to <Link>/asset URLs, but NOT to Metadata
// `icons` URLs, so prefix those explicitly for subpath deploys (e.g. GitHub Pages).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { template: '%s | NSIM Education', default: 'NSIM Education' },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: { icon: `${basePath}/icon.svg`, apple: `${basePath}/apple-touch-icon.png` },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafd' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0c17' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <noscript>
          <style>{NOSCRIPT_CSS}</style>
        </noscript>
      </head>
      <body>
        <Providers>
          <SkipLink />
          <Navbar courseLinks={courseLinks} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <FloatingEnquire />
          <Toaster />
          <NoiseOverlay />
          <JsonLd data={organizationJsonLd()} />
        </Providers>
      </body>
    </html>
  );
}
