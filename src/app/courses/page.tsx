import { courses, toCardData } from '@/data/courses';
import { faqs } from '@/data/faqs';
import { pageMeta } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/layout/page-header';
import { Container } from '@/components/ui/container';
import { CourseCard } from '@/components/sections/course-card';
import { CourseComparison } from '@/components/sections/course-comparison';
import { CtaBand } from '@/components/sections/cta-band';
import { FaqSection } from '@/components/sections/faq-section';

export const metadata = buildMetadata({ ...pageMeta.courses, path: '/courses/' });

export default function CoursesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Programs"
        title="Programs built for the AI-first workplace"
        description="Three live, mentor-led programs, each designed around the tools, tasks and roles employers are hiring for today."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Programs', path: '/courses/' },
        ]}
      />
      <section aria-label="All programs" className="pb-8">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <li key={c.slug} className="md:max-lg:odd:last:col-span-2">
                <CourseCard course={toCardData(c)} variant="detailed" headingLevel="h2" />
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CourseComparison courses={courses} />
      <FaqSection items={faqs.filter((f) => f.tags?.includes('programs'))} heading="Questions about our programs" />
      <CtaBand />
    </>
  );
}
