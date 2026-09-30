#!/usr/bin/env node
// Verifies the static export in out/ (design §14 "Build verification"). Node built-ins only.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const OUT = path.resolve(process.cwd(), 'out');
const SLUGS = ['ai-digital-marketing', 'business-accounting-finance', 'ai-prompt-engineering'];
const PAGES = ['index.html', 'courses/index.html', ...SLUGS.map((s) => `courses/${s}/index.html`), 'about/index.html', 'contact/index.html'];
const COURSE_PAGES = SLUGS.map((s) => `courses/${s}/index.html`);
const JS_BUDGET = 200 * 1024;

const failures = [];
const passes = [];
const check = (ok, msg) => (ok ? passes.push(msg) : failures.push(msg));
const read = (rel) => fs.readFileSync(path.join(OUT, rel), 'utf8');
const exists = (rel) => fs.existsSync(path.join(OUT, rel));

function walk(dir, exts) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p, exts));
    else if (exts.some((e) => entry.name.endsWith(e))) out.push(p);
  }
  return out;
}

const meta = (html, attr, key) => {
  const re = new RegExp(`<meta[^>]*${attr}="${key}"[^>]*>`, 'i');
  const tag = html.match(re)?.[0];
  return tag?.match(/content="([^"]*)"/i)?.[1];
};

if (!fs.existsSync(OUT)) {
  console.error('out/ does not exist — run `pnpm build` first.');
  process.exit(1);
}

// 1. Files exist
const REQUIRED = [...PAGES, '404.html', 'sitemap.xml', 'robots.txt', 'manifest.webmanifest', 'og.png', 'apple-touch-icon.png', 'icon.svg'];
for (const f of REQUIRED) check(exists(f), `exists: ${f}`);
const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
for (const f of ['og.png', 'apple-touch-icon.png']) {
  if (exists(f)) check(fs.readFileSync(path.join(OUT, f)).subarray(0, 8).equals(PNG_SIG), `png signature: ${f}`);
}

// 2. Indexable pages
const titles = new Map();
for (const page of PAGES) {
  if (!exists(page)) continue;
  const html = read(page);
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  check(h1s === 1, `${page}: exactly one <h1> (found ${h1s})`);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.replace(/&amp;/g, '&') ?? '';
  check(title.length > 0 && title.length <= 60, `${page}: title present and ≤ 60 chars ("${title}", ${title.length})`);
  titles.set(page, title);
  check(Boolean(meta(html, 'name', 'description')), `${page}: meta description`);
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/)?.[1];
  check(Boolean(canonical) && canonical.endsWith('/'), `${page}: canonical ends with / (${canonical})`);
  check(Boolean(meta(html, 'property', 'og:title')), `${page}: og:title`);
  const ogImage = meta(html, 'property', 'og:image');
  const ogPath = ogImage ? new URL(ogImage, 'https://x.invalid').pathname : '';
  check(Boolean(ogImage) && exists(ogPath.replace(/^\//, '')), `${page}: og:image resolves to a file (${ogPath})`);
  check(!/noindex/i.test(html.match(/<meta[^>]*name="robots"[^>]*>/i)?.[0] ?? ''), `${page}: not noindex`);
}
check(new Set(titles.values()).size === titles.size, 'titles unique across the 7 pages');

// 404
if (exists('404.html')) {
  const html = read('404.html');
  check((html.match(/<h1[\s>]/g) ?? []).length === 1, '404.html: exactly one <h1>');
  check(/noindex/i.test(html.match(/<meta[^>]*name="robots"[^>]*>/i)?.[0] ?? ''), '404.html: robots noindex');
  check(!/rel="canonical"/.test(html), '404.html: no canonical');
}

// 3. Structured data
for (const page of [...PAGES, '404.html']) {
  if (!exists(page)) continue;
  const html = read(page);
  check(html.includes('"@type":"EducationalOrganization"'), `${page}: EducationalOrganization JSON-LD`);
  const hasFaq = html.includes('"@type":"FAQPage"');
  check(page === 'index.html' ? hasFaq : !hasFaq, `${page}: FAQPage ${page === 'index.html' ? 'present' : 'absent'}`);
}
for (const page of COURSE_PAGES) {
  if (!exists(page)) continue;
  const html = read(page);
  check(html.includes('"@type":"Course"'), `${page}: Course JSON-LD`);
  check(html.includes('"@type":"BreadcrumbList"'), `${page}: BreadcrumbList JSON-LD`);
}

// 4. Sitemap + robots
if (exists('sitemap.xml')) {
  const locs = (read('sitemap.xml').match(/<loc>/g) ?? []).length;
  check(locs === 7, `sitemap.xml: 7 <loc> entries (found ${locs})`);
}
if (exists('robots.txt')) check(/Sitemap:/i.test(read('robots.txt')), 'robots.txt: references Sitemap');

// 5. No external runtime assets
const EXTERNAL = [/<script[^>]*\ssrc="https?:/i, /<link[^>]*rel="(?:stylesheet|preload|modulepreload)"[^>]*href="https?:/i, /<link[^>]*href="https?:[^"]*"[^>]*rel="(?:stylesheet|preload|modulepreload)"/i, /<img[^>]*\ssrc="https?:/i, /url\(\s*['"]?https?:/i];
let externalHits = 0;
for (const file of walk(OUT, ['.html', '.css'])) {
  const text = fs.readFileSync(file, 'utf8');
  for (const re of EXTERNAL) {
    if (re.test(text)) {
      externalHits++;
      failures.push(`external asset in ${path.relative(OUT, file)} (${re})`);
    }
  }
}
if (externalHits === 0) passes.push('no external runtime assets in out/**/*.{html,css}');

// 6. JS budget for home
if (exists('index.html')) {
  const html = read('index.html');
  // `noModule` scripts are legacy polyfills that module-capable browsers never download, so they are not first-load JS.
  const srcs = [
    ...new Set(
      [...html.matchAll(/<script([^>]*)\ssrc="([^"]+\.js)"([^>]*)>/g)]
        .filter((m) => !/\bnomodule\b/i.test(m[1] + m[3]))
        .map((m) => m[2]),
    ),
  ];
  let total = 0;
  for (const src of srcs) {
    const p = path.join(OUT, new URL(src, 'https://x.invalid').pathname);
    if (fs.existsSync(p)) total += zlib.gzipSync(fs.readFileSync(p)).length;
  }
  check(total <= JS_BUDGET, `home first-load JS ${(total / 1024).toFixed(1)} kB gzipped (${srcs.length} scripts) ≤ 200 kB`);
}

for (const p of passes) console.log(`  ✓ ${p}`);
for (const f of failures) console.log(`  ✗ ${f}`);
console.log(`\n${passes.length} passed, ${failures.length} failed`);
process.exit(failures.length ? 1 : 0);
