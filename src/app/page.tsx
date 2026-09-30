import { courses, getCourseBySlug, toCardData } from '@/data/courses';
import { faqs } from '@/data/faqs';
import { bentoFeatures, journeySteps, pickStats, placementSupport } from '@/data/home';
import { pageMeta } from '@/data/site';
import { testimonials, type TestimonialCard } from '@/data/testimonials';
import { tools } from '@/data/tools';
import { buildMetadata, faqJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/layout/json-ld';
import { BentoFeatures } from '@/components/sections/bento-features';
import { CareerOutcomesSection } from '@/components/sections/career-outcomes-section';
import { CtaBand } from '@/components/sections/cta-band';
import { FaqSection } from '@/components/sections/faq-section';
import { HeroSection } from '@/components/sections/hero-section';
import { JourneySection } from '@/components/sections/journey-section';
import { ProgramsSection } from '@/components/sections/programs-section';
import { StatsSection } from '@/components/sections/stats-section';
import { TestimonialsCarousel } from '@/components/sections/testimonials-carousel';
import { ToolsMarquee } from '@/components/sections/tools-marquee';

export const metadata = buildMetadata({ ...pageMeta.home, path: '/', absoluteTitle: true });

function uniqueRoles(): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const c of courses) {
    for (const r of c.careerRoles) {
      const k = r.toLowerCase();
      if (!seen.has(k)) {
        seen.add(k);
        out.push(r);
      }
    }
  }
  return out;
}

export default function HomePage() {
  const homeFaqs = faqs.filter((f) => f.tags?.includes('home'));
  const items: TestimonialCard[] = testimonials.map(({ courseSlug, ...t }) => ({
    ...t,
    program: getCourseBySlug(courseSlug)!.shortTitle,
  }));
  return (
    <>
      <HeroSection />
      <ToolsMarquee tools={tools.filter((t) => t.marqueeRow)} />
      <StatsSection items={pickStats(['learners', 'placement', 'partners', 'rating'])} />
      <BentoFeatures items={bentoFeatures} />
      <ProgramsSection items={courses.map(toCardData)} />
      <JourneySection steps={journeySteps} />
      <CareerOutcomesSection roles={uniqueRoles()} support={placementSupport} />
      <TestimonialsCarousel items={items} />
      <FaqSection items={homeFaqs} />
      <CtaBand />
      <JsonLd data={faqJsonLd(homeFaqs)} />
    </>
  );
}
