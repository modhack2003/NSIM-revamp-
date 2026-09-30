import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { courses, toCardData } from '@/data/courses';
import { hero, pickStats } from '@/data/home';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { formatCounter } from '@/lib/utils';
import { AuroraBackground } from './aurora-background';
import { GridPattern } from './grid-pattern';
import { HeroPreviewStack } from './hero-preview-stack';
import { RotatingWords } from './rotating-words';

const AVATARS = [
  ['AS', 'from-primary to-accent-pink'],
  ['PM', 'from-accent-cyan to-accent-emerald'],
  ['RD', 'from-accent-amber to-primary'],
  ['SB', 'from-accent-pink to-accent-amber'],
] as const;

export function HeroSection() {
  const [learners, rating] = pickStats(['learners', 'rating']);
  return (
    <section className="relative isolate overflow-clip pt-10 pb-20 md:pt-16 lg:flex lg:min-h-[92svh] lg:items-center lg:pb-28">
      <AuroraBackground fade className="max-lg:opacity-60" />
      <GridPattern />
      <Container className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
        <div className="flex flex-col items-start gap-7">
          <p className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm font-medium">
            <span className="animate-pulse-3 size-2 rounded-full bg-accent-amber" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className="text-[clamp(2.5rem,6vw+1rem,5.5rem)] leading-[0.95] font-extrabold tracking-[-0.03em]">
            <span className="block">Build a career in</span>{' '}
            <span className="sr-only">AI digital marketing, prompt engineering and accounting</span>
            <RotatingWords aria-hidden words={hero.rotatingWords} className="max-w-full" />
          </h1>
          <p className="max-w-[58ch] text-lg text-foreground/85 md:text-xl">{hero.sub}</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="lg">
              <Link href={hero.primaryCta.href}>
                {hero.primaryCta.label} <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex -space-x-3" aria-hidden="true">
              {AVATARS.map(([initials, grad]) => (
                <span
                  key={initials}
                  className={`grid size-10 place-items-center rounded-full bg-linear-135 ${grad} text-xs font-bold text-white ring-2 ring-background`}
                >
                  {initials}
                </span>
              ))}
            </div>
            <div className="text-sm">
              <p className="font-semibold">
                Trusted by {formatCounter(learners.value, learners.decimals, learners.prefix, learners.suffix)} learners
              </p>
              <p className="flex items-center gap-1.5 text-foreground/85">
                <span className="flex text-accent-amber" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </span>
                <span aria-hidden="true">{formatCounter(rating.value, rating.decimals)}/5</span>
                <span className="sr-only">Rated {formatCounter(rating.value, rating.decimals)} out of 5</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <HeroPreviewStack items={courses.map(toCardData)} />
        </div>
      </Container>
    </section>
  );
}
