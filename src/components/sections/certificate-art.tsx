import type { CourseTheme } from '@/data/course-types';
import { courseThemeClasses } from '@/lib/course-theme';
import { cn } from '@/lib/utils';

/** Decorative certificate illustration; meaning is repeated in adjacent text. */
export function CertificateArt({ className, theme = 'violet' }: { className?: string; theme?: CourseTheme }) {
  const t = courseThemeClasses[theme];
  return (
    <div aria-hidden="true" className={cn('relative aspect-[4/3] w-full', className)}>
      <div className={cn('absolute inset-0 rounded-2xl bg-linear-135 p-px opacity-90', t.gradient)}>
        <div className="flex h-full w-full flex-col justify-between rounded-[15px] bg-background/90 p-5">
          <div className="flex flex-col gap-2">
            <span className={cn('h-1.5 w-16 rounded-full bg-linear-to-r', t.gradient)} />
            <span className="h-2.5 w-3/4 rounded-full bg-foreground/15" />
            <span className="h-2 w-1/2 rounded-full bg-foreground/10" />
          </div>
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1.5">
              <span className="h-1.5 w-20 rounded-full bg-foreground/10" />
              <span className="h-1.5 w-14 rounded-full bg-foreground/10" />
            </div>
            <svg viewBox="0 0 64 80" focusable="false" className={cn('h-16 w-14', t.text)}>
              <path d="M18 44 L12 78 L24 70 L32 80 L34 46Z" fill="currentColor" opacity="0.55" />
              <path d="M46 44 L52 78 L40 70 L32 80 L30 46Z" fill="currentColor" opacity="0.75" />
              <circle cx="32" cy="30" r="24" fill="currentColor" />
              <circle cx="32" cy="30" r="17" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M24 30 l6 6 l11 -12" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
