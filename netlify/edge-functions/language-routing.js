const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

// Language links already point to the actual translated URL. Never construct a
// translated slug or override a deep link from browser language or a cookie.
export default async (request, context) => {
  const accept = request.headers.get('accept') || '';
  if (!accept.includes('text/html') && !accept.includes('*/*')) return context.next();

  const url = new URL(request.url);
  if (/^\/(?:_astro|images|api|admin|\.well-known)(?:\/|$)/.test(url.pathname)) {
    return context.next();
  }
  const locale = url.searchParams.get('lang');
  if (locale !== 'en' && locale !== 'sr') return context.next();

  url.searchParams.delete('lang');
  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
      'Set-Cookie': `preferred_locale=${locale}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax; Secure`,
      'Cache-Control': 'private, no-store',
      Vary: 'Accept, Cookie'
    }
  });
};

export const config = { path: '/*', method: ['GET'], onError: 'bypass' };
