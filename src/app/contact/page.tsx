import { courses } from '@/data/courses';
import { faqs } from '@/data/faqs';
import { pageMeta } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/layout/page-header';
import { Container } from '@/components/ui/container';
import { ContactForm, type CourseOptionItem } from '@/components/sections/contact-form';
import { ContactInfo } from '@/components/sections/contact-info';
import { FaqSection } from '@/components/sections/faq-section';
import { MapCard } from '@/components/sections/map-card';

export const metadata = buildMetadata({ ...pageMeta.contact, path: '/contact/' });

export default function ContactPage() {
  const courseOptions: CourseOptionItem[] = [
    ...courses.map((c) => ({ value: c.slug, label: c.shortTitle })),
    { value: 'not-sure', label: 'Not sure yet — help me choose' },
  ];
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's plan your next step."
        description="Questions about programs, fees or batches? Send an enquiry, call or WhatsApp us — a counsellor will help you choose with confidence."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact/' },
        ]}
      />
      <section aria-label="Enquiry form and contact details" className="pb-8">
        <Container className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm courseOptions={courseOptions} />
          <div className="flex flex-col gap-6">
            <ContactInfo />
            <MapCard />
          </div>
        </Container>
      </section>
      <FaqSection items={faqs.filter((f) => f.tags?.includes('enquiry'))} heading="Before you reach out" />
    </>
  );
}
