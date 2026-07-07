import { collection, addDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db } from './firebase';
import type { SearchHistoryEntry, UserSettings } from './types';

/**
 * Records a search event only when the user has consented via saveHistory.
 * Fire-and-forget — callers should not await this.
 */
export async function recordSearch(
  user: User,
  settings: UserSettings,
  query: string,
  resultsCount: number,
  productClicked: string | null
): Promise<void> {
  if (!settings.saveHistory) return;

  const now = Date.now();
  const retentionMs = settings.historyRetentionDays * 24 * 60 * 60 * 1000;

  const entry: Omit<SearchHistoryEntry, 'id'> = {
    uid: user.uid,
    query,
    resultsCount,
    productClicked,
    timestamp: now,
    autoDeleteAt: now + retentionMs,
  };

  await addDoc(collection(db, 'users', user.uid, 'searchHistory'), entry);
}
