import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  onAuthStateChanged,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  linkWithCredential,
  EmailAuthProvider,
  updateProfile,
  type User,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import type { UserProfile, UserSettings } from '../lib/types';

// ─── Types ───────────────────────────────────────────────────────────────────

type AuthContextValue = {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAnonymous: boolean;
  signInAnonymous: () => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  linkAnonymousToEmail: (email: string, password: string, displayName?: string) => Promise<void>;
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULT_SETTINGS: UserSettings = {
  saveHistory: false,        // off for anonymous; on for registered
  historyRetentionDays: 90,
  defaultStoreId: null,
  preferredLanguage: 'he',
};

// ─── Firestore helpers ────────────────────────────────────────────────────────

async function fetchOrCreateProfile(user: User): Promise<UserProfile> {
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    await updateDoc(ref, { lastSeenAt: Date.now() });
    return { ...(snap.data() as UserProfile), lastSeenAt: Date.now() };
  }

  const profile: UserProfile = {
    uid: user.uid,
    isAnonymous: user.isAnonymous,
    email: user.email,
    displayName: user.displayName,
    role: 'customer',
    createdAt: Date.now(),
    lastSeenAt: Date.now(),
    settings: {
      ...DEFAULT_SETTINGS,
      saveHistory: !user.isAnonymous, // registered users get history on by default
    },
  };

  await setDoc(ref, profile);
  return profile;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userProfile = await fetchOrCreateProfile(firebaseUser);
        setProfile(userProfile);
        setIsLoading(false);
      } else {
        // No user — automatically sign in anonymously so every visitor gets an identity
        try {
          await signInAnonymously(auth);
          // onAuthStateChanged will fire again with the anonymous user
        } catch (err) {
          console.error('[Auth] Anonymous sign-in failed:', err);
          setIsLoading(false);
        }
      }
    });

    return unsubscribe;
  }, []);

  // ── Auth actions ────────────────────────────────────────────────────────────

  const signInAnonymous = useCallback(async () => {
    await signInAnonymously(auth);
  }, []);

  const signUpWithEmail = useCallback(
    async (email: string, password: string, displayName?: string) => {
      const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) await updateProfile(newUser, { displayName });
      // onAuthStateChanged handles profile creation
    },
    []
  );

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setProfile(null);
    // onAuthStateChanged fires with null → triggers anonymous sign-in automatically
  }, []);

  /**
   * Upgrades an anonymous user to email/password.
   * The uid stays the same — all Firestore data (shopping lists, history) is preserved.
   */
  const linkAnonymousToEmail = useCallback(
    async (email: string, password: string, displayName?: string) => {
      if (!user) throw new Error('No anonymous user to upgrade');
      const credential = EmailAuthProvider.credential(email, password);
      const { user: linked } = await linkWithCredential(user, credential);
      if (displayName) await updateProfile(linked, { displayName });

      // Update Firestore profile in-place — same uid, data preserved
      const ref = doc(db, 'users', linked.uid);
      const updates = {
        isAnonymous: false,
        email,
        displayName: displayName ?? null,
        lastSeenAt: Date.now(),
        'settings.saveHistory': true,
      };
      await updateDoc(ref, updates);

      setProfile(prev =>
        prev
          ? {
              ...prev,
              isAnonymous: false,
              email,
              displayName: displayName ?? null,
              settings: { ...prev.settings, saveHistory: true },
            }
          : null
      );
    },
    [user]
  );

  const updateSettings = useCallback(
    async (settings: Partial<UserSettings>) => {
      if (!user) return;
      const ref = doc(db, 'users', user.uid);
      // Firestore dot-notation for nested fields
      const updates: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(settings)) {
        updates[`settings.${key}`] = value;
      }
      await updateDoc(ref, updates);
      setProfile(prev =>
        prev ? { ...prev, settings: { ...prev.settings, ...settings } } : null
      );
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isAnonymous: user?.isAnonymous ?? true,
        signInAnonymous,
        signUpWithEmail,
        signInWithEmail,
        signOut,
        linkAnonymousToEmail,
        updateSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
