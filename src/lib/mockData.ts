import type { Store, Product } from './types';

export const mockStore: Store = {
  id: 'store-1',
  name: 'סופר מרקט מיתר',
  address: 'רחוב הרצל 12, מיתר',
  totalAisles: 8,
};

export const mockProducts: Product[] = [
  // Aisle 1 — Fruits & Vegetables
  { id: 'p1', storeId: 'store-1', name: 'בננה', category: 'fruits_vegetables', aisle: 1, shelf: 1, side: 'left', price: 5.9, unit: 'ק"ג' },
  { id: 'p2', storeId: 'store-1', name: 'עגבניה שרי', category: 'fruits_vegetables', aisle: 1, shelf: 1, side: 'right', price: 7.9, unit: 'ק"ג' },
  { id: 'p3', storeId: 'store-1', name: 'מלפפון', category: 'fruits_vegetables', aisle: 1, shelf: 2, side: 'left', price: 4.5, unit: 'ק"ג' },
  { id: 'p4', storeId: 'store-1', name: 'תפוח עץ גרנד סמית', category: 'fruits_vegetables', aisle: 1, shelf: 2, side: 'right', price: 8.9, unit: 'ק"ג' },
  { id: 'p5', storeId: 'store-1', name: 'גמבה אדומה', category: 'fruits_vegetables', aisle: 1, shelf: 3, side: 'left', price: 12.9, unit: 'ק"ג' },
  { id: 'p6', storeId: 'store-1', name: 'לימון', category: 'fruits_vegetables', aisle: 1, shelf: 3, side: 'right', price: 6.9, unit: 'ק"ג' },

  // Aisle 2 — Bakery
  { id: 'p7', storeId: 'store-1', name: 'לחם אחיד', category: 'bakery', aisle: 2, shelf: 1, side: 'left', price: 6.9, unit: 'כיכר' },
  { id: 'p8', storeId: 'store-1', name: 'חלה שישי', category: 'bakery', aisle: 2, shelf: 1, side: 'right', price: 14.9, unit: 'יח\'' },
  { id: 'p9', storeId: 'store-1', name: 'פיתות', category: 'bakery', aisle: 2, shelf: 2, side: 'left', price: 5.5, unit: 'שקית' },
  { id: 'p10', storeId: 'store-1', name: 'לחמניות שומשום', category: 'bakery', aisle: 2, shelf: 2, side: 'right', price: 8.9, unit: 'אריזה' },

  // Aisle 3 — Dairy
  { id: 'p11', storeId: 'store-1', name: 'חלב תנובה 3%', category: 'dairy', aisle: 3, shelf: 1, side: 'left', price: 6.9, unit: 'ליטר' },
  { id: 'p12', storeId: 'store-1', name: 'ביצים L תרנגולות חופש', category: 'dairy', aisle: 3, shelf: 1, side: 'right', price: 19.9, unit: 'קרטון' },
  { id: 'p13', storeId: 'store-1', name: 'גבינה צהובה אמק 28%', category: 'dairy', aisle: 3, shelf: 2, side: 'left', price: 24.9, unit: '200 גר\'' },
  { id: 'p14', storeId: 'store-1', name: 'יוגורט תות', category: 'dairy', aisle: 3, shelf: 2, side: 'right', price: 4.9, unit: 'יח\'' },
  { id: 'p15', storeId: 'store-1', name: 'קוטג\' תנובה', category: 'dairy', aisle: 3, shelf: 3, side: 'left', price: 7.9, unit: 'יח\'' },
  { id: 'p16', storeId: 'store-1', name: 'שמנת חמוצה 15%', category: 'dairy', aisle: 3, shelf: 3, side: 'right', price: 5.9, unit: 'יח\'' },

  // Aisle 4 — Grains & Canned
  { id: 'p17', storeId: 'store-1', name: 'אורז בסמטי', category: 'grains', aisle: 4, shelf: 1, side: 'left', price: 12.9, unit: 'ק"ג' },
  { id: 'p18', storeId: 'store-1', name: 'פסטה ברילה', category: 'grains', aisle: 4, shelf: 1, side: 'right', price: 7.9, unit: '500 גר\'' },
  { id: 'p19', storeId: 'store-1', name: 'שמן זית', category: 'grains', aisle: 4, shelf: 2, side: 'left', price: 29.9, unit: '750 מ"ל' },
  { id: 'p20', storeId: 'store-1', name: 'חומוס אחלה', category: 'grains', aisle: 4, shelf: 2, side: 'right', price: 4.9, unit: 'קופסה' },
  { id: 'p21', storeId: 'store-1', name: 'טונה בשמן', category: 'grains', aisle: 4, shelf: 3, side: 'left', price: 8.9, unit: 'קופסה' },
  { id: 'p22', storeId: 'store-1', name: 'עדשים כתומים', category: 'grains', aisle: 4, shelf: 3, side: 'right', price: 6.9, unit: 'ק"ג' },

  // Aisle 5 — Snacks & Frozen
  { id: 'p23', storeId: 'store-1', name: 'במבה אחלה 80 גר\'', category: 'snacks', aisle: 5, shelf: 1, side: 'left', price: 3.9, unit: 'יח\'' },
  { id: 'p24', storeId: 'store-1', name: 'שוקולד מילקה', category: 'snacks', aisle: 5, shelf: 1, side: 'right', price: 8.9, unit: 'יח\'' },
  { id: 'p25', storeId: 'store-1', name: 'ביסקוויט פטי בר', category: 'snacks', aisle: 5, shelf: 2, side: 'left', price: 5.9, unit: 'יח\'' },
  { id: 'p26', storeId: 'store-1', name: 'פיצה קפואה', category: 'frozen', aisle: 5, shelf: 3, side: 'left', price: 22.9, unit: 'יח\'' },
  { id: 'p27', storeId: 'store-1', name: 'גלידת מגנום', category: 'frozen', aisle: 5, shelf: 3, side: 'right', price: 9.9, unit: 'יח\'' },

  // Aisle 6 — Beverages
  { id: 'p28', storeId: 'store-1', name: 'מים מינרלים 1.5 ל\'', category: 'beverages', aisle: 6, shelf: 1, side: 'left', price: 3.9, unit: 'בקבוק' },
  { id: 'p29', storeId: 'store-1', name: 'קולה זירו 1.5 ל\'', category: 'beverages', aisle: 6, shelf: 1, side: 'right', price: 7.9, unit: 'בקבוק' },
  { id: 'p30', storeId: 'store-1', name: 'מיץ תפוזים טבעי', category: 'beverages', aisle: 6, shelf: 2, side: 'left', price: 14.9, unit: 'ליטר' },
  { id: 'p31', storeId: 'store-1', name: 'קפה אלגזט', category: 'beverages', aisle: 6, shelf: 2, side: 'right', price: 34.9, unit: 'חפיסה' },

  // Aisle 7 — Meat & Fish
  { id: 'p32', storeId: 'store-1', name: 'חזה עוף טרי', category: 'meat_fish', aisle: 7, shelf: 1, side: 'left', price: 34.9, unit: 'ק"ג' },
  { id: 'p33', storeId: 'store-1', name: 'שניצל עוף', category: 'meat_fish', aisle: 7, shelf: 1, side: 'right', price: 39.9, unit: 'ק"ג' },
  { id: 'p34', storeId: 'store-1', name: 'סלמון טרי', category: 'meat_fish', aisle: 7, shelf: 2, side: 'left', price: 79.9, unit: 'ק"ג' },
  { id: 'p35', storeId: 'store-1', name: 'נקניקיות', category: 'meat_fish', aisle: 7, shelf: 2, side: 'right', price: 18.9, unit: 'אריזה' },

  // Aisle 8 — Hygiene & Household
  { id: 'p36', storeId: 'store-1', name: 'שמפו פנטן', category: 'hygiene', aisle: 8, shelf: 1, side: 'left', price: 24.9, unit: 'יח\'' },
  { id: 'p37', storeId: 'store-1', name: 'נייר טואלט 16 גלילים', category: 'household', aisle: 8, shelf: 1, side: 'right', price: 29.9, unit: 'אריזה' },
  { id: 'p38', storeId: 'store-1', name: 'סבון ידיים', category: 'personal_care', aisle: 8, shelf: 2, side: 'left', price: 8.9, unit: 'יח\'' },
  { id: 'p39', storeId: 'store-1', name: 'חומר ניקוי רצפות', category: 'household', aisle: 8, shelf: 2, side: 'right', price: 14.9, unit: 'בקבוק' },
  { id: 'p40', storeId: 'store-1', name: 'משחת שיניים', category: 'personal_care', aisle: 8, shelf: 3, side: 'left', price: 12.9, unit: 'יח\'' },
];
