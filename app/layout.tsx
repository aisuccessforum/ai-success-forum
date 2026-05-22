import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import siteData from '@/data/site.json';

export const metadata: Metadata = {
  title: {
    default: `${siteData.name} — ${siteData.tagline}`,
    template: `%s | ${siteData.name}`,
  },
  description: siteData.description,
  metadataBase: new URL(siteData.url),
  openGraph: {
    type: 'website',
    siteName: siteData.name,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-900 text-light-200 font-body antialiased">
        <div className="relative min-h-screen flex flex-col">
          {/* Global grid background */}
          <div className="fixed inset-0 grid-bg opacity-100 pointer-events-none z-0" />
          {/* Top neon glow */}
          <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent z-50" />
          <Header />
          <main className="relative z-10 flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
