import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  createHomepageMarkdown,
  practiceProfile,
  serviceDirectory
} from '../src/utils/agent-ready-data.js';
import {
  createHomepageMarkdown as createSerbianHomepageMarkdown,
  practiceProfile as serbianPracticeProfile,
  serviceDirectory as serbianServiceDirectory
} from '../src/utils-sr/agent-ready-data.js';

const englishTopics = readFileSync('src/components/SpecialtyTopics.astro', 'utf8');
const serbianTopics = readFileSync('src/components-sr/SpecialtyTopics.astro', 'utf8');
const englishSeo = readFileSync('src/utils/seo.ts', 'utf8');
const serbianSeo = readFileSync('src/utils-sr/seo.ts', 'utf8');

function sectionBetween(markdown, startHeading, endHeading) {
  return markdown.split(startHeading)[1]?.split(endHeading)[0] ?? '';
}

test('women health messaging keeps substance use separate from reproductive care', () => {
  const englishWomen = serviceDirectory.find((service) => service.slug === 'womens-mental-health-therapy');
  const serbianWomen = serbianServiceDirectory.find((service) => service.slug === 'womens-mental-health-therapy');

  assert.ok(englishWomen);
  assert.ok(serbianWomen);
  assert.doesNotMatch(englishWomen.description, /substance use/i);
  assert.doesNotMatch(serbianWomen.description, /supstanc/i);
  assert.doesNotMatch(englishTopics, /substance use/i);
  assert.doesNotMatch(serbianTopics, /supstanc/i);
  assert.match(englishWomen.description, /fertility-treatment stress/);
  assert.match(serbianWomen.description, /stresa tokom tretmana fertiliteta/);
});

test('AI practice summaries lead with the approved authority topics', () => {
  assert.match(practiceProfile.description, /women's mental health/);
  assert.match(practiceProfile.description, /self-compassion/);
  assert.match(practiceProfile.description, /reproductive stress/);
  assert.match(serbianPracticeProfile.description, /mentalno zdravlje žena/);
  assert.match(serbianPracticeProfile.description, /samosaosećanje/);
  assert.match(serbianPracticeProfile.description, /reproduktivni stres/);
});

test('AI homepage core-service excerpt prioritizes the intended authority cluster', () => {
  const englishCore = sectionBetween(
    createHomepageMarkdown(),
    '## Core services\n\n',
    '## Schaumburg office and location questions'
  );
  const serbianCore = sectionBetween(
    createSerbianHomepageMarkdown(),
    '## Glavne usluge\n\n',
    '## Ordinacija u Schaumburgu i pitanja o lokaciji'
  );

  for (const expected of ["Women's Mental Health", 'Self-Compassion Therapy', 'Couples Therapy']) {
    assert.match(englishCore, new RegExp(expected));
  }
  for (const expected of ['Mentalno zdravlje žena', 'Terapija samosaosećanja', 'Partnerska terapija']) {
    assert.match(serbianCore, new RegExp(expected));
  }
  assert.doesNotMatch(englishCore, /Psychological Assessment/);
  assert.doesNotMatch(serbianCore, /Psihološka procena/);
});

test('LocalBusiness schema vocabulary includes the central and commercial service topics', () => {
  for (const source of [englishSeo, serbianSeo]) {
    assert.match(source, /Self-Compassion Therapy/);
    assert.match(source, /Weight Loss Counseling/);
  }
  assert.match(englishSeo, /Reproductive stress and infertility counseling/);
  assert.match(serbianSeo, /Savetovanje kod reproduktivnog stresa i neplodnosti/);
});
