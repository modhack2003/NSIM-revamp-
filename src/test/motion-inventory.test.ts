import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const css = fs.readFileSync(path.resolve(__dirname, '../app/globals.css'), 'utf8');
const norm = (s: string) => s.replace(/\s+/g, '');

const INVENTORY = ['animate-aurora', 'animate-marquee', 'animate-pulse-3', 'animate-bob-3', 'animate-border-sweep'];

function reducedMotionBlock(): string {
  const start = css.indexOf('@media (prefers-reduced-motion: reduce)');
  expect(start).toBeGreaterThan(-1);
  let depth = 0;
  for (let i = css.indexOf('{', start); i < css.length; i++) {
    if (css[i] === '{') depth++;
    if (css[i] === '}' && --depth === 0) return css.slice(start, i + 1);
  }
  throw new Error('unterminated reduced-motion block');
}

const reduced = reducedMotionBlock();
const outside = css.replace(reduced, '');

function animatedClasses(): Map<string, string> {
  const out = new Map<string, string>();
  for (const [, selector, body] of outside.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const anim = body.match(/(?:^|;|\s)animation:\s*([^;]+)/);
    if (!anim || anim[1].trim() === 'none') continue;
    for (const [, cls] of selector.matchAll(/\.(animate-[\w-]+)/g)) out.set(cls, anim[1].trim());
  }
  return out;
}

describe('motion inventory', () => {
  const classes = animatedClasses();

  it('animated .animate-* classes equal the 5 inventory classes', () => {
    expect([...classes.keys()].sort()).toEqual([...INVENTORY].sort());
  });

  it('every inventory class is in the reduced-motion selector list', () => {
    const n = norm(reduced);
    const firstRule = n.slice(n.indexOf('{') + 1, n.indexOf('{animation:none!important}'));
    for (const cls of INVENTORY) expect(firstRule.split(',')).toContain(`.${cls}`);
    expect(firstRule).toContain('.animate-border-sweep::before');
  });

  it('finite animations complete within 5s (duration × iterations + max delay)', () => {
    const MAX_DELAY: Record<string, number> = { 'animate-bob-3': 0.3 };
    for (const [cls, value] of classes) {
      const iter = value.match(/\s(\d+)$/);
      if (!iter) {
        expect(value).toMatch(/infinite/);
        continue;
      }
      const duration = parseFloat(value.match(/([\d.]+)s/)![1]);
      const total = duration * Number(iter[1]) + (MAX_DELAY[cls] ?? 0);
      expect(total, cls).toBeLessThan(5);
    }
  });

  it('reduced-motion block turns the marquee into a static wrapped row', () => {
    const n = norm(reduced);
    expect(n).toContain('.animate-marquee{animation:none!important;transform:none!important;width:auto!important;flex-wrap:wrap;justify-content:center}');
    expect(n).toContain('[data-marquee-track]{mask-image:none!important}');
    expect(n).toContain('[data-marquee-dup]{display:none!important}');
    expect(n).toContain('html{scroll-behavior:auto}');
  });
});
