import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');
const breadcrumbComponent = read('src/components/PageBreadcrumbs.astro');
const englishTopicHero = read('src/components/TopicHero.astro');
const serbianTopicHero = read('src/components-sr/TopicHero.astro');
const audit = read('scripts/audit-generated-site.mjs');

const manuallyRenderedServicePairs = [
  'therapy.astro',
  'psychological-assessment.astro',
  'immigration-evaluations.astro',
  'pre-surgical-psychological-evaluations.astro',
  'consultation-supervision-and-coaching.astro',
  'womens-mental-health-therapy.astro'
];

const remainingIndexablePagePairs = [
  'book-recommendations.astro',
  'contact.astro',
  'dr-jelena-djurovic.astro',
  'our-partners.astro',
  'privacy-policy.astro',
  'rates-and-insurance.astro',
  'useful-links.astro'
];

test('shared service breadcrumbs keep visible navigation and JSON-LD together', () => {
  assert.match(breadcrumbComponent, /getBreadcrumbStructuredData/);
  assert.match(breadcrumbComponent, /aria-label=\{ariaLabel\}/);
  assert.match(breadcrumbComponent, /aria-current="page"/);
  assert.match(breadcrumbComponent, /type="application\/ld\+json"/);
  assert.match(breadcrumbComponent, /Astro\.url\.pathname/);
  assert.match(breadcrumbComponent, /\{ name: homeLabel, path: homePath \}/);
  assert.match(breadcrumbComponent, /\.\.\.ancestors\.map/);
  assert.match(breadcrumbComponent, /\{ name: currentLabel, path: Astro\.url\.pathname \}/);
  assert.match(breadcrumbComponent, /tone === 'light'/);
});

test('all specialized TopicHero service pages inherit bilingual breadcrumbs', () => {
  assert.match(englishTopicHero, /<PageBreadcrumbs currentLabel=\{`\$\{title\} \$\{accent\}`\} \/>/);
  assert.match(serbianTopicHero, /<PageBreadcrumbs/);
  assert.match(serbianTopicHero, /homeLabel="Početna"/);
  assert.match(serbianTopicHero, /homePath="\/sr\/"/);
  assert.match(serbianTopicHero, /ariaLabel="Putanja stranice"/);
});

test('remaining bilingual core service pages render the shared breadcrumbs in their heroes', () => {
  for (const filename of manuallyRenderedServicePairs) {
    const englishPage = read(`src/pages/${filename}`);
    const serbianPage = read(`src/pages/sr/${filename}`);

    assert.match(englishPage, /import PageBreadcrumbs/);
    assert.match(englishPage, /<PageBreadcrumbs currentLabel=/);
    assert.match(serbianPage, /import PageBreadcrumbs/);
    assert.match(serbianPage, /<PageBreadcrumbs currentLabel=/);
    assert.match(serbianPage, /homeLabel="Početna"/);
    assert.match(serbianPage, /homePath="\/sr\/"/);
  }
});

test('remaining bilingual indexable page types render the shared breadcrumbs', () => {
  for (const filename of remainingIndexablePagePairs) {
    const englishPage = read(`src/pages/${filename}`);
    const serbianPage = read(`src/pages/sr/${filename}`);

    assert.match(englishPage, /import PageBreadcrumbs/);
    assert.match(englishPage, /<PageBreadcrumbs/);
    assert.match(serbianPage, /import PageBreadcrumbs/);
    assert.match(serbianPage, /<PageBreadcrumbs/);
    assert.match(serbianPage, /homeLabel="Početna"/);
    assert.match(serbianPage, /homePath="\/sr\/"/);
  }
});

test('bilingual Insights hubs expose hierarchy-aware breadcrumbs on every page', () => {
  const englishInsights = read('src/components/InsightsListing.astro');
  const serbianInsights = read('src/components-sr/InsightsListing.astro');

  assert.match(englishInsights, /import PageBreadcrumbs/);
  assert.match(englishInsights, /ancestors=\{currentPage === 1/);
  assert.match(englishInsights, /label: 'Clinical Insights', path: '\/blog\/'/);
  assert.match(serbianInsights, /import PageBreadcrumbs/);
  assert.match(serbianInsights, /label: 'Klinički uvidi', path: '\/sr\/blog\/'/);
  assert.match(serbianInsights, /ariaLabel="Putanja stranice"/);
});

test('generated-site audit enforces breadcrumb visibility and schema parity sitewide', () => {
  assert.match(audit, /breadcrumbs: \[\]/);
  assert.match(audit, /expected one BreadcrumbList on indexable page/);
  assert.match(audit, /!isLocalizedHomepage/);
  assert.match(audit, /service item count/);
  assert.match(audit, /positions/);
  assert.match(audit, /missing visible breadcrumb navigation/);
  assert.match(audit, /breadcrumb mismatch/);
  assert.match(audit, /visible names/);
});
