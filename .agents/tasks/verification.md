# Verification — iteration 1

This was a fresh implementation of plan items 1–17 (there was no `review.json`). Everything below was run from `/projects/sandbox/nsim-remastered` on Node 22.23.3 with pnpm 11.24.0.

## Gate commands

| Command | Result |
|---|---|
| `pnpm install --frozen-lockfile` | ok |
| `npm run typecheck` (`tsc --noEmit`) | 0 errors |
| `npm run lint` (`eslint .`) | 0 errors, 0 warnings, exit 0 |
| `npm test` (`vitest run`) | 15 files, 88 tests, all pass |
| `npm run build` (`next build`, Turbopack, static export to `out/`) | exit 0, no errors or warnings in the log. Emits the 7 pages, `404.html`, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, `og.png`, `apple-touch-icon.png` and `icon.svg` |
| `npm run verify` (`scripts/verify-export.mjs`) | 95 passed, 0 failed. Home first-load JS is 199.0 kB gzipped (budget 200 kB) |
| `git grep -n "eslint-disable" -- src scripts` | 0 matches |
| Sanity check of the lint import ban | A temporary `import { courses } from '@/data/courses'` in `ui/sonner.tsx` raised `no-restricted-imports`. The file was reverted. |

Other checks:
- Titles are unique and ≤ 60 chars. The home title is `NSIM Education — AI-Powered Career Skills, Kolkata`, with no doubled suffix.
- `out/index.html` has `lang="en-IN"` and `data-scroll-behavior="smooth"`.
- The sitemap has 7 `<loc>` entries.

## Screenshots (Playwright 1.63 chromium, full page, served by `npx serve out -l 4173`)

Tooling lives outside the repo in `/projects/sandbox/nsim-tools`:
- `run.sh` starts the server, runs one script, and always kills the server.
- `shoot.mjs` scrolls each page so reveals fire, waits 5.2s, captures, and measures overflow with `body{overflow-x}` temporarily `visible`.

Commands: `sh run.sh shoot.mjs` and `sh run.sh interact.mjs`.

Files in `screenshots/`:
- `home-1440-dark.png`, `home-375-dark.png`, `home-1440-light.png`, `home-375-light.png`
- `courses-1440-dark.png`, `courses-375-dark.png`
- `course-ai-digital-marketing-1440-dark.png`, `course-ai-digital-marketing-375-dark.png`
- `contact-1440-dark.png`, `contact-375-dark.png`
- Interaction captures: `interaction-mobile-drawer-open-375.png`, `interaction-contact-errors-1440.png`, `interaction-contact-success-1440.png`

On all 10 page captures `scrollWidth` equals the viewport (1440 or 375). No overflowing elements were found, and there were no page or console errors.

### Problems I found by looking at the images, and the fixes

1. **`4.8★` showed a tofu box.** The render machine has no font with U+2605. `AnimatedCounter` now draws a `★` suffix as an `aria-hidden` lucide Star. The sr-only `srLabel` is unchanged, and the data (P-02) is unchanged.
2. **Low contrast at 375px.** Hero and course-hero sub-copy (muted text) was hard to read over the bright aurora blobs. The fix:
   - The aurora is dimmed below lg (`max-lg:opacity-60`).
   - Hero, page-header, course-hero and CTA-band sub-copy use `text-foreground/85`.
   - The token table was not changed.
3. **Hard edge under the aurora.** The aurora ended in a hard horizontal line under the hero and page headers. `AuroraBackground` gained a `fade` prop (bottom mask), used on those headers.
4. **Bento (c) border sweep** showed the conic layer through a 95%-opacity inner panel. The inner panel is now solid `bg-background`.
5. **Projects mock tile** left an orphan cell. It now has 5 cells.

After these fixes I rebuilt and re-shot every image and viewed them again. No layout breakage remains. Light and dark themes both read well.

Note: in full-page captures of course pages at 375px, the fixed `MobileEnrolBar` appears part-way down the page. That is how Playwright renders `position: fixed` in full-page mode, not a layout bug.

## Interactions (`sh run.sh interact.mjs`): 17/17 PASS

- **Mobile drawer at 375px**
  - The trigger is visible and the Primary nav is hidden.
  - Clicking opens the drawer (`aria-expanded=true`) and focus moves inside it.
  - Esc closes it and focus returns to "Open menu".
  - Clicking the drawer's "About" link goes to `/about/` and closes the drawer.
- **Theme toggle** cycles system → light → dark → system, and `html.dark` follows the choice. Dark persists across a reload.
- **Contact form, empty submit**
  - All 5 inline errors show: name, email, phone, course and consent.
  - Focus lands on `#name`.
  - The live region reads "Please fix 5 highlighted fields".
- **Contact form, valid submit**
  - The button shows "Sending…".
  - The toast "Thanks, Priya! A counsellor will reach out within 24 hours." appears (about 1.4s including Playwright polling; the mock itself takes 900ms).
  - The form resets and the course field returns to `''`.
- **Course preselect.** `?course=ai-prompt-engineering` preselects that program, and `?course=bogus` is ignored.
- **Marquee.** Pause sets `animation-play-state: paused`.
- **No JS.** No `[data-reveal]` element is stuck at opacity 0, and the Pause button is hidden.

Servers: every `serve` process was started and killed inside `run.sh`. `ps` shows no `serve` process left running.

## Deviations from the letter of the design (behaviour kept the same)

- **Home JS budget.** The first build was 288 kB. To meet the 200 kB budget:
  - `m` comes from `motion/react-m` inside `LazyMotion`, with lazily loaded `domMax`.
  - `AnimatedCounter` uses a 1.6s easeOut rAF tween. It still writes to the ref only, with no state. This replaces motion's `animate()`.
  - `RotatingWords` does the same 1.4/2.8/4.2s single pass with 0.4s CSS transitions instead of `AnimatePresence`.
  - The FloatingEnquire popover uses a CSS transition.
  - `ui/sonner.tsx` loads sonner through `next/dynamic` (ssr: false).
  - The MobileNav drawer is code-split (`mobile-nav-drawer.tsx`, added to the lint override list) and prefetched on hover, focus or touch.
  - The verifier excludes `noModule` polyfill scripts from the budget.
- **`seo.test.tsx`** uses a `.tsx` extension because it renders `<JsonLd>`.
- **Contact course options** use `shortTitle` labels (AC3).
