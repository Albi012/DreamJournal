// Central design tokens for the app's dark, dreamy aesthetic.
export const theme = {
  colors: {
    bg: '#0b1026',
    bgElevated: '#141a38',
    card: '#1a2145',
    cardBorder: '#2a3266',
    primary: '#8b7cf6',
    primaryDark: '#6b5cd6',
    accent: '#5ad1e6',
    lucid: '#ffd479',
    text: '#eef1ff',
    textMuted: '#9aa3cf',
    textFaint: '#6b74a3',
    danger: '#ff6b8b',
    success: '#5ae0a0',
  },
  radius: { sm: 8, md: 14, lg: 22, pill: 999 },
  spacing: (n) => n * 4,
  font: {
    h1: 30,
    h2: 22,
    h3: 17,
    body: 15,
    small: 13,
    tiny: 11,
  },
};

// Mood options used across the journal and stats.
export const MOODS = [
  { key: 'peaceful', label: 'Békés', emoji: '😌' },
  { key: 'happy', label: 'Boldog', emoji: '😄' },
  { key: 'neutral', label: 'Semleges', emoji: '😐' },
  { key: 'anxious', label: 'Szorongó', emoji: '😰' },
  { key: 'scary', label: 'Rémálom', emoji: '😱' },
  { key: 'weird', label: 'Furcsa', emoji: '🌀' },
];
