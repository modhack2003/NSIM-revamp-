import * as React from 'react';
import type { IconKey } from '@/data/icon-keys';
import { cn } from '@/lib/utils';
import { Icon } from './icon';

export function Chip({ icon, children, className }: { icon?: IconKey; children: React.ReactNode; className?: string }) {
  return (
    <span
      data-slot="chip"
      className={cn('glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap', className)}
    >
      {icon ? <Icon name={icon} className="size-4 text-primary" /> : null}
      {children}
    </span>
  );
}
