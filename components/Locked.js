import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { theme } from '../lib/theme';
import { LockIcon } from './Icons';

const c = theme.colors;

// Wraps a premium-only feature. Renders a soft "unlock" prompt that routes
// to the paywall. Use: <Locked title="…">…child preview…</Locked>
export default function Locked({ title, subtitle, compact }) {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <Pressable
      onPress={() => router.push('/paywall')}
      style={[styles.wrap, compact && styles.compact]}
    >
      <View style={styles.iconWrap}>
        <LockIcon size={compact ? 20 : 26} color={c.primary} />
      </View>
      <Text style={styles.title}>{title || t('insights.premiumFeature')}</Text>
      {!!subtitle && <Text style={styles.sub}>{subtitle}</Text>}
      <View style={styles.cta}>
        <Text style={styles.ctaText}>{t('common.upgrade')}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: theme.radius.lg,
    padding: 22,
    alignItems: 'center',
  },
  compact: { padding: 16 },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: c.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  title: { fontSize: 15, fontWeight: '700', color: c.primaryDeep, textAlign: 'center' },
  sub: { marginTop: 4, fontSize: 12, color: c.textMuted, textAlign: 'center' },
  cta: {
    marginTop: 12,
    backgroundColor: c.primary,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 999,
  },
  ctaText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
