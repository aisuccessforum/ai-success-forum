'use client';
import { useState } from 'react';
import Link from 'next/link';
import { PostMeta } from '@/types';
import { format } from 'date-fns';

interface SearchBarProps {
  posts: PostMeta[];
}

export function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const results = query.length > 1
    ? posts
        .filter(
          (p) =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()) ||
            p.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  return (
    <div className="relative w-full max-w-lg">
      <div className={`flex items-center gap-2 bg-dark-700 border rounded-lg px-4 py-2.5 transition-colors ${focused ? 'border-neon-blue/50' : 'border-[rgba(0,212,255,0.15)]'}`}>
        <svg className="w-4 h-4 text-neon-blue/50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search articles..."
          className="bg-transparent flex-1 text-sm text-light-200 placeholder-light-200/30 focus:outline-none"
        />
        {query && (
          <button onClick={() => setQuery('')} className="text-light-200/40 hover:text-light-200">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {focused && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-dark-800 border border-[rgba(0,212,255,0.15)] rounded-lg shadow-card overflow-hidden z-50">
          {results.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex items-start gap-3 px-4 py-3 hover:bg-[rgba(0,212,255,0.05)] transition-colors border-b border-[rgba(0,212,255,0.06)] last:border-0"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-light-100 line-clamp-1">{post.title}</p>
                <p className="text-xs text-light-200/50 mt-0.5 line-clamp-1">{post.description}</p>
              </div>
              <span className="text-[10px] text-light-200/30 font-mono flex-shrink-0 mt-0.5">
                {format(new Date(post.date), 'MMM d')}
              </span>
            </Link>
          ))}
        </div>
      )}

      {focused && query.length > 1 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-dark-800 border border-[rgba(0,212,255,0.15)] rounded-lg p-4 text-center z-50">
          <p className="text-sm text-light-200/40">No results for &ldquo;{query}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
