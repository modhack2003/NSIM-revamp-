'use client';

import * as React from 'react';
import { motion, type Variants } from 'motion/react';
import { revealVariants, revealViewport, staggerVariants } from '@/lib/motion';
import { useHasIO } from '@/lib/use-mounted';

type Tag = 'div' | 'li' | 'ol' | 'ul' | 'section' | 'span' | 'article';

interface RevealProps {
  as?: Tag;
  className?: string;
  children?: React.ReactNode;
  variants?: Variants;
  delay?: number;
  viewport?: { once?: boolean; margin?: string };
  id?: string;
}

function useTriggerProps(viewport: RevealProps['viewport']) {
  const hasIO = useHasIO();
  return hasIO
    ? ({ initial: 'hidden', whileInView: 'visible', viewport: viewport ?? revealViewport } as const)
    : ({ initial: 'hidden', animate: 'visible' } as const);
}

/** Fade + rise on first view. Adds `data-reveal` so the noscript sheet can force it visible. */
export function Reveal({ as = 'div', className, children, variants = revealVariants, delay, viewport, id }: RevealProps) {
  const trigger = useTriggerProps(viewport);
  const Cmp = motion[as];
  return (
    <Cmp
      data-reveal=""
      id={id}
      className={className}
      variants={variants}
      transition={delay ? { delay } : undefined}
      {...trigger}
    >
      {children}
    </Cmp>
  );
}

export function Stagger({ as = 'div', className, children, viewport, id }: Omit<RevealProps, 'variants' | 'delay'>) {
  const trigger = useTriggerProps(viewport);
  const Cmp = motion[as];
  return (
    <Cmp id={id} className={className} variants={staggerVariants} {...trigger}>
      {children}
    </Cmp>
  );
}

export function StaggerItem({ as = 'div', className, children, variants = revealVariants, id }: Omit<RevealProps, 'viewport' | 'delay'>) {
  const Cmp = motion[as];
  return (
    <Cmp data-reveal="" id={id} className={className} variants={variants}>
      {children}
    </Cmp>
  );
}
