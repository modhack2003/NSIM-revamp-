import { describe, expect, it } from 'vitest';
import { COURSE_SLUGS } from '@/data/course-slugs';
import { courseLinks, courses, getCourseBySlug, getRelatedCourses, toCardData } from '@/data/courses';
import { faqs } from '@/data/faqs';
import { testimonials } from '@/data/testimonials';

const between = (n: number, min: number, max: number) => n >= min && n <= max;

describe('courses data', () => {
  it('matches COURSE_SLUGS order and set exactly', () => {
    expect(courses.map((c) => c.slug)).toEqual([...COURSE_SLUGS]);
  });

  it.each(courses.map((c) => [c.slug, c] as const))('%s satisfies content invariants', (_slug, c) => {
    expect(c.title.length).toBeLessThanOrEqual(40);
    expect(c.shortTitle.length).toBeLessThanOrEqual(24);
    expect(c.tagline.length).toBeLessThanOrEqual(90);
    expect(c.summary.length).toBeLessThanOrEqual(160);
    expect(c.seo.title.length).toBeLessThanOrEqual(42);
    expect(between(c.seo.description.length, 70, 160)).toBe(true);
    expect(between(c.overview.length, 2, 3)).toBe(true);
    expect(between(c.highlights.length, 3, 4)).toBe(true);
    expect(between(c.outcomes.length, 6, 8)).toBe(true);
    expect(between(c.tools.length, 4, 8)).toBe(true);
    expect(new Set(c.tools).size).toBe(c.tools.length);
    expect(between(c.curriculum.length, 5, 8)).toBe(true);
    expect(between(c.projects.length, 3, 4)).toBe(true);
    expect(c.audience).toHaveLength(3);
    expect(between(c.includes.length, 4, 6)).toBe(true);
    expect(between(c.careerRoles.length, 4, 6)).toBe(true);
    expect(between(c.faqs.length, 3, 5)).toBe(true);
    for (const f of c.faqs) expect(f.id.startsWith(`${c.slug}-`)).toBe(true);

    // durationISO month count equals leading integer of duration
    expect(c.durationISO).toBe(`P${parseInt(c.duration, 10)}M`);
    // nextBatch null or YYYY-MM-DD
    if (c.nextBatch !== null) {
      expect(c.nextBatch).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(new Date(c.nextBatch).getTime())).toBe(false);
    }
    // fee.amount null or integer > 0
    if (c.fee.amount !== null) expect(Number.isInteger(c.fee.amount) && c.fee.amount > 0).toBe(true);
    // languageCodes
    expect(c.languageCodes.length).toBeGreaterThan(0);
    for (const code of c.languageCodes) expect(code).toMatch(/^[a-z]{2,3}(-[A-Z]{2})?$/);

    const moduleIds = c.curriculum.map((m) => m.id);
    expect(new Set(moduleIds).size).toBe(moduleIds.length);
    for (const m of c.curriculum) {
      expect(m.title.length).toBeLessThanOrEqual(60);
      expect(m.summary.length).toBeLessThanOrEqual(160);
      expect(Number.isInteger(m.lessons) && m.lessons >= 1).toBe(true);
      expect(between(m.topics.length, 4, 8)).toBe(true);
    }
  });

  it('has globally unique FAQ ids across courses and faqs.ts', () => {
    const ids = [...faqs.map((f) => f.id), ...courses.flatMap((c) => c.faqs.map((f) => f.id))];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('getCourseBySlug returns undefined for unknown slugs', () => {
    expect(getCourseBySlug('nope')).toBeUndefined();
    expect(getCourseBySlug('ai-digital-marketing')?.slug).toBe('ai-digital-marketing');
  });

  it('getRelatedCourses returns the other two', () => {
    for (const slug of COURSE_SLUGS) {
      const related = getRelatedCourses(slug);
      expect(related).toHaveLength(2);
      expect(related.map((c) => c.slug)).not.toContain(slug);
    }
  });

  it('toCardData strips to the card shape', () => {
    expect(Object.keys(toCardData(courses[0])).sort()).toEqual(
      ['badge', 'category', 'duration', 'highlights', 'icon', 'level', 'slug', 'summary', 'theme', 'title'].sort(),
    );
  });

  it('courseLinks come from shortTitle with trailing slashes', () => {
    expect(courseLinks).toEqual(courses.map((c) => ({ href: `/courses/${c.slug}/`, label: c.shortTitle })));
  });
});

describe('testimonials ↔ courses', () => {
  it('every courseSlug resolves and there are exactly 2 per slug', () => {
    expect(testimonials).toHaveLength(6);
    for (const t of testimonials) {
      expect(getCourseBySlug(t.courseSlug)).toBeDefined();
      expect(t.quote.length).toBeLessThanOrEqual(280);
    }
    for (const slug of COURSE_SLUGS) {
      expect(testimonials.filter((t) => t.courseSlug === slug)).toHaveLength(2);
    }
  });
});
