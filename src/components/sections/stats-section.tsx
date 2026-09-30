import type { Stat } from '@/data/home';
import { Container } from '@/components/ui/container';
import { AnimatedCounter } from './animated-counter';

export function StatsSection({ items, heading = 'NSIM in numbers' }: { items: Stat[]; heading?: string }) {
  return (
    <section aria-labelledby="stats-heading" className="py-16 md:py-20">
      <Container>
        <h2 id="stats-heading" className="sr-only">
          {heading}
        </h2>
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((s) => (
            <li key={s.id} className="glass relative overflow-hidden rounded-3xl p-6 text-center md:p-8">
              <div
                aria-hidden="true"
                className="absolute -top-10 left-1/2 size-24 -translate-x-1/2 rounded-full bg-primary/20 blur-2xl"
              />
              <AnimatedCounter
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                decimals={s.decimals}
                srLabel={s.srLabel}
                className="font-display text-4xl font-extrabold tracking-tight md:text-5xl"
              />
              <p aria-hidden="true" className="mt-2 text-sm text-muted-foreground">
                {s.label}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
