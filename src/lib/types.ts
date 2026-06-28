// ─── Core domain ─────────────────────────────────────────────────────────────

export type SupportedLanguage = 'he' | 'ar' | 'ru' | 'en';

export type Store = {
  id: string;
  name: string;
  address: string;
  totalAisles: number;
};

export type ProductCategory =
  | 'fruits_vegetables'
  | 'bakery'
  | 'dairy'
  | 'meat_fish'
  | 'frozen'
  | 'grains'
  | 'snacks'
  | 'beverages'
  | 'hygiene'
  | 'personal_care'
  | 'household'
  | 'other';

export type Product = {
  id: string;
  storeId: string;
  name: string;
  category: ProductCategory;
  aisle: number;
  shelf: number;
  side: 'left' | 'right';
  price: number;
  unit: string;
  barcode?: string;
  imageUrl?: string;
};

export type ShoppingListItem = {
  productId: string;
  quantity: number;
  checked: boolean;
};

export type AisleGroup = {
  aisle: number;
  category: ProductCategory;
  items: Array<{ product: Product; listItem: ShoppingListItem }>;
};

// ─── Auth & user ─────────────────────────────────────────────────────────────

export type UserRole = 'customer' | 'employee' | 'manager';

export type UserSettings = {
  saveHistory: boolean;
  historyRetentionDays: 30 | 90 | 365;
  defaultStoreId: string | null;
  preferredLanguage: SupportedLanguage;
};

export type UserProfile = {
  uid: string;
  isAnonymous: boolean;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  createdAt: number;
  lastSeenAt: number;
  settings: UserSettings;
};

// ─── Persisted shopping data ─────────────────────────────────────────────────

export type SavedShoppingList = {
  id: string;
  uid: string;
  storeId: string;
  name: string;
  items: ShoppingListItem[];
  status: 'active' | 'completed';
  createdAt: number;
  updatedAt: number;
  completedAt: number | null;
  /** Epoch ms after which this document should be deleted (Israeli Privacy Law / GDPR TTL). */
  autoDeleteAt: number | null;
};

export type SearchHistoryEntry = {
  id: string;
  uid: string;
  query: string;
  resultsCount: number;
  productClicked: string | null;
  timestamp: number;
  /** Always set — derived from UserSettings.historyRetentionDays. */
  autoDeleteAt: number;
};
