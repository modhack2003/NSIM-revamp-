# Design Review (round 3): NSIM Education Remastered

**Verdict: CHANGES_REQUESTED** (0 HIGH, 3 MEDIUM, 5 NIT)

I checked all 8 round-2 findings and every one is fixed in the text: SheetClose-wrapped drawer links, the fixed `CourseParamSync` code with `useEffectEvent`, the Embla viewport plus `NOSCRIPT_CSS`, the exhaustive motion inventory, the footer columns, `srLabel`, AC12 and the Course `provider`. The scope checks pass:
- The component inventory maps to ui/layout/sections.
- The course data model covers overview, curriculum modules, duration + ISO, mode, schedule, certification and the fee placeholder.
- The placeholder register has 42 ids.
- The SEO, JSON-LD, sitemap/robots and static-export rules agree with each other.
- All 6 page specs are present.

I ran a scratch Next 16.3.7 build this round (results under Verified Assumptions). Three issues still block. One is a Next 16 behaviour change I confirmed in the framework source. One is an unspecified client-component contract that runs into the design's own lint rule. One is a fallback CSS rule that won't produce the "static wrapped row" it promises.

## Findings

### 1. MEDIUM: `scroll-behavior: smooth` on `<html>` without `data-scroll-behavior="smooth"` makes every route change scroll smoothly
**Where:** §4.5 "Smooth scroll" (native `scroll-behavior: smooth` on `html` under `no-preference`); §6 `layout.tsx` (`<html suppressHydrationWarning>`).
**Problem:** Next 16 turns smooth scrolling off during route transitions **only** when `<html>` has `data-scroll-behavior="smooth"`. I read this in `next/dist/shared/lib/router/utils/disable-smooth-scroll.js` (16.3.7). If the attribute is missing, `fn()` runs with the CSS smooth behaviour still active, and dev prints the "missing-data-scroll-behavior" warning. So if a user clicks a footer link at the bottom of a long page, the new page animates all the way up from the old scroll position. That is jarring, and it's also motion the user didn't trigger. The reduced-motion override doesn't help, because it only applies to users who opted in.
**Fix:** In §6 `layout.tsx`, add: `<html lang="en-IN" data-scroll-behavior="smooth" suppressHydrationWarning>`. Add this sentence to §4.5 Smooth scroll: "`<html>` carries `data-scroll-behavior="smooth"` so Next 16 temporarily forces `auto` during route transitions. Smooth scrolling applies only to same-page hash jumps."

### 2. MEDIUM: `TestimonialsCarousel` has no props contract, and showing the program name runs into the client import ban
**Where:** §7.1 #8 ("Each card shows quote, name, program, role"); §8.3 (the carousel has no props listed); §9.4 `testimonials.ts` (`courseSlug: CourseSlug` only); §6 client import rule.
**Problem:** The testimonials data holds only `courseSlug`. The program label is `title`/`shortTitle`, and that lives in `courses.ts`. The carousel is a client component on the ESLint override list, so it can't call `getCourseBySlug`. The obvious implementation (look up the course inside the carousel) fails `pnpm lint`, and AC2 forbids suppressing that. It's also unspecified who reads `testimonials.ts` and what shape crosses the boundary.
**Fix:** Add to the §8.3 table:

| File | Props | Notes |
|---|---|---|
| `testimonials-carousel.tsx` (client) | `{ items: TestimonialCard[] }` where `export interface TestimonialCard { id: string; name: string; role: string; program: string; quote: string; rating: 4 \| 5 }` (declared in `testimonials.ts`) | `home/page.tsx` (server) builds `items = testimonials.map(t => ({ ...omit(t, 'courseSlug'), program: getCourseBySlug(t.courseSlug)!.shortTitle }))`. The carousel imports only `import type { TestimonialCard } from '@/data/testimonials'`. |

Add to `courses.test.ts` (or `home.test.ts`): every `testimonials[*].courseSlug` resolves, with exactly 2 per slug. That check replaces the non-null assertion's runtime risk.

### 3. MEDIUM: The marquee "static wrapped row" fallback CSS can't wrap a marquee row as usually built, and it leaves the edge-fade mask on
**Where:** §4.5 `NOSCRIPT_CSS` line 5 and the reduced-motion layer 2 rule (`.animate-marquee{flex-wrap:wrap;transform:none!important}`); §7.1 #2; AC6; AC16; §14 `noscript-style.test.ts` ("contains the six rules").
**Problem:** A `translateX(0 → −50%)` marquee over duplicated content only works if the animated row is as wide as its content. The standard way to get that is `flex w-max` (`width: max-content`). The design doesn't specify the row markup. With `width: max-content`, `flex-wrap: wrap` does nothing, because the line is never narrower than its content. The row stays one long line and gets clipped by the track's `overflow-hidden`/mask, so most chips are unreadable in both the reduced-motion and the no-JS paths. The edge-fade `mask-image` also stays active, which fades the first and last chip of each wrapped line.
**Fix:** Pin the markup and the rules.
- Markup: track `<div data-marquee-track className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">`. Each row is `<div className="animate-marquee flex w-max gap-3">`, holding the `<ul>` and the `aria-hidden` `data-marquee-dup` copy.
- Replace `NOSCRIPT_CSS` line 5 and the matching reduced-motion rule with:
  `.animate-marquee{animation:none!important;transform:none!important;width:auto!important;flex-wrap:wrap;justify-content:center}[data-marquee-track]{mask-image:none!important}`
- The inner `<ul>` also needs `flex flex-wrap gap-3`. Otherwise the wrapped row still holds one non-wrapping `<ul>`.
- Update §4.5 ("full content", now 7 rules), §6 (noscript-css comment "the 7 rules") and §14 (`noscript-style.test.ts` asserts the 7 rules). Also add to `motion-inventory.test.ts`: the reduced-motion block contains `width:auto` for `.animate-marquee` and `mask-image:none` for `[data-marquee-track]`.

### 4. NIT: `ui/sonner.tsx` needs `'use client'`, but it's missing from the "only" client list and the ESLint override list
**Where:** §6 client list ("`'use client'` appears only in…") and the ESLint override file list; §8.1 `sonner.tsx` ("themed via next-themes").
**Problem:** Reading the theme needs `useTheme()`, which is a hook, so the file must be a client component. That contradicts the list, which is presented as exhaustive.
**Fix:** Add `Toaster` (`ui/sonner.tsx`) to the §6 client list, and add `src/components/ui/sonner.tsx` to the override glob next to `accordion.tsx`.

### 5. NIT: `MobileEnrolBar` props are undefined
**Where:** §7.3 #2 and §8.3 (listed by name only).
**Problem:** It's a client component that shows `formatFee(fee)` and links to the enrol URL, but the design never says what it receives. It can't import `courses.ts`.
**Fix:** `MobileEnrolBar` props: `{ feeLabel: string; href: \`/contact/?course=${CourseSlug}\` }`. The course page passes `feeLabel={formatFee(course.fee)}` and `href={\`/contact/?course=${course.slug}\`}`. It observes `document.getElementById('enrol')`.

### 6. NIT: Page `<title>`/description copy for `/`, `/courses/`, `/about/` and `/contact/` isn't given
**Where:** §7 (only the home absolute title is specified); the verifier's title uniqueness and ≤ 60 char checks.
**Fix:** Pin the values in §7:
- `/`: absolute "NSIM Education — AI-Powered Career Skills, Kolkata", description "Live online programs in AI digital marketing, accounting & GST, and prompt engineering, with projects and placement assistance." (≤ 160)
- `/courses/`: "Programs"
- `/about/`: "About Us"
- `/contact/`: "Contact & Enquiries"

Each of the last three gets its own description of 70–160 chars. Put all four page descriptions in a `pageMeta` export in `site.ts` so they are data, not inline strings.

### 7. NIT: Clipping for aurora overflow isn't specified, and the obvious global fix breaks the sticky EnrolCard
**Where:** §4.4 Aurora (blobs blurred 80px); NFR1 (no horizontal overflow from 320 to 1920px); §7.3 sticky `EnrolCard` (`top-24`).
**Problem:** Blurred blobs placed near section edges cause horizontal scroll. The quick fix, `overflow-x-hidden` on `body` or `main`, turns that ancestor into the scroll container and silently disables `position: sticky` on the EnrolCard.
**Fix:** Add to §4.4: "`AuroraBackground` renders `<div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">`, and each host section is `relative isolate`. Never set `overflow: hidden`/`overflow-x: hidden` on `html`, `body`, `main` or any ancestor of `EnrolCard`. If a global guard is needed, use `overflow-x: clip` on `body`."

### 8. NIT: The carousel's live region announces "Showing testimonial 1 of 6" on page load
**Where:** §7.1 #8 ("plus one direct invocation of the same callback after subscribing").
**Problem:** The initial direct invocation fills the `aria-live` text after hydration. Some screen readers announce that unprompted.
**Fix:** Keep the direct invocation for `selectedIndex`/`snaps`. Keep the live text in separate state that only the `select` event callback sets, and start it as `''`. Update the test: before any `select`, the live region is empty.

## Verified Assumptions
- **Next 16 smooth-scroll handling** (read in `next@16.3.7` source): route transitions force `scroll-behavior: auto` only when `html[data-scroll-behavior="smooth"]` is present (Finding 1).
- **`<noscript><style>{NOSCRIPT_CSS}</style></noscript>` in `<head>`** (scratch build, React 19.2 + Next 16.3.7): the CSS is emitted verbatim in `out/index.html` and `out/404.html`, and `>` combinators are **not** HTML-escaped. The mechanism works.
- **Icons:** with `app/icon.svg` present and `metadata.icons = { icon: '/icon.svg', apple: '/apple-touch-icon.png' }`, the output has exactly one `<link rel="icon" href="/icon.svg">` and one `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`. There are no duplicates.
- **`not-found.tsx` metadata export works** in a static export. `out/404.html` gets `<title>Page not found | NSIM</title>` (the template applies) and `noindex, follow`. Next also injects its own `<meta name="robots" content="noindex">`, so the page carries two robots metas. They don't conflict, and the verifier's "contains noindex" check passes.
- **lucide-react 1.48.0** exports all 33 icons in §9.1 (`BarChart3`, `CheckCircle2`, `Sheet`, `NotebookPen`, `FolderKanban` and the rest). `Instagram` is absent, which confirms the no-brand-icons decision.
- **Current versions match the stack table:** `motion` 13.4.5, `embla-carousel-react` 8.6.0, `zod` 4.6.5, `next` 16.3.7.
- **Round-2 resolutions are present:** SheetClose drawer links; `CourseParamSync` with `useEffectEvent` and `[value]` deps, plus the reset test; the Embla `overflow-hidden` viewport with `data-carousel-viewport` and callback-only state; the exhaustive motion inventory table, the derived reduced-motion rule and `motion-inventory.test.ts`; the one-shot `Reveal` journey line; `srLabel`; the reworded AC12; `provider.name`.
- **Unchanged since round 2, so the round-2 checks still hold:** the contrast tokens in §4.1 (all pairs pass); the zod email/name/phone rules; the 42-id placeholder total.

## Unverified / Wrong Assumptions
- **Wrong:** the §4.5 noscript and reduced-motion rules turn the marquee into a "static wrapped row". That fails for a `w-max` row, which is what the −50% translate technique needs (Finding 3).
- **Wrong:** the §6 client list is exhaustive. `ui/sonner.tsx` must be a client component (Finding 4).
- **Unverified (can only be measured after the build):** Lighthouse ≥ 90/95 and the 200 kB home JS budget.
- **Unverified:** the extension-named `og.png/route.tsx` and `apple-touch-icon.png/route.tsx` handlers (A9). I didn't rebuild them this round, so I'm relying on the earlier scratch reproduction. The design text for them is unchanged.
