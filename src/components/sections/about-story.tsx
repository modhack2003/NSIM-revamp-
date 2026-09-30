import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';

function SkylineArt({ foundedYear }: { foundedYear: number }) {
  return (
    <div className="glass relative overflow-hidden rounded-3xl p-6">
      <svg viewBox="0 0 400 260" aria-hidden="true" focusable="false" className="w-full text-foreground">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0.35" />
            <stop offset="1" stopColor="var(--accent-amber)" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <rect width="400" height="260" rx="16" fill="url(#sky)" />
        <circle cx="300" cy="80" r="34" fill="var(--accent-amber)" fillOpacity="0.7" />
        {/* stylised cantilever bridge */}
        <path d="M0 200 H400" stroke="currentColor" strokeOpacity="0.35" strokeWidth="3" />
        <path d="M60 200 L110 110 L160 200 M240 200 L290 110 L340 200" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="3" />
        <path d="M110 110 L200 170 L290 110" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="3" />
        <path d="M110 110 V200 M290 110 V200" stroke="currentColor" strokeOpacity="0.5" strokeWidth="5" />
        {/* skyline blocks */}
        <g fill="currentColor" fillOpacity="0.12">
          <rect x="10" y="150" width="30" height="50" />
          <rect x="170" y="140" width="22" height="60" />
          <rect x="200" y="125" width="28" height="75" />
          <rect x="350" y="145" width="36" height="55" />
        </g>
        <path d="M0 215 C 80 205, 160 225, 240 212 S 360 205, 400 215 V260 H0Z" fill="var(--accent-cyan)" fillOpacity="0.35" />
      </svg>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="font-semibold">Kolkata, West Bengal</span>
        <span className="text-muted-foreground">Est. {foundedYear}</span>
      </div>
    </div>
  );
}

export function AboutStory({ story, foundedYear }: { story: string[]; foundedYear: number }) {
  return (
    <section aria-labelledby="story-heading" className="py-16 md:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading id="story-heading" align="left" eyebrow={`Our story · since ${foundedYear}`} title="Built in Kolkata, for the future of work" />
          <div className="mt-6 flex flex-col gap-4 text-lg text-muted-foreground">
            {story.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>
        <SkylineArt foundedYear={foundedYear} />
      </Container>
    </section>
  );
}
