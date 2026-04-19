import test from 'node:test';
import assert from 'node:assert/strict';
import {
  agentSkills,
  buildRobotsTxt,
  contentSignal,
  createApiDocsMarkdown,
  createHomepageMarkdown,
  createOpenApiSpec,
  estimateMarkdownTokens,
  matchServices,
  serviceDirectory,
  webMcpToolSpecs
} from '../src/utils/agent-ready-data.js';
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

test('homepage markdown includes contact details and token estimate', () => {
  const markdown = createHomepageMarkdown();

  assert.match(markdown, /# Center for Psychological Treatment and Assessment/);
  assert.match(markdown, /info@centerforpta\.com/);
  assert.ok(estimateMarkdownTokens(markdown) > 10);
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

test('webmcp tools stay aligned with the public read-only API surface', () => {
  assert.equal(webMcpToolSpecs.length, 4);
  assert.deepEqual(
    webMcpToolSpecs.map((tool) => tool.name),
    ['get-practice-overview', 'list-services', 'match-service-needs', 'get-contact-options']
  );
  assert.ok(serviceDirectory.length >= 4);
});
