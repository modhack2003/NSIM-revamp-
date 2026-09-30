'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { useForm, useWatch, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';
import type { CourseSlug } from '@/data/course-slugs';
import { siteConfig, whatsappHref } from '@/data/site';
import { contactDefaults, contactSchema, type ContactFormInput, type ContactInput } from '@/lib/contact-schema';
import { submitEnquiry } from '@/lib/submit-enquiry';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { CourseParamSync } from './course-param-sync';

export interface CourseOptionItem { value: string; label: string }

const MODES = [
  { value: 'call', label: 'Phone call' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Email' },
] as const;

const MESSAGE_MAX = 1000;

export function ContactForm({ courseOptions }: { courseOptions: CourseOptionItem[] }) {
  const [summary, setSummary] = React.useState('');
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    getFieldState,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput, unknown, ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: contactDefaults,
    mode: 'onTouched',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });
  const message = useWatch({ control, name: 'message' }) ?? '';
  // Register eagerly in DOM order: render-prop children run later, and RHF focuses the first invalid field by registration order.
  const fields = {
    name: register('name'),
    email: register('email'),
    phone: register('phone'),
    course: register('course'),
    mode: register('mode'),
    message: register('message'),
    consent: register('consent'),
    hp_ref: register('hp_ref'),
  };

  const onCourse = React.useCallback(
    (slug: CourseSlug) => {
      if (!getFieldState('course').isDirty) setValue('course', slug, { shouldValidate: false });
    },
    [getFieldState, setValue],
  );

  const succeed = (data: ContactInput) => {
    const firstName = data.name.split(' ')[0];
    toast.success(`Thanks, ${firstName}! A counsellor will reach out ${siteConfig.responseTime}.`);
    reset(contactDefaults);
    setSummary('');
    setFocus('name');
  };

  const onValid = async (data: ContactInput) => {
    setSummary('');
    if (data.hp_ref !== '') {
      succeed(data);
      return;
    }
    try {
      await submitEnquiry(data);
      succeed(data);
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') console.error('[contact] submit failed', err);
      toast.error('Something went wrong. Please try again or reach us on WhatsApp.', {
        action: { label: 'WhatsApp', onClick: () => window.open(whatsappHref, '_blank', 'noopener,noreferrer') },
      });
    }
  };

  const onInvalid = (errs: FieldErrors<ContactFormInput>) => {
    const n = Object.keys(errs).length;
    setSummary(`Please fix ${n} highlighted ${n === 1 ? 'field' : 'fields'}`);
  };

  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Send us an enquiry</h2>
      <p className="mt-2 text-muted-foreground">
        Tell us a little about yourself and a counsellor will get back to you {siteConfig.responseTime}.
      </p>
      <noscript>
        <p className="mt-4 rounded-2xl border border-border bg-muted p-4 text-sm">
          JavaScript is needed to send this form — call or WhatsApp us instead:{' '}
          <a className="font-semibold text-primary underline" href={siteConfig.phoneHref}>
            {siteConfig.phoneDisplay}
          </a>{' '}
          ·{' '}
          <a className="font-semibold text-primary underline" href={whatsappHref}>
            WhatsApp
          </a>
        </p>
      </noscript>

      <form noValidate onSubmit={handleSubmit(onValid, onInvalid)} className="mt-8 grid gap-5 md:grid-cols-2">
        <Suspense fallback={null}>
          <CourseParamSync onCourse={onCourse} />
        </Suspense>

        <FormField id="name" label="Full name" required error={errors.name?.message} className="md:col-span-2">
          {(c) => <Input {...c} {...fields.name} autoComplete="name" />}
        </FormField>

        <FormField id="email" label="Email" required error={errors.email?.message}>
          {(c) => <Input {...c} {...fields.email} type="email" autoComplete="email" inputMode="email" />}
        </FormField>

        <FormField id="phone" label="Mobile number" required error={errors.phone?.message}>
          {(c) => <Input {...c} {...fields.phone} type="tel" autoComplete="tel" inputMode="tel" placeholder="98765 43210" />}
        </FormField>

        <FormField id="course" label="Program of interest" required error={errors.course?.message} className="md:col-span-2">
          {(c) => (
            <NativeSelect {...c} {...fields.course}>
              <option value="">Select a program</option>
              {courseOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </NativeSelect>
          )}
        </FormField>

        <fieldset className="md:col-span-2">
          <legend className="text-sm font-medium">Preferred way to reach you</legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {MODES.map((m) => (
              <label
                key={m.value}
                className="glass inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring"
              >
                <input type="radio" value={m.value} {...fields.mode} className="size-4 accent-primary outline-none" />
                {m.label}
              </label>
            ))}
          </div>
        </fieldset>

        <FormField
          id="message"
          label="Message (optional)"
          description="Maximum 1000 characters"
          error={errors.message?.message}
          className="md:col-span-2"
        >
          {(c) => (
            <div className="relative">
              <Textarea {...c} {...fields.message} rows={4} placeholder="Your background, goals or questions" />
              <span
                aria-live="off"
                className={cn(
                  'pointer-events-none absolute right-4 bottom-3 text-xs tabular-nums text-muted-foreground',
                  message.length > MESSAGE_MAX && 'font-semibold text-destructive',
                )}
              >
                {message.length}/{MESSAGE_MAX}
              </span>
            </div>
          )}
        </FormField>

        <div className="md:col-span-2">
          <div className="flex items-start gap-3">
            <Checkbox
              id="consent"
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? 'consent-error' : undefined}
              {...fields.consent}
            />
            <label htmlFor="consent" className="text-sm">
              I agree to be contacted by NSIM Education about this enquiry.{' '}
              <span className="text-muted-foreground">(required)</span>
            </label>
          </div>
          {errors.consent?.message ? (
            <p id="consent-error" className="mt-2 text-sm font-medium text-destructive">
              {errors.consent.message}
            </p>
          ) : null}
        </div>

        <div aria-hidden="true" className="sr-only">
          <label htmlFor="hp_ref">Leave this field empty</label>
          <input id="hp_ref" type="text" tabIndex={-1} autoComplete="off" {...fields.hp_ref} />
        </div>

        <p className="sr-only" aria-live="polite" data-testid="form-summary">
          {summary}
        </p>

        <div className="md:col-span-2">
          <Button type="submit" size="lg" disabled={isSubmitting} aria-busy={isSubmitting || undefined} className="w-full sm:w-auto">
            {isSubmitting ? (
              <>
                <Loader2 aria-hidden className="size-4 animate-spin motion-reduce:animate-none" /> Sending…
              </>
            ) : (
              <>
                Send enquiry <Send aria-hidden className="size-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
