export const siteUrl = 'https://centerforpta.com';
export const staticLastmod = '2026-06-09T00:00:00.000Z';

export const staticPages = [
  '/',
  '/about/',
  '/therapy/',
  '/psychological-assessment/',
  '/pre-surgical-psychological-evaluations/',
  '/immigration-evaluations/',
  '/consultation-supervision-and-coaching/',
  '/rates-and-insurance/',
  '/book-recommendations/',
  '/our-partners/',
  '/useful-links/',
  '/privacy-policy/',
  '/contact/',
  '/blog/',
  '/womens-mental-health-therapy/',
  '/self-compassion-therapy/',
  '/weight-loss-counseling/',
  '/bariatric-surgery-counseling/',
  '/divorce-counseling/',
  '/prenatal-therapy/',
  '/postpartum-therapy/'
];

function normalizePath(path) {
  if (!path || path === '/') {
    return '/';
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
}

export function getAlternatePath(path) {
  const normalizedPath = normalizePath(path);

  if (normalizedPath === '/sr/') {
    return '/';
  }

  if (normalizedPath.startsWith('/sr/')) {
    return normalizePath(normalizedPath.replace(/^\/sr/, ''));
  }

  if (normalizedPath === '/') {
    return '/sr/';
  }

  return `/sr${normalizedPath}`;
}

export function getEnglishPath(path) {
  const normalizedPath = normalizePath(path);
  return normalizedPath.startsWith('/sr/') ? getAlternatePath(normalizedPath) : normalizedPath;
}

export function toAbsoluteUrl(path) {
  return new URL(normalizePath(path), siteUrl).toString();
}

export function createSitemapEntries(extraPages = []) {
  const entries = new Map();

  function addEntry(page) {
    const path = normalizePath(typeof page === 'string' ? page : page.path);
    const lastmod = typeof page === 'string' ? staticLastmod : page.lastmod || staticLastmod;

    if (!entries.has(path)) {
      entries.set(path, { path, lastmod });
    }

    const alternatePath = getAlternatePath(path);
    if (!entries.has(alternatePath)) {
      entries.set(alternatePath, { path: alternatePath, lastmod });
    }
  }

  staticPages.forEach(addEntry);
  extraPages.forEach(addEntry);

  return [...entries.values()];
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function formatLastmod(lastmod) {
  if (!lastmod) {
    return undefined;
  }

  const date = lastmod instanceof Date ? lastmod : new Date(lastmod);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}

function createAlternateLinks(path) {
  const englishPath = getEnglishPath(path);
  const serbianPath = getAlternatePath(englishPath);

  return [
    { hreflang: 'en', href: toAbsoluteUrl(englishPath) },
    { hreflang: 'sr', href: toAbsoluteUrl(serbianPath) },
    { hreflang: 'x-default', href: toAbsoluteUrl(englishPath) }
  ];
}

export function buildSitemapXml(entries) {
  const urls = entries
    .map(({ path, lastmod }) => {
      const formattedLastmod = formatLastmod(lastmod);
      const alternateLinks = createAlternateLinks(path)
        .map(
          ({ hreflang, href }) =>
            `    <xhtml:link rel="alternate" hreflang="${escapeXml(hreflang)}" href="${escapeXml(href)}" />`
        )
        .join('\n');

      return `  <url>
    <loc>${escapeXml(toAbsoluteUrl(path))}</loc>
${alternateLinks}
${formattedLastmod ? `    <lastmod>${escapeXml(formattedLastmod)}</lastmod>` : ''}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;
}
