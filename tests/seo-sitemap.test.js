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
});
