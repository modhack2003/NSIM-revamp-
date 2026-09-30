import type { CourseSlug } from './course-slugs';

export interface Testimonial { id: string; name: string; role: string; courseSlug: CourseSlug; quote: string; rating: 4 | 5 }
export interface TestimonialCard { id: string; name: string; role: string; program: string; quote: string; rating: 4 | 5 }

export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Aarav S.', role: 'Digital Marketing Executive at a D2C brand', courseSlug: 'ai-digital-marketing', rating: 5, quote: 'I came in knowing only how to post on Instagram. Four months later I was running paid campaigns and explaining the numbers to my manager with confidence.' }, // PLACEHOLDER P-20
  { id: 't2', name: 'Priya M.', role: 'Accounts Executive at a trading firm', courseSlug: 'business-accounting-finance', rating: 5, quote: 'The Tally and GST practice felt exactly like my first month at work. Nothing in my interview surprised me, because we had already done it in class.' }, // PLACEHOLDER P-21
  { id: 't3', name: 'Rohan D.', role: 'AI Content Specialist at a media startup', courseSlug: 'ai-prompt-engineering', rating: 5, quote: 'I used to get generic answers from AI tools. Now I have a prompt library my whole team uses, and I built most of it during the course projects.' }, // PLACEHOLDER P-22
  { id: 't4', name: 'Sneha B.', role: 'Social Media Manager at a lifestyle label', courseSlug: 'ai-digital-marketing', rating: 4, quote: 'Mentors reviewed every campaign I built and pushed me to justify each decision. That habit is the reason I got hired.' }, // PLACEHOLDER P-23
  { id: 't5', name: 'Arjun K.', role: 'MIS Executive at a manufacturing company', courseSlug: 'business-accounting-finance', rating: 5, quote: 'The advanced Excel module alone was worth it. My reports went from messy sheets to dashboards that management actually reads.' }, // PLACEHOLDER P-24
  { id: 't6', name: 'Ananya R.', role: 'Marketing Associate at an ed-tech company', courseSlug: 'ai-prompt-engineering', rating: 5, quote: 'Weekend batches let me learn without leaving my job. The automation I built in my capstone now saves our team hours every week.' }, // PLACEHOLDER P-25
];
