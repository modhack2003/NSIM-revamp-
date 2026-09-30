'use client';

import * as React from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { Star } from 'lucide-react';
import { cn, formatCounter } from '@/lib/utils';

const DURATION_MS = 1600;
const easeOut = (t: number) => 1 - (1 - t) * (1 - t);

/**
 * Tweens 0 → value (1.6s easeOut) and writes each frame straight to the DOM ref —
 * no React state, so no re-render per frame and no setState in the effect.
 * A tiny rAF loop instead of motion's `animate()` keeps the full animation engine
 * out of the first-load bundle (design §11 budget).
 */
function tween(from: number, to: number, onUpdate: (v: number) => void) {
  let raf = 0;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / DURATION_MS);
    onUpdate(from + (to - from) * easeOut(t));
    if (t < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return { stop: () => cancelAnimationFrame(raf) };
}

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
  // '★' is drawn as an icon: many system font stacks lack the glyph and would show tofu.
  const starSuffix = suffix === '★';
  const textSuffix = starSuffix ? '' : suffix;
  const final = formatCounter(value, decimals, prefix, textSuffix);

  React.useEffect(() => {
    if (!inView || reduce) return;
    const controls = tween(0, value, (v) => {
      if (numRef.current) numRef.current.textContent = formatCounter(v, decimals, prefix, textSuffix);
    });
    return () => controls.stop();
  }, [inView, reduce, value, decimals, prefix, textSuffix]);

  return (
    <span className={cn('inline-flex items-baseline justify-center whitespace-nowrap', className)}>
      <span ref={numRef} aria-hidden="true" className="inline-block tabular-nums" data-counter>
        {final}
      </span>
      {starSuffix ? <Star aria-hidden className="ml-1 size-[0.7em] shrink-0 self-center fill-accent-amber text-accent-amber" /> : null}
      <span className="sr-only">{srLabel}</span>
    </span>
  );
}
