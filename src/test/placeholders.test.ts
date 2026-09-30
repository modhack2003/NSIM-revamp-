import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => `P-${String(from + i).padStart(2, '0')}`);

export const PLACEHOLDER_IDS = [
  ...range(1, 4),
  ...range(10, 13),
  ...range(20, 25),
  ...range(30, 38),
  ...range(40, 56),
  'P-60',
  'P-62',
];

const root = path.resolve(__dirname, '../..');
const dataDir = path.join(root, 'src/data');

function readDataFiles(): string {
  return fs
    .readdirSync(dataDir, { recursive: true, encoding: 'utf8' })
    .filter((f) => f.endsWith('.ts'))
    .map((f) => fs.readFileSync(path.join(dataDir, f), 'utf8'))
    .join('\n');
}

describe('placeholder register', () => {
  it('has 42 ids', () => {
    expect(PLACEHOLDER_IDS).toHaveLength(42);
    expect(new Set(PLACEHOLDER_IDS).size).toBe(42);
  });

  const data = readDataFiles();

  it('every registered id appears in src/data', () => {
    const missing = PLACEHOLDER_IDS.filter((id) => !data.includes(`PLACEHOLDER ${id}`));
    expect(missing).toEqual([]);
  });

  it('no unregistered ids are used in src/data', () => {
    const found = [...data.matchAll(/PLACEHOLDER (P-\d+)/g)].map((m) => m[1]);
    const unknown = [...new Set(found)].filter((id) => !PLACEHOLDER_IDS.includes(id));
    expect(unknown).toEqual([]);
  });

  it('every id is listed in CONTENT.md', () => {
    const content = fs.readFileSync(path.join(root, 'CONTENT.md'), 'utf8');
    const missing = PLACEHOLDER_IDS.filter((id) => !new RegExp(`\\b${id}\\b`).test(content));
    expect(missing).toEqual([]);
  });
});
