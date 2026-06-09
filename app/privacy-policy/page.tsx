export const metadata = {
  title: "Privacy Policy | AI Success Forum",
  description: "Learn how AI Success Forum collects, uses, and protects your data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-light-200/70">
      <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
      <p className="text-sm text-light-200/40 mb-10">Last updated: June 2026</p>
      <section className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">1. Information We Collect</h2>
          <p>When you subscribe to our newsletter or fill out a contact form, we collect your email address and name. We do not collect any payment information directly.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">2. How We Use Your Information</h2>
          <p>We use your email to send newsletters, updates, and occasional promotional content related to AI tools and career growth. We never sell your data to third parties.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">3. Cookies</h2>
          <p>We use cookies for analytics via Google Analytics to understand how visitors use our site. You can disable cookies in your browser settings at any time.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">4. Third-Party Links</h2>
          <p>Our site contains affiliate links to third-party products. We are not responsible for the privacy practices of those sites.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">5. Contact</h2>
          <p>For privacy-related questions, email us at <a href="mailto:aisuccessforum@gmail.com" className="text-neon-blue hover:underline">aisuccessforum@gmail.com</a>.</p>
        </div>
      </section>
    </main>
  );
}