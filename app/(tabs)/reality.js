import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Notifications from 'expo-notifications';
import { Screen, Card } from '../../components/ui';
import { EyeIcon, CheckIcon } from '../../components/Icons';
import Locked from '../../components/Locked';
import { theme } from '../../lib/theme';
import { usePremium } from '../../context/PremiumContext';
import { useAuth } from '../../context/AuthContext';
import { LIMITS } from '../../lib/limits';
import * as dbApi from '../../lib/db';
import { scheduleReminders, cancelReminders } from '../../lib/notifications';

const c = theme.colors;

export default function RealityScreen() {
  const { t } = useTranslation();
  const { isPremium } = usePremium();
  const { session } = useAuth();
  const [settings, setSettings] = useState(null);

  const maxCount = isPremium ? LIMITS.premiumReminders : LIMITS.freeReminders;

  useEffect(() => {
    (async () => setSettings(await dbApi.loadSettings(session)))();
  }, [session]);

  const update = async (patch) => {
    const next = { ...settings, ...patch };
    if (next.reminderCount > maxCount) next.reminderCount = maxCount;
    setSettings(next);
    await dbApi.saveSettings(session, next);
    if (next.reminderEnabled) {
      const { granted } = await Notifications.requestPermissionsAsync();
      if (granted) await scheduleReminders(next);
    } else {
      await cancelReminders();
    }
  };

  if (!settings) return <Screen><View /></Screen>;

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
        <View style={styles.head}>
          <View style={styles.iconWrap}><EyeIcon size={26} color={c.primary} /></View>
          <Text style={styles.title}>{t('reality.title')}</Text>
          <Text style={styles.subtitle}>{t('reality.subtitle')}</Text>
        </View>

        <Card style={{ marginTop: 8 }}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{t('reality.enable')}</Text>
            <Switch
              value={settings.reminderEnabled}
              onValueChange={(v) => update({ reminderEnabled: v })}
              trackColor={{ true: c.primary, false: '#e2d7de' }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.divider} />

          <Text style={styles.rowLabel}>{t('reality.count')}</Text>
          <View style={styles.counter}>
            {Array.from({ length: LIMITS.premiumReminders }).map((_, i) => {
              const n = i + 1;
              const locked = n > maxCount;
              const active = n <= settings.reminderCount;
              return (
                <Pressable
                  key={n}
                  disabled={locked}
                  onPress={() => update({ reminderCount: n })}
                  style={[
                    styles.tick,
                    { backgroundColor: active ? c.primary : locked ? '#efe6ec' : '#e7dfe8', opacity: locked ? 0.5 : 1 },
                  ]}
                />
              );
            })}
          </View>
          <Text style={styles.hint}>{t('reality.freeLimit')}</Text>
        </Card>

        <Text style={styles.methodsTitle}>{t('reality.methods')}</Text>
        <Card>
          {[t('reality.method1'), t('reality.method2'), t('reality.method3')].map((m, i) => (
            <View key={i} style={styles.method}>
              <CheckIcon size={18} color={c.success} />
              <Text style={styles.methodText}>{m}</Text>
            </View>
          ))}
        </Card>

        {!isPremium && (
          <View style={{ marginTop: 18 }}>
            <Locked compact subtitle={t('reality.freeLimit')} />
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { alignItems: 'center', marginBottom: 8, paddingTop: 8 },
  iconWrap: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  title: { fontSize: 24, fontWeight: '700', color: c.primaryDeep },
  subtitle: { marginTop: 6, fontSize: 14, color: c.textMuted, textAlign: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowLabel: { fontSize: 15, fontWeight: '600', color: c.text },
  divider: { height: 1, backgroundColor: c.border, marginVertical: 16 },
  counter: { flexDirection: 'row', gap: 6, marginTop: 12 },
  tick: { flex: 1, height: 10, borderRadius: 5 },
  hint: { marginTop: 12, fontSize: 12, color: c.textFaint },
  methodsTitle: { marginTop: 24, marginBottom: 10, fontSize: 17, fontWeight: '700', color: c.textStrong },
  method: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
  methodText: { flex: 1, fontSize: 14, color: c.textMuted, lineHeight: 20 },
});
