import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

// App lock: optional 4-digit PIN (stored in the device keychain) plus
// optional biometric unlock. The dream data itself is never in SecureStore —
// this only gates app entry.
//
// SecureStore is native-only: it does not exist on web (and can be missing in
// other unsupported environments). When it is unavailable we report
// `available: false` and keep the lock switched off rather than falling back
// to insecure storage for a PIN.
const LockContext = createContext(null);
const PIN_KEY = 'lucida_pin';
const LOCK_ENABLED = 'lucida_lock_enabled';

async function secureStoreAvailable() {
  try {
    // isAvailableAsync itself is missing on unsupported platforms.
    if (typeof SecureStore.isAvailableAsync !== 'function') return false;
    return await SecureStore.isAvailableAsync();
  } catch (e) {
    return false;
  }
}

export function LockProvider({ children }) {
  const [available, setAvailable] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [locked, setLocked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const ok = await secureStoreAvailable();
      setAvailable(ok);
      if (ok) {
        try {
          const on = (await SecureStore.getItemAsync(LOCK_ENABLED)) === '1';
          setEnabled(on);
          setLocked(on); // start locked if a lock is set
        } catch (e) {
          // Keychain unreadable — fail open rather than locking the user out.
          setEnabled(false);
          setLocked(false);
        }
      }
      setReady(true);
    })();
  }, []);

  const setPin = async (pin) => {
    if (!available) return false;
    try {
      await SecureStore.setItemAsync(PIN_KEY, pin);
      await SecureStore.setItemAsync(LOCK_ENABLED, '1');
      setEnabled(true);
      setLocked(false);
      return true;
    } catch (e) {
      return false;
    }
  };

  const disableLock = async () => {
    if (!available) return;
    try {
      await SecureStore.deleteItemAsync(PIN_KEY);
      await SecureStore.setItemAsync(LOCK_ENABLED, '0');
    } catch (e) {}
    setEnabled(false);
    setLocked(false);
  };

  const checkPin = async (pin) => {
    if (!available) return false;
    try {
      const stored = await SecureStore.getItemAsync(PIN_KEY);
      if (stored && stored === pin) {
        setLocked(false);
        return true;
      }
    } catch (e) {}
    return false;
  };

  const unlock = () => setLocked(false);
  const lock = () => enabled && setLocked(true);

  return (
    <LockContext.Provider
      value={{ available, enabled, locked, ready, setPin, disableLock, checkPin, unlock, lock }}
    >
      {children}
    </LockContext.Provider>
  );
}

export const useLock = () => useContext(LockContext);
