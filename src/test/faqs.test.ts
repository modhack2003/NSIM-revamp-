import { describe, expect, it } from 'vitest';
import { faqs } from '@/data/faqs';

const count = (tag: 'home' | 'programs' | 'enquiry') => faqs.filter((f) => f.tags?.includes(tag)).length;

describe('faqs', () => {
  it('has 10 items with unique ids', () => {
    expect(faqs).toHaveLength(10);
    expect(new Set(faqs.map((f) => f.id)).size).toBe(10);
  });

  it('has the required tag counts', () => {
    expect(count('home')).toBe(7);
    expect(count('programs')).toBeGreaterThanOrEqual(3);
    expect(count('programs')).toBeLessThanOrEqual(5);
    expect(count('enquiry')).toBe(3);
  });

  it('keeps answers ≤ 500 chars', () => {
    for (const f of faqs) expect(f.answer.length).toBeLessThanOrEqual(500);
  });
});
