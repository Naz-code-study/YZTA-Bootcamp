// components/RecommendationCard.js
// MoodTaste AI - Öneri Sonuç Kartı
// Kullanım: <RecommendationCard item={item} onSave={fn} onRate={fn} onFindSimilar={fn} />

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, SPACING, RADIUS, FONTS, CATEGORY_META } from '../constants/theme';

const RecommendationCard = ({ item, onSave, onRate, onFindSimilar, style }) => {
  const [saved, setSaved] = useState(item?.saved ?? false);
  const [rating, setRating] = useState(item?.userRating ?? 0);

  if (!item) return null;

  const categoryInfo = CATEGORY_META[item.category] ?? {
    label: item.category,
    icon: 'sparkles-outline',
    color: COLORS.primary,
  };

  const handleSave = () => {
    const nextValue = !saved;
    setSaved(nextValue);
    if (onSave) onSave(item.id, nextValue);
  };

  const handleRate = (value) => {
    const nextValue = rating === value ? 0 : value;
    setRating(nextValue);
    if (onRate) onRate(item.id, nextValue);
  };

  const handleFindSimilar = () => {
    if (onFindSimilar) onFindSimilar(item);
  };

  return (
    <View style={[styles.card, style]}>
      {/* Üst Şerit: Kategori + Uyum Skoru */}
      <View style={styles.topRow}>
        <View style={[styles.categoryPill, { borderColor: categoryInfo.color }]}>
          <Ionicons name={categoryInfo.icon} size={13} color={categoryInfo.color} />
          <Text style={[styles.categoryPillText, { color: categoryInfo.color }]}>
            {categoryInfo.label}
          </Text>
        </View>

        <LinearGradient
          colors={GRADIENTS.match}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.matchBadge}
        >
          <Ionicons name="sparkles" size={11} color={COLORS.background} />
          <Text style={styles.matchBadgeText}>%{item.matchPercentage} Uyumlu</Text>
        </LinearGradient>
      </View>

      {/* Başlık ve Alt Bilgi */}
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      {!!item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}

      {/* Açıklama */}
      {!!item.description && (
        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>
      )}

      {/* Etiketler */}
      <View style={styles.tagsRow}>
        {item.tags?.slice(0, 4).map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* AI Notu */}
      {!!item.aiNote && (
        <View style={styles.aiNoteBox}>
          <View style={styles.aiNoteHeader}>
            <Ionicons name="sparkles-outline" size={14} color={COLORS.primaryLight} />
            <Text style={styles.aiNoteLabel}>AI Notu</Text>
          </View>
          <Text style={styles.aiNoteText}>{item.aiNote}</Text>
        </View>
      )}

      <View style={styles.divider} />

      {/* Aksiyonlar */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton} onPress={handleSave} activeOpacity={0.7}>
          <Ionicons
            name={saved ? 'bookmark' : 'bookmark-outline'}
            size={18}
            color={saved ? COLORS.secondary : COLORS.textSecondary}
          />
          <Text style={[styles.actionText, saved && { color: COLORS.secondary }]}>
            {saved ? 'Kaydedildi' : 'Kaydet'}
          </Text>
        </TouchableOpacity>

        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((value) => (
            <TouchableOpacity key={value} onPress={() => handleRate(value)} hitSlop={6}>
              <Ionicons
                name={value <= rating ? 'star' : 'star-outline'}
                size={16}
                color={value <= rating ? COLORS.starGold : COLORS.textMuted}
                style={{ marginHorizontal: 1 }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity onPress={handleFindSimilar} activeOpacity={0.85}>
        <LinearGradient
          colors={GRADIENTS.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.similarButton}
        >
          <Ionicons name="git-network-outline" size={15} color="#FFFFFF" />
          <Text style={styles.similarButtonText}>Benzerlerini Bul</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: SPACING.md,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  categoryPillText: {
    ...FONTS.tiny,
    marginLeft: 4,
  },
  matchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  matchBadgeText: {
    ...FONTS.tiny,
    color: COLORS.background,
    marginLeft: 4,
    fontWeight: '800',
  },
  title: {
    ...FONTS.h2,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    ...FONTS.caption,
    color: COLORS.textMuted,
    marginBottom: SPACING.sm,
  },
  description: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    lineHeight: 19,
    marginBottom: SPACING.sm,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: SPACING.sm,
  },
  tag: {
    backgroundColor: 'rgba(139,92,246,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.3)',
    borderRadius: RADIUS.pill,
    paddingHorizontal: 9,
    paddingVertical: 3,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    ...FONTS.tiny,
    color: COLORS.primaryLight,
  },
  aiNoteBox: {
    backgroundColor: 'rgba(56,189,248,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(56,189,248,0.18)',
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  aiNoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  aiNoteLabel: {
    ...FONTS.tiny,
    color: COLORS.primaryLight,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  aiNoteText: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    lineHeight: 17,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginVertical: SPACING.sm,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  actionText: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    marginLeft: 5,
    fontWeight: '600',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  similarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
    paddingVertical: 11,
    gap: 6,
  },
  similarButtonText: {
    ...FONTS.caption,
    color: '#FFFFFF',
    fontWeight: '700',
    marginLeft: 6,
  },
});

export default RecommendationCard;