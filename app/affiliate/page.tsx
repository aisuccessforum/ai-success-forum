import { getAllAffiliates, getAffiliatesByCategory } from '@/lib/affiliates';
import { AffiliateCard } from '@/components/affiliate/AffiliateCard';
import { NewsletterCTA } from '@/components/ui/NewsletterCTA';
import { generateSEO } from '@/lib/seo';
import categories from '@/data/categories.json';

export const metadata = generateSEO({
  title: 'Affiliate Recommendations',
  description: 'Our top-rated AI tools, courses, laptops, and software tested and recommended.',
  url: '/affiliate',
});

export default function AffiliatePage() {
  const all = getAllAffiliates();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <span className="text-xs font-mono text-neon-blue/70 uppercase tracking-widest">// Our Picks</span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-light-50 mt-2 mb-3">
          Recommended Tools & Resources
        </h1>
        <p className="text-sm text-light-200/60 max-w-2xl mb-3">
          We only recommend tools we&apos;ve tested or thoroughly researched. Some links are affiliate links and we may earn a commission at no extra cost to you.
        </p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-yellow-400/20 bg-yellow-400/5 text-xs text-yellow-400/70 font-mono">
          ⚠️ Affiliate Disclosure: Links on this page may earn us a commission.
        </div>
      </div>

      {/* By Category */}
      {categories.map((cat) => {
        const catProducts = all.filter((p) => p.category === cat.slug);
        if (catProducts.length === 0) return null;
        return (
          <section key={cat.slug} className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">{cat.icon}</span>
              <h2 className="font-display font-bold text-lg text-light-50">{cat.name}</h2>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${cat.accentColor}40, transparent)` }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {catProducts.map((product) => (
                <AffiliateCard key={product.key} product={product} />
              ))}
            </div>
          </section>
        );
      })}

      <div className="mt-8">
        <NewsletterCTA />
      </div>
    </div>
  );
}
