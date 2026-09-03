import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Screen } from '../../components/ui';
import DreamCard from '../../components/DreamCard';
import AdBanner from '../../components/AdBanner';
import { PlusIcon, StarIcon } from '../../components/Icons';
import { theme } from '../../lib/theme';
import { useDreams } from '../../context/DreamsContext';
import { usePremium } from '../../context/PremiumContext';
import { LIMITS } from '../../lib/limits';
import { computeStreak, lucidStats } from '../../lib/stats';

const c = theme.colors;

export default function JournalScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { dreams } = useDreams();
  const { isPremium } = usePremium();
  const [q, setQ] = useState('');

  const streak = useMemo(() => computeStreak(dreams), [dreams]);
  const { rate } = useMemo(() => lucidStats(dreams), [dreams]);

  const filtered = useMemo(() => {
    let list = dreams;
    if (q.trim()) {
      const s = q.toLowerCase();
      list = dreams.filter(
        (d) =>
          (d.title || '').toLowerCase().includes(s) ||
          (d.body || '').toLowerCase().includes(s) ||
          (d.tags || []).some((tg) => tg.toLowerCase().includes(s))
      );
    }
    // Free tier: limit browsable archive (writing stays unlimited).
    if (!isPremium && !q.trim()) list = list.slice(0, LIMITS.freeArchive);
    return list;
  }, [dreams, q, isPremium]);

  const openDream = useCallback((id) => router.push(id ? `/dream?id=${id}` : '/dream'), [router]);

  return (
    <Screen>
      <FlatList
        data={filtered}
        keyExtractor={(d) => d.id}
        contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <View>
                <Text style={styles.brand}>Lucida</Text>
                <Text style={styles.greeting}>{t('journal.greeting')}</Text>
              </View>
              <Pressable style={styles.avatar} onPress={() => router.push('/settings')}>
                <Text style={styles.avatarText}>A</Text>
              </Pressable>
            </View>

            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>{t('insights.streak').toUpperCase()}</Text>
                <Text style={styles.statValue}>
                  {streak} <Text style={styles.statUnit}>{t('insights.days')}</Text>
                </Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>LUCID</Text>
                <Text style={[styles.statValue, { color: c.lucid }]}>{rate}%</Text>
              </View>
            </View>

            <TextInput
              style={styles.search}
              placeholder={t('journal.search')}
              placeholderTextColor={c.textFaint}
              value={q}
              onChangeText={setQ}
            />

            <View style={styles.sectionRow}>
              <Text style={styles.section}>{t('journal.recent')}</Text>
              <StarIcon size={13} color={c.lucid} />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <DreamCard dream={item} t={t} onPress={() => openDream(item.id)} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>{t('journal.empty')}</Text>}
        ListFooterComponent={<AdBanner />}
      />

      <Pressable style={styles.fab} onPress={() => openDream(null)}>
        <PlusIcon size={26} />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingTop: 8 },
  brand: { fontSize: 30, fontWeight: '600', color: c.primaryDeep },
  greeting: { marginTop: 4, fontSize: 14, color: c.textMuted },
  avatar: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#e7d6e6',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: c.primary, fontSize: 17, fontWeight: '700' },
  stats: { flexDirection: 'row', gap: 12, marginTop: 18 },
  stat: {
    flex: 1, backgroundColor: '#fff', borderRadius: 20, padding: 16,
    shadowColor: '#96788c', shadowOpacity: 0.1, shadowRadius: 14, shadowOffset: { width: 0, height: 6 }, elevation: 2,
  },
  statLabel: { fontSize: 11, letterSpacing: 0.6, color: c.textFaint, fontWeight: '600' },
  statValue: { marginTop: 4, fontSize: 26, fontWeight: '700', color: c.primaryDeep },
  statUnit: { fontSize: 13, color: c.textFaint, fontWeight: '500' },
  search: {
    marginTop: 18, backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12,
    fontSize: 14, color: c.text, borderWidth: 1, borderColor: c.border,
  },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 22, marginBottom: 10 },
  section: { fontSize: 19, fontWeight: '700', color: c.textStrong },
  empty: { textAlign: 'center', color: c.textMuted, fontSize: 14, lineHeight: 22, marginTop: 40 },
  fab: {
    position: 'absolute', right: 24, bottom: 104, width: 60, height: 60, borderRadius: 30,
    backgroundColor: c.accent, alignItems: 'center', justifyContent: 'center',
    shadowColor: c.accent, shadowOpacity: 0.45, shadowRadius: 16, shadowOffset: { width: 0, height: 10 }, elevation: 8,
  },
});
