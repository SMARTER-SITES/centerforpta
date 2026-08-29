import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  faxPhone as englishFaxPhone,
  getBaseStructuredData as getEnglishPractice,
  getPracticeContactPoints as getEnglishContactPoints
} from '../src/utils/seo.ts';
import {
  faxPhone as serbianFaxPhone,
  getBaseStructuredData as getSerbianPractice,
  getPracticeContactPoints as getSerbianContactPoints
} from '../src/utils-sr/seo.ts';
import {
  createLlmsTxt,
  practiceProfile as englishAiPractice
} from '../src/utils/agent-ready-data.js';
import { practiceProfile as serbianAiPractice } from '../src/utils-sr/agent-ready-data.js';

const practiceId = 'https://centerforpta.com/#professional-service';
const providerId = 'https://centerforpta.com/dr-jelena-djurovic/#person';
const mapUrl = 'https://www.google.com/maps?cid=12782923666205133006';
const organizationNpiUrl =
  'https://npiregistry.cms.hhs.gov/provider-view/1306636089';

test('bilingual practice entities keep the same canonical local identity', () => {
  for (const practice of [getEnglishPractice(), getSerbianPractice()]) {
    assert.equal(practice['@id'], practiceId);
    assert.deepEqual(practice['@type'], ['MedicalBusiness', 'ProfessionalService']);
    assert.equal(practice.name, 'Center for PTA');
    assert.equal(practice.legalName, 'Center for Psychological Treatment and Assessment');
    assert.equal(practice.identifier.propertyID, 'National Provider Identifier (NPI-2)');
    assert.equal(practice.identifier.value, '1306636089');
    assert.equal(practice.telephone, '+1-847-230-0045');
    assert.equal(practice.faxNumber, '+1-847-874-6273');
    assert.equal(practice.email, 'info@centerforpta.com');
    assert.deepEqual(practice.address, {
      '@type': 'PostalAddress',
      streetAddress: '1320 Tower Rd, Suite 156',
      addressLocality: 'Schaumburg',
      addressRegion: 'IL',
      postalCode: '60173',
      addressCountry: 'US'
    });
    assert.deepEqual(practice.geo, {
      '@type': 'GeoCoordinates',
      latitude: 42.057142,
      longitude: -88.0468025
    });
    assert.deepEqual(practice.openingHoursSpecification.dayOfWeek, [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday'
    ]);
    assert.equal(practice.openingHoursSpecification.opens, '09:00');
    assert.equal(practice.openingHoursSpecification.closes, '20:00');
    assert.deepEqual(practice.amenityFeature, [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Wheelchair-accessible car park',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Restroom',
        value: true
      }
    ]);
    assert.equal(practice.hasMap, mapUrl);
    assert.ok(practice.sameAs.includes(organizationNpiUrl));
    assert.ok(practice.sameAs.includes(mapUrl));
    assert.equal(practice.employee['@id'], providerId);
    assert.deepEqual(
      practice.contactPoint.map((contactPoint) => contactPoint['@id']),
      [
        'https://centerforpta.com/#appointments-contact-point',
        'https://centerforpta.com/#text-contact-point'
      ]
    );
    assert.ok(practice.areaServed.some((area) => area.name === 'Schaumburg'));
    assert.ok(practice.areaServed.some((area) => area.name === 'Illinois'));
  }
});

test('bilingual schemas reuse canonical call, text, email, and fax contact points', () => {
  assert.equal(englishFaxPhone, '+1-847-874-6273');
  assert.equal(serbianFaxPhone, englishFaxPhone);

  const englishPoints = getEnglishContactPoints();
  const serbianPoints = getSerbianContactPoints();
  assert.deepEqual(serbianPoints, englishPoints);
  assert.deepEqual(englishPoints, [
    {
      '@type': 'ContactPoint',
      '@id': 'https://centerforpta.com/#appointments-contact-point',
      contactType: 'appointments and practice inquiries',
      telephone: '+1-847-230-0045',
      faxNumber: '+1-847-874-6273',
      email: 'info@centerforpta.com',
      url: 'https://centerforpta.com/contact/',
      availableLanguage: ['en', 'sr']
    },
    {
      '@type': 'ContactPoint',
      '@id': 'https://centerforpta.com/#text-contact-point',
      contactType: 'text messaging',
      telephone: '+1-847-929-7040',
      url: 'https://centerforpta.com/contact/',
      availableLanguage: ['en', 'sr']
    }
  ]);

  for (const path of ['src/pages/contact.astro', 'src/pages/sr/contact.astro']) {
    const source = readFileSync(path, 'utf8');
    assert.match(source, /mainEntity: \{[\s\S]*#professional-service/);
    assert.match(source, /publisher: \{[\s\S]*#professional-service/);
    assert.doesNotMatch(source, /contactPoint: getPracticeContactPoints\(\)/);
    assert.match(source, /Fax: \(847\) 874-6273/);
  }
});

test('provider profiles link the doctor to the canonical Schaumburg practice entity', () => {
  for (const path of [
    'src/pages/dr-jelena-djurovic.astro',
    'src/pages/sr/dr-jelena-djurovic.astro'
  ]) {
    const source = readFileSync(path, 'utf8');
    assert.match(source, /worksFor:\s*\{[\s\S]*?'@id': `\$\{siteUrl\}\/\#professional-service`/);
    assert.match(source, /workLocation:\s*\{[\s\S]*?'@id': `\$\{siteUrl\}\/\#professional-service`/);
    assert.match(source, /mainEntity:\s*\{[\s\S]*?'@id': `\$\{providerUrl\}\#person`/);
    assert.match(source, /alumniOf:/);
    assert.match(source, /The Chicago School of Professional Psychology/);
    assert.match(source, /Illinois School of Professional Psychology/);
    assert.match(source, /subjectOf:/);
    assert.match(source, /'@type': 'NewsArticle'/);
    assert.match(source, /'@type': 'VideoObject'/);
    assert.match(source, /datePublished: '2025-07-07'/);
    assert.match(source, /publisher:[\s\S]*?name: 'Serbian Times'/);
    assert.match(source, /publisher:[\s\S]*?name: 'SBN Chicago News'/);
  }
});

test('AI-facing practice data exposes the same independent provider evidence', () => {
  for (const profile of [englishAiPractice, serbianAiPractice]) {
    assert.match(profile.provider.profileUrl, /\/dr-jelena-djurovic\/$/);
    assert.equal(
      profile.provider.psychologyTodayUrl,
      'https://www.psychologytoday.com/us/therapists/jelena-djurovic-schaumburg-il/1611370'
    );
    assert.deepEqual(
      profile.provider.mediaAppearances.map((item) => [item.type, item.publisher, item.url]),
      [
        [
          'NewsArticle',
          'Serbian Times',
          'https://serbiantimes.info/srpkinja-psiholog-u-cikagu-od-cega-najvise-pate-nasi-ljudi-u-americi-i-kako-im-psiholog-moze-pomoci-da-dobiju-papire-video/'
        ],
        [
          'VideoObject',
          'SBN Chicago News',
          'https://www.youtube.com/watch?v=4xS8Sm2lOh4'
        ]
      ]
    );
    assert.equal(profile.contact.fax, '+1-847-874-6273');
  }

  const llmsTxt = createLlmsTxt();
  assert.match(llmsTxt, /Psychology Today provider profile/);
  assert.match(llmsTxt, /Serbian Times interview/);
  assert.match(llmsTxt, /SBN Chicago News interview/);
});

test('generated-site audit protects visible NAP and the full local entity graph', () => {
  const audit = readFileSync('scripts/audit-generated-site.mjs', 'utf8');

  assert.match(audit, /localEntityConsistency: \[\]/);
  assert.match(audit, /visible NAP/);
  assert.match(audit, /accessibleParking/);
  assert.match(audit, /appointmentsRecommended/);
  assert.match(audit, /Person workLocation/);
  assert.match(audit, /Person Serbian Times subjectOf/);
  assert.match(audit, /Person SBN Chicago subjectOf/);
  assert.match(audit, /appointmentsContactPoint/);
  assert.match(audit, /textContactPoint/);
  assert.match(audit, /visible fax/);
  assert.match(audit, /National Provider Identifier \(NPI-2\)/);
  assert.match(audit, /googleBusinessProfile/);
  assert.match(audit, /openingHoursSpecification/);
  assert.match(audit, /amenityFeature/);
  assert.match(audit, /Wheelchair-accessible car park/);
  assert.match(audit, /LocationFeatureSpecification/);
  assert.match(audit, /practiceAreaServed/);
});
