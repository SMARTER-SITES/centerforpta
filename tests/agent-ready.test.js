import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import {
  agentSkills,
  buildRobotsTxt,
  contentSignal,
  createApiDocsMarkdown,
  createHomepageMarkdown,
  createLlmsTxt,
  createOpenApiSpec,
  createPracticePayload,
  estimateMarkdownTokens,
  matchServices,
  aiCrawlerUserAgents,
  aiMixedPurposeCrawlerUserAgents,
  aiSearchCrawlerUserAgents,
  aiTrainingCrawlerUserAgents,
  serviceDirectory,
  webMcpToolSpecs
} from '../src/utils/agent-ready-data.js';
import {
  agentSkills as serbianAgentSkills,
  buildRobotsTxt as buildSerbianRobotsTxt,
  createHomepageMarkdown as createSerbianHomepageMarkdown,
  createPracticePayload as createSerbianPracticePayload,
  matchServices as matchSerbianServices,
  serviceDirectory as serbianServiceDirectory
} from '../src/utils-sr/agent-ready-data.js';
import {
  createAgentSkillsIndex,
  createApiCatalog,
  sha256Hex
} from '../src/utils/agent-ready-discovery.js';

test('robots.txt includes sitemap, content signal, and AI crawler groups', () => {
  const robotsTxt = buildRobotsTxt();

  assert.match(robotsTxt, /Sitemap: https:\/\/centerforpta\.com\/sitemap\.xml/);
  assert.match(robotsTxt, new RegExp(`Content-Signal: ${contentSignal}`));
  assert.match(robotsTxt, /User-agent: GPTBot/);
  assert.match(robotsTxt, /User-agent: ClaudeBot/);
});

test('robots.txt explicitly allows current AI search and user fetchers', () => {
  const robotsTxt = buildRobotsTxt();

  assert.equal(new Set(aiCrawlerUserAgents).size, aiCrawlerUserAgents.length);

  for (const userAgent of aiSearchCrawlerUserAgents) {
    assert.ok(aiCrawlerUserAgents.includes(userAgent));
    assert.match(
      robotsTxt,
      new RegExp(
        `User-agent: ${userAgent}\\nContent-Signal: ${contentSignal}\\nAllow: /\\nDisallow: /admin/`
      )
    );
  }
});

test('robots.txt blocks confirmed training and bulk model-data crawlers', () => {
  const robotsTxt = buildRobotsTxt();

  assert.deepEqual(aiTrainingCrawlerUserAgents, [
    'GPTBot',
    'ClaudeBot',
    'CCBot',
    'Applebot-Extended'
  ]);

  for (const userAgent of aiTrainingCrawlerUserAgents) {
    assert.match(
      robotsTxt,
      new RegExp(
        `User-agent: ${userAgent}\\nContent-Signal: ${contentSignal}\\nDisallow: /(?:\\n|$)`
      )
    );
  }
});

test('robots.txt keeps mixed-purpose discovery tokens available with use restrictions', () => {
  const robotsTxt = buildRobotsTxt();

  assert.ok(aiMixedPurposeCrawlerUserAgents.includes('Google-Extended'));

  for (const userAgent of aiMixedPurposeCrawlerUserAgents) {
    assert.match(
      robotsTxt,
      new RegExp(
        `User-agent: ${userAgent}\\nContent-Signal: ${contentSignal}\\nAllow: /\\nDisallow: /admin/`
      )
    );
  }
});

test('English and Serbian robot policy generators stay identical', () => {
  assert.equal(buildSerbianRobotsTxt(), buildRobotsTxt());
});

test('homepage markdown includes contact details and token estimate', () => {
  const markdown = createHomepageMarkdown();

  assert.match(markdown, /# Center for PTA/);
  assert.match(markdown, /Public brand: Center for PTA/);
  assert.match(markdown, /info@centerforpta\.com/);
  assert.match(markdown, /Center for Psychological Treatment and Assessment/);
  assert.match(markdown, /Organization NPI \(NPI-2\): \[1306636089\]/);
  assert.match(markdown, /Provider NPI \(NPI-1\): \[1770377095\]/);
  assert.match(markdown, /Google Maps: \[Center for PTA in Schaumburg\]/);
  assert.match(markdown, /Office hours: Monday-Friday, 9:00 AM-8:00 PM/);
  assert.match(markdown, /Current availability: Contact Center for PTA to confirm/);
  assert.doesNotMatch(markdown, /Accepting new clients:/);
  assert.match(markdown, /Listed insurance plans: BCBS PPO, Aetna, UnitedHealthcare/);
  assert.match(markdown, /Verify current benefits/);
  assert.ok(estimateMarkdownTokens(markdown) > 10);
});

test('llms.txt is a concise, grounded discovery map of verified live content', () => {
  const llmsTxt = createLlmsTxt();

  assert.match(llmsTxt, /^# Center for PTA\n\n> /);
  assert.match(llmsTxt, /Center for Psychological Treatment and Assessment/);
  assert.match(llmsTxt, /Organization NPI \(NPI-2\): 1306636089/);
  assert.match(llmsTxt, /Provider NPI \(NPI-1\): 1770377095/);
  assert.match(llmsTxt, /1320 Tower Rd, Suite 156, Schaumburg, IL 60173/);
  assert.match(llmsTxt, /all participating clients are physically located in Illinois/);
  assert.match(llmsTxt, /outside Illinois may travel to the Schaumburg office/);
  assert.match(llmsTxt, /confirm current availability for the requested service/);
  assert.doesNotMatch(llmsTxt, /currently accepting new clients/i);
  assert.match(llmsTxt, /Listed insurance plans are BCBS PPO, Aetna, UnitedHealthcare/);
  assert.match(llmsTxt, /Verify current benefits/);
  assert.match(llmsTxt, /\/rates-and-insurance\//);
  assert.match(llmsTxt, /\/sr\/rates-and-insurance\//);
  assert.match(llmsTxt, /https:\/\/www\.google\.com\/maps\?cid=12782923666205133006/);
  assert.match(llmsTxt, /## Core services/);
  assert.match(llmsTxt, /## Serbian/);
  assert.match(llmsTxt, /\/api\/practice\.json/);
  assert.doesNotMatch(llmsTxt, /unplanned pregnancy/i);
  assert.doesNotMatch(llmsTxt, /fertility-stress-and-relationships/);
  assert.doesNotMatch(llmsTxt, /pregnancy-after-infertility-or-loss/);
  assert.doesNotMatch(llmsTxt, /stres-zbog-neplodnosti-i-partnerski-odnos/);
  assert.doesNotMatch(llmsTxt, /trudnoca-posle-infertiliteta-ili-gubitka-trudnoce/);
});

test('English and Serbian pages expose llms.txt discovery independently of CDN headers', () => {
  const englishLayout = readFileSync('src/layouts/Layout.astro', 'utf8');
  const serbianLayout = readFileSync('src/layouts-sr/Layout.astro', 'utf8');
  const staticHeaders = readFileSync('public/_headers', 'utf8');
  const endpoint = readFileSync('src/pages/llms.txt.ts', 'utf8');

  for (const layout of [englishLayout, serbianLayout]) {
    assert.match(layout, /<link rel="describedby" href="\/llms\.txt" type="text\/markdown" \/>/);
  }

  assert.match(staticHeaders, /\/llms\.txt\n  Content-Type: text\/markdown; charset=utf-8/);
  assert.match(staticHeaders, /Content-Signal: ai-train=no, search=yes, ai-input=yes, use=reference/);
  assert.match(endpoint, /'Content-Type': 'text\/markdown; charset=utf-8'/);
  assert.match(endpoint, /'Content-Signal': contentSignal/);
});

test('practice API ties the public brand to the verified organization entity', () => {
  const payload = createPracticePayload();

  assert.equal(payload.name, 'Center for PTA');
  assert.deepEqual(payload.organization, {
    publicName: 'Center for PTA',
    legalName: 'Center for Psychological Treatment and Assessment',
    npi: '1306636089',
    npiType: 'NPI-2',
    registryUrl: 'https://npiregistry.cms.hhs.gov/provider-view/1306636089'
  });
  assert.equal(payload.provider.npi, '1770377095');
  assert.equal(payload.provider.npiType, 'NPI-1');
  assert.equal(payload.location.mapUrl, 'https://www.google.com/maps?cid=12782923666205133006');
  assert.equal(payload.location.pageUrl, 'https://centerforpta.com/schaumburg-office/');
  assert.equal(payload.location.serbianPageUrl, 'https://centerforpta.com/sr/schaumburg-office/');
  assert.deepEqual(payload.location.geo, {
    latitude: 42.057142,
    longitude: -88.0468025
  });
  assert.equal(payload.location.timeZone, 'America/Chicago');
  assert.equal(payload.api.llms, 'https://centerforpta.com/llms.txt');
  assert.deepEqual(payload.location.openingHours, [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '20:00'
    }
  ]);
  assert.deepEqual(payload.location.closedDays, ['Saturday', 'Sunday']);
  assert.deepEqual(payload.availability, {
    status: 'contact_required',
    note: 'Contact Center for PTA to confirm current availability for the requested service.'
  });
  assert.equal('acceptingNewClients' in payload, false);
  assert.deepEqual(payload.insurance.listedPlans, [
    'BCBS PPO',
    'Aetna',
    'UnitedHealthcare'
  ]);
  assert.equal(payload.insurance.verificationRequired, true);
  assert.match(payload.insurance.note, /Verify current benefits/);

  const serbianPayload = createSerbianPracticePayload();
  assert.deepEqual(serbianPayload.provider.npi, payload.provider.npi);
  assert.deepEqual(serbianPayload.location, payload.location);
  assert.equal(serbianPayload.availability.status, 'contact_required');
  assert.match(serbianPayload.availability.note, /potvrdite trenutnu dostupnost/);
  assert.equal('acceptingNewClients' in serbianPayload, false);
  assert.deepEqual(serbianPayload.insurance.listedPlans, payload.insurance.listedPlans);
  assert.equal(serbianPayload.insurance.verificationRequired, true);
  assert.equal(serbianPayload.api.llms, payload.api.llms);
  assert.match(createSerbianHomepageMarkdown(), /url: https:\/\/centerforpta\.com\/sr\//);
  assert.match(createSerbianHomepageMarkdown(), /Trenutna dostupnost: Kontaktirajte Center for PTA/);
  assert.doesNotMatch(createSerbianHomepageMarkdown(), /Prima nove klijente:/);
});

test('agent skills index digests match raw skill bytes', () => {
  const index = createAgentSkillsIndex();

  assert.equal(index.skills.length, agentSkills.length);

  for (const entry of index.skills) {
    const matchingSkill = agentSkills.find((skill) => skill.name === entry.name);
    assert.ok(matchingSkill);
    assert.equal(entry.digest, `sha256:${sha256Hex(matchingSkill.content)}`);
  }
});

test('advertised machine-readable discovery URLs have matching source routes', () => {
  const skillIndex = createAgentSkillsIndex();
  const catalog = createApiCatalog();
  const [entry] = catalog.linkset;

  for (const skill of skillIndex.skills) {
    assert.ok(
      existsSync(`src/pages${skill.url}.ts`),
      `Missing source route for advertised skill URL: ${skill.url}`
    );
  }

  for (const skill of serbianAgentSkills) {
    assert.ok(
      existsSync(`src/pages${skill.path}.ts`),
      `Missing source route for advertised Serbian skill URL: ${skill.path}`
    );
  }

  for (const relation of ['service-desc', 'service-doc', 'status']) {
    for (const link of entry[relation]) {
      const path = new URL(link.href).pathname;
      assert.ok(
        existsSync(`src/pages${path}.ts`),
        `Missing source route for advertised API URL: ${path}`
      );
    }
  }
});

test('api catalog points at the public API documentation and status endpoints', () => {
  const catalog = createApiCatalog();
  const [entry] = catalog.linkset;

  assert.equal(entry.anchor, 'https://centerforpta.com/api/');
  assert.equal(entry['service-desc'][0].href, 'https://centerforpta.com/api/openapi.json');
  assert.equal(entry['service-doc'][0].href, 'https://centerforpta.com/api/docs.md');
  assert.equal(entry.status[0].href, 'https://centerforpta.com/api/status.json');
});

test('openapi spec and docs cover the expected public endpoints', () => {
  const spec = createOpenApiSpec();
  const docs = createApiDocsMarkdown();

  assert.ok(spec.paths['/practice.json']);
  assert.ok(spec.paths['/services.json']);
  assert.ok(spec.paths['/contact.json']);
  assert.ok(spec.paths['/status.json']);
  assert.match(docs, /GET \/api\/practice\.json/);
  assert.match(docs, /GET \/api\/services\.json/);
});

test('service matcher returns therapy for anxiety-related needs', () => {
  const matches = matchServices('I need help with anxiety and life transitions');

  assert.ok(matches.length > 0);
  assert.equal(matches[0].name, 'Therapy');
});

test('service matcher returns couples therapy for relationship counseling needs', () => {
  const matches = matchServices('We need couples therapy for communication and recurring conflict');

  assert.ok(matches.length > 0);
  assert.equal(matches[0].name, 'Couples Therapy');
});

test('English and Serbian service matchers recognize postpartum mental health needs', () => {
  const englishMatches = matchServices(
    'I need postpartum depression counseling and support for postpartum anxiety'
  );
  const serbianMatches = matchSerbianServices(
    'Potrebna mi je postpartalna terapija zbog postpartalne depresije i anksioznosti'
  );

  assert.equal(englishMatches[0].name, 'Postpartum Therapy');
  assert.equal(serbianMatches[0].name, 'Postpartalna terapija');
});

test('Serbian service matcher handles natural language and omitted diacritics', () => {
  const assessment = matchSerbianServices('Potrebna mi je psiholoska procena i testiranje pažnje');
  const immigration = matchSerbianServices('Treba mi imigraciona evaluacija za azil');

  assert.ok(assessment.some((match) => match.name === 'Psihološka procena'));
  assert.ok(immigration.some((match) => match.name === 'Imigracione evaluacije'));
});

test('Serbian service matcher uses whole words instead of accidental substrings', () => {
  const fertility = matchSerbianServices('Tražim podršku zbog neplodnosti');
  const couples = matchSerbianServices('Treba nam partnerska terapija zbog komunikacije i konflikta');

  assert.ok(fertility.some((match) => match.name === 'Mentalno zdravlje žena'));
  assert.ok(!fertility.some((match) => match.name === 'Partnerska terapija'));
  assert.equal(couples[0].name, 'Partnerska terapija');
});

test('AI service directories expose verified family therapy in both languages', () => {
  const englishFamilyTherapy = serviceDirectory.find((service) => service.slug === 'family-therapy');
  const serbianFamilyTherapy = serbianServiceDirectory.find(
    (service) => service.slug === 'family-therapy'
  );
  const matches = matchServices('We need family therapy for family conflict');

  assert.deepEqual(englishFamilyTherapy, {
    slug: 'family-therapy',
    name: 'Family Therapy',
    path: '/therapy/',
    description:
      'Family therapy in Schaumburg for resolving conflicts and improving family dynamics through guided, constructive dialogue.',
    keywords: ['family therapy', 'family counseling', 'family conflict', 'family dynamics']
  });
  assert.equal(serbianFamilyTherapy.name, 'Porodična terapija');
  assert.equal(serbianFamilyTherapy.path, '/sr/therapy/');
  assert.match(serbianFamilyTherapy.description, /Porodična terapija u Schaumburgu/);
  assert.equal(matches[0].name, 'Family Therapy');
});

test('webmcp tools stay aligned with the public read-only API surface', () => {
  assert.equal(webMcpToolSpecs.length, 4);
  assert.deepEqual(
    webMcpToolSpecs.map((tool) => tool.name),
    ['get-practice-overview', 'list-services', 'match-service-needs', 'get-contact-options']
  );
  assert.ok(serviceDirectory.length >= 4);
});
