# NSIM Education — remastered site

A static marketing site for NSIM Education (Kolkata). It covers three live online programs: AI-Powered Digital Marketing, Business Accounting & Finance, and AI-Powered Prompt Engineering.

## Stack

- Next.js 16 (App Router, `output: 'export'`, `trailingSlash: true`), React 19, TypeScript 5.9 (strict)
- Tailwind CSS v4 (CSS-first tokens in `src/app/globals.css`), hand-authored shadcn-style primitives on `radix-ui`
- `motion` (loaded via `LazyMotion`), `next-themes`, `embla-carousel-react`, `react-hook-form` + `zod` 4, `sonner`, `lucide-react`
- Vitest + Testing Library; `scripts/verify-export.mjs` checks the static export

## Install and run

Requires Node 22 and pnpm.

```sh
pnpm install --frozen-lockfile
pnpm dev          # http://localhost:3000
pnpm build        # static export to out/
pnpm start        # serve out/
```

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Static export to `out/`. Needs network once so next/font can fetch Bricolage Grotesque / Geist |
| `pnpm start` | `npx serve out` |
| `pnpm typecheck` / `pnpm lint` / `pnpm test` | tsc, ESLint (flat config), Vitest |
| `pnpm verify` | Export verifier: files, per-page SEO, JSON-LD, sitemap, no external assets, home JS ≤ 200 kB gzipped |

Full gate: `pnpm install --frozen-lockfile && pnpm typecheck && pnpm lint && pnpm test && pnpm build && pnpm verify`

## Configuration

- `NEXT_PUBLIC_SITE_URL`: the canonical origin (default `https://www.nsimeducation.com`). It must be `https:`, or the build fails with `Invalid NEXT_PUBLIC_SITE_URL: <value>`.

## Content handover

Every unknown fact is a placeholder. In `src/data/**` each one sits on a line ending with `// PLACEHOLDER P-xx`. [`CONTENT.md`](./CONTENT.md) lists all 42 ids, and `src/test/placeholders.test.ts` keeps the two in sync. All course content lives in `src/data/courses.ts`.

## Implementation notes

- **JS budget.** Next/React alone is about 163 kB gzipped. To stay under 200 kB:
  - `m` is imported from `motion/react-m` with lazily loaded features.
  - The toast host and the mobile drawer are code-split. The drawer is prefetched on hover, focus or touch of the trigger.
  - The counter tween and the rotating hero word use rAF/CSS instead of motion's `animate()` / `AnimatePresence`.
  - The verifier skips the `noModule` polyfill script, because module browsers never download it.
- **Rating star.** The `★` stat suffix is drawn as an icon, because many system font stacks lack the glyph.

## Manual checklist (design §14)

| Check | Result |
|---|---|
| No horizontal overflow at 375 / 768 / 1440, both themes, all 8 pages incl. 404 | Pass (Playwright, iteration 2: scrollWidth = viewport on all 48 captures) |
| No horizontal overflow at 320 / 1920 | Not recorded (not in AC7) |
| Keyboard-only pass on all pages | Pass (Playwright Tab walk on 7 pages: skip link first, every stop visible with a focus ring on itself or its card) |
| Reduced-motion pass (`reducedMotion: 'reduce'` emulation) | Pass on 7 pages: no infinite or >1s animations running, no reveal stuck at opacity 0, marquee Pause hidden. A physical OS toggle was not available |
| JS-disabled pass | Pass for home: no `[data-reveal]` stuck at opacity 0, JS-only controls hidden |
| Contrast over aurora | Lighthouse/axe color-contrast passes on `/` and `/courses/ai-digital-marketing/` (light) |
| Lighthouse 13 mobile `/` and `/courses/ai-digital-marketing/` | Perf 92 / A11y 100 / BP 100 / SEO 100 on both, measured against local `serve` with Playwright Chromium |

See `.agents/tasks/verification.md` for the commands and results of each iteration.

## Screenshots

- **Committed:** `screenshots/*.png`. These are 48 full-page captures (8 pages × 1440/768/375 × dark/light) plus the interaction captures.
- **Gitignored:** `screenshots/review-tiles/`. The tiles are derived from the captures and can be regenerated, so they are not committed.

To regenerate:

1. Run `pnpm build`.
2. Serve the export with `npx serve out -l 4173`.
3. Capture every page with Playwright (Chromium, `fullPage: true`) at each viewport and theme. Save each capture to `screenshots/<page>-<width>-<theme>.png`.
4. Stop the server.

The capture scripts (`run.sh`, `shoot.mjs`, `interact.mjs`) live outside this repo, in `/projects/sandbox/nsim-tools`. `sh run.sh shoot.mjs` starts the server, captures, and always stops the server.

To tile the captures, slice each one into 1800px-high strips at full width with Pillow. Save the strips as `screenshots/review-tiles/<name>-partN.png` (N starts at 1). Every tile is under 2000px on both sides, so the tiles are safe to inspect.
