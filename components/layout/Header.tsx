'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import categories from '@/data/categories.json';

const navLinks = [
  { label: 'Blog',       href: '/blog' },
  { label: 'Categories', href: '/categories' },
  { label: 'Resources',  href: '/resources' },
  { label: 'Affiliate',  href: '/affiliate' },
  { label: 'About',      href: '/about' },
  { label: 'Contact',    href: '/contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-[rgba(0,212,255,0.12)] bg-dark-900/80 backdrop-blur-md sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-neon-blue/30 group-hover:ring-neon-blue/70 transition-all">
              <Image
                src="/images/logos/logo.png"
                alt="AI Success Forum"
                width={40}
                height={40}
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <span className="font-display font-bold text-sm sm:text-base tracking-wide neon-text hidden xs:block">
              AI Success Forum
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.label === 'Categories' ? (
                <div key={link.href} className="relative">
                  <button
                    onMouseEnter={() => setCatOpen(true)}
                    onMouseLeave={() => setCatOpen(false)}
                    className="px-3 py-2 text-sm text-light-200/70 hover:text-neon-blue transition-colors font-medium flex items-center gap-1"
                  >
                    {link.label}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {catOpen && (
                    <div
                      onMouseEnter={() => setCatOpen(true)}
                      onMouseLeave={() => setCatOpen(false)}
                      className="absolute top-full left-0 mt-0 w-56 bg-dark-800 border border-[rgba(0,212,255,0.15)] rounded-lg shadow-card overflow-hidden"
                    >
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/categories/${cat.slug}`}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-light-200/70 hover:text-neon-blue hover:bg-[rgba(0,212,255,0.05)] transition-colors"
                        >
                          <span>{cat.icon}</span>
                          <span>{cat.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm text-light-200/70 hover:text-neon-blue transition-colors font-medium"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/resources"
              className="hidden sm:inline-flex btn-neon px-4 py-2 rounded-md text-sm"
            >
              Free Resources
            </Link>
            <button
              className="lg:hidden p-2 text-light-200/70 hover:text-neon-blue"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-dark-800 border-t border-[rgba(0,212,255,0.12)]">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-sm text-light-200/70 hover:text-neon-blue hover:bg-[rgba(0,212,255,0.05)] rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-[rgba(0,212,255,0.12)]">
              <Link
                href="/resources"
                onClick={() => setOpen(false)}
                className="block btn-neon px-4 py-2 rounded-md text-sm text-center"
              >
                Free Resources
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
