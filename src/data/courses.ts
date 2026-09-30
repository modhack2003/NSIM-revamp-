import { COURSE_SLUGS, type CourseSlug } from './course-slugs';
import type { Course, CourseCardData } from './course-types';

export type * from './course-types';

const SCHEDULE = 'Weekday evenings or weekends · 2 hrs/session'; // PLACEHOLDER P-43
const LANGUAGE = 'English, Hindi & Bengali'; // PLACEHOLDER P-46
const LANGUAGE_CODES = ['en', 'hi', 'bn']; // PLACEHOLDER P-46
const FEE_NOTE = 'EMI options available'; // PLACEHOLDER P-41

export const courses: readonly Course[] = [
  {
    slug: 'ai-digital-marketing',
    title: 'AI-Powered Digital Marketing',
    shortTitle: 'Digital Marketing',
    category: 'Marketing',
    tagline: 'Plan, launch and optimise campaigns that grow brands — with AI as your co-pilot.',
    summary:
      'Master SEO, paid ads, social media, email and analytics, and learn to use AI tools to research, write and optimise campaigns faster.',
    overview: [
      'Digital marketing has changed. Brands now expect marketers who can move from insight to live campaign in days, not weeks — and who know how to put AI to work at every step. This program is built around that reality.',
      'Over four months of live, mentor-led sessions you will learn how customers discover and choose brands online, then practise every major channel: search, paid social, performance ads, email, WhatsApp and content. Each module pairs the fundamentals with the AI tools marketers now use daily for research, copy, creatives and reporting.',
      'You finish with a capstone campaign for a real-world brief, a portfolio you can show employers, and dedicated placement assistance to help you land your first — or next — marketing role.',
    ],
    icon: 'megaphone',
    theme: 'violet',
    badge: 'Bestseller', // PLACEHOLDER P-48
    duration: '4 months', // PLACEHOLDER P-44
    durationISO: 'P4M', // PLACEHOLDER P-44
    mode: 'Live online',
    schedule: SCHEDULE,
    level: 'Beginner to Intermediate',
    language: LANGUAGE,
    languageCodes: LANGUAGE_CODES,
    fee: { amount: null, note: FEE_NOTE }, // PLACEHOLDER P-41
    nextBatch: null, // PLACEHOLDER P-42
    certification: {
      title: 'NSIM Certified Digital Marketing Professional', // PLACEHOLDER P-47
      description: 'Awarded on completing the live sessions, module assignments and the capstone campaign. Showcase it on your resume and LinkedIn profile.', // PLACEHOLDER P-56
    },
    highlights: [ // PLACEHOLDER P-55
      'Search, social, performance and email in one program',
      'AI workflows for research, copy and creatives',
      'Capstone campaign on a real-world brief',
      'Placement assistance and portfolio review',
    ],
    outcomes: [ // PLACEHOLDER P-55
      'Map customer journeys and choose the right channels for a brand',
      'Research keywords and write SEO-friendly content with AI assistance',
      'Build, launch and optimise Google Ads search and display campaigns',
      'Run Meta ad campaigns with clear audiences, creatives and budgets',
      'Design email and WhatsApp automation flows that nurture leads',
      'Track results in GA4 and present insights in clear reports',
      'Use AI tools to produce ad copy, visuals and campaign ideas quickly',
      'Plan and pitch an end-to-end campaign for a real brief',
    ],
    tools: ['google-ads', 'meta-ads', 'ga4', 'search-console', 'seo-suites', 'canva', 'chatgpt', 'gemini'], // PLACEHOLDER P-55
    curriculum: [
      { id: 'm1', duration: '2 weeks', lessons: 6, // PLACEHOLDER P-45
        title: 'Marketing foundations & consumer journeys', summary: 'Understand how people discover, compare and buy online, and how brands meet them at every stage.', // PLACEHOLDER P-49
        topics: ['The digital marketing landscape', 'Customer personas', 'Funnels and journeys', 'Choosing channels', 'Setting goals and KPIs'] }, // PLACEHOLDER P-49
      { id: 'm2', duration: '2 weeks', lessons: 6, // PLACEHOLDER P-45
        title: 'SEO & content with AI', summary: 'Earn organic traffic with search-friendly pages and content planned and drafted alongside AI tools.', // PLACEHOLDER P-49
        topics: ['How search engines rank pages', 'Keyword research', 'On-page and technical SEO', 'Content calendars', 'AI-assisted drafting and editing', 'Search Console basics'] }, // PLACEHOLDER P-49
      { id: 'm3', duration: '2 weeks', lessons: 6, // PLACEHOLDER P-45
        title: 'Google Ads & performance marketing', summary: 'Plan, build and optimise search and display campaigns that turn budgets into measurable results.', // PLACEHOLDER P-49
        topics: ['Campaign structure', 'Keywords and match types', 'Ad copy and extensions', 'Bidding strategies', 'Conversion tracking', 'Optimisation routines'] }, // PLACEHOLDER P-49
      { id: 'm4', duration: '2 weeks', lessons: 6, // PLACEHOLDER P-45
        title: 'Meta & social media advertising', summary: 'Grow audiences and drive sales on social platforms with strong creatives and sharp targeting.', // PLACEHOLDER P-49
        topics: ['Organic social strategy', 'Audience targeting', 'Ad formats and creatives', 'Retargeting', 'Budget and A/B testing'] }, // PLACEHOLDER P-49
      { id: 'm5', duration: '2 weeks', lessons: 5, // PLACEHOLDER P-45
        title: 'Email, WhatsApp & automation', summary: 'Nurture leads and customers with timely, personal messages that run on autopilot.', // PLACEHOLDER P-49
        topics: ['List building', 'Email design and copy', 'WhatsApp broadcast etiquette', 'Automation flows', 'Deliverability basics'] }, // PLACEHOLDER P-49
      { id: 'm6', duration: '2 weeks', lessons: 5, // PLACEHOLDER P-45
        title: 'Analytics (GA4) & reporting', summary: 'Measure what matters, find insights in the data and report results in plain language.', // PLACEHOLDER P-49
        topics: ['GA4 setup and events', 'Traffic and conversion reports', 'Attribution basics', 'Dashboards', 'Presenting insights'] }, // PLACEHOLDER P-49
      { id: 'm7', duration: '2 weeks', lessons: 5, // PLACEHOLDER P-45
        title: 'AI tools for creatives & copy', summary: 'Use AI assistants and design tools to produce on-brand copy, visuals and ideas at speed.', // PLACEHOLDER P-49
        topics: ['Prompting for marketing copy', 'Brand voice guides', 'AI-assisted visuals', 'Rapid creative testing', 'Responsible AI use'] }, // PLACEHOLDER P-49
      { id: 'm8', duration: '2 weeks', lessons: 4, // PLACEHOLDER P-45
        title: 'Capstone campaign', summary: 'Plan, build and present a full multi-channel campaign for a real-world brief with mentor feedback.', // PLACEHOLDER P-49
        topics: ['Brief analysis', 'Channel and budget plan', 'Creative production', 'Launch and measurement plan', 'Final presentation'] }, // PLACEHOLDER P-49
    ],
    projects: [
      'SEO audit and 30-day content plan for a local business website', // PLACEHOLDER P-49
      'Google Ads search campaign with keyword research and ad copy variants', // PLACEHOLDER P-49
      'Meta ads creative test for a direct-to-consumer product launch', // PLACEHOLDER P-49
      'Capstone: end-to-end multi-channel campaign with a GA4 reporting dashboard', // PLACEHOLDER P-49
    ],
    audience: [ // PLACEHOLDER P-55
      { title: 'Students & fresh graduates', description: 'Start a career in one of the fastest-growing fields with a portfolio that proves your skills.' },
      { title: 'Working professionals', description: 'Switch into marketing or add digital and AI skills to your current role without a career break.' },
      { title: 'Founders & small businesses', description: 'Learn to grow your own brand online and make smarter decisions about agencies and ad spend.' },
    ],
    includes: [ // PLACEHOLDER P-56
      'Live sessions + recordings',
      'Hands-on projects with mentor feedback',
      'AI tool workflows and templates',
      'Certificate on completion',
      'Placement assistance',
    ],
    careerRoles: [ // PLACEHOLDER P-55
      'Digital Marketing Executive',
      'SEO Specialist',
      'Performance Marketer',
      'Social Media Manager',
      'Content Strategist',
    ],
    faqs: [
      {
        id: 'ai-digital-marketing-budget',
        question: 'Do I need to spend my own money on ads during the course?',
        answer: 'No. You practise in sandbox and demo accounts, and any live experiments are optional and low-budget. Mentors show you how to get meaningful results even from small test budgets.',
      },
      {
        id: 'ai-digital-marketing-coding',
        question: 'Is there any coding involved?',
        answer: 'No coding is required. You will work with ad platforms, analytics tools and AI assistants through their standard interfaces.',
      },
      {
        id: 'ai-digital-marketing-freelance',
        question: 'Can I freelance after completing this program?',
        answer: 'Yes. Many of the projects mirror client work, and the capstone gives you a complete campaign to show prospective clients alongside your certificate.',
      },
    ],
    seo: {
      title: 'AI-Powered Digital Marketing Course',
      description: 'Live online digital marketing course in Kolkata: SEO, Google & Meta ads, email, GA4 and AI tools, with real projects and placement assistance.',
    },
  },
  {
    slug: 'business-accounting-finance',
    title: 'Business Accounting & Finance',
    shortTitle: 'Accounting & Finance',
    category: 'Finance',
    tagline: 'Keep books, file GST and report like a pro — using Tally Prime, Excel and AI.',
    summary:
      'Learn practical accounting, Tally Prime, GST, TDS and payroll, plus advanced Excel and MIS reporting, taught through real business scenarios.',
    overview: [
      'Every business, from a neighbourhood shop to a listed company, needs people who can keep accurate books and stay compliant. This program gives you the practical, job-ready accounting skills that employers across India look for.',
      'You will start with the fundamentals of double-entry accounting, then work hands-on in Tally Prime to record transactions, manage inventory and banking, and generate reports. Dedicated modules cover GST registration, invoicing and returns, TDS and payroll basics, and the advanced Excel techniques accountants rely on for MIS reporting.',
      'Throughout the program you will see how AI assistants can speed up routine work such as reconciliations, summaries and data clean-up — while you stay in control of accuracy and compliance. You finish by keeping a full set of books for a small business.',
    ],
    icon: 'calculator',
    theme: 'emerald',
    duration: '3 months', // PLACEHOLDER P-44
    durationISO: 'P3M', // PLACEHOLDER P-44
    mode: 'Live online',
    schedule: SCHEDULE,
    level: 'Beginner',
    language: LANGUAGE,
    languageCodes: LANGUAGE_CODES,
    fee: { amount: null, note: FEE_NOTE }, // PLACEHOLDER P-41
    nextBatch: null, // PLACEHOLDER P-42
    certification: {
      title: 'NSIM Certified Accounting & Taxation Professional', // PLACEHOLDER P-47
      description: 'Awarded on completing the live sessions, practical assignments and the small-business books capstone. Add it to your resume and LinkedIn profile.', // PLACEHOLDER P-56
    },
    highlights: [ // PLACEHOLDER P-55
      'Hands-on Tally Prime from day one',
      'GST, TDS and payroll with real invoices',
      'Advanced Excel and MIS reporting',
      'Placement assistance for accounts roles',
    ],
    outcomes: [ // PLACEHOLDER P-55
      'Record business transactions using double-entry principles',
      'Maintain complete books of accounts in Tally Prime',
      'Register for GST, raise compliant invoices and prepare returns',
      'Understand TDS deductions and process basic payroll',
      'Manage inventory, banking and reconciliations in Tally',
      'Prepare financial statements and MIS reports for management',
      'Use advanced Excel and AI assistants to speed up routine accounting work',
    ],
    tools: ['tally-prime', 'gst-portal', 'ms-excel', 'google-sheets', 'chatgpt'], // PLACEHOLDER P-55
    curriculum: [
      { id: 'm1', duration: '1 week', lessons: 4, // PLACEHOLDER P-45
        title: 'Accounting fundamentals', summary: 'Learn the language of business: accounts, journals, ledgers and the double-entry system.', // PLACEHOLDER P-49
        topics: ['Accounting principles', 'Types of accounts', 'Journal entries', 'Ledgers and trial balance'] }, // PLACEHOLDER P-49
      { id: 'm2', duration: '2 weeks', lessons: 6, // PLACEHOLDER P-45
        title: 'Tally Prime essentials', summary: 'Set up companies and record everyday transactions confidently in Tally Prime.', // PLACEHOLDER P-49
        topics: ['Company creation', 'Ledgers and groups', 'Voucher entry', 'Day book and reports', 'Data backup'] }, // PLACEHOLDER P-49
      { id: 'm3', duration: '2 weeks', lessons: 6, // PLACEHOLDER P-45
        title: 'GST — registration, invoicing & returns', summary: 'Handle GST end to end, from registration and compliant invoices to filing periodic returns.', // PLACEHOLDER P-49
        topics: ['GST structure', 'Registration process', 'Tax invoices and e-invoicing', 'Input tax credit', 'Filing returns', 'GST in Tally'] }, // PLACEHOLDER P-49
      { id: 'm4', duration: '1 week', lessons: 4, // PLACEHOLDER P-45
        title: 'TDS & payroll basics', summary: 'Understand tax deducted at source and run a simple, accurate monthly payroll.', // PLACEHOLDER P-49
        topics: ['TDS sections and rates', 'Deduction and deposit', 'Salary structure', 'Payroll in Tally'] }, // PLACEHOLDER P-49
      { id: 'm5', duration: '1 week', lessons: 4, // PLACEHOLDER P-45
        title: 'Inventory & banking in Tally', summary: 'Track stock movements and keep bank records reconciled and up to date.', // PLACEHOLDER P-49
        topics: ['Stock items and groups', 'Purchase and sales orders', 'Bank reconciliation', 'Cheque and payment management'] }, // PLACEHOLDER P-49
      { id: 'm6', duration: '1 week', lessons: 4, // PLACEHOLDER P-45
        title: 'Financial statements & MIS reporting', summary: 'Prepare statements and management reports that help owners make decisions.', // PLACEHOLDER P-49
        topics: ['Profit and loss account', 'Balance sheet', 'Cash flow basics', 'MIS report formats'] }, // PLACEHOLDER P-49
      { id: 'm7', duration: '2 weeks', lessons: 5, // PLACEHOLDER P-45
        title: 'Advanced Excel for accountants', summary: 'Use formulas, pivot tables and AI-assisted clean-up to analyse and present financial data.', // PLACEHOLDER P-49
        topics: ['Lookup functions', 'Pivot tables', 'Data validation and clean-up', 'Charts and dashboards', 'AI assistants for spreadsheets'] }, // PLACEHOLDER P-49
      { id: 'm8', duration: '1 week', lessons: 3, // PLACEHOLDER P-45
        title: 'Capstone: books for a small business', summary: 'Keep a full month of books for a sample business, from vouchers to GST returns and reports.', // PLACEHOLDER P-49
        topics: ['Case briefing', 'Transaction recording', 'GST computation', 'Final reports and review'] }, // PLACEHOLDER P-49
    ],
    projects: [
      'Set up a trading company in Tally Prime and record a month of transactions', // PLACEHOLDER P-49
      'Prepare GST invoices and a monthly return for a sample business', // PLACEHOLDER P-49
      'Build an Excel MIS dashboard from raw sales and expense data', // PLACEHOLDER P-49
      'Capstone: complete books, reconciliations and reports for a small business', // PLACEHOLDER P-49
    ],
    audience: [ // PLACEHOLDER P-55
      { title: 'Commerce students & graduates', description: 'Turn your commerce degree into practical, job-ready skills that accounts teams hire for.' },
      { title: 'Career switchers', description: 'Move into a stable accounting career with a clear, beginner-friendly path.' },
      { title: 'Business owners', description: 'Understand your own books, stay GST-compliant and work better with your accountant.' },
    ],
    includes: [ // PLACEHOLDER P-56
      'Live sessions + recordings',
      'Practice data sets and invoices',
      'Tally Prime and Excel assignments',
      'Certificate on completion',
      'Placement assistance',
    ],
    careerRoles: [ // PLACEHOLDER P-55
      'Accounts Executive',
      'GST Practitioner Assistant',
      'Tally Operator',
      'Accounts Payable/Receivable Associate',
      'MIS Executive',
    ],
    faqs: [
      {
        id: 'business-accounting-finance-commerce',
        question: 'Do I need a commerce background?',
        answer: 'It helps, but it is not required. The first module covers accounting fundamentals from scratch, so learners from any stream can follow along.',
      },
      {
        id: 'business-accounting-finance-tally-licence',
        question: 'Do I need to buy a Tally Prime licence?',
        answer: 'No. You can practise using the free educational mode of Tally Prime, and mentors will help you set it up during the first week.',
      },
      {
        id: 'business-accounting-finance-gst-filing',
        question: 'Will I learn to file actual GST returns?',
        answer: 'You will learn the full return process on sample data and walk through the GST portal step by step, so you are ready to handle real filings at work.',
      },
    ],
    seo: {
      title: 'Business Accounting, Tally & GST Course',
      description: 'Live online accounting course in Kolkata covering Tally Prime, GST, TDS, payroll, advanced Excel and MIS reporting, with placement assistance.',
    },
  },
  {
    slug: 'ai-prompt-engineering',
    title: 'AI-Powered Prompt Engineering',
    shortTitle: 'Prompt Engineering',
    category: 'AI',
    tagline: 'Turn AI models into reliable teammates — for content, data, code and automation.',
    summary:
      'Learn how large language models work, master proven prompt patterns, and build AI assistants and no-code automations that save hours every week.',
    overview: [
      'AI assistants are now part of everyday work, but most people only scratch the surface. The professionals who stand out are the ones who can get consistent, high-quality results from these tools and fold them into real workflows.',
      'This program starts with an intuitive look at how large language models work, then moves quickly into hands-on practice: prompt patterns and frameworks, prompting for content, code and data, image and multimodal generation, and building your own assistants and no-code automations.',
      'You will also learn how to evaluate outputs, reduce errors and use AI responsibly. The program ends with a capstone in which you design and document an AI workflow that solves a real business problem.',
    ],
    icon: 'sparkles',
    theme: 'amber',
    badge: 'New', // PLACEHOLDER P-48
    duration: '2 months', // PLACEHOLDER P-44
    durationISO: 'P2M', // PLACEHOLDER P-44
    mode: 'Live online',
    schedule: SCHEDULE,
    level: 'Beginner',
    language: LANGUAGE,
    languageCodes: LANGUAGE_CODES,
    fee: { amount: null, note: FEE_NOTE }, // PLACEHOLDER P-41
    nextBatch: null, // PLACEHOLDER P-42
    certification: {
      title: 'NSIM Certified Prompt Engineering Professional', // PLACEHOLDER P-47
      description: 'Awarded on completing the live sessions, weekly prompt labs and the capstone AI workflow. Share it on your resume and LinkedIn profile.', // PLACEHOLDER P-56
    },
    highlights: [ // PLACEHOLDER P-55
      'Prompt patterns that work across leading AI models',
      'Build assistants and no-code automations',
      'Evaluation, safety and responsible AI',
    ],
    outcomes: [ // PLACEHOLDER P-55
      'Explain how large language models generate answers and where they fail',
      'Apply proven prompt patterns to get consistent, high-quality output',
      'Use AI for writing, research, spreadsheets and simple code',
      'Create images and multimodal content with generative tools',
      'Build custom assistants and no-code automations for repeat tasks',
      'Evaluate outputs for accuracy, bias and safety',
      'Design and document an AI workflow for a real business problem',
    ],
    tools: ['chatgpt', 'claude', 'gemini', 'image-generators', 'no-code-automation', 'notion-ai'], // PLACEHOLDER P-55
    curriculum: [
      { id: 'm1', duration: '1 week', lessons: 3, // PLACEHOLDER P-45
        title: 'How LLMs work', summary: 'Build an intuitive picture of how language models generate text, and why they sometimes get things wrong.', // PLACEHOLDER P-49
        topics: ['Tokens and context windows', 'Training and fine-tuning', 'Strengths and limits', 'Choosing the right model'] }, // PLACEHOLDER P-49
      { id: 'm2', duration: '1 week', lessons: 4, // PLACEHOLDER P-45
        title: 'Prompt patterns & frameworks', summary: 'Learn repeatable prompt structures that produce reliable results across different AI tools.', // PLACEHOLDER P-49
        topics: ['Role and context', 'Few-shot examples', 'Step-by-step reasoning', 'Output formats', 'Iterative refinement'] }, // PLACEHOLDER P-49
      { id: 'm3', duration: '1 week', lessons: 4, // PLACEHOLDER P-45
        title: 'Prompting for content, code & data', summary: 'Apply prompting to everyday work: writing, research, spreadsheets and simple scripts.', // PLACEHOLDER P-49
        topics: ['Long-form content', 'Research and summarising', 'Spreadsheet formulas', 'Simple code generation', 'Data clean-up'] }, // PLACEHOLDER P-49
      { id: 'm4', duration: '1 week', lessons: 3, // PLACEHOLDER P-45
        title: 'Image & multimodal generation', summary: 'Create and edit visuals with generative tools, and work with images, audio and documents as input.', // PLACEHOLDER P-49
        topics: ['Image prompt anatomy', 'Style and consistency', 'Editing and variations', 'Working with files and images'] }, // PLACEHOLDER P-49
      { id: 'm5', duration: '2 weeks', lessons: 5, // PLACEHOLDER P-45
        title: 'Building assistants & no-code automation', summary: 'Package your prompts into custom assistants and connect them to apps with no-code automation.', // PLACEHOLDER P-49
        topics: ['Custom assistant design', 'Knowledge files', 'Automation triggers and actions', 'Connecting apps', 'Testing workflows'] }, // PLACEHOLDER P-49
      { id: 'm6', duration: '1 week', lessons: 3, // PLACEHOLDER P-45
        title: 'Evaluation, safety & ethics', summary: 'Check AI output for accuracy and bias, protect data, and use AI responsibly at work.', // PLACEHOLDER P-49
        topics: ['Fact-checking outputs', 'Bias and fairness', 'Privacy and data handling', 'Responsible use policies'] }, // PLACEHOLDER P-49
      { id: 'm7', duration: '1 week', lessons: 2, // PLACEHOLDER P-45
        title: 'Capstone AI workflow', summary: 'Design, build and present an AI workflow that solves a real business problem end to end.', // PLACEHOLDER P-49
        topics: ['Problem definition', 'Workflow design', 'Build and test', 'Documentation and demo'] }, // PLACEHOLDER P-49
    ],
    projects: [
      'Prompt library for a marketing or operations team, with tested templates', // PLACEHOLDER P-49
      'Custom AI assistant that answers questions from a company knowledge base', // PLACEHOLDER P-49
      'Capstone: automated AI workflow with documentation and a live demo', // PLACEHOLDER P-49
    ],
    audience: [ // PLACEHOLDER P-55
      { title: 'Students & graduates', description: 'Add an in-demand AI skill set to your profile, whatever your field of study.' },
      { title: 'Marketers, analysts & creators', description: 'Produce better work in less time by making AI a dependable part of your workflow.' },
      { title: 'Managers & founders', description: 'Spot automation opportunities and lead your team’s adoption of AI with confidence.' },
    ],
    includes: [ // PLACEHOLDER P-56
      'Live sessions + recordings',
      'Weekly hands-on prompt labs',
      'Prompt and workflow templates',
      'Certificate on completion',
      'Placement assistance',
    ],
    careerRoles: [ // PLACEHOLDER P-55
      'Prompt Engineer',
      'AI Content Specialist',
      'AI Automation Associate',
      'AI-enabled Marketing Associate',
    ],
    faqs: [
      {
        id: 'ai-prompt-engineering-coding',
        question: 'Do I need to know programming?',
        answer: 'No. The program is designed for non-programmers. Where code appears, AI writes it and you learn to guide, test and use it safely.',
      },
      {
        id: 'ai-prompt-engineering-paid-tools',
        question: 'Will I need paid AI subscriptions?',
        answer: 'Most exercises work on free tiers. Mentors point out where a paid plan adds value, so you can decide whether it is worth it for you.',
      },
      {
        id: 'ai-prompt-engineering-changes',
        question: 'AI tools change so fast. Will what I learn stay relevant?',
        answer: 'Yes. We focus on principles and patterns that carry across models and tools, and the curriculum is refreshed as the tools evolve.',
      },
    ],
    seo: {
      title: 'AI-Powered Prompt Engineering Course',
      description: 'Live online prompt engineering course: LLM basics, prompt patterns, AI assistants and no-code automation, with a capstone project and certificate.',
    },
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getRelatedCourses(slug: CourseSlug): Course[] {
  return courses.filter((c) => c.slug !== slug);
}

export function toCardData(c: Course): CourseCardData {
  return {
    slug: c.slug,
    title: c.title,
    summary: c.summary,
    icon: c.icon,
    theme: c.theme,
    badge: c.badge,
    duration: c.duration,
    level: c.level,
    category: c.category,
    highlights: c.highlights,
  };
}

export const courseLinks: { href: `/courses/${CourseSlug}/`; label: string }[] = COURSE_SLUGS.map((slug) => ({
  href: `/courses/${slug}/` as const,
  label: getCourseBySlug(slug)!.shortTitle,
}));

export const syllabusNote = 'Detailed syllabus PDF: coming soon'; // PLACEHOLDER P-40
