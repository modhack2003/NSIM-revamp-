'use client';

import * as React from 'react';
import { Pause, Play } from 'lucide-react';
import type { Tool } from '@/data/tools';
import { Chip } from '@/components/ui/chip';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

function MarqueeRow({ items, reverse }: { items: Tool[]; reverse?: boolean }) {
  const chips = items.map((t) => (
    <li key={t.id}>
      <Chip icon={t.icon}>{t.label}</Chip>
    </li>
  ));
  return (
    <div data-marquee-track className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div className={cn('animate-marquee flex w-max gap-3', reverse && '[animation-direction:reverse]')}>
        <ul className="flex flex-wrap gap-3">{chips}</ul>
        <ul aria-hidden data-marquee-dup className="flex flex-wrap gap-3">
          {chips}
        </ul>
      </div>
    </div>
  );
}

export function ToolsMarquee({ tools }: { tools: Tool[] }) {
  const [paused, setPaused] = React.useState(false);
  const row1 = tools.filter((t) => t.marqueeRow === 1);
  const row2 = tools.filter((t) => t.marqueeRow === 2);

  return (
    <section aria-labelledby="tools-heading" className="border-y border-border bg-muted/40 py-10">
      <h2 id="tools-heading" className="sr-only">
        Tools you&apos;ll master
      </h2>
      {/* Below md the Pause control sits on the left so the fixed Enquire bubble (bottom-right) can't cover it. */}
      <Container className="mb-6 flex items-center justify-between gap-4 max-md:flex-row-reverse">
        <p className="eyebrow text-muted-foreground">Hands-on with the tools employers use</p>
        <button
          type="button"
          data-reveal-js-only
          aria-pressed={paused}
          aria-label={paused ? 'Play tool ticker' : 'Pause tool ticker'}
          onClick={() => setPaused((p) => !p)}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none motion-reduce:hidden"
        >
          {paused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
        </button>
      </Container>
      <div data-paused={paused || undefined} className="flex flex-col gap-3">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
