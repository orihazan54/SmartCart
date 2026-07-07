import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import {
  ShoppingCart,
  Search,
  Plus,
  Check,
  MapPin,
  Trash2,
} from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Skeleton } from '../../components/ui/Skeleton';
import { useStore, ACTIVE_STORE_ID } from '../../contexts/StoreContext';
import { useAuth } from '../../contexts/AuthContext';
import { usePersistedShoppingList } from '../../hooks/usePersistedShoppingList';
import { recordSearch } from '../../lib/searchHistory';
import { cn, formatPrice } from '../../lib/utils';
import type { ProductCategory } from '../../lib/types';

const CATEGORY_ICONS: Record<ProductCategory, string> = {
  fruits_vegetables: '🥦',
  bakery: '🍞',
  dairy: '🥛',
  meat_fish: '🥩',
  frozen: '🧊',
  grains: '🌾',
  snacks: '🍿',
  beverages: '🥤',
  hygiene: '🧴',
  personal_care: '💆',
  household: '🧹',
  other: '📦',
};

function ShopListSkeleton() {
  return (
    <div className="px-4 py-4 space-y-4">
      <Skeleton className="h-12 w-full" />
      {[1, 2, 3].map(i => (
        <div key={i}>
          <div className="flex items-center gap-2 mb-2 px-1">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {[1, 2].map(j => (
              <div key={j} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0">
                <Skeleton className="w-6 h-6 rounded-full shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-5 w-12 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ShopList() {
  const { t } = useTranslation();
  const { store, products, isLoading: storeLoading } = useStore();
  const { user, profile, isLoading: authLoading } = useAuth();
  const {
    sortedGroups,
    totalItems,
    totalPrice,
    addItem,
    toggleCheck,
    removeItem,
    clearChecked,
    isInList,
    isListLoading,
  } = usePersistedShoppingList(products, user, store?.id ?? ACTIVE_STORE_ID);

  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const suggestions = query.trim().length > 0
    ? products
        .filter(p => p.name.includes(query.trim()))
        .slice(0, 6)
    : [];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current !== e.target
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleAddProduct(productId: string) {
    const capturedQuery = query.trim();
    const capturedCount = suggestions.length;
    const product = products.find(p => p.id === productId);

    addItem(productId);
    setQuery('');
    setShowSuggestions(false);
    inputRef.current?.focus();

    if (product) {
      toast(t('shop.itemAdded', { name: product.name }));
    }

    if (user && profile && capturedQuery) {
      recordSearch(user, profile.settings, capturedQuery, capturedCount, productId).catch(() => {});
    }
  }

  function getSideLabel(side: 'left' | 'right'): string {
    return side === 'left' ? t('shop.sideLeft') : t('shop.sideRight');
  }

  const checkedCount = sortedGroups
    .flatMap(g => g.items)
    .filter(i => i.listItem.checked).length;

  const isAnyLoading = authLoading || storeLoading || isListLoading;

  return (
    <AppShell>
      {/* Store banner */}
      {store && (
        <div className="bg-primary-600 text-white px-4 py-3 flex items-center gap-2">
          <ShoppingCart size={18} />
          <span className="font-medium text-sm">
            {t('shop.storeBanner', { name: store.name })}
          </span>
        </div>
      )}

      {/* Skeleton while loading */}
      {isAnyLoading && <ShopListSkeleton />}

      {!isAnyLoading && (
        <div className="px-4 py-4 space-y-4">
          {/* Search / add item */}
          <div className="relative">
            <Input
              ref={inputRef}
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => query.trim() && setShowSuggestions(true)}
              placeholder={t('shop.addItemPlaceholder')}
              icon={<Search size={16} />}
              aria-label={t('shop.addItem')}
            />

            {/* Autocomplete suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute top-full mt-1 start-0 end-0 z-50 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                {suggestions.map(product => (
                  <button
                    key={product.id}
                    onClick={() => handleAddProduct(product.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors text-start"
                  >
                    <span className="text-lg leading-none">
                      {CATEGORY_ICONS[product.category]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {t('shop.aisleLabel', { number: product.aisle })} ·{' '}
                        {formatPrice(product.price)} ₪
                      </p>
                    </div>
                    {isInList(product.id) ? (
                      <Check size={16} className="text-primary-500 shrink-0" />
                    ) : (
                      <Plus size={16} className="text-gray-400 shrink-0" />
                    )}
                  </button>
                ))}

                {query.trim() && suggestions.length === 0 && (
                  <p className="px-4 py-3 text-sm text-gray-400">
                    {t('shop.noResults')}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Empty state */}
          {sortedGroups.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <ShoppingCart size={36} className="text-gray-300" />
              </div>
              <p className="text-lg font-semibold text-gray-700 mb-1">
                {t('shop.emptyState')}
              </p>
              <p className="text-sm text-gray-400">{t('shop.emptyStateHint')}</p>
            </div>
          )}

          {/* Sorted aisle groups */}
          {sortedGroups.map(group => (
            <div key={group.aisle}>
              {/* Aisle section header */}
              <div className="flex items-center gap-2 mb-2 px-1">
                <span className="text-lg leading-none">
                  {CATEGORY_ICONS[group.category]}
                </span>
                <Badge variant="aisle">
                  {t('shop.aisleLabel', { number: group.aisle })}
                </Badge>
                <span className="text-xs text-gray-400 flex-1 truncate">
                  {t(`categories.${group.category}`)}
                </span>
                <Badge variant="count">{group.items.length}</Badge>
              </div>

              <Card padding="none" className="overflow-hidden">
                {group.items.map(({ product, listItem }, idx) => (
                  <div
                    key={product.id}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3',
                      idx < group.items.length - 1 &&
                        'border-b border-gray-50',
                      listItem.checked && 'bg-gray-50'
                    )}
                  >
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleCheck(product.id)}
                      aria-label={`Toggle ${product.name}`}
                      className={cn(
                        'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors',
                        listItem.checked
                          ? 'bg-primary-500 border-primary-500'
                          : 'border-gray-300 hover:border-primary-400'
                      )}
                    >
                      {listItem.checked && (
                        <Check size={13} className="text-white" strokeWidth={3} />
                      )}
                    </button>

                    {/* Item info */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          'text-sm font-medium text-gray-800 truncate',
                          listItem.checked && 'line-through text-gray-400'
                        )}
                      >
                        {product.name}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin size={10} className="text-gray-300 shrink-0" />
                        <p className="text-xs text-gray-400 truncate">
                          {t('shop.locationLabel', {
                            aisle: product.aisle,
                            shelf: product.shelf,
                            side: getSideLabel(product.side),
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Quantity + price */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-end">
                        <p className="text-sm font-semibold text-gray-800">
                          {formatPrice(product.price * listItem.quantity)} ₪
                        </p>
                        {listItem.quantity > 1 && (
                          <p className="text-xs text-gray-400">
                            ×{listItem.quantity}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          ))}

          {/* Spacer for sticky bar */}
          {sortedGroups.length > 0 && <div className="h-24" />}
        </div>
      )}

      {/* Sticky bottom bar */}
      {!isAnyLoading && sortedGroups.length > 0 && (
        <div className="fixed bottom-0 start-0 end-0 z-40">
          <div className="max-w-lg mx-auto px-4 pb-4 pt-2">
            <div className="rounded-2xl border border-gray-200 shadow-xl backdrop-blur-md bg-white/90 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-gray-400">{t('shop.estimatedTotal')}</p>
                  <p className="text-xl font-bold text-gray-900">
                    {formatPrice(totalPrice)} ₪
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {checkedCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearChecked}>
                      {t('shop.clearChecked')}
                    </Button>
                  )}
                  <div className="flex items-center gap-1 bg-primary-50 text-primary-700 rounded-xl px-3 py-2">
                    <ShoppingCart size={16} />
                    <span className="text-sm font-bold">{totalItems}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
