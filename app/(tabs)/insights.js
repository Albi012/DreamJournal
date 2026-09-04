import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Screen, Card } from '../../components/ui';
import Locked from '../../components/Locked';
import { theme, MOODS } from '../../lib/theme';
import { useDreams } from '../../context/DreamsContext';
import { usePremium } from '../../context/PremiumContext';
import {
  computeStreak, lucidStats, dreamSigns, moodBreakdown, activityByDay, earnedBadges,
} from '../../lib/stats';

const c = theme.colors;

function StatTile({ label, value, accent }) {
  return (
    <View style={styles.tile}>
      <Text style={styles.tileLabel}>{label}</Text>
      <Text style={[styles.tileValue, accent && { color: c.lucid }]}>{value}</Text>
    </View>
  );
}

export default function InsightsScreen() {
  const { t } = useTranslation();
  const { dreams } = useDreams();
  const { isPremium } = usePremium();

  const { total, lucid, rate } = useMemo(() => lucidStats(dreams), [dreams]);
  const streak = useMemo(() => computeStreak(dreams), [dreams]);
  const signs = useMemo(() => dreamSigns(dreams), [dreams]);
  const moods = useMemo(() => moodBreakdown(dreams), [dreams]);
  const activity = useMemo(() => activityByDay(dreams), [dreams]);
  const badges = useMemo(() => earnedBadges(dreams), [dreams]);
  const maxSign = signs[0]?.count || 1;

  const badgeList = [
    ['firstDream', badges.firstDream], ['firstLucid', badges.firstLucid],
    ['streak7', badges.streak7], ['lucid10', badges.lucid10],
    ['streak30', badges.streak30], ['dreams50', badges.dreams50],
  ];

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.h1}>{t('insights.title')}</Text>

        {total === 0 ? (
          <Text style={styles.empty}>{t('insights.noData')}</Text>
        ) : (
          <>
            <View style={styles.grid}>
              <StatTile label={t('insights.totalDreams')} value={total} />
              <StatTile label={t('insights.lucidCount')} value={lucid} accent />
              <StatTile label={t('insights.lucidRate')} value={`${rate}%`} accent />
              <StatTile label={t('insights.streak')} value={`${streak} ${t('insights.days')}`} />
            </View>

            {/* Badges */}
            <Text style={styles.section}>{t('badges.title')}</Text>
            <View style={styles.badges}>
              {badgeList.map(([key, earned]) => (
                <View key={key} style={[styles.badge, { opacity: earned ? 1 : 0.35 }]}>
                  <Text style={styles.badgeStar}>{earned ? '★' : '☆'}</Text>
                  <Text style={styles.badgeText}>{t(`badges.${key}`)}</Text>
                </View>
              ))}
            </View>

            {/* Mood breakdown (free) */}
            <Text style={styles.section}>{t('insights.moodBreakdown')}</Text>
            <Card>
              {MOODS.map((m) => {
                const n = moods[m.key] || 0;
                const pct = total ? Math.round((n / total) * 100) : 0;
                return (
                  <View key={m.key} style={styles.moodRow}>
                    <Text style={styles.moodEmoji}>{m.emoji}</Text>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: m.color }]} />
                    </View>
                    <Text style={styles.moodPct}>{pct}%</Text>
                  </View>
                );
              })}
            </Card>

            {/* Dream-sign cloud (premium) */}
            <Text style={styles.section}>{t('insights.signCloud')}</Text>
            {isPremium ? (
              <Card>
                <View style={styles.cloud}>
                  {signs.length === 0 && <Text style={styles.muted}>—</Text>}
                  {signs.map((s) => {
                    const scale = 13 + (s.count / maxSign) * 15;
                    return (
                      <Text key={s.tag} style={{ fontSize: scale, color: c.primary, fontWeight: '700', opacity: 0.5 + (s.count / maxSign) * 0.5 }}>
                        #{s.tag}
                      </Text>
                    );
                  })}
                </View>
              </Card>
            ) : (
              <Locked title={t('insights.signCloud')} subtitle={t('insights.premiumFeature')} />
            )}

            {/* Calendar heatmap (premium) */}
            <Text style={styles.section}>{t('insights.heatmap')}</Text>
            {isPremium ? (
              <Card>
                <View style={styles.heatmap}>
                  {activity.map((d, i) => {
                    const bg = d.lucid > 0 ? c.lucid : d.count > 0 ? c.primary : '#efe6ec';
                    const op = d.count > 0 ? Math.min(1, 0.35 + d.count * 0.35) : 1;
                    return <View key={i} style={[styles.cell, { backgroundColor: bg, opacity: op }]} />;
                  })}
                </View>
              </Card>
            ) : (
              <Locked title={t('insights.heatmap')} subtitle={t('insights.premiumFeature')} />
            )}
          </>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: '700', color: c.primaryDeep, marginBottom: 16 },
  empty: { color: c.textMuted, fontSize: 14, lineHeight: 22, marginTop: 30, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  tile: {
    width: '47%', flexGrow: 1, backgroundColor: '#fff', borderRadius: 18, padding: 16,
    shadowColor: '#96788c', shadowOpacity: 0.1, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 2,
  },
  tileLabel: { fontSize: 11, letterSpacing: 0.5, color: c.textFaint, fontWeight: '600' },
  tileValue: { marginTop: 6, fontSize: 24, fontWeight: '700', color: c.primaryDeep },
  section: { marginTop: 26, marginBottom: 12, fontSize: 17, fontWeight: '700', color: c.textStrong },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  badge: {
    width: '47%', flexGrow: 1, flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#fff', borderRadius: 14, padding: 12,
  },
  badgeStar: { fontSize: 18, color: c.lucid },
  badgeText: { fontSize: 13, fontWeight: '600', color: c.text },
  moodRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 },
  moodEmoji: { fontSize: 16, width: 24 },
  barTrack: { flex: 1, height: 10, borderRadius: 5, backgroundColor: '#f0e8ef', overflow: 'hidden' },
  barFill: { height: 10, borderRadius: 5 },
  moodPct: { width: 40, textAlign: 'right', fontSize: 12, color: c.textMuted, fontWeight: '600' },
  cloud: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, alignItems: 'center' },
  muted: { color: c.textFaint },
  heatmap: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  cell: { width: 20, height: 20, borderRadius: 5 },
});
