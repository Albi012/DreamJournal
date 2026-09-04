import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Screen, Card } from '../components/ui';
import { theme } from '../lib/theme';
import { SUPPORTED, LANGUAGE_NAMES, setLanguage } from '../lib/i18n';
import { useAuth } from '../context/AuthContext';
import { usePremium } from '../context/PremiumContext';
import { useLock } from '../context/LockContext';

const c = theme.colors;

export default function Settings() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { session, signOut } = useAuth();
  const { isPremium } = usePremium();
  const { enabled: lockEnabled, disableLock } = useLock();
  const [lang, setLang] = useState(i18n.language);

  const changeLang = (l) => { setLanguage(l); setLang(l); };

  const toggleLock = () => {
    if (lockEnabled) disableLock();
    else router.push('/set-pin');
  };

  return (
    <Screen>
      <View style={styles.topbar}>
        <Text style={styles.title}>{t('settings.title')}</Text>
        <Pressable onPress={() => router.back()}><Text style={styles.close}>✕</Text></Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 50 }}>
        {/* Account */}
        <Text style={styles.section}>{t('settings.account')}</Text>
        <Card>
          <Text style={styles.accountName}>{session?.isGuest ? t('settings.guest') : session?.name || session?.email}</Text>
          {isPremium && <Text style={styles.premium}>✦ {t('common.premium')}</Text>}
          {!isPremium && (
            <Pressable style={styles.upgrade} onPress={() => router.push('/paywall')}>
              <Text style={styles.upgradeText}>{t('common.upgrade')} · {t('common.premium')}</Text>
            </Pressable>
          )}
        </Card>

        {/* Language */}
        <Text style={styles.section}>{t('settings.language')}</Text>
        <Card>
          {SUPPORTED.map((l) => (
            <Pressable key={l} style={styles.langRow} onPress={() => changeLang(l)}>
              <Text style={styles.langName}>{LANGUAGE_NAMES[l]}</Text>
              <View style={[styles.radio, lang === l && styles.radioOn]} />
            </Pressable>
          ))}
        </Card>

        {/* Security */}
        <Text style={styles.section}>{t('lock.enableLock')}</Text>
        <Card>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{t('lock.enableLock')}</Text>
            <Switch
              value={lockEnabled}
              onValueChange={toggleLock}
              trackColor={{ true: c.primary, false: '#e2d7de' }}
              thumbColor="#fff"
            />
          </View>
        </Card>

        {/* Data / sign out */}
        <Pressable style={styles.signOut} onPress={() => { signOut(); router.back(); }}>
          <Text style={styles.signOutText}>{t('settings.signOut')}</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 22, paddingVertical: 14 },
  title: { fontSize: 22, fontWeight: '700', color: c.primaryDeep },
  close: { fontSize: 20, color: c.textMuted },
  section: { marginTop: 20, marginBottom: 10, fontSize: 14, fontWeight: '700', color: c.textStrong },
  accountName: { fontSize: 16, fontWeight: '600', color: c.text },
  premium: { marginTop: 6, color: c.lucid, fontWeight: '700' },
  upgrade: { marginTop: 12, backgroundColor: c.primary, borderRadius: 12, paddingVertical: 11, alignItems: 'center' },
  upgradeText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  langRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  langName: { fontSize: 15, color: c.text },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: c.border },
  radioOn: { borderColor: c.primary, backgroundColor: c.primary },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowLabel: { fontSize: 15, fontWeight: '600', color: c.text },
  signOut: { marginTop: 34, alignItems: 'center', paddingVertical: 14 },
  signOutText: { color: c.danger, fontSize: 15, fontWeight: '600' },
});
