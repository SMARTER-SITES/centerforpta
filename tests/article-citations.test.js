import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');

const articlePairs = [
  [
    'src/pages/blog/2026-03-01-why-seek-psychotherapy.md',
    'src/pages/sr/blog/2026-03-01-why-seek-psychotherapy.md'
  ],
  [
    'src/pages/blog/2026-03-02-how-do-i-find-the-right-therapist.md',
    'src/pages/sr/blog/2026-03-02-how-do-i-find-the-right-therapist.md'
  ],
  [
    'src/pages/blog/reproductive-stress-and-infertility.md',
    'src/pages/sr/blog/reproductive-stress-and-infertility.md'
  ],
  [
    'src/pages/blog/why-am-i-so-hard-on-myself.md',
    'src/pages/sr/blog/why-am-i-so-hard-on-myself.md'
  ]
];

function citationUrls(source) {
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1] || '';
  const citationBlock = frontmatter.match(/\ncitations:\n([\s\S]*?)(?=\n[a-zA-Z][\w]*:)/)?.[1] || '';
  return [...citationBlock.matchAll(/^\s+url:\s+"([^"]+)"/gm)].map((match) => match[1]);
}

function visibleReferenceUrls(source) {
  const body = source.replace(/^---\n[\s\S]*?\n---\n/, '');
  return new Set([...body.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map((match) => match[1]));
}

test('evidence-backed bilingual articles expose matching visible citation URLs', () => {
  for (const [englishPath, serbianPath] of articlePairs) {
    const english = read(englishPath);
    const serbian = read(serbianPath);
    const englishCitations = citationUrls(english);
    const serbianCitations = citationUrls(serbian);

    assert.ok(englishCitations.length >= 3, `${englishPath} needs at least three citations`);
    assert.deepEqual(serbianCitations, englishCitations, `${serbianPath} must match its English pair`);
    assert.equal(new Set(englishCitations).size, englishCitations.length, `${englishPath} has duplicates`);

    for (const url of englishCitations) {
      assert.ok(visibleReferenceUrls(english).has(url), `${url} is not visible in ${englishPath}`);
      assert.ok(visibleReferenceUrls(serbian).has(url), `${url} is not visible in ${serbianPath}`);
    }
  }
});

test('foundational authored articles expose local clinical identity and visible FAQ content', () => {
  for (const [englishPath, serbianPath] of articlePairs.slice(0, 2)) {
    const english = read(englishPath);
    const serbian = read(serbianPath);

    assert.match(english, /author: "Dr\. Jelena Djurovic"/);
    assert.match(serbian, /author: "Dr\. Jelena Djurovic"/);
    assert.match(english, /updatedDate: 2026-08-29/);
    assert.match(serbian, /updatedDate: 2026-08-29/);
    assert.match(english, /## Frequently asked questions/);
    assert.match(serbian, /## Česta pitanja/);
    assert.match(english, /1320 Tower Rd, Suite 156, Schaumburg, IL 60173/);
    assert.match(serbian, /1320 Tower Rd, Suite 156, Schaumburg, IL 60173/);
    assert.match(english, /license #071-011433/);
    assert.match(serbian, /licenca #071-011433/);
  }
});

test('bilingual article layouts emit stable canonical article entities and CreativeWork citations', () => {
  for (const path of ['src/layouts/Layout.astro', 'src/layouts-sr/Layout.astro']) {
    const layout = read(path);
    assert.match(layout, /'@id': `\$\{canonicalUrl\}#article`/);
    assert.match(layout, /url: canonicalUrl/);
    assert.match(layout, /citation: citations\.map/);
    assert.match(layout, /'@type': 'CreativeWork'/);
    assert.match(layout, /name: citation\.name/);
    assert.match(layout, /url: citation\.url/);
  }

  assert.match(read('src/layouts/Layout.astro'), /inLanguage: 'en-US'/);
  assert.match(read('src/layouts-sr/Layout.astro'), /inLanguage: 'sr-Latn'/);
  assert.match(read('src/layouts/BlogPostLayout.astro'), /citations=\{frontmatter\.citations \|\| \[\]\}/);
  assert.match(read('src/layouts-sr/BlogPostLayout.astro'), /citations=\{frontmatter\.citations \|\| \[\]\}/);
});

test('generated-site audit requires visible, unique, canonical article citations', () => {
  const audit = read('scripts/audit-generated-site.mjs');
  assert.match(audit, /citationRequiredRoutes/);
  assert.match(audit, /articleCitations: \[\]/);
  assert.match(audit, /citation count/);
  assert.match(audit, /citation not visible/);
  assert.match(audit, /duplicate citation URL/);
  assert.match(audit, /article entity mismatch/);
});
