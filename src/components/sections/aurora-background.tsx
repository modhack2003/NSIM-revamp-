import type { CourseTheme } from '@/data/course-types';
import { cn } from '@/lib/utils';

const BLOB_SETS: Record<CourseTheme | 'default', [string, string, string, string]> = {
  default: ['bg-primary', 'bg-accent-cyan', 'bg-accent-pink', 'bg-accent-amber'],
  violet: ['bg-primary', 'bg-accent-pink', 'bg-primary-2', 'bg-accent-cyan'],
  emerald: ['bg-accent-cyan', 'bg-accent-emerald', 'bg-primary', 'bg-accent-cyan'],
  amber: ['bg-accent-amber', 'bg-primary', 'bg-accent-pink', 'bg-accent-amber'],
};

const POSITIONS = [
  'top-[-12%] left-[-8%] size-[42rem] [animation-duration:18s]',
  'top-[-6%] right-[-10%] size-[36rem] [animation-duration:22s]',
  'bottom-[-20%] left-[25%] size-[34rem] [animation-duration:26s]',
  'bottom-[-10%] right-[5%] size-[22rem] [animation-duration:22s] [animation-delay:-6s]',
] as const;

/**
 * Decorative drifting aurora. Every host section MUST be `relative isolate`
 * so the `-z-10` layer stays inside it and the root's `overflow-hidden`
 * contains the blobs (design §4.4, round-3 #7).
 */
export function AuroraBackground({
  theme,
  blobs = 4,
  className,
}: {
  theme?: CourseTheme;
  blobs?: 3 | 4;
  className?: string;
}) {
  const colours = BLOB_SETS[theme ?? 'default'];
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      {POSITIONS.slice(0, blobs).map((pos, i) => (
        <div
          key={pos}
          className={cn(
            'animate-aurora absolute rounded-full opacity-(--aurora-opacity) blur-[80px] will-change-transform',
            pos,
            colours[i],
          )}
        />
      ))}
    </div>
  );
}
