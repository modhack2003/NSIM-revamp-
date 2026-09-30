'use client';

import * as React from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { cn, formatCounter } from '@/lib/utils';

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  srLabel,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  srLabel: string;
  className?: string;
}) {
  const numRef = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(numRef, { once: true, margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const final = formatCounter(value, decimals, prefix, suffix);

  React.useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (numRef.current) numRef.current.textContent = formatCounter(v, decimals, prefix, suffix);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, decimals, prefix, suffix]);

  return (
    <span className={cn('inline-block', className)}>
      <span ref={numRef} aria-hidden="true" className="inline-block min-w-[4ch] tabular-nums" data-counter>
        {final}
      </span>
      <span className="sr-only">{srLabel}</span>
    </span>
  );
}
