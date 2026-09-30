import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { AuroraBackground } from '@/components/sections/aurora-background';

export const metadata: Metadata = { title: 'Page not found', robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="relative isolate py-24 md:py-32">
      <AuroraBackground blobs={3} fade className="max-lg:opacity-60" />
      <Container className="flex flex-col items-center text-center">
        <p aria-hidden="true" className="text-gradient font-display text-[clamp(6rem,20vw,14rem)] leading-none font-extrabold tracking-tighter">
          404
        </p>
        <h1 className="mt-4 text-[clamp(2rem,3vw+1rem,3.5rem)] font-extrabold tracking-tight">This page skipped class.</h1>
        <p className="mt-4 max-w-md text-lg text-foreground/85">
          The page you are looking for has moved or never existed. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/courses/">
              Browse programs <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
