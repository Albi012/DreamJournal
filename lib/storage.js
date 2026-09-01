import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  dreams: 'dj:dreams',
  settings: 'dj:settings',
};

// ---- Dreams -------------------------------------------------------------

export async function loadDreams() {
  try {
    const raw = await AsyncStorage.getItem(KEYS.dreams);
    const list = raw ? JSON.parse(raw) : [];
    // Newest first.
    return list.sort((a, b) => b.createdAt - a.createdAt);
  } catch (e) {
    return [];
  }
}

async function persistDreams(list) {
  await AsyncStorage.setItem(KEYS.dreams, JSON.stringify(list));
}

export async function saveDream(dream) {
  const list = await loadDreams();
  const now = Date.now();
  if (dream.id) {
    const idx = list.findIndex((d) => d.id === dream.id);
    if (idx >= 0) list[idx] = { ...list[idx], ...dream, updatedAt: now };
  } else {
    list.push({
      id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: now,
      updatedAt: now,
      ...dream,
    });
  }
  await persistDreams(list);
  return list;
}

export async function deleteDream(id) {
  const list = await loadDreams();
  const next = list.filter((d) => d.id !== id);
  await persistDreams(next);
  return next;
}

// ---- Settings -----------------------------------------------------------

const DEFAULT_SETTINGS = {
  reminderEnabled: false,
  reminderCount: 5,
  startHour: 9,
  endHour: 21,
};

export async function loadSettings() {
  try {
    const raw = await AsyncStorage.getItem(KEYS.settings);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings) {
  await AsyncStorage.setItem(KEYS.settings, JSON.stringify(settings));
  return settings;
}
