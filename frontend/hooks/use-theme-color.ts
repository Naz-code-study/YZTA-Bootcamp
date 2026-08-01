import { COLORS } from '../constants/theme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: string
) {
  // 1. Dışarıdan özel bir renk verildiyse onu kullan
  if (props.dark) return props.dark;
  if (props.light) return props.light;

  // 2. Expo'nun varsayılan bileşenleri için MoodTaste AI renk köprüsü
  if (colorName === 'text') return COLORS.textPrimary;
  if (colorName === 'background') return COLORS.background;
  if (colorName === 'tint') return COLORS.primary;
  if (colorName === 'icon') return COLORS.textSecondary;
  if (colorName === 'tabIconDefault') return COLORS.textMuted;
  if (colorName === 'tabIconSelected') return COLORS.primary;

  // 3. Eşleşmeyen diğer durumlar için varsayılan fallback
  return (COLORS as any)[colorName] || COLORS.textPrimary;
}