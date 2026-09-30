import Link from 'next/link';
import { ExternalLink, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { courseLinks } from '@/data/courses';
import { emailHref, liveSocials, siteConfig, whatsappHref } from '@/data/site';
import { Container } from '@/components/ui/container';
import { Logo } from './logo';

const linkClass =
  'rounded text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative isolate mt-12 overflow-clip border-t border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex translate-y-[18%] justify-center font-display text-[28vw] leading-none font-extrabold tracking-tighter text-foreground/[0.035] select-none"
      >
        NSIM
      </div>
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_2fr_1.2fr] lg:py-20">
        <div className="flex flex-col gap-5">
          <Link href="/" className="w-fit rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
            <Logo />
            <span className="sr-only">, home</span>
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            Live, mentor-led programs in AI-powered marketing, accounting and prompt engineering — taught from Kolkata to learners everywhere.
          </p>
          {liveSocials.length > 0 ? (
            <div>
              <h2 className="eyebrow mb-3 text-foreground">Follow us</h2>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {liveSocials.map((s) => (
                  <li key={s.key}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-1`}>
                      {s.label}
                      <ExternalLink aria-hidden className="size-3.5" />
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="eyebrow mb-4 text-foreground">Programs</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {courseLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/courses/" className={linkClass}>
                  Compare programs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-4 text-foreground">Company</h2>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/about/" className={linkClass}>
                  About us
                </Link>
              </li>
              <li>
                <Link href="/contact/" className={linkClass}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div>
          <h2 className="eyebrow mb-4 text-foreground">Get in touch</h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a href={siteConfig.phoneHref} className={`${linkClass} inline-flex items-center gap-2`}>
                <Phone aria-hidden className="size-4" /> {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                <MessageCircle aria-hidden className="size-4" /> WhatsApp us
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </li>
            <li>
              <a href={emailHref} className={`${linkClass} inline-flex items-center gap-2`}>
                <Mail aria-hidden className="size-4" /> {siteConfig.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-muted-foreground">
              <MapPin aria-hidden className="size-4" /> {siteConfig.address.locality}, {siteConfig.address.region}
            </li>
          </ul>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        <p>Made in Kolkata</p>
      </Container>
    </footer>
  );
}
