import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged, signOut as fbSignOut } from 'firebase/auth';
import { getFirebaseAuth, isFirebaseConfigured } from '../lib/firebase';

// session shape: { uid, isGuest, name, email } | null
const AuthContext = createContext(null);
const GUEST_KEY = 'lucida:guest:active';

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub = () => {};
    (async () => {
      // Restore guest mode if it was chosen previously.
      const guest = await AsyncStorage.getItem(GUEST_KEY);
      if (guest) {
        setSession({ uid: 'guest', isGuest: true, name: 'Vendég' });
        setLoading(false);
        return;
      }
      const auth = isFirebaseConfigured ? getFirebaseAuth() : null;
      if (auth) {
        unsub = onAuthStateChanged(auth, (user) => {
          setSession(
            user
              ? { uid: user.uid, isGuest: false, name: user.displayName, email: user.email }
              : null
          );
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    })();
    return () => unsub();
  }, []);

  const continueAsGuest = async () => {
    await AsyncStorage.setItem(GUEST_KEY, '1');
    setSession({ uid: 'guest', isGuest: true, name: 'Vendég' });
  };

  const setGoogleUser = (user) => {
    setSession({ uid: user.uid, isGuest: false, name: user.displayName, email: user.email });
  };

  const signOut = async () => {
    await AsyncStorage.removeItem(GUEST_KEY);
    const auth = isFirebaseConfigured ? getFirebaseAuth() : null;
    if (auth?.currentUser) {
      try { await fbSignOut(auth); } catch (e) {}
    }
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{ session, loading, continueAsGuest, setGoogleUser, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
