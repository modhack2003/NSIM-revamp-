import type { Metadata } from 'next';
import type { Course } from '@/data/course-types';
import type { FaqItem } from '@/data/faqs';
import { PLACEHOLDER_EMAIL, PLACEHOLDER_PHONE, liveSocials as defaultLiveSocials, siteConfig } from '@/data/site';

type SiteConfig = typeof siteConfig;
type LiveSocial = { href: string };

export function absoluteUrl(path: string, base: string = siteConfig.url): string {
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  if (!path.endsWith('/')) {
    throw new Error(`buildMetadata: path must end with a trailing slash, got "${path}"`);
  }
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url: path,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: `${siteConfig.name} — ${siteConfig.tagline}` }],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: ['/og.png'] },
  };
}

export function organizationJsonLd(config: SiteConfig = siteConfig, socials: LiveSocial[] = defaultLiveSocials) {
  const phone = config.phoneHref.replace(/^tel:/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${config.url}/#organization`,
    name: config.name,
    legalName: config.legalName,
    url: config.url,
    logo: `${config.url}/icon.svg`,
    description: config.description,
    foundingDate: String(config.foundedYear),
    address: {
      '@type': 'PostalAddress',
      addressLocality: config.address.locality,
      addressRegion: config.address.region,
      addressCountry: config.address.country,
    },
    ...(phone !== PLACEHOLDER_PHONE ? { telephone: phone } : {}),
    ...(config.email !== PLACEHOLDER_EMAIL ? { email: config.email } : {}),
    ...(socials.length > 0 ? { sameAs: socials.map((s) => s.href) } : {}),
  };
}

export function courseJsonLd(course: Course) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.seo.description,
    url: absoluteUrl(`/courses/${course.slug}/`),
    provider: {
      '@type': 'EducationalOrganization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      sameAs: siteConfig.url,
    },
    educationalCredentialAwarded: course.certification.title,
    inLanguage: course.languageCodes,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: course.durationISO,
      ...(course.nextBatch ? { startDate: course.nextBatch } : {}),
    },
    ...(course.fee.amount != null
      ? { offers: { '@type': 'Offer', price: course.fee.amount, priceCurrency: 'INR', category: 'Paid' } }
      : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}
