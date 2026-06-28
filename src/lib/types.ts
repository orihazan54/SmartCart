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
