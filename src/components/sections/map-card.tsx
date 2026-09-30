import { MapPin } from 'lucide-react';
import { siteConfig } from '@/data/site';

/** Stylised map placeholder — no iframe, no third-party requests. */
export function MapCard() {
  return (
    <div className="glass relative overflow-hidden rounded-3xl">
      <svg viewBox="0 0 400 220" aria-hidden="true" focusable="false" className="h-52 w-full text-foreground">
        <defs>
          <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="currentColor" strokeOpacity="0.08" />
          </pattern>
        </defs>
        <rect width="400" height="220" fill="url(#map-grid)" />
        <path d="M-10 150 C 80 120, 140 180, 220 140 S 360 90, 420 120" fill="none" stroke="var(--accent-cyan)" strokeOpacity="0.5" strokeWidth="14" />
        <path d="M60 -10 L 140 230" stroke="currentColor" strokeOpacity="0.12" strokeWidth="6" />
        <path d="M-10 60 L 410 90" stroke="currentColor" strokeOpacity="0.12" strokeWidth="6" />
        <path d="M280 -10 L 250 230" stroke="currentColor" strokeOpacity="0.12" strokeWidth="4" />
        <circle cx="200" cy="100" r="36" fill="var(--primary)" fillOpacity="0.15" />
        <circle cx="200" cy="100" r="18" fill="var(--primary)" fillOpacity="0.25" />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid size-12 -translate-y-3 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <MapPin aria-hidden className="size-6" />
        </span>
      </div>
      <p className="border-t border-border px-5 py-4 text-sm font-medium">
        {siteConfig.address.locality}, {siteConfig.address.region}
      </p>
    </div>
  );
}
