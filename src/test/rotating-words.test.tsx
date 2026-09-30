import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render } from '@testing-library/react';

const reduced = vi.hoisted(() => ({ value: false }));

vi.mock('motion/react', async (orig) => {
  const actual = await orig<typeof import('motion/react')>();
  return { ...actual, useReducedMotion: () => reduced.value };
});

import { RotatingWords } from '@/components/sections/rotating-words';

const WORDS = ['AI Digital Marketing', 'Prompt Engineering', 'Accounting & GST'] as const;

function currentWord(container: HTMLElement) {
  return container.querySelector('[data-current]')?.getAttribute('data-current');
}

describe('RotatingWords', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.useRealTimers();
    reduced.value = false;
  });

  it('changes exactly 3 times at 1.4s, 2.8s and 4.2s, ending on the first word', () => {
    const { container } = render(<RotatingWords words={WORDS} />);
    const seen: (string | null | undefined)[] = [currentWord(container)];
    const step = (ms: number) => act(() => void vi.advanceTimersByTime(ms));

    step(1399);
    expect(currentWord(container)).toBe(WORDS[0]);
    step(1);
    expect(currentWord(container)).toBe(WORDS[1]);
    seen.push(currentWord(container));
    step(1400);
    expect(currentWord(container)).toBe(WORDS[2]);
    seen.push(currentWord(container));
    step(1400);
    expect(currentWord(container)).toBe(WORDS[0]);
    seen.push(currentWord(container));

    step(10_000);
    expect(currentWord(container)).toBe(WORDS[0]);
    expect(seen).toEqual([WORDS[0], WORDS[1], WORDS[2], WORDS[0]]);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('makes no changes under reduced motion', () => {
    reduced.value = true;
    const { container } = render(<RotatingWords words={WORDS} />);
    expect(vi.getTimerCount()).toBe(0);
    act(() => void vi.advanceTimersByTime(6000));
    expect(currentWord(container)).toBe(WORDS[0]);
  });
});
