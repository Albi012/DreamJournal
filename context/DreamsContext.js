import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import * as dbApi from '../lib/db';

const DreamsContext = createContext(null);

export function DreamsProvider({ children }) {
  const { session } = useAuth();
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    try {
      setDreams(await dbApi.loadDreams(session));
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => { refresh(); }, [refresh]);

  const save = async (dream) => {
    await dbApi.saveDream(session, dream);
    await refresh();
  };
  const remove = async (id) => {
    await dbApi.deleteDream(session, id);
    await refresh();
  };

  return (
    <DreamsContext.Provider value={{ dreams, loading, refresh, save, remove }}>
      {children}
    </DreamsContext.Provider>
  );
}

export const useDreams = () => useContext(DreamsContext);
