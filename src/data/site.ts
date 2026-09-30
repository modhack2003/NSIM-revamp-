import { normalizeSiteUrl } from '@/lib/utils';

export const siteConfig = {
  name: 'NSIM Education',
  shortName: 'NSIM',
  legalName: 'NSIM Education', // PLACEHOLDER P-60
  tagline: 'AI-powered career skills, taught live.',
  description:
    'NSIM Education is a Kolkata institute offering live online programs in AI digital marketing, business accounting & GST, and AI prompt engineering.',
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nsimeducation.com'), // PLACEHOLDER P-62
  locale: 'en_IN',
  phoneDisplay: '+91 00000 00000', // PLACEHOLDER P-30
  phoneHref: 'tel:+910000000000', // PLACEHOLDER P-30
  whatsapp: '910000000000', // PLACEHOLDER P-31
  whatsappMessage: 'Hi NSIM Education, I would like to know more about your programs.',
  email: 'hello@example.com', // PLACEHOLDER P-32
  address: { locality: 'Kolkata', region: 'West Bengal', country: 'IN' }, // PLACEHOLDER P-33
  hours: 'Mon–Sat, 10:00–19:00 IST', // PLACEHOLDER P-34
  responseTime: 'within 24 hours', // PLACEHOLDER P-12
  socials: {
    instagram: 'https://www.instagram.com/', // PLACEHOLDER P-35
    facebook: 'https://www.facebook.com/', // PLACEHOLDER P-36
    linkedin: 'https://www.linkedin.com/', // PLACEHOLDER P-37
    youtube: 'https://www.youtube.com/', // PLACEHOLDER P-38
  } as Record<'instagram' | 'facebook' | 'linkedin' | 'youtube', string>,
  foundedYear: 2018, // PLACEHOLDER P-50
  nav: [
    { label: 'Programs', href: '/courses/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ] as { label: string; href: string }[],
};

export const PLACEHOLDER_PHONE = '+910000000000'; // compared with the E.164 form of phoneHref  PLACEHOLDER P-30
export const PLACEHOLDER_EMAIL = 'hello@example.com'; // PLACEHOLDER P-32

export const whatsappHref = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;
export const emailHref = `mailto:${siteConfig.email}`;

const SOCIAL_LABELS = { instagram: 'Instagram', facebook: 'Facebook', linkedin: 'LinkedIn', youtube: 'YouTube' } as const;

/** Socials that point at a real profile (URL path is not '/'). Shared by the footer and organizationJsonLd sameAs. */
export function selectLiveSocials(socials: Record<keyof typeof SOCIAL_LABELS, string>) {
  return (Object.entries(socials) as [keyof typeof SOCIAL_LABELS, string][])
    .filter(([, u]) => new URL(u).pathname !== '/')
    .map(([key, href]) => ({ key, label: SOCIAL_LABELS[key], href }));
}

export const liveSocials: { key: keyof typeof SOCIAL_LABELS; label: string; href: string }[] = selectLiveSocials(
  siteConfig.socials,
);

export const pageMeta: Record<'home' | 'courses' | 'about' | 'contact', { title: string; description: string }> = {
  home: {
    title: 'NSIM Education — AI-Powered Career Skills, Kolkata',
    description:
      'Live online programs in AI digital marketing, accounting & GST, and prompt engineering, with projects and placement assistance.',
  },
  courses: {
    title: 'Programs',
    description:
      "Compare NSIM's live online programs in AI digital marketing, business accounting & GST, and prompt engineering — duration, tools and certification.",
  },
  about: {
    title: 'About Us',
    description:
      'Meet NSIM Education: a Kolkata institute teaching practical, AI-first career skills through live, mentor-led online programs.',
  },
  contact: {
    title: 'Contact & Enquiries',
    description:
      'Talk to an NSIM counsellor about fees, batches and the right program for you. Call, WhatsApp or send an enquiry online.',
  },
};
