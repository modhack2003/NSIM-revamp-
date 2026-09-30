import type { Variants } from 'motion/react';

export const EASE = [0.22, 1, 0.36, 1] as const;
export const STAGGER = 0.08;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const staggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER } },
};

export const revealViewport = { once: true, margin: '-10% 0px' } as const;
