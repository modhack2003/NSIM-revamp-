import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';

vi.mock('motion/react', async (orig) => {
  const actual = await orig<typeof import('motion/react')>();
  return { ...actual, useReducedMotion: () => true };
});

import { AnimatedCounter } from '@/components/sections/animated-counter';

describe('AnimatedCounter', () => {
  it('renders the final value, sr-only label, and aria-hidden number under reduced motion', () => {
    const { container } = render(
      <AnimatedCounter value={5000} suffix="+" srLabel="5,000+ learners trained" />,
    );
    const num = container.querySelector('[data-counter]')!;
    expect(num.textContent).toBe('5,000+');
    expect(num.getAttribute('aria-hidden')).toBe('true');
    const sr = container.querySelector('.sr-only')!;
    expect(sr.textContent).toBe('5,000+ learners trained');
  });

  it('formats decimals', () => {
    const { container } = render(<AnimatedCounter value={4.8} decimals={1} suffix="★" srLabel="4.8 out of 5" />);
    expect(container.querySelector('[data-counter]')!.textContent).toBe('4.8★');
  });
});
