'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

/** Swap times (ms): word 2, word 3, back to word 1. Single pass, all motion ends by 4.6s. */
export const ROTATION_SCHEDULE = [1400, 2800, 4200] as const;

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
    <span aria-hidden={rest['aria-hidden']} className={cn('relative grid w-fit max-w-full', className)}>
      {/* Width sizer reserves the longest word so swaps cause no layout shift. */}
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {longest}
      </span>
      <span className="col-start-1 row-start-1 overflow-hidden pb-[0.08em]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={index}
            data-word={words[index]}
            className="text-gradient block"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
