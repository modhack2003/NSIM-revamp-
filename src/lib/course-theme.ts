import type { CourseTheme } from '@/data/course-types';

/** Static, complete class strings only — Tailwind v4 emits classes it finds literally in source. */
export const courseThemeClasses: Record<CourseTheme, { gradient: string; ring: string; glow: string; text: string }> = {
  violet: {
    gradient: 'from-primary to-accent-pink',
    ring: 'ring-primary/40',
    glow: 'bg-primary/25',
    text: 'text-primary',
  },
  emerald: {
    gradient: 'from-accent-cyan to-accent-emerald',
    ring: 'ring-accent-emerald/40',
    glow: 'bg-accent-emerald/25',
    text: 'text-accent-emerald',
  },
  amber: {
    gradient: 'from-accent-amber to-primary',
    ring: 'ring-accent-amber/40',
    glow: 'bg-accent-amber/25',
    text: 'text-accent-amber',
  },
};
