import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../lib/theme';

const c = theme.colors;

// Full-screen "Soft Dawn" gradient background.
export function Screen({ children, style }) {
  return (
    <LinearGradient colors={theme.gradientBg} style={{ flex: 1 }}>
      {/* warm sun wash top-left */}
      <View style={styles.sunWash} pointerEvents="none" />
      <SafeAreaView style={[{ flex: 1 }, style]} edges={['top']}>
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
}

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function Pill({ label, color = c.textMuted, bg = c.chipBg, style }) {
  return (
    <View style={[styles.pill, { backgroundColor: bg }, style]}>
      {typeof label === 'string' ? (
        <Text style={[styles.pillText, { color }]}>{label}</Text>
      ) : (
        label
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sunWash: {
    position: 'absolute',
    top: -70,
    left: -40,
    width: 280,
    height: 220,
    borderRadius: 140,
    backgroundColor: 'rgba(255,214,178,0.35)',
  },
  card: {
    backgroundColor: c.card,
    borderRadius: theme.radius.lg,
    padding: 18,
    shadowColor: '#96788c',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  pill: {
    paddingHorizontal: 11,
    paddingVertical: 4,
    borderRadius: theme.radius.pill,
    alignSelf: 'flex-start',
  },
  pillText: { fontSize: 12, fontWeight: '600' },
});
