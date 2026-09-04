// Firebase initialization — Auth + Firestore.
//
// ⚠️ PLACEHOLDER CONFIG. Replace these values with your real Firebase
// project's web config (Firebase console → Project settings → General →
// "Your apps" → Web app). Until then the app runs in guest mode and
// nothing here is ever initialized.
//
// NOTE on offline support: the Firebase *JS* SDK cannot persist its
// Firestore cache on React Native (it needs IndexedDB, which RN lacks), so
// we use the default in-memory cache here. Writes still queue while the app
// is running, but they do not survive a restart. For true offline-first
// sync in the store build, switch to @react-native-firebase/firestore,
// which uses the native SDKs and persists to disk (requires a dev build,
// not Expo Go). Tracked in ROADMAP.md.
import { initializeApp, getApps, getApp } from 'firebase/app';

export const firebaseConfig = {
  apiKey: 'PLACEHOLDER_API_KEY',
  authDomain: 'lucida-app.firebaseapp.com',
  projectId: 'lucida-app',
  storageBucket: 'lucida-app.appspot.com',
  messagingSenderId: 'PLACEHOLDER_SENDER_ID',
  appId: 'PLACEHOLDER_APP_ID',
};

// True once a real config is dropped in — gates cloud features vs. guest mode.
export const isFirebaseConfigured =
  !firebaseConfig.apiKey.startsWith('PLACEHOLDER');

let appInstance = null;
let authInstance = null;
let dbInstance = null;

function getFirebaseApp() {
  if (!isFirebaseConfigured) return null;
  if (!appInstance) {
    appInstance = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }
  return appInstance;
}

// Lazily create Auth with persistent login across restarts.
export function getFirebaseAuth() {
  if (authInstance) return authInstance;
  const app = getFirebaseApp();
  if (!app) return null;

  const {
    getAuth, initializeAuth, getReactNativePersistence,
  } = require('firebase/auth');
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;

  try {
    authInstance = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (e) {
    // Already initialized, or persistence helper unavailable on this platform.
    authInstance = getAuth(app);
  }
  return authInstance;
}

// Lazily create Firestore (default in-memory cache — see note above).
export function getFirestoreDb() {
  if (dbInstance) return dbInstance;
  const app = getFirebaseApp();
  if (!app) return null;

  const { getFirestore } = require('firebase/firestore');
  dbInstance = getFirestore(app);
  return dbInstance;
}
