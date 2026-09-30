import type { Mentor } from '@/data/about';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';

const GRADIENTS = [
  'from-primary to-accent-pink',
  'from-accent-cyan to-accent-emerald',
  'from-accent-amber to-primary',
  'from-accent-pink to-accent-amber',
] as const;

export function MentorsGrid({ mentors }: { mentors: Mentor[] }) {
  return (
    <section aria-labelledby="mentors-heading" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          id="mentors-heading"
          eyebrow="Mentors"
          title="Learn from people who do the work"
          description="Our mentors are practitioners first, with years of hands-on industry experience."
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mentors.map((m, i) => (
            <li key={m.id} className="glass flex flex-col items-start rounded-3xl p-6">
              <span
                aria-hidden="true"
                className={`grid size-16 place-items-center rounded-2xl bg-linear-135 ${GRADIENTS[i % GRADIENTS.length]} font-display text-xl font-extrabold text-white`}
              >
                {m.name
                  .split(/[\s.]+/)
                  .filter(Boolean)
                  .map((p) => p[0])
                  .join('')}
              </span>
              <h3 className="mt-5 text-xl font-bold">{m.name}</h3>
              <p className="text-sm font-medium text-primary">{m.role}</p>
              <p className="mt-3 text-sm text-muted-foreground">{m.expertise}</p>
              <p className="mt-auto pt-4 text-sm">
                <span className="font-display text-2xl font-extrabold">{m.years}+</span>{' '}
                <span className="text-muted-foreground">years in industry</span>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
