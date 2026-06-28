/**
 * Firebase SDK initialization.
 *
 * Firestore collection structure:
 *
 * stores/{storeId}                    — public read, employee/manager write
 *   products/{productId}              — same rules as parent store
 *
 * users/{uid}                         — owner-only read/write
 *   shoppingLists/{listId}
 *   searchHistory/{entryId}
 *
 * analytics/{storeId}                 — aggregated, anonymous (Phase 5)
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Storage is initialized in Phase 3 once the Blaze plan is active.
// import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app); // uncomment when Blaze plan is active

export default app;
