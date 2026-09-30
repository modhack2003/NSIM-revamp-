import * as React from 'react';
import { cn } from '@/lib/utils';
import { fieldClasses } from './input';

export function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return <textarea data-slot="textarea" className={cn(fieldClasses, 'min-h-32 resize-y py-3', className)} {...props} />;
}
