import { describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import type { TestimonialCard } from '@/data/testimonials';

type Handler = () => void;

const embla = vi.hoisted(() => {
  const state = {
    api: undefined as undefined | Record<string, unknown>,
    handlers: new Map<string, Set<() => void>>(),
    selected: 0,
  };
  const api = {
    on: (evt: string, fn: () => void) => {
      if (!state.handlers.has(evt)) state.handlers.set(evt, new Set());
      state.handlers.get(evt)!.add(fn);
      return api;
    },
    off: (evt: string, fn: () => void) => {
      state.handlers.get(evt)?.delete(fn);
      return api;
    },
    scrollSnapList: () => [0, 0.2, 0.4, 0.6, 0.8, 1],
    selectedScrollSnap: () => state.selected,
    scrollPrev: () => {},
    scrollNext: () => {},
    scrollTo: () => {},
  };
  return { state, api };
});

vi.mock('embla-carousel-react', () => ({
  default: () => [() => {}, embla.state.api],
}));

import { TestimonialsCarousel } from '@/components/sections/testimonials-carousel';

const items: TestimonialCard[] = Array.from({ length: 6 }, (_, i) => ({
  id: `t${i}`,
  name: `Person ${i}`,
  role: 'Role',
  program: 'Program',
  quote: `Quote ${i}`,
  rating: 5,
}));

const fire = (evt: string) => embla.state.handlers.get(evt)?.forEach((fn: Handler) => fn());
const dots = () => screen.queryAllByRole('button', { name: /Go to slide/ });
const live = () => screen.getByTestId('carousel-live');

describe('TestimonialsCarousel', () => {
  it('renders all slides with no dots and an empty live region before the API exists', () => {
    embla.state.api = undefined;
    const { container } = render(<TestimonialsCarousel items={items} />);
    expect(screen.getAllByRole('group')).toHaveLength(6);
    expect(dots()).toHaveLength(0);
    expect(live().textContent).toBe('');

    const viewport = container.querySelector('[data-carousel-viewport]')!;
    expect(viewport).toHaveClass('overflow-hidden');
    expect(screen.getByRole('button', { name: 'Previous testimonials' }).closest('[data-reveal-js-only]')).not.toBeNull();
    expect(live()).toHaveAttribute('data-reveal-js-only');
  });

  it('syncs dots on mount without announcing, then announces on select', () => {
    embla.state.api = embla.api;
    embla.state.handlers.clear();
    embla.state.selected = 0;
    const { unmount } = render(<TestimonialsCarousel items={items} />);

    expect(dots()).toHaveLength(6);
    expect(dots()[0]).toHaveAttribute('aria-current', 'true');
    expect(live().textContent).toBe('');

    embla.state.selected = 2;
    act(() => fire('select'));
    expect(dots()[2]).toHaveAttribute('aria-current', 'true');
    expect(dots()[0]).not.toHaveAttribute('aria-current');
    expect(live().textContent).toBe('Showing testimonial 3 of 6');

    unmount();
    const remaining = [...embla.state.handlers.values()].reduce((n, s) => n + s.size, 0);
    expect(remaining).toBe(0);
  });
});
