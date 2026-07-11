// screens/TasteDNAScreen.js
// MoodTaste AI - Zevk DNA ve Profil Haritası Ekranı

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import RadarChart from '../components/RadarChart';
import {
  DOMINANT_PROFILE,
  TASTE_DNA_DATA,
  CATEGORY_PROGRESS,
  AVOIDED_THEMES,
  EXPLORE_THEMES,
} from '../data/mockData';
import { COLORS, GRADIENTS, SPACING, RADIUS, FONTS, CATEGORY_META } from '../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_SIZE = Math.min(SCREEN_WIDTH - SPACING.lg * 2 - SPACING.md * 2, 320);

const TasteDNAScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Başlık */}
        <View style={styles.headerBlock}>
          <Text style={styles.eyebrow}>ZEVK PROFİLİ</Text>
          <Text style={styles.headerTitle}>Zevk DNA'n</Text>
          <Text style={styles.headerSubtitle}>
            Puanların, yorumların ve kaydettiğin önerilerden çıkarılan kişisel haritan
          </Text>
        </View>

        {/* Baskın Profil Kartı */}
        <LinearGradient
          colors={GRADIENTS.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.dominantCard}
        >
          <View style={styles.dominantIconWrap}>
            <Ionicons name="sparkles" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.dominantLabel}>Baskın Profilin</Text>
          <Text style={styles.dominantTitle}>{DOMINANT_PROFILE.title}</Text>
          <Text style={styles.dominantDescription}>{DOMINANT_PROFILE.description}</Text>
        </LinearGradient>

        {/* Radar Grafiği Kartı */}
        <View style={styles.radarCard}>
          <View style={styles.radarCardHeader}>
            <Ionicons name="analytics-outline" size={16} color={COLORS.primaryLight} />
            <Text style={styles.radarCardTitle}>Tema Dağılımın</Text>
          </View>
          <View style={styles.radarChartWrap}>
            <RadarChart data={TASTE_DNA_DATA} size={CHART_SIZE} />
          </View>
        </View>

        {/* Kategori Uyum Yüzdeleri */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>📊 Kategori Uyum Yüzdeleri</Text>
          <View style={styles.progressCard}>
            {CATEGORY_PROGRESS.map((item) => {
              const meta = CATEGORY_META[item.category];
              return (
                <View key={item.category} style={styles.progressRow}>
                  <View style={styles.progressLabelRow}>
                    <View style={styles.progressLabelLeft}>
                      <Ionicons name={meta.icon} size={14} color={meta.color} />
                      <Text style={styles.progressLabel}>{meta.label}</Text>
                    </View>
                    <Text style={styles.progressPercentage}>%{item.percentage}</Text>
                  </View>
                  <View style={styles.progressTrack}>
                    <LinearGradient
                      colors={[meta.color, 'rgba(255,255,255,0.4)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[styles.progressFill, { width: `${item.percentage}%` }]}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Kaçındığı Temalar */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>🚫 Kaçındığın Temalar</Text>
          <View style={styles.tagCloud}>
            {AVOIDED_THEMES.map((theme) => (
              <View key={theme} style={styles.avoidTag}>
                <Ionicons name="close-circle-outline" size={13} color={COLORS.textMuted} />
                <Text style={styles.avoidTagText}>{theme}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Keşfetmeye Açık Olduğu Alanlar */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>🧭 Keşfetmeye Açık Olduğun Alanlar</Text>
          <View style={styles.tagCloud}>
            {EXPLORE_THEMES.map((theme) => (
              <View key={theme} style={styles.exploreTag}>
                <Ionicons name="compass-outline" size={13} color={COLORS.matchGreen} />
                <Text style={styles.exploreTagText}>{theme}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Alt navigasyon barı için boşluk */}
        <View style={{ height: 110 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  headerBlock: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  eyebrow: {
    ...FONTS.tiny,
    color: COLORS.primaryLight,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  headerTitle: {
    ...FONTS.h1,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  headerSubtitle: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  dominantCard: {
    marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  dominantIconWrap: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  dominantLabel: {
    ...FONTS.tiny,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
    marginBottom: 4,
  },
  dominantTitle: {
    ...FONTS.h2,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  dominantDescription: {
    ...FONTS.body,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
  radarCard: {
    marginHorizontal: SPACING.lg,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  radarCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    marginBottom: SPACING.sm,
  },
  radarCardTitle: {
    ...FONTS.h3,
    color: COLORS.textPrimary,
    marginLeft: 6,
  },
  radarChartWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
  },
  sectionBlock: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  progressCard: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
  },
  progressRow: {
    marginBottom: SPACING.md,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressLabelLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  progressLabel: {
    ...FONTS.caption,
    color: COLORS.textPrimary,
    marginLeft: 6,
    fontWeight: '600',
  },
  progressPercentage: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  progressTrack: {
    height: 8,
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: RADIUS.pill,
  },
  tagCloud: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  avoidTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: RADIUS.pill,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginRight: 8,
    marginBottom: 8,
    gap: 5,
  },
  avoidTagText: {
    ...FONTS.caption,
    color: COLORS.textMuted,
    marginLeft: 5,
  },
  exploreTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34,255,176,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(34,255,176,0.25)',
    borderRadius: RADIUS.pill,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginRight: 8,
    marginBottom: 8,
    gap: 5,
  },
  exploreTagText: {
    ...FONTS.caption,
    color: COLORS.matchGreen,
    marginLeft: 5,
    fontWeight: '600',
  },
});

export default TasteDNAScreen;