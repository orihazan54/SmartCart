import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Store, Product } from '../lib/types';
import { mockStore, mockProducts } from '../lib/mockData';

type StoreContextValue = {
  store: Store | null;
  products: Product[];
  isLoading: boolean;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulates async load — will be replaced by Firestore in Phase 2
    const timer = setTimeout(() => {
      setStore(mockStore);
      setProducts(mockProducts);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
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
