import type { IconKey } from './icon-keys';

export type ToolId =
  | 'google-ads' | 'meta-ads' | 'seo-suites' | 'ga4' | 'search-console' | 'email-marketing'
  | 'whatsapp-marketing' | 'canva' | 'chatgpt' | 'claude' | 'gemini' | 'tally-prime' | 'gst-portal'
  | 'ms-excel' | 'google-sheets' | 'notion-ai' | 'image-generators' | 'no-code-automation';

export interface Tool { id: ToolId; label: string; icon: IconKey; marqueeRow?: 1 | 2 }

/** Product names are plain text for nominative reference only — no logos or brand colours. */
export const tools: Tool[] = [
  { id: 'google-ads', label: 'Google Ads', icon: 'target', marqueeRow: 1 },
  { id: 'meta-ads', label: 'Meta Ads', icon: 'megaphone', marqueeRow: 1 },
  { id: 'seo-suites', label: 'SEO Tools', icon: 'search', marqueeRow: 1 },
  { id: 'ga4', label: 'GA4 Analytics', icon: 'bar-chart', marqueeRow: 1 },
  { id: 'search-console', label: 'Search Console', icon: 'globe', marqueeRow: 1 },
  { id: 'email-marketing', label: 'Email Marketing', icon: 'mail', marqueeRow: 1 },
  { id: 'whatsapp-marketing', label: 'WhatsApp Marketing', icon: 'message-circle', marqueeRow: 1 },
  { id: 'canva', label: 'Canva', icon: 'palette', marqueeRow: 1 },
  { id: 'chatgpt', label: 'ChatGPT', icon: 'sparkles', marqueeRow: 2 },
  { id: 'claude', label: 'Claude', icon: 'bot', marqueeRow: 2 },
  { id: 'gemini', label: 'Gemini', icon: 'sparkle', marqueeRow: 2 },
  { id: 'tally-prime', label: 'Tally Prime', icon: 'calculator', marqueeRow: 2 },
  { id: 'gst-portal', label: 'GST Portal', icon: 'receipt', marqueeRow: 2 },
  { id: 'ms-excel', label: 'MS Excel', icon: 'sheet', marqueeRow: 2 },
  { id: 'notion-ai', label: 'Notion AI', icon: 'notebook-pen', marqueeRow: 2 },
  { id: 'no-code-automation', label: 'No-code Automation', icon: 'workflow', marqueeRow: 2 },
  { id: 'google-sheets', label: 'Google Sheets', icon: 'table' },
  { id: 'image-generators', label: 'AI Image Generators', icon: 'image' },
];

export const toolById = Object.fromEntries(tools.map((t) => [t.id, t])) as Record<ToolId, Tool>;
