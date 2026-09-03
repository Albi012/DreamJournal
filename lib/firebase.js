// Firebase initialization — Auth + Firestore (offline-first).
//
// ⚠️ PLACEHOLDER CONFIG. Replace these values with your real Firebase
// project's web config (Firebase console → Project settings → General →
// "Your apps" → Web app). The app runs in guest mode without a valid
// config, but Google Sign-In and cloud sync require real values.
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Auth with persistent login across app restarts.
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}
export { auth };

// Firestore with offline persistence → works in airplane mode, auto-syncs.
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentSingleTabManager(),
  }),
});

export default app;
