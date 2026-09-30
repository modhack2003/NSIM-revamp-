# NSIM Education — Remastered Website: Requirements & Design

## 1. Summary

This is a new marketing site for NSIM Education, a professional-skills institute in Kolkata. It offers three live, online, short-term programs: AI-Powered Digital Marketing, Business Accounting & Finance (Tally, GST), and AI-Powered Prompt Engineering. The goal is a premium, modern edtech experience. It uses an aurora/gradient visual language, glassmorphism, and restrained but rich motion, and supports dark and light themes. It is fully static (`output: 'export'`), needs no backend, and is built mobile-first, accessible, and SEO-ready.

Project root: `/projects/sandbox/nsim-remastered` (greenfield; empty git repo). The live site is not fetched. All copy is original. Unknown facts are placeholders, enumerated in §10.

### Assumptions
- A1. Brand colours of the existing site are unknown. A new palette is defined (§4.1) and treated as a rebrand, not a match.
- A2. Durations, fees, batch dates, stats, testimonials, mentor names and contact details are unknown. All are placeholders tagged `PLACEHOLDER` in data files.
- A3. English only; currency INR (₹); locale `en-IN`.
- A4. The canonical site URL comes from `NEXT_PUBLIC_SITE_URL`, default `https://www.nsimeducation.com`.
- A5. Hosting is any static host serving `out/`. `trailingSlash: true` is used so `/courses/` resolves to `courses/index.html` on plain static servers.
- A6. The enquiry form submits nowhere (mock). A real endpoint is out of scope.
- A7. There are no raster brand assets. All imagery is generated SVG/CSS art or lucide icons. Tool "logos" are text + generic lucide icon chips only. The only PNGs are the OG image and apple-touch-icon, and both are generated at build (§11).
- A8. `next build` needs network access once, so `next/font/google` can download Bricolage Grotesque and Geist, which are then self-hosted in `out/`. If the build runs offline, the font download fails and the build fails. That failure is fatal and intended: the design does not ship system-font fallbacks.
- A9. Checked against a scratch Next 16.3.7 static export (not assumed): `opengraph-image.tsx` and `apple-icon.tsx` output PNGs **without a file extension** (`out/opengraph-image`), and plain static hosts serve those as `application/octet-stream`. Route handlers in folders named `og.png/` and `apple-touch-icon.png/` (`dynamic='force-static'`) output real `out/og.png` and `out/apple-touch-icon.png`. `useSearchParams` inside a `<Suspense>` child builds cleanly, and `not-found.tsx` outputs `out/404.html`.

---

## 2. Functional Requirements

- FR1. Routes: `/`, `/courses`, `/courses/[slug]` (exactly 3 slugs, statically generated), `/about`, `/contact`, and a custom 404.
- FR2. Shared layout: skip link, sticky blurred navbar (desktop links + "Enquire now" CTA + theme toggle), mobile drawer (below 768px), rich footer, floating Enquire button, toast host.
- FR3. Theme: light/dark/system with a toggle. The choice persists in localStorage and there is no flash of the wrong theme.
- FR4. Home page contains, in order: Hero, Tools marquee, Stats counters, Why-NSIM bento grid, Programs (course cards), Learning journey, Career outcomes, Testimonials carousel, FAQ, CTA band (§7.1).
- FR5. All course content (listing cards, detail pages, JSON-LD, sitemap entries, form course options, footer links) comes from `src/data/courses.ts` only.
- FR6. Course detail pages show overview, outcomes, tools, curriculum accordion, duration, mode, certification, fee placeholder, audience, career roles, course FAQ, related courses, and enrol CTA.
- FR7. The contact form is validated on the client with react-hook-form + zod. On valid submit it runs a mock async submission, shows a success toast, and resets. `?course=<slug>` preselects the course.
- FR8. SEO: per-page metadata, OpenGraph/Twitter tags, a generated OG image, JSON-LD (`EducationalOrganization` sitewide, `Course` per course page, `FAQPage` on home, `BreadcrumbList` on course pages), `sitemap.xml`, `robots.txt`.
- FR9. Motion: scroll-reveal, animated hero headline, animated counters, marquee, and card hover effects. All of it respects `prefers-reduced-motion`.

## 3. Non-Functional Requirements

- NFR1. Responsive at 375px, 768px and 1440px with no horizontal overflow at any width from 320px to 1920px.
- NFR2. Accessibility: WCAG 2.2 AA contrast; everything works with a keyboard; visible focus rings; semantic landmarks; one `h1` per page; no information conveyed only by motion or colour.
- NFR3. Performance: Lighthouse mobile scores of Performance ≥ 90 and Accessibility, Best Practices and SEO ≥ 95. CLS < 0.1. The LCP element (hero `h1`) is server-rendered and visible without JS.
- NFR4. `pnpm build` produces a complete static `out/` with no errors, and `pnpm typecheck`, `pnpm lint` and `pnpm test` pass.
- NFR5. No copyrighted third-party logos or images, and no hotlinked assets.

## 4. Visual Language

**Concept: "Aurora Lab".** The site should feel like a bright, focused studio for future skills. Deep ink backgrounds (dark) or soft paper (light) sit under slowly drifting aurora gradients, with a fine technical grid and film noise on top. Cards are frosted glass with hairline borders. Display type is large, heavy and tight. Motion is smooth and purposeful, never bouncy.

### 4.1 Palette (CSS variables, OKLCH, defined in `globals.css`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--background` | `oklch(0.985 0.004 270)` (paper) | `oklch(0.145 0.02 275)` (ink) | page bg |
| `--foreground` | `oklch(0.21 0.03 275)` | `oklch(0.97 0.005 270)` | body text |
| `--muted` | `oklch(0.955 0.008 270)` | `oklch(0.21 0.025 275)` | subtle surfaces |
| `--muted-foreground` | `oklch(0.47 0.03 275)` | `oklch(0.72 0.02 270)` | secondary text (≥4.5:1 on bg) |
| `--card` | `oklch(1 0 0 / 0.65)` | `oklch(0.22 0.03 275 / 0.55)` | glass card fill |
| `--border` | `oklch(0.21 0.03 275 / 0.10)` | `oklch(1 0 0 / 0.10)` | hairlines |
| `--primary` (Electric Violet) | `oklch(0.55 0.24 285)` | `oklch(0.68 0.2 285)` | CTAs, links, focus |
| `--primary-foreground` | `oklch(0.99 0 0)` | `oklch(0.14 0.02 275)` | text on primary |
| `--accent-cyan` | `oklch(0.62 0.14 215)` | `oklch(0.80 0.13 205)` | aurora, highlights |
| `--accent-amber` | `oklch(0.665 0.16 60)` | `oklch(0.82 0.15 75)` | badges ("New", "Live"), stars |
| `--accent-amber-foreground` | `oklch(0.21 0.03 275)` | `oklch(0.14 0.02 275)` | text on amber badges |
| `--accent-pink` | `oklch(0.62 0.22 350)` | `oklch(0.72 0.19 350)` | aurora only (decorative) |
| `--accent-emerald` | `oklch(0.58 0.13 165)` | `oklch(0.70 0.15 165)` | Accounting course accent |
| `--primary-2` | `oklch(0.50 0.23 300)` | `oklch(0.72 0.17 300)` | second stop of the `default` button gradient (`--primary → --primary-2`) |
| `--success` / `--destructive` | `oklch(0.54 0.15 150)` / `oklch(0.55 0.22 25)` | `oklch(0.75 0.15 150)` / `oklch(0.70 0.19 25)` | form states, toasts |
| `--ring` | = primary | = primary | focus ring |

Per-course accent (used on course cards and detail heroes): Digital Marketing = violet→pink (`--primary → --accent-pink`), Accounting = cyan→emerald (`--accent-cyan → --accent-emerald`), Prompt Engineering = amber→violet (`--accent-amber → --primary`). These are stored in course data as a `theme` key (§9), not as raw colours. `src/lib/course-theme.ts` exports `courseThemeClasses: Record<CourseTheme, { gradient: string; ring: string; glow: string }>`, a map to **static, complete** Tailwind class strings such as `'from-primary to-accent-pink'`. It must not build class names dynamically, because Tailwind v4 only emits classes it finds literally in source.

**Contrast pairs that must hold** (enforced by `src/test/contrast.test.ts`, §14): `foreground`/`background` ≥ 7:1; `muted-foreground` on `background`, `muted` and `card` (composited over `background`) ≥ 4.5:1; `primary-foreground` on `primary` and on `primary-2` ≥ 4.5:1; `accent-amber-foreground` on `accent-amber` ≥ 4.5:1; `primary` as link text on `background` ≥ 4.5:1; `destructive` and `success` text on `background` ≥ 4.5:1; every gradient-text stop (`primary`, `accent-cyan`, `accent-amber`, `accent-pink`, `accent-emerald`) on `background` ≥ 3:1. These apply in both themes. If a listed value fails, the implementer changes **lightness only** (hue and chroma stay the same) until the pair passes, and records the new value in the token table.

Gradient text (`.text-gradient`) uses `bg-clip-text` with a solid `color: var(--foreground)` fallback. It is only used on display sizes ≥ 30px, where AA large-text 3:1 applies. Each stop must meet 3:1 against the background in both themes.

The Tailwind v4 `@theme inline` block maps these variables to utilities (`bg-background`, `text-muted-foreground`, `border-border`, etc.). Dark mode is `@custom-variant dark (&:where(.dark, .dark *));`, driven by next-themes' `class` attribute.

### 4.2 Typography (next/font/google, self-hosted at build)

- Display: **Bricolage Grotesque** (variable, weights 600–800, `--font-display`). Used for h1–h3, stats, and the CTA band.
- Body/UI: **Geist** (`--font-sans`, weights 400–600).
- Mono labels/eyebrows: **Geist Mono** (`--font-mono`, 500). Used uppercase with letter-spacing 0.14em for eyebrows like "PROGRAMS".
- All fonts use `display: 'swap'` and subset `latin`. Only display and sans are preloaded; mono is `preload: false`.
- Scale (fluid with `clamp`): h1 `clamp(2.5rem, 6vw + 1rem, 5.5rem)` with leading 0.95 and tracking −0.03em; h2 `clamp(2rem, 3vw + 1rem, 3.5rem)`; h3 1.5rem; body 1rem/1.65 (lg 1.125rem on hero sub); small 0.875rem. Body text measure is at most 65ch.

### 4.3 Spacing, layout, shape

- 4px base (Tailwind default). Section vertical padding is `py-20 md:py-28 lg:py-32`.
- `Container`: `max-w-7xl` (1280px) with `px-5 md:px-8`. Narrow text container is `max-w-3xl`.
- Radius tokens: `--radius: 1rem` (cards). Buttons are `rounded-full`, inputs `rounded-xl`, bento tiles `rounded-3xl`.
- Grid: 4 columns at mobile, 8 at md, 12 at lg for bento. Standard card grids are 1 / 2 / 3 columns.
- Elevation is expressed with glass (`backdrop-blur-xl`, `bg-card`, `border-border`) plus a soft coloured shadow on hover (`shadow-[0_20px_60px_-20px_var(--primary)]` at 30% opacity). There are no heavy grey drop shadows.

### 4.4 Backgrounds (pure CSS/SVG, no images)

- **Aurora** (`AuroraBackground`): 3–4 absolutely positioned blurred radial-gradient blobs (violet, cyan, pink, amber) with `filter: blur(80px)`. They drift via a CSS `@keyframes aurora` over 18–26s, alternate, and move only via `transform` (GPU). Light theme uses lower opacity (0.35 vs 0.6).
- **Grid** (`GridPattern`): a `linear-gradient` 1px grid at 48px, masked with `radial-gradient` so it fades at the edges. Opacity is 0.06 in light and 0.08 in dark.
- **Noise** (`NoiseOverlay`): an inline SVG `feTurbulence` data-URI as `background-image` at 4% opacity with `pointer-events-none`. It is rendered once in the root layout as a fixed layer.
- **Spotlight** on course cards: a radial gradient that follows the pointer via CSS variables `--mx/--my`, set in a `pointermove` handler. On touch devices the card shows a static centred glow.

### 4.5 Motion principles

- Library: **`motion`** (`import { motion } from 'motion/react'`). Durations are 0.2s for micro interactions, 0.5–0.7s for reveals and 0.8s for the hero. Ease is `[0.22, 1, 0.36, 1]` (easeOutQuint-like). Springs are used only for the navbar pill indicator (stiffness 400, damping 35).
- Reveal pattern (`Reveal`, `Stagger`): fade + `y: 24 → 0`, `whileInView`, `viewport={{ once: true, margin: '-10% 0px' }}`, stagger 0.08s.
- Only `transform` and `opacity` are animated. No layout-thrashing properties are animated.
- **LCP rule:** the hero `h1` container is never initially `opacity: 0`. Only the rotating word and decorative elements animate in. The h1 base text is visible in the SSR HTML. `PageHeader` h1s and `CourseHero` h1s are never wrapped in `Reveal` either.
- **No-JS rule:** `Reveal`/`StaggerItem` add `data-reveal` to their element. The root layout `<head>` renders a single `<noscript><style>{NOSCRIPT_CSS}</style></noscript>`. `NOSCRIPT_CSS` comes from `src/lib/noscript-css.ts`, and its full content is:
  ```css
  [data-reveal]{opacity:1!important;transform:none!important}
  [data-carousel-viewport]{overflow-x:auto!important;scroll-snap-type:x mandatory}
  [data-carousel-viewport]>*>*{scroll-snap-align:start}
  [data-reveal-js-only]{display:none!important}
  .animate-marquee{animation:none!important;transform:none!important;width:auto!important;flex-wrap:wrap;justify-content:center}
  [data-marquee-track]{mask-image:none!important}
  [data-marquee-dup]{display:none!important}
  ```
  (7 rules — round-3 review #3.)
  Line 1 keeps content that motion server-renders with `opacity:0` visible when JS is off. Lines 2–3 turn the Embla viewport into a native scroll-snap row (§7.1 #8). Line 4 hides controls that only work with JS (the carousel prev/next buttons, dots and live region, and the marquee Pause button). Lines 5–6 stop the marquee without JS. Without JS its Pause button can't work, so the infinite marquee would otherwise break WCAG 2.2.2; with those lines it renders as the same static wrapped row as under reduced motion. This is the **only** no-JS switching mechanism, and no component detects JS through React state. `<noscript>` applies only when scripting is disabled. The case where JS is enabled but the bundle fails to load is not handled; that is an accepted limitation.
- **Auto-moving content policy (WCAG 2.2.2 Pause, Stop, Hide).** Every motion that starts on its own must fit one of these rules:
  - It finishes within 5s.
  - It has a visible pause control.
  - It is decorative ambient background. That means it carries no information, sits behind content at ≤ 0.6 opacity, drifts at most ~40px per cycle, and stops under reduced motion.

  How each motion applies the rules:
  - `RotatingWords` makes a single pass: swaps start at 1.4s (word 2), 2.8s (word 3) and 4.2s (back to word 1), each with a 0.4s transition, so all motion ends by 4.6s. It then stops for good and ends on the same word the server rendered. Timers are `setTimeout`s created in an effect and cleared on unmount. The word index is updated from the timer callback (not synchronously in the effect body), which satisfies `react-hooks/set-state-in-effect`.
  - The marquee runs infinitely, so it gets a visible Pause/Play icon button (`aria-pressed`, label "Pause tool ticker"/"Play tool ticker"). The button toggles `animation-play-state` on both rows. Under reduced motion the rows are static, so the button carries `motion-reduce:hidden` and is not rendered visibly or reachable (Tailwind's `motion-reduce:hidden` sets `display:none`, which also removes it from the tab order).
  - Pulsing dots, LIVE badges, hero card bobbing and the bento (c) border sweep run 3 iterations each and finish within 5s.
  - The aurora drift is the only infinite animation without a control. It meets the decorative-ambient rule.

  **Auto-running CSS animation inventory (exhaustive).** No other `animation:` or `@keyframes` may be added to `globals.css` without a row here. Accordion open/close (keyframes `accordion-down/up`, applied through `[data-state]` selectors, never an `.animate-*` class) and motion-driven reveals are user- or scroll-triggered one-shots, so they are not listed.

  | Class (globals.css) | Keyframes | Used by | Timing | Policy rule | Reduced motion |
  |---|---|---|---|---|---|
  | `.animate-aurora` | `aurora` (translate ≤ 40px + scale ≤ 1.1) | `AuroraBackground` blobs | 18s / 22s / 26s per blob, ease-in-out, alternate, infinite | decorative ambient | `animation:none` |
  | `.animate-marquee` | `marquee` (translateX 0 → −50%) | `ToolsMarquee` rows | 40s linear infinite (row 2 `animation-direction: reverse`) | pause control | `animation:none` + rows wrap, duplicate hidden |
  | `.animate-pulse-3` | `pulse-dot` (scale 1 → 1.35, opacity 1 → 0.6) | hero eyebrow dot, bento (a) LIVE badge | 1.2s ease-in-out × 3 (3.6s) | ends < 5s | `animation:none` |
  | `.animate-bob-3` | `bob` (translateY 0 → −8px → 0) | `HeroPreviewStack` cards (delays 0s / 0.15s / 0.3s) | 1.5s ease-in-out × 3 (last card ends at 4.8s) | ends < 5s | `animation:none` |
  | `.animate-border-sweep` | `border-sweep` (rotate 0 → 360deg). The animation is declared on `.animate-border-sweep::before` (the conic-gradient layer), and the tile itself doesn't move | bento (c) border | 1.5s linear × 3 (4.5s) | ends < 5s | `animation:none` |
- Hover: course cards tilt at most 6° (pointer-fine only, `@media (hover:hover) and (pointer:fine)`), lift −4px, show a spotlight, and the arrow icon slides 4px.
- Marquee: CSS `@keyframes marquee` translating −50% over 40s, linear, infinite. Content is duplicated (the duplicate is `aria-hidden`). It pauses on hover and focus-within.
- **Reduced-motion strategy** (three layers):
  1. `<MotionConfig reducedMotion="user">` in `Providers` makes motion drop transform animations while keeping opacity fades.
  2. One global `prefers-reduced-motion` media query, derived from the inventory table above: `@media (prefers-reduced-motion: reduce){.animate-aurora,.animate-marquee,.animate-pulse-3,.animate-bob-3,.animate-border-sweep,.animate-border-sweep::before{animation:none!important}html{scroll-behavior:auto}}`. `RotatingWords` has no caret. The marquee becomes a static wrapped chip row through a second rule in the same media query: `.animate-marquee{animation:none!important;transform:none!important;width:auto!important;flex-wrap:wrap;justify-content:center}[data-marquee-track]{mask-image:none!important}[data-marquee-dup]{display:none!important}` (round-3 review #3).
  3. Components that animate values (`AnimatedCounter`, `RotatingWords`) call `useReducedMotion()`. When it is true they render the final value / first word statically with no timers.
- **Hydration-safe client capability checks (lint rule `react-hooks/set-state-in-effect` is an error in `eslint-config-next@16`; it must not be disabled).** No component calls `setState` synchronously inside a `useEffect` body. "Is mounted" and "has IntersectionObserver" checks go through `src/lib/use-mounted.ts`:
  ```ts
  import { useSyncExternalStore } from 'react';
  const noopSubscribe = () => () => {};
  /** false during SSR and hydration, true afterwards. */
  export const useMounted = () => useSyncExternalStore(noopSubscribe, () => true, () => false);
  /** Server snapshot is true so SSR and hydration markup match; false only on clients without IO. */
  export const useHasIO = () =>
    useSyncExternalStore(noopSubscribe, () => typeof IntersectionObserver !== 'undefined', () => true);
  ```
  Consumers: `ThemeToggle` (`useMounted`), `MobileEnrolBar` (`useMounted`, portal, §7.3), `Reveal`/`StaggerItem` (`useHasIO`; when false they replace `whileInView` with `animate` set to the visible variant, so children become visible right after hydration without needing IO). Values that change over time (counter text) are written to DOM refs by `animate()` callbacks, not React state.
- Smooth scroll: **Lenis is not used** (decision in §13). Native `scroll-behavior: smooth` is applied on `html` under `prefers-reduced-motion: no-preference` only. `<html>` carries `data-scroll-behavior="smooth"` so Next 16 temporarily forces `auto` during route transitions. Smooth scrolling applies only to same-page hash jumps.

---

## 5. Technology Stack (locked)

| Concern | Choice | Version (at authoring) |
|---|---|---|
| Runtime | Node 22 | 22.x |
| Package manager | **pnpm** | 11.x |
| Framework | Next.js App Router, `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }` | `next@16.3.x` |
| UI runtime | React / React DOM | `^19.2` (the minimum, because `useEffectEvent` is used, §8.3) |
| Language | TypeScript strict | `typescript@~5.9.3` (not 7.x: the native-compiler major is too new for the Next type-check toolchain) |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss`, CSS-first config in `src/app/globals.css` | `tailwindcss@4.3.x` |
| Class utils | `clsx` + `tailwind-merge` (`cn()`), `class-variance-authority` for variants | latest |
| Primitives | `radix-ui` (unified package): Accordion, Dialog (drawer), Slot, Label, VisuallyHidden | `radix-ui@1.x` |
| Icons | `lucide-react` | latest |
| Animation | `motion` (`motion/react`) | `13.x` |
| Theme | `next-themes` (`attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`) | `0.4.x` |
| Carousel | `embla-carousel-react` | `8.x` |
| Forms | `react-hook-form` + `zod` v4 + `@hookform/resolvers` v5 (`zodResolver`) | 7.x / 4.x / 5.x |
| Toasts | `sonner` | `2.x` |
| Lint | ESLint flat config + `eslint-config-next` (same version as next) | — |
| Unit tests | `vitest` + `@testing-library/react` + `@testing-library/user-event` + `jsdom` + `@vitejs/plugin-react` + `vite-tsconfig-paths` | latest |
| Colour maths (tests only) | `culori` (devDependency) | `4.x` |

shadcn/ui-style primitives are **hand-authored** in `src/components/ui`, following shadcn source conventions (cva variants, `data-slot`, `asChild` via Slot). The shadcn CLI is not run, because it is interactive and would add a `components.json` we don't need.

Scripts (`package.json`): `dev`, `build` (`next build`, emits `out/`), `start` (`npx serve out`), `lint` (`eslint .`), `typecheck` (`tsc --noEmit`), `test` (`vitest run`), `verify` (`node scripts/verify-export.mjs`, §12).

---

## 6. Code Organization

```
nsim-remastered/
  next.config.ts            output:'export', trailingSlash:true, images.unoptimized:true, reactStrictMode
  postcss.config.mjs        { plugins: { '@tailwindcss/postcss': {} } }
  eslint.config.mjs, tsconfig.json (paths "@/*" -> "src/*"), vitest.config.ts
  scripts/verify-export.mjs
  public/                   (empty; no committed binary assets)
  src/
    app/
      layout.tsx            fonts, <html suppressHydrationWarning>, Providers, SkipLink, Navbar, <main id="main">, Footer, FloatingEnquire, Toaster, Org JSON-LD
      page.tsx              Home
      globals.css           tokens, @theme, keyframes, reduced-motion rules, utilities (.glass, .text-gradient)
      not-found.tsx
      og.png/route.tsx      GET → next/og ImageResponse 1200x630, dynamic='force-static' → out/og.png (A9)
      apple-touch-icon.png/route.tsx  GET → ImageResponse 180x180 monogram → out/apple-touch-icon.png
      icon.svg              monogram "N" gradient (file convention; emitted as /icon.svg, has extension)
      sitemap.ts, robots.ts, manifest.ts (each export const dynamic = 'force-static')
      courses/page.tsx
      courses/[slug]/page.tsx   generateStaticParams, dynamicParams=false, generateMetadata
      about/page.tsx
      contact/page.tsx
    components/
      ui/        (see §8.1)
      layout/    (see §8.2)
      sections/  (see §8.3)
    data/
      course-slugs.ts  COURSE_SLUGS tuple + CourseSlug type (tiny; safe to import from client code)
      icon-keys.ts     ICON_KEYS tuple + IconKey type
      course-types.ts  type-only module: Course, CourseCardData, CurriculumModule, CourseTheme, CourseCategory, CourseLevel (no runtime values; client-safe)
      courses.ts       single source of course content + helpers; re-exports the types from course-types.ts
      site.ts          siteConfig: name, tagline, contact, socials, nav links (placeholders)
      home.ts          stats, bento features, journey steps, career outcomes
      testimonials.ts
      faqs.ts          general FAQs (course FAQs live in courses.ts)
      tools.ts         marquee tool chips
      about.ts         story, values, mentors
    lib/
      utils.ts         cn(), formatINR(), formatFee(), formatNextBatch(), normalizePath()
      course-theme.ts  CourseTheme → static Tailwind class strings (§4.1)
      submit-enquiry.ts mock submitEnquiry()
      seo.ts           buildMetadata(), absoluteUrl(), jsonLd builders (organization, course, faq, breadcrumb)
      motion.ts        shared variants/easings
      use-mounted.ts   useMounted(), useHasIO() via useSyncExternalStore (§4.5)
      contact-schema.ts zod schema + types
      noscript-css.ts  export const NOSCRIPT_CSS (the 6 rules in §4.5), rendered by layout.tsx in <noscript><style>
    test/            *.test.ts(x)
```

Server vs client: pages and most sections are **Server Components**. `'use client'` appears only in leaf components that need state, effects or motion: `Reveal`, `Stagger`, `RotatingWords`, `AnimatedCounter`, `CourseCard` (spotlight/tilt), `ToolsMarquee` (pause state), `TestimonialsCarousel`, `ThemeToggle`, `Navbar` (scroll state), `MobileNav`, `FloatingEnquire`, `MobileEnrolBar`, `ContactForm`, `CourseParamSync`, `Providers`, and the `Accordion` wrapper (Radix needs a client boundary). Server sections pass plain serialisable data into these client leaves. Icons are passed as string keys, not components (see §9).

**Client import rule:** client components must not import `src/data/courses.ts`, so the full curriculum text stays out of client bundles. They receive the data as props:
- The root layout passes `courseLinks: { href, label }[]` to `Navbar`/`MobileNav`.
- `contact/page.tsx` passes `courseOptions` to `ContactForm`.
- `contact-schema.ts` imports only `course-slugs.ts`.
- Client files that need course **types** (e.g. `course-card.tsx` needs `CourseCardData`) import them with `import type` from `@/data/course-types`, never from `@/data/courses`.

ESLint enforces this with core `no-restricted-imports` (`patterns: [{ group: ['@/data/courses', '**/data/courses'], message: 'Client components receive course data as props; import types from @/data/course-types' }]`). Core `no-restricted-imports` also blocks `import type`, which is why the types live in a separate module. Because ESLint cannot see directives per file, the rule is applied through an override listing the client files: `src/components/layout/{navbar,mobile-nav,floating-enquire,theme-toggle,providers}.tsx`, `src/components/sections/{contact-form,course-param-sync,mobile-enrol-bar,tools-marquee,testimonials-carousel,course-card,rotating-words,animated-counter,reveal}.tsx`, `src/components/ui/accordion.tsx`. The pattern `**/data/courses` matches only the exact module, so `course-types` and `course-slugs` stay importable.

**Path normalisation:** `usePathname()` can return paths with or without a trailing slash. Every pathname comparison (active nav link, hiding FloatingEnquire on contact) goes through `normalizePath(p) = p === '/' ? '/' : p.replace(/\/+$/, '')`.

---

## 7. Page Specifications

Every indexable page exports `metadata` or `generateMetadata` via `buildMetadata({ title, description, path, absoluteTitle? })`. The root layout sets `title: { template: '%s | NSIM Education', default: 'NSIM Education' }`. The home page passes `absoluteTitle: true`, so `buildMetadata` emits `title: { absolute: 'NSIM Education — AI-Powered Career Skills, Kolkata' }` and the suffix is not appended twice. All other titles go through the template. Page titles (the `%s` part) and `course.seo.title` are therefore capped at 42 chars, so the final `<title>` is ≤ 60 chars (enforced for courses by `courses.test.ts`). The 404 page does not use `buildMetadata` (§7.6).

### 7.1 `/` Home

1. **Hero** (`HeroSection`). Full-bleed with `AuroraBackground` + `GridPattern`. Min height `min-h-[92svh]` on desktop, content-height on mobile.
   - Eyebrow pill: "● Live online batches · Enrolling now [P-10]". The amber dot pulses 3 times and is static under reduced motion. All hero copy (eyebrow, sub copy, CTA labels, rotating words) lives in `home.ts` → `hero`.
   - h1 (two lines, **one** `<h1>` element): `<h1><span>Build a career in</span> <span className="sr-only">AI digital marketing, prompt engineering and accounting</span><RotatingWords aria-hidden words={home.hero.rotatingWords} /></h1>`. The words are `['AI Digital Marketing','Prompt Engineering','Accounting & GST']`. On the server the component renders the first word. On the client it makes one pass (§4.5) with a vertical mask slide and gradient text. It reserves the width of the longest word (an invisible sizer span) so the swap causes no CLS.
   - Sub copy (original): "Live, mentor-led programs that turn curiosity into job-ready skills — with real projects, industry tools and placement support from day one."
   - CTAs: primary "Explore programs" → `/courses/`; secondary glass button "Book a free counselling call" → `/contact/`.
   - Trust row: avatar stack of 4 gradient-initial circles (`aria-hidden`) + "Trusted by 5,000+ learners [P-01]" + rating "4.8/5 [P-02]" with stars (stars `aria-hidden`; the text "4.8 out of 5" is sr-only). Both numbers are read from `home.ts` `stats`, looked up by id (`learners`, `rating`), and are **not** hardcoded again.
   - Right column (lg only): `HeroPreviewStack` (`items = courses.map(toCardData)`), a floating "Course preview" glass card stack, `aria-hidden` as a whole (the same courses appear as real links in Programs). Three tilted mini cards, one per course, each with its icon, title and duration, bobbing gently (CSS, disabled with reduced motion). Below lg this is hidden (`hidden lg:block`) to protect mobile LCP.
2. **Tools marquee** (`ToolsMarquee`, client because of the pause state). Heading (sr-only h2 "Tools you'll master") with a visible caption "Hands-on with the tools employers use" and the Pause/Play button (§4.5) aligned right. Two rows scroll in opposite directions. Chips are `ui/chip` (glass, lucide icon + text), taken from `tools` where `marqueeRow` is set (§9.3). The first copy of each row is a `<ul>` that screen readers read. The duplicate is `aria-hidden` and carries `data-marquee-dup`. It is never focusable, because chips are not interactive. The Pause/Play button carries both `motion-reduce:hidden` and `data-reveal-js-only`. Edge fade mask.
3. **Stats** (`StatsSection`, props `{ items: Stat[] }`). Four `AnimatedCounter` tiles (`srLabel={stat.srLabel}`) from `home.ts` `stats`: 5,000+ learners [P-01], 100% placement assistance [P-11], 50+ hiring partners [P-03], 4.8★ rating [P-02]. Each has its visible `label` beneath, rendered `aria-hidden` (screen readers get `srLabel` from the counter). Grid is 2×2 on mobile and 4 across on lg.
4. **Why NSIM bento** (`BentoFeatures`). h2 "Everything you need to get hired, not just certified". 12-col bento with six tiles:
   - (a) Live expert-led sessions (large, 7 cols; mock "live class" UI in CSS with a pulsing LIVE badge)
   - (b) Real-world projects (5 cols)
   - (c) AI-first curriculum (4 cols; gradient border sweep: `.animate-border-sweep`, a rotating conic-gradient pseudo-element behind a 1px inset mask, 1.5s × 3 iterations, then static. See the §4.5 motion table)
   - (d) Industry certification (4 cols; `CertificateArt`)
   - (e) 100% placement assistance (4 cols)
   - (f) Flexible schedules + recordings (12 cols thin strip)
   Tile titles, descriptions and icons come from `home.ts` `bentoFeatures` (ids `live, projects, ai, cert, placement, flexible`, rendered in that order; the claims are placeholder P-13 / P-11). The decorative mock UIs per tile are fixed markup in `bento-features.tsx`, selected by `id`. Mobile: a single column. md: 2 columns.
5. **Programs** (`ProgramsSection`). h2 "Three programs. One goal: your next role." Three `CourseCard`s from `courses`, then a link "Compare all programs →" `/courses/`.
6. **Learning journey** (`JourneySection`, props `{ steps: JourneyStep[] }` from `home.ts` `journeySteps`). Four numbered steps in an `<ol>`: Counselling → Live learning → Projects & portfolio → Placement support. Horizontal timeline on lg, vertical on mobile. A connecting gradient line draws in once when it enters view. It is **not** scroll-linked (no `useScroll`). The line is a client `Reveal` element (so it carries `data-reveal`) with custom variants `{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }` on lg and `scaleY` below lg (two elements toggled by `hidden lg:block` / `lg:hidden`), `origin-left`/`origin-top`, `whileInView` with `viewport={{ once: true }}`, 0.7s easeOut. `JourneySection` stays a server component that renders this `Reveal` child. Without JS, the noscript rule's `transform:none!important` shows the line fully. Under reduced motion, `MotionConfig reducedMotion="user"` skips the transform, so the line appears drawn.
7. **Career outcomes** (`CareerOutcomesSection`). Left: copy + checklist of placement support (resume review, mock interviews, job referrals, LinkedIn optimisation). Right: a grid of role chips aggregated from all courses' `careerRoles` (deduplicated) plus a glass "Placement support" card. No salary figures are shown (avoids unverifiable claims).
8. **Testimonials** (`TestimonialsCarousel`). Embla carousel with loop and `align: 'start'`: 1 slide per view on mobile, 2 on md, 3 on lg. Prev/next buttons (with aria-labels "Previous testimonials"/"Next testimonials") and one dot button per **snap** (`emblaApi.scrollSnapList()`, not per slide), each with `aria-label="Go to slide n"` and `aria-current="true"` on the active one. An sr-only `aria-live="polite"` element announces "Showing testimonial n of N" on `select`. Slides contain **no focusable elements**, so tabbing never scrolls the carousel unexpectedly. There is **no autoplay**. Markup: the viewport is `<div ref={emblaRef} className="overflow-hidden" data-carousel-viewport>` (Embla requires `overflow: hidden` and moves the container with `transform`), the container is `<div className="flex">`, and each slide is `min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3`. The no-JS fallback uses the root layout's noscript style (§4.5), not React state: it sets `overflow-x:auto` + `scroll-snap-type:x mandatory` on `[data-carousel-viewport]` and `scroll-snap-align:start` on the slides, so without JS the row scrolls natively and all slides are readable. With JS, the noscript style never applies, so native scroll and Embla never compete. The prev/next buttons, the dots and the live region carry `data-reveal-js-only` and are hidden by the same noscript style, because they do nothing without JS. `selectedIndex` (initial `0`) and `snaps` (initial `[]`) are React state updated **only** inside Embla `api.on('select')` / `api.on('reInit')` callbacks (plus one direct invocation of the same callback after subscribing). There is no synchronous `setState` in the effect body, and the effect cleanup calls `api.off(...)`. Before Embla initialises, the dot list renders nothing because `snaps` is `[]`. The accessible rating is text ("Rated 5 out of 5"), and the star icons are `aria-hidden`. Region has `aria-roledescription="carousel"` and each slide `role="group" aria-roledescription="slide" aria-label="n of N"`. Each card shows quote, name, program, role and an initial avatar. Uses 6 testimonials [P-20..P-25].
9. **FAQ** (`FaqSection`, props `{ items: FaqItem[]; heading?: string }`). Shows the FAQs from `faqs.ts` tagged `'home'` (exactly 7) in a single-open Radix Accordion (`type="single" collapsible`). `FAQPage` JSON-LD is emitted from the same array on **home only**. `/courses/`, course pages and `/contact/` do not emit FAQPage, so no two pages carry duplicate FAQ structured data.
10. **CTA band** (`CtaBand`, no props; reads `home.ts` `ctaBand` and `siteConfig`). A rounded-3xl gradient panel with aurora. h2 from `ctaBand.heading` ("Your next career move starts with one conversation."), sub from `ctaBand.sub`. CTAs: "Enquire now" → `/contact/`, and "Call us" → `siteConfig.phoneHref` [P-30].

### 7.2 `/courses`
1. `PageHeader`: eyebrow "PROGRAMS", h1 "Programs built for the AI-first workplace", sub copy, breadcrumb.
2. Grid of 3 `CourseCard` (variant `detailed`: adds a highlights list and meta row).
3. `CourseComparison`: a real `<table>` with a `<caption>` (sr-only "Program comparison"), `<th scope="col">` per course and `<th scope="row">` per attribute. There is one column per course, and the rows are all derived from `courses.ts`:
   - Duration: `duration`
   - Mode: `mode`
   - Level: `level`
   - Language: `language`
   - Certification: `certification.title`
   - Projects: `` `${projects.length} hands-on projects` ``
   - Placement assistance: the constant "Included" from `home.ts`, P-11
   - Fee: `formatFee(fee)`

   Below md it renders as stacked cards instead, one `<dl>` per course with the same data. Both markups are in the HTML and toggled with `hidden md:table` / `md:hidden`, so no JS is needed.
4. `FaqSection` with the FAQs tagged `'programs'` (3–5).
5. `CtaBand`.

### 7.3 `/courses/[slug]`
`generateStaticParams` returns `courses.map(c => ({ slug: c.slug }))` and `dynamicParams = false`. Params are a Promise in Next 16: `const { slug } = await params`. `getCourseBySlug(slug)`, and if it is missing, `notFound()`.
1. `CourseHero`: breadcrumb (Home / Programs / Title), category badge, h1 title, tagline, meta chips (Duration, Mode "Live online", Level, Certificate). CTAs: primary "Enrol now" → `/contact/?course=<slug>`, and secondary "Talk to a counsellor" → `/contact/?course=<slug>`. There is **no** syllabus button. A disabled control gives nothing to act on and confuses screen-reader users. Instead a muted non-interactive note, `syllabusNote` from `courses.ts` ("Detailed syllabus PDF: coming soon" [P-40]), sits under the CTAs. Uses the course accent aurora.
2. Two-column layout on lg: main content (8 cols) with a sticky `EnrolCard` sidebar (4 cols, `top-24`). On mobile the EnrolCard appears after the overview. Below lg, a fixed bottom mini-bar (`MobileEnrolBar`, height 64px + safe-area inset) shows "`formatFee(fee)`" + an "Enrol now" link. Its behaviour:
   - It is hidden (`translate-y-full` plus `inert`) while the in-page EnrolCard (`id="enrol"`) is intersecting, detected by IntersectionObserver.
   - While mounted it sets `document.body.dataset.bottomBar = 'true'` and removes it on unmount. Global CSS below lg then applies `body[data-bottom-bar] { padding-bottom: 80px }` and lifts `.floating-enquire` by 80px, so neither element covers the footer or the other.
   - It is **not** a landmark and holds no heading. Because the root layout wraps page output in `<main id="main">`, the page cannot place it after `<main>` directly. `MobileEnrolBar` therefore returns `null` until `useMounted()` (§4.5) is true, then renders `createPortal(bar, document.body)`, which appends it at the end of `body`, after the footer. On the server and without JS it renders nothing; the in-page `EnrolCard` still provides the fee and enrol link. The `data-bottom-bar` attribute is set in an effect that performs DOM mutation only (no React state), and removed in its cleanup.
   - Main content, in order, rendered from `course-detail-sections.tsx` (each section is an `<section aria-labelledby>` with an `h2` and a fixed `id`): `CourseOverview` (`#overview`, paragraphs); `CourseOutcomes` (`#outcomes`, "What you'll learn", 2-column checklist); `CourseTools` (`#tools`, `Chip`s via `toolById`); **Curriculum** (`CurriculumAccordion`, `#curriculum`, `type="multiple"`, `defaultValue={[curriculum[0].id]}`, each module trigger shows `Module 01`, title, and "`duration` · `lessons` lessons", and the panel shows `summary` and a topics list); `CourseProjects` (`#projects`); `CourseAudience` (`#audience`, "Who it's for", 3 cards); `CourseCertification` (`#certification`, card with `CertificateArt` + `certification.title` + `description`); `CourseCareerRoles` (`#career-roles`, `Chip`s).
   - `EnrolCard` (`id="enrol"`): `formatFee(fee)` with `fee.note` [P-41], `formatNextBatch(nextBatch)` [P-42], duration, mode, schedule [P-43], `includes` list, primary "Enrol now", secondary "Talk to a counsellor". There is no visible word "placeholder" in the UI. Placeholder status is tracked only in code comments and `CONTENT.md`.
3. Course FAQ (course's own `faqs`).
4. Related programs: the other 2 courses as compact `CourseCard`s.
5. `CtaBand`.
JSON-LD: `Course` + `BreadcrumbList`.

### 7.4 `/about`
1. `PageHeader`: h1 "We teach the skills the market is hiring for."
2. Story: a two-column layout of copy plus a stylised SVG "Kolkata" skyline/abstract art card. Includes a founded year [P-50].
3. Mission & values (`ValuesGrid`, `about.ts` `values`): 4 glass cards (Practical first, AI-native, Mentor-led, Outcome-obsessed).
4. Stats row: `StatsSection items={pickStats(['learners','sessions','partners','rating'])}`.
5. Teaching approach (`ApproachSteps steps={approach}`): 3 steps in an `<ol>` (Learn live → Build → Get placed).
6. Mentors: 4 cards with initial avatars, placeholder names, roles and years of experience [P-51..P-54].
7. `CtaBand`.

### 7.5 `/contact`
1. `PageHeader`: h1 "Let's plan your next step."
2. Two columns on lg:
   - Left: `ContactForm` (glass card).
   - Right: contact info cards (Phone [P-30], WhatsApp [P-31], Email [P-32], Address [P-33], Hours [P-34]) with `tel:`/`mailto:`/`wa.me` links, plus a stylised map placeholder card (SVG grid with pin and "Kolkata, West Bengal"; no iframe, no third-party requests).
3. Mini FAQ (FAQs tagged `'enquiry'`, exactly 3).

**Static-export handling of `?course=`:** The page is prerendered once, with no query string. The `ContactForm` itself does **not** call `useSearchParams()`, so the whole form is server-rendered into `out/contact/index.html`. Inside the form, a render-nothing child `<CourseParamSync onCourse={(slug) => …} />` wrapped in `<Suspense fallback={null}>` calls `useSearchParams()`. Next only bails out to client rendering up to that boundary, and this was checked in a scratch build (A9). It reads `course` and fires once per distinct param value (implementation fixed in §8.3; the `useEffectEvent` wrapper means it does not re-fire after re-renders or `reset`). If the value is in `COURSE_SLUGS` **and** the `course` field is not dirty, it calls `setValue('course', slug, { shouldValidate: false })`. There is no layout shift, because the select already exists. Course options (`{ value: slug, label: title }[]` plus `{ value: 'not-sure', label: "Not sure yet — help me choose" }`) are built in `contact/page.tsx` (server) from `courses.ts` and passed as a prop.

### 7.6 404 (`not-found.tsx`)
A large decorative gradient "404" (`aria-hidden`), one `h1` "This page skipped class.", and links to Home (`/`) and Programs (`/courses/`). Metadata: `export const metadata: Metadata = { title: 'Page not found', robots: { index: false, follow: true } }` (rendered through the template as "Page not found | NSIM Education"). No canonical, no OG overrides, not in the sitemap. The root layout's Organization JSON-LD still appears.

---

## 8. Component Inventory

### 8.1 `components/ui` (primitives, shadcn-style)
| Component | Notes |
|---|---|
| `button.tsx` | cva variants: `default` (primary gradient, glow on hover), `secondary` (glass), `outline`, `ghost`, `link`; sizes `sm`, `md`, `lg`, `icon`; `asChild` via Slot; focus-visible ring `ring-2 ring-ring ring-offset-2 ring-offset-background`. |
| `badge.tsx` | variants `default` (`bg-primary text-primary-foreground`), `outline`, `amber` (`bg-accent-amber text-accent-amber-foreground`), `glass`. |
| `chip.tsx` | server. Props `{ icon?: IconKey; children: React.ReactNode }`. Glass pill (`rounded-full`, `.glass`, text-sm) with an optional leading `<Icon>` (`aria-hidden`). Non-interactive. Used by the tools marquee, course Tools, and career-role chips. |
| `card.tsx` | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`. Uses `.glass` utility. |
| `accordion.tsx` | Radix Accordion wrapper with a chevron rotate. Content animates height via `--radix-accordion-content-height` keyframes (`accordion-down/up`, 0.25s; `animation:none` under reduced motion). |
| `sheet.tsx` | Radix Dialog styled as a right-side drawer (overlay blur, focus trap, Esc closes, `Dialog.Title` required, visually hidden). |
| `input.tsx`, `textarea.tsx`, `native-select.tsx`, `checkbox.tsx` (native input styled), `label.tsx` (Radix Label) | The native `<select>` is chosen over Radix Select for mobile usability and simpler RHF integration. |
| `form-field.tsx` | Wraps label + control + description + error message. Wires `id`, `aria-invalid`, and `aria-describedby`. |
| `container.tsx` | max-width + padding; `size="default" \| "narrow"`. |
| `section-heading.tsx` | eyebrow (mono) + h2 + optional description; `align="center" \| "left"`. |
| `icon.tsx` | `iconMap: Record<IconKey, LucideIcon>` + `<Icon name>`. Lets data files stay serialisable. |
| `sonner.tsx` | `<Toaster>` themed via next-themes, `position="bottom-right"`, `offset={88}` so toasts sit above the FloatingEnquire button, `richColors`, `closeButton`. |
| `visually-hidden.tsx` | re-export of Radix VisuallyHidden. |

### 8.2 `components/layout`
| Component | Notes |
|---|---|
| `providers.tsx` | client: `ThemeProvider` (next-themes) + `MotionConfig reducedMotion="user"`. |
| `skip-link.tsx` | "Skip to content" → `#main`; visible on focus. `<main id="main" tabIndex={-1}>` so focus actually lands there. Global CSS sets `scroll-padding-top: 5rem` on `html` so anchor targets clear the sticky navbar. |
| `navbar.tsx` | client. Sticky `top-0 z-50`; transparent at the top, and after 12px of scroll becomes `bg-background/70 backdrop-blur-xl border-b`. Holds a logo wordmark (SVG monogram + "NSIM Education"), links (Programs as a plain link to `/courses/`, with no dropdown), About, Contact, a `ThemeToggle`, and a CTA "Enquire now". Active link uses `usePathname()` + `aria-current="page"` + a motion `layoutId` pill. Links are hidden below md and replaced by a `MobileNav` trigger. |
| `mobile-nav.tsx` | client. `Sheet` with nav links, the 3 course links, the CTA and a theme toggle. Each link (nav links, course links, CTA) is wrapped in `<SheetClose asChild>` (Radix `Dialog.Close`), so clicking a link closes the drawer before navigation. `open` is controlled only by the Sheet's `onOpenChange`. No effect watches `pathname`, because a `setOpen(false)` effect would trip `react-hooks/set-state-in-effect`. Back/forward navigation while the drawer is open can't happen, because the modal overlay covers the page. |
| `theme-toggle.tsx` | client. Icon button that cycles light → dark → system, with `aria-label` stating the current and next state, for example "Theme: dark. Switch to system theme". `const mounted = useMounted()` (§4.5); until mounted it renders a same-size button with a neutral icon and the label "Change theme" to avoid hydration mismatch. |
| `footer.tsx` | server. 4 columns: (1) brand + blurb + socials [P-35..P-38] (text links "Instagram", "Facebook", "LinkedIn", "YouTube", each followed by an `aria-hidden` `external-link` icon and an sr-only "(opens in new tab)", `target=_blank rel="noopener noreferrer"`; only `liveSocials` from `site.ts` are rendered, and the whole socials row, including its heading, is omitted while that list is empty, which it is with the placeholder values — lucide 1.x ships no brand icons, and no brand glyphs are drawn); (2) Programs (`courseLinks`); (3) Company (About, Contact, placeholder "Careers"/"Blog" links are **not** included, so there are no dead links); (4) Contact info. Bottom row: ©{year} NSIM Education, "Made in Kolkata". A large faded display wordmark "NSIM" sits behind as decoration (`aria-hidden`). |
| `floating-enquire.tsx` | client. Fixed `bottom-5 right-5` round gradient button (MessageCircle icon, label "Enquire" visible on ≥ md). Clicking toggles a small popover (a disclosure button with `aria-expanded` + `aria-controls`, and a plain `<ul>` of links rather than `role="menu"` or a dialog). On open, focus moves to the first link. Esc closes it and returns focus to the trigger. An outside click also closes it, but leaves focus where the user clicked. It has 3 actions:
- WhatsApp: `https://wa.me/<digits>?text=<encoded prefilled message>`, `target=_blank rel=noopener noreferrer`.
- Call: `tel:`.
- Enquiry form: `/contact/`. It carries the class `floating-enquire`. On course detail pages below lg, CSS lifts it by 80px through `body[data-bottom-bar]` (set by `MobileEnrolBar`, §7.3). It is not rendered when `normalizePath(pathname) === '/contact'`. |
| `page-header.tsx` | server. Eyebrow, h1, description, breadcrumb, aurora-lite background. |
| `breadcrumbs.tsx` | server. `nav aria-label="Breadcrumb"` with an `ol`; the last item has `aria-current="page"`. |
| `json-ld.tsx` | server. `<script type="application/ld+json">` with `JSON.stringify(data).replace(/</g,'\\u003c')`. |

### 8.3 `components/sections`
`hero-section`, `rotating-words` (client), `aurora-background`, `grid-pattern`, `noise-overlay`, `tools-marquee`, `stats-section`, `animated-counter` (client), `bento-features`, `programs-section`, `course-card` (client; props `{ course: CourseCardData; variant: 'compact' | 'default' | 'detailed'; headingLevel?: 'h2' | 'h3' }`, default `h3`). It uses the stretched-link pattern: `<hN><a href="/courses/<slug>/">{title}</a></hN>`, and the anchor's `::after` covers the card (`absolute inset-0`). The card has **no other interactive element**, so there are no nested links. The visual "View program →" is `aria-hidden` decoration. The focus ring is drawn on the card via `:has(a:focus-visible)`., `journey-section`, `career-outcomes-section`, `testimonials-carousel` (client), `faq-section`, `cta-band`, `course-comparison`, `course-hero`, `curriculum-accordion`, `enrol-card`, `mobile-enrol-bar` (client), `contact-form` (client), `contact-info`, `map-card`, `values-grid`, `mentors-grid`, `about-story`, and `reveal` (client; `Reveal` and `Stagger`/`StaggerItem`).

Components added in this revision (all server unless marked):

| File | Props | Notes |
|---|---|---|
| `course-param-sync.tsx` (client) | `{ onCourse: (slug: CourseSlug) => void }` | Renders `null`. The exact implementation is fixed below. `onCourse` is wrapped in `useEffectEvent` (stable in React 19.2, and react-hooks v7 knows it), so the effect's only dependency is `[value]`. It runs once per distinct `?course=` value and never re-runs after a form re-render or `reset()`. The parent (`ContactForm`) supplies a callback that checks `getFieldState('course').isDirty` and calls `setValue` (§7.5). Always wrapped in `<Suspense fallback={null}>` by `ContactForm`. |
| `approach-steps.tsx` | `{ steps: readonly ApproachStep[] }` | About §7.4 #5. `<ol>` of 3 glass cards with step number, icon, title, description. |
| `course-detail-sections.tsx` | each export takes `{ course: Course }` | Exports `CourseOverview`, `CourseOutcomes`, `CourseTools`, `CourseProjects`, `CourseAudience`, `CourseCertification`, `CourseCareerRoles`. Each renders `<section id="<kebab>" aria-labelledby="<kebab>-heading">` with an `h2` (ids listed in §7.3). Server-only, so the full `Course` object never crosses to the client. |
| `certificate-art.tsx` | `{ className?: string; theme?: CourseTheme }` | Decorative SVG certificate (seal, lines, ribbon) using `currentColor` + theme gradient; `aria-hidden="true" focusable="false"`. Used in bento tile (d) and `CourseCertification`. |
| `hero-preview-stack.tsx` | `{ items: CourseCardData[] }` | Hero right column, `hidden lg:block`, wrapper `aria-hidden="true"`, contains no links. Bobbing is CSS `.animate-bob-3` (§4.5 inventory: 1.5s × 3, delays 0/0.15/0.3s, off under reduced motion). |

**`CourseParamSync` implementation (fixed):**
```tsx
'use client';
import { useEffect, useEffectEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { isCourseSlug, type CourseSlug } from '@/data/course-slugs';
export function CourseParamSync({ onCourse }: { onCourse: (slug: CourseSlug) => void }) {
  const value = useSearchParams().get('course');
  const emit = useEffectEvent((v: CourseSlug) => onCourse(v));
  useEffect(() => { if (isCourseSlug(value)) emit(value); }, [value]);
  return null;
}
```

**AnimatedCounter behaviour:** props `{ value: number; suffix?: string; prefix?: string; decimals?: number; srLabel: string }`. It renders no visible label; `StatsSection` (and the About stats) render the visible `Stat.label` beneath each tile as `aria-hidden` text.
- SSR renders the final formatted value (`en-IN` grouping), so crawlers and no-JS users see real numbers.
- The visible number is a `<span ref={numRef}>`. Uses `useInView(ref, { once: true, margin: '-10% 0px' })`. When `inView` becomes true and reduced motion is off, an effect calls `animate(0, value, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => { numRef.current!.textContent = format(v) } })` and returns `controls.stop` as cleanup. No React state is used for the animated number, so there is no `setState` in an effect and no re-render per frame. The counter animates from 0 only at the moment it scrolls into view; before that, the final value (SSR text) stays visible. Counters already in view on load animate once from 0 right after hydration (a brief, acceptable change).
- The visible number is `aria-hidden`. An sr-only span renders `srLabel` **only**. `srLabel` already contains the value, for example "4.8 out of 5 average learner rating", so the value is not concatenated again, and the visible `label` is `aria-hidden` so nothing is announced twice.
- `tabular-nums` and a fixed min width prevent CLS.

---

## 9. Data Model

All data files are plain TypeScript modules that export typed constants. They hold no JSX and no component imports, so they stay serialisable. Types are exported from the same file that owns the data, with one exception: course types live in the type-only `course-types.ts` so client components can import them (§6, §9.3).

### 9.1 Shared key modules

```ts
// src/data/course-slugs.ts  (importable from client code)
export const COURSE_SLUGS = ['ai-digital-marketing', 'business-accounting-finance', 'ai-prompt-engineering'] as const;
export type CourseSlug = (typeof COURSE_SLUGS)[number];
export const isCourseSlug = (v: unknown): v is CourseSlug =>
  typeof v === 'string' && (COURSE_SLUGS as readonly string[]).includes(v);

// src/data/icon-keys.ts
export const ICON_KEYS = [
  'megaphone', 'calculator', 'sparkles', 'sparkle', 'target', 'search', 'bar-chart', 'globe', 'mail',
  'message-circle', 'palette', 'bot', 'receipt', 'sheet', 'notebook-pen', 'workflow', 'image', 'table',
  'video', 'folder-kanban', 'award', 'briefcase', 'calendar-clock', 'users', 'graduation-cap',
  'lightbulb', 'rocket', 'shield-check', 'check-circle', 'phone', 'map-pin', 'clock', 'external-link',
] as const;
export type IconKey = (typeof ICON_KEYS)[number];
```

`components/ui/icon.tsx` declares `iconMap` with `satisfies Record<IconKey, LucideIcon>`, so a missing mapping is a **compile error**. Its lucide imports are `Megaphone, Calculator, Sparkles, Sparkle, Target, Search, BarChart3, Globe, Mail, MessageCircle, Palette, Bot, Receipt, Sheet, NotebookPen, Workflow, Image, Table, Video, FolderKanban, Award, Briefcase, CalendarClock, Users, GraduationCap, Lightbulb, Rocket, ShieldCheck, CheckCircle2, Phone, MapPin, Clock, ExternalLink`. No brand icons (Instagram, Facebook, etc.) are used; lucide-react 1.x removed them. If a lucide name no longer exists in the installed version, the implementer uses the closest current lucide icon under the same key. The data does not change.

### 9.2 `src/data/tools.ts` (single tool registry, used by the marquee and courses)

```ts
export type ToolId =
  | 'google-ads' | 'meta-ads' | 'seo-suites' | 'ga4' | 'search-console' | 'email-marketing'
  | 'whatsapp-marketing' | 'canva' | 'chatgpt' | 'claude' | 'gemini' | 'tally-prime' | 'gst-portal'
  | 'ms-excel' | 'google-sheets' | 'notion-ai' | 'image-generators' | 'no-code-automation';
export interface Tool { id: ToolId; label: string; icon: IconKey; marqueeRow?: 1 | 2 }
export const tools: Tool[];
export const toolById: Record<ToolId, Tool>;
```

| id | label | icon | marqueeRow |
|---|---|---|---|
| google-ads | Google Ads | target | 1 |
| meta-ads | Meta Ads | megaphone | 1 |
| seo-suites | SEO Tools | search | 1 |
| ga4 | GA4 Analytics | bar-chart | 1 |
| search-console | Search Console | globe | 1 |
| email-marketing | Email Marketing | mail | 1 |
| whatsapp-marketing | WhatsApp Marketing | message-circle | 1 |
| canva | Canva | palette | 1 |
| chatgpt | ChatGPT | sparkles | 2 |
| claude | Claude | bot | 2 |
| gemini | Gemini | sparkle | 2 |
| tally-prime | Tally Prime | calculator | 2 |
| gst-portal | GST Portal | receipt | 2 |
| ms-excel | MS Excel | sheet | 2 |
| notion-ai | Notion AI | notebook-pen | 2 |
| no-code-automation | No-code Automation | workflow | 2 |
| google-sheets | Google Sheets | table | — |
| image-generators | AI Image Generators | image | — |

Product names are plain text, used for nominative reference only. No logos or brand colours appear.

### 9.3 `src/data/course-types.ts` and `src/data/courses.ts`

The types below live in `course-types.ts`, which contains only `type`/`interface` declarations and `import type` statements (no runtime values). `courses.ts` does `export type * from './course-types'` and holds the data and helpers. Client components import types from `@/data/course-types` only (§6).

```ts
// src/data/course-types.ts
import type { CourseSlug } from './course-slugs';
import type { IconKey } from './icon-keys';
import type { ToolId } from './tools';
import type { FaqItem } from './faqs';

export type CourseTheme = 'violet' | 'emerald' | 'amber';
export type CourseCategory = 'Marketing' | 'Finance' | 'AI';
export type CourseLevel = 'Beginner' | 'Beginner to Intermediate';

export interface CurriculumModule {
  id: string;            // 'm1'..'m8', unique within the course
  title: string;         // ≤ 60 chars
  summary: string;       // 1 sentence, ≤ 160 chars
  duration: string;      // '2 weeks'  PLACEHOLDER P-45
  lessons: number;       // integer ≥ 1  PLACEHOLDER P-45
  topics: string[];      // 4–8 items
}

export interface Course {
  slug: CourseSlug;
  title: string;                 // H1 + card title, ≤ 40 chars
  shortTitle: string;            // footer/nav/select label, ≤ 24 chars
  category: CourseCategory;
  tagline: string;               // ≤ 90 chars
  summary: string;               // card text, ≤ 160 chars
  overview: string[];            // 2–3 paragraphs
  icon: IconKey;
  theme: CourseTheme;
  badge?: 'Bestseller' | 'New'; // PLACEHOLDER P-48
  duration: string;              // '4 months'  PLACEHOLDER P-44
  durationISO: `P${number}M`;    // 'P4M'; must match duration  PLACEHOLDER P-44
  mode: 'Live online';
  schedule: string;              // PLACEHOLDER P-43
  level: CourseLevel;
  language: string;              // display text  PLACEHOLDER P-46
  languageCodes: string[];       // BCP 47, e.g. ['en','hi','bn']; emitted as JSON-LD inLanguage  PLACEHOLDER P-46
  fee: { amount: number | null; note: string }; // amount null → rendered '₹XX,XXX'  PLACEHOLDER P-41
  nextBatch: string | null;      // ISO date 'YYYY-MM-DD' or null → 'Next batch: TBA'  PLACEHOLDER P-42
  certification: { title: string; description: string }; // PLACEHOLDER P-47
  highlights: string[];          // 3–4 (detailed card)
  outcomes: string[];            // 6–8
  tools: ToolId[];               // 4–8, unique
  curriculum: CurriculumModule[];// 5–8
  projects: string[];            // 3–4
  audience: { title: string; description: string }[]; // exactly 3
  includes: string[];            // EnrolCard list, 4–6 (e.g. 'Live sessions + recordings')
  careerRoles: string[];         // 4–6
  faqs: FaqItem[];               // 3–5; ids prefixed with slug
  seo: { title: string; description: string }; // title ≤ 42 (template adds ' | NSIM Education' → ≤ 60), description 70–160
}

export type CourseCardData = Pick<Course,
  'slug' | 'title' | 'summary' | 'icon' | 'theme' | 'badge' | 'duration' | 'level' | 'category' | 'highlights'>;

// src/data/courses.ts
export type * from './course-types';
export const courses: readonly Course[];                           // order = COURSE_SLUGS order
export function getCourseBySlug(slug: string): Course | undefined; // undefined for unknown slug
export function getRelatedCourses(slug: CourseSlug): Course[];     // the other courses, data order
export function toCardData(c: Course): CourseCardData;             // strips everything else before crossing to client
export const courseLinks: { href: `/courses/${CourseSlug}/`; label: string }[]; // from shortTitle
export const syllabusNote = 'Detailed syllabus PDF: coming soon'; // PLACEHOLDER P-40
```

**Placeholder marking inside `courses.ts`:** the marking rule (§10) is per line. Invented prose fields carry their own ids: every line holding a `curriculum` module's `title`/`summary`/`topics` or a `projects` entry ends in `// PLACEHOLDER P-49`; `tools`, `outcomes`, `highlights`, `audience` and `careerRoles` lines end in `// PLACEHOLDER P-55`; `includes` and `certification.description` lines end in `// PLACEHOLDER P-56`. For multi-line arrays, the opening line of the property (e.g. `outcomes: [ // PLACEHOLDER P-55`) carries the comment; the test only requires each id to appear at least once, so one comment per property per course satisfies it. `overview`, `tagline`, `summary`, `seo` and FAQ answers are marketing copy written for the site, not client facts, and are not registered.

`seo.keywords` is dropped because search engines ignore the meta keywords tag.

`lib/utils.ts` formatters:
- `formatINR(n)` returns `new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)`.
- `formatFee(fee)` returns `fee.amount == null ? '₹XX,XXX' : formatINR(fee.amount)`.
- `formatNextBatch(d)` returns `d == null ? 'Next batch: TBA' : 'Next batch: ' + d` formatted with `Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })`. The fixed time zone means the build machine's zone cannot change the output.

The UI never displays the fields `fee.amount` or `nextBatch` raw. They always go through the formatters.

**Invariants and who enforces them**

| Invariant | Owner | Why |
|---|---|---|
| Slug spelling; tool ids; icon keys; badge/level/category values | TypeScript (`CourseSlug`, `ToolId`, `IconKey` unions, `satisfies` on `iconMap`) | Compile-time is the cheapest place and catches errors in the editor |
| `courses` order and set equal `COURSE_SLUGS` (no dupes, none missing) | `src/test/courses.test.ts` | Cross-array relation that types cannot express |
| Length limits (title, shortTitle, tagline, summary, seo.title/description, module title/summary); array cardinalities listed above | `courses.test.ts` | Content rules; data is build-time, so there is no runtime validation cost |
| `durationISO` month count equals the leading integer in `duration` | `courses.test.ts` | Keeps JSON-LD consistent with the UI |
| `nextBatch` is null or a valid `YYYY-MM-DD` | `courses.test.ts` | Formatter safety |
| `seo.title` ≤ 42 chars; `languageCodes` non-empty, each matches `/^[a-z]{2,3}(-[A-Z]{2})?$/` | `courses.test.ts` | Final `<title>` ≤ 60 after template; valid JSON-LD `inLanguage` |
| Module ids unique per course; FAQ ids globally unique across `courses[*].faqs` and `faqs.ts` | `courses.test.ts` | Ids are used as React keys and accordion values |
| `fee.amount` is null or an integer > 0 | `courses.test.ts` | Controls whether JSON-LD `offers` is emitted |

There is no runtime validation (no zod on data). A bad content edit fails `pnpm test`, and CI or the implementer runs that before `pnpm build`.

**Per-course content** (original, outline level; the implementer writes the full copy in this spirit):

| | AI-Powered Digital Marketing | Business Accounting & Finance | AI-Powered Prompt Engineering |
|---|---|---|---|
| slug | ai-digital-marketing | business-accounting-finance | ai-prompt-engineering |
| shortTitle | Digital Marketing | Accounting & Finance | Prompt Engineering |
| category / theme / icon | Marketing / violet / megaphone | Finance / emerald / calculator | AI / amber / sparkles |
| badge [P-48] | Bestseller | — | New |
| level | Beginner to Intermediate | Beginner | Beginner |
| duration / ISO [P-44] | 4 months / P4M | 3 months / P3M | 2 months / P2M |
| schedule [P-43] | Weekday evenings or weekends · 2 hrs/session | same | same |
| language / languageCodes [P-46] | English, Hindi & Bengali / `['en','hi','bn']` | same | same |
| certification.title [P-47] | NSIM Certified Digital Marketing Professional | NSIM Certified Accounting & Taxation Professional | NSIM Certified Prompt Engineering Professional |
| tools | google-ads, meta-ads, ga4, search-console, seo-suites, canva, chatgpt, gemini | tally-prime, gst-portal, ms-excel, google-sheets, chatgpt | chatgpt, claude, gemini, image-generators, no-code-automation, notion-ai |
| modules (in order) | Marketing foundations & consumer journeys; SEO & content with AI; Google Ads & performance marketing; Meta & social media advertising; Email, WhatsApp & automation; Analytics (GA4) & reporting; AI tools for creatives & copy; Capstone campaign | Accounting fundamentals; Tally Prime essentials; GST — registration, invoicing & returns; TDS & payroll basics; Inventory & banking in Tally; Financial statements & MIS reporting; Advanced Excel for accountants; Capstone: books for a small business | How LLMs work; Prompt patterns & frameworks; Prompting for content, code & data; Image & multimodal generation; Building assistants & no-code automation; Evaluation, safety & ethics; Capstone AI workflow |
| careerRoles | Digital Marketing Executive, SEO Specialist, Performance Marketer, Social Media Manager, Content Strategist | Accounts Executive, GST Practitioner Assistant, Tally Operator, Accounts Payable/Receivable Associate, MIS Executive | Prompt Engineer, AI Content Specialist, AI Automation Associate, AI-enabled Marketing Associate |

The career-outcomes section (§7.1 #7) builds its chips from `careerRoles` across all courses, deduplicated case-insensitively, in data order.

### 9.4 Other data files

- **`faqs.ts`**
  - `export interface FaqItem { id: string; question: string; answer: string; tags?: ('home' | 'programs' | 'enquiry')[] }`. The type lives here, and `courses.ts` imports it.
  - `faqs` holds **10** general items.
  - Tag counts are enforced by `faqs.test.ts`: exactly 7 tagged `home`, 3–5 tagged `programs`, and exactly 3 tagged `enquiry`. One item may carry several tags.
  - Answers are plain text, ≤ 500 chars, because they are emitted into FAQPage JSON-LD verbatim.
- **`site.ts`**
  - `siteConfig`: `{ name: 'NSIM Education', shortName: 'NSIM', legalName, tagline, description, url, locale: 'en_IN', phoneDisplay, phoneHref, whatsapp (digits only), whatsappMessage, email, address: { locality: 'Kolkata', region: 'West Bengal', country: 'IN' }, hours, responseTime: string /* 'within 24 hours', PLACEHOLDER P-12 */, socials: Record<'instagram' | 'facebook' | 'linkedin' | 'youtube', string>, foundedYear: number, nav: { label: string; href: string }[] }`.
  - Additional exports:
    ```ts
    export const PLACEHOLDER_PHONE = '+910000000000';   // compared with the E.164 form of phoneHref  PLACEHOLDER P-30
    export const PLACEHOLDER_EMAIL = 'hello@example.com'; // PLACEHOLDER P-32
    const SOCIAL_LABELS = { instagram: 'Instagram', facebook: 'Facebook', linkedin: 'LinkedIn', youtube: 'YouTube' } as const;
    /** Socials that point at a real profile (URL path is not '/'). Shared by the footer and organizationJsonLd sameAs. */
    export const liveSocials: { key: keyof typeof SOCIAL_LABELS; label: string; href: string }[] =
      (Object.entries(siteConfig.socials) as [keyof typeof SOCIAL_LABELS, string][])
        .filter(([, u]) => new URL(u).pathname !== '/')
        .map(([key, href]) => ({ key, label: SOCIAL_LABELS[key], href }));
    ```
    A malformed social URL makes `new URL` throw at module load, which fails the build (fatal, build output) — the same class of error as a bad site URL.
  - `url` is `normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nsimeducation.com')`. The function runs `new URL()`, which throws on a malformed value (fatal, §12). It then requires the `https:` protocol and removes the trailing slash.
  - `nav` is `[{ 'Programs', '/courses/' }, { 'About', '/about/' }, { 'Contact', '/contact/' }]`. Every internal href in the codebase ends in `/` (to match `trailingSlash`), except `/` itself and query or hash links such as `/contact/?course=x`.
- **`home.ts`** — full shapes:
  ```ts
  export interface Cta { label: string; href: string }
  export interface BentoFeature {
    id: 'live' | 'projects' | 'ai' | 'cert' | 'placement' | 'flexible';
    title: string;        // ≤ 50 chars
    description: string;  // ≤ 160 chars
    icon: IconKey;
  }
  export interface JourneyStep { step: 1 | 2 | 3 | 4; title: string; description: string; icon: IconKey }
  export const hero: { eyebrow: string; rotatingWords: [string, string, string]; sub: string; primaryCta: Cta; secondaryCta: Cta };
  export const bentoFeatures: BentoFeature[];   // exactly 6, one per id, in the order above  PLACEHOLDER P-13
  export const journeySteps: JourneyStep[];     // exactly 4, step 1..4 in order
  export const placementSupport: string[];      // exactly 4
  export const placementLabel = 'Included';     // PLACEHOLDER P-11
  export const ctaBand: { heading: string; sub: string };
  export const stats: Stat[];
  /** Returns the stats in the requested order. Throws Error(`Unknown stat id: ${id}`) if one is missing (build-time, fatal). */
  export function pickStats(ids: readonly Stat['id'][]): Stat[];
  ```
  Cardinalities (6 bento, 4 steps, 4 support items, unique stat ids) are checked in `home.test.ts`.
  - `stats: Stat[]`, where `interface Stat { id: 'learners' | 'placement' | 'partners' | 'rating' | 'sessions'; value: number; prefix?: string; suffix?: string; decimals?: number; label: string; srLabel: string }`. It has 5 entries. Home shows `learners, placement, partners, rating`, and About shows `learners, sessions, partners, rating`. Components pick entries with `pickStats(ids)`.
  - `srLabel` is the full phrase for screen readers, for example "4.8 out of 5 average learner rating".

- **`testimonials.ts`**
  - `{ id, name, role, courseSlug: CourseSlug, quote (≤ 280 chars), rating: 4 | 5 }[]`, with exactly 6 entries (2 per course).
  - There is no `company` field, and no Review/AggregateRating JSON-LD is emitted. Placeholder testimonials must not become structured-data claims.
- **`about.ts`**:
  ```ts
  export interface ApproachStep { title: string; description: string; icon: IconKey }
  export interface Mentor { id: string; name: string; role: string; expertise: string; years: number }
  export const story: string[];                                               // 2–3 paragraphs
  export const values: { title: string; description: string; icon: IconKey }[]; // exactly 4
  export const approach: ApproachStep[];                                      // exactly 3
  export const mentors: Mentor[];                                             // exactly 4; each entry's line carries its own id P-51, P-52, P-53, P-54
  ```
  Founded year is read from `siteConfig.foundedYear`, not duplicated. Cardinalities are checked in `home.test.ts` (which covers `about.ts` too).

## 10. Placeholder Content Register

**Marking rule:** every placeholder value in `src/data/**` sits on a line that ends with the comment `// PLACEHOLDER P-xx` (for ranges, each item carries its own id, e.g. `P-21`). Placeholders must not appear in components. A component that shows a placeholder reads it from data.

**Enforcement:** `src/test/placeholders.test.ts` holds every id in the table below, with ranges expanded (P-20…P-25 → six ids, P-35…P-38 → four, P-51…P-54 → four), as `PLACEHOLDER_IDS` — 42 ids in total. It reads every file under `src/data/` with `fs` and asserts two things:
- Each id appears at least once.
- Every `PLACEHOLDER P-\d+` found belongs to the list (no unregistered ids).

The same test reads `CONTENT.md` at the repo root and asserts that every id appears there too. The implementer writes `CONTENT.md` by hand from this table. It is a handover checklist of the items the client must supply.

| ID | Item | Placeholder value | File |
|---|---|---|---|
| P-01 | Learners count | 5,000+ (`value: 5000, suffix: '+'`) | home.ts `stats.learners` |
| P-02 | Average rating | 4.8 (`decimals: 1, suffix: '★'`) | home.ts `stats.rating` |
| P-03 | Hiring partners | 50+ | home.ts `stats.partners` |
| P-04 | Live sessions delivered | 1,200+ (About only) | home.ts `stats.sessions` |
| P-10 | Batch status wording | "Enrolling now" | home.ts `hero.eyebrow` |
| P-11 | Placement claim | "100% placement assistance" / "Included" (assistance, never "guarantee") | home.ts `stats.placement`, `placementLabel`, bento copy |
| P-12 | Response-time promise | "within 24 hours" (success toast, contact page) | site.ts `responseTime` |
| P-13 | Feature claims | bento tiles: live expert-led sessions, real-world projects, AI-first curriculum, industry certification, flexible schedules + recordings | home.ts `bentoFeatures` |
| P-20…P-25 | Testimonials (6) | Aarav S., Priya M., Rohan D., Sneha B., Arjun K., Ananya R.; generic roles ("Digital Marketing Executive at a D2C brand") | testimonials.ts |
| P-30 | Phone | display `+91 00000 00000`, href `tel:+910000000000` | site.ts |
| P-31 | WhatsApp number | `910000000000` | site.ts |
| P-32 | Email | `hello@example.com` | site.ts |
| P-33 | Address | Kolkata, West Bengal, India (no street) | site.ts |
| P-34 | Office hours | Mon–Sat, 10:00–19:00 IST | site.ts |
| P-35…P-38 | Social URLs | `https://www.instagram.com/`, `https://www.facebook.com/`, `https://www.linkedin.com/`, `https://www.youtube.com/` (root domains → excluded by `liveSocials`, so nothing renders until real profile URLs are supplied) | site.ts |
| P-40 | Syllabus PDF | none; note "Detailed syllabus PDF: coming soon" | courses.ts (shared constant `syllabusNote`) |
| P-41 | Fees + EMI note | `amount: null` → ₹XX,XXX; note "EMI options available" | courses.ts `fee` |
| P-42 | Next batch dates | `null` → "Next batch: TBA" | courses.ts `nextBatch` |
| P-43 | Schedule | "Weekday evenings or weekends · 2 hrs/session" | courses.ts |
| P-44 | Durations | 4 / 3 / 2 months (P4M / P3M / P2M) | courses.ts |
| P-45 | Module durations & lesson counts | per module | courses.ts |
| P-46 | Language of instruction | "English, Hindi & Bengali" | courses.ts |
| P-47 | Certificate titles | see §9.3 | courses.ts |
| P-48 | Course badges | Bestseller (DM), New (Prompt Eng) | courses.ts |
| P-49 | Course syllabus content | module titles, summaries and topics (§9.3 outline); project briefs | courses.ts `curriculum`, `projects` |
| P-55 | Course tools, outcomes, highlights, audience, career roles | §9.3 table + implementer-written lists | courses.ts `tools`, `outcomes`, `highlights`, `audience`, `careerRoles` |
| P-56 | Enrolment inclusions and certificate descriptions | e.g. "Live sessions + recordings", "Certificate on completion" | courses.ts `includes`, `certification.description` |
| P-50 | Founded year | 2018 | site.ts `foundedYear` (about.ts reads it) |
| P-51…P-54 | Mentors (4) | R. Sen, A. Gupta, S. Das, M. Roy; generic roles, years 8/10/6/12 | about.ts |
| P-60 | Legal name | NSIM Education | site.ts |
| P-62 | Site URL | https://www.nsimeducation.com (env override) | site.ts |

(P-61 from the previous draft covered the generated OG image and favicon. Those are generated artwork, not client-supplied content, so the id was removed from the register.)

**JSON-LD and placeholders:**
- Social placeholder URLs are root domains. `organizationJsonLd` builds `sameAs` from `liveSocials` (§9.4), which keeps only URLs whose `pathname !== '/'`, so no placeholder URL ever becomes a structured-data claim. The footer uses the same list, so it renders no social links (and no dead links) until real profiles are supplied.
- `telephone` and `email` are omitted from JSON-LD while they equal the placeholder values. The check is done by comparing against exported constants `PLACEHOLDER_PHONE` and `PLACEHOLDER_EMAIL` in `site.ts`.
- `CourseInstance.startDate` is emitted only when `nextBatch` is non-null, and `offers` only when `fee.amount` is non-null.


---

## 11. SEO, Accessibility, Performance Requirements

**SEO**
- `metadataBase = new URL(siteConfig.url)`, set in the root layout.
- `buildMetadata({ title, description, path, absoluteTitle = false }: { title: string; description: string; path: string; absoluteTitle?: boolean }): Metadata` returns the per-page fields:
  - `title: absoluteTitle ? { absolute: title } : title`, and description. `openGraph.title` is the full rendered title (`absoluteTitle ? title : \`${title} | NSIM Education\``), because OG titles do not use the template.
  - `alternates.canonical: path`. `path` always has a trailing slash (`/`, `/courses/`, `/courses/<slug>/`), and the function throws at build if it does not.
  - `openGraph: { type: 'website', locale: 'en_IN', siteName, url: path, images: [{ url: '/og.png', width: 1200, height: 630, alt }] }`.
  - `twitter: { card: 'summary_large_image' }`.
- Course pages use `course.seo`. The root layout sets the title template (§7) and does **not** set `alternates`, so pages without `buildMetadata` (only the 404) get no canonical. The root layout also sets `icons: { icon: '/icon.svg', apple: '/apple-touch-icon.png' }` and `manifest: '/manifest.webmanifest'`.
- **Image routes:** there are no `opengraph-image.*`, `twitter-image.*` or `apple-icon.*` files. Next 16 exports those extensionless (A9), and that breaks MIME types on static hosts. `og.png/route.tsx` and `apple-touch-icon.png/route.tsx` are used instead.
  - They are rendered with the default `next/og` font. No font is fetched, so there are no extra network dependencies.
  - The OG image is one sitewide 1200×630 image: dark ink background, aurora gradient, "NSIM Education" wordmark, and the tagline.
- JSON-LD (all builders in `lib/seo.ts`, all returning plain objects):
  - `organizationJsonLd()`: `EducationalOrganization` with `@id: ${url}/#organization`, name, url, logo `${url}/icon.svg`, address `PostalAddress` (locality, region, country), `foundingDate`. `telephone`, `email` and `sameAs` follow the placeholder rules in §10. It is emitted in the root layout, so it appears on every page.
  - `courseJsonLd(course)`: `Course` with `name`, `description` (= `seo.description`), `url`, ``provider: { '@type': 'EducationalOrganization', '@id': `${siteConfig.url}/#organization`, name: siteConfig.name, sameAs: siteConfig.url }`` (name is repeated inline because Google's Course validator requires `provider.name` and some consumers don't resolve `@id` across script blocks), `educationalCredentialAwarded`, `inLanguage: course.languageCodes`, and `hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: durationISO, startDate? }`. `offers` is included only when `fee.amount` is non-null, as `{ '@type': 'Offer', price, priceCurrency: 'INR', category: 'Paid' }`.
  - `breadcrumbJsonLd(items)` is used on course pages.
  - `faqJsonLd(items)` is used on home only.
- `sitemap.ts`: **7 URLs**. The 4 static routes are `/`, `/courses/`, `/about/` and `/contact/`, plus the 3 course routes. All are absolute with trailing slashes, and `lastModified` is the build date. The 404 page is not listed.
- `robots.ts`: `{ rules: { userAgent: '*', allow: '/' }, sitemap: `${url}/sitemap.xml` }`.
- `manifest.ts`: name, short_name, `start_url: '/'`, `display: 'standalone'`, theme and background colours as sRGB hex approximations of `--primary` and dark `--background`, and `icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }, { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }]`.
- Semantic heading hierarchy: one h1, h2 per section, h3 inside cards. Link text is descriptive (no "click here").

**Accessibility**
- `<html lang="en-IN">`.
- Landmarks: `header` (navbar), `nav aria-label="Primary"`, `nav aria-label="Breadcrumb"`, `main#main`, `footer`. The footer's link groups are `nav aria-label="Footer"`. The skip link is the first focusable element.
- Heading order: each page has exactly one h1. Section headings are h2, including the sr-only "Tools you'll master". Course cards are h3, or h2 when a page lists them directly under the h1 (the `/courses/` grid uses `headingLevel="h2"`).
- Focus: a `:focus-visible` ring (`ring-2 ring-ring ring-offset-2 ring-offset-background`) on every interactive element. `outline: none` is never used without that ring.
- Overlays:
  - Sheet (Radix Dialog) traps focus, closes on Esc, and restores focus to its trigger.
  - The FloatingEnquire popover moves focus in and restores it (§8.2).
  - Accordions and the carousel follow §7.1 and §8.1.
- Contrast: token pairs are tested (§4.1). Glass cards keep a fill opacity ≥ 0.55 (dark) / 0.65 (light). The aurora sits *behind* cards, never behind bare body text, except the hero, where the h1 and sub copy use `--foreground` over blobs capped at 0.6 / 0.35 opacity. The hero is also on the manual contrast checklist (§14).
- Forms:
  - Every control has a visible `<label>`. Required fields are marked "(required)" in text, not only with an asterisk.
  - Errors render in `<p id="<field>-error">`, referenced by `aria-describedby`, with `aria-invalid="true"` on the control. There is no per-field `role="alert"`, because several would announce at once.
  - On a failed submit, RHF focuses the first invalid field, and one sr-only `aria-live="polite"` region says "Please fix N highlighted fields".
  - The honeypot (`name="hp_ref"`, `id="hp_ref"`) is wrapped in a `div` with `aria-hidden="true"` and the `sr-only` class. The input has `tabIndex={-1}` and `autoComplete="off"`, and its label is "Leave this field empty".
- SVG art is decorative (`aria-hidden="true"`, `focusable="false"`). The certificate SVG is decorative too, because its meaning is repeated in adjacent text.
- Touch targets are ≥ 44×44px, including carousel dots: each has a 44px hit area around an 8px visual dot.
- Motion follows §4.5, including the WCAG 2.2.2 policy.

**Performance**
- The only PNGs are the two generated at build. They are never on the critical path. Fonts are self-hosted through next/font.
- Client JS stays in leaves only (§6), and client components get trimmed props (`CourseCardData`, not `Course`). The hero right-column art is lg-only. Embla is imported only by `testimonials-carousel.tsx`. Nothing from the Lenis/GSAP family is used.
- There are at most 4 aurora blobs per page, with `will-change: transform`. Blur is applied only on the blob layer. `backdrop-blur` is limited to the navbar, cards, drawer and mini-bar.
- Budget: home route first-load JS ≤ 200 kB gzipped. The `next build` route table no longer prints First Load JS in Next 16, so `verify-export.mjs` measures it. It gzips every `out/_next/static/**/*.js` file referenced by `<script src>` in `out/index.html` and fails above 200 kB.

---

## 12. Contact Form: Validation & Error Handling

`src/lib/contact-schema.ts` (zod v4) is shared by the form and the unit tests. It imports only `COURSE_SLUGS`. All inputs are external user input, and the rules are:

| Field | Required | Type / rule | Limits | Error message |
|---|---|---|---|---|
| `name` | yes | string, `.trim()`, `/^[\p{L}\p{M} .'-]+$/u` (`\p{M}` admits Devanagari/Bengali vowel signs and viramas) | 2–80 chars | "Please enter your full name" |
| `email` | yes | `z.string().trim().toLowerCase().pipe(z.email().max(120))` | ≤ 120 chars | "Enter a valid email address" |
| `phone` | yes | string; transform strips spaces, dashes and parentheses, removes one leading `0`, and removes a leading `91` when exactly 10 mobile digits follow; then must match `/^(\+91)?[6-9]\d{9}$/`; output normalised to `+91XXXXXXXXXX` | — | "Enter a valid 10-digit Indian mobile number" |
| `course` | yes | `z.string().refine(isCourseOption)`; the `''` default fails | — | "Choose a program" |
| `mode` | no | `z.enum(['call','whatsapp','email']).default('call')`; rendered as a radio group in a `fieldset`/`legend` | — | — |
| `message` | no | string, `.trim()`, may be empty. **No `maxLength` attribute** on the textarea (it would make the error unreachable); zod + the counter enforce the limit | ≤ 1000 chars | "Keep it under 1000 characters" |
| `consent` | yes | `z.boolean().refine((v) => v === true)` from a native checkbox. Label: "I agree to be contacted by NSIM Education about this enquiry." | — | "Please agree to be contacted" |
| `hp_ref` (honeypot) | no | string; any value is allowed by the schema. The name is deliberately not a well-known autofill field (browsers autofill `company` despite `autocomplete="off"`) | ≤ 200 chars | — |

Exact schema and types (zod 4 `error` param; RHF 7 + `@hookform/resolvers` 5 three-generic form):

```ts
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
// ContactForm: useForm<ContactFormInput, unknown, ContactInput>({ resolver: zodResolver(contactSchema), defaultValues: contactDefaults, mode: 'onTouched', reValidateMode: 'onChange', shouldFocusError: true })
```

No code depends on whether zod narrows `ContactInput['course']` from `string` to `CourseOption` (the value is only forwarded to `submitEnquiry(data: ContactInput)`), so the design works with either typing. No `as` casts are allowed in the form code.

Behaviour:
- RHF options as above. The message field shows a live counter `n/1000`. The counter is `aria-live="off"` and is exposed through `aria-describedby` as "Maximum 1000 characters".
- **Preselect:** see §7.5. An invalid or missing `course` param is silently ignored and the field keeps `''` ("Select a program"). This is recoverable and not logged.
- **Honeypot:** if `hp_ref` is non-empty after validation, the handler skips `submitEnquiry` and runs the same success path (toast + reset). Nothing is logged, and bots cannot tell the difference.
- **Submit:** `submitEnquiry(data: ContactInput): Promise<{ ok: true }>` lives in `lib/submit-enquiry.ts`. It resolves after 900ms and makes no network request. While pending (`formState.isSubmitting`), the submit button is `disabled`, has `aria-busy="true"`, and shows a spinner with the text "Sending…". This prevents double submits.
- **Success:** `toast.success(\`Thanks, ${firstName}! A counsellor will reach out ${siteConfig.responseTime}.\`)` [P-12], then `reset(contactDefaults)`. The `course` field keeps no preselect after reset. Focus moves to the name field. `firstName` is `name.split(' ')[0]`.
- **Rejected promise** (the path must exist for a future endpoint; the mock never rejects):
  - `toast.error('Something went wrong. Please try again or reach us on WhatsApp.')`, with a toast action "WhatsApp" that opens the `wa.me` link.
  - Form values are kept.
  - `if (process.env.NODE_ENV !== 'production') console.error('[contact] submit failed', err)`. Nothing is logged in production.
  - This is recoverable. The button re-enables.
- **Client validation failure:** recoverable. Inline errors plus the live-region summary are shown. There is no toast and nothing is logged.
- **No-JS:** the form is SSR-rendered, but without JS it cannot submit, so it has no `action`. A `<noscript>` note above it says "JavaScript is needed to send this form — call or WhatsApp us instead", with the phone and WhatsApp links. The contact info cards next to it work without JS.

**Other failure points**

| Failure | When | Recoverable? | Caller / user sees | Logged |
|---|---|---|---|---|
| Unknown course slug | Runtime request | yes | Host serves `404.html` (build generates only 3 slugs, `dynamicParams = false`) | no |
| `getCourseBySlug` miss inside the page | Build (cannot happen for generated params) | — | `notFound()` | no |
| Malformed/non-https `NEXT_PUBLIC_SITE_URL` | Build | **fatal** | `next build` fails with the thrown message "Invalid NEXT_PUBLIC_SITE_URL: <value>" | build output |
| `buildMetadata` path without trailing slash | Build | **fatal** | build fails with a message naming the path | build output |
| Google Fonts unreachable | Build | **fatal** | next/font error (A8) | build output |
| Content invariant broken | `pnpm test` | fatal for CI | failing test names the course/field | test output |
| JSON-LD containing `<` | Render | n/a | `JsonLd` escapes `<` as `\u003c`, so a `</script>` breakout is impossible | no |
| Theme hydration mismatch | Client | yes | `suppressHydrationWarning` on `<html>`; ThemeToggle renders a same-size placeholder until `useMounted()` is true (§4.5) | no |
| `localStorage` unavailable (privacy mode) | Client | yes | next-themes falls back to system; the toggle still works for the session | no |
| IntersectionObserver unavailable | Client | yes | Counters show final values (the SSR text is never replaced because `useInView` never fires); the mini-bar stays visible (its IO setup is skipped when `typeof IntersectionObserver === 'undefined'`, inside the effect); `Reveal` reads `useHasIO()` (§4.5) — the server snapshot is `true`, so hydration matches, and after hydration a client without IO re-renders with `animate` = visible variant instead of `whileInView`, so children appear | no |
| Unknown stat id in `pickStats` | Build | **fatal** | build fails with "Unknown stat id: <id>" | build output |
| Unknown icon key | — | — | impossible: compile error (§9.1) | — |


## 13. Key Decisions

- **Static export over SSR.** There is no backend requirement, it can be hosted anywhere, and it is fastest. Consequences: `images.unoptimized` (acceptable, since imagery is SVG/CSS), `force-static` on sitemap/robots/manifest/image routes, and `Suspense` around `useSearchParams`.
- **`motion` over GSAP + Lenis.** One animation library that is React-idiomatic and has built-in reduced-motion support. Lenis is **omitted**: it hijacks scroll, can fight the sticky sidebar, anchor links and screen magnifiers, and adds JS for marginal gain. Native smooth scroll covers anchor jumps.
- **Embla over a custom carousel or CSS scroll-snap.** A snap-only carousel is lighter, but its prev/next, dots and loop logic end up reimplemented anyway. Embla is about 7 kB and headless, so it fits the shadcn style.
- **Native `<select>` over Radix Select.** Better on mobile, and simpler integration and validation with RHF.
- **Hand-authored shadcn primitives.** Deterministic and non-interactive to set up, with only the primitives that are needed.
- **Icons as string keys in data.** Keeps data serialisable across the RSC boundary to client components.
- **TypeScript 5.9 rather than 7.x.** 7.x is the new native compiler major; Next's toolchain compatibility is not established.
- **No salary figures or "guaranteed placement" wording.** The wording is "100% placement assistance" to avoid unverifiable claims.
- **Extension-named route handlers for the OG image and apple icon, not the metadata file conventions.** This was verified in a scratch build (A9): the file conventions export extensionless files. The rejected alternatives were committing binary PNGs (they can't be regenerated from source and would need a design tool) and a postbuild rename step (it would also have to rewrite HTML and RSC payloads).
- **Query-param preselect via a render-nothing `CourseParamSync` inside `Suspense`.** The alternative was wrapping the whole form in Suspense, which leaves the form out of the static HTML and can remount it on hydration. That was rejected.
- **Content invariants in tests, not runtime zod.** The data is compile-time constant, so runtime validation would only add bundle weight and could never catch anything that `pnpm test` misses.
- **No syllabus button.** A disabled CTA is an accessibility anti-pattern. A note replaces it until a PDF exists.

## 14. Testing Strategy

**Unit tests (Vitest, `environment: 'jsdom'`, `@vitejs/plugin-react`, `vite-tsconfig-paths` for `@/*`).** Pure logic is tested without a DOM wherever possible.
- `contact-schema.test.ts`: valid and invalid cases for every field in §12, including these phone cases:
  - Valid: `+919876543210`, `98765 43210`, `098765-43210`, `919876543210` (all normalise to `+919876543210`).
  - Invalid: `5876543210`, `98765`, `+14155550100`.
  - Names: valid `Priya M.`, `D'Souza`, `অনন্যা রায়`, `ज्योति`; invalid `A`, `John123`.
  - Also checks that `course: ''` fails with "Choose a program", `consent: false` fails with "Please agree to be contacted", and `contactDefaults` type-checks as `ContactFormInput` (compile-time, via `tsc`).
- `courses.test.ts`: every invariant in the §9.3 table, plus `getCourseBySlug('nope') === undefined` and `getRelatedCourses(x)` returning the other 2 without x.
- `faqs.test.ts`: tag counts (§9.4), answer length limits, and globally unique FAQ ids.
- `home.test.ts`: `home.ts`/`about.ts` cardinalities (§9.4), unique stat ids, `pickStats` order and its throw on an unknown id.
- `placeholders.test.ts`: the §10 enforcement rules (data files ↔ register ↔ `CONTENT.md`).
- `contrast.test.ts`: parses the `:root { }` and `.dark { }` blocks of `src/app/globals.css` for `--token: oklch(...)`. It converts them with `culori` (`converter('rgb')`, `wcagContrast`) and asserts every pair in §4.1. For translucent `--card`, it composites over `--background` before measuring.
- `seo.test.ts`:
  - `courseJsonLd` shape.
  - `offers` and `startDate` are omitted when their values are null and present when set.
  - `sameAs` excludes root-domain URLs.
  - Placeholder phone and email are omitted.
  - `courseJsonLd.inLanguage` equals `course.languageCodes`.
  - `buildMetadata({ absoluteTitle: true })` returns `title: { absolute }`; without it, a plain string.
  - `liveSocials` is empty for the placeholder config and includes an entry whose URL has a path.
  - `buildMetadata` throws on a path with no trailing slash.
  - `JsonLd` output escapes `<`.
- `utils.test.ts`: `formatFee`, `formatNextBatch` (fixed time zone), `normalizePath`, and `normalizeSiteUrl` (throws on `ftp://x` and on `not a url`).
- `animated-counter.test.tsx`: with `useReducedMotion` mocked to `true`, it renders the final value. The sr-only span's text equals `srLabel` exactly, and the visible number is `aria-hidden`.
- `motion-inventory.test.ts`: reads `src/app/globals.css`. It asserts that the set of `.animate-*` classes that declare a non-`none` `animation` (outside the reduced-motion media query) equals the five classes in the §4.5 inventory, that every one appears in the `prefers-reduced-motion` rule's selector list, and that every class with a finite count has `duration × iterations + max delay < 5s`.
- `noscript-style.test.ts`: imports the exported `NOSCRIPT_CSS` constant (from `src/lib/noscript-css.ts`, which `layout.tsx` renders) and asserts it contains the six rules listed in §4.5.
- `testimonials-carousel.test.tsx`: `embla-carousel-react` mocked. With no API yet, it renders all 6 slides and zero dots. After the mock fires `select` with index 2, the matching dot has `aria-current="true"` and the live region reads "Showing testimonial 3 of 6". The viewport has `overflow-hidden` and `data-carousel-viewport`, and the controls carry `data-reveal-js-only`.
- `rotating-words.test.tsx`: uses fake timers. It asserts exactly 3 word changes (at 1.4s, 2.8s, 4.2s), the final word equals the first, and no changes after 4.6s. Under reduced motion there are zero changes.
- `contact-form.test.tsx`:
  - Submitting empty shows the 5 required errors and focuses name.
  - A valid submit calls the mocked `toast.success` and resets.
  - A non-empty honeypot does not call the mocked `submitEnquiry`, but still shows success.
  - A mocked rejection keeps the values and calls `toast.error`.
  - `CourseParamSync` is covered by mocking `next/navigation`'s `useSearchParams` with `?course=ai-prompt-engineering` (preselects) and `?course=bogus` (stays empty). A further case: with `?course=ai-prompt-engineering`, a valid submit followed by the reset leaves `course === ''` (the effect does not fire again after `reset`), and the select shows the empty placeholder option.

**Build verification (`scripts/verify-export.mjs`, Node only, no dependencies beyond `node:zlib`, `node:fs`).** `pnpm verify` runs it after `pnpm build`.
1. **Files exist:**
   - `out/index.html`, `out/courses/index.html`, `out/courses/<each slug>/index.html`, `out/about/index.html`, `out/contact/index.html`, `out/404.html`.
   - `out/sitemap.xml`, `out/robots.txt`, `out/manifest.webmanifest`, `out/og.png`, `out/apple-touch-icon.png`, `out/icon.svg`.
   - The two PNG files start with the PNG signature bytes.
2. **Indexable pages** — an explicit list of 7 files, not a glob (Next also emits `out/404/index.html` and `out/_not-found/index.html` duplicates, which are ignored): `index.html`, `courses/index.html`, `courses/<each slug>/index.html` (3), `about/index.html`, `contact/index.html`. Each must have:
   - Exactly one `<h1`, a non-empty `<title>` ≤ 60 chars, `meta name="description"`, `link rel="canonical"` ending in `/`, and `og:title`.
   - `og:image` whose URL path maps to an existing file in `out/`.
   - No `noindex`.
   - Titles are unique across the 7 pages.
   **404:** `out/404.html` has exactly one `<h1`, contains `noindex` in its robots meta, and has no `rel="canonical"`.
3. **Structured data:**
   - `"@type":"EducationalOrganization"` is on every page.
   - `"FAQPage"` is on home only.
   - `"@type":"Course"` and `"BreadcrumbList"` are on each course page.
4. **Sitemap:** `sitemap.xml` has exactly 7 `<loc>` entries, and `robots.txt` contains `Sitemap:`.
5. **No external runtime assets:** no `<script src="http`, `<link rel="stylesheet|preload|modulepreload" href="http`, `<img src="http` or `url(http` inside `out/**/*.{html,css}`. The canonical, OG and JSON-LD URLs are exempt because they are metadata, not fetched assets.
6. **JS budget:** as described in §11.

The script prints each failure and exits with code 1 if any check fails.

**Manual checklist** (in `README.md`; results recorded by the implementer):
- Widths 375, 768 and 1440 in both themes, looking for horizontal overflow.
- Keyboard-only pass on all 6 pages.
- An OS reduced-motion pass.
- A JS-disabled pass: content visible, the form shows the noscript note, testimonials scroll horizontally with snap, the marquee is static, and the carousel/marquee controls are hidden.
- Hero contrast over aurora, checked with a colour picker.
- `muted-foreground` text inside glass cards where aurora blobs sit behind them (Programs cards, CTA band, course hero meta chips), both themes, checked with a colour picker at the brightest blob position (≥ 4.5:1). If it fails, raise the card fill opacity for that surface; do not change the token.
- Lighthouse mobile run on `npx serve out` for `/` and `/courses/ai-digital-marketing/`.

## 15. Acceptance Criteria

1. `pnpm install && pnpm build && pnpm verify` succeeds on Node 22 with network access (A8), and every check in §14 "Build verification" passes.
2. `pnpm typecheck`, `pnpm lint` and `pnpm test` all pass with zero errors, with no `eslint-disable` comments for `react-hooks/*` rules or `no-restricted-imports`.
3. Exactly three course pages exist, at `/courses/ai-digital-marketing/`, `/courses/business-accounting-finance/` and `/courses/ai-prompt-engineering/`. Every course field shown on any page comes from `src/data/courses.ts`. Changing a course `title` there changes it on the home cards, listing, detail h1, related cards, and JSON-LD. Changing `shortTitle` changes the footer, mobile-nav and contact-form option labels.
4. The home page renders the 10 sections of §7.1 in order. The course detail page renders every section in §7.3, including a curriculum accordion whose first module is open by default.
5. The theme toggle switches light/dark/system, persists across reloads, and causes no flash of the incorrect theme. `contrast.test.ts` passes for both themes.
6. Motion behaves as follows:
   - With OS "reduce motion" enabled, none of the five inventory classes in §4.5 (aurora, marquee, pulse, bob, bento border sweep) animate. Counters show final values immediately, the hero word does not rotate, and reveal elements appear without translation.
   - Without reduced motion, the hero word stops changing within 5s.
   - The marquee's Pause button stops both rows. Under reduced motion the button is not shown.
7. At 375px, 768px and 1440px there is no horizontal scrollbar. Below 768px the navbar shows the drawer trigger. The drawer opens, traps focus, closes on Esc and closes on link click.
8. Keyboard access works as follows:
   - Every interactive element is reachable and operable by keyboard with a visible focus ring.
   - The skip link is the first tab stop and moves focus to `#main`.
   - Each course card is a single tab stop.
9. The contact form behaves as follows:
   - Submitting it empty shows inline errors for name, email, phone, course and consent, and focuses the first invalid field.
   - A valid submission shows a success toast within about 1s and resets the form.
   - `/contact/?course=ai-prompt-engineering` preselects that program, and an invalid `course` value is ignored.
   - The form markup is present in `out/contact/index.html`, not only after hydration.
10. The home page source contains `EducationalOrganization` and `FAQPage` JSON-LD. Course pages contain `Course` and `BreadcrumbList` JSON-LD, and no `offers` while fees are placeholders. `sitemap.xml` lists **7** URLs, and `robots.txt` references it.
11. Each of the 7 indexable pages has a unique `<title>` (≤ 60 chars, the home title without a doubled suffix), a meta description, a trailing-slash canonical URL and OG tags. `404.html` has `noindex` and no canonical. `og:image` points to `/og.png`, which exists as a real 1200×630 PNG.
12. No external image, font, script or stylesheet is requested at runtime. The only exceptions are `wa.me`, `tel:` and `mailto:` links. They are user-initiated `<a href>` links, not fetched assets, so verifier check 5 (which scans only `script src`, `link href`, `img src` and `url(`) does not flag them. No third-party logos are included.
13. Lighthouse (mobile, served `out/`) on `/` and one course page scores ≥ 90 for Performance and ≥ 95 for Accessibility, Best Practices and SEO. This is manual, and the implementer records the scores in `README.md`.
14. Every placeholder in §10 is present in `src/data/**` with a `PLACEHOLDER P-xx` comment and listed in `CONTENT.md`. `placeholders.test.ts` passes.
15. All visible copy is original. No text is copied from nsimeducation.com.
16. With JavaScript disabled, all page content is visible (no stuck `opacity:0`), and the contact page shows the noscript alternative. Testimonials can be scrolled horizontally with snap, the tools marquee is a static wrapped row, and the prev/next buttons, dots and marquee Pause button are not displayed.

## 16. Out of Scope

- Real form backend, CRM, email delivery, analytics and cookie banner.
- CMS, blog, payments/checkout, student login/LMS.
- Multi-language (Hindi/Bengali) UI.
- Real photography, brand logos, and the actual fee and schedule data.
- E2E browser automation (Playwright) and visual regression suites. Verification is by unit tests + the export verifier + a manual checklist.

## 17. Open Decisions (with recommendation, and adopted unless the review objects)

- **Brand colour match.** No brand kit is available, so the adopted palette is the new violet/cyan palette. If the client supplies brand hex values, only the `--primary` and `--accent-*` tokens change.
- **Package manager.** The adopted choice is pnpm (installed, v11). npm works as a fallback without changing code.
- **Floating Enquire style.** The adopted design is a gradient chat button with a 3-action menu, rather than a direct WhatsApp link, because the WhatsApp number is a placeholder and a dead direct link is worse UX.
- **Programs dropdown in navbar.** The adopted choice is a plain link for simplicity and accessibility. The mobile drawer lists the courses.
- **Toaster position.** The adopted position is `bottom-right`, but it sits above the FloatingEnquire, via `offset` of 88px. Reason: it keeps toasts from overlapping the floating button.

## 18. Revision Notes

Earlier self-review pass: closed the `IconKey` union, added the `ToolId` registry, formatters, invariant ownership, placeholder enforcement, extension-named OG/apple routes, `CourseParamSync`, WCAG 2.2.2 policy and the no-JS reveal fallback.

### Response to design review (CHANGES_REQUESTED, 0 HIGH / 10 MEDIUM / 8 NIT)

All findings are **addressed**. None are backlogged or ignored.

| # | Sev | Resolution | Where |
|---|---|---|---|
| 1 | MED | Added `src/lib/use-mounted.ts` (`useMounted`, `useHasIO` via `useSyncExternalStore`). Added the rule "no synchronous `setState` in effects, and the lint rule is never disabled". ThemeToggle and MobileEnrolBar use `useMounted`. Reveal uses `useHasIO`, whose server snapshot is `true`, and switches to `animate` when IO is absent. AnimatedCounter writes `textContent` through a ref. RotatingWords updates its index only from timer callbacks. | §4.5, §6, §8.2, §8.3, §12 |
| 2 | MED | Types moved to the type-only `src/data/course-types.ts`, which `courses.ts` re-exports. Client files import types from there. The rule pattern and the full override file list are now spelled out. | §6, §9.3 |
| 3 | MED | Socials are text links with an `ExternalLink` icon (`'external-link'` key added). Footer and `sameAs` share `liveSocials`. The row is omitted while that list is empty. No brand glyphs. | §8.2, §9.1, §9.4, §10 |
| 4 | MED | Added `--accent-amber-foreground` and its contrast pair. The amber badge uses it. Light amber is now L=0.665 and light success L=0.54. | §4.1, §8.1 |
| 5 | MED | Added P-13, P-49, P-55 and P-56, with per-property marking rules in `courses.ts`. Stated which marketing copy is deliberately not registered. The id total is 42. | §9.3, §10 |
| 6 | MED | Full `home.ts` and `about.ts` shapes (`Cta`, `BentoFeature`, `JourneyStep`, `ApproachStep`, `Mentor`, `pickStats` with its throw). `siteConfig.responseTime`, `PLACEHOLDER_PHONE`/`EMAIL`, `liveSocials` and `syllabusNote` added. New `home.test.ts`. | §9.3, §9.4, §12, §14 |
| 7 | MED | Added `course-param-sync`, `approach-steps`, `course-detail-sections` (7 exports with section ids), `certificate-art`, `hero-preview-stack` and `ui/chip`, and wired them into the page specs. | §7.1, §7.3, §7.4, §8.1, §8.3 |
| 8 | MED | MobileEnrolBar renders through `createPortal` to `document.body` after mount, and `null` on the server. | §7.3 |
| 9 | MED | Exact schema: `course` uses `z.string().refine`, `consent` uses `z.boolean().refine`, email uses a `pipe`. Added `ContactFormInput`/`ContactInput`, `contactDefaults` and `useForm<Input, unknown, Output>`. No casts. | §12 |
| 10 | MED | Name regex now includes `\p{M}` (Indic test cases added). `buildMetadata` gained `absoluteTitle`. `seo.title` is capped at 42. 404 metadata is `noindex` with no canonical. The verifier uses an explicit 7-page list plus a separate 404 check. | §7, §7.6, §11, §12, §14, AC11 |
| 11 | NIT | Word swaps at 1.4, 2.8 and 4.2s with a 0.4s transition, finishing by 4.6s. Test updated. | §4.5, §14 |
| 12 | NIT | A `91` prefix before a 10-digit mobile number is stripped. `919876543210` added as a valid test case. | §12, §14 |
| 13 | NIT | Honeypot renamed to `hp_ref`. | §11, §12 |
| 14 | NIT | Pause button hidden with `motion-reduce:hidden`. | §4.5, AC6 |
| 15 | NIT | No `maxLength` on the message field. | §12 |
| 16 | NIT | `languageCodes` added to `Course` (P-46) and emitted as `inLanguage`. | §9.3, §11 |
| 17 | NIT | Manifest icons now have `sizes` and `type`. | §11 |
| 18 | NIT | Added muted text on glass over aurora to the manual contrast checklist, with a fix rule (raise the card fill opacity, not the token). | §14 |

Unverified items the review listed (Lighthouse scores, the 200 kB budget, the next-themes dev warning) stay as stated. They can only be measured after implementation: the budget by `verify-export.mjs`, and Lighthouse via the manual checklist.

### Response to design review round 2 (CHANGES_REQUESTED, 0 HIGH / 4 MEDIUM / 4 NIT)

All findings are **addressed**. None are backlogged or ignored.

| # | Sev | Resolution | Where |
|---|---|---|---|
| 1 | MED | MobileNav links are wrapped in `<SheetClose asChild>`. No effect watches `pathname`, and `open` changes only through `onOpenChange`. | §8.2 |
| 2 | MED | Exact `CourseParamSync` code: `useEffectEvent` wraps `onCourse`, deps `[value]`. React is pinned to `^19.2`. New test: after a valid submit and reset with `?course=…`, `course === ''`. | §5, §7.5, §8.3, §14 |
| 3 | MED | The viewport is `overflow-hidden` + `data-carousel-viewport`. `NOSCRIPT_CSS` (in `lib/noscript-css.ts`) restores native scroll-snap and hides `data-reveal-js-only` controls. Index and snaps are updated only from Embla callbacks. AC16 extended. Carousel test added. The noscript sheet also stops the marquee, because its Pause button can't work without JS (2.2.2). | §4.5, §6, §7.1 #2/#8, §14, AC16 |
| 4 | MED | Added an exhaustive inventory table of auto-running CSS animations (aurora, marquee, pulse-3, bob-3, border-sweep) with timings, and one reduced-motion rule derived from it. The caret reference is removed. The bento (c) border and the hero bob (1.5s × 3, max delay 0.3s, ends by 4.8s) are specified. The journey line is a one-shot `Reveal` with `scaleX`/`scaleY`, not scroll-linked. A `motion-inventory.test.ts` enforces the table. | §4.5, §7.1 #4/#6, §8.3, §14, AC6 |
| 5 | NIT | Footer columns are numbered (1)–(4), and the duplicate "Programs" is removed. | §8.2 |
| 6 | NIT | The AnimatedCounter prop is `srLabel`, and the sr-only span renders it alone. `StatsSection` renders the visible `label` as `aria-hidden`. | §7.1 #3, §8.3, §14 |
| 7 | NIT | AC12 reworded: these are user-initiated links, which check 5 doesn't scan. | AC12 |
| 8 | NIT | Course `provider` now has `@type`, `@id`, `name` and `sameAs`. | §11 |

### Response to design review round 3 (CHANGES_REQUESTED, 0 HIGH / 3 MEDIUM / 5 NIT)

All findings are **addressed** (resolutions are authoritative over earlier text; `plan.md` cites each at the step where it lands).

| # | Sev | Resolution | Where |
|---|---|---|---|
| 1 | MED | `layout.tsx` renders `<html lang="en-IN" data-scroll-behavior="smooth" suppressHydrationWarning>`; Next 16 forces `auto` on route transitions, smooth applies only to same-page hash jumps. | §4.5, §6 |
| 2 | MED | `testimonials.ts` exports `interface TestimonialCard { id; name; role; program; quote; rating: 4 \| 5 }`. Server `app/page.tsx` builds `items = testimonials.map(({ courseSlug, ...t }) => ({ ...t, program: getCourseBySlug(courseSlug)!.shortTitle }))`. `TestimonialsCarousel` props `{ items: TestimonialCard[] }`, imports only `import type { TestimonialCard } from '@/data/testimonials'`. Test: every `courseSlug` resolves, exactly 2 per slug. | §8.3, §9.4, §14 |
| 3 | MED | Marquee markup pinned (track `data-marquee-track` + overflow-hidden + mask; rows `animate-marquee flex w-max gap-3`; inner `<ul class="flex flex-wrap gap-3">`; `aria-hidden data-marquee-dup` copy). Fallback rule `.animate-marquee{animation:none!important;transform:none!important;width:auto!important;flex-wrap:wrap;justify-content:center}[data-marquee-track]{mask-image:none!important}` in both NOSCRIPT_CSS and the reduced-motion layer. NOSCRIPT_CSS now 7 rules; tests updated. | §4.5, §6, §7.1 #2, §14 |
| 4 | NIT | `Toaster` (`ui/sonner.tsx`, `'use client'`) added to the client list and to the `no-restricted-imports` override glob. | §6 |
| 5 | NIT | `MobileEnrolBar` props `{ feeLabel: string; href: \`/contact/?course=${CourseSlug}\` }`; observes `document.getElementById('enrol')`. | §7.3, §8.3 |
| 6 | NIT | `site.ts` exports `pageMeta` with home (absolute title "NSIM Education — AI-Powered Career Skills, Kolkata"), `/courses/` "Programs", `/about/` "About Us", `/contact/` "Contact & Enquiries", each with a 70–160 char description. | §7, §9.4 |
| 7 | NIT | `AuroraBackground` root `<div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">`; host sections `relative isolate`. Never overflow-hidden/overflow-x-hidden on html/body/main or EnrolCard ancestors; global guard only `overflow-x: clip` on body. | §4.4 |
| 8 | NIT | Carousel `liveText` is separate state initialised `''`, set only from the `select` event; direct invocation updates only `selectedIndex`/`snaps`. Test asserts empty live region before any select. | §7.1 #8, §14 |
