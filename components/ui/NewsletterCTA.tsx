'use client';
import { useState } from 'react';
import siteData from '@/data/site.json';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwgpHKMIgiKyKa7XoD9MTqFOpyqwnOT2W2Wn3gS40C2-K40_9UAX3qgK5ttXrqTVFqc/exec'; // paste your URL here

export function NewsletterCTA({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (compact) {
    return (
      <div className="rounded-xl border border-neon-blue/20 bg-gradient-to-r from-dark-800 to-dark-700 p-5">
        <h3 className="font-display font-bold text-base text-light-50 mb-1">
          {siteData.newsletter.heading}
        </h3>
        <p className="text-xs text-light-200/60 mb-3">{siteData.newsletter.subheading}</p>
        {status === 'success' ? (
          <p className="text-sm text-neon-cyan font-mono">You are in! Check your inbox.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={siteData.newsletter.placeholder}
              required
              disabled={status === 'loading'}
              className="flex-1 min-w-0 bg-dark-700 border border-[rgba(0,212,255,0.15)] rounded-md px-3 py-2 text-xs text-light-200 placeholder-light-200/30 focus:outline-none focus:border-neon-blue/50 transition-colors disabled:opacity-50"
            />
            <button type="submit" disabled={status === 'loading'} className="btn-neon px-3 py-2 rounded-md text-xs whitespace-nowrap disabled:opacity-50">
              {status === 'loading' ? '...' : siteData.newsletter.cta}
            </button>
          </form>
        )}
        {status === 'error' && <p className="text-xs text-red-400 mt-2">Something went wrong. Please try again.</p>}
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-dark-800 to-neon-purple/10" />
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative border border-neon-blue/20 rounded-2xl px-6 sm:px-12 py-12 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-gradient-to-b from-neon-blue/10 to-transparent" />

        <span className="inline-block font-mono text-xs text-neon-blue/70 uppercase tracking-widest mb-3">
          Free Newsletter
        </span>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-light-50 mb-3">
          {siteData.newsletter.heading}
        </h2>
        <p className="text-sm text-light-200/60 max-w-md mx-auto mb-8 leading-relaxed">
          {siteData.newsletter.subheading}
        </p>

        {status === 'success' ? (
          <div className="inline-flex items-center gap-2 bg-neon-blue/10 border border-neon-blue/30 rounded-full px-6 py-3">
            <span className="text-neon-cyan">✓</span>
            <span className="text-sm font-display text-neon-cyan">You are subscribed! Welcome aboard.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={siteData.newsletter.placeholder}
              required
              disabled={status === 'loading'}
              className="flex-1 bg-dark-700 border border-[rgba(0,212,255,0.15)] rounded-lg px-4 py-3 text-sm text-light-200 placeholder-light-200/30 focus:outline-none focus:border-neon-blue/50 transition-colors disabled:opacity-50"
            />
            <button type="submit" disabled={status === 'loading'} className="btn-neon px-6 py-3 rounded-lg text-sm whitespace-nowrap disabled:opacity-50">
              {status === 'loading' ? 'Submitting...' : siteData.newsletter.cta}
            </button>
          </form>
        )}
        {status === 'error' && <p className="text-sm text-red-400 mt-3">Something went wrong. Please try again.</p>}
        <p className="mt-3 text-[10px] text-light-200/30">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}