import type { CourseCardData } from '@/data/course-types';
import { courseThemeClasses } from '@/lib/course-theme';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/icon';

const LAYOUT = ['top-0 left-6 -rotate-6', 'top-36 right-0 rotate-3', 'top-72 left-0 -rotate-2'] as const;
const DELAYS = ['[animation-delay:0s]', '[animation-delay:0.15s]', '[animation-delay:0.3s]'] as const;

/** Decorative course preview stack (lg only). The same courses appear as real links in Programs. */
export function HeroPreviewStack({ items }: { items: CourseCardData[] }) {
  return (
    <div aria-hidden="true" className="relative hidden h-[30rem] w-full max-w-md lg:block">
      <p className="eyebrow absolute -top-8 right-4 text-muted-foreground">Course preview</p>
      {items.slice(0, 3).map((c, i) => {
        const t = courseThemeClasses[c.theme];
        return (
          <div key={c.slug} className={cn('absolute w-80', LAYOUT[i])}>
            <div className={cn('animate-bob-3', DELAYS[i])}>
              <div className="glass rounded-3xl p-5 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.45)]">
                <div className="flex items-center gap-3">
                  <span className={cn('grid size-11 place-items-center rounded-2xl bg-linear-135 text-white', t.gradient)}>
                    <Icon name={c.icon} className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-display font-bold">{c.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.duration} · Live online
                    </p>
                  </div>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-foreground/10">
                  <div className={cn('h-full rounded-full bg-linear-to-r', t.gradient)} style={{ width: `${55 + i * 15}%` }} />
                </div>
                <div className="mt-3 flex gap-1.5">
                  {c.highlights.slice(0, 2).map((h) => (
                    <span key={h} className="truncate rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] text-muted-foreground">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
