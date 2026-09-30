import { describe, expect, it } from 'vitest';
import { contactDefaults, contactSchema, type ContactFormInput } from '@/lib/contact-schema';

const valid: ContactFormInput = {
  name: 'Priya M.',
  email: ' Priya@Example.com ',
  phone: '+919876543210',
  course: 'ai-digital-marketing',
  mode: 'call',
  message: '',
  consent: true,
  hp_ref: '',
};

const errorFor = (patch: Partial<ContactFormInput>, field: keyof ContactFormInput) => {
  const r = contactSchema.safeParse({ ...valid, ...patch });
  if (r.success) return undefined;
  return r.error.issues.find((i) => i.path[0] === field)?.message;
};

describe('contactSchema', () => {
  it('accepts a valid enquiry and normalises values', () => {
    const r = contactSchema.parse(valid);
    expect(r.email).toBe('priya@example.com');
    expect(r.phone).toBe('+919876543210');
  });

  it.each(['+919876543210', '98765 43210', '098765-43210', '919876543210'])('phone %s normalises', (phone) => {
    expect(contactSchema.parse({ ...valid, phone }).phone).toBe('+919876543210');
  });

  it.each(['5876543210', '98765', '+14155550100'])('phone %s is rejected', (phone) => {
    expect(errorFor({ phone }, 'phone')).toBe('Enter a valid 10-digit Indian mobile number');
  });

  it.each(['Priya M.', "D'Souza", 'অনন্যা রায়', 'ज्योति'])('name %s is valid', (name) => {
    expect(contactSchema.safeParse({ ...valid, name }).success).toBe(true);
  });

  it.each(['A', 'John123'])('name %s is invalid', (name) => {
    expect(errorFor({ name }, 'name')).toBe('Please enter your full name');
  });

  it('rejects bad emails', () => {
    expect(errorFor({ email: 'nope' }, 'email')).toBe('Enter a valid email address');
  });

  it("rejects course ''", () => {
    expect(errorFor({ course: '' }, 'course')).toBe('Choose a program');
    expect(contactSchema.safeParse({ ...valid, course: 'not-sure' }).success).toBe(true);
    expect(errorFor({ course: 'bogus' }, 'course')).toBe('Choose a program');
  });

  it('rejects consent false', () => {
    expect(errorFor({ consent: false }, 'consent')).toBe('Please agree to be contacted');
  });

  it('limits message to 1000 chars', () => {
    expect(errorFor({ message: 'x'.repeat(1001) }, 'message')).toBe('Keep it under 1000 characters');
    expect(contactSchema.safeParse({ ...valid, message: 'x'.repeat(1000) }).success).toBe(true);
  });

  it('defaults mode to call', () => {
    const { mode: _mode, ...rest } = valid;
    void _mode;
    expect(contactSchema.parse(rest).mode).toBe('call');
  });

  it('contactDefaults fails on the 5 required fields', () => {
    const r = contactSchema.safeParse(contactDefaults);
    expect(r.success).toBe(false);
    const fields = new Set(r.error!.issues.map((i) => i.path[0]));
    expect([...fields].sort()).toEqual(['consent', 'course', 'email', 'name', 'phone']);
  });
});
