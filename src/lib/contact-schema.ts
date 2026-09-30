import { z } from 'zod';
import { COURSE_SLUGS } from '@/data/course-slugs';

export const COURSE_OPTIONS = [...COURSE_SLUGS, 'not-sure'] as const;
export type CourseOption = (typeof COURSE_OPTIONS)[number];
const isCourseOption = (v: string): v is CourseOption => (COURSE_OPTIONS as readonly string[]).includes(v);
const PHONE_MSG = 'Enter a valid 10-digit Indian mobile number';

export const contactSchema = z.object({
  name: z.string().trim().min(2, { error: 'Please enter your full name' }).max(80, { error: 'Please enter your full name' })
    .regex(/^[\p{L}\p{M} .'-]+$/u, { error: 'Please enter your full name' }),
  email: z.string().trim().toLowerCase().pipe(z.email({ error: 'Enter a valid email address' }).max(120, { error: 'Enter a valid email address' })),
  phone: z.string()
    .transform((s) => s.replace(/[\s\-()]/g, '').replace(/^0/, '').replace(/^91(?=[6-9]\d{9}$)/, ''))
    .pipe(z.string().regex(/^(\+91)?[6-9]\d{9}$/, { error: PHONE_MSG }))
    .transform((s) => '+91' + s.slice(-10)),
  course: z.string().refine(isCourseOption, { error: 'Choose a program' }),
  mode: z.enum(['call', 'whatsapp', 'email']).default('call'),
  message: z.string().trim().max(1000, { error: 'Keep it under 1000 characters' }),
  consent: z.boolean().refine((v) => v === true, { error: 'Please agree to be contacted' }),
  hp_ref: z.string().max(200),
});
export type ContactFormInput = z.input<typeof contactSchema>;  // course: string, consent: boolean, mode?: …
export type ContactInput = z.output<typeof contactSchema>;     // phone normalised, mode required
export const contactDefaults: ContactFormInput = {
  name: '', email: '', phone: '', course: '', mode: 'call', message: '', consent: false, hp_ref: '',
};
