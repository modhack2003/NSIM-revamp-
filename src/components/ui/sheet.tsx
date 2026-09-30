'use client';

import * as React from 'react';
import { Dialog as DialogPrimitive, VisuallyHidden } from 'radix-ui';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export function SheetContent({
  className,
  children,
  title,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & { title: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        data-slot="sheet-overlay"
        className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm"
      />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        aria-describedby={undefined}
        className={cn(
          'fixed inset-y-0 right-0 z-[61] flex w-[min(22rem,88vw)] flex-col gap-6 overflow-y-auto border-l border-border bg-background/95 p-6 shadow-2xl backdrop-blur-xl outline-none',
          className,
        )}
        {...props}
      >
        <VisuallyHidden.Root asChild>
          <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
        </VisuallyHidden.Root>
        {children}
        <DialogPrimitive.Close
          className="absolute top-4 right-4 grid size-11 place-items-center rounded-full hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          aria-label="Close menu"
        >
          <X aria-hidden className="size-5" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
