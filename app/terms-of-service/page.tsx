export const metadata = {
  title: "Terms of Service | AI Success Forum",
  description: "Read the terms and conditions for using AI Success Forum.",
};

export default function TermsOfService() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-light-200/70">
      <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
      <p className="text-sm text-light-200/40 mb-10">Last updated: June 2026</p>
      <section className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">1. Acceptance of Terms</h2>
          <p>By accessing AI Success Forum, you agree to these terms. If you do not agree, please do not use the site.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">2. Content Ownership</h2>
          <p>All content on this site including articles, graphics, and branding is owned by AI Success Forum. You may not reproduce or redistribute content without written permission.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">3. Affiliate Links</h2>
          <p>Some links on this site are affiliate links. We may earn a commission if you make a purchase through these links, at no extra cost to you.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">4. Disclaimer</h2>
          <p>Content on AI Success Forum is for informational purposes only. We do not guarantee specific results from any tool, course, or strategy mentioned on this site.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">5. Changes to Terms</h2>
          <p>We reserve the right to update these terms at any time. Continued use of the site after changes means you accept the updated terms.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">6. Contact</h2>
          <p>Questions? Email us at <a href="mailto:aisuccessforum@gmail.com" className="text-neon-blue hover:underline">aisuccessforum@gmail.com</a>.</p>
        </div>
      </section>
    </main>
  );
}