import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { getAffiliateProducts } from '@/lib/affiliates';
import { AffiliateCard } from '@/components/affiliate/AffiliateCard';
import { PostCard } from '@/components/blog/PostCard';
import { NewsletterCTA } from '@/components/ui/NewsletterCTA';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { generateSEO } from '@/lib/seo';
import categories from '@/data/categories.json';
import siteData from '@/data/site.json';
import { format } from 'date-fns';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return generateSEO({
    title: post.title,
    description: post.description,
    image: post.coverImage,
    url: `/blog/${post.slug}`,
    type: 'article',
    article: {
      publishedTime: post.date,
      modifiedTime: post.updated,
      author: post.author,
      tags: post.tags,
    },
  });
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(params.slug, 3);
  const affiliates = post.affiliate ? getAffiliateProducts(post.affiliate) : [];
  const category = categories.find((c) => c.slug === post.category);
  const postUrl = `${siteData.url}/blog/${post.slug}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
        {/* ── Main Content ───────────────────────────────────────────────────── */}
        <article>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-mono text-light-200/40 mb-6">
            <Link href="/" className="hover:text-neon-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-neon-blue transition-colors">Blog</Link>
            {category && (
              <>
                <span>/</span>
                <Link href={`/categories/${category.slug}`} className="hover:text-neon-blue transition-colors">
                  {category.name}
                </Link>
              </>
            )}
          </nav>

          {/* Category badge */}
          {category && (
            <Link href={`/categories/${category.slug}`}>
              <span className="inline-block mb-4 text-[10px] font-display font-bold tracking-widest uppercase px-2 py-0.5 rounded border"
                style={{ color: category.accentColor, borderColor: `${category.accentColor}40`, backgroundColor: `${category.accentColor}10` }}>
                {category.icon} {category.name}
              </span>
            </Link>
          )}

          {/* Title */}
          <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-light-50 leading-tight mb-4">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-xs font-mono text-light-200/40">
            <span>By <span className="text-neon-blue/70">{post.author}</span></span>
            <span>·</span>
            <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
            {post.updated && <><span>·</span><span>Updated {format(new Date(post.updated), 'MMM d, yyyy')}</span></>}
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono border border-[rgba(0,212,255,0.12)] text-light-200/40">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Cover image */}
          {post.coverImage && (
            <div className="relative w-full h-56 sm:h-80 rounded-xl overflow-hidden mb-8 border border-[rgba(0,212,255,0.12)]">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
            </div>
          )}

          {/* Affiliate banner (if products) */}
          {affiliates.length === 1 && (
            <div className="mb-8">
              <AffiliateCard product={affiliates[0]} variant="banner" />
            </div>
          )}

          {/* Article content */}
          <div
            className="prose-dark"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Multiple affiliates at end */}
          {affiliates.length > 1 && (
            <div className="mt-10">
              <h3 className="font-display font-bold text-base text-neon-blue mb-4">// Recommended Tools</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {affiliates.map((p) => (
                  <AffiliateCard key={p.key} product={p} />
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="mt-10 pt-6 border-t border-[rgba(0,212,255,0.1)]">
            <ShareButtons url={postUrl} title={post.title} />
          </div>
        </article>

        {/* ── Sidebar ────────────────────────────────────────────────────────── */}
        <aside className="hidden lg:block space-y-6 mt-8">
          <NewsletterCTA compact />

          {/* Single affiliate sidebar */}
          {affiliates.length === 1 && (
            <AffiliateCard product={affiliates[0]} variant="card" />
          )}

          {/* Related posts */}
          {related.length > 0 && (
            <div>
              <h4 className="font-display text-xs font-semibold text-neon-blue uppercase tracking-widest mb-3">
                Related Articles
              </h4>
              <div className="space-y-2">
                {related.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Related posts (mobile) */}
      {related.length > 0 && (
        <section className="lg:hidden mt-12">
          <h3 className="font-display font-bold text-base text-light-50 mb-4">
            <span className="neon-text">//</span> Related Articles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} featured />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter (mobile) */}
      <div className="lg:hidden mt-10">
        <NewsletterCTA />
      </div>
    </div>
  );
}
