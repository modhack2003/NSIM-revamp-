import { cn } from '@/lib/utils';

/** Decorative monogram. The accessible name comes from the adjacent wordmark text. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-8 shrink-0 place-items-center rounded-[9px] bg-linear-135 from-primary via-accent-pink to-accent-amber shadow-[0_6px_18px_-8px_var(--primary)]',
        className,
      )}
    >
      <svg viewBox="0 0 32 32" focusable="false" className="size-full">
        <path d="M10 22V10h2.4l7.2 8.2V10H22v12h-2.4l-7.2-8.2V22z" fill="#fff" />
      </svg>
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="font-display text-lg leading-none font-extrabold tracking-tight">
        NSIM<span className="font-semibold text-foreground/85 dark:text-muted-foreground"> Education</span>
      </span>
    </span>
  );
}
