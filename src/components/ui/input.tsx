import * as React from 'react';
import { cn } from '@/lib/utils';

export const fieldClasses =
  'w-full rounded-xl border border-border bg-background/60 px-4 text-base text-foreground placeholder:text-muted-foreground transition-colors outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/30';

export function Input({ className, ...props }: React.ComponentProps<'input'>) {
  return <input data-slot="input" className={cn(fieldClasses, 'h-12', className)} {...props} />;
}
