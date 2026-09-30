export const ICON_KEYS = [
  'megaphone', 'calculator', 'sparkles', 'sparkle', 'target', 'search', 'bar-chart', 'globe', 'mail',
  'message-circle', 'palette', 'bot', 'receipt', 'sheet', 'notebook-pen', 'workflow', 'image', 'table',
  'video', 'folder-kanban', 'award', 'briefcase', 'calendar-clock', 'users', 'graduation-cap',
  'lightbulb', 'rocket', 'shield-check', 'check-circle', 'phone', 'map-pin', 'clock', 'external-link',
] as const;
export type IconKey = (typeof ICON_KEYS)[number];
