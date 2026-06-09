import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const englishLayout = readFileSync('src/layouts/Layout.astro', 'utf8');
const serbianLayout = readFileSync('src/layouts-sr/Layout.astro', 'utf8');
const englishSeo = readFileSync('src/utils/seo.ts', 'utf8');
const serbianSeo = readFileSync('src/utils-sr/seo.ts', 'utf8');
const headers = readFileSync('public/_headers', 'utf8');
const contactPage = readFileSync('src/pages/contact.astro', 'utf8');

test('layouts expose Open Graph locale and image dimensions', () => {
  assert.match(englishLayout, /property="og:locale" content="en_US"/);
  assert.match(englishLayout, /property="og:locale:alternate" content="sr_RS"/);
  assert.match(serbianLayout, /property="og:locale" content="sr_RS"/);
  assert.match(serbianLayout, /property="og:locale:alternate" content="en_US"/);
  assert.match(englishLayout, /property="og:image:width" content="640"/);
  assert.match(englishLayout, /property="og:image:height" content="640"/);
  assert.match(serbianLayout, /property="og:image:width" content="640"/);
  assert.match(serbianLayout, /property="og:image:height" content="640"/);
});

test('base structured data identifies the practice as a local medical service', () => {
  assert.match(englishSeo, /'MedicalBusiness'/);
  assert.match(englishSeo, /hasMap:/);
  assert.match(englishSeo, /medicalSpecialty:/);
  assert.match(englishSeo, /knowsLanguage:/);
  assert.match(englishSeo, /hasOfferCatalog:/);
  assert.match(englishSeo, /Hoffman Estates/);
  assert.match(serbianSeo, /'MedicalBusiness'/);
  assert.match(serbianSeo, /hasMap:/);
  assert.match(serbianSeo, /medicalSpecialty:/);
  assert.match(serbianSeo, /knowsLanguage:/);
  assert.match(serbianSeo, /hasOfferCatalog:/);
  assert.match(serbianSeo, /Hoffman Estates/);
});

test('crawl and contact surfaces expose local SEO signals', () => {
  assert.match(headers, /\/sitemap\.xml\n\s+Content-Type: application\/xml; charset=utf-8/);
  assert.match(headers, /\/robots\.txt\n\s+Content-Type: text\/plain; charset=utf-8/);
  assert.match(contactPage, /'@type': 'ContactPage'/);
  assert.match(contactPage, /Contact a Schaumburg, IL Psychologist/);
  assert.match(contactPage, /faqItems=\{faqItems\}/);
});
