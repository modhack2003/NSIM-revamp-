'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';
import { LazyMotion, MotionConfig } from 'motion/react';

const loadFeatures = () => import('@/lib/motion-features').then((mod) => mod.default);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <LazyMotion features={loadFeatures} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
