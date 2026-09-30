'use client';

import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

// The toast host renders nothing until a toast fires, so sonner is loaded after hydration
// to keep it out of every page's first-load bundle (design §11 budget).
const Sonner = dynamic(() => import('sonner').then((mod) => mod.Toaster), { ssr: false });

export function Toaster() {
  const { resolvedTheme } = useTheme();
  return (
    <Sonner
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      position="bottom-right"
      offset={88}
      richColors
      closeButton
      style={{ fontFamily: 'var(--font-sans)' }}
      toastOptions={{ style: { fontFamily: 'var(--font-sans)' } }}
    />
  );
}
