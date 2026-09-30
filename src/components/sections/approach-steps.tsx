import type { ApproachStep } from '@/data/about';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';

export function ApproachSteps({ steps }: { steps: readonly ApproachStep[] }) {
  return (
    <section aria-labelledby="approach-heading" className="py-20 md:py-28">
      <Container>
        <SectionHeading id="approach-heading" eyebrow="How we teach" title="Learn live. Build. Get placed." />
        <ol className="mt-14 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="glass relative overflow-hidden rounded-3xl p-6 md:p-8">
              <span aria-hidden="true" className="absolute -top-4 right-4 font-display text-8xl font-extrabold text-foreground/5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="grid size-11 place-items-center rounded-2xl bg-primary/12 text-primary">
                <Icon name={s.icon} className="size-5" />
              </span>
              <h3 className="mt-5 text-xl font-bold">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p className="mt-2 text-muted-foreground">{s.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
