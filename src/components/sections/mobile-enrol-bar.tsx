'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { CourseSlug } from '@/data/course-slugs';
import { useMounted } from '@/lib/use-mounted';
import { cn } from '@/lib/utils';

export function MobileEnrolBar({ feeLabel, href }: { feeLabel: string; href: `/contact/?course=${CourseSlug}` }) {
  const mounted = useMounted();
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const target = document.getElementById('enrol');
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting));
    io.observe(target);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    document.body.dataset.bottomBar = 'true';
    return () => {
      delete document.body.dataset.bottomBar;
    };
  }, []);

  // The body padding stays reserved (no scroll jump); only the Enquire lift follows the bar.
  React.useEffect(() => {
    if (hidden) document.body.dataset.bottomBarHidden = 'true';
    else delete document.body.dataset.bottomBarHidden;
    return () => {
      delete document.body.dataset.bottomBarHidden;
    };
  }, [hidden]);

  if (!mounted) return null;

  return createPortal(
    <div
      inert={hidden}
      data-hidden={hidden || undefined}
      className={cn(
        'glass fixed inset-x-0 bottom-0 z-40 border-t bg-background/85 pb-[env(safe-area-inset-bottom)] transition-transform duration-300 lg:hidden',
        hidden && 'translate-y-full',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
        <div className="leading-tight">
          <span className="block text-xs text-muted-foreground">Program fee</span>
          <span className="font-display text-lg font-extrabold">{feeLabel}</span>
        </div>
        <Link
          href={href}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-linear-to-r from-primary to-primary-2 px-5 text-sm font-medium text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          Enrol now <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
    </div>,
    document.body,
  );
}
