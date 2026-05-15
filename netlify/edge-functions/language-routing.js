const LANGUAGE_COOKIE = 'preferred_locale';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const SERBIAN_LANGUAGE_CODES = new Set(['sr', 'hr', 'bs', 'mk', 'me', 'cnr', 'sh']);

function isHtmlRequest(request) {
  const accept = request.headers.get('accept') || '';
  return accept.includes('text/html') || accept.includes('*/*');
}

function shouldSkipPath(pathname) {
  return (
    pathname.startsWith('/sr/') ||
    pathname === '/sr' ||
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/admin/') ||
    pathname.startsWith('/.well-known/') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  );
}

function getCookieValue(request, name) {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = cookieHeader.split(';').map((cookie) => cookie.trim());
  const cookie = cookies.find((item) => item.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : '';
}

function getPreferredLocaleFromHeader(request) {
  const acceptedLanguages = request.headers.get('accept-language') || '';
  const languages = acceptedLanguages
    .split(',')
    .map((languageRange, index) => {
      const [rawLanguageCode, ...params] = languageRange.split(';');
      const qParam = params.find((param) => param.trim().startsWith('q='));
      const q = qParam ? Number.parseFloat(qParam.split('=')[1]) : 1;

      return {
        index,
        primaryCode: rawLanguageCode.trim().toLowerCase().split('-')[0],
        q: Number.isFinite(q) ? q : 0
      };
    })
    .filter((language) => language.primaryCode)
    .sort((a, b) => b.q - a.q || a.index - b.index);

  const preferredLanguage = languages[0];

  if (preferredLanguage && SERBIAN_LANGUAGE_CODES.has(preferredLanguage.primaryCode)) {
    return 'sr';
  }

  return 'en';
}

function withLanguagePreference(headers, locale) {
  headers.set(
    'Set-Cookie',
    `${LANGUAGE_COOKIE}=${locale}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
  );
}

function redirectTo(url, locale) {
  const headers = new Headers({
    Location: url.toString()
  });

  if (locale) {
    withLanguagePreference(headers, locale);
  }

  return new Response(null, {
    status: 302,
    headers
  });
}

function toSerbianPath(pathname) {
  return pathname === '/' ? '/sr/' : `/sr${pathname}`;
}

function toEnglishPath(pathname) {
  return pathname.replace(/^\/sr(?=\/|$)/, '') || '/';
}

export default async (request, context) => {
  if (!isHtmlRequest(request)) {
    return context.next();
  }

  const url = new URL(request.url);
  const requestedLocale = url.searchParams.get('lang');

  if (requestedLocale === 'sr' || requestedLocale === 'en') {
    url.searchParams.delete('lang');
    url.pathname =
      requestedLocale === 'sr' ? toSerbianPath(toEnglishPath(url.pathname)) : toEnglishPath(url.pathname);

    return redirectTo(url, requestedLocale);
  }

  if (shouldSkipPath(url.pathname)) {
    return context.next();
  }

  const cookieLocale = getCookieValue(request, LANGUAGE_COOKIE);
  const preferredLocale =
    cookieLocale === 'sr' || cookieLocale === 'en'
      ? cookieLocale
      : getPreferredLocaleFromHeader(request);

  if (preferredLocale === 'sr') {
    url.pathname = toSerbianPath(url.pathname);
    return redirectTo(url);
  }

  return context.next();
};

export const config = {
  path: '/*',
  method: ['GET'],
  onError: 'bypass'
};
