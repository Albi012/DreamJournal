import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { theme, MOODS } from '../lib/theme';
import { Card } from './ui';
import { StarIcon } from './Icons';

const c = theme.colors;

function relativeDay(ts, t) {
  const d = new Date(ts);
  const today = new Date();
  const diff = Math.floor((today.setHours(0, 0, 0, 0) - new Date(ts).setHours(0, 0, 0, 0)) / 86400000);
  if (diff <= 0) return t('common.today');
  if (diff === 1) return t('common.yesterday');
  return d.toLocaleDateString();
}

export default function DreamCard({ dream, onPress, t }) {
  const mood = MOODS.find((m) => m.key === dream.mood) || MOODS[2];
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [pressed && { opacity: 0.85 }]}>
      <Card style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.title} numberOfLines={1}>
            {dream.title || t('journal.newDream')}
          </Text>
          {dream.lucid ? (
            <View style={styles.lucidBadge}>
              <StarIcon size={11} />
              <Text style={styles.lucidText}>Lucid</Text>
            </View>
          ) : (
            <Text style={styles.date}>{relativeDay(dream.date || dream.createdAt, t)}</Text>
          )}
        </View>
        {!!dream.body && (
          <Text style={styles.body} numberOfLines={2}>
            {dream.body}
          </Text>
        )}
        <View style={styles.footer}>
          <View style={[styles.moodChip, { backgroundColor: mood.bg }]}>
            <View style={[styles.dot, { backgroundColor: mood.color }]} />
            <Text style={[styles.moodText, { color: mood.color }]}>{mood.label}</Text>
          </View>
          {!!(dream.tags && dream.tags.length) && (
            <Text style={styles.tags} numberOfLines={1}>
              {dream.tags.map((tg) => `#${tg}`).join(' · ')}
            </Text>
          )}
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 14 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { flex: 1, fontSize: 16, fontWeight: '700', color: c.text, marginRight: 8 },
  date: { fontSize: 12, color: c.textFaint },
  lucidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#fbf0dc',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  lucidText: { color: c.lucid, fontSize: 11, fontWeight: '700' },
  body: { marginTop: 8, marginBottom: 12, fontSize: 13, lineHeight: 20, color: c.textMuted },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  moodChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 4,
    borderRadius: 999,
  },
  dot: { width: 7, height: 7, borderRadius: 4 },
  moodText: { fontSize: 12, fontWeight: '600' },
  tags: { flex: 1, fontSize: 12, color: c.textFaint },
});
