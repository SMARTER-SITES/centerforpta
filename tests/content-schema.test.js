import test from 'node:test';
import assert from 'node:assert/strict';
import { getContributor, getReviewMetadata, getTranslationMetadata, clinicianId } from '../src/utils/content-schema.js';
import { getWebPageStructuredData, getBaseStructuredData, getServiceStructuredData } from '../src/utils/seo.ts';
import { getWebPageStructuredData as getSerbianPage, getBaseStructuredData as getSerbianPractice } from '../src/utils-sr/seo.ts';

test('explicit contributor identity survives Serbian accents and honorifics', () => {
  const en = getContributor('jelena-djurovic', 'Dr. Jelena Djurovic, Psy.D.');
  const sr = getContributor('jelena-djurovic', 'dr Jelena Đurović, Psy.D.');
  assert.deepEqual(sr, en);
  assert.equal(sr['@id'], clinicianId);
  assert.equal(sr.name, 'Jelena Djurovic');
  assert.equal(sr.honorificSuffix, 'Psy.D.');
  assert.equal(getContributor(undefined, 'Another author')['@id'], undefined);
  assert.throws(() => getContributor('unknown-person', 'Jelena'), /Unknown contributor/);
});

test('practice authorship remains distinct from the clinical reviewer', () => {
  const author = getContributor('center-for-pta', 'Center for PTA');
  const review = getReviewMetadata('jelena-djurovic', 'Dr. Jelena Djurovic');
  assert.equal(author['@type'], 'Organization');
  assert.equal(review.reviewedBy['@type'], 'Person');
  assert.notEqual(author['@id'], review.reviewedBy['@id']);
  assert.equal(review.lastReviewed, undefined);
  assert.deepEqual(getReviewMetadata(undefined, undefined), {});
});

test('review metadata rejects invented precision, impossible dates and missing reviewers', () => {
  for (const date of ['October 2026', '2026-10', '2026-02-30', '2026-13-01']) {
    assert.throws(() => getReviewMetadata('jelena-djurovic', 'Jelena', date), /verified calendar date/);
  }
  assert.throws(() => getReviewMetadata(undefined, undefined, '2026-10-08'), /identified reviewer/);
  assert.equal(getReviewMetadata('jelena-djurovic', 'Jelena', '2026-10-08').lastReviewed, '2026-10-08');
});

test('medical page metadata links the article and uses the same reviewer and visible image dimensions', () => {
  for (const builder of [getWebPageStructuredData, getSerbianPage]) {
    const page = builder({ name: 'Postpartum', description: 'Support after birth',
      url: 'https://centerforpta.com/blog/postpartum-depression-and-anxiety/', language: 'en-US',
      medicalContent: true, mainEntityId: 'https://centerforpta.com/blog/postpartum-depression-and-anxiety/#article',
      image: 'https://centerforpta.com/images/postpartum-therapy.jpg', imageWidth: 1376, imageHeight: 768,
      ...getReviewMetadata('jelena-djurovic', 'Jelena', '2026-10-08') });
    assert.equal(page['@type'], 'MedicalWebPage');
    assert.ok(page.mainEntity['@id'].endsWith('#article'));
    assert.equal(page.reviewedBy['@id'], clinicianId);
    assert.equal(page.lastReviewed, '2026-10-08');
    assert.equal(page.primaryImageOfPage.width, 1376);
    assert.equal(page.primaryImageOfPage.height, 768);
  }
  assert.equal(getWebPageStructuredData({ name: 'Contact', url: 'https://centerforpta.com/contact/', language: 'en-US' })['@type'], 'WebPage');
});

test('translation metadata uses verified counterpart routes and omits absent translations', () => {
  assert.deepEqual(getTranslationMetadata('en', false), {});
  assert.deepEqual(getTranslationMetadata('sr', undefined), {});
  assert.equal(getTranslationMetadata('sr', '/blog/postpartum-depression-and-anxiety/').translationOfWork['@id'],
    'https://centerforpta.com/blog/postpartum-depression-and-anxiety/#article');
  assert.equal(getTranslationMetadata('en', '/sr/blog/postpartalna-depresija-i-anksioznost/').workTranslation['@id'],
    'https://centerforpta.com/sr/blog/postpartalna-depresija-i-anksioznost/#article');
  assert.throws(() => getTranslationMetadata('en', '//other-site.example/'), /verified local counterpart/);
});

test('catalog and appointment offers reference the existing service identity', () => {
  for (const practice of [getBaseStructuredData(), getSerbianPractice()]) {
    assert.equal(practice.medicalSpecialty, undefined);
    for (const offer of practice.hasOfferCatalog.itemListElement) {
      assert.equal(offer.itemOffered['@id'], `${offer.url}#service`);
      assert.ok(offer.name);
    }
  }
  const service = getServiceStructuredData({ name: 'Postpartum therapy', description: 'Care', path: '/postpartum-therapy/' });
  assert.equal(service.offers.itemOffered['@id'], service['@id']);
});
