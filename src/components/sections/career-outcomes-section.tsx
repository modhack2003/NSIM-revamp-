import { CheckCircle2 } from 'lucide-react';
import { Chip } from '@/components/ui/chip';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Icon } from '@/components/ui/icon';
import { Reveal } from './reveal';

export function CareerOutcomesSection({ roles, support }: { roles: string[]; support: string[] }) {
  return (
    <section aria-labelledby="careers-heading" className="relative isolate py-20 md:py-28 lg:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="careers-heading"
            align="left"
            eyebrow="Career outcomes"
            title="Skills that open real doors"
            description="Our career team works with you from the first module, so you are interview-ready by the time you finish."
          />
          <ul className="mt-8 flex flex-col gap-4">
            {support.map((s) => (
              <li key={s} className="flex items-center gap-3 font-medium">
                <CheckCircle2 aria-hidden className="size-5 shrink-0 text-success" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <Reveal className="glass relative overflow-hidden rounded-3xl p-6 md:p-8">
          <div aria-hidden="true" className="absolute -top-20 -right-20 size-56 rounded-full bg-accent-cyan/25 blur-3xl" />
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-primary/12 text-primary">
              <Icon name="briefcase" className="size-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold">Roles our learners prepare for</h3>
              <p className="text-sm text-muted-foreground">Across all three programs</p>
            </div>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {roles.map((r) => (
              <li key={r}>
                <Chip>{r}</Chip>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl border border-border bg-background/60 p-4 text-sm">
            <p className="font-semibold">Placement support</p>
            <p className="mt-1 text-muted-foreground">
              Resume reviews, mock interviews and referrals — assistance that continues after your final class.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
