import { NewsletterCTA } from '@/components/ui/NewsletterCTA';
import { generateSEO } from '@/lib/seo';
import siteData from '@/data/site.json';

export const metadata = generateSEO({
  title: 'About',
  description: 'Learn about AI Success Forum and our mission to help you thrive in the AI era.',
  url: '/about',
});

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <span className="text-xs font-mono text-neon-blue/70 uppercase tracking-widest">// Our Story</span>
      <h1 className="font-display font-black text-3xl sm:text-4xl text-light-50 mt-2 mb-8">
        About AI Success Forum
      </h1>

      <div className="prose-dark space-y-6 text-sm leading-relaxed">
        <p>
          AI Success Forum was built for one reason: <strong>the AI revolution is happening fast,
          and most people don&apos;t have a clear roadmap</strong> for how to navigate it.
        </p>
        <p>
          We&apos;re a team of writers, developers, and entrepreneurs who got deeply into AI tools
          early — and saw firsthand how they can transform careers, businesses, and daily productivity.
          We started this platform to share what we&apos;ve learned.
        </p>
        <h2>Our Mission</h2>
        <p>
          To give students, professionals, freelancers, and entrepreneurs the knowledge, tools,
          and strategies to leverage AI for real results, whether that means landing a better job,
          building a profitable online business, or simply getting more done.
        </p>
        <h2>What We Cover</h2>
        <ul>
          <li><strong>AI Tools:</strong> Honest reviews and comparisons of the best AI software.</li>
          <li><strong>Career Growth:</strong> How to use AI to advance your career and income.</li>
          <li><strong>Business & Income:</strong> Online business models powered by AI.</li>
          <li><strong>Productivity:</strong> Workflows and systems to 10x your output.</li>
          <li><strong>Courses & Education:</strong> The best learning resources for AI skills.</li>
          <li><strong>Laptops & Hardware:</strong> Top hardware for AI workflows.</li>
        </ul>
        <h2>Affiliate Disclosure</h2>
        <p>
          Some articles on this site contain affiliate links. When you click and purchase through
          these links, we may earn a commission at no extra cost to you. We only recommend products
          we genuinely believe in our editorial opinions are never influenced by affiliate partnerships.
        </p>
        <h2>Contact Us</h2>
        <p>
          Have a question, partnership inquiry, or content suggestion? Reach us at{' '}
          <a href={`mailto:${siteData.email}`}>{siteData.email}</a>.
        </p>
      </div>

      <div className="mt-16">
        <NewsletterCTA />
      </div>
    </div>
  );
}
