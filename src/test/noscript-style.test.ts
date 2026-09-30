import { describe, expect, it } from 'vitest';
import { NOSCRIPT_CSS } from '@/lib/noscript-css';

describe('NOSCRIPT_CSS', () => {
  const rules = NOSCRIPT_CSS.split('}')
    .map((r) => r.trim())
    .filter(Boolean)
    .map((r) => `${r}}`);

  it('has exactly 7 rules', () => {
    expect(rules).toHaveLength(7);
  });

  it('contains every rule from design §4.5', () => {
    expect(rules).toEqual([
      '[data-reveal]{opacity:1!important;transform:none!important}',
      '[data-carousel-viewport]{overflow-x:auto!important;scroll-snap-type:x mandatory}',
      '[data-carousel-viewport]>*>*{scroll-snap-align:start}',
      '[data-reveal-js-only]{display:none!important}',
      '.animate-marquee{animation:none!important;transform:none!important;width:auto!important;flex-wrap:wrap;justify-content:center}',
      '[data-marquee-track]{mask-image:none!important}',
      '[data-marquee-dup]{display:none!important}',
    ]);
  });

  it('marquee rule includes width:auto and the track rule drops the mask', () => {
    expect(rules.find((r) => r.startsWith('.animate-marquee'))).toContain('width:auto!important');
    expect(rules).toContain('[data-marquee-track]{mask-image:none!important}');
  });
});
