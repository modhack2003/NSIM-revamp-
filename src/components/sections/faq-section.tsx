import type { FaqItem } from '@/data/faqs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';

export function FaqSection({
  items,
  heading = 'Questions, answered',
  id = 'faq',
}: {
  items: FaqItem[];
  heading?: string;
  id?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="py-20 md:py-28 lg:py-32">
      <Container size="narrow">
        <SectionHeading id={`${id}-heading`} eyebrow="FAQ" title={heading} />
        <Accordion type="single" collapsible className="mt-12 flex flex-col gap-3">
          {items.map((f) => (
            <AccordionItem key={f.id} value={f.id}>
              <AccordionTrigger className="text-base md:text-lg">{f.question}</AccordionTrigger>
              <AccordionContent>
                <p className="max-w-[65ch]">{f.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
