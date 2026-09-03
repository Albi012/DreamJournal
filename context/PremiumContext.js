import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Premium status. In the store build this is driven by RevenueCat
// (customerInfo.entitlements.active['premium']). For now it's a dev toggle
// persisted locally so the whole freemium flow is testable.
const PremiumContext = createContext(null);
const KEY = 'lucida:premium';

export function PremiumProvider({ children }) {
  const [isPremium, setIsPremium] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const v = await AsyncStorage.getItem(KEY);
      setIsPremium(v === '1');
      setReady(true);
    })();
  }, []);

  const setPremium = async (on) => {
    setIsPremium(on);
    await AsyncStorage.setItem(KEY, on ? '1' : '0');
  };

  return (
    <PremiumContext.Provider value={{ isPremium, ready, setPremium }}>
      {children}
    </PremiumContext.Provider>
  );
}

export const usePremium = () => useContext(PremiumContext);
