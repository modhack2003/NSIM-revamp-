'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Clock, GraduationCap } from 'lucide-react';
import type { CourseCardData } from '@/data/course-types';
import { courseThemeClasses } from '@/lib/course-theme';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';

const MAX_TILT = 6;

export function CourseCard({
  course,
  variant = 'default',
  headingLevel = 'h3',
}: {
  course: CourseCardData;
  variant?: 'compact' | 'default' | 'detailed';
  headingLevel?: 'h2' | 'h3';
}) {
  const ref = React.useRef<HTMLElement>(null);
  const t = courseThemeClasses[course.theme];
  const Heading = headingLevel;

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
    if (window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
      el.style.setProperty('--rx', `${(0.5 - y) * MAX_TILT}deg`);
      el.style.setProperty('--ry', `${(x - 0.5) * MAX_TILT}deg`);
    }
  };
  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        'group glass relative isolate flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-[transform,box-shadow] duration-300 [--mx:50%] [--my:30%] [--rx:0deg] [--ry:0deg] [transform:perspective(900px)_rotateX(var(--rx))_rotateY(var(--ry))] hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_color-mix(in_oklch,var(--primary)_30%,transparent)] has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring has-[a:focus-visible]:ring-offset-2 has-[a:focus-visible]:ring-offset-background md:p-7',
        variant === 'compact' && 'p-5 md:p-6',
      )}
    >
      {/* spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 transition-opacity duration-300 [background:radial-gradient(420px_circle_at_var(--mx)_var(--my),color-mix(in_oklch,var(--primary)_18%,transparent),transparent_60%)] group-hover:opacity-100"
      />
      <div aria-hidden="true" className={cn('absolute inset-x-0 top-0 h-1 bg-linear-to-r', t.gradient)} />

      <div className="flex items-start justify-between gap-3">
        <span className={cn('grid size-12 place-items-center rounded-2xl bg-linear-135 text-white shadow-lg', t.gradient)}>
          <Icon name={course.icon} className="size-6" />
        </span>
        {course.badge ? <Badge variant={course.badge === 'New' ? 'amber' : 'default'}>{course.badge}</Badge> : null}
      </div>

      <p className="eyebrow mt-6 text-muted-foreground">{course.category}</p>
      <Heading className="mt-2 text-2xl leading-tight font-bold tracking-tight">
        <Link
          href={`/courses/${course.slug}/`}
          className="outline-none after:absolute after:inset-0 after:z-10 after:rounded-3xl after:content-['']"
        >
          {course.title}
        </Link>
      </Heading>
      {variant !== 'compact' ? <p className="mt-3 text-muted-foreground">{course.summary}</p> : null}

      {variant === 'detailed' ? (
        <ul className="mt-5 flex flex-col gap-2.5 text-sm">
          {course.highlights.map((h) => (
            <li key={h} className="flex gap-2.5">
              <Check aria-hidden className={cn('mt-0.5 size-4 shrink-0', t.text)} />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto pt-6">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden className="size-4" /> {course.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap aria-hidden className="size-4" /> {course.level}
          </span>
        </div>
        <span aria-hidden="true" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          View program <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
