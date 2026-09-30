'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { normalizePath } from '@/lib/utils';

interface LinkItem { href: string; label: string }

const loadDrawer = () => import('./mobile-nav-drawer');
const MobileNavDrawer = dynamic(loadDrawer, { ssr: false });

/**
 * Drawer trigger (below md). The Radix drawer itself is code-split and prefetched on
 * hover/focus/touch of the trigger. Every drawer link is wrapped in SheetClose, and `open`
 * changes only through `onOpenChange` or the trigger (no effect watches the pathname).
 */
export function MobileNav({ nav, courseLinks }: { nav: LinkItem[]; courseLinks: LinkItem[] }) {
  const [open, setOpen] = React.useState(false);
  const [requested, setRequested] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const pathname = normalizePath(usePathname() ?? '/');
  const prefetch = () => void loadDrawer();

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? 'mobile-nav-drawer' : undefined}
        onPointerEnter={prefetch}
        onFocus={prefetch}
        onTouchStart={prefetch}
        onClick={() => {
          setRequested(true);
          setOpen(true);
        }}
        className="grid size-11 place-items-center rounded-full border border-border bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none md:hidden"
      >
        <Menu aria-hidden className="size-5" />
      </button>
      {requested ? (
        <MobileNavDrawer
          open={open}
          onOpenChange={setOpen}
          nav={nav}
          courseLinks={courseLinks}
          activePath={pathname}
          triggerRef={triggerRef}
        />
      ) : null}
    </>
  );
}
