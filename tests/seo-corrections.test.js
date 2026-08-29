import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');

const englishSeo = read('src/utils/seo.ts');
const serbianSeo = read('src/utils-sr/seo.ts');
const providerPage = read('src/pages/dr-jelena-djurovic.astro');
const serbianProviderPage = read('src/pages/sr/dr-jelena-djurovic.astro');
const adminPage = read('public/admin/index.html');
const headers = read('public/_headers');
const englishContact = read('src/pages/contact.astro');
const serbianContact = read('src/pages/sr/contact.astro');
const englishFooter = read('src/components/Footer.astro');
const serbianFooter = read('src/components-sr/Footer.astro');
const englishThankYou = read('src/pages/thank-you.astro');
const serbianThankYou = read('src/pages/sr/hvala.astro');
const englishLayout = read('src/layouts/Layout.astro');
const serbianLayout = read('src/layouts-sr/Layout.astro');
const englishBlogLayout = read('src/layouts/BlogPostLayout.astro');
const serbianBlogLayout = read('src/layouts-sr/BlogPostLayout.astro');
const englishNavbar = read('src/components/Navbar.astro');
const serbianNavbar = read('src/components-sr/Navbar.astro');
const psychologicalAssessment = read('src/pages/psychological-assessment.astro');
const serbianPsychologicalAssessment = read('src/pages/sr/psychological-assessment.astro');
const robotsData = read('src/utils/agent-ready-data.js');
const sitemapSource = read('src/pages/sitemap.xml.ts');
const englishLocalServiceArea = read('src/components/LocalServiceArea.astro');
const serbianLocalServiceArea = read('src/components-sr/LocalServiceArea.astro');
const netlifyConfig = read('netlify.toml');
const englishSelfCompassionArticle = read('src/pages/blog/why-am-i-so-hard-on-myself.md');
const serbianSelfCompassionArticle = read('src/pages/sr/blog/why-am-i-so-hard-on-myself.md');
const englishPartners = read('src/pages/our-partners.astro');
const serbianPartners = read('src/pages/sr/our-partners.astro');
const englishAbout = read('src/pages/about.astro');
const serbianAbout = read('src/pages/sr/about.astro');
const firstGbpPostDrafts = read('docs/gbp-posts-center-pta-first-04.md');
const monthlyGbpPostDrafts = read('docs/gbp-posts-center-pta-month-01.md');

test('Person and organization schemas use their own verified NPI values', () => {
  for (const seo of [englishSeo, serbianSeo]) {
    assert.match(seo, /providerNpiNumber = '1770377095'/);
    assert.match(seo, /providerNpiUrl = `https:\/\/npiregistry\.cms\.hhs\.gov\/provider-view\/\$\{providerNpiNumber\}`/);
    assert.match(seo, /organizationNpiNumber = '1306636089'/);
    assert.match(seo, /organizationNpiUrl = `https:\/\/npiregistry\.cms\.hhs\.gov\/provider-view\/\$\{organizationNpiNumber\}`/);
    assert.match(seo, /googleBusinessProfileUrl =\s*\n\s*'https:\/\/www\.google\.com\/maps\?cid=12782923666205133006'/);
    assert.match(seo, /mapUrl = googleBusinessProfileUrl/);
    assert.match(seo, /legalName = 'Center for Psychological Treatment and Assessment'/);
    assert.match(seo, /propertyID: 'National Provider Identifier \(NPI-2\)'/);
    assert.match(seo, /sameAs: \[organizationNpiUrl, googleBusinessProfileUrl\]/);
    assert.match(seo, /employee:/);
    assert.match(seo, /dr-jelena-djurovic\/#person/);
    assert.match(seo, /hasMap: mapUrl/);
    assert.match(seo, /'@type': 'GeoCoordinates'/);
    assert.match(seo, /latitude: 42\.057142/);
    assert.match(seo, /longitude: -88\.0468025/);
    assert.match(seo, /'@type': 'OpeningHoursSpecification'/);
    assert.match(seo, /dayOfWeek: \['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'\]/);
    assert.match(seo, /opens: '09:00'/);
    assert.match(seo, /closes: '20:00'/);
  }

  for (const page of [providerPage, serbianProviderPage]) {
    assert.match(page, /propertyID: 'National Provider Identifier \(NPI-1\)'/);
    assert.match(page, /value: providerNpiNumber/);
    assert.match(page, /sameAs: \[\s*providerNpiUrl,/);
  }
});

test('contact forms state that they are not monitored for emergencies', () => {
  assert.match(englishContact, /not monitored for emergencies/);
  assert.match(englishContact, /call or text 988/);
  assert.match(serbianContact, /ne prati za hitne slučajeve/);
  assert.match(serbianContact, /SMS na 988/);
});

test('public CMS admin surfaces send noindex signals', () => {
  assert.match(adminPage, /name="robots" content="noindex, nofollow, noarchive"/);
  assert.match(headers, /\/admin\/\*\n\s+X-Robots-Tag: noindex, nofollow, noarchive/);
  assert.match(headers, /\/admin\/\*[\s\S]*Cache-Control: no-store/);
  assert.match(robotsData, /Disallow: \/admin\//);
});

test('all Netlify contact forms include deterministic names and confirmation routes', () => {
  assert.match(englishContact, /action="\/thank-you\/\?submitted=1"/);
  assert.match(serbianContact, /action="\/sr\/hvala\/\?submitted=1"/);

  for (const source of [englishContact, serbianContact, englishFooter, serbianFooter]) {
    assert.match(source, /name="form-name" value="contact"/);
    assert.match(source, /name="form-source"/);
    assert.match(source, /<label class="sr-only" for=/);
    assert.match(source, /autocomplete="email"/);
  }

  assert.match(englishThankYou, /noIndex=\{true\}/);
  assert.match(serbianThankYou, /noIndex=\{true\}/);
  assert.match(englishThankYou, /generate_lead/);
  assert.match(serbianThankYou, /generate_lead/);
  assert.match(englishThankYou, /sessionStorage/);
  assert.match(serbianThankYou, /sessionStorage/);
  assert.match(englishThankYou, /confirmedSubmission/);
  assert.match(serbianThankYou, /confirmedSubmission/);
  assert.match(englishThankYou, /get\('submitted'\) === '1'/);
  assert.match(serbianThankYou, /get\('submitted'\) === '1'/);
  assert.match(englishThankYou, /<Navbar alternatePath="\/sr\/hvala\/" \/>/);
  assert.match(serbianThankYou, /<Navbar alternatePath="\/thank-you\/" \/>/);
});

test('article schemas link Dr. Jelena to one canonical Person entity', () => {
  for (const layout of [englishLayout, serbianLayout]) {
    assert.match(layout, /'@id': author\.includes\('Jelena Djurovic'\)/);
    assert.match(layout, /dr-jelena-djurovic\/#person/);
  }
});

test('Serbian contact page has localized ContactPage and FAQ parity', () => {
  assert.match(serbianContact, /'@type': 'ContactPage'/);
  assert.match(serbianContact, /inLanguage: 'sr-Latn'/);
  assert.match(serbianContact, /faqItems=\{faqItems\}/);
  assert.match(serbianContact, /<FaqSection/);
  assert.match(serbianContact, /fizički nalazite u Ilinoisu/);
});

test('contact pages reuse the canonical bilingual location FAQs', () => {
  assert.match(englishContact, /import \{ englishLocalFaqItems \}/);
  assert.match(englishContact, /\.\.\.englishLocalFaqItems/);
  assert.match(serbianContact, /import \{ serbianLocalFaqItems \}/);
  assert.match(serbianContact, /\.\.\.serbianLocalFaqItems/);
});

test('contact pages link users and crawlers to canonical service routes', () => {
  for (const [source, prefix] of [
    [englishContact, ''],
    [serbianContact, '/sr']
  ]) {
    assert.match(source, new RegExp(`href="${prefix}/therapy/"`));
    assert.match(source, new RegExp(`href="${prefix}/couples-therapy/"`));
    assert.match(source, new RegExp(`href="${prefix}/womens-mental-health-therapy/"`));
    assert.match(source, new RegExp(`href="${prefix}/psychological-assessment/"`));
    assert.match(source, new RegExp(`href="${prefix}/immigration-evaluations/"`));
    assert.match(source, new RegExp(`href="${prefix}/pre-surgical-psychological-evaluations/"`));
  }
});

test('ContactPage schema links to the practice without misplacing organization contact points', () => {
  for (const source of [englishContact, serbianContact]) {
    const schemaStart = source.indexOf('const contactStructuredData');
    const schemaSource = source.slice(schemaStart, source.indexOf('---', schemaStart));

    assert.match(schemaSource, /publisher: \{/);
    assert.match(schemaSource, /#professional-service/);
    assert.doesNotMatch(schemaSource, /contactPoint:/);
    assert.doesNotMatch(source, /getPracticeContactPoints/);
  }
});

test('GBP approval drafts distinguish clinical service languages from conversational Spanish', () => {
  for (const drafts of [firstGbpPostDrafts, monthlyGbpPostDrafts]) {
    assert.doesNotMatch(drafts, /services (?:are available|in) English, Serbian, and Spanish/i);
    assert.match(drafts, /Clinical services are available in English and Serbian/);
    assert.match(drafts, /speaks conversational Spanish/);
    assert.match(drafts, /confirm language needs before scheduling/);
  }
});

test('structured data avoids unverified pricing, stock, and nationwide-service claims', () => {
  for (const source of [englishSeo, serbianSeo]) {
    assert.doesNotMatch(source, /priceRange:/);
    assert.doesNotMatch(source, /schema\.org\/InStock/);
    assert.doesNotMatch(source, /areaServed: 'US'/);
  }

  for (const source of [englishContact, serbianContact]) {
    assert.doesNotMatch(source, /areaServed: 'US'/);
  }
});

test('sitemap prefers verified update dates and does not invent pagination dates', () => {
  assert.match(sitemapSource, /updatedDate \?\? module\?\.frontmatter\?\.date/);
  assert.doesNotMatch(sitemapSource, /lastmod: staticLastmod/);
});

test('blog layouts never invent a clinical reviewer', () => {
  for (const layout of [englishBlogLayout, serbianBlogLayout]) {
    assert.match(layout, /const reviewedBy = frontmatter\.reviewedBy;/);
    assert.doesNotMatch(layout, /frontmatter\.reviewedBy \|\| 'Dr\. Jelena Djurovic/);
    assert.match(layout, /\{reviewedBy && \(/);
  }
});

test('core navigation links use canonical trailing-slash routes', () => {
  assert.doesNotMatch(englishNavbar, /href: '\/[a-z0-9/-]*[a-z0-9-]'/);
  assert.doesNotMatch(serbianNavbar, /href: '\/sr\/[a-z0-9/-]*[a-z0-9-]'/);
  assert.match(englishNavbar, /href: '\/psychological-assessment\/'/);
  assert.match(serbianNavbar, /href: '\/sr\/psychological-assessment\/'/);
});

test('legacy about pages consolidate into the canonical provider profiles', () => {
  assert.match(
    netlifyConfig,
    /from = "\/about\/"[\s\S]*to = "\/dr-jelena-djurovic\/"[\s\S]*status = 301[\s\S]*force = true/
  );
  assert.match(
    netlifyConfig,
    /from = "\/sr\/about\/"[\s\S]*to = "\/sr\/dr-jelena-djurovic\/"[\s\S]*status = 301[\s\S]*force = true/
  );
  assert.doesNotMatch(englishSelfCompassionArticle, /\]\(\/about\/\)/);
  assert.doesNotMatch(serbianSelfCompassionArticle, /\]\(\/sr\/about\/\)/);
  assert.match(englishSelfCompassionArticle, /\]\(\/dr-jelena-djurovic\/\)/);
  assert.match(serbianSelfCompassionArticle, /\]\(\/sr\/dr-jelena-djurovic\/\)/);

  assert.match(englishLayout, /canonicalPath\?: string/);
  assert.match(serbianLayout, /canonicalPath\?: string/);
  assert.match(englishAbout, /canonicalPath="\/dr-jelena-djurovic\/"/);
  assert.match(englishAbout, /srAlternatePath="\/sr\/dr-jelena-djurovic\/"/);
  assert.match(serbianAbout, /canonicalPath="\/sr\/dr-jelena-djurovic\/"/);
  assert.match(serbianAbout, /enAlternatePath="\/dr-jelena-djurovic\/"/);
  assert.match(englishAbout, /noIndex=\{true\}/);
  assert.match(serbianAbout, /noIndex=\{true\}/);
  assert.doesNotMatch(sitemapSource, /'\/about\/'/);
});

test('assessment pages do not lead their metadata with ADHD and Serbian parity is present', () => {
  assert.doesNotMatch(psychologicalAssessment, /title="ADHD Testing/);
  assert.doesNotMatch(serbianPsychologicalAssessment, /title="ADHD/);
  assert.match(serbianPsychologicalAssessment, /faqItems=\{faqItems\}/);
  assert.match(serbianPsychologicalAssessment, /<LocalServiceArea/);
  assert.match(serbianPsychologicalAssessment, /<AuthorBioBox \/>/);
  assert.match(serbianPsychologicalAssessment, /<PageAddressCard \/>/);
  assert.match(serbianPsychologicalAssessment, /fizički nalazi u Ilinoisu/);
  assert.match(serbianPsychologicalAssessment, /dostupnih validiranih mera/);
});

test('service copy does not make Illinois residency the telehealth eligibility rule', () => {
  const serviceFiles = [
    'src/pages/self-compassion-therapy.astro',
    'src/pages/divorce-counseling.astro',
    'src/pages/bariatric-surgery-counseling.astro',
    'src/pages/postpartum-therapy.astro',
    'src/pages/womens-mental-health-therapy.astro',
    'src/pages/weight-loss-counseling.astro',
    'src/pages/prenatal-therapy.astro',
    'src/pages/sr/postpartum-therapy.astro',
    'src/pages/sr/self-compassion-therapy.astro',
    'src/pages/sr/weight-loss-counseling.astro',
    'src/pages/sr/womens-mental-health-therapy.astro',
    'src/pages/sr/bariatric-surgery-counseling.astro',
    'src/pages/sr/prenatal-therapy.astro'
  ];

  for (const file of serviceFiles) {
    const source = read(file);
    assert.doesNotMatch(source, /Illinois residents|residents of Illinois|stanovnike Illinoisa|stanovnike Ilinoisa/i);
  }

  assert.doesNotMatch(read('src/pages/sr/postpartum-therapy.astro'), /so new parents can access support/);
  assert.match(englishLocalServiceArea, /physically located in Illinois at the time of the session/);
  assert.match(serbianLocalServiceArea, /fizički nalazi u Illinoisu u trenutku seanse/);
  assert.doesNotMatch(read('src/pages/sr/divorce-counseling.astro'), /online za klijente širom Illinoisa/);
});

test('partner pages distinguish Center for PTA from the independent R Hope TMS clinic', () => {
  for (const page of [englishPartners, serbianPartners]) {
    assert.match(page, /faqItems=\{faqItems\}/);
    assert.match(page, /<FaqSection/);
    assert.match(page, /<PageAddressCard \/>/);
    assert.match(page, /1320 Tower Rd, Suite 156/);
    assert.match(page, /1335 Dodge Ave, Evanston, IL 60201/);
    assert.match(page, /Center for PTA/);
    assert.match(page, /R Hope Treatment/);
    assert.match(page, /https:\/\/rhopetreatment\.com\//);
  }

  assert.match(englishPartners, /R Hope Treatment: TMS Referral Information/);
  assert.match(englishPartners, /Center for PTA does not provide TMS/);
  assert.match(englishPartners, /separate clinical practices/);
  assert.match(englishPartners, /does not make those determinations or promise insurance coverage/);
  assert.match(englishPartners, /August 29, 2026/);

  assert.match(serbianPartners, /R Hope Treatment: informacije o TMS-u i upućivanju/);
  assert.match(serbianPartners, /Center for PTA ne pruža TMS/);
  assert.match(serbianPartners, /dve zasebne kliničke prakse/);
  assert.match(serbianPartners, /ne obećava pokriće osiguranja/);
  assert.match(serbianPartners, /29\. avgusta 2026/);
  assert.doesNotMatch(serbianPartners, /rhopetreatment\.com\/sr\//);
});
