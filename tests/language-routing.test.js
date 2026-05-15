import test from 'node:test';
import assert from 'node:assert/strict';
import languageRouting from '../netlify/edge-functions/language-routing.js';

function createContext() {
  return {
    next: () => new Response('next', { status: 200 })
  };
}

async function route(path, headers = {}) {
  return languageRouting(
    new Request(`https://centerforpta.com${path}`, {
      headers: {
        accept: 'text/html',
        ...headers
      }
    }),
    createContext()
  );
}

test('keeps English as default for non-Balkan browser languages', async () => {
  const response = await route('/', {
    'accept-language': 'en-US,en;q=0.9'
  });

  assert.equal(response.status, 200);
});

test('redirects Balkan browser languages to matching Serbian routes', async () => {
  const home = await route('/', {
    'accept-language': 'sr-RS,sr;q=0.9,en;q=0.8'
  });
  const service = await route('/immigration-evaluations/', {
    'accept-language': 'hr-HR,hr;q=0.9,en;q=0.8'
  });

  assert.equal(home.status, 302);
  assert.equal(home.headers.get('location'), 'https://centerforpta.com/sr/');
  assert.equal(service.status, 302);
  assert.equal(service.headers.get('location'), 'https://centerforpta.com/sr/immigration-evaluations/');
});

test('language switch query stores explicit preference and cleans the URL', async () => {
  const toSerbian = await route('/about?lang=sr');
  const toEnglish = await route('/sr/about?lang=en');

  assert.equal(toSerbian.status, 302);
  assert.equal(toSerbian.headers.get('location'), 'https://centerforpta.com/sr/about');
  assert.match(toSerbian.headers.get('set-cookie') || '', /preferred_locale=sr/);
  assert.equal(toEnglish.status, 302);
  assert.equal(toEnglish.headers.get('location'), 'https://centerforpta.com/about');
  assert.match(toEnglish.headers.get('set-cookie') || '', /preferred_locale=en/);
});

test('explicit English preference overrides Balkan browser language', async () => {
  const response = await route('/therapy', {
    'accept-language': 'bs-BA,bs;q=0.9,en;q=0.8',
    cookie: 'preferred_locale=en'
  });

  assert.equal(response.status, 200);
});

test('keeps English when English is the primary browser language and Serbian is secondary', async () => {
  const response = await route('/therapy', {
    'accept-language': 'en-US,en;q=0.9,sr;q=0.4'
  });

  assert.equal(response.status, 200);
});

test('skips non-public or already Serbian paths', async () => {
  const srPage = await route('/sr/therapy', {
    'accept-language': 'mk-MK,mk;q=0.9,en;q=0.8'
  });
  const asset = await route('/_astro/app.js', {
    'accept-language': 'sr-RS,sr;q=0.9,en;q=0.8'
  });

  assert.equal(srPage.status, 200);
  assert.equal(asset.status, 200);
});
