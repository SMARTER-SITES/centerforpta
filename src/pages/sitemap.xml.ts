import type { APIRoute } from 'astro';
import { buildSitemapXml, createSitemapEntries, staticLastmod } from '../utils/sitemap-data.js';

const blogModules = import.meta.glob('./blog/*.md', { eager: true }) as Record<
  string,
  { frontmatter?: { date?: string | Date } }
>;
const serbianBlogModules = import.meta.glob('./sr/blog/*.md', { eager: true });
const postsPerPage = 6;

const blogPages = Object.entries(blogModules).map(([file, module]) => {
  const slug = file.replace('./blog/', '').replace(/\.md$/, '');
  const rawDate = module.frontmatter?.date;
  const lastmod = rawDate ? new Date(rawDate).toISOString() : undefined;
  const hasSerbianVersion = `./sr/blog/${slug}.md` in serbianBlogModules;

  return {
    path: `/blog/${slug}/`,
    lastmod,
    alternates: hasSerbianVersion
  };
});
const totalBlogPages = Math.max(1, Math.ceil(Object.keys(blogModules).length / postsPerPage));
const totalSerbianBlogPages = Math.max(1, Math.ceil(Object.keys(serbianBlogModules).length / postsPerPage));
const maxPaginatedBlogPages = Math.max(totalBlogPages, totalSerbianBlogPages);
const paginatedBlogPages = Array.from({ length: Math.max(0, maxPaginatedBlogPages - 1) }, (_, index) => {
  const page = index + 2;
  const entries = [];

  if (page <= totalBlogPages) {
    entries.push({
      path: `/blog/page/${page}/`,
      lastmod: staticLastmod,
      alternates: page <= totalSerbianBlogPages
    });
  }

  if (page > totalBlogPages && page <= totalSerbianBlogPages) {
    entries.push({
      path: `/sr/blog/page/${page}/`,
      lastmod: staticLastmod,
      alternates: false
    });
  }

  return entries;
}).flat();

export const GET: APIRoute = () => {
  const body = buildSitemapXml(createSitemapEntries([...blogPages, ...paginatedBlogPages]));

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
