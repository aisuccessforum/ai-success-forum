import { notFound } from 'next/navigation';
import { getPostsByCategory } from '@/lib/posts';
import { PostCard } from '@/components/blog/PostCard';
import { NewsletterCTA } from '@/components/ui/NewsletterCTA';
import { generateSEO } from '@/lib/seo';
import categories from '@/data/categories.json';
import { CategorySlug } from '@/types';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const cat = categories.find((c) => c.slug === params.slug);
  if (!cat) return {};
  return generateSEO({
    title: cat.name,
    description: cat.description,
    url: `/categories/${cat.slug}`,
  });
}

export default function CategoryPage({ params }: Props) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const posts = getPostsByCategory(params.slug as CategorySlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="text-5xl mb-4">{category.icon}</div>
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: category.accentColor }}>
          // Category
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-light-50 mt-1 mb-3">
          {category.name}
        </h1>
        <p className="text-sm text-light-200/60 max-w-xl">{category.description}</p>
        <p className="mt-2 text-xs font-mono text-light-200/30">{posts.length} articles</p>
      </div>

      {/* Glow line */}
      <div className="h-px w-full mb-8" style={{ background: `linear-gradient(90deg, transparent, ${category.accentColor}60, transparent)` }} />

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🚧</p>
          <p className="font-display text-light-200/50">No articles yet in this category.</p>
          <p className="text-xs text-light-200/30 mt-2 font-mono">Check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} featured />
          ))}
        </div>
      )}

      <div className="mt-16">
        <NewsletterCTA />
      </div>
    </div>
  );
}
