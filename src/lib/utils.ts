import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Product, ShoppingListItem, AisleGroup, ProductCategory } from './types';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Groups shopping list items by aisle (ascending), then within each aisle
 * sorts by shelf number then by side (right before left follows a natural
 * supermarket route: items on the right are typically encountered first
 * when walking down an aisle from the entrance end).
 */
export function sortShoppingList(
  items: ShoppingListItem[],
  products: Product[]
): AisleGroup[] {
  const productMap = new Map<string, Product>(products.map(p => [p.id, p]));

  const resolved = items
    .map(item => ({ listItem: item, product: productMap.get(item.productId) }))
    .filter(
      (r): r is { listItem: ShoppingListItem; product: Product } =>
        r.product !== undefined
    );

  // Group by aisle, use the first product's category as the aisle label
  const aisleMap = new Map<number, AisleGroup>();
  for (const { listItem, product } of resolved) {
    const existing = aisleMap.get(product.aisle);
    if (existing) {
      existing.items.push({ product, listItem });
    } else {
      aisleMap.set(product.aisle, {
        aisle: product.aisle,
        category: product.category,
        items: [{ product, listItem }],
      });
    }
  }

  return Array.from(aisleMap.values())
    .sort((a, b) => a.aisle - b.aisle)
    .map(group => ({
      ...group,
      items: group.items.sort((a, b) => {
        if (a.product.shelf !== b.product.shelf) {
          return a.product.shelf - b.product.shelf;
        }
        return a.product.side === b.product.side
          ? 0
          : a.product.side === 'right'
          ? -1
          : 1;
      }),
    }));
}

export function formatPrice(price: number): string {
  return price.toFixed(2);
}

export function getCategoryForAisle(
  aisle: number,
  products: Product[]
): ProductCategory {
  const found = products.find(p => p.aisle === aisle);
  return found?.category ?? 'other';
}
