import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as LocalAuthentication from 'expo-local-authentication';
import { Screen } from '../components/ui';
import { LockIcon } from '../components/Icons';
import { theme } from '../lib/theme';
import { useLock } from '../context/LockContext';

const c = theme.colors;
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];

export default function LockScreen() {
  const { t } = useTranslation();
  const { checkPin, unlock } = useLock();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const tryBiometrics = async () => {
    try {
      const has = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (has && enrolled) {
        const res = await LocalAuthentication.authenticateAsync({
          promptMessage: t('lock.useBiometrics'),
        });
        if (res.success) unlock();
      }
    } catch (e) {}
  };

  useEffect(() => { tryBiometrics(); }, []);

  const press = async (k) => {
    setError(false);
    if (k === '⌫') return setPin((p) => p.slice(0, -1));
    if (k === '' || pin.length >= 4) return;
    const next = pin + k;
    setPin(next);
    if (next.length === 4) {
      const ok = await checkPin(next);
      if (!ok) {
        setError(true);
        setTimeout(() => setPin(''), 500);
      }
    }
  };

  return (
    <Screen>
      <View style={styles.wrap}>
        <View style={styles.top}>
          <View style={styles.iconWrap}>
            <LockIcon size={28} color={c.primary} />
          </View>
          <Text style={styles.title}>{t('lock.title')}</Text>
          <Text style={styles.sub}>{error ? t('lock.wrong') : t('lock.enterPin')}</Text>
          <View style={styles.dots}>
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  { backgroundColor: i < pin.length ? c.primary : 'transparent', borderColor: error ? c.danger : c.primary },
                ]}
              />
            ))}
          </View>
          <Pressable onPress={tryBiometrics}>
            <Text style={styles.bio}>{t('lock.useBiometrics')}</Text>
          </Pressable>
        </View>

        <View style={styles.pad}>
          {KEYS.map((k, i) => (
            <Pressable
              key={i}
              onPress={() => press(k)}
              style={[styles.key, !k && styles.keyEmpty]}
              disabled={!k}
            >
              <Text style={styles.keyText}>{k}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'space-between', paddingTop: 90, paddingBottom: 40, paddingHorizontal: 40 },
  top: { alignItems: 'center' },
  iconWrap: {
    width: 64, height: 64, borderRadius: 32, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center', marginBottom: 18,
  },
  title: { fontSize: 22, fontWeight: '700', color: c.primaryDeep },
  sub: { marginTop: 6, fontSize: 14, color: c.textMuted },
  dots: { flexDirection: 'row', gap: 16, marginTop: 24 },
  dot: { width: 16, height: 16, borderRadius: 8, borderWidth: 2 },
  bio: { marginTop: 22, fontSize: 13, color: c.primary, fontWeight: '600' },
  pad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 18 },
  key: {
    width: 74, height: 74, borderRadius: 37, backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center', justifyContent: 'center',
  },
  keyEmpty: { backgroundColor: 'transparent' },
  keyText: { fontSize: 26, color: c.text, fontWeight: '500' },
});
