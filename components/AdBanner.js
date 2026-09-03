import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePremium } from '../context/PremiumContext';
import { shouldShowBanner } from '../lib/ads';
import { theme } from '../lib/theme';

const c = theme.colors;

// Placeholder banner. In the native build this renders a real AdMob
// <BannerAd/>. Premium users never see it.
export default function AdBanner() {
  const { isPremium } = usePremium();
  if (!shouldShowBanner(isPremium)) return null;
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>Hirdetés · reklámmentes a Prémiumban</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 52,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: c.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  text: { fontSize: 12, color: c.textFaint },
});
