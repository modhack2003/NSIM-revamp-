import * as React from 'react';
import { Container } from '@/components/ui/container';
import { AuroraBackground } from '@/components/sections/aurora-background';
import { GridPattern } from '@/components/sections/grid-pattern';
import { Breadcrumbs, type Crumb } from './breadcrumbs';

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs: Crumb[];
}) {
  return (
    <section className="relative isolate pt-10 pb-16 md:pt-16 md:pb-24">
      <AuroraBackground blobs={3} fade className="max-lg:opacity-60" />
      <GridPattern />
      <Container className="flex flex-col gap-6">
        <Breadcrumbs items={breadcrumbs} />
        <p className="eyebrow text-primary">{eyebrow}</p>
        <h1 className="max-w-4xl text-[clamp(2.5rem,5vw+1rem,4.75rem)] leading-[0.98] font-extrabold tracking-[-0.03em]">
          {title}
        </h1>
        {description ? <p className="max-w-[65ch] text-lg text-foreground/85 md:text-xl">{description}</p> : null}
      </Container>
    </section>
  );
}
