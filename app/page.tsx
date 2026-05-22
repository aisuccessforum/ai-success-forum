import Link from 'next/link';
import { getFeaturedPosts, getAllPosts } from '@/lib/posts';
import { getFeaturedAffiliates } from '@/lib/affiliates';
import { PostCard } from '@/components/blog/PostCard';
import { AffiliateCard } from '@/components/affiliate/AffiliateCard';
import { NewsletterCTA } from '@/components/ui/NewsletterCTA';
import categories from '@/data/categories.json';
import { generateSEO } from '@/lib/seo';

export const metadata = generateSEO();

export default function HomePage() {
  const featured  = getFeaturedPosts(3);
  const latest    = getAllPosts().slice(0, 6);
  const affiliates = getFeaturedAffiliates(4);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-hero-mesh" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-blue/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-neon-blue/30 bg-neon-blue/5">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
            <span className="text-xs font-mono text-neon-blue/80 tracking-widest uppercase">
              AI Era is Now
            </span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-7xl text-light-50 leading-tight tracking-tight mb-6">
            Master AI.{' '}
            <span className="neon-text block sm:inline">Build Income.</span>
            <br className="hidden sm:block" />
            Shape Your Future.
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-light-200/60 leading-relaxed mb-10">
            The definitive resource for AI tools, career strategies, online business systems,
            and productivity hacks built for the next generation of achievers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/blog" className="btn-neon px-8 py-3.5 rounded-lg text-sm">
              Explore Articles →
            </Link>
            <Link href="/resources" className="btn-ghost px-8 py-3.5 rounded-lg text-sm">
              Free Resources
            </Link>
          </div>

          {/* Stat pills */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs">
            {[
              { value: '500+', label: 'Articles Published' },
              { value: '50K+', label: 'Monthly Readers' },
              { value: '100+', label: 'AI Tools Reviewed' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="font-display font-bold text-2xl neon-text">{s.value}</span>
                <span className="text-light-200/40 font-mono tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display font-bold text-xl text-light-50">
            <span className="neon-text">//</span> Browse Categories
          </h2>
          <Link href="/categories" className="text-xs text-neon-blue/70 hover:text-neon-blue font-mono transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="card-dark rounded-xl p-4 text-center group"
            >
              <div className="text-2xl mb-2">{cat.icon}</div>
              <div className="text-xs font-display font-semibold text-light-200/60 group-hover:text-light-100 transition-colors leading-tight">
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Posts ─────────────────────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-xl text-light-50">
              <span className="neon-text">//</span> Featured Articles
            </h2>
            <Link href="/blog" className="text-xs text-neon-blue/70 hover:text-neon-blue font-mono transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured.map((post) => (
              <PostCard key={post.slug} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* ── Affiliate Picks ────────────────────────────────────────────────────── */}
      {affiliates.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-xl text-light-50">
                <span className="neon-text">//</span> Recommended Tools
              </h2>
              <p className="text-xs text-light-200/40 mt-1 font-mono">
                Affiliate links — we may earn a commission at no extra cost to you.
              </p>
            </div>
            <Link href="/affiliate" className="text-xs text-neon-blue/70 hover:text-neon-blue font-mono transition-colors">
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {affiliates.map((product) => (
              <AffiliateCard key={product.key} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ── Latest Posts ───────────────────────────────────────────────────────── */}
      {latest.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-xl text-light-50">
              <span className="neon-text">//</span> Latest Articles
            </h2>
            <Link href="/blog" className="text-xs text-neon-blue/70 hover:text-neon-blue font-mono transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {latest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* ── Newsletter ─────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <NewsletterCTA />
      </section>
    </>
  );
}
