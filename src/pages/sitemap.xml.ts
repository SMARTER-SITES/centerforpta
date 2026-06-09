import type { APIRoute } from 'astro';
import { buildSitemapXml, createSitemapEntries } from '../utils/sitemap-data.js';

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

export const GET: APIRoute = () => {
  const body = buildSitemapXml(createSitemapEntries(blogPages));

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
