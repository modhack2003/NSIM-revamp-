'use client';
import { useEffect, useEffectEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { isCourseSlug, type CourseSlug } from '@/data/course-slugs';
export function CourseParamSync({ onCourse }: { onCourse: (slug: CourseSlug) => void }) {
  const value = useSearchParams().get('course');
  const emit = useEffectEvent((v: CourseSlug) => onCourse(v));
  useEffect(() => { if (isCourseSlug(value)) emit(value); }, [value]);
  return null;
}
