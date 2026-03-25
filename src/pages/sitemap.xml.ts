import type { APIRoute } from 'astro';
import { siteUrl } from '../utils/seo';

const staticPages = [
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
  '/blog/'
];

const blogModules = import.meta.glob('./blog/*.md', { eager: true }) as Record<
  string,
  { frontmatter?: { date?: string | Date } }
>;

const blogPages = Object.entries(blogModules).map(([file, module]) => {
  const slug = file.replace('./blog/', '').replace(/\.md$/, '');
  const rawDate = module.frontmatter?.date;
  const lastmod = rawDate ? new Date(rawDate).toISOString() : undefined;

  return {
    path: `/blog/${slug}/`,
    lastmod
  };
});

function toUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export const GET: APIRoute = () => {
  const urls = [
    ...staticPages.map((path) => ({ path })),
    ...blogPages
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, lastmod }) => `  <url>
    <loc>${toUrl(path)}</loc>
${lastmod ? `    <lastmod>${lastmod}</lastmod>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
