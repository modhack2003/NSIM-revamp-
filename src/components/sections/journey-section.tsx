import type { JourneyStep } from '@/data/home';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from './reveal';

const lineX = { hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.7, ease: 'easeOut' } } } as const;
const lineY = { hidden: { scaleY: 0 }, visible: { scaleY: 1, transition: { duration: 0.7, ease: 'easeOut' } } } as const;

export function JourneySection({ steps }: { steps: JourneyStep[] }) {
  return (
    <section aria-labelledby="journey-heading" className="py-20 md:py-28 lg:py-32">
      <Container>
        <SectionHeading
          id="journey-heading"
          eyebrow="Your learning journey"
          title="From first call to first offer"
          description="A clear path with a mentor beside you at every step."
        />
        <div className="relative mt-16">
          <div aria-hidden="true" className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-0.5 bg-border lg:block">
            <Reveal
              variants={lineX}
              viewport={{ once: true }}
              className="h-full origin-left bg-linear-to-r from-primary via-accent-pink to-accent-amber"
            />
          </div>
          <div aria-hidden="true" className="absolute top-7 bottom-7 left-7 w-0.5 bg-border lg:hidden">
            <Reveal
              variants={lineY}
              viewport={{ once: true }}
              className="h-full origin-top bg-linear-to-b from-primary via-accent-pink to-accent-amber"
            />
          </div>
          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((s) => (
              <li key={s.step} className="flex gap-5 lg:flex-col lg:items-center lg:text-center">
                <span className="relative grid size-14 shrink-0 place-items-center rounded-2xl border border-border bg-background text-primary shadow-[0_10px_30px_-15px_var(--primary)]">
                  <Icon name={s.icon} className="size-6" />
                  <span className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {s.step}
                  </span>
                </span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-2 max-w-xs text-muted-foreground lg:mx-auto">{s.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
