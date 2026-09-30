import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { courses } from '@/data/courses';
import { liveSocials, selectLiveSocials, siteConfig } from '@/data/site';
import { buildMetadata, courseJsonLd, organizationJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/layout/json-ld';

describe('courseJsonLd', () => {
  const course = courses[0];

  it('has the expected shape', () => {
    const j = courseJsonLd(course);
    expect(j['@type']).toBe('Course');
    expect(j.name).toBe(course.title);
    expect(j.description).toBe(course.seo.description);
    expect(j.url).toBe(`${siteConfig.url}/courses/${course.slug}/`);
    expect(j.provider).toEqual({
      '@type': 'EducationalOrganization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      sameAs: siteConfig.url,
    });
    expect(j.inLanguage).toEqual(course.languageCodes);
    expect(j.hasCourseInstance.courseWorkload).toBe(course.durationISO);
  });

  it('omits offers and startDate while null, includes them when set', () => {
    const j = courseJsonLd(course);
    expect('offers' in j).toBe(false);
    expect('startDate' in j.hasCourseInstance).toBe(false);
    const set = courseJsonLd({ ...course, fee: { amount: 30000, note: '' }, nextBatch: '2026-01-10' });
    expect(set).toMatchObject({ offers: { price: 30000, priceCurrency: 'INR' } });
    expect(set.hasCourseInstance).toMatchObject({ startDate: '2026-01-10' });
  });
});

describe('organizationJsonLd', () => {
  it('omits placeholder phone/email and root-domain sameAs', () => {
    const j = organizationJsonLd();
    expect(j['@type']).toBe('EducationalOrganization');
    expect('telephone' in j).toBe(false);
    expect('email' in j).toBe(false);
    expect('sameAs' in j).toBe(false);
  });

  it('includes real values', () => {
    const cfg = { ...siteConfig, phoneHref: 'tel:+919876543210', email: 'hi@nsim.in' };
    const j = organizationJsonLd(cfg, [{ href: 'https://www.instagram.com/nsim' }]);
    expect(j).toMatchObject({ telephone: '+919876543210', email: 'hi@nsim.in', sameAs: ['https://www.instagram.com/nsim'] });
  });
});

describe('liveSocials', () => {
  it('is empty for placeholder config and keeps URLs with a path', () => {
    expect(liveSocials).toEqual([]);
    const live = selectLiveSocials({ ...siteConfig.socials, youtube: 'https://www.youtube.com/@nsim' });
    expect(live).toEqual([{ key: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@nsim' }]);
  });
});

describe('buildMetadata', () => {
  it('absolute title vs template title', () => {
    expect(buildMetadata({ title: 'Home', description: 'd', path: '/', absoluteTitle: true }).title).toEqual({ absolute: 'Home' });
    const m = buildMetadata({ title: 'Programs', description: 'd', path: '/courses/' });
    expect(m.title).toBe('Programs');
    expect(m.openGraph?.title).toBe('Programs | NSIM Education');
    expect(m.alternates?.canonical).toBe('/courses/');
  });

  it('throws without a trailing slash', () => {
    expect(() => buildMetadata({ title: 't', description: 'd', path: '/courses' })).toThrow('/courses');
  });
});

describe('JsonLd', () => {
  it('escapes <', () => {
    const html = renderToStaticMarkup(<JsonLd data={{ x: '</script><script>alert(1)</script>' }} />);
    expect(html).not.toContain('</script><script>');
    expect(html).toContain('\\u003c/script>');
  });
});
