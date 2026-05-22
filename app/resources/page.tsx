import Link from 'next/link';
import { getFeaturedAffiliates } from '@/lib/affiliates';
import { AffiliateCard } from '@/components/affiliate/AffiliateCard';
import { NewsletterCTA } from '@/components/ui/NewsletterCTA';
import { generateSEO } from '@/lib/seo';

export const metadata = generateSEO({
  title: 'Free Resources',
  description: 'Free guides, checklists, and tools to help you succeed with AI.',
  url: '/resources',
});

const freeResources = [
  {
    emoji: '🤖',
    title: 'The Ultimate AI Tools Starter Guide',
    description: 'The 10 AI tools every professional needs — with use cases and setup tips.',
    cta: 'Download Free',
    color: '#00D4FF',
  },
  {
    emoji: '💼',
    title: 'AI Freelancer Launch Checklist',
    description: 'Step-by-step checklist to launch a profitable AI freelancing service in 30 days.',
    cta: 'Get Checklist',
    color: '#00FF88',
  },
  {
    emoji: '📊',
    title: 'Prompt Engineering Cheat Sheet',
    description: '50+ proven prompts for writing, coding, research, marketing, and business.',
    cta: 'Download Now',
    color: '#7B2FFF',
  },
  {
    emoji: '🚀',
    title: 'AI Career Roadmap 2025',
    description: 'The skills, tools, and certifications to land an AI-adjacent role this year.',
    cta: 'Get Roadmap',
    color: '#FF2DD4',
  },
];

export default function ResourcesPage() {
  const tools = getFeaturedAffiliates(6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <span className="text-xs font-mono text-neon-blue/70 uppercase tracking-widest">// Free Downloads</span>
      <h1 className="font-display font-black text-3xl sm:text-4xl text-light-50 mt-2 mb-3">
        Free Resources & Guides
      </h1>
      <p className="text-sm text-light-200/60 max-w-xl mb-10">
        Everything you need to get started —- free guides, checklists, templates, and tools.
      </p>

      {/* Free resource cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
        {freeResources.map((r) => (
          <div key={r.title} className="card-dark rounded-xl p-6">
            <span className="text-3xl block mb-3">{r.emoji}</span>
            <h2 className="font-display font-bold text-base text-light-50 mb-2">{r.title}</h2>
            <p className="text-xs text-light-200/60 leading-relaxed mb-4">{r.description}</p>
            <button
              className="btn-ghost px-4 py-2 rounded-md text-xs"
              style={{ borderColor: `${r.color}50`, color: r.color }}
            >
              {r.cta} ↓
            </button>
          </div>
        ))}
      </div>

      {/* Recommended paid tools */}
      <div className="mb-12">
        <h2 className="font-display font-bold text-xl text-light-50 mb-2">
          <span className="neon-text">//</span> Top Recommended Tools
        </h2>
        <p className="text-xs text-light-200/40 font-mono mb-6">
          Affiliate links — we may earn a commission.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((t) => (
            <AffiliateCard key={t.key} product={t} />
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/affiliate" className="text-xs text-neon-blue/70 hover:text-neon-blue font-mono transition-colors">
            View all recommendations →
          </Link>
        </div>
      </div>

      <NewsletterCTA />
    </div>
  );
}
