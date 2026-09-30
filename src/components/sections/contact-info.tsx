import * as React from 'react';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { emailHref, siteConfig, whatsappHref } from '@/data/site';

interface InfoItem {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

export function ContactInfo() {
  const items: InfoItem[] = [
    { icon: Phone, label: 'Call us', value: siteConfig.phoneDisplay, href: siteConfig.phoneHref },
    { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with a counsellor', href: whatsappHref, external: true },
    { icon: Mail, label: 'Email', value: siteConfig.email, href: emailHref },
    { icon: MapPin, label: 'Address', value: `${siteConfig.address.locality}, ${siteConfig.address.region}, India` },
    { icon: Clock, label: 'Office hours', value: siteConfig.hours },
  ];
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
      {items.map((item) => {
        const body = (
          <>
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/12 text-primary">
              <item.icon aria-hidden className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm text-muted-foreground">{item.label}</span>
              <span className="block font-semibold break-words">{item.value}</span>
            </span>
          </>
        );
        return (
          <li key={item.label}>
            {item.href ? (
              <a
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="glass flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                {body}
                {item.external ? <span className="sr-only">(opens in new tab)</span> : null}
              </a>
            ) : (
              <div className="glass flex items-center gap-4 rounded-2xl p-4">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
