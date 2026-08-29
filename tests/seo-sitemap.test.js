import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildSitemapXml,
  createSitemapEntries,
  getAlternatePath
} from '../src/utils/sitemap-data.js';

test('sitemap entries keep English and Serbian alternate paths paired', () => {
  assert.equal(getAlternatePath('/'), '/sr/');
  assert.equal(getAlternatePath('/sr/'), '/');
  assert.equal(getAlternatePath('/immigration-evaluations/'), '/sr/immigration-evaluations/');
  assert.equal(getAlternatePath('/sr/immigration-evaluations/'), '/immigration-evaluations/');
});

test('sitemap XML exposes hreflang alternates for multilingual discovery', () => {
  const xml = buildSitemapXml(createSitemapEntries());

  assert.match(xml, /xmlns:xhtml="http:\/\/www\.w3\.org\/1999\/xhtml"/);
  assert.match(xml, /<loc>https:\/\/centerforpta\.com\/immigration-evaluations\/<\/loc>/);
  assert.match(xml, /<loc>https:\/\/centerforpta\.com\/dr-jelena-djurovic\/<\/loc>/);
  assert.match(xml, /<loc>https:\/\/centerforpta\.com\/couples-therapy\/<\/loc>/);
  assert.match(xml, /<loc>https:\/\/centerforpta\.com\/schaumburg-office\/<\/loc>/);
  assert.match(xml, /<loc>https:\/\/centerforpta\.com\/sr\/schaumburg-office\/<\/loc>/);
  assert.match(xml, /<loc>https:\/\/centerforpta\.com\/sr\/couples-therapy\/<\/loc>/);
  assert.match(xml, /href="https:\/\/centerforpta\.com\/sr\/dr-jelena-djurovic\/"/);
  assert.doesNotMatch(xml, /<loc>https:\/\/centerforpta\.com\/about\/<\/loc>/);
  assert.doesNotMatch(xml, /<loc>https:\/\/centerforpta\.com\/sr\/about\/<\/loc>/);
  assert.match(
    xml,
    /<xhtml:link rel="alternate" hreflang="sr" href="https:\/\/centerforpta\.com\/sr\/couples-therapy\/" \/>/
  );
  assert.match(
    xml,
    /<xhtml:link rel="alternate" hreflang="sr" href="https:\/\/centerforpta\.com\/sr\/schaumburg-office\/" \/>/
  );
  assert.match(
    xml,
    /<xhtml:link rel="alternate" hreflang="sr" href="https:\/\/centerforpta\.com\/sr\/immigration-evaluations\/" \/>/
  );
  assert.match(
    xml,
    /<xhtml:link rel="alternate" hreflang="en" href="https:\/\/centerforpta\.com\/immigration-evaluations\/" \/>/
  );
  assert.match(
    xml,
    /<xhtml:link rel="alternate" hreflang="x-default" href="https:\/\/centerforpta\.com\/immigration-evaluations\/" \/>/
  );
  assert.doesNotMatch(xml, /<lastmod>2026-06-09T00:00:00.000Z<\/lastmod>/);
  assert.doesNotMatch(xml, /<lastmod>/);
});

test('sitemap entries can omit hreflang alternates for untranslated blog posts', () => {
  const xml = buildSitemapXml(
    createSitemapEntries([
      {
        path: '/blog/what-to-expect-during-an-immigration-psychological-evaluation/',
        lastmod: '2026-06-16T09:00:00.000Z',
        alternates: false
      }
    ])
  );

  assert.match(
    xml,
    /<loc>https:\/\/centerforpta\.com\/blog\/what-to-expect-during-an-immigration-psychological-evaluation\/<\/loc>/
  );
  assert.doesNotMatch(
    xml,
    /href="https:\/\/centerforpta\.com\/sr\/blog\/what-to-expect-during-an-immigration-psychological-evaluation\/"/
  );
});

test('sitemap supports translated blog slugs without inventing same-slug routes', () => {
  const xml = buildSitemapXml(
    createSitemapEntries([
      {
        path: '/blog/english-example-slug/',
        alternatePath: '/sr/blog/srpski-primer-slug/'
      }
    ])
  );

  assert.match(xml, /<loc>https:\/\/centerforpta\.com\/blog\/english-example-slug\/<\/loc>/);
  assert.match(xml, /<loc>https:\/\/centerforpta\.com\/sr\/blog\/srpski-primer-slug\/<\/loc>/);
  assert.match(
    xml,
    /hreflang="sr" href="https:\/\/centerforpta\.com\/sr\/blog\/srpski-primer-slug\/"/
  );
  assert.doesNotMatch(xml, /sr\/blog\/english-example-slug/);
});
