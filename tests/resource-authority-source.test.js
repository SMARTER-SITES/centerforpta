import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const englishMedia = readFileSync('src/pages/useful-links.astro', 'utf8');
const serbianMedia = readFileSync('src/pages/sr/useful-links.astro', 'utf8');
const seoAudit = readFileSync('scripts/audit-generated-site.mjs', 'utf8');

test('media resource pages identify Dr. Jelena and expose a machine-readable collection', () => {
  for (const source of [englishMedia, serbianMedia]) {
    assert.match(source, /'@type': 'CollectionPage'/);
    assert.match(source, /'@type': 'ItemList'/);
    assert.match(source, /'@type': 'CreativeWork'/);
    assert.match(source, /dr-jelena-djurovic\/#person/);
    assert.match(source, /structuredData=\{mediaStructuredData\}/);
  }

  assert.match(englishMedia, /Dr\. Jelena Djurovic Media \| Center for PTA/);
  assert.match(serbianMedia, /Dr Jelena Djurovic u medijima \| Center for PTA/);
  assert.match(serbianMedia, /source: 'Serbian Times'/);
  assert.doesNotMatch(serbianMedia, /source: 'srpski Times'/);
});

test('generated-site audit keeps search snippets within broad quality guardrails', () => {
  assert.match(seoAudit, /snippetQuality/);
  assert.match(seoAudit, /titleLength < 25 \|\| titleLength > 70/);
  assert.match(seoAudit, /descriptionLength < 90 \|\| descriptionLength > 180/);
});
