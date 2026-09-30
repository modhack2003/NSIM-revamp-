import { approach, mentors, story, values } from '@/data/about';
import { pickStats } from '@/data/home';
import { pageMeta, siteConfig } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/layout/page-header';
import { AboutStory } from '@/components/sections/about-story';
import { ApproachSteps } from '@/components/sections/approach-steps';
import { CtaBand } from '@/components/sections/cta-band';
import { MentorsGrid } from '@/components/sections/mentors-grid';
import { StatsSection } from '@/components/sections/stats-section';
import { ValuesGrid } from '@/components/sections/values-grid';

export const metadata = buildMetadata({ ...pageMeta.about, path: '/about/' });

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About NSIM"
        title="We teach the skills the market is hiring for."
        description="A Kolkata institute on a mission to close the gap between education and employment — one live, practical, AI-first program at a time."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about/' },
        ]}
      />
      <AboutStory story={story} foundedYear={siteConfig.foundedYear} />
      <ValuesGrid values={values} />
      <StatsSection items={pickStats(['learners', 'sessions', 'partners', 'rating'])} />
      <ApproachSteps steps={approach} />
      <MentorsGrid mentors={mentors} />
      <CtaBand />
    </>
  );
}
