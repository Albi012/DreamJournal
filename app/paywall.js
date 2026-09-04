import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Screen } from '../components/ui';
import { CheckIcon } from '../components/Icons';
import { theme } from '../lib/theme';
import { usePremium } from '../context/PremiumContext';

const c = theme.colors;

export default function Paywall() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isPremium, setPremium } = usePremium();

  const features = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'];

  return (
    <Screen>
      <View style={styles.topbar}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.close}>✕</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{ padding: 26, paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.crown}>✦</Text>
        <Text style={styles.title}>{t('paywall.title')}</Text>
        <Text style={styles.subtitle}>{t('paywall.subtitle')}</Text>

        <View style={styles.features}>
          {features.map((f) => (
            <View key={f} style={styles.feature}>
              <CheckIcon size={18} color={c.primary} />
              <Text style={styles.featureText}>{t(`paywall.${f}`)}</Text>
            </View>
          ))}
        </View>

        <Pressable style={styles.cta} onPress={() => { /* RevenueCat purchase flow in store build */ }}>
          <Text style={styles.ctaText}>{t('paywall.cta')}</Text>
        </Pressable>
        <Text style={styles.trial}>{t('paywall.trial')}</Text>
        <Pressable onPress={() => { /* RevenueCat restore */ }}>
          <Text style={styles.restore}>{t('paywall.restore')}</Text>
        </Pressable>

        {/* Dev-only toggle so the whole freemium flow is testable now. */}
        <Pressable style={styles.devToggle} onPress={() => setPremium(!isPremium)}>
          <Text style={styles.devText}>
            {t('paywall.devToggle')}: {isPremium ? 'ON' : 'OFF'}
          </Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topbar: { alignItems: 'flex-end', paddingHorizontal: 22, paddingVertical: 10 },
  close: { fontSize: 20, color: c.textMuted },
  crown: { fontSize: 40, textAlign: 'center', color: c.lucid },
  title: { marginTop: 8, fontSize: 30, fontWeight: '700', color: c.primaryDeep, textAlign: 'center' },
  subtitle: { marginTop: 8, fontSize: 15, color: c.textMuted, textAlign: 'center' },
  features: { marginTop: 26, gap: 14, backgroundColor: '#fff', borderRadius: 20, padding: 20 },
  feature: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureText: { flex: 1, fontSize: 14, color: c.text, lineHeight: 20 },
  cta: { marginTop: 28, backgroundColor: c.primary, paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  trial: { marginTop: 10, fontSize: 12, color: c.textFaint, textAlign: 'center' },
  restore: { marginTop: 16, fontSize: 13, color: c.primary, textAlign: 'center', fontWeight: '600' },
  devToggle: { marginTop: 36, alignSelf: 'center', borderWidth: 1, borderColor: c.border, borderRadius: 999, paddingHorizontal: 16, paddingVertical: 8 },
  devText: { fontSize: 12, color: c.textFaint },
});
