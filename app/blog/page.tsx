import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/blog/PostCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { NewsletterCTA } from '@/components/ui/NewsletterCTA';
import { generateSEO } from '@/lib/seo';
import categories from '@/data/categories.json';
import Link from 'next/link';

export const metadata = generateSEO({
  title: 'Blog',
  description: 'Articles on AI tools, career growth, online business, and productivity.',
  url: '/blog',
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <span className="text-xs font-mono text-neon-blue/70 uppercase tracking-widest">// Articles</span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-light-50 mt-2 mb-4">
          The AI Success Blog
        </h1>
        <p className="text-sm text-light-200/60 max-w-xl mb-6">
          Practical guides, tool reviews, and strategies to help you thrive in the AI era.
        </p>
        <SearchBar posts={posts} />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link href="/blog" className="px-3 py-1.5 rounded-full text-xs font-mono border border-neon-blue/50 text-neon-blue bg-neon-blue/10">
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="px-3 py-1.5 rounded-full text-xs font-mono border border-[rgba(0,212,255,0.15)] text-light-200/50 hover:border-neon-blue/40 hover:text-neon-blue transition-colors"
          >
            {cat.icon} {cat.name}
          </Link>
        ))}
      </div>

      {/* Posts grid */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">📝</p>
          <p className="font-display text-light-200/50">No articles yet. Check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} featured />
          ))}
        </div>
      )}

      {/* Newsletter */}
      <div className="mt-16">
        <NewsletterCTA />
      </div>
    </div>
  );
}
