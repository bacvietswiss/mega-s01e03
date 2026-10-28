import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { causeOf, groupByCause, sameCause, uniqueById } from './src/lib/kb/causes.ts';
import { deskRef } from './src/lib/kb/desk-ref.ts';

const read = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
const reports = read('./src/lib/data/reports-4471.json');
const notes = read('./src/lib/data/desk-notes.json');
const tenants = readdirSync(new URL('./src/lib/data/tenants/', import.meta.url))
  .map((name) => read(`./src/lib/data/tenants/${name}`));
const tenantOf = (r) => tenants.find((t) => t.handle === r.tenant);
const merged = uniqueById(reports).filter((r) => r.mergedInto === 4471);
const groups = groupByCause(merged, tenantOf);

assert.equal(reports.length, 427);
assert.equal(merged.length, 412);
assert.deepEqual(groups.map((g) => [g.cause, g.reports.length]), [['parser', 379], ['hint', 33]]);
for (const r of reports) assert.deepEqual(r, merged.find((other) => other.id === r.id));
for (const id of notes.oneDayMove) {
  const report = merged.find((r) => r.id === id);
  assert.equal(causeOf(report, tenantOf(report)), 'parser');
}
const alder = tenantOf({ tenant: 'alder.physio' });
assert.equal(sameCause({ channel: 'form' }, alder, { channel: 'app' }, alder), false);
assert.equal(sameCause({ channel: 'app' }, alder, { channel: 'email' }, alder), true);
assert.equal(sameCause({ channel: 'app' }, undefined, { channel: 'app' }, undefined), false);

const html = readFileSync(new URL('./rendered/kb/decisions/0002-dedupe-by-cause/index.html', import.meta.url), 'utf8');
const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
assert.match(text, /412 reports merged into #4471/);
assert.match(text, /parser\s+379/);
assert.match(text, /hint\s+33/);
assert.match(text, /5 reports read as a one-day move/);
assert.ok(text.includes(deskRef('bacvietswiss / Codex')));
assert.ok(!text.includes("no desk ref: this page isn't signed"));
console.log('Verified report counts, duplicate consistency, anomalies, triage examples, and rendered signature.');
