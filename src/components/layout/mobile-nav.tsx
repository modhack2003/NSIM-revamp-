'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn, normalizePath } from '@/lib/utils';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';

interface LinkItem { href: string; label: string }

export function MobileNav({ nav, courseLinks }: { nav: LinkItem[]; courseLinks: LinkItem[] }) {
  const [open, setOpen] = React.useState(false);
  const pathname = normalizePath(usePathname() ?? '/');

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="grid size-11 place-items-center rounded-full border border-border bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none md:hidden"
        >
          <Menu aria-hidden className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent title="Site menu">
        <div className="pr-12">
          <Logo />
        </div>
        <nav aria-label="Mobile" className="flex flex-col gap-6">
          <ul className="flex flex-col gap-1">
            {nav.map((link) => {
              const active = pathname === normalizePath(link.href);
              return (
                <li key={link.href}>
                  <SheetClose asChild>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex min-h-11 items-center rounded-xl px-3 font-display text-2xl font-bold tracking-tight transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                        active && 'text-primary',
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
          <div>
            <p className="eyebrow mb-2 px-3 text-muted-foreground">Programs</p>
            <ul className="flex flex-col gap-1">
              {courseLinks.map((link) => (
                <li key={link.href}>
                  <SheetClose asChild>
                    <Link
                      href={link.href}
                      className="flex min-h-11 items-center rounded-xl px-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div className="mt-auto flex items-center gap-3">
          <SheetClose asChild>
            <Button asChild size="lg" className="flex-1">
              <Link href="/contact/">
                Enquire now <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
          </SheetClose>
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}
