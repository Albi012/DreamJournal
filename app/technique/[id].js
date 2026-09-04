import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Screen, Card } from '../../components/ui';
import { theme } from '../../lib/theme';
import { TECHNIQUES } from '../../lib/techniques';

const c = theme.colors;

export default function TechniqueDetail() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const tech = TECHNIQUES.find((x) => x.id === id);

  if (!tech) return <Screen><View /></Screen>;

  return (
    <Screen>
      <View style={styles.topbar}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>‹ {t('common.back')}</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.icon}>{tech.icon}</Text>
        <Text style={styles.title}>{tech.title}</Text>
        <Text style={styles.subtitle}>{tech.subtitle}</Text>
        <Text style={styles.intro}>{tech.intro}</Text>

        <Text style={styles.section}>{t('techniques.steps')}</Text>
        <Card>
          {tech.steps.map((s, i) => (
            <View key={i} style={styles.step}>
              <View style={styles.num}><Text style={styles.numText}>{i + 1}</Text></View>
              <Text style={styles.stepText}>{s}</Text>
            </View>
          ))}
        </Card>

        <Text style={styles.section}>{t('techniques.tips')}</Text>
        <Card>
          {tech.tips.map((tip, i) => (
            <View key={i} style={styles.tip}>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </Card>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topbar: { paddingHorizontal: 20, paddingVertical: 10 },
  back: { fontSize: 16, color: c.primary, fontWeight: '600' },
  icon: { fontSize: 40 },
  title: { marginTop: 8, fontSize: 28, fontWeight: '700', color: c.primaryDeep },
  subtitle: { marginTop: 4, fontSize: 15, color: c.textMuted },
  intro: { marginTop: 16, fontSize: 15, lineHeight: 23, color: c.text },
  section: { marginTop: 26, marginBottom: 12, fontSize: 17, fontWeight: '700', color: c.textStrong },
  step: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 8 },
  num: { width: 26, height: 26, borderRadius: 13, backgroundColor: c.primary, alignItems: 'center', justifyContent: 'center' },
  numText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  stepText: { flex: 1, fontSize: 14, lineHeight: 21, color: c.text },
  tip: { flexDirection: 'row', gap: 10, paddingVertical: 6 },
  dot: { color: c.accent, fontSize: 16, lineHeight: 20 },
  tipText: { flex: 1, fontSize: 14, lineHeight: 21, color: c.textMuted },
});
