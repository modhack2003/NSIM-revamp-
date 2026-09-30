import type { IconKey } from './icon-keys';

export interface ApproachStep { title: string; description: string; icon: IconKey }
export interface Mentor { id: string; name: string; role: string; expertise: string; years: number }

export const story: string[] = [
  'NSIM Education started in Kolkata with a simple observation: talented people were graduating without the practical skills employers were hiring for. Degrees taught theory; jobs demanded tools, projects and confidence.',
  'So we built programs the other way around. We start from the roles companies are filling today, work backwards to the skills they need, and teach those skills live — with mentors who practise what they teach and projects that look like real work.',
  'As AI reshapes marketing, finance and nearly every other function, we have rebuilt each program to be AI-first, so our learners are ready for the workplace that is arriving, not the one that is fading.',
];

export const values: { title: string; description: string; icon: IconKey }[] = [
  { title: 'Practical first', description: 'Every concept is tied to a task you will actually do at work, practised until it feels natural.', icon: 'target' },
  { title: 'AI-native', description: 'We teach AI as a daily working tool, alongside the judgement to use it well and responsibly.', icon: 'sparkles' },
  { title: 'Mentor-led', description: 'Small live batches with practitioners who give honest feedback and real-world context.', icon: 'users' },
  { title: 'Outcome-obsessed', description: 'We measure success by the roles our learners land and the confidence they walk in with.', icon: 'rocket' },
];

export const approach: ApproachStep[] = [
  { title: 'Learn live', description: 'Interactive sessions with mentors, recordings for revision and a batch of peers to learn alongside.', icon: 'video' },
  { title: 'Build', description: 'Apply each module to real-world briefs and assemble a portfolio that shows what you can do.', icon: 'folder-kanban' },
  { title: 'Get placed', description: 'Resume, LinkedIn and interview preparation, plus referrals to our network of hiring partners.', icon: 'briefcase' },
];

export const mentors: Mentor[] = [
  { id: 'mentor-1', name: 'R. Sen', role: 'Lead Mentor, Digital Marketing', expertise: 'Performance marketing & analytics', years: 8 }, // PLACEHOLDER P-51
  { id: 'mentor-2', name: 'A. Gupta', role: 'Lead Mentor, Accounting & Finance', expertise: 'Tally, GST & compliance', years: 10 }, // PLACEHOLDER P-52
  { id: 'mentor-3', name: 'S. Das', role: 'Lead Mentor, Prompt Engineering', expertise: 'Generative AI & automation', years: 6 }, // PLACEHOLDER P-53
  { id: 'mentor-4', name: 'M. Roy', role: 'Head of Career Services', expertise: 'Recruitment & career coaching', years: 12 }, // PLACEHOLDER P-54
];
