# Content handover checklist

## Content sources

- All site content lives in `src/data/**`: `site.ts` (contact, social, legal, URL), `home.ts` (hero, stats, bento), `courses.ts` (single source for the three programs), `about.ts` (mentors), `testimonials.ts`, `faqs.ts`, `tools.ts`.
- The live site (nsimeducation.com) was not fetched. All copy is original, and no text is copied from it.
- Any fact that could not be confirmed is a placeholder, listed below. NSIM should supply the real values.

## Placeholders

Every value below is a placeholder. In the code, each one sits on a line in `src/data/**` that ends with `// PLACEHOLDER P-xx`. Replace the value, keep or remove the comment, and tick the box. `src/test/placeholders.test.ts` keeps this list, the data files and the register in sync.

| Done | ID | Item | Placeholder value | File |
|---|---|---|---|---|
| [ ] | P-01 | Learners count | 5,000+ | `src/data/home.ts` `stats.learners` |
| [ ] | P-02 | Average rating | 4.8★ | `src/data/home.ts` `stats.rating` |
| [ ] | P-03 | Hiring partners | 50+ | `src/data/home.ts` `stats.partners` |
| [ ] | P-04 | Live sessions delivered | 1,200+ (About only) | `src/data/home.ts` `stats.sessions` |
| [ ] | P-10 | Batch status wording | "Enrolling now" | `src/data/home.ts` `hero.eyebrow` |
| [ ] | P-11 | Placement claim | "100% placement assistance" / "Included" (assistance, never "guarantee") | `src/data/home.ts` `stats.placement`, `placementLabel`, bento |
| [ ] | P-12 | Response-time promise | "within 24 hours" | `src/data/site.ts` `responseTime` |
| [ ] | P-13 | Feature claims | Bento tile claims (live sessions, projects, AI-first, certification, flexible schedules) | `src/data/home.ts` `bentoFeatures` |
| [ ] | P-20 | Testimonial 1 | Aarav S. | `src/data/testimonials.ts` |
| [ ] | P-21 | Testimonial 2 | Priya M. | `src/data/testimonials.ts` |
| [ ] | P-22 | Testimonial 3 | Rohan D. | `src/data/testimonials.ts` |
| [ ] | P-23 | Testimonial 4 | Sneha B. | `src/data/testimonials.ts` |
| [ ] | P-24 | Testimonial 5 | Arjun K. | `src/data/testimonials.ts` |
| [ ] | P-25 | Testimonial 6 | Ananya R. | `src/data/testimonials.ts` |
| [ ] | P-30 | Phone | `+91 00000 00000` / `tel:+910000000000` | `src/data/site.ts` |
| [ ] | P-31 | WhatsApp number | `910000000000` | `src/data/site.ts` |
| [ ] | P-32 | Email | `hello@example.com` | `src/data/site.ts` |
| [ ] | P-33 | Address | Kolkata, West Bengal, India (no street) | `src/data/site.ts` |
| [ ] | P-34 | Office hours | Mon–Sat, 10:00–19:00 IST | `src/data/site.ts` |
| [ ] | P-35 | Instagram URL | `https://www.instagram.com/` (hidden until a profile path is set) | `src/data/site.ts` |
| [ ] | P-36 | Facebook URL | `https://www.facebook.com/` | `src/data/site.ts` |
| [ ] | P-37 | LinkedIn URL | `https://www.linkedin.com/` | `src/data/site.ts` |
| [ ] | P-38 | YouTube URL | `https://www.youtube.com/` | `src/data/site.ts` |
| [ ] | P-40 | Syllabus PDF | none; note "Detailed syllabus PDF: coming soon" | `src/data/courses.ts` `syllabusNote` |
| [ ] | P-41 | Fees + EMI note | `amount: null` → ₹XX,XXX; "EMI options available" | `src/data/courses.ts` `fee` |
| [ ] | P-42 | Next batch dates | `null` → "Next batch: TBA" | `src/data/courses.ts` `nextBatch` |
| [ ] | P-43 | Schedule | "Weekday evenings or weekends · 2 hrs/session" | `src/data/courses.ts` |
| [ ] | P-44 | Durations | 4 / 3 / 2 months (P4M / P3M / P2M) | `src/data/courses.ts` |
| [ ] | P-45 | Module durations & lesson counts | per module | `src/data/courses.ts` `curriculum` |
| [ ] | P-46 | Language of instruction | "English, Hindi & Bengali" / `['en','hi','bn']` | `src/data/courses.ts` |
| [ ] | P-47 | Certificate titles | NSIM Certified … Professional | `src/data/courses.ts` `certification.title` |
| [ ] | P-48 | Course badges | Bestseller (Digital Marketing), New (Prompt Engineering) | `src/data/courses.ts` `badge` |
| [ ] | P-49 | Course syllabus content | module titles, summaries, topics; project briefs | `src/data/courses.ts` `curriculum`, `projects` |
| [ ] | P-50 | Founded year | 2018 | `src/data/site.ts` `foundedYear` |
| [ ] | P-51 | Mentor 1 | R. Sen, 8 years | `src/data/about.ts` |
| [ ] | P-52 | Mentor 2 | A. Gupta, 10 years | `src/data/about.ts` |
| [ ] | P-53 | Mentor 3 | S. Das, 6 years | `src/data/about.ts` |
| [ ] | P-54 | Mentor 4 | M. Roy, 12 years | `src/data/about.ts` |
| [ ] | P-55 | Course tools, outcomes, highlights, audience, career roles | implementer-written lists | `src/data/courses.ts` |
| [ ] | P-56 | Enrolment inclusions and certificate descriptions | "Live sessions + recordings", "Certificate on completion", … | `src/data/courses.ts` `includes`, `certification.description` |
| [ ] | P-60 | Legal name | NSIM Education | `src/data/site.ts` |
| [ ] | P-62 | Site URL | https://www.nsimeducation.com (override with `NEXT_PUBLIC_SITE_URL`) | `src/data/site.ts` |
