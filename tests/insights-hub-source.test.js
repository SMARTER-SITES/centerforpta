import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const nav = readFileSync('src/components/Navbar.astro', 'utf8');
const insightsListing = readFileSync('src/components/InsightsListing.astro', 'utf8');
const srInsightsListing = readFileSync('src/components-sr/InsightsListing.astro', 'utf8');
const blogPostLayout = readFileSync('src/layouts/BlogPostLayout.astro', 'utf8');
const srBlogPostLayout = readFileSync('src/layouts-sr/BlogPostLayout.astro', 'utf8');
const immigrationPost = readFileSync(
  'src/pages/blog/what-to-expect-during-an-immigration-psychological-evaluation.md',
  'utf8'
);
const srImmigrationPost = readFileSync(
  'src/pages/sr/blog/what-to-expect-during-an-immigration-psychological-evaluation.md',
  'utf8'
);
const selfCompassionPost = readFileSync(
  'src/pages/blog/why-am-i-so-hard-on-myself.md',
  'utf8'
);
const srSelfCompassionPost = readFileSync(
  'src/pages/sr/blog/why-am-i-so-hard-on-myself.md',
  'utf8'
);

test('site navigation and hub present the blog as Clinical Insights', () => {
  assert.match(nav, /Insights/);
  assert.match(insightsListing, /Clinical Insights/);
  assert.match(insightsListing, /Insights pagination/);
  assert.match(insightsListing, /postsPerPage|Page \{currentPage\} of \{totalPages\}/);
  assert.match(srInsightsListing, /Klinički uvidi/);
  assert.match(srInsightsListing, /Paginacija uvida/);
});

test('blog post layout emits BlogPosting and optional faq metadata', () => {
  assert.match(blogPostLayout, /schemaType="BlogPosting"/);
  assert.match(blogPostLayout, /faqItems=\{frontmatter\.faqItems \|\| \[\]\}/);
  assert.match(blogPostLayout, /srAlternatePath=\{frontmatter\.srAlternatePath === false/);
  assert.match(srBlogPostLayout, /schemaType="BlogPosting"/);
  assert.match(srBlogPostLayout, /faqItems=\{frontmatter\.faqItems \|\| \[\]\}/);
});

test('blog post layouts render scrollable heading navigation from markdown headings', () => {
  assert.match(blogPostLayout, /tocHeadings/);
  assert.match(blogPostLayout, /In This Article/);
  assert.match(blogPostLayout, /href=\{`#\$\{heading\.slug\}`\}/);
  assert.match(blogPostLayout, /lg:sticky/);
  assert.match(blogPostLayout, /overflow-y-auto/);
  assert.match(blogPostLayout, /scroll-behavior: smooth/);
  assert.match(srBlogPostLayout, /Sadržaj/);
  assert.match(srBlogPostLayout, /aria-label="Sadržaj članka"/);
  assert.match(srBlogPostLayout, /href=\{`#\$\{heading\.slug\}`\}/);
});

test('immigration evaluation article includes local seo, license, and media details', () => {
  assert.match(immigrationPost, /Immigration Psychological Evaluation in Illinois/);
  assert.match(immigrationPost, /immigration-psychological-evaluation-schaumburg\.jpg/);
  assert.match(immigrationPost, /physically located in Illinois at the time of the appointment/);
  assert.match(immigrationPost, /Clients who live outside Illinois may be seen for in-person psychological testing or evaluation/);
  assert.match(immigrationPost, /\/immigration-evaluations\//);
  assert.match(immigrationPost, /\/contact\//);
  assert.doesNotMatch(immigrationPost, /srAlternatePath: false/);
  assert.match(srImmigrationPost, /Imigraciona psihološka evaluacija u Ilinoisu/);
  assert.match(srImmigrationPost, /fizički nalazi u Ilinoisu u trenutku termina/);
  assert.match(srImmigrationPost, /evaluacija ili testiranje na srpskom jeziku/);
  assert.match(srImmigrationPost, /\/sr\/immigration-evaluations\//);
  assert.match(srImmigrationPost, /immigration-psychological-evaluation-schaumburg\.jpg/);
});

test('self-compassion guide keeps bilingual seo, review, location, and media signals', () => {
  assert.match(selfCompassionPost, /Why Am I So Hard on Myself\? \| Self-Compassion/);
  assert.match(selfCompassionPost, /reviewedBy: "Dr\. Jelena Djurovic, Psy\.D\."/);
  assert.match(selfCompassionPost, /self-compassion-reflection-schaumburg\.webp/);
  assert.match(selfCompassionPost, /self-compassion-journal-practice\.webp/);
  assert.match(selfCompassionPost, /physically located in Illinois at the time of the session/);
  assert.match(selfCompassionPost, /\/self-compassion-therapy\//);
  assert.match(selfCompassionPost, /\/womens-mental-health-therapy\//);
  assert.match(selfCompassionPost, /srPath: "\/sr\/blog\/why-am-i-so-hard-on-myself\/"/);
  assert.match(srSelfCompassionPost, /Zašto sam stroga prema sebi\? \| Samosaosećanje/);
  assert.match(srSelfCompassionPost, /fizički nalazi u Ilinoisu u trenutku termina/);
  assert.match(srSelfCompassionPost, /\/sr\/self-compassion-therapy\//);
  assert.match(srSelfCompassionPost, /\/sr\/womens-mental-health-therapy\//);
  assert.match(srSelfCompassionPost, /self-compassion-reflection-schaumburg\.webp/);
});
