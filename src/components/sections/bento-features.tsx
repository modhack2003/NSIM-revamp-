import type { BentoFeature } from '@/data/home';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';
import { cn } from '@/lib/utils';
import { CertificateArt } from './certificate-art';
import { Stagger, StaggerItem } from './reveal';

const SPAN: Record<BentoFeature['id'], string> = {
  live: 'md:col-span-8 lg:col-span-7',
  projects: 'md:col-span-8 lg:col-span-5',
  ai: 'md:col-span-4 lg:col-span-4',
  cert: 'md:col-span-4 lg:col-span-4',
  placement: 'md:col-span-8 lg:col-span-4',
  flexible: 'md:col-span-8 lg:col-span-12',
};

function LiveMock() {
  return (
    <div aria-hidden="true" className="mt-6 rounded-2xl border border-border bg-background/70 p-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-amber px-2.5 py-0.5 text-[11px] font-bold text-accent-amber-foreground">
          <span className="animate-pulse-3 size-1.5 rounded-full bg-accent-amber-foreground" /> LIVE
        </span>
        <span className="text-xs text-muted-foreground">Module 3 · Performance ads</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="col-span-2 aspect-video rounded-xl bg-linear-135 from-primary/40 via-accent-pink/30 to-accent-cyan/30" />
        <div className="grid gap-2">
          <div className="rounded-xl bg-foreground/10" />
          <div className="rounded-xl bg-foreground/10" />
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <span className="h-2 w-1/3 rounded-full bg-foreground/15" />
        <span className="h-2 w-1/4 rounded-full bg-foreground/10" />
      </div>
    </div>
  );
}

function ProjectsMock() {
  return (
    <div aria-hidden="true" className="mt-6 grid grid-cols-3 gap-2">
      {['bg-primary/30', 'bg-accent-cyan/30', 'bg-accent-amber/30', 'bg-accent-pink/30', 'bg-accent-emerald/30'].map((c, i) => (
        <div key={c} className={cn('h-14 rounded-xl border border-border', c, i === 1 && 'row-span-2 h-auto')} />
      ))}
    </div>
  );
}

function FeatureTile({ f }: { f: BentoFeature }) {
  const body = (
    <>
      <span className="grid size-11 place-items-center rounded-2xl bg-primary/12 text-primary">
        <Icon name={f.icon} className="size-5" />
      </span>
      <h3 className="mt-5 text-xl font-bold tracking-tight md:text-2xl">{f.title}</h3>
      <p className="mt-2 max-w-[52ch] text-muted-foreground">{f.description}</p>
    </>
  );

  if (f.id === 'ai') {
    return (
      <div className="animate-border-sweep h-full overflow-hidden rounded-3xl p-px">
        <div className="h-full rounded-[calc(1.5rem-1px)] bg-background bg-[linear-gradient(var(--card),var(--card))] p-6 md:p-8">{body}</div>
      </div>
    );
  }

  return (
    <div className={cn('glass h-full rounded-3xl p-6 md:p-8', f.id === 'flexible' && 'lg:flex lg:items-center lg:gap-8')}>
      {f.id === 'flexible' ? (
        <>
          <div className="lg:flex-1">{body}</div>
          <ul aria-hidden="true" className="mt-6 flex flex-wrap gap-2 lg:mt-0">
            {['Mon', 'Wed', 'Fri · 7 pm', 'Sat', 'Sun · 11 am'].map((d) => (
              <li key={d} className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs text-muted-foreground">
                {d}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          {body}
          {f.id === 'live' ? <LiveMock /> : null}
          {f.id === 'projects' ? <ProjectsMock /> : null}
          {f.id === 'cert' ? <CertificateArt className="mt-6 max-w-56" /> : null}
          {f.id === 'placement' ? (
            <div aria-hidden="true" className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-background/60 p-3">
              <span className="grid size-9 place-items-center rounded-full bg-success/15 text-success">
                <Icon name="check-circle" className="size-5" />
              </span>
              <span className="text-sm font-medium">Interview scheduled</span>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

export function BentoFeatures({ items }: { items: BentoFeature[] }) {
  return (
    <section aria-labelledby="why-heading" className="py-20 md:py-28 lg:py-32">
      <Container>
        <SectionHeading
          id="why-heading"
          eyebrow="Why NSIM"
          title="Everything you need to get hired, not just certified"
          description="Live mentors, real projects and an AI-first curriculum, backed by career support that stays with you until you land the role."
        />
        <Stagger as="ul" className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-8 lg:grid-cols-12">
          {items.map((f) => (
            <StaggerItem as="li" key={f.id} className={SPAN[f.id]}>
              <FeatureTile f={f} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
