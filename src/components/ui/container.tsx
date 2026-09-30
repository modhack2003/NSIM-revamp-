import * as React from 'react';
import { cn } from '@/lib/utils';

export function Container({
  size = 'default',
  className,
  ...props
}: React.ComponentProps<'div'> & { size?: 'default' | 'narrow' }) {
  return (
    <div
      data-slot="container"
      className={cn('mx-auto w-full px-5 md:px-8', size === 'narrow' ? 'max-w-3xl' : 'max-w-7xl', className)}
      {...props}
    />
  );
}
