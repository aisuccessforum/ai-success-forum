import { AffiliateProduct } from '@/types';

interface AffiliateCardProps {
  product: AffiliateProduct;
  variant?: 'card' | 'banner' | 'inline';
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <svg
        key={i}
        className={`w-3 h-3 ${i <= Math.round(rating) ? 'text-yellow-400' : 'text-light-200/20'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
    <span className="ml-1 text-[10px] text-light-200/40 font-mono">{rating}</span>
  </div>
);

export function AffiliateCard({ product, variant = 'card' }: AffiliateCardProps) {
  if (variant === 'banner') {
    return (
      <div className="relative rounded-xl overflow-hidden border border-neon-blue/20 bg-gradient-to-r from-dark-800 to-dark-700 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 to-neon-purple/5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            {product.badge && (
              <span className="inline-block mb-2 px-2 py-0.5 rounded text-[10px] font-display font-bold tracking-widest bg-neon-blue/15 border border-neon-blue/30 text-neon-blue uppercase">
                {product.badge}
              </span>
            )}
            <h3 className="text-lg font-display font-bold text-light-50">{product.name}</h3>
            <p className="text-sm text-light-200/60 mt-1">{product.tagline}</p>
            {product.rating && <div className="mt-2"><StarRating rating={product.rating} /></div>}
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
            {product.price && (
              <span className="text-neon-cyan font-mono text-sm font-semibold">{product.price}</span>
            )}
            <a
              href={product.url}
              target="_blank"
              rel={`noopener noreferrer${product.nofollow ? ' nofollow' : ''}`}
              className="btn-neon px-6 py-2.5 rounded-lg text-sm whitespace-nowrap"
            >
              {product.cta} →
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="my-6 rounded-lg border border-neon-blue/15 bg-dark-800/60 p-4 flex items-center gap-4">
        <div className="flex-1">
          <p className="text-xs text-light-200/50 font-mono">RECOMMENDED</p>
          <p className="text-sm font-display font-bold text-light-50 mt-0.5">{product.name}</p>
          <p className="text-xs text-light-200/50 mt-0.5">{product.tagline}</p>
        </div>
        <a
          href={product.url}
          target="_blank"
          rel={`noopener noreferrer${product.nofollow ? ' nofollow' : ''}`}
          className="btn-ghost px-4 py-1.5 rounded-md text-xs whitespace-nowrap"
        >
          {product.cta}
        </a>
      </div>
    );
  }

  // Default: card
  return (
    <div className="card-dark rounded-xl p-5 h-full flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          {product.badge && (
            <span className="inline-block mb-1.5 px-2 py-0.5 rounded text-[10px] font-display font-bold tracking-widest bg-neon-blue/15 border border-neon-blue/30 text-neon-blue uppercase">
              {product.badge}
            </span>
          )}
          <h3 className="text-base font-display font-bold text-light-50">{product.name}</h3>
        </div>
        {product.price && (
          <span className="text-neon-cyan font-mono text-sm font-semibold flex-shrink-0">
            {product.price}
          </span>
        )}
      </div>
      <p className="text-xs text-light-200/60 leading-relaxed flex-1">{product.description}</p>
      {product.rating && <div className="mt-3"><StarRating rating={product.rating} /></div>}
      <a
        href={product.url}
        target="_blank"
        rel={`noopener noreferrer${product.nofollow ? ' nofollow' : ''}`}
        className="mt-4 btn-neon px-4 py-2.5 rounded-lg text-sm text-center block"
      >
        {product.cta} →
      </a>
    </div>
  );
}
