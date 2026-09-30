'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';

export interface MobileNavLink { href: string; label: string }

/**
 * Drawer body for MobileNav. Loaded on demand so Radix Dialog stays out of the first-load bundle.
 * `open` is controlled by MobileNav and changes only through `onOpenChange` (no pathname effect).
 */
export default function MobileNavDrawer({
  open,
  onOpenChange,
  nav,
  courseLinks,
  activePath,
  triggerRef,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nav: MobileNavLink[];
  courseLinks: MobileNavLink[];
  activePath: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        id="mobile-nav-drawer"
        title="Site menu"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          triggerRef.current?.focus();
        }}
      >
        <div className="pr-12">
          <Logo />
        </div>
        <nav aria-label="Mobile" className="flex flex-col gap-6">
          <ul className="flex flex-col gap-1">
            {nav.map((link) => {
              const active = activePath === link.href.replace(/\/+$/, '');
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
