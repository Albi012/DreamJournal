import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Screen, Card } from '../../components/ui';
import { ChevronIcon, LockIcon } from '../../components/Icons';
import { theme } from '../../lib/theme';
import { TECHNIQUES } from '../../lib/techniques';
import { usePremium } from '../../context/PremiumContext';
import { LIMITS } from '../../lib/limits';

const c = theme.colors;

export default function TechniquesScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isPremium } = usePremium();

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.h1}>{t('techniques.title')}</Text>
        <Text style={styles.sub}>{t('techniques.subtitle')}</Text>

        <View style={{ gap: 12, marginTop: 18 }}>
          {TECHNIQUES.map((tech) => {
            const free = LIMITS.freeTechniques.includes(tech.id);
            const locked = !free && !isPremium;
            return (
              <Pressable
                key={tech.id}
                onPress={() => router.push(locked ? '/paywall' : `/technique/${tech.id}`)}
              >
                <Card style={styles.item}>
                  <Text style={styles.icon}>{tech.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemTitle}>{tech.title}</Text>
                    <Text style={styles.itemSub}>{tech.subtitle}</Text>
                    <View style={styles.levelPill}>
                      <Text style={styles.levelText}>{tech.level}</Text>
                    </View>
                  </View>
                  {locked ? <LockIcon size={20} color={c.textFaint} /> : <ChevronIcon />}
                </Card>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: '700', color: c.primaryDeep },
  sub: { marginTop: 6, fontSize: 14, color: c.textMuted },
  item: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  icon: { fontSize: 26 },
  itemTitle: { fontSize: 16, fontWeight: '700', color: c.text },
  itemSub: { marginTop: 2, fontSize: 13, color: c.textMuted },
  levelPill: { marginTop: 8, alignSelf: 'flex-start', backgroundColor: c.chipBg, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999 },
  levelText: { fontSize: 11, color: c.primary, fontWeight: '600' },
});
