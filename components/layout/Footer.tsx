import Image from 'next/image';
import Link from 'next/link';
import siteData from '@/data/site.json';
import categories from '@/data/categories.json';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-[rgba(0,212,255,0.12)] bg-dark-950 mt-20">
      {/* Top glow line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-blue/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-neon-blue/30">
                <Image
                  src="/images/logos/logo.png"
                  alt="AI Success Forum"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <span className="font-display font-bold text-sm neon-text">AI Success Forum</span>
            </Link>
            <p className="text-xs text-light-200/50 leading-relaxed mb-4">
              {siteData.description}
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {siteData.social.twitter && (
                <a href={siteData.social.twitter} target="_blank" rel="noopener noreferrer"
                  className="text-light-200/40 hover:text-neon-blue transition-colors text-sm">X</a>
              )}
              {siteData.social.youtube && (
                <a href={siteData.social.youtube} target="_blank" rel="noopener noreferrer"
                  className="text-light-200/40 hover:text-neon-blue transition-colors text-sm">YT</a>
              )}
              {siteData.social.linkedin && (
                <a href={siteData.social.linkedin} target="_blank" rel="noopener noreferrer"
                  className="text-light-200/40 hover:text-neon-blue transition-colors text-sm">LI</a>
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-xs font-semibold text-neon-blue uppercase tracking-widest mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categories/${cat.slug}`}
                    className="text-xs text-light-200/50 hover:text-neon-blue transition-colors flex items-center gap-1.5">
                    <span>{cat.icon}</span> {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xs font-semibold text-neon-blue uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Blog', href: '/blog' },
                { label: 'Resources', href: '/resources' },
                { label: 'Affiliate Picks', href: '/affiliate' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-light-200/50 hover:text-neon-blue transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-xs font-semibold text-neon-blue uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-2">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
                { label: 'Cookie Policy', href: '/cookies' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-light-200/50 hover:text-neon-blue transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[rgba(0,212,255,0.08)] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-light-200/30">
            © {year} {siteData.name}. All rights reserved.
          </p>
          <p className="text-xs text-light-200/30">
            This site contains affiliate links. We may earn a commission.
          </p>
        </div>
      </div>
    </footer>
  );
}
