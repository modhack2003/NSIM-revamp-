import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { tools } from '@/data/tools';
import { ToolsMarquee } from '@/components/sections/tools-marquee';

describe('ToolsMarquee', () => {
  it('uses the pinned markup and a working pause toggle', async () => {
    const { container } = render(<ToolsMarquee tools={tools.filter((t) => t.marqueeRow)} />);
    expect(screen.getByRole('heading', { level: 2, name: "Tools you'll master" })).toHaveClass('sr-only');

    const tracks = container.querySelectorAll('[data-marquee-track]');
    expect(tracks).toHaveLength(2);
    tracks.forEach((track) => {
      const row = track.firstElementChild!;
      expect(row).toHaveClass('animate-marquee', 'flex', 'w-max');
      const [first, dup] = Array.from(row.children);
      expect(first.tagName).toBe('UL');
      expect(first).toHaveClass('flex-wrap');
      expect(dup).toHaveAttribute('aria-hidden');
      expect(dup).toHaveAttribute('data-marquee-dup');
    });
    expect(tracks[1].firstElementChild!.className).toContain('[animation-direction:reverse]');

    const btn = screen.getByRole('button', { name: 'Pause tool ticker' });
    expect(btn).toHaveAttribute('aria-pressed', 'false');
    expect(btn).toHaveAttribute('data-reveal-js-only');
    expect(btn.className).toContain('motion-reduce:hidden');
    await userEvent.click(btn);
    expect(screen.getByRole('button', { name: 'Play tool ticker' })).toHaveAttribute('aria-pressed', 'true');
    expect(container.querySelector('[data-paused]')).not.toBeNull();
  });
});
