import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  getFaqStructuredData as getEnglishFaqStructuredData,
  getServiceStructuredData as getEnglishServiceStructuredData,
  getWebPageStructuredData as getEnglishWebPageStructuredData
} from '../src/utils/seo.ts';
import {
  getFaqStructuredData as getSerbianFaqStructuredData,
  getServiceStructuredData as getSerbianServiceStructuredData,
  getWebPageStructuredData as getSerbianWebPageStructuredData
} from '../src/utils-sr/seo.ts';

const read = (path) => readFileSync(path, 'utf8');
const englishLayout = read('src/layouts/Layout.astro');
const serbianLayout = read('src/layouts-sr/Layout.astro');
const audit = read('scripts/audit-generated-site.mjs');

test('bilingual layouts create one canonical page entity for ordinary pages', () => {
  const englishPage = getEnglishWebPageStructuredData({
    name: 'Therapy in Schaumburg',
    description: 'Example description',
    url: 'https://centerforpta.com/therapy/',
    language: 'en-US',
    image: 'https://centerforpta.com/images/therapy.jpg'
  });
  const serbianPage = getSerbianWebPageStructuredData({
    name: 'Terapija u Schaumburgu',
    description: 'Primer opisa',
    url: 'https://centerforpta.com/sr/therapy/',
    language: 'sr-Latn'
  });

  assert.equal(englishPage['@type'], 'WebPage');
  assert.equal(englishPage['@id'], 'https://centerforpta.com/therapy/#webpage');
  assert.equal(englishPage.isPartOf['@id'], 'https://centerforpta.com/#website');
  assert.equal(englishPage.about['@id'], 'https://centerforpta.com/#professional-service');
  assert.equal(englishPage.publisher['@id'], 'https://centerforpta.com/#professional-service');
  assert.equal(englishPage.inLanguage, 'en-US');
  assert.equal(englishPage.primaryImageOfPage.url, 'https://centerforpta.com/images/therapy.jpg');
  assert.equal(serbianPage['@id'], 'https://centerforpta.com/sr/therapy/#webpage');
  assert.equal(serbianPage.inLanguage, 'sr-Latn');

  assert.match(englishLayout, /getWebPageStructuredData/);
  assert.match(englishLayout, /language: 'en-US'/);
  assert.match(serbianLayout, /getWebPageStructuredData/);
  assert.match(serbianLayout, /language: 'sr-Latn'/);
  for (const layout of [englishLayout, serbianLayout]) {
    assert.match(layout, /hasCustomWebPageEntity/);
    assert.match(layout, /!noIndex && !hasCustomWebPageEntity/);
  }
});

test('FAQ, article, and service entities point to the canonical page node', () => {
  const questions = [{ question: 'Where?', answer: 'In Schaumburg.' }];
  const englishFaq = getEnglishFaqStructuredData(questions, {
    pageUrl: 'https://centerforpta.com/contact/',
    language: 'en-US'
  });
  const serbianFaq = getSerbianFaqStructuredData(questions, {
    pageUrl: 'https://centerforpta.com/sr/contact/',
    language: 'sr-Latn'
  });
  const englishService = getEnglishServiceStructuredData({
    name: 'Therapy',
    description: 'Therapy description',
    path: '/therapy/'
  });
  const serbianService = getSerbianServiceStructuredData({
    name: 'Terapija',
    description: 'Opis terapije',
    path: '/sr/therapy/'
  });

  assert.equal(englishFaq['@id'], 'https://centerforpta.com/contact/#faq');
  assert.equal(englishFaq.isPartOf['@id'], 'https://centerforpta.com/contact/#webpage');
  assert.equal(serbianFaq['@id'], 'https://centerforpta.com/sr/contact/#faq');
  assert.equal(serbianFaq.inLanguage, 'sr-Latn');
  assert.equal(englishService.mainEntityOfPage['@id'], 'https://centerforpta.com/therapy/#webpage');
  assert.equal(serbianService.mainEntityOfPage['@id'], 'https://centerforpta.com/sr/therapy/#webpage');

  for (const layout of [englishLayout, serbianLayout]) {
    assert.match(layout, /mainEntityOfPage: \{\s*'@id': `\$\{canonicalUrl\}#webpage`/);
    assert.match(layout, /pageUrl: canonicalUrl/);
  }
});

test('specialized page entities and the generated-site audit use the same stable id', () => {
  const specializedSources = [
    read('src/pages/contact.astro'),
    read('src/pages/sr/contact.astro'),
    read('src/pages/dr-jelena-djurovic.astro'),
    read('src/pages/sr/dr-jelena-djurovic.astro'),
    read('src/pages/useful-links.astro'),
    read('src/pages/sr/useful-links.astro'),
    read('src/components/InsightsListing.astro'),
    read('src/components-sr/InsightsListing.astro')
  ];

  for (const source of specializedSources) {
    assert.match(source, /#webpage/);
    assert.doesNotMatch(source, /#profile-page|#collection-page|#collection`/);
  }

  assert.match(audit, /entityGraph: \[\]/);
  assert.match(audit, /expected one page entity/);
  assert.match(audit, /is not linked to the canonical page entity/);
  assert.match(audit, /FAQ entity mismatch/);
  assert.match(audit, /contactPage\?\.mainEntity\?\.\['@id'\] !== practiceId/);
  assert.match(audit, /contactPage\?\.publisher\?\.\['@id'\] !== practiceId/);
  assert.match(audit, /misplaced ContactPage contactPoint/);
});
