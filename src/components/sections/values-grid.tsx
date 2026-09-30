import type { IconKey } from '@/data/icon-keys';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';
import { Stagger, StaggerItem } from './reveal';

export function ValuesGrid({ values }: { values: { title: string; description: string; icon: IconKey }[] }) {
  return (
    <section aria-labelledby="values-heading" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          id="values-heading"
          eyebrow="Mission & values"
          title="What we stand for"
          description="Our mission is simple: help every learner walk into a job interview ready to do the work."
        />
        <Stagger as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <StaggerItem as="li" key={v.title} className="glass rounded-3xl p-6">
              <span className="grid size-11 place-items-center rounded-2xl bg-primary/12 text-primary">
                <Icon name={v.icon} className="size-5" />
              </span>
              <h3 className="mt-5 text-xl font-bold">{v.title}</h3>
              <p className="mt-2 text-muted-foreground">{v.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
