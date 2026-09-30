# Implementation Plan — NSIM Education Remastered

Source of truth: `.agents/tasks/design.md`. Where this plan quotes a round-3 resolution (tagged **[R3-#n]**), that text wins over any older wording. The resolutions are recorded in design.md §18, "Response to design review round 3", and §4.5 has already been patched for R3-1 and R3-3.

Repo: `/projects/sandbox/nsim-remastered`. It is a local git repo with no commits, no remote and no worktree. Environment: Node 22.23 and pnpm 11.24. Every command runs from the repo root. Commit locally after each item (`git add <files> && git commit -m "<conventional msg>"`). Never push.

Project commands, defined in item 1 per design §5: `pnpm typecheck` (`tsc --noEmit`), `pnpm lint` (`eslint .`), `pnpm test` (`vitest run`), `pnpm build` (`next build` → `out/`, needs network for next/font, A8), `pnpm verify` (`node scripts/verify-export.mjs`).

Global rules for every item:
- There are no `eslint-disable` comments for `react-hooks/*` or `no-restricted-imports` (AC2).
- No synchronous `setState` in effect bodies (§4.5).
- Internal hrefs end in `/`.
- All copy is original.
- Placeholder values sit on lines ending `// PLACEHOLDER P-xx` (§10).

---

- [ ] 1. **Scaffold the project and toolchain.**
      Hand-create the project; do not run `create-next-app` interactively. Create these files:
      - `package.json`: scripts `dev`, `build`, `start` (`npx serve out`), `lint`, `typecheck`, `test`, `verify`. Set `"engines": {"node": ">=22"}`. Install the deps from design §5:
        - `next@16.3.x`, `react@^19.2`, `react-dom@^19.2`, `radix-ui`, `lucide-react`, `motion`, `next-themes@0.4.x`, `embla-carousel-react@8`, `react-hook-form@7`, `zod@4`, `@hookform/resolvers@5`, `sonner@2`, `clsx`, `tailwind-merge`, `class-variance-authority`
        - dev: `typescript@~5.9.3`, `@types/react`, `@types/react-dom`, `@types/node`, `tailwindcss@4.3.x`, `@tailwindcss/postcss`, `eslint`, `eslint-config-next@16.3.x`, `vitest`, `@vitejs/plugin-react`, `vite-tsconfig-paths`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `culori`, `@types/culori`
      - `tsconfig.json`: strict, `paths {"@/*": ["./src/*"]}`, Next plugin.
      - `postcss.config.mjs`: `{ plugins: { '@tailwindcss/postcss': {} } }`.
      - `vitest.config.ts`: `environment: 'jsdom'`, plugins react + tsconfigPaths, `setupFiles: ['src/test/setup.ts']` (imports `@testing-library/jest-dom/vitest`), `include: ['src/**/*.test.{ts,tsx}']`.
      - `.gitignore`: `node_modules`, `.next`, `out`, `next-env.d.ts`, `*.tsbuildinfo`.

      `next.config.ts` and `eslint.config.mjs` come in item 5. For now add a minimal `src/app/layout.tsx` + `src/app/page.tsx` stub so typecheck has input.
      Files: `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `postcss.config.mjs`, `vitest.config.ts`, `src/test/setup.ts`, `.gitignore`, `src/app/layout.tsx`, `src/app/page.tsx` (stubs)
      Verify: `pnpm install` succeeds. `pnpm typecheck` exits 0. `pnpm test -- --passWithNoTests` exits 0.

- [ ] 2. **Key modules and shared lib utilities** (no React). These are the dependency root for all data.
      Create these files:
      - `src/data/course-slugs.ts` (`COURSE_SLUGS`, `CourseSlug`, `isCourseSlug`) and `src/data/icon-keys.ts` (33 keys), verbatim from §9.1.
      - `src/lib/utils.ts`: `cn()`, `formatINR`, `formatFee`, `formatNextBatch` (`timeZone: 'Asia/Kolkata'`), `normalizePath`, `normalizeSiteUrl` (throws `Invalid NEXT_PUBLIC_SITE_URL: <value>` on malformed or non-https input, strips the trailing slash).
      - `src/lib/use-mounted.ts` (`useMounted`, `useHasIO`), verbatim from §4.5.
      - `src/lib/noscript-css.ts`: export `NOSCRIPT_CSS` with exactly **7 rules** **[R3-3]**:
        ```css
        [data-reveal]{opacity:1!important;transform:none!important}
        [data-carousel-viewport]{overflow-x:auto!important;scroll-snap-type:x mandatory}
        [data-carousel-viewport]>*>*{scroll-snap-align:start}
        [data-reveal-js-only]{display:none!important}
        .animate-marquee{animation:none!important;transform:none!important;width:auto!important;flex-wrap:wrap;justify-content:center}
        [data-marquee-track]{mask-image:none!important}
        [data-marquee-dup]{display:none!important}
        ```
      - `src/lib/motion.ts`: ease `[0.22,1,0.36,1]`, reveal variants, stagger 0.08.

      Files: `src/data/course-slugs.ts`, `src/data/icon-keys.ts`, `src/lib/utils.ts`, `src/lib/use-mounted.ts`, `src/lib/noscript-css.ts`, `src/lib/motion.ts`
      Verify: `pnpm typecheck` exits 0.

- [ ] 3. **Data layer: courses, tools, faqs.** Depends on item 2.
      - `src/data/tools.ts`: the `ToolId` union, `Tool`, `tools` (18 rows, §9.2 table), and `toolById`.
      - `src/data/faqs.ts`: `FaqItem`, plus 10 original general FAQs. Tag counts: 7 `home`, 3–5 `programs`, 3 `enquiry`. Answers ≤ 500 chars.
      - `src/data/course-types.ts`: type-only, §9.3 verbatim.
      - `src/data/courses.ts`:
        - `export type * from './course-types'`.
        - `courses`: 3 full courses in `COURSE_SLUGS` order, following the §9.3 per-course table. The implementer writes the original prose. Each course has 5–8 modules, 6–8 outcomes, 3–4 projects, exactly 3 audience entries, 4–6 includes, 4–6 career roles, 3–5 FAQs with slug-prefixed ids, `seo.title` ≤ 42 chars and `seo.description` 70–160 chars.
        - Placeholder comments P-40…P-49, P-55 and P-56, per property, as described in the §9.3 marking rule.
        - Helpers: `getCourseBySlug`, `getRelatedCourses`, `toCardData`, `courseLinks` (from `shortTitle`), `syllabusNote`.
      - `src/lib/course-theme.ts`: `courseThemeClasses`, using static complete class strings only.

      Files: `src/data/tools.ts`, `src/data/faqs.ts`, `src/data/course-types.ts`, `src/data/courses.ts`, `src/lib/course-theme.ts`
      Verify: `pnpm typecheck` exits 0.

- [ ] 4. **Data layer: site, home, testimonials, about, CONTENT.md.** Depends on item 3.
      - `src/data/site.ts`:
        - `siteConfig` (§9.4, `url` via `normalizeSiteUrl`), `PLACEHOLDER_PHONE`, `PLACEHOLDER_EMAIL`, `liveSocials`, and placeholder ids P-12, P-30…P-38, P-50, P-60, P-62.
        - **[R3-6]** Also export `pageMeta`, typed `Record<'home'|'courses'|'about'|'contact', { title: string; description: string }>`:
          - `home`: title `'NSIM Education — AI-Powered Career Skills, Kolkata'` (rendered as an absolute title). Description: `'Live online programs in AI digital marketing, accounting & GST, and prompt engineering, with projects and placement assistance.'`
          - `courses`: title `'Programs'`. Write an original description of 70–160 chars. Example: "Compare NSIM's live online programs in AI digital marketing, business accounting & GST, and prompt engineering — duration, tools and certification."
          - `about`: title `'About Us'`, with its own 70–160 char description.
          - `contact`: title `'Contact & Enquiries'`, with its own 70–160 char description.
          - Pages must read these values. They must not use inline strings.
      - `src/data/home.ts`: `hero`, `stats` (5), `pickStats`, `bentoFeatures` (6), `journeySteps` (4), `placementSupport` (4), `placementLabel`, `ctaBand`. Placeholder ids P-01…P-04, P-10, P-11, P-13.
      - `src/data/testimonials.ts` **[R3-2]**:
        - Export `interface Testimonial { id: string; name: string; role: string; courseSlug: CourseSlug; quote: string; rating: 4 | 5 }`.
        - Export `interface TestimonialCard { id: string; name: string; role: string; program: string; quote: string; rating: 4 | 5 }`.
        - Export `testimonials: Testimonial[]`: exactly 6 entries, 2 per slug, quotes ≤ 280 chars, lines tagged P-20…P-25.
        - Import `CourseSlug` with `import type` from `./course-slugs`. Never import `./courses`, so the module stays client-safe for type imports.
      - `src/data/about.ts`: `story`, `values` (4), `approach` (3), and `mentors` (4, with P-51…P-54 on each line).
      - `CONTENT.md` at the repo root: a handover checklist listing all 42 ids from §10 with their item, placeholder value and file.

      Files: `src/data/site.ts`, `src/data/home.ts`, `src/data/testimonials.ts`, `src/data/about.ts`, `CONTENT.md`
      Verify: `pnpm typecheck` exits 0.

- [ ] 5. **Config: next.config, ESLint flat config with the client import ban.** Depends on item 1.
      - `next.config.ts`: `{ output: 'export', trailingSlash: true, images: { unoptimized: true }, reactStrictMode: true }`.
      - `eslint.config.mjs`:
        - Use flat `eslint-config-next` (core-web-vitals + typescript), and ignore `.next/`, `out/` and `next-env.d.ts`.
        - Keep `react-hooks/set-state-in-effect` at its default of error.
        - Add an override that applies core `no-restricted-imports` with `patterns: [{ group: ['@/data/courses', '**/data/courses'], message: 'Client components receive course data as props; import types from @/data/course-types' }]`. Scope it with this `files` list:
          - `src/components/layout/{navbar,mobile-nav,floating-enquire,theme-toggle,providers}.tsx`
          - `src/components/sections/{contact-form,course-param-sync,mobile-enrol-bar,tools-marquee,testimonials-carousel,course-card,rotating-words,animated-counter,reveal}.tsx`
          - `src/components/ui/{accordion,sonner}.tsx`. **[R3-4]** `sonner.tsx` is added here.

      Files: `next.config.ts`, `eslint.config.mjs`
      Verify: `pnpm lint` exits 0 on the current tree. Then do a temporary sanity check: create `src/components/ui/sonner.tsx` containing `import { courses } from '@/data/courses'` and confirm `pnpm lint` reports `no-restricted-imports`. Delete that temporary file before committing.

- [ ] 6. **Global styles and theming tokens.** Depends on item 1.
      Write `src/app/globals.css`:
      - `@import "tailwindcss"` and `@custom-variant dark (&:where(.dark, .dark *))`.
      - `:root` / `.dark` OKLCH tokens (§4.1 table), `--radius`, and `@theme inline` mappings (colours, `--font-display`/`--font-sans`/`--font-mono`).
      - Base: `html { scroll-padding-top: 5rem }`, and `@media (prefers-reduced-motion: no-preference){ html { scroll-behavior: smooth } }`.
      - **[R3-7]** Do not set `overflow: hidden` or `overflow-x: hidden` on `html`, `body` or `main`. The only permitted global guard is `body { overflow-x: clip }`.
      - Utilities `.glass` and `.text-gradient` (with a solid `color` fallback).
      - `body[data-bottom-bar]{padding-bottom:80px}` below lg, and `.floating-enquire` lifted by 80px under the same selector.
      - Keyframes `aurora`, `marquee` (translateX 0 → −50%), `pulse-dot`, `bob`, `border-sweep`, `accordion-down`/`accordion-up`.
      - The five inventory classes, with exact timings from the §4.5 table: `.animate-aurora`, `.animate-marquee` (40s linear infinite; pause on `:hover` / `:focus-within` of the track and on a `[data-paused]` parent via `animation-play-state`), `.animate-pulse-3`, `.animate-bob-3`, and `.animate-border-sweep::before`.
      - The reduced-motion media query, which must contain both rules:
        - `.animate-aurora,.animate-marquee,.animate-pulse-3,.animate-bob-3,.animate-border-sweep,.animate-border-sweep::before{animation:none!important}html{scroll-behavior:auto}`
        - **[R3-3]** `.animate-marquee{animation:none!important;transform:none!important;width:auto!important;flex-wrap:wrap;justify-content:center}[data-marquee-track]{mask-image:none!important}[data-marquee-dup]{display:none!important}`
        - Also accordion `animation:none`.

      Files: `src/app/globals.css`
      Verify: `pnpm build` compiles CSS without errors (the stub page is enough).

- [ ] 7. **UI primitives** (`src/components/ui`). Depends on items 2, 5 and 6.
      Hand-author these components in shadcn conventions (cva, `data-slot`, `asChild` via radix `Slot`), following §8.1:
      - `button.tsx`, `badge.tsx`, `chip.tsx` (server, `{ icon?: IconKey; children }`), `card.tsx`
      - `accordion.tsx` (`'use client'`, Radix Accordion + chevron), `sheet.tsx` (Radix Dialog drawer with visually hidden Title, exporting `SheetClose`)
      - `input.tsx`, `textarea.tsx`, `native-select.tsx`, `checkbox.tsx`, `label.tsx`, `form-field.tsx` (wires `id` / `aria-invalid` / `aria-describedby`)
      - `container.tsx`, `section-heading.tsx`
      - `icon.tsx` (`iconMap satisfies Record<IconKey, LucideIcon>`, using the lucide imports listed in §9.1)
      - `visually-hidden.tsx`
      - **[R3-4]** `sonner.tsx`: starts with `'use client'`, uses `useTheme()` from next-themes, and exports `Toaster`. Settings: `position="bottom-right"`, `offset={88}`, `richColors`, `closeButton`.

      Files: `src/components/ui/*.tsx` (16 files)
      Verify: `pnpm typecheck` and `pnpm lint` exit 0.

- [ ] 8. **Layout shell: providers, navbar, footer, root layout.** Depends on items 4 and 7.
      - `layout/providers.tsx` (client): `ThemeProvider` (`attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`) wrapping `MotionConfig reducedMotion="user"`.
      - Other layout components, per §8.2:
        - `skip-link.tsx`, `theme-toggle.tsx` (`useMounted`)
        - `navbar.tsx` (client; scroll state via a passive listener whose `setState` runs only in the event callback; `normalizePath` for the active link; `layoutId` pill with spring 400/35; takes the `courseLinks` prop)
        - `mobile-nav.tsx` (every link wrapped in `SheetClose asChild`, no pathname effect)
        - `footer.tsx` (server, 4 columns, `liveSocials`, and the socials row omitted when that list is empty)
        - `floating-enquire.tsx` (disclosure popover with focus management, hidden on `/contact`)
        - `page-header.tsx`, `breadcrumbs.tsx`, `json-ld.tsx` (escapes `<`)
      - `src/app/layout.tsx`:
        - Fonts: Bricolage Grotesque, Geist, and Geist Mono (`preload:false`).
        - **[R3-1]** Render `<html lang="en-IN" data-scroll-behavior="smooth" suppressHydrationWarning>`.
        - `<head>`: `<noscript><style>{NOSCRIPT_CSS}</style></noscript>`.
        - Body order: SkipLink, Navbar (receiving `courseLinks` from `courses.ts`), `<main id="main" tabIndex={-1}>`, Footer, FloatingEnquire, `Toaster`, NoiseOverlay, Organization JSON-LD.
        - Metadata: `metadataBase`, title template `'%s | NSIM Education'`, `icons`, `manifest`.
        - The Organization JSON-LD needs `lib/seo.ts`. Create `organizationJsonLd` here and extend the same file in item 13.
      - **[R3-7]** Do not add an `overflow-hidden` class to `main` or `body`.

      Files: `src/components/layout/*.tsx` (11 files), `src/app/layout.tsx`, `src/lib/seo.ts` (initial)
      Verify: `pnpm typecheck` and `pnpm lint` exit 0. `pnpm build` succeeds. `out/index.html` contains `data-scroll-behavior="smooth"` and `lang="en-IN"`.

- [ ] 9. **Decorative and motion section primitives.** Depends on items 6 and 7.
      Create these under `src/components/sections/`:
      - **[R3-7]** `aurora-background.tsx` (server): the root is exactly `<div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">`. It holds 3–4 `.animate-aurora` blobs (18/22/26s, `will-change: transform`) and takes an optional `theme?: CourseTheme` prop. Add a doc comment stating that every host section must be `relative isolate`.
      - `grid-pattern.tsx`, `noise-overlay.tsx`, `certificate-art.tsx`
      - `reveal.tsx` (client): `Reveal`, `Stagger`, `StaggerItem`. Each adds `data-reveal` and uses `useHasIO`.
      - `rotating-words.tsx` (client): single pass at 1.4 / 2.8 / 4.2s, with a width sizer.
      - `animated-counter.tsx` (client): writes via a ref and `animate()`, renders the sr-only `srLabel`.

      Files: the 7 files above
      Verify: `pnpm typecheck` and `pnpm lint` exit 0.

- [ ] 10. **Home sections.** Depends on items 4, 8 and 9.
      Every section that hosts `AuroraBackground` has the classes `relative isolate` **[R3-7]**. The sections, per §7.1 and §8.3:
      - `hero-section.tsx`: the h1 is never `opacity:0`, has the sr-only word list, and the stats come from `pickStats`.
      - `hero-preview-stack.tsx`.
      - **[R3-3]** `tools-marquee.tsx` (client, pause state). Pinned markup:
        ```tsx
        <div data-marquee-track className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          <div className="animate-marquee flex w-max gap-3">            {/* row 1; row 2 adds [animation-direction:reverse] */}
            <ul className="flex flex-wrap gap-3">{chips}</ul>
            <ul aria-hidden data-marquee-dup className="flex flex-wrap gap-3">{chips}</ul>
          </div>
        </div>
        ```
        The Pause/Play button has `aria-pressed`, toggles `animation-play-state` on both rows, and carries `motion-reduce:hidden` and `data-reveal-js-only`. The section also contains the sr-only h2 "Tools you'll master".
      - `stats-section.tsx`, `bento-features.tsx` (tile (c) uses `.animate-border-sweep`), `course-card.tsx` (client, stretched link, spotlight/tilt, `import type { CourseCardData } from '@/data/course-types'`), `programs-section.tsx`.
      - `journey-section.tsx` (one-shot `Reveal` line using scaleX/scaleY), `career-outcomes-section.tsx`.
      - **[R3-2] [R3-8]** `testimonials-carousel.tsx` (client):
        - Props `{ items: TestimonialCard[] }`. The **only** data import is `import type { TestimonialCard } from '@/data/testimonials'`.
        - Embla setup: `{ loop: true, align: 'start' }`, viewport `<div ref={emblaRef} className="overflow-hidden" data-carousel-viewport>`, and slides with the §7.1 #8 aria attributes.
        - State:
          - `selectedIndex` (initial 0) and `snaps` (initial `[]`). An `onSync` callback updates them. It is subscribed to `select` and `reInit` and also called directly once after subscribing.
          - `liveText` is **separate** state, initialised to `''`. A distinct `onSelectAnnounce` handler, subscribed to `select` **only**, sets it to `Showing testimonial ${i+1} of ${items.length}`. The direct invocation never sets `liveText`.
        - Effect cleanup calls `api.off` for every handler.
        - Prev/next buttons, dots (one per snap, 44px hit area) and the live region carry `data-reveal-js-only`.
      - `faq-section.tsx`, `cta-band.tsx`.

      Files: the 13 section files above
      Verify: `pnpm typecheck` and `pnpm lint` exit 0. Lint passing proves that `testimonials-carousel.tsx` and `course-card.tsx` do not import `@/data/courses`.

- [ ] 11. **Course, about and contact sections.** Depends on items 3, 4 and 9.
      - `course-comparison.tsx`: a table (`hidden md:table`) plus stacked `<dl>` cards (`md:hidden`).
      - `course-hero.tsx`: `relative isolate` with a course-accent `AuroraBackground` **[R3-7]**, and the `syllabusNote`.
      - `course-detail-sections.tsx`: the 7 exports with their ids (§7.3).
      - `curriculum-accordion.tsx`: `type="multiple"`, first module open.
      - `enrol-card.tsx`: `id="enrol"`, sticky `top-24`. **[R3-7]** None of its ancestors may have overflow hidden. Check the course page wrappers too.
      - **[R3-5]** `mobile-enrol-bar.tsx` (client):
        - Props `{ feeLabel: string; href: \`/contact/?course=${CourseSlug}\` }`. `CourseSlug` comes via `import type` from `@/data/course-slugs`.
        - Render `null` until `useMounted()` is true, then render with `createPortal(…, document.body)`.
        - Inside an effect, observe `document.getElementById('enrol')` with IntersectionObserver. Skip this when IO is undefined. The IO callback toggles hidden state (`translate-y-full` + `inert`).
        - A separate DOM-only effect sets and cleans up `document.body.dataset.bottomBar`.
      - `contact-form.tsx` (client): per §12. `useForm<ContactFormInput, unknown, ContactInput>` with the honeypot, the counter, the live error summary and the `<noscript>` note. Include `<Suspense fallback={null}><CourseParamSync onCourse={…}/></Suspense>`.
      - `course-param-sync.tsx`: verbatim from §8.3.
      - `src/lib/contact-schema.ts` (verbatim from §12) and `src/lib/submit-enquiry.ts`.
      - `contact-info.tsx`, `map-card.tsx`, `values-grid.tsx`, `mentors-grid.tsx`, `about-story.tsx`, `approach-steps.tsx`.

      Files: the section files above, `src/lib/contact-schema.ts`, `src/lib/submit-enquiry.ts`
      Verify: `pnpm typecheck` and `pnpm lint` exit 0.

- [ ] 12. **The 6 pages.** Depends on items 10, 11 and item 13's `buildMetadata`. Implement `buildMetadata` in `lib/seo.ts` first, as the opening sub-step of this item.
      - `src/app/page.tsx` (Home, server):
        - Render the 10 sections in the §7.1 order.
        - `metadata = buildMetadata({ ...pageMeta.home, path: '/', absoluteTitle: true })` **[R3-6]**.
        - **[R3-2]** Build the carousel items on the server: `const items: TestimonialCard[] = testimonials.map(({ courseSlug, ...t }) => ({ ...t, program: getCourseBySlug(courseSlug)!.shortTitle }))`, then pass `<TestimonialsCarousel items={items} />`.
        - FAQPage JSON-LD.
      - `src/app/courses/page.tsx`: `buildMetadata({ ...pageMeta.courses, path: '/courses/' })` **[R3-6]**. Grid with `headingLevel="h2"` and `variant="detailed"`, then comparison, programs FAQ and CtaBand.
      - `src/app/courses/[slug]/page.tsx`:
        - `generateStaticParams`, `dynamicParams = false`, `await params`, `notFound()`.
        - `generateMetadata` from `course.seo`.
        - The 8/4 grid with the sticky EnrolCard.
        - **[R3-5]** `<MobileEnrolBar feeLabel={formatFee(course.fee)} href={`/contact/?course=${course.slug}`} />`.
        - Course FAQ, related cards, CtaBand, and Course + BreadcrumbList JSON-LD.
      - `src/app/about/page.tsx`: `pageMeta.about` **[R3-6]**, sections per §7.4, stats from `pickStats(['learners','sessions','partners','rating'])`.
      - `src/app/contact/page.tsx`: `pageMeta.contact` **[R3-6]**. `courseOptions` is built here from `courses` plus `not-sure`.
      - `src/app/not-found.tsx`: static `metadata` `{ title: 'Page not found', robots: { index: false, follow: true } }`.

      Files: the 6 page files above, `src/lib/seo.ts` (`buildMetadata`, `absoluteUrl`)
      Verify: `pnpm typecheck` and `pnpm lint` exit 0. `pnpm build` emits `out/index.html`, `out/courses/index.html`, the 3 `out/courses/<slug>/index.html` files, `out/about/index.html`, `out/contact/index.html` and `out/404.html`. The `<title>` in `out/index.html` equals `NSIM Education — AI-Powered Career Skills, Kolkata` with no doubled suffix.

- [ ] 13. **SEO: JSON-LD builders, sitemap, robots, manifest, icons, OG.** Depends on item 12.
      - Complete `src/lib/seo.ts` per §11:
        - `buildMetadata` (throws on a missing trailing slash; OG image `/og.png`).
        - `organizationJsonLd` (`sameAs` from `liveSocials`; phone and email omitted while they equal the placeholders).
        - `courseJsonLd` (provider with `@id`/`name`/`sameAs`, `inLanguage`, `hasCourseInstance`, conditional `offers` and `startDate`).
        - `breadcrumbJsonLd`, `faqJsonLd`.
      - Route files: `src/app/sitemap.ts` (7 URLs), `robots.ts`, `manifest.ts`. Each sets `dynamic = 'force-static'`.
      - `src/app/icon.svg`.
      - `src/app/og.png/route.tsx` and `src/app/apple-touch-icon.png/route.tsx`: `ImageResponse` from `next/og` at 1200×630 and 180×180 respectively, with `dynamic = 'force-static'`.

      Files: `src/lib/seo.ts`, `src/app/{sitemap,robots,manifest}.ts`, `src/app/icon.svg`, `src/app/og.png/route.tsx`, `src/app/apple-touch-icon.png/route.tsx`
      Verify: `pnpm build` succeeds. `out/og.png` and `out/apple-touch-icon.png` exist. `out/sitemap.xml` has 7 `<loc>` entries.

- [ ] 14. **Data and logic unit tests.** Depends on items 2–4, 6 and 13.
      Create these tests in `src/test/`, per §14:
      - `courses.test.ts`:
        - All §9.3 invariants.
        - **[R3-2]** Every `testimonials[*].courseSlug` resolves via `getCourseBySlug`, and the count per slug is exactly 2 for each of the 3 `COURSE_SLUGS`.
      - `faqs.test.ts`.
      - `home.test.ts`: include `about.ts`. **[R3-6]** Also assert:
        - `pageMeta` has the 4 keys, with the exact titles `'NSIM Education — AI-Powered Career Skills, Kolkata'`, `'Programs'`, `'About Us'` and `'Contact & Enquiries'`.
        - The home description is the given string.
        - Every description is 70–160 chars.
        - Titles for courses, about and contact are ≤ 42 chars.
      - `placeholders.test.ts`: 42 ids ↔ `src/data/**` ↔ `CONTENT.md`.
      - `contrast.test.ts`: uses culori, parses globals.css. If a pair fails, adjust lightness only and update the design.md §4.1 table.
      - `seo.test.ts`, `utils.test.ts`, `contact-schema.test.ts`.
      - `motion-inventory.test.ts`:
        - The set of `.animate-*` classes equals the 5 inventory classes, all of them appear in the reduced-motion selector list, and the finite animations complete in under 5s.
        - **[R3-3]** The reduced-motion block contains `width:auto` for `.animate-marquee` and `mask-image:none` for `[data-marquee-track]`. Normalise whitespace before matching.
      - `noscript-style.test.ts` **[R3-3]**:
        - `NOSCRIPT_CSS` contains exactly the **7** rules from item 2. Split on `}`, trim, and filter out empty entries; the length must be 7.
        - Assert the `.animate-marquee` rule includes `width:auto!important`.
        - Assert the `[data-marquee-track]{mask-image:none!important}` rule is present.

      Files: the 10 test files above
      Verify: `pnpm test` passes all of these tests.

- [ ] 15. **Component tests.** Depends on items 9–11.
      - `animated-counter.test.tsx`: mock `useReducedMotion` → true. Assert the final value renders, the sr-only text equals `srLabel`, and the visible number is `aria-hidden`.
      - `rotating-words.test.tsx`: fake timers. Assert exactly 3 changes at 1.4, 2.8 and 4.2s, then none after that, and none at all under reduced motion.
      - **[R3-8]** `testimonials-carousel.test.tsx`: mock `embla-carousel-react` so the test can control `on`/`off`/`scrollSnapList`/`selectedScrollSnap` and fire events.
        - Build `items: TestimonialCard[]` inline, 6 of them.
        - With no API: 6 slides render, there are 0 dots, and the live region is empty.
        - After the API mounts and the direct sync call runs, before any `select` event: the dots render, and the live region **is still `''`**.
        - After firing `select` with index 2: the matching dot has `aria-current="true"` and the live region reads "Showing testimonial 3 of 6".
        - The viewport has `overflow-hidden` and `data-carousel-viewport`, and the controls carry `data-reveal-js-only`.
      - `contact-form.test.tsx`: all §14 cases, including the three `CourseParamSync` cases (preselect, bogus value, and reset-after-submit leaves `course === ''`).
      - `tools-marquee.test.tsx` **[R3-3]**:
        - The track has `data-marquee-track`.
        - Each row has the classes `animate-marquee`, `flex` and `w-max`.
        - The first `<ul>` has `flex-wrap`, and the duplicate has `aria-hidden` and `data-marquee-dup`.
        - The Pause button toggles `aria-pressed`.

      Files: the 5 test files above
      Verify: `pnpm test` shows the full suite green.

- [ ] 16. **Export verifier.** Depends on item 13.
      Write `scripts/verify-export.mjs` (node built-ins only). It implements all 6 checks in §14 "Build verification":
      - File existence and the PNG signature.
      - The explicit list of 7 indexable pages: one h1, a title ≤ 60 chars and unique across pages, a description, a trailing-slash canonical, `og:title`, and an `og:image` that resolves to a file in `out/`. No `noindex`.
      - The 404 checks.
      - JSON-LD placement.
      - Sitemap with 7 URLs, plus robots.
      - No external runtime assets.
      - Gzipped JS for the home page ≤ 200 kB.

      Print each failure and exit 1 if there are any.
      Files: `scripts/verify-export.mjs`
      Verify: `pnpm build && pnpm verify` exits 0 and prints every check as passing.

- [ ] 17. **README and final verification.** Depends on all earlier items.
      - Write `README.md`: stack, scripts, the `NEXT_PUBLIC_SITE_URL` env var, the placeholder handover (pointing to CONTENT.md), and the §14 manual checklist with slots for results and Lighthouse scores.
      - Run the full gate: `pnpm install --frozen-lockfile && pnpm typecheck && pnpm lint && pnpm test && pnpm build && pnpm verify`.
      - Then serve with `npx serve out` and spot-check:
        - **[R3-1]** A footer link from the bottom of a long page lands at the top without an animated scroll. A same-page hash link still scrolls smoothly.
        - **[R3-7]** No horizontal scrollbar at 320, 375, 768, 1440 and 1920px, and the EnrolCard stays sticky on a course page at lg.
        - **[R3-3]** With OS reduced motion enabled, and again with JS disabled, the marquee shows a centred wrapped chip grid with no edge fade and no duplicates.
      - Record the results in README.
      - Confirm with `git grep -n "eslint-disable"` that there are no suppressions of `react-hooks` or `no-restricted-imports`.

      Files: `README.md`
      Verify: the full gate command exits 0.

---

## Round-3 finding → plan item map

| Finding | Lands in |
|---|---|
| R3-1 `data-scroll-behavior="smooth"` on `<html>` | item 8 (layout.tsx), check in items 8 and 17 |
| R3-2 `TestimonialCard` contract + server mapping + slug test | item 4 (testimonials.ts), item 10 (carousel), item 12 (home page), item 14 (courses.test) |
| R3-3 Marquee markup + 7-rule fallback CSS | item 2 (NOSCRIPT_CSS), item 6 (reduced-motion), item 10 (markup), items 14–15 (tests), item 17 (manual) |
| R3-4 `ui/sonner.tsx` is client + lint glob | item 5 (eslint), item 7 (sonner) |
| R3-5 `MobileEnrolBar` props | item 11 (component), item 12 (course page) |
| R3-6 `pageMeta` titles and descriptions | item 4 (site.ts), item 12 (pages), item 14 (home.test) |
| R3-7 Aurora overflow containment, no overflow on html/body/main | item 6 (CSS), item 8 (layout), items 9–11 (aurora + hosts + EnrolCard), item 17 (manual) |
| R3-8 Carousel live text separate, initialised `''` | item 10 (carousel), item 15 (test) |

Assumptions:
- Two of the three new page descriptions (courses, about, contact) are written by the implementer as original copy within 70–160 chars. The courses one above is only an example.
- `testimonials.ts` gains a named `Testimonial` interface. The design only gave its shape inline.
- `tools-marquee.test.tsx` is an addition to §14 that locks the R3-3 markup.
