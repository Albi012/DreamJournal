// Central design tokens — "Lágy hajnal" (Soft Dawn) direction.
// Light, calm, editorial: cream + lavender ground, warm amber accent,
// plum ink, soft shadows. Chosen visual direction for Lucida.
export const theme = {
  colors: {
    // Backgrounds (gradient stops for the app ground)
    bg: '#faf5ef',
    bgMid: '#f4ecf3',
    bgEnd: '#ece7f6',
    card: '#ffffff',
    cardShadow: 'rgba(150,120,150,0.10)',

    // Brand / ink
    primary: '#8a5f80', // plum — active nav, brand marks
    primaryDeep: '#6b4b63',
    accent: '#d98aa0', // rose — FAB / highlights
    accentWarm: '#e6a86b', // warm dawn glow
    lucid: '#c98a52', // amber — lucid badge / stats

    // Text
    text: '#4b3a48',
    textStrong: '#5f4557',
    textMuted: '#8d7d8a',
    textFaint: '#bcaaba',

    // Mood accents
    calm: '#8fc7b8',
    calmBg: '#e7f1ee',
    weird: '#c3a7dd',
    weirdBg: '#efe7f4',

    // States
    danger: '#d98a8a',
    success: '#7fb89f',

    // Misc
    border: '#efe6ec',
    chipBg: '#efe7f4',
  },
  gradientBg: ['#faf5ef', '#f4ecf3', '#ece7f6'],
  radius: { sm: 10, md: 16, lg: 22, pill: 999 },
  spacing: (n) => n * 4,
  // Intended type pairing for the "Soft Dawn" direction. Not wired yet —
  // load them with expo-font before referencing `family` in styles;
  // until then the app uses the platform system font.
  family: { display: 'Fraunces', body: 'Manrope' },
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
  { key: 'peaceful', label: 'Békés', emoji: '😌', color: '#8fc7b8', bg: '#e7f1ee' },
  { key: 'happy', label: 'Boldog', emoji: '😄', color: '#e6b467', bg: '#faf1de' },
  { key: 'neutral', label: 'Semleges', emoji: '😐', color: '#b0a4bb', bg: '#efeaf3' },
  { key: 'anxious', label: 'Szorongó', emoji: '😰', color: '#d98a8a', bg: '#f7e7e7' },
  { key: 'scary', label: 'Rémálom', emoji: '😱', color: '#c07a9a', bg: '#f4e4ee' },
  { key: 'weird', label: 'Furcsa', emoji: '🌀', color: '#c3a7dd', bg: '#efe7f4' },
];
