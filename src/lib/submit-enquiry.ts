import type { ContactInput } from './contact-schema';

/** Mock submission: resolves after 900ms and makes no network request (design A6). */
export function submitEnquiry(data: ContactInput): Promise<{ ok: true }> {
  void data;
  return new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 900));
}
