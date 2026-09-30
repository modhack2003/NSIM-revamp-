'use client';

import * as React from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

/** Swap times (ms): word 2, word 3, back to word 1. Single pass, all motion ends by 4.6s. */
export const ROTATION_SCHEDULE = [1400, 2800, 4200] as const;

/**
 * One-pass vertical mask slide. All words are stacked in one grid cell; the current one
 * sits at translateY(0), earlier ones slide up out of the mask, later ones wait below.
 * Plain CSS transitions (0.4s, easeOutQuint) keep this out of the motion bundle.
 */
export function RotatingWords({
  words,
  className,
  ...rest
}: {
  words: readonly [string, string, string];
  className?: string;
  'aria-hidden'?: boolean;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (reduce) return;
    const timers = ROTATION_SCHEDULE.map((ms, i) => window.setTimeout(() => setIndex((i + 1) % words.length), ms));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [reduce, words.length]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), words[0]);

  return (
    <span aria-hidden={rest['aria-hidden']} data-current={words[index]} className={cn('relative grid w-fit max-w-full', className)}>
      {/* Width sizer reserves the longest word so swaps cause no layout shift. */}
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {longest}
      </span>
      <span className="col-start-1 row-start-1 grid overflow-hidden pb-[0.08em]">
        {words.map((w, i) => (
          <span
            key={w}
            data-word={w}
            className={cn(
              'text-gradient col-start-1 row-start-1 block transition-[transform,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
              // current: in view · previous: exits upward · others: wait below (invisible while repositioning)
              i === index
                ? 'translate-y-0 opacity-100'
                : i === (index - 1 + words.length) % words.length
                  ? '-translate-y-full opacity-0'
                  : 'translate-y-full opacity-0',
            )}
          >
            {w}
          </span>
        ))}
      </span>
    </span>
  );
}
