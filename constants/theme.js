// constants/theme.js
// MoodTaste AI - Merkezi Tasarım Sistemi
// Tüm ekran ve bileşenler renk/spacing değerlerini buradan çeker.

export const COLORS = {
  // Arka planlar
  background: '#0A0A12',
  backgroundAlt: '#0F0F1B',
  cardBackground: '#151521',
  cardBackgroundAlt: '#1B1B2B',
  cardBorder: 'rgba(255,255,255,0.08)',
  glassBorder: 'rgba(255,255,255,0.12)',

  // Metin
  textPrimary: '#F5F5FA',
  textSecondary: '#A0A0B8',
  textMuted: '#6B6B80',

  // Neon vurgu renkleri
  primary: '#8B5CF6', // neon mor
  primaryLight: '#A78BFA',
  secondary: '#F472B6', // neon pembe
  accentBlue: '#38BDF8',
  matchGreen: '#22FFB0', // uyum skoru neonu
  warningAmber: '#FBBF24',
  starGold: '#FFC542',

  // Kategori renkleri
  categoryFilm: '#8B5CF6',
  categoryDizi: '#F472B6',
  categoryKitap: '#38BDF8',
  categoryYemek: '#FB923C',
  categoryMuzik: '#34D399',
  categoryOyun: '#F87171',
  categoryPodcast: '#A78BFA',
};

export const GRADIENTS = {
  primary: ['#8B5CF6', '#EC4899'],
  match: ['#22FFB0', '#0FBF8F'],
  header: ['#1B1030', '#0A0A12'],
  cardGlow: ['rgba(139,92,246,0.15)', 'rgba(244,114,182,0.05)'],
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
};

export const FONTS = {
  h1: { fontSize: 28, fontWeight: '800' },
  h2: { fontSize: 20, fontWeight: '700' },
  h3: { fontSize: 16, fontWeight: '700' },
  body: { fontSize: 14, fontWeight: '400' },
  caption: { fontSize: 12, fontWeight: '500' },
  tiny: { fontSize: 11, fontWeight: '600' },
};

// Kategoriye göre ikon ve renk eşleştirmesi (Ionicons/MaterialCommunityIcons isimleri)
export const CATEGORY_META = {
  film: { label: 'Film', icon: 'film-outline', color: COLORS.categoryFilm },
  dizi: { label: 'Dizi', icon: 'tv-outline', color: COLORS.categoryDizi },
  kitap: { label: 'Kitap', icon: 'book-outline', color: COLORS.categoryKitap },
  yemek: { label: 'Yemek', icon: 'restaurant-outline', color: COLORS.categoryYemek },
  muzik: { label: 'Müzik', icon: 'musical-notes-outline', color: COLORS.categoryMuzik },
  oyun: { label: 'Oyun', icon: 'game-controller-outline', color: COLORS.categoryOyun },
  podcast: { label: 'Podcast', icon: 'mic-outline', color: COLORS.categoryPodcast },
};
