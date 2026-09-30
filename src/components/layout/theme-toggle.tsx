'use client';

import { Monitor, Moon, SunMedium } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useMounted } from '@/lib/use-mounted';
import { cn } from '@/lib/utils';

const ORDER = ['light', 'dark', 'system'] as const;
type ThemeName = (typeof ORDER)[number];
const ICONS = { light: SunMedium, dark: Moon, system: Monitor } as const;

const btn =
  'grid size-11 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none';

export function ThemeToggle({ className }: { className?: string }) {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <button type="button" aria-label="Change theme" className={cn(btn, className)}>
        <Monitor aria-hidden className="size-5 opacity-60" />
      </button>
    );
  }

  const current: ThemeName = ORDER.includes(theme as ThemeName) ? (theme as ThemeName) : 'system';
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
  const CurrentIcon = ICONS[current];

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Theme: ${current}. Switch to ${next} theme`}
      title={`Theme: ${current}`}
      data-theme-state={current}
      className={cn(btn, className)}
    >
      <CurrentIcon aria-hidden className="size-5" />
    </button>
  );
}
