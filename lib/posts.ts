import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import readingTime from 'reading-time';
import { Post, PostFrontmatter, PostMeta } from '@/types';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

// ─── Get all post slugs ───────────────────────────────────────────────────────
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => f.replace(/\.(md|mdx)$/, ''));
}

// ─── Get all posts metadata (no HTML content, fast) ──────────────────────────
export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostMeta(slug))
    .filter((p): p is PostMeta => p !== null && !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

// ─── Get post metadata only ───────────────────────────────────────────────────
export function getPostMeta(slug: string): PostMeta | null {
  try {
    const filePath = path.join(POSTS_DIR, `${slug}.md`);
    const mdxPath  = path.join(POSTS_DIR, `${slug}.mdx`);
    const realPath = fs.existsSync(filePath) ? filePath : mdxPath;
    const raw = fs.readFileSync(realPath, 'utf8');
    const { data, content } = matter(raw);
    const rt = readingTime(content);
    return {
      ...(data as PostFrontmatter),
      slug,
      readingTime: rt.text,
    };
  } catch {
    return null;
  }
}

// ─── Get full post with HTML content ─────────────────────────────────────────
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(POSTS_DIR, `${slug}.md`);
    const mdxPath  = path.join(POSTS_DIR, `${slug}.mdx`);
    const realPath = fs.existsSync(filePath) ? filePath : mdxPath;
    const raw = fs.readFileSync(realPath, 'utf8');
    const { data, content } = matter(raw);
    const rt = readingTime(content);
    const processed = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(content);
    return {
      ...(data as PostFrontmatter),
      slug,
      content: processed.toString(),
      readingTime: rt.text,
    };
  } catch {
    return null;
  }
}

// ─── Get posts by category ────────────────────────────────────────────────────
export function getPostsByCategory(categorySlug: string): PostMeta[] {
  return getAllPosts().filter((p) => p.category === categorySlug);
}

// ─── Get featured posts ───────────────────────────────────────────────────────
export function getFeaturedPosts(count = 3): PostMeta[] {
  const featured = getAllPosts().filter((p) => p.featured);
  if (featured.length >= count) return featured.slice(0, count);
  // Backfill with latest non-featured if not enough
  const rest = getAllPosts().filter((p) => !p.featured);
  return [...featured, ...rest].slice(0, count);
}

// ─── Get related posts ────────────────────────────────────────────────────────
export function getRelatedPosts(currentSlug: string, count = 3): PostMeta[] {
  const current = getPostMeta(currentSlug);
  if (!current) return [];
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      post: p,
      score:
        (p.category === current.category ? 3 : 0) +
        (p.tags?.filter((t) => current.tags?.includes(t)).length || 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((r) => r.post);
}

// ─── Search posts ─────────────────────────────────────────────────────────────
export function searchPosts(query: string): PostMeta[] {
  const q = query.toLowerCase();
  return getAllPosts().filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
  );
}
