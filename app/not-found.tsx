import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center text-center px-4">
      <div>
        <div className="font-display font-black text-8xl neon-text opacity-30 mb-4">404</div>
        <h1 className="font-display font-bold text-2xl text-light-50 mb-3">Page Not Found</h1>
        <p className="text-sm text-light-200/50 mb-8 max-w-sm mx-auto">
          This page doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-neon px-6 py-2.5 rounded-lg text-sm">← Go Home</Link>
          <Link href="/blog" className="btn-ghost px-6 py-2.5 rounded-lg text-sm">Browse Articles</Link>
        </div>
      </div>
    </div>
  );
}
