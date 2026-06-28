# SmartCart

[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![i18next](https://img.shields.io/badge/i18next-4_languages-26A69A)](https://i18next.com)

> A smart shopping list that navigates you through supermarket aisles — sorted by aisle, shelf and side.

## Screenshots

_Screenshots coming soon_

## Features

- Shopping list sorted automatically by store aisle
- Each item shows exact location: aisle number, shelf, and side
- Autocomplete search from the store product catalog
- Check off items as you shop, with running price total
- 4 languages: Hebrew (complete), Arabic, Russian, English
- Full RTL ↔ LTR switching with correct Tailwind logical properties
- Font switches automatically: Heebo (Hebrew) · Cairo (Arabic) · Inter (English/Russian)
- Language preference persisted in `localStorage`
- Mobile-first design, optimized for 375px screens
- Clean, modern UI inspired by Wolt and Bit

## Roadmap

- [ ] **Phase 2** — Firebase Auth + Firestore (real product catalog per store)
- [ ] **Phase 3** — Employee admin interface (add/edit products, set aisle locations)
- [ ] **Phase 4** — AI shopping list parser via Anthropic Claude API (accepts any language, matches to Hebrew catalog)
- [ ] **Phase 5** — QR codes, PWA offline support, manager analytics dashboard, complete translations

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── pages/
│   ├── Landing.tsx               # 5-button landing with language switcher
│   ├── customer/
│   │   ├── ShopList.tsx          # Main shopping list with aisle sort
│   │   └── StoreSelect.tsx
│   ├── employee/
│   │   ├── EmployeeLogin.tsx
│   │   └── ProductManager.tsx
│   └── manager/
│       └── Dashboard.tsx
├── components/
│   ├── ui/                       # Button, Input, Card, Dropdown
│   └── layout/                   # AppHeader, AppShell, LanguageSwitcher
├── i18n/
│   ├── index.ts                  # i18next config + applyLanguageSideEffects
│   └── locales/
│       ├── he.json               # Hebrew — 100% complete
│       ├── ar.json               # Arabic — landing + shop + categories
│       ├── ru.json               # Russian — landing + shop + categories
│       └── en.json               # English — landing + shop + categories
├── lib/
│   ├── types.ts                  # TypeScript types (Store, Product, etc.)
│   ├── mockData.ts               # 40 mock products across 8 aisles
│   └── utils.ts                  # sortShoppingList, cn, formatPrice
├── hooks/
│   ├── useShoppingList.ts        # Shopping list state + sorted groups
│   └── useLanguage.ts            # Language switcher convenience hook
└── contexts/
    └── StoreContext.tsx          # Store + product catalog provider
```

## Supported Languages

| Language | Code | Direction | Font  | Status            |
|----------|------|-----------|-------|-------------------|
| עברית    | `he` | RTL       | Heebo | Complete (default)|
| العربية  | `ar` | RTL       | Cairo | Partial (landing + shop + categories) |
| Русский  | `ru` | LTR       | Inter | Partial (landing + shop + categories) |
| English  | `en` | LTR       | Inter | Partial (landing + shop + categories) |

## Tech Stack

| Layer      | Technology                                      |
|------------|------------------------------------------------|
| Build      | Vite + React 18 + TypeScript                   |
| Styling    | Tailwind CSS 3 (RTL logical properties)        |
| Routing    | React Router v6                                |
| i18n       | react-i18next + i18next-browser-languagedetector |
| Icons      | lucide-react                                   |
| Fonts      | Google Fonts (Heebo, Cairo, Inter)             |
| State      | React Context + hooks                          |
| Backend    | Firebase (Phase 2)                             |
| AI         | Anthropic Claude API (Phase 4)                 |
| PWA        | vite-plugin-pwa (Phase 5)                      |
