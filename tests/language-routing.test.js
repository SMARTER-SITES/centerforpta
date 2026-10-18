import test from 'node:test';
import assert from 'node:assert/strict';
import languageRouting from '../netlify/edge-functions/language-routing.js';

const pairs = [
  ['fertility-treatment-burnout', 'iscrpljenost-tokom-lecenja-neplodnosti'],
  ['postpartum-depression-and-anxiety', 'postpartalna-depresija-i-anksioznost'],
  ['fertility-stress-and-relationships', 'stres-zbog-neplodnosti-i-partnerski-odnos'],
  ['pregnancy-after-infertility-or-loss', 'trudnoca-posle-infertiliteta-ili-gubitka-trudnoce']
];
const route = (path, headers = {}) => languageRouting(
  new Request(`https://centerforpta.com${path}`, {headers: {accept: 'text/html', ...headers}}),
  {next: () => new Response('requested page', {status: 200})}
);

test('explicit article URLs survive all browser-language and stored-preference combinations', async () => {
  for (const [en, sr] of pairs) {
    for (const path of [`/blog/${en}/`, `/sr/blog/${sr}/`]) {
      for (const language of ['sr-RS', 'en-US', 'hr-HR', '']) {
        for (const cookie of ['', 'preferred_locale=sr', 'preferred_locale=en', 'preferred_locale=%invalid']) {
          const response = await route(path, {'accept-language': language, cookie});
          assert.equal(response.status, 200, `${path}: ${language}, ${cookie}`);
          assert.equal(response.headers.get('location'), null);
        }
      }
    }
  }
});

test('manual switches retain translated slugs, tracking parameters and a non-cacheable preference', async () => {
  for (const [en, sr] of pairs) {
    for (const [path, locale] of [[`/blog/${en}/`, 'en'], [`/sr/blog/${sr}/`, 'sr']]) {
      const response = await route(`${path}?lang=${locale}&utm_source=google`);
      assert.equal(response.status, 302);
      assert.equal(response.headers.get('location'), `https://centerforpta.com${path}?utm_source=google`);
      assert.match(response.headers.get('set-cookie'), new RegExp(`preferred_locale=${locale};`));
      assert.match(response.headers.get('cache-control'), /no-store/);
    }
  }
});

test('home, services and invalid language values do not redirect implicitly', async () => {
  for (const path of ['/', '/sr/', '/therapy/', '/sr/therapy/', '/blog/?lang=xx']) {
    assert.equal((await route(path, {'accept-language': 'sr-RS', cookie: 'preferred_locale=sr'})).status, 200);
  }
});

test('non-HTML and protected paths pass through even with a language parameter', async () => {
  for (const path of ['/_astro/a.js?lang=sr', '/api/contact?lang=sr', '/admin/?lang=en', '/images/a.jpg?lang=en']) {
    assert.equal((await route(path)).status, 200);
  }
  assert.equal((await route('/sitemap.xml?lang=sr', {accept: 'application/xml'})).status, 200);
});
