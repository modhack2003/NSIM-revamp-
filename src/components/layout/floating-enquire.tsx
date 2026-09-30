'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { FileText, MessageCircle, Phone, X } from 'lucide-react';
import { siteConfig, whatsappHref } from '@/data/site';
import { normalizePath } from '@/lib/utils';

const itemClass =
  'flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none';

export function FloatingEnquire() {
  const pathname = normalizePath(usePathname() ?? '/');
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const firstLinkRef = React.useRef<HTMLAnchorElement>(null);
  const panelId = React.useId();

  React.useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  if (pathname === '/contact') return null;

  return (
    <div ref={rootRef} className="floating-enquire fixed right-5 bottom-5 z-40 flex flex-col items-end gap-3 transition-transform duration-300">
      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="glass w-64 origin-bottom-right rounded-2xl bg-background/90 p-2 shadow-2xl"
          >
            <p className="px-3 pt-2 pb-1 text-xs text-muted-foreground">How would you like to reach us?</p>
            <ul>
              <li>
                <a ref={firstLinkRef} href={whatsappHref} target="_blank" rel="noopener noreferrer" className={itemClass}>
                  <MessageCircle aria-hidden className="size-4 text-success" /> Chat on WhatsApp
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </li>
              <li>
                <a href={siteConfig.phoneHref} className={itemClass}>
                  <Phone aria-hidden className="size-4 text-primary" /> Call {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <Link href="/contact/" className={itemClass} onClick={() => setOpen(false)}>
                  <FileText aria-hidden className="size-4 text-accent-cyan" /> Send an enquiry
                </Link>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-14 min-w-14 items-center justify-center gap-2 rounded-full bg-linear-to-r from-primary to-primary-2 px-4 font-medium text-primary-foreground shadow-[0_16px_40px_-12px_var(--primary)] transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none md:px-5"
      >
        {open ? <X aria-hidden className="size-5" /> : <MessageCircle aria-hidden className="size-5" />}
        <span className="sr-only md:not-sr-only">Enquire</span>
      </button>
    </div>
  );
}
