export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  tags?: ('home' | 'programs' | 'enquiry')[];
}

export const faqs: FaqItem[] = [
  {
    id: 'faq-live-or-recorded',
    question: 'Are the classes live or pre-recorded?',
    answer:
      'Every program is taught live by a mentor in small online batches, so you can ask questions as you learn. Each session is also recorded, which means you can revisit a tricky topic or catch up if you miss a class.',
    tags: ['home', 'programs'],
  },
  {
    id: 'faq-prior-experience',
    question: 'Do I need any prior experience?',
    answer:
      'No. All three programs start from the fundamentals and build up step by step. If you are comfortable using a laptop and a browser, you have everything you need to begin.',
    tags: ['home', 'programs'],
  },
  {
    id: 'faq-placement',
    question: 'What does placement assistance include?',
    answer:
      'Our career team helps you polish your resume and LinkedIn profile, runs mock interviews, and shares relevant openings and referrals from our hiring network. We offer assistance, not a guarantee — the effort you put into projects matters most.',
    tags: ['home'],
  },
  {
    id: 'faq-certificate',
    question: 'Will I receive a certificate?',
    answer:
      'Yes. Learners who complete the sessions, assignments and capstone project receive an NSIM certificate for their program, which you can add to your resume and LinkedIn profile.',
    tags: ['home', 'programs'],
  },
  {
    id: 'faq-schedule',
    question: 'I work full time. Can I still join?',
    answer:
      'Yes. Batches run on weekday evenings or weekends, and recordings are available after every class, so working professionals and college students can learn without taking a break.',
    tags: ['home'],
  },
  {
    id: 'faq-language',
    question: 'Which language are the sessions taught in?',
    answer:
      'Sessions are conducted in English, with explanations in Hindi and Bengali whenever it helps a concept land. Course material and assignments are in English.',
    tags: ['home'],
  },
  {
    id: 'faq-emi',
    question: 'Can I pay the fee in instalments?',
    answer:
      'EMI options are available for every program. Share your details through the enquiry form and a counsellor will walk you through the current fee and payment plans.',
    tags: ['home', 'enquiry'],
  },
  {
    id: 'faq-choose-program',
    question: 'I am not sure which program suits me. Can you help?',
    answer:
      'Absolutely. Book a free counselling call and we will talk through your background, interests and goals, then recommend the program that fits best — with no obligation to enrol.',
    tags: ['enquiry'],
  },
  {
    id: 'faq-response-time',
    question: 'How soon will someone get back to me?',
    answer:
      'A counsellor usually responds within one working day by your preferred channel — a phone call, WhatsApp message or email.',
    tags: ['enquiry'],
  },
  {
    id: 'faq-projects',
    question: 'What kind of projects will I build?',
    answer:
      'Each program ends with a capstone modelled on real work: a full marketing campaign, a complete set of books for a small business, or an end-to-end AI workflow. You also complete smaller projects along the way to build a portfolio.',
    tags: ['programs'],
  },
];
