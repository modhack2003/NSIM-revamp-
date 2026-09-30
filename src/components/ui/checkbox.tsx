import * as React from 'react';
import { cn } from '@/lib/utils';

export function Checkbox({ className, ...props }: Omit<React.ComponentProps<'input'>, 'type'>) {
  return (
    <input
      type="checkbox"
      data-slot="checkbox"
      className={cn(
        'mt-0.5 size-5 shrink-0 cursor-pointer rounded-md border border-border accent-primary outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
      {...props}
    />
  );
}
