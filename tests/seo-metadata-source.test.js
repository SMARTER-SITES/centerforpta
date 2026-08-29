import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  getBaseStructuredData as getEnglishBaseStructuredData,
  getBreadcrumbStructuredData as getEnglishBreadcrumbStructuredData,
  getServiceStructuredData as getEnglishServiceStructuredData,
  getWebSiteStructuredData as getEnglishWebSiteStructuredData,
  practiceDescription as englishPracticeDescription
} from '../src/utils/seo.ts';
import {
  getBaseStructuredData as getSerbianBaseStructuredData,
  getBreadcrumbStructuredData as getSerbianBreadcrumbStructuredData,
  getServiceStructuredData as getSerbianServiceStructuredData,
  getWebSiteStructuredData as getSerbianWebSiteStructuredData,
  practiceDescription as serbianPracticeDescription
} from '../src/utils-sr/seo.ts';

const englishLayout = readFileSync('src/layouts/Layout.astro', 'utf8');
const serbianLayout = readFileSync('src/layouts-sr/Layout.astro', 'utf8');
const englishSeo = readFileSync('src/utils/seo.ts', 'utf8');
const serbianSeo = readFileSync('src/utils-sr/seo.ts', 'utf8');
const headers = readFileSync('public/_headers', 'utf8');
const contactPage = readFileSync('src/pages/contact.astro', 'utf8');
const serbianContactPage = readFileSync('src/pages/sr/contact.astro', 'utf8');
const providerPage = readFileSync('src/pages/dr-jelena-djurovic.astro', 'utf8');
const serbianProviderPage = readFileSync('src/pages/sr/dr-jelena-djurovic.astro', 'utf8');
const prenatalPage = readFileSync('src/pages/prenatal-therapy.astro', 'utf8');
const serbianPrenatalPage = readFileSync('src/pages/sr/prenatal-therapy.astro', 'utf8');
const englishHome = readFileSync('src/pages/index.astro', 'utf8');
const serbianHome = readFileSync('src/pages/sr/index.astro', 'utf8');
const englishPreSurgicalPage = readFileSync('src/pages/pre-surgical-psychological-evaluations.astro', 'utf8');
const serbianPreSurgicalPage = readFileSync('src/pages/sr/pre-surgical-psychological-evaluations.astro', 'utf8');
const englishBlogLayout = readFileSync('src/layouts/BlogPostLayout.astro', 'utf8');
const serbianBlogLayout = readFileSync('src/layouts-sr/BlogPostLayout.astro', 'utf8');

test('layouts expose Open Graph locale and only emit verified image dimensions', () => {
  assert.match(englishLayout, /property="og:locale" content="en_US"/);
  assert.match(englishLayout, /property="og:locale:alternate" content="sr_RS"/);
  assert.match(serbianLayout, /property="og:locale" content="sr_RS"/);
  assert.match(serbianLayout, /property="og:locale:alternate" content="en_US"/);
  assert.match(englishLayout, /imageWidth/);
  assert.match(englishLayout, /imageHeight/);
  assert.match(serbianLayout, /imageWidth/);
  assert.match(serbianLayout, /imageHeight/);
  assert.doesNotMatch(englishLayout, /property="og:image:width" content="640"/);
  assert.doesNotMatch(serbianLayout, /property="og:image:height" content="640"/);
});

test('base structured data identifies the practice as a local medical service', () => {
  assert.match(englishSeo, /'MedicalBusiness'/);
  assert.match(englishSeo, /hasMap:/);
  assert.match(englishSeo, /medicalSpecialty:/);
  assert.match(englishSeo, /knowsLanguage:/);
  assert.match(englishSeo, /hasOfferCatalog:/);
  assert.match(englishSeo, /Hoffman Estates/);
  assert.match(englishSeo, /Family Therapy in Schaumburg, IL/);
  assert.match(serbianSeo, /'MedicalBusiness'/);
  assert.match(serbianSeo, /hasMap:/);
  assert.match(serbianSeo, /medicalSpecialty:/);
  assert.match(serbianSeo, /knowsLanguage:/);
  assert.match(serbianSeo, /hasOfferCatalog:/);
  assert.match(serbianSeo, /Hoffman Estates/);
  assert.match(serbianSeo, /Porodična terapija u Schaumburgu, IL/);
});

test('practice schema avoids unsupported founder claims while provider schema links the practice', () => {
  const englishPractice = getEnglishBaseStructuredData();
  const serbianPractice = getSerbianBaseStructuredData();

  assert.equal(englishPractice.founder, undefined);
  assert.equal(serbianPractice.founder, undefined);
  assert.equal(englishPractice.employee['@id'], 'https://centerforpta.com/dr-jelena-djurovic/#person');
  assert.equal(serbianPractice.employee['@id'], englishPractice.employee['@id']);
  assert.equal(englishPractice.employee.name, 'Dr. Jelena Djurovic');
  assert.match(providerPage, /worksFor:/);
  assert.match(providerPage, /#professional-service/);
  assert.match(serbianProviderPage, /worksFor:/);
  assert.match(serbianProviderPage, /#professional-service/);
});

test('the canonical practice entity keeps one stable bilingual description', () => {
  assert.equal(getEnglishBaseStructuredData().description, englishPracticeDescription);
  assert.equal(getSerbianBaseStructuredData().description, serbianPracticeDescription);
  assert.match(englishPracticeDescription, /women's mental health/);
  assert.match(englishPracticeDescription, /reproductive stress/);
  assert.match(englishPracticeDescription, /Schaumburg, IL/);
  assert.match(serbianPracticeDescription, /mentalno zdravlje žena/);
  assert.match(serbianPracticeDescription, /reproduktivni stres/);
  assert.match(serbianPracticeDescription, /Schaumburgu, IL/);
  assert.match(englishLayout, /getBaseStructuredData\(\)/);
  assert.match(serbianLayout, /getBaseStructuredData\(\)/);
  assert.doesNotMatch(englishLayout, /getBaseStructuredData\(description\)/);
  assert.doesNotMatch(serbianLayout, /getBaseStructuredData\(description\)/);
});

test('homepage identifies the preferred site name and legal-name alternate', () => {
  const englishWebsite = getEnglishWebSiteStructuredData();
  const serbianWebsite = getSerbianWebSiteStructuredData();

  assert.equal(englishWebsite['@type'], 'WebSite');
  assert.equal(englishWebsite.name, 'Center for PTA');
  assert.deepEqual(englishWebsite.alternateName, [
    'Center for Psychological Treatment and Assessment',
    'centerforpta.com'
  ]);
  assert.deepEqual(serbianWebsite, englishWebsite);
  assert.match(englishLayout, /isSiteHomepage \? getWebSiteStructuredData\(\) : null/);
  assert.match(serbianLayout, /isSiteHomepage \? getWebSiteStructuredData\(\) : null/);
  assert.match(englishHome, /Psychologist in Schaumburg, IL \| Center for PTA/);
  assert.match(serbianHome, /Psiholog u Schaumburgu, IL \| Center for PTA/);
  assert.match(englishHome, /description=\{practiceDescription\}/);
  assert.match(serbianHome, /description=\{practiceDescription\}/);
});

test('practice offer catalogs cover every dedicated core service', () => {
  const englishOffers = getEnglishBaseStructuredData().hasOfferCatalog.itemListElement;
  const serbianOffers = getSerbianBaseStructuredData().hasOfferCatalog.itemListElement;

  assert.equal(englishOffers.length, 14);
  assert.equal(serbianOffers.length, 14);
  assert.ok(englishOffers.some((offer) => offer.itemOffered.url.endsWith('/divorce-counseling/')));
  assert.ok(englishOffers.some((offer) => offer.itemOffered.url.endsWith('/consultation-supervision-and-coaching/')));
  assert.ok(serbianOffers.some((offer) => offer.itemOffered.url.endsWith('/sr/divorce-counseling/')));
  assert.ok(serbianOffers.some((offer) => offer.itemOffered.url.endsWith('/sr/consultation-supervision-and-coaching/')));
});

test('blog articles expose matching visible and structured breadcrumb trails', () => {
  const englishBreadcrumbs = getEnglishBreadcrumbStructuredData([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/blog/' },
    { name: 'Example', path: '/blog/example/' }
  ]);
  const serbianBreadcrumbs = getSerbianBreadcrumbStructuredData([
    { name: 'Početna', path: '/sr/' },
    { name: 'Uvidi', path: '/sr/blog/' },
    { name: 'Primer', path: '/sr/blog/primer/' }
  ]);

  assert.equal(englishBreadcrumbs['@type'], 'BreadcrumbList');
  assert.deepEqual(
    englishBreadcrumbs.itemListElement.map((item) => [item.position, item.name, item.item]),
    [
      [1, 'Home', 'https://centerforpta.com/'],
      [2, 'Insights', 'https://centerforpta.com/blog/'],
      [3, 'Example', 'https://centerforpta.com/blog/example/']
    ]
  );
  assert.equal(serbianBreadcrumbs['@type'], 'BreadcrumbList');
  assert.equal(serbianBreadcrumbs.itemListElement[0].item, 'https://centerforpta.com/sr/');

  assert.match(englishBlogLayout, /aria-label="Breadcrumb"/);
  assert.match(serbianBlogLayout, /aria-label="Putanja stranice"/);

  for (const layout of [englishBlogLayout, serbianBlogLayout]) {
    assert.match(layout, /aria-current="page"/);
    assert.match(layout, /getBreadcrumbStructuredData/);
    assert.match(layout, /structuredData=\{articleStructuredData\}/);
  }
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
  assert.match(providerPage, /'@type': 'ProfilePage'/);
  assert.match(providerPage, /Individual NPI \(NPI-1\)/);
  assert.match(providerPage, /psychologytoday\.com\/us\/therapists\/jelena-djurovic-schaumburg-il\/1611370/);
  assert.match(serbianProviderPage, /'@type': 'Person'/);
  assert.match(serbianProviderPage, /'@type': 'ProfilePage'/);
  assert.match(serbianProviderPage, /Individualni NPI \(NPI-1\)/);
  assert.match(serbianProviderPage, /Konverzacijski španski/);
  for (const source of [providerPage, serbianProviderPage]) {
    assert.match(source, /knowsAbout:/);
    assert.match(source, /hasCredential:/);
    assert.match(source, /EducationalOccupationalCredential/);
    assert.match(source, /Illinois Department of Financial and Professional Regulation/);
    assert.match(source, /idfprLicenseLookupUrl/);
    assert.match(source, /<FaqSection/);
    assert.match(source, /faqItems=\{faqItems\}/);
    assert.match(source, /<PageAddressCard \/>/);
    assert.match(source, /1320 Tower Rd, Suite 156/);
    assert.match(source, /providerLicenseNumber/);
    assert.match(source, /providerNpiNumber/);
  }
  assert.match(providerPage, /Reproductive stress and infertility/);
  assert.match(providerPage, /Fertility-treatment stress/);
  assert.match(providerPage, /Clinical services are available in English and Serbian/);
  assert.match(providerPage, /physically located in Illinois/);
  assert.match(providerPage, /travel to the Center for PTA office in Schaumburg/);
  assert.match(serbianProviderPage, /Reproduktivni stres i neplodnost/);
  assert.match(serbianProviderPage, /Stres tokom tretmana fertiliteta/);
  assert.match(serbianProviderPage, /Kliničke usluge dostupne su na srpskom i engleskom/);
  assert.match(serbianProviderPage, /fizički nalaze u Ilinoisu/);
  assert.match(serbianProviderPage, /doputuje u ordinaciju Center for PTA u Schaumburgu/);
});

test('structured data only advertises confirmed clinical service languages', () => {
  for (const source of [englishSeo, serbianSeo]) {
    assert.match(source, /const serviceLanguages = \['en', 'sr'\]/);
    assert.match(source, /contactPoint: getPracticeContactPoints\(\)/);
    assert.doesNotMatch(source, /availableLanguage: \[[^\]]*Spanish/);
    assert.doesNotMatch(source, /availableLanguage: \[[^\]]*španski/);
  }

  for (const source of [contactPage, serbianContactPage]) {
    assert.match(source, /mainEntity: \{[\s\S]*#professional-service/);
    assert.doesNotMatch(source, /contactPoint: getPracticeContactPoints\(\)/);
  }

  for (const source of [providerPage, serbianProviderPage]) {
    assert.match(source, /(?:availableLanguage|knowsLanguage): \['en', 'sr'\]/);
    assert.doesNotMatch(source, /(?:availableLanguage|knowsLanguage): \['English', 'Serbian'\]/);
  }
});

test('service channels use valid local contact and language entities', () => {
  const inputs = {
    name: 'Couples Therapy',
    description: 'Couples therapy in Schaumburg.',
    path: '/couples-therapy/'
  };

  for (const service of [
    getEnglishServiceStructuredData(inputs),
    getSerbianServiceStructuredData({ ...inputs, path: '/sr/couples-therapy/' })
  ]) {
    assert.equal(service['@id'], `${service.url}#service`);
    assert.equal(service.availableLanguage, undefined);
    assert.deepEqual(service.availableChannel.availableLanguage, ['en', 'sr']);
    assert.equal(
      service.availableChannel.serviceLocation['@id'],
      'https://centerforpta.com/#professional-service'
    );
    assert.equal(service.availableChannel.servicePhone['@type'], 'ContactPoint');
    assert.equal(service.availableChannel.servicePhone.telephone, '+1-847-230-0045');
    assert.equal(service.availableChannel.serviceSmsNumber['@type'], 'ContactPoint');
    assert.equal(service.availableChannel.serviceSmsNumber.telephone, '+1-847-929-7040');
  }
});

test('pre-surgical pages connect evaluations with relevant ongoing counseling', () => {
  assert.match(englishPreSurgicalPage, /href: '\/bariatric-surgery-counseling\/'/);
  assert.match(englishPreSurgicalPage, /href: '\/weight-loss-counseling\/'/);
  assert.match(serbianPreSurgicalPage, /href: '\/sr\/bariatric-surgery-counseling\/'/);
  assert.match(serbianPreSurgicalPage, /href: '\/sr\/weight-loss-counseling\/'/);
});

test('prenatal pages follow the approved reproductive stress scope', () => {
  assert.doesNotMatch(prenatalPage, /unplanned pregnancy|pregnancy options counseling/i);
  assert.doesNotMatch(serbianPrenatalPage, /neplanirane trudnoće/i);
  assert.match(prenatalPage, /fertility-treatment stress/);
  assert.match(prenatalPage, /reproductive loss/);
  assert.match(serbianPrenatalPage, /stres tokom tretmana plodnosti/);
  assert.match(prenatalPage, /ongoing pregnancy/);
  assert.match(serbianPrenatalPage, /postojeće trudnoće/);
  assert.match(prenatalPage, /does not replace prenatal medical care/);
  assert.match(serbianPrenatalPage, /ne zamenjuje prenatalnu medicinsku negu/);
});
