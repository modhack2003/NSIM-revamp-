import type { CurriculumModule } from '@/data/course-types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check } from 'lucide-react';

export function CurriculumAccordion({ modules }: { modules: CurriculumModule[] }) {
  return (
    <section id="curriculum" aria-labelledby="curriculum-heading" className="scroll-mt-24">
      <h2 id="curriculum-heading" className="text-3xl font-extrabold tracking-tight md:text-4xl">
        Curriculum
      </h2>
      <p className="mt-3 text-muted-foreground">{modules.length} modules, each with live classes, practice and a project checkpoint.</p>
      <Accordion type="multiple" defaultValue={[modules[0].id]} className="mt-8 flex flex-col gap-3">
        {modules.map((m, i) => (
          <AccordionItem key={m.id} value={m.id}>
            <AccordionTrigger>
              <span className="flex min-w-0 flex-col gap-1">
                <span className="eyebrow text-primary">Module {String(i + 1).padStart(2, '0')}</span>
                <span className="text-lg">{m.title}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {m.duration} · {m.lessons} lessons
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <p>{m.summary}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {m.topics.map((topic) => (
                  <li key={topic} className="flex gap-2 text-foreground">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-primary" />
                    {topic}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
