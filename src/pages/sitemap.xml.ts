import type { APIRoute } from 'astro';
import { buildSitemapXml, createSitemapEntries } from '../utils/sitemap-data.js';

type BlogModule = {
  frontmatter?: {
    date?: string | Date;
    updatedDate?: string | Date;
    srPath?: string;
    enPath?: string;
  };
};

const blogModules = import.meta.glob('./blog/*.md', { eager: true }) as Record<string, BlogModule>;
const serbianBlogModules = import.meta.glob('./sr/blog/*.md', { eager: true }) as Record<string, BlogModule>;
const postsPerPage = 6;

function getLastmod(module?: BlogModule) {
  const rawDate = module?.frontmatter?.updatedDate ?? module?.frontmatter?.date;
  return rawDate ? new Date(rawDate).toISOString() : undefined;
}

function getMostRecentLastmod(...dates: Array<string | undefined>) {
  const validDates = dates.filter((date): date is string => Boolean(date));
  return validDates.length > 0 ? validDates.sort().at(-1) : undefined;
}

const pairedSerbianFiles = new Set<string>();
const blogPages = Object.entries(blogModules).map(([file, module]) => {
  const slug = file.replace('./blog/', '').replace(/\.md$/, '');
  const explicitSerbianPath = module.frontmatter?.srPath;
  const serbianSlug = explicitSerbianPath
    ? explicitSerbianPath.replace(/^\/sr\/blog\//, '').replace(/\/$/, '')
    : slug;
  const serbianFile = `./sr/blog/${serbianSlug}.md`;
  const serbianModule = serbianBlogModules[serbianFile];
  const hasSerbianVersion = Boolean(serbianModule);
  const lastmod = getMostRecentLastmod(getLastmod(module), getLastmod(serbianModule));

  if (hasSerbianVersion) {
    pairedSerbianFiles.add(serbianFile);
  }

  return {
    path: `/blog/${slug}/`,
    lastmod,
    alternates: hasSerbianVersion,
    alternatePath: hasSerbianVersion ? explicitSerbianPath || `/sr/blog/${serbianSlug}/` : undefined
  };
});
const serbianOnlyBlogPages = Object.entries(serbianBlogModules)
  .filter(([file]) => !pairedSerbianFiles.has(file))
  .map(([file, module]) => {
    const slug = file.replace('./sr/blog/', '').replace(/\.md$/, '');
    return {
      path: `/sr/blog/${slug}/`,
      lastmod: getLastmod(module),
      alternates: false
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
      alternates: page <= totalSerbianBlogPages
    });
  }

  if (page > totalBlogPages && page <= totalSerbianBlogPages) {
    entries.push({
      path: `/sr/blog/page/${page}/`,
      alternates: false
    });
  }

  return entries;
}).flat();

export const GET: APIRoute = () => {
  const body = buildSitemapXml(
    createSitemapEntries([...blogPages, ...serbianOnlyBlogPages, ...paginatedBlogPages])
  );

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
