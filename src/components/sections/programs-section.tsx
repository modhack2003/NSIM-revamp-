import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { CourseCardData } from '@/data/course-types';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { CourseCard } from './course-card';
import { Stagger, StaggerItem } from './reveal';

export function ProgramsSection({ items }: { items: CourseCardData[] }) {
  return (
    <section aria-labelledby="programs-heading" className="relative py-20 md:py-28 lg:py-32">
      <Container>
        <SectionHeading
          id="programs-heading"
          eyebrow="Programs"
          title="Three programs. One goal: your next role."
          description="Short, intensive and live. Each program is built around the tools and tasks employers are hiring for right now."
        />
        <Stagger as="ul" className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <StaggerItem as="li" key={c.slug}>
              <CourseCard course={c} />
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-10 flex justify-center">
          <Link
            href="/courses/"
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-semibold text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Compare all programs <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
