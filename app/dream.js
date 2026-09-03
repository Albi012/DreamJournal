import React, { useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, Pressable, ScrollView, Switch, Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Screen } from '../components/ui';
import MoodPicker from '../components/MoodPicker';
import { theme } from '../lib/theme';
import { useDreams } from '../context/DreamsContext';
import { usePremium } from '../context/PremiumContext';
import { showInterstitialMaybe } from '../lib/ads';

const c = theme.colors;

export default function DreamEditor() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { dreams, save, remove } = useDreams();
  const { isPremium } = usePremium();

  const existing = useMemo(() => dreams.find((d) => d.id === id), [dreams, id]);

  const [title, setTitle] = useState(existing?.title || '');
  const [body, setBody] = useState(existing?.body || '');
  const [mood, setMood] = useState(existing?.mood || 'neutral');
  const [lucid, setLucid] = useState(existing?.lucid || false);
  const [tagText, setTagText] = useState((existing?.tags || []).join(', '));
  const [quality, setQuality] = useState(existing?.quality ?? 3);

  const onSave = async () => {
    const tags = tagText
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    await save({ id: existing?.id, createdAt: existing?.createdAt, title, body, mood, lucid, tags, quality });
    await showInterstitialMaybe({ isPremium, dreamCount: dreams.length + (existing ? 0 : 1) });
    router.back();
  };

  const onDelete = () => {
    Alert.alert('', t('journal.deleteConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => { await remove(existing.id); router.back(); },
      },
    ]);
  };

  return (
    <Screen>
      <View style={styles.topbar}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.cancel}>{t('common.cancel')}</Text>
        </Pressable>
        <Text style={styles.title}>{existing ? t('journal.editDream') : t('journal.newDream')}</Text>
        <Pressable onPress={onSave}>
          <Text style={styles.save}>{t('common.save')}</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 60 }} keyboardShouldPersistTaps="handled">
        <TextInput
          style={styles.titleInput}
          placeholder={t('journal.titlePlaceholder')}
          placeholderTextColor={c.textFaint}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>{t('journal.body')}</Text>
        <TextInput
          style={styles.bodyInput}
          placeholder={t('journal.bodyPlaceholder')}
          placeholderTextColor={c.textFaint}
          value={body}
          onChangeText={setBody}
          multiline
          textAlignVertical="top"
        />

        <Text style={styles.label}>{t('journal.mood')}</Text>
        <MoodPicker value={mood} onChange={setMood} />

        <View style={styles.lucidRow}>
          <Text style={styles.lucidLabel}>{t('journal.lucid')}</Text>
          <Switch
            value={lucid}
            onValueChange={setLucid}
            trackColor={{ true: c.lucid, false: '#e2d7de' }}
            thumbColor="#fff"
          />
        </View>

        <Text style={styles.label}>{t('journal.tags')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('journal.tagsPlaceholder')}
          placeholderTextColor={c.textFaint}
          value={tagText}
          onChangeText={setTagText}
          autoCapitalize="none"
        />

        <Text style={styles.label}>{t('journal.quality')}</Text>
        <View style={styles.quality}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Pressable
              key={n}
              onPress={() => setQuality(n)}
              style={[styles.qDot, { backgroundColor: n <= quality ? c.primary : '#e7dfe8' }]}
            />
          ))}
        </View>

        {existing && (
          <Pressable style={styles.delete} onPress={onDelete}>
            <Text style={styles.deleteText}>{t('common.delete')}</Text>
          </Pressable>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 12,
  },
  cancel: { fontSize: 15, color: c.textMuted },
  title: { fontSize: 16, fontWeight: '700', color: c.primaryDeep },
  save: { fontSize: 15, color: c.primary, fontWeight: '700' },
  titleInput: { fontSize: 22, fontWeight: '700', color: c.text, paddingVertical: 6 },
  label: { marginTop: 22, marginBottom: 10, fontSize: 13, fontWeight: '700', color: c.textStrong, letterSpacing: 0.3 },
  input: {
    backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 15, color: c.text, borderWidth: 1, borderColor: c.border,
  },
  bodyInput: {
    backgroundColor: '#fff', borderRadius: 14, padding: 14, minHeight: 130,
    fontSize: 15, lineHeight: 22, color: c.text, borderWidth: 1, borderColor: c.border,
  },
  lucidRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginTop: 22, backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 12,
    borderWidth: 1, borderColor: c.border,
  },
  lucidLabel: { fontSize: 15, fontWeight: '600', color: c.text },
  quality: { flexDirection: 'row', gap: 12 },
  qDot: { width: 34, height: 34, borderRadius: 17 },
  delete: { marginTop: 36, alignItems: 'center', paddingVertical: 14 },
  deleteText: { color: c.danger, fontSize: 15, fontWeight: '600' },
});
