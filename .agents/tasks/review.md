# Remastered NSIM Education marketing site: iteration 3 review

Iteration 3 is a three-file fix (`not-found.tsx`, `tools-marquee.tsx`, `courses/page.tsx`) that closes the one MEDIUM and three LOW findings from the previous pass. The 404 now uses the same aurora treatment as every other header: `text-foreground/85` sub-copy, `fade`, and `max-lg:opacity-60`. The marquee Pause button comes first in the DOM, so on mobile the visual and tab order match. The lone third course card spans both columns at md. The verification log records clean typecheck, lint, 88/88 tests, build, and 95/95 export checks. It also has 48 fresh captures with `scrollWidth == viewport` on all of them and 17/17 interaction checks. The regenerated tiles show each fix in place.

Watch for: `md:order-last` swaps the mobile mismatch for a desktop one. At md and up, Pause shows on the right but comes first in the DOM (**confirmed**, LOW; the sibling is non-interactive text, so tab order is not affected). The bento "AI-first curriculum" tile at 768 has a large empty lower half next to the certification mock (**confirmed**, LOW; the tile is unchanged in this diff).

**Verdict**: APPROVED

## High-level view

The 404 fix repeats the iteration-1 header pattern exactly, so the page is no longer the odd one out. In `404-375-dark-part1` the sub-copy is now clearly legible over the cyan and pink blob, and in `404-1440-dark-part1` it reads well over the magenta blob. The aurora fades out before the footer on all four 404 tiles I viewed, with no hard edge.

The marquee reorder puts the button first in the DOM and adds `md:order-last` for desktop. That fixes the mobile order mismatch the last pass flagged, and it keeps Pause clear of the Enquire bubble (`home-375-light-part1`). The cost is a smaller mismatch in the opposite direction on desktop.

The courses grid fix uses one scoped variant, `md:max-lg:odd:last:col-span-2`. It only applies when a lone card ends up in the last row at md, so it keeps working if the course count changes. `courses-768-dark-part1` shows the Prompt Engineering card spanning the full width with no orphan cell.

<details>
<summary>Issues (2)</summary>

1. **Desktop Pause order vs DOM order** (LOW): at md and up, `md:order-last` shows Pause after the eyebrow text, but the DOM puts it first. The impact is minimal because the sibling isn't focusable. If exact parity matters, render the eyebrow first on desktop, for example with `max-md:order-first` on the button and the button after the text in the DOM, and accept the mobile mismatch. Otherwise, leave it.
2. **Bento AI-first tile empty at 768** (LOW): in `home-768-dark-part2`, the "AI-first curriculum" tile is stretched to match the certification tile's height and leaves about 200px blank. Add a small visual (as its siblings have) or let the row size to its content at md.

</details>

<details><summary>Details</summary>

### Marquee order at desktop

```tsx
<Container className="mb-6 flex items-center justify-between gap-4">
  <button … className="… motion-reduce:hidden md:order-last">…</button>
  <p className="eyebrow text-muted-foreground">Hands-on with the tools employers use</p>
</Container>
```

Below md, DOM and visual order now match, and Pause sits bottom-left, away from the fixed Enquire bubble. At md and up the flex order puts the eyebrow on the left and Pause on the right, while screen readers still announce the button first. The eyebrow is plain text, so Tab order is the same either way. What remains is a small WCAG 1.3.2 reading-order difference. It is not worth another iteration. **confirmed**.

### Visual pass over the regenerated tiles

I viewed the four 404 tiles (375 and 1440 dark, 375 and 768 light), plus `courses-768-dark-part1`, `home-375-light-part1` and `home-768-dark-part2`. None of them showed horizontal overflow, broken theming or contrast failures. In the 768 and 375 captures, the Enquire bubble overlaps footer and marquee content partway down the page. That is the known Playwright full-page artifact for `position: fixed`, not a layout bug. The one visual weakness is the 768 bento row, where "AI-first curriculum" has no mock visual while its neighbour does. The grid stretches the tile to the taller card's height, which leaves a large empty panel. **confirmed** from the tile. The tile's code is not part of this diff.

</details>

<details>
<summary>File map</summary>

- `src/app/not-found.tsx`: aurora gets `fade` and `max-lg:opacity-60`; sub-copy changes to `text-foreground/85`
- `src/components/sections/tools-marquee.tsx`: Pause button moved first in the DOM with `md:order-last`; `max-md:flex-row-reverse` removed
- `src/app/courses/page.tsx`: `md:max-lg:odd:last:col-span-2` on course `<li>`s
- `.agents/tasks/verification.md`: iteration-3 evidence
- `screenshots/*`, `screenshots/review-tiles/*`: re-captured and re-tiled

Full diff: `git show 9e59b72` (previous iterations: `fea18ec`, `a4bda9d`, `9597ff0`, `7d45611`).

</details>
