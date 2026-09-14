#!/usr/bin/env node
/**
 * Bundle every Redocly API entry to src/.bundled/{name}.openapi.yaml + {name}.json
 */
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const bundled = join(root, 'src', '.bundled');
mkdirSync(bundled, { recursive: true });

const domains = [
  'identity',
  'scoring',
  'composition',
  'permitting',
  'engagement',
  'experience',
  'claims',
  'reinsurance',
];

let failed = 0;
for (const name of domains) {
  for (const [ext, out] of [
    ['yaml', join(bundled, `${name}.openapi.yaml`)],
    ['json', join(bundled, `${name}.json`)],
  ]) {
    const r = spawnSync(
      'pnpm',
      ['exec', 'redocly', 'bundle', name, '--output', out],
      { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' }
    );
    if (r.status !== 0) {
      console.error(`bundle failed: ${name} → ${ext}`);
      failed += 1;
    }
  }
}

if (failed) process.exit(1);
console.log(`Bundled ${domains.length} domains into ${bundled}`);
