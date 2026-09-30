/**
 * Rendered once in the root layout as `<noscript><style>{NOSCRIPT_CSS}</style></noscript>`.
 * The only no-JS switching mechanism on the site (design §4.5). Exactly 7 rules.
 */
export const NOSCRIPT_CSS = [
  '[data-reveal]{opacity:1!important;transform:none!important}',
  '[data-carousel-viewport]{overflow-x:auto!important;scroll-snap-type:x mandatory}',
  '[data-carousel-viewport]>*>*{scroll-snap-align:start}',
  '[data-reveal-js-only]{display:none!important}',
  '.animate-marquee{animation:none!important;transform:none!important;width:auto!important;flex-wrap:wrap;justify-content:center}',
  '[data-marquee-track]{mask-image:none!important}',
  '[data-marquee-dup]{display:none!important}',
].join('');
