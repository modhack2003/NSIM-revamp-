import * as React from 'react';
import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  id,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'center' | 'left';
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex max-w-3xl flex-col gap-4', align === 'center' ? 'mx-auto items-center text-center' : 'items-start', className)}>
      {eyebrow ? <p className="eyebrow text-primary">{eyebrow}</p> : null}
      <h2 id={id} className="text-[clamp(2rem,3vw+1rem,3.5rem)] leading-[1.05] font-extrabold tracking-[-0.02em]">
        {title}
      </h2>
      {description ? <p className="max-w-[65ch] text-lg text-muted-foreground">{description}</p> : null}
    </div>
  );
}
