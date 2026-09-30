import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const CLIENT_FILES = [
  'src/components/layout/{navbar,mobile-nav,floating-enquire,theme-toggle,providers}.tsx',
  'src/components/sections/{contact-form,course-param-sync,mobile-enrol-bar,tools-marquee,testimonials-carousel,course-card,rotating-words,animated-counter,reveal}.tsx',
  'src/components/ui/{accordion,sonner}.tsx',
];

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'next-env.d.ts']),
  {
    files: CLIENT_FILES,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/data/courses', '**/data/courses'],
              message: 'Client components receive course data as props; import types from @/data/course-types',
            },
          ],
        },
      ],
    },
  },
]);
