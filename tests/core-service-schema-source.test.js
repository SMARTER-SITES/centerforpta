import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const servicePages = [
  'src/pages/therapy.astro',
  'src/pages/psychological-assessment.astro',
  'src/pages/consultation-supervision-and-coaching.astro',
  'src/pages/prenatal-therapy.astro',
  'src/pages/postpartum-therapy.astro',
  'src/pages/womens-mental-health-therapy.astro',
  'src/pages/bariatric-surgery-counseling.astro',
  'src/pages/pre-surgical-psychological-evaluations.astro',
  'src/pages/immigration-evaluations.astro',
  'src/pages/sr/therapy.astro',
  'src/pages/sr/psychological-assessment.astro',
  'src/pages/sr/consultation-supervision-and-coaching.astro'
];

test('core service pages expose Service structured data', () => {
  for (const page of servicePages) {
    const source = readFileSync(page, 'utf8');

    assert.match(source, /getServiceStructuredData/, `${page} should build service schema`);
    assert.match(source, /structuredData=\{serviceStructuredData\}/, `${page} should pass service schema to Layout`);
  }
});
