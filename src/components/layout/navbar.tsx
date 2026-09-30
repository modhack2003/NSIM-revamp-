'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as m from 'motion/react-m';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { cn, normalizePath } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import { MobileNav } from './mobile-nav';
import { ThemeToggle } from './theme-toggle';

export interface NavCourseLink { href: string; label: string }

function isActive(pathname: string, href: string) {
  const p = normalizePath(pathname);
  const h = normalizePath(href);
  return p === h || (h !== '/' && p.startsWith(`${h}/`));
}

export function Navbar({ courseLinks }: { courseLinks: NavCourseLink[] }) {
  const pathname = usePathname() ?? '/';
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className={cn(
        'sticky top-0 z-50 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled && 'border-border bg-background/70 backdrop-blur-xl',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 md:h-18 md:px-8">
        <Link
          href="/"
          className="rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          <Logo />
          <span className="sr-only">, home</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="glass flex items-center gap-1 rounded-full p-1">
            {siteConfig.nav.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href} className="relative">
                  {active ? (
                    <m.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary/12 ring-1 ring-primary/25"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  ) : null}
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative block rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                      active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden md:grid" />
          <Button asChild size="md" className="hidden md:inline-flex">
            <Link href="/contact/">
              Enquire now <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Button>
          <MobileNav nav={siteConfig.nav} courseLinks={courseLinks} />
        </div>
      </div>
    </header>
  );
}
