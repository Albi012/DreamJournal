import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Screen } from '../components/ui';
import { LockIcon } from '../components/Icons';
import { theme } from '../lib/theme';
import { useLock } from '../context/LockContext';

const c = theme.colors;
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];

export default function SetPin() {
  const { t } = useTranslation();
  const router = useRouter();
  const { setPin } = useLock();
  const [first, setFirst] = useState('');
  const [pin, setPin2] = useState('');
  const [error, setError] = useState(false);

  const confirming = first.length === 4;

  const press = async (k) => {
    setError(false);
    if (k === '⌫') return setPin2((p) => p.slice(0, -1));
    if (k === '' || pin.length >= 4) return;
    const next = pin + k;
    setPin2(next);
    if (next.length === 4) {
      if (!confirming) {
        setTimeout(() => { setFirst(next); setPin2(''); }, 150);
      } else if (next === first) {
        await setPin(next);
        router.back();
      } else {
        setError(true);
        setTimeout(() => { setFirst(''); setPin2(''); }, 500);
      }
    }
  };

  return (
    <Screen>
      <View style={styles.topbar}>
        <Pressable onPress={() => router.back()}><Text style={styles.cancel}>{t('common.cancel')}</Text></Pressable>
      </View>
      <View style={styles.wrap}>
        <View style={styles.top}>
          <View style={styles.iconWrap}><LockIcon size={28} color={c.primary} /></View>
          <Text style={styles.title}>
            {error ? t('lock.wrong') : confirming ? t('lock.confirmPin') : t('lock.setPin')}
          </Text>
          <View style={styles.dots}>
            {[0, 1, 2, 3].map((i) => (
              <View key={i} style={[styles.dot, { backgroundColor: i < pin.length ? c.primary : 'transparent', borderColor: error ? c.danger : c.primary }]} />
            ))}
          </View>
        </View>
        <View style={styles.pad}>
          {KEYS.map((k, i) => (
            <Pressable key={i} onPress={() => press(k)} style={[styles.key, !k && styles.keyEmpty]} disabled={!k}>
              <Text style={styles.keyText}>{k}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topbar: { paddingHorizontal: 20, paddingVertical: 12 },
  cancel: { fontSize: 15, color: c.textMuted },
  wrap: { flex: 1, justifyContent: 'space-between', paddingBottom: 40, paddingHorizontal: 40 },
  top: { alignItems: 'center', paddingTop: 40 },
  iconWrap: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  title: { fontSize: 20, fontWeight: '700', color: c.primaryDeep, textAlign: 'center' },
  dots: { flexDirection: 'row', gap: 16, marginTop: 24 },
  dot: { width: 16, height: 16, borderRadius: 8, borderWidth: 2 },
  pad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 18 },
  key: { width: 74, height: 74, borderRadius: 37, backgroundColor: 'rgba(255,255,255,0.7)', alignItems: 'center', justifyContent: 'center' },
  keyEmpty: { backgroundColor: 'transparent' },
  keyText: { fontSize: 26, color: c.text, fontWeight: '500' },
});
