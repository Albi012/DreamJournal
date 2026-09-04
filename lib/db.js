// Data layer for dreams + settings.
//
// Signed-in users → Cloud Firestore (offline-first, auto-sync across devices),
// stored under users/{uid}/dreams and users/{uid}/meta/settings.
// Guest users (temporary, testing only) → local AsyncStorage cache.
//
// The public API is storage-agnostic so screens don't care which backend is live.
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  collection, doc, getDocs, setDoc, deleteDoc, getDoc, query, orderBy,
} from 'firebase/firestore';
import { getFirestoreDb } from './firebase';

const GUEST_DREAMS = 'lucida:guest:dreams';
const GUEST_SETTINGS = 'lucida:guest:settings';

const DEFAULT_SETTINGS = {
  reminderEnabled: false,
  reminderCount: 3, // free tier default; premium unlocks more
  startHour: 9,
  endHour: 21,
  locale: null, // null = follow device language
};

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// ---- Guest (local) backend -------------------------------------------

const guest = {
  async loadDreams() {
    const raw = await AsyncStorage.getItem(GUEST_DREAMS);
    return raw ? JSON.parse(raw) : [];
  },
  async saveAll(list) {
    await AsyncStorage.setItem(GUEST_DREAMS, JSON.stringify(list));
  },
  async loadSettings() {
    const raw = await AsyncStorage.getItem(GUEST_SETTINGS);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  },
  async saveSettings(s) {
    await AsyncStorage.setItem(GUEST_SETTINGS, JSON.stringify(s));
    return s;
  },
};

// ---- Firestore backend -----------------------------------------------

function userDreams(uid) {
  return collection(getFirestoreDb(), 'users', uid, 'dreams');
}
function userSettingsRef(uid) {
  return doc(getFirestoreDb(), 'users', uid, 'meta', 'settings');
}

const cloud = {
  async loadDreams(uid) {
    const q = query(userDreams(uid), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  },
  async saveAll() {
    // no-op: cloud writes are per-document (see saveDream/deleteDream)
  },
  async loadSettings(uid) {
    const snap = await getDoc(userSettingsRef(uid));
    return snap.exists() ? { ...DEFAULT_SETTINGS, ...snap.data() } : DEFAULT_SETTINGS;
  },
  async saveSettings(uid, s) {
    await setDoc(userSettingsRef(uid), s, { merge: true });
    return s;
  },
};

// ---- Public API ------------------------------------------------------
// `session` = { uid, isGuest }

export async function loadDreams(session) {
  if (!session || session.isGuest) {
    const list = await guest.loadDreams();
    return list.sort((a, b) => b.createdAt - a.createdAt);
  }
  return cloud.loadDreams(session.uid);
}

export async function saveDream(session, dream) {
  const now = Date.now();
  const record = {
    title: dream.title || '',
    body: dream.body || '',
    mood: dream.mood || 'neutral',
    lucid: !!dream.lucid,
    tags: dream.tags || [],
    quality: dream.quality ?? 3,
    date: dream.date || now,
    updatedAt: now,
  };

  if (!session || session.isGuest) {
    const list = await guest.loadDreams();
    if (dream.id) {
      const i = list.findIndex((d) => d.id === dream.id);
      if (i >= 0) list[i] = { ...list[i], ...record };
    } else {
      list.push({ id: newId(), createdAt: now, ...record });
    }
    await guest.saveAll(list);
    return record;
  }

  const id = dream.id || newId();
  const ref = doc(getFirestoreDb(), 'users', session.uid, 'dreams', id);
  await setDoc(ref, { createdAt: dream.createdAt || now, ...record }, { merge: true });
  return { id, ...record };
}

export async function deleteDream(session, id) {
  if (!session || session.isGuest) {
    const list = await guest.loadDreams();
    await guest.saveAll(list.filter((d) => d.id !== id));
    return;
  }
  await deleteDoc(doc(getFirestoreDb(), 'users', session.uid, 'dreams', id));
}

export async function loadSettings(session) {
  if (!session || session.isGuest) return guest.loadSettings();
  return cloud.loadSettings(session.uid);
}

export async function saveSettings(session, settings) {
  if (!session || session.isGuest) return guest.saveSettings(settings);
  return cloud.saveSettings(session.uid, settings);
}
