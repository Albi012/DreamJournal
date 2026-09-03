import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { theme, MOODS } from '../lib/theme';

const c = theme.colors;

export default function MoodPicker({ value, onChange }) {
  return (
    <View style={styles.wrap}>
      {MOODS.map((m) => {
        const active = value === m.key;
        return (
          <Pressable
            key={m.key}
            onPress={() => onChange(m.key)}
            style={[
              styles.chip,
              { backgroundColor: active ? m.bg : '#fff', borderColor: active ? m.color : c.border },
            ]}
          >
            <Text style={styles.emoji}>{m.emoji}</Text>
            <Text style={[styles.label, { color: active ? m.color : c.textMuted }]}>{m.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1.5,
  },
  emoji: { fontSize: 15 },
  label: { fontSize: 13, fontWeight: '600' },
});
