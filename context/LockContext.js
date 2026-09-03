import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

// App lock: optional 4-digit PIN (stored securely) + optional biometric unlock.
// The dream data itself is never in SecureStore — this only gates app entry.
const LockContext = createContext(null);
const PIN_KEY = 'lucida_pin';
const LOCK_ENABLED = 'lucida_lock_enabled';

export function LockProvider({ children }) {
  const [enabled, setEnabled] = useState(false);
  const [locked, setLocked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const on = (await SecureStore.getItemAsync(LOCK_ENABLED)) === '1';
      setEnabled(on);
      setLocked(on); // start locked if a lock is set
      setReady(true);
    })();
  }, []);

  const setPin = async (pin) => {
    await SecureStore.setItemAsync(PIN_KEY, pin);
    await SecureStore.setItemAsync(LOCK_ENABLED, '1');
    setEnabled(true);
    setLocked(false);
  };

  const disableLock = async () => {
    await SecureStore.deleteItemAsync(PIN_KEY);
    await SecureStore.setItemAsync(LOCK_ENABLED, '0');
    setEnabled(false);
    setLocked(false);
  };

  const checkPin = async (pin) => {
    const stored = await SecureStore.getItemAsync(PIN_KEY);
    if (stored && stored === pin) {
      setLocked(false);
      return true;
    }
    return false;
  };

  const unlock = () => setLocked(false);
  const lock = () => enabled && setLocked(true);

  return (
    <LockContext.Provider
      value={{ enabled, locked, ready, setPin, disableLock, checkPin, unlock, lock }}
    >
      {children}
    </LockContext.Provider>
  );
}

export const useLock = () => useContext(LockContext);
