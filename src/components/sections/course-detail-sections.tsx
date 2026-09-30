import * as React from 'react';
import { CheckCircle2, FolderKanban } from 'lucide-react';
import type { Course } from '@/data/course-types';
import { toolById } from '@/data/tools';
import { Chip } from '@/components/ui/chip';
import { CertificateArt } from './certificate-art';

function DetailSection({
  id,
  title,
  lead,
  children,
}: {
  id: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24">
      <h2 id={`${id}-heading`} className="text-3xl font-extrabold tracking-tight md:text-4xl">
        {title}
      </h2>
      {lead ? <p className="mt-3 text-muted-foreground">{lead}</p> : null}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function CourseOverview({ course }: { course: Course }) {
  return (
    <DetailSection id="overview" title="Overview">
      <div className="flex max-w-[65ch] flex-col gap-4 text-lg text-muted-foreground">
        {course.overview.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </div>
    </DetailSection>
  );
}

export function CourseOutcomes({ course }: { course: Course }) {
  return (
    <DetailSection id="outcomes" title="What you'll learn">
      <ul className="grid gap-4 sm:grid-cols-2">
        {course.outcomes.map((o) => (
          <li key={o} className="glass flex gap-3 rounded-2xl p-4">
            <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-success" />
            <span>{o}</span>
          </li>
        ))}
      </ul>
    </DetailSection>
  );
}

export function CourseTools({ course }: { course: Course }) {
  return (
    <DetailSection id="tools" title="Tools you'll use" lead="Hands-on practice with the platforms teams rely on every day.">
      <ul className="flex flex-wrap gap-3">
        {course.tools.map((id) => (
          <li key={id}>
            <Chip icon={toolById[id].icon}>{toolById[id].label}</Chip>
          </li>
        ))}
      </ul>
    </DetailSection>
  );
}

export function CourseProjects({ course }: { course: Course }) {
  return (
    <DetailSection id="projects" title="Projects you'll build" lead="Portfolio pieces modelled on real briefs, reviewed by your mentor.">
      <ol className="grid gap-4 sm:grid-cols-2">
        {course.projects.map((p, i) => (
          <li key={p} className="glass flex flex-col gap-3 rounded-2xl p-5">
            <span className="flex items-center gap-2 text-sm font-semibold text-primary">
              <FolderKanban aria-hidden className="size-4" /> Project {i + 1}
            </span>
            <span className="font-medium">{p}</span>
          </li>
        ))}
      </ol>
    </DetailSection>
  );
}

export function CourseAudience({ course }: { course: Course }) {
  return (
    <DetailSection id="audience" title="Who it's for">
      <ul className="grid gap-4 md:grid-cols-3">
        {course.audience.map((a) => (
          <li key={a.title} className="glass rounded-2xl p-5">
            <h3 className="text-lg font-bold">{a.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{a.description}</p>
          </li>
        ))}
      </ul>
    </DetailSection>
  );
}

export function CourseCertification({ course }: { course: Course }) {
  return (
    <DetailSection id="certification" title="Certification">
      <div className="glass grid items-center gap-6 rounded-3xl p-6 sm:grid-cols-[12rem_1fr] md:p-8">
        <CertificateArt theme={course.theme} className="max-w-48" />
        <div>
          <h3 className="text-xl font-bold">{course.certification.title}</h3>
          <p className="mt-2 text-muted-foreground">{course.certification.description}</p>
        </div>
      </div>
    </DetailSection>
  );
}

export function CourseCareerRoles({ course }: { course: Course }) {
  return (
    <DetailSection id="career-roles" title="Roles you can target">
      <ul className="flex flex-wrap gap-3">
        {course.careerRoles.map((r) => (
          <li key={r}>
            <Chip icon="briefcase">{r}</Chip>
          </li>
        ))}
      </ul>
    </DetailSection>
  );
}
