import Link from 'next/link';
import { ArrowRight, CalendarDays, Check, Clock, MonitorPlay, Repeat } from 'lucide-react';
import type { Course } from '@/data/course-types';
import { Button } from '@/components/ui/button';
import { formatFee, formatNextBatch } from '@/lib/utils';

/** Sticky on lg. No ancestor may set overflow hidden, or `position: sticky` stops working (round-3 #7). */
export function EnrolCard({ course }: { course: Course }) {
  const href = `/contact/?course=${course.slug}`;
  return (
    <aside id="enrol" aria-labelledby="enrol-heading" className="glass rounded-3xl p-6 shadow-[0_30px_80px_-40px_var(--primary)] md:p-7 lg:sticky lg:top-24">
      <h2 id="enrol-heading" className="eyebrow text-muted-foreground">
        Program fee
      </h2>
      <p className="mt-2 font-display text-4xl font-extrabold tracking-tight">{formatFee(course.fee)}</p>
      <p className="mt-1 text-sm text-muted-foreground">{course.fee.note}</p>

      <dl className="mt-6 flex flex-col gap-3 border-y border-border py-5 text-sm">
        <div className="flex items-center gap-3">
          <CalendarDays aria-hidden className="size-4 text-primary" />
          <dt className="sr-only">Next batch</dt>
          <dd>{formatNextBatch(course.nextBatch)}</dd>
        </div>
        <div className="flex items-center gap-3">
          <Clock aria-hidden className="size-4 text-primary" />
          <dt className="sr-only">Duration</dt>
          <dd>{course.duration}</dd>
        </div>
        <div className="flex items-center gap-3">
          <MonitorPlay aria-hidden className="size-4 text-primary" />
          <dt className="sr-only">Mode</dt>
          <dd>{course.mode}</dd>
        </div>
        <div className="flex items-start gap-3">
          <Repeat aria-hidden className="mt-0.5 size-4 text-primary" />
          <dt className="sr-only">Schedule</dt>
          <dd>{course.schedule}</dd>
        </div>
      </dl>

      <h3 className="mt-5 text-sm font-semibold">What&apos;s included</h3>
      <ul className="mt-3 flex flex-col gap-2 text-sm">
        {course.includes.map((i) => (
          <li key={i} className="flex gap-2">
            <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />
            {i}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-3">
        <Button asChild size="lg">
          <Link href={href}>
            Enrol now <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href={href}>Talk to a counsellor</Link>
        </Button>
      </div>
    </aside>
  );
}
