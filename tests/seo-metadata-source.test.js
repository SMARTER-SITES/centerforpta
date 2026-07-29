import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const englishLayout = readFileSync('src/layouts/Layout.astro', 'utf8');
const serbianLayout = readFileSync('src/layouts-sr/Layout.astro', 'utf8');
const englishSeo = readFileSync('src/utils/seo.ts', 'utf8');
const serbianSeo = readFileSync('src/utils-sr/seo.ts', 'utf8');
const headers = readFileSync('public/_headers', 'utf8');
const contactPage = readFileSync('src/pages/contact.astro', 'utf8');
const providerPage = readFileSync('src/pages/dr-jelena-djurovic.astro', 'utf8');
const serbianProviderPage = readFileSync('src/pages/sr/dr-jelena-djurovic.astro', 'utf8');
const prenatalPage = readFileSync('src/pages/prenatal-therapy.astro', 'utf8');
const serbianPrenatalPage = readFileSync('src/pages/sr/prenatal-therapy.astro', 'utf8');

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

test('dedicated provider pages expose verifiable Person entity data', () => {
  assert.match(providerPage, /'@type': 'Person'/);
  assert.match(providerPage, /National Provider Identifier/);
  assert.match(providerPage, /providerNpiNumber/);
  assert.match(providerPage, /Psychologist in Schaumburg, IL/);
  assert.match(providerPage, /psychologytoday\.com\/us\/therapists\/jelena-djurovic-schaumburg-il\/1611370/);
  assert.match(serbianProviderPage, /'@type': 'Person'/);
  assert.match(serbianProviderPage, /Konverzacijski španski/);
});

test('structured data only advertises confirmed clinical service languages', () => {
  assert.match(englishSeo, /availableLanguage: \['English', 'Serbian'\]/);
  assert.match(serbianSeo, /availableLanguage: \['engleski', 'srpski'\]/);
  assert.doesNotMatch(englishSeo, /availableLanguage: \[[^\]]*Spanish/);
  assert.doesNotMatch(serbianSeo, /availableLanguage: \[[^\]]*španski/);
});

test('prenatal pages follow the approved reproductive stress scope', () => {
  assert.doesNotMatch(prenatalPage, /unplanned pregnancy|pregnancy options counseling/i);
  assert.doesNotMatch(serbianPrenatalPage, /neplanirane trudnoće/i);
  assert.match(prenatalPage, /fertility-treatment stress/);
  assert.match(prenatalPage, /reproductive loss/);
  assert.match(serbianPrenatalPage, /stres zbog neplodnosti/);
});
