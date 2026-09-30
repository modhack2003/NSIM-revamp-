import type { CourseSlug } from './course-slugs';
import type { IconKey } from './icon-keys';
import type { ToolId } from './tools';
import type { FaqItem } from './faqs';

export type CourseTheme = 'violet' | 'emerald' | 'amber';
export type CourseCategory = 'Marketing' | 'Finance' | 'AI';
export type CourseLevel = 'Beginner' | 'Beginner to Intermediate';

export interface CurriculumModule {
  id: string;            // 'm1'..'m8', unique within the course
  title: string;         // ≤ 60 chars
  summary: string;       // 1 sentence, ≤ 160 chars
  duration: string;      // '2 weeks'  PLACEHOLDER P-45
  lessons: number;       // integer ≥ 1  PLACEHOLDER P-45
  topics: string[];      // 4–8 items
}

export interface Course {
  slug: CourseSlug;
  title: string;                 // H1 + card title, ≤ 40 chars
  shortTitle: string;            // footer/nav/select label, ≤ 24 chars
  category: CourseCategory;
  tagline: string;               // ≤ 90 chars
  summary: string;               // card text, ≤ 160 chars
  overview: string[];            // 2–3 paragraphs
  icon: IconKey;
  theme: CourseTheme;
  badge?: 'Bestseller' | 'New'; // PLACEHOLDER P-48
  duration: string;              // '4 months'  PLACEHOLDER P-44
  durationISO: `P${number}M`;    // 'P4M'; must match duration  PLACEHOLDER P-44
  mode: 'Live online';
  schedule: string;              // PLACEHOLDER P-43
  level: CourseLevel;
  language: string;              // display text  PLACEHOLDER P-46
  languageCodes: string[];       // BCP 47, e.g. ['en','hi','bn']; emitted as JSON-LD inLanguage  PLACEHOLDER P-46
  fee: { amount: number | null; note: string }; // amount null → rendered '₹XX,XXX'  PLACEHOLDER P-41
  nextBatch: string | null;      // ISO date 'YYYY-MM-DD' or null → 'Next batch: TBA'  PLACEHOLDER P-42
  certification: { title: string; description: string }; // PLACEHOLDER P-47
  highlights: string[];          // 3–4 (detailed card)
  outcomes: string[];            // 6–8
  tools: ToolId[];               // 4–8, unique
  curriculum: CurriculumModule[];// 5–8
  projects: string[];            // 3–4
  audience: { title: string; description: string }[]; // exactly 3
  includes: string[];            // EnrolCard list, 4–6 (e.g. 'Live sessions + recordings')
  careerRoles: string[];         // 4–6
  faqs: FaqItem[];               // 3–5; ids prefixed with slug
  seo: { title: string; description: string }; // title ≤ 42 (template adds ' | NSIM Education' → ≤ 60), description 70–160
}

export type CourseCardData = Pick<Course,
  'slug' | 'title' | 'summary' | 'icon' | 'theme' | 'badge' | 'duration' | 'level' | 'category' | 'highlights'>;
