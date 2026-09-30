import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    theme_color: '#6d3ef0', // ≈ light --primary oklch(0.55 0.24 285)
    background_color: '#0b0c17', // ≈ dark --background oklch(0.145 0.02 275)
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
