import affiliateData from '@/data/affiliates.json';
import { AffiliateProduct } from '@/types';

const products = affiliateData.products as Record<string, AffiliateProduct>;

export function getAffiliateProduct(key: string): AffiliateProduct | null {
  return products[key] ?? null;
}

export function getAffiliateProducts(keys: string[]): AffiliateProduct[] {
  return keys
    .map((k) => getAffiliateProduct(k))
    .filter((p): p is AffiliateProduct => p !== null);
}

export function getFeaturedAffiliates(count = 4): AffiliateProduct[] {
  return Object.values(products)
    .filter((p) => p.featured)
    .slice(0, count);
}

export function getAffiliatesByCategory(category: string): AffiliateProduct[] {
  return Object.values(products).filter(
    (p) => p.category === category || p.category === 'general'
  );
}

export function getAllAffiliates(): AffiliateProduct[] {
  return Object.values(products);
}
