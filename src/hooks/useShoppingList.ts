import { useState, useCallback, useMemo } from 'react';
import type { ShoppingListItem, AisleGroup, Product } from '../lib/types';
import { sortShoppingList } from '../lib/utils';

type UseShoppingListReturn = {
  items: ShoppingListItem[];
  sortedGroups: AisleGroup[];
  totalItems: number;
  totalPrice: number;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  toggleCheck: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearChecked: () => void;
  isInList: (productId: string) => boolean;
};

export function useShoppingList(products: Product[]): UseShoppingListReturn {
  const [items, setItems] = useState<ShoppingListItem[]>([]);

  const sortedGroups = useMemo(
    () => sortShoppingList(items, products),
    [items, products]
  );

  const productMap = useMemo(
    () => new Map(products.map(p => [p.id, p])),
    [products]
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce((sum, item) => {
    const product = productMap.get(item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const addItem = useCallback((productId: string, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === productId);
      if (existing) {
        return prev.map(i =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { productId, quantity, checked: false }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.productId !== productId));
  }, []);

  const toggleCheck = useCallback((productId: string) => {
    setItems(prev =>
      prev.map(i =>
        i.productId === productId ? { ...i, checked: !i.checked } : i
      )
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.productId !== productId));
    } else {
      setItems(prev =>
        prev.map(i => (i.productId === productId ? { ...i, quantity } : i))
      );
    }
  }, []);

  const clearChecked = useCallback(() => {
    setItems(prev => prev.filter(i => !i.checked));
  }, []);

  const isInList = useCallback(
    (productId: string) => items.some(i => i.productId === productId),
    [items]
  );

  return {
    items,
    sortedGroups,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    toggleCheck,
    updateQuantity,
    clearChecked,
    isInList,
  };
}
