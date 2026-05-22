'use client';
import { useState } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareLinks = [
    {
      label: 'X',
      href: `https://x.com/intent/tweet?url=${encoded}&text=${encodedTitle}`,
      color: 'hover:text-sky-400',
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encoded}&title=${encodedTitle}`,
      color: 'hover:text-blue-400',
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-light-200/40 font-mono mr-1">SHARE:</span>
      {shareLinks.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-3 py-1.5 text-xs border border-[rgba(0,212,255,0.15)] rounded-md text-light-200/50 ${s.color} hover:border-current transition-colors`}
        >
          {s.label}
        </a>
      ))}
      <button
        onClick={copyLink}
        className="px-3 py-1.5 text-xs border border-[rgba(0,212,255,0.15)] rounded-md text-light-200/50 hover:text-neon-blue hover:border-neon-blue/40 transition-colors"
      >
        {copied ? '✓ Copied!' : 'Copy Link'}
      </button>
    </div>
  );
}
