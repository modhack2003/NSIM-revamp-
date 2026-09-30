import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { courses, getCourseBySlug, getRelatedCourses, syllabusNote, toCardData } from '@/data/courses';
import { breadcrumbJsonLd, buildMetadata, courseJsonLd } from '@/lib/seo';
import { formatFee } from '@/lib/utils';
import { JsonLd } from '@/components/layout/json-ld';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import {
  CourseAudience,
  CourseCareerRoles,
  CourseCertification,
  CourseOutcomes,
  CourseOverview,
  CourseProjects,
  CourseTools,
} from '@/components/sections/course-detail-sections';
import { CourseCard } from '@/components/sections/course-card';
import { CourseHero } from '@/components/sections/course-hero';
import { CtaBand } from '@/components/sections/cta-band';
import { CurriculumAccordion } from '@/components/sections/curriculum-accordion';
import { EnrolCard } from '@/components/sections/enrol-card';
import { FaqSection } from '@/components/sections/faq-section';
import { MobileEnrolBar } from '@/components/sections/mobile-enrol-bar';

export const dynamicParams = false;

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return buildMetadata({ ...course.seo, path: `/courses/${course.slug}/` });
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();
  const related = getRelatedCourses(course.slug);

  return (
    <>
      <CourseHero course={course} syllabusNote={syllabusNote} />
      {/* Single EnrolCard: after the overview on mobile, sticky sidebar spanning both rows on lg. No overflow on ancestors. */}
      <Container className="grid gap-16 pb-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="min-w-0 lg:col-span-8">
          <CourseOverview course={course} />
        </div>
        <div className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1">
          <EnrolCard course={course} />
        </div>
        <div className="flex min-w-0 flex-col gap-16 lg:col-span-8">
          <CourseOutcomes course={course} />
          <CourseTools course={course} />
          <CurriculumAccordion modules={course.curriculum} />
          <CourseProjects course={course} />
          <CourseAudience course={course} />
          <CourseCertification course={course} />
          <CourseCareerRoles course={course} />
        </div>
      </Container>
      <FaqSection items={course.faqs} heading={`${course.shortTitle}: your questions`} id="course-faq" />
      <section aria-labelledby="related-heading" className="py-16 md:py-24">
        <Container>
          <SectionHeading id="related-heading" eyebrow="Keep exploring" title="Related programs" />
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {related.map((c) => (
              <li key={c.slug}>
                <CourseCard course={toCardData(c)} variant="compact" />
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand />
      <MobileEnrolBar feeLabel={formatFee(course.fee)} href={`/contact/?course=${course.slug}`} />
      <JsonLd data={courseJsonLd(course)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Programs', path: '/courses/' },
          { name: course.title, path: `/courses/${course.slug}/` },
        ])}
      />
    </>
  );
}
