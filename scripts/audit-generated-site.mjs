import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, posix, relative } from 'node:path';

const outputRoot = process.argv[2] || 'dist';
const siteOrigin = 'https://centerforpta.com';
const practiceId = `${siteOrigin}/#professional-service`;
const providerId = `${siteOrigin}/dr-jelena-djurovic/#person`;
const appointmentsContactId = `${siteOrigin}/#appointments-contact-point`;
const textContactId = `${siteOrigin}/#text-contact-point`;
const googleBusinessProfileUrl =
  'https://www.google.com/maps?cid=12782923666205133006';
const organizationNpiUrl =
  'https://npiregistry.cms.hhs.gov/provider-view/1306636089';
const providerNpiUrl =
  'https://npiregistry.cms.hhs.gov/provider-view/1770377095';
const psychologyTodayUrl =
  'https://www.psychologytoday.com/us/therapists/jelena-djurovic-schaumburg-il/1611370';
const serbianTimesInterviewUrl =
  'https://serbiantimes.info/srpkinja-psiholog-u-cikagu-od-cega-najvise-pate-nasi-ljudi-u-americi-i-kako-im-psiholog-moze-pomoci-da-dobiju-papire-video/';
const sbnInterviewUrl = 'https://www.youtube.com/watch?v=4xS8Sm2lOh4';

if (!existsSync(outputRoot)) {
  throw new Error(`Build output not found: ${outputRoot}`);
}

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function routeFor(file) {
  const path = relative(outputRoot, file).replaceAll('\\', '/');
  if (path === 'index.html') return '/';
  return `/${path.replace(/index\.html$/, '')}`;
}

function getAttribute(html, pattern) {
  return html.match(pattern)?.[1] || null;
}

function parseUrl(value) {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function decodeHtml(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&(?:apos|#39);/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function comparableText(value) {
  return decodeHtml(String(value || ''))
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

function visibleTextFromHtml(html) {
  return comparableText(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<template\b[\s\S]*?<\/template>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  );
}

function collectJsonLdEntries(value) {
  if (Array.isArray(value)) return value.flatMap(collectJsonLdEntries);
  if (!value || typeof value !== 'object') return [];
  return [value, ...collectJsonLdEntries(value['@graph'])];
}

function schemaTypes(entry) {
  return Array.isArray(entry?.['@type']) ? entry['@type'] : [entry?.['@type']].filter(Boolean);
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  return value == null ? [] : [value];
}

const webPageSchemaTypes = new Set([
  'AboutPage',
  'CollectionPage',
  'ContactPage',
  'MedicalWebPage',
  'ProfilePage',
  'SearchResultsPage',
  'WebPage'
]);

const citationRequiredRoutes = new Set([
  '/blog/reproductive-stress-and-infertility/',
  '/sr/blog/reproductive-stress-and-infertility/',
  '/blog/why-am-i-so-hard-on-myself/',
  '/sr/blog/why-am-i-so-hard-on-myself/'
]);

const providerProfileRoutes = new Set([
  '/dr-jelena-djurovic/',
  '/sr/dr-jelena-djurovic/'
]);

function routeExists(pathname) {
  const path = pathname.replace(/^\//, '');
  return (
    existsSync(join(outputRoot, path)) ||
    existsSync(join(outputRoot, path, 'index.html')) ||
    existsSync(join(outputRoot, `${path}.html`))
  );
}

function resolveInternalPath(rawHref, sourceRoute) {
  if (/^(?:mailto:|tel:|sms:|javascript:|#)/i.test(rawHref)) return null;

  let href = rawHref;
  if (/^https?:/i.test(rawHref)) {
    const url = new URL(rawHref);
    if (url.origin !== siteOrigin) return null;
    href = `${url.pathname}${url.search}${url.hash}`;
  }

  const cleanHref = href.split('#')[0].split('?')[0];
  if (!cleanHref) return null;
  return cleanHref.startsWith('/')
    ? posix.normalize(cleanHref)
    : posix.normalize(posix.join(sourceRoute, cleanHref));
}

function duplicateValues(pages, field) {
  const groups = new Map();
  for (const page of pages) {
    const value = page[field];
    if (!value) continue;
    groups.set(value, [...(groups.get(value) || []), page.route]);
  }

  return [...groups.entries()]
    .filter(([, routes]) => routes.length > 1)
    .map(([value, routes]) => ({ value, routes }));
}

const pages = walk(outputRoot)
  .filter((file) => file.endsWith('.html'))
  .map((file) => {
    const html = readFileSync(file, 'utf8');
    return {
      file,
      route: routeFor(file),
      html,
      title: getAttribute(html, /<title>([\s\S]*?)<\/title>/i),
      description: getAttribute(html, /<meta name="description" content="([^"]*)"/i),
      robots: getAttribute(html, /<meta name="robots" content="([^"]*)"/i),
      canonical: getAttribute(html, /<link rel="canonical" href="([^"]*)"/i),
      h1Count: (html.match(/<h1\b/gi) || []).length,
      alternates: [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/gi)]
        .map((match) => ({ language: match[1], href: match[2] })),
      links: [...html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)].map((match) => match[1])
    };
  });

const indexablePages = pages.filter((page) => !page.robots?.includes('noindex'));
const pageByRoute = new Map(pages.map((page) => [page.route, page]));
const inboundLinks = new Map(indexablePages.map((page) => [page.route, new Set()]));

const problems = {
  metadata: [],
  snippetQuality: [],
  duplicateTitles: duplicateValues(indexablePages, 'title'),
  duplicateDescriptions: duplicateValues(indexablePages, 'description'),
  duplicateCanonicals: duplicateValues(indexablePages, 'canonical'),
  canonicals: [],
  hreflang: [],
  internalLinks: [],
  orphanPages: [],
  crawlDepth: [],
  weakInternalLinks: [],
  structuredData: [],
  entityGraph: [],
  articleCitations: [],
  breadcrumbs: [],
  faqVisibility: [],
  localEntityConsistency: []
};

const adjacency = new Map(indexablePages.map((page) => [page.route, new Set()]));

for (const page of indexablePages) {
  const missing = [];
  if (!page.title) missing.push('title');
  if (!page.description) missing.push('description');
  if (!page.canonical) missing.push('canonical');
  if (page.h1Count !== 1) missing.push(`h1 count ${page.h1Count}`);
  if (missing.length > 0) problems.metadata.push({ route: page.route, missing });

  const titleLength = decodeHtml(page.title || '').trim().length;
  const descriptionLength = decodeHtml(page.description || '').trim().length;
  const snippetIssues = [];
  if (titleLength < 25 || titleLength > 70) snippetIssues.push(`title length ${titleLength}`);
  if (descriptionLength < 90 || descriptionLength > 180) {
    snippetIssues.push(`description length ${descriptionLength}`);
  }
  if (snippetIssues.length > 0) {
    problems.snippetQuality.push({ route: page.route, issues: snippetIssues });
  }

  if (page.canonical) {
    const canonicalUrl = parseUrl(page.canonical);
    if (!canonicalUrl) {
      problems.canonicals.push({ route: page.route, canonical: page.canonical, issue: 'invalid URL' });
    } else if (canonicalUrl.origin !== siteOrigin || canonicalUrl.pathname !== page.route) {
      problems.canonicals.push({ route: page.route, canonical: page.canonical, issue: 'not self-canonical' });
    }
  }

  for (const alternate of page.alternates.filter(({ language }) => language === 'en' || language === 'sr')) {
    const alternateUrl = parseUrl(alternate.href);
    if (!alternateUrl || alternateUrl.origin !== siteOrigin) {
      problems.hreflang.push({ route: page.route, href: alternate.href, issue: 'invalid or external target' });
      continue;
    }

    const targetRoute = alternateUrl.pathname;
    const target = pageByRoute.get(targetRoute);
    if (!target) {
      problems.hreflang.push({ route: page.route, targetRoute, issue: 'missing target' });
      continue;
    }

    const reciprocal = target.alternates.some(({ href }) => {
      const reciprocalUrl = parseUrl(href);
      return reciprocalUrl?.origin === siteOrigin && reciprocalUrl.pathname === page.route;
    });
    if (!reciprocal) {
      problems.hreflang.push({ route: page.route, targetRoute, issue: 'not reciprocal' });
    }
  }

  let structuredData;
  try {
    structuredData = [...page.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)]
      .flatMap((match) => collectJsonLdEntries(JSON.parse(match[1])));
  } catch (error) {
    problems.structuredData.push({ route: page.route, issue: `invalid JSON-LD: ${error.message}` });
    continue;
  }

  const expectedPageId = `${page.canonical}#webpage`;
  const expectedLanguage = page.route.startsWith('/sr/') ? 'sr-Latn' : 'en-US';
  const pageEntities = structuredData.filter((entry) =>
    schemaTypes(entry).some((type) => webPageSchemaTypes.has(type))
  );

  if (pageEntities.length !== 1) {
    problems.entityGraph.push({
      route: page.route,
      issue: `expected one page entity, found ${pageEntities.length}`
    });
  } else {
    const pageEntity = pageEntities[0];
    const mismatches = [];
    if (pageEntity['@id'] !== expectedPageId) mismatches.push('@id');
    if (pageEntity.url !== page.canonical) mismatches.push('url');
    if (pageEntity.inLanguage !== expectedLanguage) mismatches.push('inLanguage');
    if (mismatches.length > 0) {
      problems.entityGraph.push({
        route: page.route,
        issue: `page entity mismatch: ${mismatches.join(', ')}`
      });
    }
  }

  if (page.route === '/contact/' || page.route === '/sr/contact/') {
    const contactPage = pageEntities.find((entry) => schemaTypes(entry).includes('ContactPage'));
    const contactPageIssues = [];
    if (contactPage?.mainEntity?.['@id'] !== practiceId) contactPageIssues.push('practice mainEntity');
    if (contactPage?.publisher?.['@id'] !== practiceId) contactPageIssues.push('practice publisher');
    if (contactPage?.contactPoint) contactPageIssues.push('misplaced ContactPage contactPoint');
    if (!visibleTextFromHtml(page.html).includes('847 874 6273')) {
      contactPageIssues.push('visible fax');
    }
    if (contactPageIssues.length > 0) {
      problems.localEntityConsistency.push({ route: page.route, issues: contactPageIssues });
    }
  }

  for (const entity of structuredData.filter((entry) =>
    schemaTypes(entry).some((type) => ['Article', 'BlogPosting', 'Service'].includes(type))
  )) {
    if (entity.mainEntityOfPage?.['@id'] !== expectedPageId) {
      problems.entityGraph.push({
        route: page.route,
        issue: `${schemaTypes(entity).join('/')} is not linked to the canonical page entity`
      });
    }

    if (schemaTypes(entity).some((type) => ['Article', 'BlogPosting'].includes(type))) {
      const articleMismatches = [];
      if (entity['@id'] !== `${page.canonical}#article`) articleMismatches.push('@id');
      if (entity.url !== page.canonical) articleMismatches.push('url');
      if (entity.inLanguage !== expectedLanguage) articleMismatches.push('inLanguage');
      if (articleMismatches.length > 0) {
        problems.entityGraph.push({
          route: page.route,
          issue: `article entity mismatch: ${articleMismatches.join(', ')}`
        });
      }

      const citations = Array.isArray(entity.citation)
        ? entity.citation
        : entity.citation
          ? [entity.citation]
          : [];
      const citationIssues = [];
      if (citationRequiredRoutes.has(page.route) && citations.length < 3) {
        citationIssues.push(`citation count ${citations.length}`);
      }

      const seenCitationUrls = new Set();
      for (const citation of citations) {
        const citationUrl = citation?.url;
        if (citation?.['@type'] !== 'CreativeWork') citationIssues.push('citation type');
        if (!comparableText(citation?.name)) citationIssues.push('citation name');
        if (!citationUrl || !parseUrl(citationUrl) || !citationUrl.startsWith('https://')) {
          citationIssues.push('citation URL');
          continue;
        }
        if (seenCitationUrls.has(citationUrl)) citationIssues.push('duplicate citation URL');
        seenCitationUrls.add(citationUrl);
        if (!page.links.includes(citationUrl)) citationIssues.push(`citation not visible: ${citationUrl}`);
      }

      if (citationIssues.length > 0) {
        problems.articleCitations.push({
          route: page.route,
          issues: [...new Set(citationIssues)]
        });
      }
    }
  }

  for (const faqPage of structuredData.filter((entry) => schemaTypes(entry).includes('FAQPage'))) {
    const faqMismatches = [];
    if (faqPage['@id'] !== `${page.canonical}#faq`) faqMismatches.push('@id');
    if (faqPage.url !== page.canonical) faqMismatches.push('url');
    if (faqPage.inLanguage !== expectedLanguage) faqMismatches.push('inLanguage');
    if (faqPage.isPartOf?.['@id'] !== expectedPageId) faqMismatches.push('isPartOf');
    if (faqMismatches.length > 0) {
      problems.entityGraph.push({
        route: page.route,
        issue: `FAQ entity mismatch: ${faqMismatches.join(', ')}`
      });
    }
  }

  if (providerProfileRoutes.has(page.route)) {
    const personEntities = structuredData.filter((entry) => schemaTypes(entry).includes('Person'));
    const profilePage = pageEntities.find((entry) => schemaTypes(entry).includes('ProfilePage'));
    const personIssues = [];

    if (personEntities.length !== 1) {
      personIssues.push(`Person entity count ${personEntities.length}`);
    } else {
      const person = personEntities[0];
      const identifiers = asArray(person.identifier);
      const sameAs = new Set(asArray(person.sameAs));
      const alumni = new Set(asArray(person.alumniOf).map((organization) => organization?.name));
      const mediaByUrl = new Map(asArray(person.subjectOf).map((work) => [work?.url, work]));
      const expectedJobTitle = page.route.startsWith('/sr/')
        ? 'Licencirani klinički psiholog u Ilinoisu'
        : 'Illinois Licensed Clinical Psychologist';

      if (person['@id'] !== providerId) personIssues.push('Person @id');
      if (person.name !== 'Dr. Jelena Djurovic') personIssues.push('Person name');
      if (person.url !== `${siteOrigin}/dr-jelena-djurovic/`) personIssues.push('Person URL');
      if (person.jobTitle !== expectedJobTitle) personIssues.push('Person jobTitle');
      if (person.worksFor?.['@id'] !== practiceId) personIssues.push('Person worksFor');
      if (person.workLocation?.['@id'] !== practiceId) personIssues.push('Person workLocation');
      if (!asArray(person.knowsLanguage).includes('en') || !asArray(person.knowsLanguage).includes('sr')) {
        personIssues.push('Person languages');
      }
      if (!identifiers.some((item) =>
        item.propertyID === 'Illinois Clinical Psychologist License' && item.value === '071-011433'
      )) {
        personIssues.push('Person Illinois license');
      }
      if (!identifiers.some((item) =>
        item.propertyID === 'National Provider Identifier (NPI-1)' && item.value === '1770377095'
      )) {
        personIssues.push('Person NPI-1');
      }
      if (person.hasCredential?.identifier !== '071-011433') {
        personIssues.push('Person credential identifier');
      }
      if (!sameAs.has(providerNpiUrl)) personIssues.push('Person NPI registry URL');
      if (!sameAs.has(psychologyTodayUrl)) personIssues.push('Person Psychology Today URL');
      if (!alumni.has('The Chicago School of Professional Psychology')) {
        personIssues.push('Person doctoral education');
      }
      if (!alumni.has('Illinois School of Professional Psychology')) {
        personIssues.push('Person graduate education');
      }

      const serbianTimesInterview = mediaByUrl.get(serbianTimesInterviewUrl);
      if (
        serbianTimesInterview?.['@type'] !== 'NewsArticle' ||
        !comparableText(serbianTimesInterview?.name) ||
        serbianTimesInterview?.datePublished !== '2025-07-07' ||
        serbianTimesInterview?.publisher?.name !== 'Serbian Times'
      ) {
        personIssues.push('Person Serbian Times subjectOf');
      }

      const sbnInterview = mediaByUrl.get(sbnInterviewUrl);
      if (
        sbnInterview?.['@type'] !== 'VideoObject' ||
        !comparableText(sbnInterview?.name) ||
        sbnInterview?.publisher?.name !== 'SBN Chicago News' ||
        sbnInterview?.thumbnailUrl !== 'https://i.ytimg.com/vi/4xS8Sm2lOh4/hqdefault.jpg'
      ) {
        personIssues.push('Person SBN Chicago subjectOf');
      }

      for (const mediaUrl of [serbianTimesInterviewUrl, sbnInterviewUrl]) {
        if (!page.links.includes(mediaUrl)) {
          personIssues.push(`Person subjectOf not visible: ${mediaUrl}`);
        }
      }
    }

    if (profilePage?.mainEntity?.['@id'] !== providerId) {
      personIssues.push('ProfilePage mainEntity');
    }

    if (personIssues.length > 0) {
      problems.localEntityConsistency.push({ route: page.route, issues: personIssues });
    }
  }

  const visibleText = visibleTextFromHtml(page.html);
  const visibleNapChecks = {
    name: visibleText.includes('center for pta'),
    streetAddress: visibleText.includes('1320 tower rd suite 156'),
    locality: visibleText.includes('schaumburg il 60173'),
    telephone: visibleText.includes('847 230 0045'),
    map: page.links.includes(googleBusinessProfileUrl),
    accessibleParking:
      visibleText.includes('wheelchair accessible parking') ||
      visibleText.includes('dostupni su pristupacan parking'),
    restroom:
      visibleText.includes('a restroom are available') ||
      visibleText.includes('i toalet'),
    appointmentsRecommended:
      visibleText.includes('appointments recommended') ||
      visibleText.includes('zakazivanje se preporucuje')
  };
  const visibleNapMismatches = Object.entries(visibleNapChecks)
    .filter(([, matches]) => !matches)
    .map(([field]) => field);
  if (visibleNapMismatches.length > 0) {
    problems.localEntityConsistency.push({
      route: page.route,
      issues: visibleNapMismatches.map((field) => `visible NAP ${field}`)
    });
  }

  const serviceEntities = structuredData.filter((entry) =>
    schemaTypes(entry).includes('Service') && String(entry['@id'] || '').endsWith('#service')
  );
  const isLocalizedHomepage = page.route === '/' || page.route === '/sr/';
  if (!isLocalizedHomepage) {
    const breadcrumbLists = structuredData.filter((entry) =>
      schemaTypes(entry).includes('BreadcrumbList')
    );
    const expectedHomeUrl = `${siteOrigin}${page.route.startsWith('/sr/') ? '/sr/' : '/'}`;

    if (breadcrumbLists.length !== 1) {
      problems.breadcrumbs.push({
        route: page.route,
        issue: `expected one BreadcrumbList on indexable page, found ${breadcrumbLists.length}`
      });
    } else {
      const items = [...(breadcrumbLists[0].itemListElement || [])]
        .sort((a, b) => Number(a.position) - Number(b.position));
      const breadcrumbIssues = [];
      if (items.length < 2) breadcrumbIssues.push(`item count ${items.length}`);
      if (serviceEntities.length > 0 && items.length !== 2) {
        breadcrumbIssues.push(`service item count ${items.length}`);
      }
      if (items.some((item, index) => item.position !== index + 1)) {
        breadcrumbIssues.push('positions');
      }
      if (items[0]?.position !== 1 || items[0]?.item !== expectedHomeUrl) {
        breadcrumbIssues.push('home item');
      }
      if (items.at(-1)?.item !== page.canonical) {
        breadcrumbIssues.push('current page item');
      }
      if (items.some((item) => !comparableText(item.name) || !visibleText.includes(comparableText(item.name)))) {
        breadcrumbIssues.push('visible names');
      }
      if (breadcrumbIssues.length > 0) {
        problems.breadcrumbs.push({
          route: page.route,
          issue: `breadcrumb mismatch: ${breadcrumbIssues.join(', ')}`
        });
      }
    }

    if (!/<nav\b[^>]*aria-label="(?:Breadcrumb|Putanja stranice)"/i.test(page.html)) {
      problems.breadcrumbs.push({
        route: page.route,
        issue: 'missing visible breadcrumb navigation'
      });
    }
  }

  for (const faqPage of structuredData.filter((entry) => entry['@type'] === 'FAQPage')) {
    for (const item of faqPage.mainEntity || []) {
      const question = comparableText(item.name);
      const answers = Array.isArray(item.acceptedAnswer)
        ? item.acceptedAnswer
        : [item.acceptedAnswer];
      const answerTexts = answers
        .map((answer) => comparableText(answer?.text))
        .filter(Boolean);
      const missing = [];

      if (!question || !visibleText.includes(question)) missing.push('question');
      if (answerTexts.length === 0 || answerTexts.some((answer) => !visibleText.includes(answer))) {
        missing.push('answer');
      }

      if (missing.length > 0) {
        problems.faqVisibility.push({
          route: page.route,
          question: item.name || '(missing question)',
          missing
        });
      }
    }
  }

  const practice = structuredData.find((entry) => {
    const types = Array.isArray(entry['@type']) ? entry['@type'] : [entry['@type']];
    return types.includes('MedicalBusiness');
  });
  if (!practice) {
    problems.structuredData.push({ route: page.route, issue: 'missing MedicalBusiness entity' });
    continue;
  }

  const practiceTypes = new Set(schemaTypes(practice));
  const practiceSameAs = new Set(asArray(practice.sameAs));
  const practiceAreaServed = new Set(asArray(practice.areaServed).map((area) => area?.name));
  const practiceLocationFeatures = new Map(
    asArray(practice.amenityFeature).map((feature) => [feature?.name, feature])
  );
  const practiceContactPoints = new Map(
    asArray(practice.contactPoint).map((contactPoint) => [contactPoint?.['@id'], contactPoint])
  );
  const appointmentsContactPoint = practiceContactPoints.get(appointmentsContactId);
  const textContactPoint = practiceContactPoints.get(textContactId);
  const hasCanonicalLanguages = (contactPoint) => {
    const languages = new Set(asArray(contactPoint?.availableLanguage));
    return languages.size === 2 && languages.has('en') && languages.has('sr');
  };
  const openingHours = asArray(practice.openingHoursSpecification);
  const expectedWeekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const hasCanonicalHours = openingHours.some((hours) => {
    const weekdays = new Set(asArray(hours.dayOfWeek));
    return hours.opens === '09:00' &&
      hours.closes === '20:00' &&
      weekdays.size === expectedWeekdays.length &&
      expectedWeekdays.every((day) => weekdays.has(day));
  });
  const practiceChecks = {
    id: practice['@id'] === practiceId,
    types: practiceTypes.has('MedicalBusiness') && practiceTypes.has('ProfessionalService'),
    name: practice.name === 'Center for PTA',
    legalName: practice.legalName === 'Center for Psychological Treatment and Assessment',
    url: practice.url === siteOrigin,
    identifier:
      practice.identifier?.propertyID === 'National Provider Identifier (NPI-2)' &&
      practice.identifier?.value === '1306636089',
    npiRegistry: practiceSameAs.has(organizationNpiUrl),
    googleBusinessProfile: practiceSameAs.has(googleBusinessProfileUrl),
    phone: practice.telephone === '+1-847-230-0045',
    fax: practice.faxNumber === '+1-847-874-6273',
    email: practice.email === 'info@centerforpta.com',
    appointmentsContactPoint:
      appointmentsContactPoint?.['@type'] === 'ContactPoint' &&
      appointmentsContactPoint?.contactType === 'appointments and practice inquiries' &&
      appointmentsContactPoint?.telephone === '+1-847-230-0045' &&
      appointmentsContactPoint?.faxNumber === '+1-847-874-6273' &&
      appointmentsContactPoint?.email === 'info@centerforpta.com' &&
      appointmentsContactPoint?.url === `${siteOrigin}/contact/` &&
      hasCanonicalLanguages(appointmentsContactPoint),
    textContactPoint:
      textContactPoint?.['@type'] === 'ContactPoint' &&
      textContactPoint?.contactType === 'text messaging' &&
      textContactPoint?.telephone === '+1-847-929-7040' &&
      textContactPoint?.url === `${siteOrigin}/contact/` &&
      hasCanonicalLanguages(textContactPoint),
    addressType: practice.address?.['@type'] === 'PostalAddress',
    address: practice.address?.streetAddress === '1320 Tower Rd, Suite 156',
    city: practice.address?.addressLocality === 'Schaumburg',
    region: practice.address?.addressRegion === 'IL',
    postalCode: practice.address?.postalCode === '60173',
    country: practice.address?.addressCountry === 'US',
    latitude: practice.geo?.latitude === 42.057142,
    longitude: practice.geo?.longitude === -88.0468025,
    wheelchairAccessibleCarPark:
      practiceLocationFeatures.get('Wheelchair-accessible car park')?.['@type'] ===
        'LocationFeatureSpecification' &&
      practiceLocationFeatures.get('Wheelchair-accessible car park')?.value === true,
    restroom:
      practiceLocationFeatures.get('Restroom')?.['@type'] ===
        'LocationFeatureSpecification' &&
      practiceLocationFeatures.get('Restroom')?.value === true,
    hours: hasCanonicalHours,
    schaumburgArea: practiceAreaServed.has('Schaumburg'),
    illinoisArea: practiceAreaServed.has('Illinois'),
    employee: practice.employee?.['@id'] === providerId,
    map: practice.hasMap === googleBusinessProfileUrl
  };
  const mismatches = Object.entries(practiceChecks)
    .filter(([, matches]) => !matches)
    .map(([field]) => field);
  if (mismatches.length > 0) {
    problems.localEntityConsistency.push({
      route: page.route,
      issues: mismatches.map((field) => `practice ${field}`)
    });
  }
}

for (const page of pages) {
  for (const href of page.links) {
    const resolved = resolveInternalPath(href, page.route);
    if (!resolved) continue;
    if (!routeExists(resolved)) {
      problems.internalLinks.push({ from: page.route, href, resolved });
    } else if (inboundLinks.has(resolved) && resolved !== page.route) {
      inboundLinks.get(resolved).add(page.route);
      if (adjacency.has(page.route)) adjacency.get(page.route).add(resolved);
    }
  }
}

problems.orphanPages = [...inboundLinks.entries()]
  .filter(([route, sources]) => route !== '/' && sources.size === 0)
  .map(([route]) => route);

const crawlDepthByRoute = new Map([['/', 0]]);
const crawlQueue = ['/'];
while (crawlQueue.length > 0) {
  const source = crawlQueue.shift();
  for (const target of adjacency.get(source) || []) {
    if (crawlDepthByRoute.has(target)) continue;
    crawlDepthByRoute.set(target, crawlDepthByRoute.get(source) + 1);
    crawlQueue.push(target);
  }
}

problems.crawlDepth = indexablePages
  .filter((page) => page.route !== '/')
  .map((page) => ({ route: page.route, depth: crawlDepthByRoute.get(page.route) ?? null }))
  .filter(({ depth }) => depth === null || depth > 3);

problems.weakInternalLinks = indexablePages
  .filter((page) => /^\/(?:sr\/)?blog\/(?!page\/)[^/]+\/$/.test(page.route))
  .map((page) => ({ route: page.route, inboundLinks: inboundLinks.get(page.route)?.size || 0 }))
  .filter(({ inboundLinks: count }) => count < 3);

const issueCount = Object.values(problems).reduce((count, entries) => count + entries.length, 0);
const summary = {
  htmlPages: pages.length,
  indexablePages: indexablePages.length,
  noindexPages: pages.length - indexablePages.length,
  issues: issueCount
};

if (issueCount > 0) {
  console.error(JSON.stringify({ summary, problems }, null, 2));
  process.exitCode = 1;
} else {
  console.log(`SEO audit passed: ${summary.indexablePages} indexable pages, ${summary.noindexPages} noindex pages, 0 issues.`);
}
