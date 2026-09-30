import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from './label';

export interface FormFieldControlProps {
  id: string;
  'aria-invalid': boolean;
  'aria-describedby'?: string;
}

/**
 * Label + control + description + error. The render prop receives the wiring
 * (`id`, `aria-invalid`, `aria-describedby`) to spread onto the control.
 */
export function FormField({
  id,
  label,
  required,
  description,
  error,
  className,
  children,
}: {
  id: string;
  label: React.ReactNode;
  required?: boolean;
  description?: string;
  error?: string;
  className?: string;
  children: (control: FormFieldControlProps) => React.ReactNode;
}) {
  const descId = description ? `${id}-description` : undefined;
  const errId = error ? `${id}-error` : undefined;
  const describedBy = [descId, errId].filter(Boolean).join(' ') || undefined;
  return (
    <div data-slot="form-field" className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={id}>
        {label}
        {required ? <span className="font-normal text-muted-foreground"> (required)</span> : null}
      </Label>
      {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': describedBy })}
      {description ? (
        <p id={descId} className="text-xs text-muted-foreground">
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={errId} className="text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
