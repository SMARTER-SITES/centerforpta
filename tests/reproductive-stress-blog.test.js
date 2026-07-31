import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const englishArticle = readFileSync(
  new URL('../src/pages/blog/reproductive-stress-and-infertility.md', import.meta.url),
  'utf8'
);
const serbianArticle = readFileSync(
  new URL('../src/pages/sr/blog/reproductive-stress-and-infertility.md', import.meta.url),
  'utf8'
);
const englishService = readFileSync(
  new URL('../src/pages/womens-mental-health-therapy.astro', import.meta.url),
  'utf8'
);
const serbianService = readFileSync(
  new URL('../src/pages/sr/womens-mental-health-therapy.astro', import.meta.url),
  'utf8'
);

test('reproductive stress guide keeps bilingual review, location, and safety signals', () => {
  for (const article of [englishArticle, serbianArticle]) {
    assert.match(article, /author: "Center for PTA"/);
    assert.match(article, /reviewedBy: "Dr\. Jelena Djurovic, Psy\.D\."/);
    assert.match(article, /License #071-011433|licenca #071-011433/);
    assert.match(article, /physically located in Illinois|fizički nalazi u Illinois-u/);
    assert.match(article, /does not guarantee pregnancy|ne garantuje trudnoću/);
    assert.match(article, /reproductive-stress-infertility-schaumburg\.jpg/);
    assert.match(article, /reproductive-stress-shared-decisions\.jpg/);
    assert.match(article, /10\.1186\/s12905-025-04054-x/);
    assert.doesNotMatch(article, /Center for Psychological Treatment and Assessment/);
  }
});

test('reproductive stress topic cluster links service pages to both language versions', () => {
  assert.match(englishService, /\/blog\/reproductive-stress-and-infertility/);
  assert.match(serbianService, /\/sr\/blog\/reproductive-stress-and-infertility/);
});
