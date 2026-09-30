import { describe, expect, it } from 'vitest';
import { approach, mentors, story, values } from '@/data/about';
import { bentoFeatures, journeySteps, pickStats, placementSupport, stats } from '@/data/home';
import { pageMeta } from '@/data/site';

describe('home.ts', () => {
  it('has the expected cardinalities', () => {
    expect(bentoFeatures.map((b) => b.id)).toEqual(['live', 'projects', 'ai', 'cert', 'placement', 'flexible']);
    for (const b of bentoFeatures) {
      expect(b.title.length).toBeLessThanOrEqual(50);
      expect(b.description.length).toBeLessThanOrEqual(160);
    }
    expect(journeySteps.map((s) => s.step)).toEqual([1, 2, 3, 4]);
    expect(placementSupport).toHaveLength(4);
    expect(stats).toHaveLength(5);
    expect(new Set(stats.map((s) => s.id)).size).toBe(5);
  });

  it('pickStats keeps order and throws on unknown ids', () => {
    expect(pickStats(['rating', 'learners']).map((s) => s.id)).toEqual(['rating', 'learners']);
    // @ts-expect-error unknown id on purpose
    expect(() => pickStats(['nope'])).toThrow('Unknown stat id: nope');
  });
});

describe('about.ts', () => {
  it('has the expected cardinalities', () => {
    expect(story.length).toBeGreaterThanOrEqual(2);
    expect(story.length).toBeLessThanOrEqual(3);
    expect(values).toHaveLength(4);
    expect(approach).toHaveLength(3);
    expect(mentors).toHaveLength(4);
  });
});

describe('pageMeta', () => {
  it('has the four pages with exact titles', () => {
    expect(Object.keys(pageMeta).sort()).toEqual(['about', 'contact', 'courses', 'home']);
    expect(pageMeta.home.title).toBe('NSIM Education — AI-Powered Career Skills, Kolkata');
    expect(pageMeta.courses.title).toBe('Programs');
    expect(pageMeta.about.title).toBe('About Us');
    expect(pageMeta.contact.title).toBe('Contact & Enquiries');
  });

  it('uses the given home description', () => {
    expect(pageMeta.home.description).toBe(
      'Live online programs in AI digital marketing, accounting & GST, and prompt engineering, with projects and placement assistance.',
    );
  });

  it('keeps descriptions 70–160 chars and templated titles ≤ 42', () => {
    for (const m of Object.values(pageMeta)) {
      expect(m.description.length).toBeGreaterThanOrEqual(70);
      expect(m.description.length).toBeLessThanOrEqual(160);
    }
    for (const key of ['courses', 'about', 'contact'] as const) {
      expect(pageMeta[key].title.length).toBeLessThanOrEqual(42);
    }
  });
});
