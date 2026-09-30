import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { ctaBand } from '@/data/home';
import { siteConfig } from '@/data/site';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { AuroraBackground } from './aurora-background';

export function CtaBand() {
  return (
    <section aria-labelledby="cta-heading" className="py-16 md:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-muted/60 px-6 py-14 text-center md:px-12 md:py-20">
          <AuroraBackground blobs={3} />
          <h2
            id="cta-heading"
            className="mx-auto max-w-3xl text-[clamp(2rem,3vw+1rem,3.5rem)] leading-[1.05] font-extrabold tracking-[-0.02em]"
          >
            {ctaBand.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-[60ch] text-lg text-muted-foreground">{ctaBand.sub}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact/">
                Enquire now <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href={siteConfig.phoneHref}>
                <Phone aria-hidden className="size-4" /> Call us
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
