import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { generateSEO } from '@/lib/seo';
import categories from '@/data/categories.json';

export const metadata = generateSEO({
  title: 'Categories',
  description: 'Browse all content categories on AI Success Forum.',
  url: '/categories',
});

export default function CategoriesPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <span className="text-xs font-mono text-neon-blue/70 uppercase tracking-widest">// Browse</span>
      <h1 className="font-display font-black text-3xl sm:text-4xl text-light-50 mt-2 mb-3">
        All Categories
      </h1>
      <p className="text-sm text-light-200/60 max-w-xl mb-10">
        Explore our content by topic — from AI tools and career growth to business systems and motivation.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const count = posts.filter((p) => p.category === cat.slug).length;
          return (
            <Link key={cat.slug} href={`/categories/${cat.slug}`} className="group">
              <div className="card-dark rounded-xl p-6 h-full">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{cat.icon}</span>
                  <span className="text-xs font-mono text-light-200/30">{count} articles</span>
                </div>
                <h2 className="font-display font-bold text-base text-light-50 group-hover:text-neon-blue transition-colors mb-2"
                  style={{ textShadow: `0 0 20px ${cat.accentColor}00` }}>
                  {cat.name}
                </h2>
                <p className="text-xs text-light-200/50 leading-relaxed">{cat.description}</p>
                <div className="mt-4 text-xs font-mono transition-colors"
                  style={{ color: cat.accentColor }}>
                  Browse {cat.name} →
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
