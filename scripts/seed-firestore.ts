/**
 * One-time Firestore seeding script.
 *
 * Prerequisites:
 *   1. Download a service account key from Firebase Console:
 *      Project Settings → Service accounts → Generate new private key
 *   2. Save the downloaded JSON file as: scripts/service-account.json
 *      (this file is gitignored — never commit it)
 *   3. Run: npx tsx scripts/seed-firestore.ts
 *
 * This script is idempotent — re-running it overwrites existing documents.
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import type { ServiceAccount } from 'firebase-admin/app';
import { mockStore, mockProducts } from '../src/lib/mockData.js';

// ── Init ─────────────────────────────────────────────────────────────────────

const serviceAccountPath = resolve('scripts/service-account.json');
let serviceAccount: ServiceAccount;

try {
  serviceAccount = JSON.parse(
    readFileSync(serviceAccountPath, 'utf-8')
  ) as ServiceAccount;
} catch {
  console.error(
    '\n❌ Cannot find scripts/service-account.json\n' +
    '   Download it from Firebase Console → Project Settings → Service Accounts\n' +
    '   and save it at scripts/service-account.json\n'
  );
  process.exit(1);
}

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// ── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('\n🌱 Seeding Firestore...\n');

  const storeRef = db.collection('stores').doc(mockStore.id);

  await storeRef.set({
    name: mockStore.name,
    address: mockStore.address,
    totalAisles: mockStore.totalAisles,
  });
  console.log(`✅ Store: ${mockStore.name} (id: ${mockStore.id})`);

  // Write products in batches (Firestore limit: 500 ops per batch)
  const BATCH_SIZE = 499;
  for (let i = 0; i < mockProducts.length; i += BATCH_SIZE) {
    const batch = db.batch();
    const chunk = mockProducts.slice(i, i + BATCH_SIZE);

    for (const product of chunk) {
      const { id, ...data } = product;
      const ref = storeRef.collection('products').doc(id);
      batch.set(ref, data);
    }

    await batch.commit();
    console.log(`✅ Products batch (${i + 1}–${i + chunk.length} of ${mockProducts.length})`);
  }

  console.log(`\n✅ Done! ${mockProducts.length} products seeded under stores/${mockStore.id}\n`);
  console.log('Next steps:');
  console.log('  1. Deploy security rules: firebase deploy --only firestore:rules');
  console.log('  2. Verify data in Firebase Console → Firestore → stores\n');
}

seed().catch(err => {
  console.error('\n❌ Seed failed:', err);
  process.exit(1);
});
