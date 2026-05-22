import Link from 'next/link';
import Image from 'next/image';
import { PostMeta } from '@/types';
import { format } from 'date-fns';
import categories from '@/data/categories.json';

interface PostCardProps {
  post: PostMeta;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const category = categories.find((c) => c.slug === post.category);

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="card-dark rounded-xl overflow-hidden h-full">
          {post.coverImage && (
            <div className="relative h-48 sm:h-56 overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-800/90 to-transparent" />
              {post.featured && (
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-display font-bold tracking-widest bg-neon-blue/20 border border-neon-blue/50 text-neon-blue uppercase">
                  Featured
                </span>
              )}
            </div>
          )}
          <div className="p-5">
            {category && (
              <span className="text-[10px] font-display font-semibold tracking-widest uppercase"
                style={{ color: category.accentColor }}>
                {category.icon} {category.name}
              </span>
            )}
            <h2 className="mt-2 text-base sm:text-lg font-display font-bold text-light-50 group-hover:text-neon-blue transition-colors leading-snug line-clamp-2">
              {post.title}
            </h2>
            <p className="mt-2 text-xs text-light-200/60 line-clamp-2 leading-relaxed">
              {post.description}
            </p>
            <div className="mt-4 flex items-center justify-between text-[10px] text-light-200/40 font-mono">
              <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
              <span>{post.readingTime}</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="card-dark rounded-lg p-4 flex gap-4 items-start">
        {post.coverImage && (
          <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {category && (
            <span className="text-[10px] font-display font-semibold tracking-widest uppercase"
              style={{ color: category.accentColor }}>
              {category.name}
            </span>
          )}
          <h3 className="mt-1 text-sm font-display font-bold text-light-50 group-hover:text-neon-blue transition-colors leading-snug line-clamp-2">
            {post.title}
          </h3>
          <div className="mt-2 flex items-center gap-3 text-[10px] text-light-200/40 font-mono">
            <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
