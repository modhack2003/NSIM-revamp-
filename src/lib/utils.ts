import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const inrFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

export function formatINR(n: number): string {
  return inrFormatter.format(n);
}

export function formatCounter(v: number, decimals = 0, prefix = '', suffix = ''): string {
  const n = new Intl.NumberFormat('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(v);
  return `${prefix}${n}${suffix}`;
}

export function formatFee(fee: { amount: number | null }): string {
  return fee.amount == null ? '₹XX,XXX' : formatINR(fee.amount);
}

const batchFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'Asia/Kolkata',
});

/** `d` is an ISO date 'YYYY-MM-DD' or null. Interpreted as midnight IST. */
export function formatNextBatch(d: string | null): string {
  if (d == null) return 'Next batch: TBA';
  return 'Next batch: ' + batchFormatter.format(new Date(`${d}T00:00:00+05:30`));
}

export function normalizePath(p: string): string {
  return p === '/' ? '/' : p.replace(/\/+$/, '');
}

export function normalizeSiteUrl(value: string): string {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`Invalid NEXT_PUBLIC_SITE_URL: ${value}`);
  }
  if (url.protocol !== 'https:') throw new Error(`Invalid NEXT_PUBLIC_SITE_URL: ${value}`);
  return url.toString().replace(/\/+$/, '');
}
