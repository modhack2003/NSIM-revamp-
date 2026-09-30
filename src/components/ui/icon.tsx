import {
  Megaphone, Calculator, Sparkles, Sparkle, Target, Search, BarChart3, Globe, Mail, MessageCircle, Palette, Bot,
  Receipt, Sheet, NotebookPen, Workflow, Image, Table, Video, FolderKanban, Award, Briefcase, CalendarClock, Users,
  GraduationCap, Lightbulb, Rocket, ShieldCheck, CheckCircle2, Phone, MapPin, Clock, ExternalLink,
  type LucideIcon,
} from 'lucide-react';
import type { IconKey } from '@/data/icon-keys';

export const iconMap = {
  megaphone: Megaphone,
  calculator: Calculator,
  sparkles: Sparkles,
  sparkle: Sparkle,
  target: Target,
  search: Search,
  'bar-chart': BarChart3,
  globe: Globe,
  mail: Mail,
  'message-circle': MessageCircle,
  palette: Palette,
  bot: Bot,
  receipt: Receipt,
  sheet: Sheet,
  'notebook-pen': NotebookPen,
  workflow: Workflow,
  image: Image,
  table: Table,
  video: Video,
  'folder-kanban': FolderKanban,
  award: Award,
  briefcase: Briefcase,
  'calendar-clock': CalendarClock,
  users: Users,
  'graduation-cap': GraduationCap,
  lightbulb: Lightbulb,
  rocket: Rocket,
  'shield-check': ShieldCheck,
  'check-circle': CheckCircle2,
  phone: Phone,
  'map-pin': MapPin,
  clock: Clock,
  'external-link': ExternalLink,
} satisfies Record<IconKey, LucideIcon>;

export function Icon({ name, className }: { name: IconKey; className?: string }) {
  const Cmp = iconMap[name];
  return <Cmp aria-hidden="true" focusable="false" className={className} />;
}
