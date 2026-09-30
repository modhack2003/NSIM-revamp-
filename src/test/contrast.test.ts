import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { converter, parse, wcagContrast, type Rgb } from 'culori';

const css = fs.readFileSync(path.resolve(__dirname, '../app/globals.css'), 'utf8');
const toRgb = converter('rgb');

function block(selector: string): Record<string, string> {
  const re = new RegExp(`(^|\\n)${selector.replace('.', '\\.')}\\s*\\{([^}]*)\\}`);
  const m = css.match(re);
  if (!m) throw new Error(`block ${selector} not found`);
  const out: Record<string, string> = {};
  for (const [, name, value] of m[2].matchAll(/--([\w-]+):\s*(oklch\([^)]*\))/g)) out[name] = value;
  return out;
}

const light = block(':root');
const dark = { ...light, ...block('.dark') };

function color(tokens: Record<string, string>, name: string, over?: Rgb): Rgb {
  const c = toRgb(parse(tokens[name]));
  if (!c) throw new Error(`cannot parse ${name}`);
  const alpha = c.alpha ?? 1;
  if (alpha >= 1 || !over) return { ...c, alpha: 1 };
  return {
    mode: 'rgb',
    r: c.r * alpha + over.r * (1 - alpha),
    g: c.g * alpha + over.g * (1 - alpha),
    b: c.b * alpha + over.b * (1 - alpha),
  };
}

describe.each([
  ['light', light],
  ['dark', dark],
] as const)('%s theme contrast', (_name, t) => {
  const bg = color(t, 'background');
  const c = (n: string) => color(t, n, bg);
  const ratio = (a: string | Rgb, b: string | Rgb) =>
    wcagContrast(typeof a === 'string' ? c(a) : a, typeof b === 'string' ? c(b) : b);

  it('foreground/background ≥ 7', () => expect(ratio('foreground', bg)).toBeGreaterThanOrEqual(7));
  it('muted-foreground on background, muted, card ≥ 4.5', () => {
    expect(ratio('muted-foreground', bg)).toBeGreaterThanOrEqual(4.5);
    expect(ratio('muted-foreground', 'muted')).toBeGreaterThanOrEqual(4.5);
    expect(ratio('muted-foreground', 'card')).toBeGreaterThanOrEqual(4.5);
  });
  it('primary-foreground on primary and primary-2 ≥ 4.5', () => {
    expect(ratio('primary-foreground', 'primary')).toBeGreaterThanOrEqual(4.5);
    expect(ratio('primary-foreground', 'primary-2')).toBeGreaterThanOrEqual(4.5);
  });
  it('accent-amber-foreground on accent-amber ≥ 4.5', () =>
    expect(ratio('accent-amber-foreground', 'accent-amber')).toBeGreaterThanOrEqual(4.5));
  it('primary, destructive, success text on background ≥ 4.5', () => {
    for (const n of ['primary', 'destructive', 'success']) expect(ratio(n, bg), n).toBeGreaterThanOrEqual(4.5);
  });
  it('gradient stops on background ≥ 3', () => {
    for (const n of ['primary', 'accent-cyan', 'accent-amber', 'accent-pink', 'accent-emerald'])
      expect(ratio(n, bg), n).toBeGreaterThanOrEqual(3);
  });
});
