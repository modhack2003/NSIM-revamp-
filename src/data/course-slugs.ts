export const COURSE_SLUGS = ['ai-digital-marketing', 'business-accounting-finance', 'ai-prompt-engineering'] as const;
export type CourseSlug = (typeof COURSE_SLUGS)[number];
export const isCourseSlug = (v: unknown): v is CourseSlug =>
  typeof v === 'string' && (COURSE_SLUGS as readonly string[]).includes(v);
