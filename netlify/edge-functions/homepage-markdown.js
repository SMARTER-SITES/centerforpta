import {
  contentSignal,
  createHomepageMarkdown,
  estimateMarkdownTokens,
  homepageLinkHeader,
  requestPrefersMarkdown
} from '../../src/utils/agent-ready-data.js';

function ensureVaryAccept(headers) {
  const current = headers.get('Vary');

  if (!current) {
    headers.set('Vary', 'Accept');
    return;
  }

  if (!current.toLowerCase().split(',').map((value) => value.trim()).includes('accept')) {
    headers.set('Vary', `${current}, Accept`);
  }
}

function applyHomepageHeaders(headers) {
  headers.set('Link', homepageLinkHeader);
  headers.set('Content-Signal', contentSignal);
  ensureVaryAccept(headers);
}

export default async (request, context) => {
  if (requestPrefersMarkdown(request)) {
    const markdown = createHomepageMarkdown();
    const headers = new Headers({
      'Content-Type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': String(estimateMarkdownTokens(markdown))
    });

    applyHomepageHeaders(headers);

    return new Response(request.method === 'HEAD' ? null : markdown, {
      status: 200,
      headers
    });
  }

  const response = await context.next();
  const headers = new Headers(response.headers);

  applyHomepageHeaders(headers);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
};

export const config = {
  path: '/',
  method: ['GET'],
  onError: 'bypass'
};
