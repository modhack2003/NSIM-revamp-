import Link from 'next/link';
import { ArrowRight, Award, Clock, GraduationCap, MonitorPlay } from 'lucide-react';
import type { Course } from '@/data/course-types';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { courseThemeClasses } from '@/lib/course-theme';
import { cn } from '@/lib/utils';
import { AuroraBackground } from './aurora-background';
import { GridPattern } from './grid-pattern';

export function CourseHero({ course, syllabusNote }: { course: Course; syllabusNote: string }) {
  const t = courseThemeClasses[course.theme];
  const meta = [
    { icon: Clock, label: 'Duration', value: course.duration },
    { icon: MonitorPlay, label: 'Mode', value: course.mode },
    { icon: GraduationCap, label: 'Level', value: course.level },
    { icon: Award, label: 'Certificate', value: 'On completion' },
  ];
  return (
    <section className="relative isolate pt-10 pb-16 md:pt-14 md:pb-24">
      <AuroraBackground theme={course.theme} />
      <GridPattern />
      <Container className="flex flex-col gap-6">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Programs', path: '/courses/' },
            { name: course.title, path: `/courses/${course.slug}/` },
          ]}
        />
        <div className="flex flex-wrap items-center gap-3">
          <span className={cn('grid size-11 place-items-center rounded-2xl bg-linear-135 text-white', t.gradient)}>
            <Icon name={course.icon} className="size-5" />
          </span>
          <Badge variant="glass">{course.category}</Badge>
          {course.badge ? <Badge variant={course.badge === 'New' ? 'amber' : 'default'}>{course.badge}</Badge> : null}
        </div>
        <h1 className="max-w-4xl text-[clamp(2.5rem,5vw+1rem,4.75rem)] leading-[0.98] font-extrabold tracking-[-0.03em]">
          {course.title}
        </h1>
        <p className="max-w-[60ch] text-lg text-muted-foreground md:text-xl">{course.tagline}</p>
        <ul className="flex flex-wrap gap-3">
          {meta.map((m) => (
            <li key={m.label} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
              <m.icon aria-hidden className={cn('size-4', t.text)} />
              <span className="text-muted-foreground">{m.label}:</span>
              <span className="font-medium">{m.value}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={`/contact/?course=${course.slug}`}>
              Enrol now <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href={`/contact/?course=${course.slug}`}>Talk to a counsellor</Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{syllabusNote}</p>
      </Container>
    </section>
  );
}
