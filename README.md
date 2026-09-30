# NSIM Education — remastered site

A static marketing site for NSIM Education (Kolkata). It covers three live online programs: AI-Powered Digital Marketing, Business Accounting & Finance, and AI-Powered Prompt Engineering.

## Stack

- Next.js 16 (App Router, `output: 'export'`, `trailingSlash: true`), React 19, TypeScript 5.9 (strict)
- Tailwind CSS v4 (CSS-first tokens in `src/app/globals.css`), hand-authored shadcn-style primitives on `radix-ui`
- `motion` (loaded via `LazyMotion`), `next-themes`, `embla-carousel-react`, `react-hook-form` + `zod` 4, `sonner`, `lucide-react`
- Vitest + Testing Library; `scripts/verify-export.mjs` checks the static export

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
| No horizontal overflow at 375 / 1440 (both themes on home) | Pass (Playwright, iteration 1: scrollWidth = viewport on all 10 captures) |
| No horizontal overflow at 320 / 768 / 1920 | Not yet recorded |
| Keyboard-only pass on all 6 pages | Partial: drawer focus trap/restore and form error focus verified in Playwright |
| OS reduced-motion pass | Not yet recorded (CSS rules unit-tested in `motion-inventory.test.ts`) |
| JS-disabled pass | Pass for home: no `[data-reveal]` stuck at opacity 0, JS-only controls hidden |
| Hero / glass-card contrast over aurora (colour picker) | Visually checked in screenshots, not yet measured |
| Lighthouse mobile `/` and `/courses/ai-digital-marketing/` | Not yet run (no Lighthouse in this environment) |

See `.agents/tasks/verification.md` for the commands and results of each iteration.
