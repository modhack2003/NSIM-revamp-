import { describe, expect, it } from 'vitest';
import { formatFee, formatNextBatch, normalizePath, normalizeSiteUrl } from '@/lib/utils';

describe('utils', () => {
  it('formatFee', () => {
    expect(formatFee({ amount: null })).toBe('₹XX,XXX');
    expect(formatFee({ amount: 45000 })).toBe('₹45,000');
  });

  it('formatNextBatch uses a fixed IST time zone', () => {
    expect(formatNextBatch(null)).toBe('Next batch: TBA');
    expect(formatNextBatch('2026-03-01')).toBe('Next batch: 1 Mar 2026');
  });

  it('normalizePath', () => {
    expect(normalizePath('/')).toBe('/');
    expect(normalizePath('/contact/')).toBe('/contact');
    expect(normalizePath('/contact')).toBe('/contact');
  });

  it('normalizeSiteUrl', () => {
    expect(normalizeSiteUrl('https://www.example.com/')).toBe('https://www.example.com');
    expect(() => normalizeSiteUrl('ftp://x')).toThrow('Invalid NEXT_PUBLIC_SITE_URL: ftp://x');
    expect(() => normalizeSiteUrl('not a url')).toThrow('Invalid NEXT_PUBLIC_SITE_URL: not a url');
  });
});
