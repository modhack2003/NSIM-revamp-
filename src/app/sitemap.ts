import type { MetadataRoute } from 'next';
import { courses } from '@/data/courses';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = ['/', '/courses/', '/about/', '/contact/', ...courses.map((c) => `/courses/${c.slug}/`)];
  return paths.map((p) => ({ url: absoluteUrl(p), lastModified }));
}
