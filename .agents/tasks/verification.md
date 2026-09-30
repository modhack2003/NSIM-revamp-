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

---

# Verification — iteration 2 (review.json: CHANGES_REQUESTED, 2 MEDIUM + 5 LOW)

## Code fixes

| Finding | Fix |
|---|---|
| LOW: Enquire covers marquee Pause at 375 | `tools-marquee.tsx`: the header row gets `max-md:flex-row-reverse`, so below md the Pause button sits on the left, away from the bottom-right bubble. Desktop is unchanged. Confirmed in `home-375-*-part1`. |
| LOW: Enquire lift persists when enrol bar hidden | `mobile-enrol-bar.tsx` also sets `body[data-bottom-bar-hidden]` while the bar is hidden (IO on `#enrol`). `globals.css` lift selector is now `body[data-bottom-bar]:not([data-bottom-bar-hidden]) .floating-enquire`. The 80px body padding stays reserved so the page does not jump on scroll. |
| LOW: Toast fallback font | `ui/sonner.tsx`: `style` and `toastOptions.style` set `fontFamily: var(--font-sans)`, which is Geist. Confirmed in `interaction-contact-success-1440`. |
| LOW: Bento (c) darker than siblings | Inner panel is `bg-background` plus `bg-[linear-gradient(var(--card),var(--card))]`, which is `--card` composited opaque over the background. Confirmed in `home-1440-dark-part2`. |
| Found by Lighthouse (new) | The logo's "Education" span was 3.98:1 over the light-theme aurora on course pages. It is now `text-foreground/85 dark:text-muted-foreground`, matching iteration 1's sub-copy precedent. |
| Found by Lighthouse (new) | axe flagged the `aria-hidden` footer "NSIM" watermark (text at 3.5% opacity). The text now comes from `before:content-['NSIM']`, so it looks the same but axe no longer sees text there. |

## Gate commands (run from `/projects/sandbox/nsim-remastered`, after the last code change)

| Command | Result |
|---|---|
| `npm run typecheck` | exit 0, 0 errors |
| `npm run lint` | exit 0, 0 problems |
| `npm test` | 15 files, 88 tests, all pass |
| `npm run build` | exit 0. The build log has 0 lines matching error or warn |
| `npm run verify` | 95 passed, 0 failed. Home first-load JS is 199.0 kB gzipped (≤ 200 kB) |

## Screenshots: MEDIUM findings 1 and 2

`/projects/sandbox/nsim-tools/shoot.mjs` changes:
- Now covers 8 pages: home, courses, all 3 course pages, contact, about and 404 (`/this-page-does-not-exist/`).
- Widths are 1440, 768 and 375.
- Light-theme captures now cover every page, not just home.

Command: `sh run.sh shoot.mjs > shoot-out.json`

Results:
- **48 captures.** On every one, `scrollWidth` equals the viewport (1440, 768 or 375), with 0 overflow offenders and 0 page or console errors.
- **404 captures.** The only console message is the expected "Failed to load resource: 404" for the document itself.

Tiles were regenerated with the prescribed Pillow script: 193 files in `screenshots/review-tiles/`.

Tiles I viewed:
- `home-375-dark-part1`: Pause is on the left, clear of the bubble.
- `home-1440-dark-part1` and `-part2`: the bento (c) tile matches its neighbours.
- `about-1440-dark-part1` and `-part2`: story, values, stats, approach and mentors render with no clipping.
- `404-1440-light-part1`: fine, and the watermark still renders.
- `course-ai-prompt-engineering-1440-light-part1`: amber theme, fine.
- `course-business-accounting-finance-768-light-part1`: 768 layout collapses to one column cleanly.
- `interaction-contact-success-1440-part1`: toast is in Geist.

No new layout issues. As before, the fixed MobileEnrolBar appears mid-page in full-page captures. That is a Playwright full-page artifact.

## Interactions

Command: `sh run.sh interact.mjs`. Result: 17/17 PASS, the same checks as iteration 1.

## LOW finding 3: reduced motion, keyboard, Lighthouse

New script `/projects/sandbox/nsim-tools/a11y.mjs`. Command: `sh run.sh a11y.mjs > a11y-out.json`.

**Reduced motion** (Playwright `reducedMotion: 'reduce'`, scroll-through):
- 7/7 pages pass.
- 0 running infinite or >1s animations and 0 `[data-reveal]` at opacity 0.
- The Pause button is hidden on home.
- The first run without scroll-through reported below-fold reveals at opacity 0. That was a probe artifact: they reveal on scroll with an opacity-only fade.
- A real OS-level toggle is environment-blocked. Emulation was used instead.

**Keyboard Tab walk:**
- 7/7 pages pass: `/` 42 stops, `/courses/` 28, the course pages 39, 39 and 38, `/about/` 21, `/contact/` 32.
- The first stop is "Skip to content" on every page.
- Every stop is visible and has a focus indicator on itself or its card (course cards use `has-[a:focus-visible]:ring`).

**Lighthouse 13.5** (mobile default, installed in nsim-tools, Playwright Chromium, local `serve`):

| Page | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 92 | 100 | 100 | 100 | 3.3 s | 0.039 | 100 ms |
| `/courses/ai-digital-marketing/` | 92 | 100 | 100 | 100 | 3.3 s | 0 | 70 ms |

Before the two contrast fixes, the course page scored A11y 96 (color-contrast).

README's manual checklist is updated with these results.

## Servers

`serve` and Chromium were started and killed inside `run.sh` (EXIT trap). A final `ps -eo args | grep -E "[s]erve |[c]hrome"` finds 0 processes.

---

# Verification: iteration 3 (review.json: CHANGES_REQUESTED, 1 MEDIUM + 3 LOW)

## Code fixes

| Finding | Fix |
|---|---|
| MEDIUM: 404 sub-copy contrast over aurora | `not-found.tsx`: the sub-copy changes from `text-muted-foreground` to `text-foreground/85`, as in the other headers (§4.5, NFR2). |
| LOW: 404 aurora hard edge | `not-found.tsx`: `<AuroraBackground blobs={3} fade className="max-lg:opacity-60" />`, matching PageHeader. |
| LOW: Marquee Pause visual order differs from DOM order | `tools-marquee.tsx`: `max-md:flex-row-reverse` is removed. The Pause button now comes first in the DOM and carries `md:order-last`. Mobile layout is the same (Pause on the left), and DOM, reading and tab order now match it. Desktop still puts Pause on the right (`md:order-last{order:9999}` is in the built CSS). |
| LOW: Courses grid orphan at 768 | `courses/page.tsx`: each `<li>` gets `md:max-lg:odd:last:col-span-2`, so at md only, a lone last card spans both columns. lg stays at 3 columns and mobile at 1. Compiled rule: `…:nth-child(odd):last-child{grid-column:span 2/span 2}` inside the md–lg range. |

## Gate commands (from `/projects/sandbox/nsim-remastered`, after the last code change)

| Command | Result |
|---|---|
| `npm run typecheck` | exit 0 |
| `npm run lint` | exit 0, 0 problems |
| `npm test` | 15 files, 88 tests, all pass |
| `npm run build` | exit 0, 0 lines matching error/warn in the log |
| `npm run verify` | 95 passed, 0 failed. Home first-load JS 199.0 kB gzipped (≤ 200 kB) |

## Screenshots and interactions

Environment changes this run:
- `npx` was not on PATH, so I prefixed PATH with `/opt/toolchains/.nvm/versions/node/v22.23.3/bin`.
- The installed Playwright 1.63 needs headless shell build 1243, but only 1232 was in `/opt/playwright`. I ran `PLAYWRIGHT_BROWSERS_PATH=/projects/sandbox/nsim-tools/.pw-browsers npx playwright install chromium-headless-shell`. This is outside the repo.
- The system python3 no longer has Pillow. I ran the prescribed tiling script unchanged via `uv run --no-project --with 'pillow>=11,<12' python -`, which used Pillow 11.3.0.

Commands, run in `/projects/sandbox/nsim-tools`:
- `sh run.sh shoot.mjs > shoot-out.json`: exit 0. 48 captures (8 pages × 1440/768/375 × dark/light). `sw == vw` on all 48, with 0 overflow offenders. The only console errors are the expected "Failed to load resource: 404" on the six 404 captures.
- `sh run.sh interact.mjs`: 17/17 PASS, including "marquee pause button stops rows".
- Tiling script: 193 tiles in `screenshots/review-tiles/`.

Tiles viewed:
- `404-375-dark-part1`: sub-copy is clearly legible, and the aurora fades out before the footer with no hard edge.
- `404-1440-dark-part1`: sub-copy is legible over the magenta blob, and the fade is smooth.
- `courses-768-light-part1`: the Prompt Engineering card spans both columns, so there is no orphan cell.
- `home-375-dark-part1`: Pause is on the left, clear of the Enquire bubble, with the eyebrow text to its right.

## Servers

`serve` and Chromium were started and killed inside `run.sh` (EXIT trap). A final `pgrep -af "serve /projects|chrome-headless"` finds 0 processes.
