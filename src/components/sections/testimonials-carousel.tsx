'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import type { TestimonialCard } from '@/data/testimonials';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { cn } from '@/lib/utils';

const navBtn =
  'grid size-11 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none';

export function TestimonialsCarousel({ items }: { items: TestimonialCard[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [snaps, setSnaps] = React.useState<number[]>([]);
  const [liveText, setLiveText] = React.useState('');

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSync = () => {
      setSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    const onSelectAnnounce = () => {
      setLiveText(`Showing testimonial ${emblaApi.selectedScrollSnap() + 1} of ${items.length}`);
    };
    emblaApi.on('select', onSync);
    emblaApi.on('reInit', onSync);
    emblaApi.on('select', onSelectAnnounce);
    onSync();
    return () => {
      emblaApi.off('select', onSync);
      emblaApi.off('reInit', onSync);
      emblaApi.off('select', onSelectAnnounce);
    };
  }, [emblaApi, items.length]);

  return (
    <section aria-labelledby="testimonials-heading" className="py-20 md:py-28 lg:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="testimonials-heading"
            align="left"
            eyebrow="Learner stories"
            title="Careers our learners have built"
          />
          <div className="flex gap-2" data-reveal-js-only>
            <button type="button" className={navBtn} aria-label="Previous testimonials" onClick={() => emblaApi?.scrollPrev()}>
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <button type="button" className={navBtn} aria-label="Next testimonials" onClick={() => emblaApi?.scrollNext()}>
              <ChevronRight aria-hidden className="size-5" />
            </button>
          </div>
        </div>

        <div aria-roledescription="carousel" aria-label="Learner testimonials" className="mt-12">
          <div ref={emblaRef} className="overflow-hidden" data-carousel-viewport>
            <div className="-ml-4 flex">
              {items.map((t, i) => (
                <div
                  key={t.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${items.length}`}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <figure className="glass flex h-full flex-col rounded-3xl p-6 md:p-7">
                    <Quote aria-hidden className="size-8 text-primary/60" />
                    <p className="mt-3 flex text-accent-amber" aria-hidden="true">
                      {Array.from({ length: 5 }, (_, s) => (
                        <Star key={s} className={cn('size-4', s < t.rating ? 'fill-current' : 'opacity-30')} />
                      ))}
                    </p>
                    <p className="sr-only">Rated {t.rating} out of 5</p>
                    <blockquote className="mt-4 flex-1 text-lg leading-relaxed">“{t.quote}”</blockquote>
                    <figcaption className="mt-6 flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="grid size-11 shrink-0 place-items-center rounded-full bg-linear-135 from-primary to-accent-pink font-bold text-white"
                      >
                        {t.name.charAt(0)}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold">{t.name}</span>
                        <span className="block text-sm text-muted-foreground">
                          {t.program} · {t.role}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal-js-only className="mt-6 flex justify-center">
            <ul className="flex">
              {snaps.map((_, i) => (
                <li key={i}>
                  <button
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === selectedIndex ? 'true' : undefined}
                    onClick={() => emblaApi?.scrollTo(i)}
                    className="group grid size-11 place-items-center rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <span
                      className={cn(
                        'block h-2 rounded-full transition-all duration-300',
                        i === selectedIndex ? 'w-6 bg-primary' : 'w-2 bg-foreground/25 group-hover:bg-foreground/50',
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <p data-reveal-js-only className="sr-only" aria-live="polite" data-testid="carousel-live">
            {liveText}
          </p>
        </div>
      </Container>
    </section>
  );
}
