import type { Course } from '@/data/course-types';
import { placementLabel } from '@/data/home';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { formatFee } from '@/lib/utils';

const ROWS: { label: string; value: (c: Course) => string }[] = [
  { label: 'Duration', value: (c) => c.duration },
  { label: 'Mode', value: (c) => c.mode },
  { label: 'Level', value: (c) => c.level },
  { label: 'Language', value: (c) => c.language },
  { label: 'Certification', value: (c) => c.certification.title },
  { label: 'Projects', value: (c) => `${c.projects.length} hands-on projects` },
  { label: 'Placement assistance', value: () => placementLabel },
  { label: 'Fee', value: (c) => formatFee(c.fee) },
];

export function CourseComparison({ courses }: { courses: readonly Course[] }) {
  return (
    <section aria-labelledby="compare-heading" className="py-20 md:py-28">
      <Container>
        <SectionHeading id="compare-heading" eyebrow="Compare" title="Side by side" description="The essentials of each program at a glance." />

        <div className="glass mt-12 hidden overflow-hidden rounded-3xl md:block">
          <table className="hidden w-full text-left text-sm md:table">
            <caption className="sr-only">Program comparison</caption>
            <thead>
              <tr className="border-b border-border">
                <td className="p-5" />
                {courses.map((c) => (
                  <th key={c.slug} scope="col" className="p-5 font-display text-lg font-bold">
                    {c.shortTitle}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-0">
                  <th scope="row" className="p-5 font-medium text-muted-foreground">
                    {row.label}
                  </th>
                  {courses.map((c) => (
                    <td key={c.slug} className="p-5">
                      {row.value(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 flex flex-col gap-4 md:hidden">
          {courses.map((c) => (
            <div key={c.slug} className="glass rounded-3xl p-6">
              <h3 className="text-xl font-bold">{c.shortTitle}</h3>
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-sm">
                {ROWS.map((row) => (
                  <div key={row.label} className="contents">
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="font-medium">{row.value(c)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
