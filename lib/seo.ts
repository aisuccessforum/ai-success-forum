import { Metadata } from 'next';
import siteData from '@/data/site.json';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
}

export function generateSEO({
  title,
  description,
  image,
  url,
  type = 'website',
  article,
}: SEOProps = {}): Metadata {
  const siteTitle = title
    ? `${title} | ${siteData.name}`
    : `${siteData.name} — ${siteData.tagline}`;
  const siteDesc = description ?? siteData.description;
  const siteUrl  = `${siteData.url}${url ?? ''}`;
  const ogImage  = image ?? '/images/og-default.png';

  return {
    title: siteTitle,
    description: siteDesc,
    metadataBase: new URL(siteData.url),
    alternates: { canonical: siteUrl },
    openGraph: {
      title: siteTitle,
      description: siteDesc,
      url: siteUrl,
      siteName: siteData.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteTitle }],
      type,
      ...(article && {
        publishedTime: article.publishedTime,
        modifiedTime:  article.modifiedTime,
        authors:       article.author ? [article.author] : undefined,
        tags:          article.tags,
      }),
    },
    twitter: {
      card:        'summary_large_image',
      title:       siteTitle,
      description: siteDesc,
      images:      [ogImage],
    },
    robots: {
      index:  true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}
