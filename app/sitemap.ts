import { getAllPostSlugs } from '@/lib/posts';
import siteData from '@/data/site.json';
import categories from '@/data/categories.json';

export default function sitemap() {
  const base = siteData.url;
  const slugs = getAllPostSlugs();

  const staticPages = [
    { url: base, lastModified: new Date(), priority: 1.0 },
    { url: `${base}/blog`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/categories`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/resources`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/affiliate`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/about`, lastModified: new Date(), priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), priority: 0.5 },
  ];

  const categoryPages = categories.map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  const postPages = slugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...postPages];
}
