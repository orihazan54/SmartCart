import { type ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { doc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Store, Product } from '../lib/types';

type StoreContextValue = {
  store: Store | null;
  products: Product[];
  isLoading: boolean;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export const ACTIVE_STORE_ID = 'store-1';

export function StoreProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let storeReady = false;
    let productsReady = false;

    function checkReady() {
      if (storeReady && productsReady) setIsLoading(false);
    }

    const unsubStore = onSnapshot(
      doc(db, 'stores', ACTIVE_STORE_ID),
      snap => {
        if (snap.exists()) {
          setStore({ id: snap.id, ...(snap.data() as Omit<Store, 'id'>) });
        }
        storeReady = true;
        checkReady();
      },
      err => {
        console.error('[Store] Firestore error:', err);
        storeReady = true;
        checkReady();
      }
    );

    const unsubProducts = onSnapshot(
      collection(db, 'stores', ACTIVE_STORE_ID, 'products'),
      snap => {
        setProducts(snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Product, 'id'>) })));
        productsReady = true;
        checkReady();
      },
      err => {
        console.error('[Products] Firestore error:', err);
        productsReady = true;
        checkReady();
      }
    );

    return () => {
      unsubStore();
      unsubProducts();
    };
  }, []);

  return (
    <StoreContext.Provider value={{ store, products, isLoading }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
