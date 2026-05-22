// ─── Post Types ────────────────────────────────────────────────────────────────
export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;           // "YYYY-MM-DD"
  updated?: string;       // "YYYY-MM-DD"
  author: string;
  category: CategorySlug;
  tags: string[];
  featured?: boolean;
  coverImage?: string;    // path relative to /public
  affiliate?: string[];   // affiliate product keys from affiliates.json
  readingTime?: string;
  draft?: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;        // HTML string
  readingTime: string;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: string;
}

// ─── Category Types ─────────────────────────────────────────────────────────
export type CategorySlug =
  | 'ai-tools'
  | 'career-growth'
  | 'business-income'
  | 'productivity'
  | 'motivation'
  | 'courses'
  | 'laptops';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;           // emoji or icon name
  color: string;          // Tailwind color class
  accentColor: string;    // hex for inline styles
}

// ─── Affiliate Types ─────────────────────────────────────────────────────────
export interface AffiliateProduct {
  key: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  cta: string;            // button label
  logo?: string;
  badge?: string;         // "Top Pick" | "Best Value" | etc.
  price?: string;         // "$29/mo" etc.
  rating?: number;        // 1-5
  category: CategorySlug | 'general';
  tags: string[];
  featured: boolean;
  nofollow: boolean;      // always true for affiliate links
}

export interface AffiliateData {
  products: Record<string, AffiliateProduct>;
}

// ─── Site Config Types ───────────────────────────────────────────────────────
export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  author: string;
  email: string;
  social: {
    twitter?: string;
    youtube?: string;
    linkedin?: string;
    instagram?: string;
  };
  newsletter: {
    heading: string;
    subheading: string;
    placeholder: string;
    cta: string;
  };
}

// ─── Navigation Types ────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
