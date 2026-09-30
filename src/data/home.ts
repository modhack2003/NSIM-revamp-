import type { IconKey } from './icon-keys';

export interface Cta { label: string; href: string }

export interface BentoFeature {
  id: 'live' | 'projects' | 'ai' | 'cert' | 'placement' | 'flexible';
  title: string;        // ≤ 50 chars
  description: string;  // ≤ 160 chars
  icon: IconKey;
}

export interface JourneyStep { step: 1 | 2 | 3 | 4; title: string; description: string; icon: IconKey }

export interface Stat {
  id: 'learners' | 'placement' | 'partners' | 'rating' | 'sessions';
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  srLabel: string;
}

export const hero: { eyebrow: string; rotatingWords: [string, string, string]; sub: string; primaryCta: Cta; secondaryCta: Cta } = {
  eyebrow: 'Live online batches · Enrolling now', // PLACEHOLDER P-10
  rotatingWords: ['AI Digital Marketing', 'Prompt Engineering', 'Accounting & GST'],
  sub: 'Live, mentor-led programs that turn curiosity into job-ready skills — with real projects, industry tools and placement support from day one.',
  primaryCta: { label: 'Explore programs', href: '/courses/' },
  secondaryCta: { label: 'Book a free counselling call', href: '/contact/' },
};

export const stats: Stat[] = [
  { id: 'learners', value: 5000, suffix: '+', label: 'Learners trained', srLabel: '5,000+ learners trained' }, // PLACEHOLDER P-01
  { id: 'placement', value: 100, suffix: '%', label: 'Placement assistance', srLabel: '100% placement assistance' }, // PLACEHOLDER P-11
  { id: 'partners', value: 50, suffix: '+', label: 'Hiring partners', srLabel: '50+ hiring partners' }, // PLACEHOLDER P-03
  { id: 'rating', value: 4.8, decimals: 1, suffix: '★', label: 'Average learner rating', srLabel: '4.8 out of 5 average learner rating' }, // PLACEHOLDER P-02
  { id: 'sessions', value: 1200, suffix: '+', label: 'Live sessions delivered', srLabel: '1,200+ live sessions delivered' }, // PLACEHOLDER P-04
];

/** Returns the stats in the requested order. Throws Error(`Unknown stat id: ${id}`) if one is missing (build-time, fatal). */
export function pickStats(ids: readonly Stat['id'][]): Stat[] {
  return ids.map((id) => {
    const s = stats.find((x) => x.id === id);
    if (!s) throw new Error(`Unknown stat id: ${id}`);
    return s;
  });
}

export const bentoFeatures: BentoFeature[] = [
  { id: 'live', title: 'Live, expert-led sessions', description: 'Learn in real time from practitioners who do this work every day — ask questions, get feedback, never feel stuck.', icon: 'video' }, // PLACEHOLDER P-13
  { id: 'projects', title: 'Real-world projects', description: 'Build campaigns, books and AI workflows modelled on real briefs, and leave with a portfolio employers can see.', icon: 'folder-kanban' }, // PLACEHOLDER P-13
  { id: 'ai', title: 'AI-first curriculum', description: 'Every program weaves in the AI tools modern teams already use, so you learn the job as it is done today.', icon: 'sparkles' }, // PLACEHOLDER P-13
  { id: 'cert', title: 'Industry certification', description: 'Earn an NSIM certificate on completion that shows exactly what you can do.', icon: 'award' }, // PLACEHOLDER P-13
  { id: 'placement', title: '100% placement assistance', description: 'Resume reviews, mock interviews and referrals from our hiring network — support until you land the role.', icon: 'briefcase' }, // PLACEHOLDER P-11
  { id: 'flexible', title: 'Flexible schedules + recordings', description: 'Weekday evening and weekend batches, with every class recorded so you can learn around work or college.', icon: 'calendar-clock' }, // PLACEHOLDER P-13
];

export const journeySteps: JourneyStep[] = [
  { step: 1, title: 'Counselling', description: 'A free call to understand your goals and match you with the right program.', icon: 'users' },
  { step: 2, title: 'Live learning', description: 'Small live batches with mentors, recordings and weekly hands-on practice.', icon: 'graduation-cap' },
  { step: 3, title: 'Projects & portfolio', description: 'Apply every module to real briefs and build a portfolio that speaks for you.', icon: 'folder-kanban' },
  { step: 4, title: 'Placement support', description: 'Resume, LinkedIn and interview prep, plus referrals to hiring partners.', icon: 'rocket' },
];

export const placementSupport: string[] = [
  'Resume and portfolio review',
  'Mock interviews with feedback',
  'Job referrals from our hiring network',
  'LinkedIn profile optimisation',
];

export const placementLabel = 'Included'; // PLACEHOLDER P-11

export const ctaBand: { heading: string; sub: string } = {
  heading: 'Your next career move starts with one conversation.',
  sub: 'Book a free counselling call. We will help you pick the right program, walk you through fees and batches, and answer every question.',
};
