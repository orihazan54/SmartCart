import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db } from '../lib/firebase';
import type { ShoppingListItem, AisleGroup, Product, SavedShoppingList } from '../lib/types';
import { sortShoppingList } from '../lib/utils';

const DEBOUNCE_MS = 1500;
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

type UsePersistedShoppingListReturn = {
  items: ShoppingListItem[];
  sortedGroups: AisleGroup[];
  totalItems: number;
  totalPrice: number;
  isListLoading: boolean;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  toggleCheck: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearChecked: () => void;
  isInList: (productId: string) => boolean;
};

/**
 * Firestore-backed shopping list. One active document per user/store pair
 * at path users/{uid}/shoppingLists/{storeId}_active.
 * Changes are debounce-saved to avoid excessive writes.
 * Anonymous users get a 7-day TTL; registered users have no TTL.
 */
export function usePersistedShoppingList(
  products: Product[],
  user: User | null,
  storeId: string
): UsePersistedShoppingListReturn {
  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const [isListLoading, setIsListLoading] = useState(true);

  // Stable refs so the save timer closure never goes stale
  const userRef = useRef(user);
  const storeIdRef = useRef(storeId);
  useEffect(() => { userRef.current = user; }, [user]);
  useEffect(() => { storeIdRef.current = storeId; }, [storeId]);

  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const productMap = useMemo(
    () => new Map(products.map(p => [p.id, p])),
    [products]
  );

  const sortedGroups = useMemo(
    () => sortShoppingList(items, products),
    [items, products]
  );

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => {
    const p = productMap.get(i.productId);
    return sum + (p ? p.price * i.quantity : 0);
  }, 0);

  // Load or create the active list doc when the user is ready
  useEffect(() => {
    if (!user) {
      setIsListLoading(false);
      return;
    }

    let cancelled = false;
    setIsListLoading(true);

    async function loadOrCreate() {
      const uid = user!.uid;
      const docId = `${storeId}_active`;
      const ref = doc(db, 'users', uid, 'shoppingLists', docId);
      const snap = await getDoc(ref);

      if (cancelled) return;

      if (snap.exists()) {
        const data = snap.data() as Omit<SavedShoppingList, 'id'>;
        setItems(data.items ?? []);
      } else {
        const now = Date.now();
        const newList: Omit<SavedShoppingList, 'id'> = {
          uid,
          storeId,
          name: 'קניות',
          items: [],
          status: 'active',
          createdAt: now,
          updatedAt: now,
          completedAt: null,
          autoDeleteAt: user!.isAnonymous ? now + SEVEN_DAYS_MS : null,
        };
        await setDoc(ref, newList);
        if (!cancelled) setItems([]);
      }

      if (!cancelled) setIsListLoading(false);
    }

    loadOrCreate().catch(err => {
      console.error('[ShoppingList] Load error:', err);
      if (!cancelled) setIsListLoading(false);
    });

    return () => {
      cancelled = true;
      // Cancel any pending save for the previous user
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [user?.uid, storeId]);

  // Stable debounced save — reads user/storeId from refs to avoid stale closures
  const scheduleSave = useCallback((newItems: ShoppingListItem[]) => {
    const u = userRef.current;
    const sid = storeIdRef.current;
    if (!u) return;

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      const ref = doc(db, 'users', userRef.current!.uid, 'shoppingLists', `${sid}_active`);
      await updateDoc(ref, { items: newItems, updatedAt: Date.now() });
    }, DEBOUNCE_MS);
  }, []);

  const addItem = useCallback((productId: string, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === productId);
      const next = existing
        ? prev.map(i => i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i)
        : [...prev, { productId, quantity, checked: false }];
      scheduleSave(next);
      return next;
    });
  }, [scheduleSave]);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => {
      const next = prev.filter(i => i.productId !== productId);
      scheduleSave(next);
      return next;
    });
  }, [scheduleSave]);

  const toggleCheck = useCallback((productId: string) => {
    setItems(prev => {
      const next = prev.map(i =>
        i.productId === productId ? { ...i, checked: !i.checked } : i
      );
      scheduleSave(next);
      return next;
    });
  }, [scheduleSave]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => {
        const next = prev.filter(i => i.productId !== productId);
        scheduleSave(next);
        return next;
      });
      return;
    }
    setItems(prev => {
      const next = prev.map(i => i.productId === productId ? { ...i, quantity } : i);
      scheduleSave(next);
      return next;
    });
  }, [scheduleSave]);

  const clearChecked = useCallback(() => {
    setItems(prev => {
      const next = prev.filter(i => !i.checked);
      scheduleSave(next);
      return next;
    });
  }, [scheduleSave]);

  const isInList = useCallback(
    (productId: string) => items.some(i => i.productId === productId),
    [items]
  );

  return {
    items,
    sortedGroups,
    totalItems,
    totalPrice,
    isListLoading,
    addItem,
    removeItem,
    toggleCheck,
    updateQuantity,
    clearChecked,
    isInList,
  };
}
