// screens/HomeScreen.js
// MoodTaste AI - Ana Ekran

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import RecommendationCard from '../components/RecommendationCard';
import { MOOD_CHIPS, getFeaturedRecommendations } from '../data/mockData';
import { COLORS, GRADIENTS, SPACING, RADIUS, FONTS } from '../constants/theme';

const HomeScreen = () => {
  const [moodText, setMoodText] = useState('');
  const [selectedChip, setSelectedChip] = useState(null);
  const featured = getFeaturedRecommendations();

  const handleChipPress = (chip) => {
    setSelectedChip(chip.id === selectedChip ? null : chip.id);
    setMoodText(chip.label);
  };

  const handleSave = (id, isSaved) => {
    console.log(`[Mock] ${id} kaydetme durumu:`, isSaved);
  };

  const handleRate = (id, value) => {
    console.log(`[Mock] ${id} puanlandı:`, value);
  };

  const handleFindSimilar = (item) => {
    console.log('[Mock] Benzerleri aranıyor:', item.title);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Üst Karşılama */}
        <View style={styles.headerBlock}>
          <Text style={styles.greeting}>Merhaba 👋</Text>
          <Text style={styles.headerTitle}>Bugün nasıl hissediyorsun?</Text>
          <Text style={styles.headerSubtitle}>
            Ruh haline göre film, dizi, kitap ve daha fazlasını keşfet
          </Text>
        </View>

        {/* Duygu Durumu Girişi */}
        <View style={styles.searchBox}>
          <Ionicons name="sparkles-outline" size={18} color={COLORS.primaryLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Örn: Yorgunum ama sürükleyici bir şey istiyorum..."
            placeholderTextColor={COLORS.textMuted}
            value={moodText}
            onChangeText={setMoodText}
            multiline
          />
          <TouchableOpacity activeOpacity={0.8} style={styles.searchSendButton}>
            <LinearGradient
              colors={GRADIENTS.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.searchSendGradient}
            >
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Hızlı Duygu Çipleri */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
        >
          {MOOD_CHIPS.map((chip) => {
            const isActive = chip.id === selectedChip;
            return (
              <TouchableOpacity
                key={chip.id}
                onPress={() => handleChipPress(chip)}
                activeOpacity={0.8}
              >
                {isActive ? (
                  <LinearGradient
                    colors={GRADIENTS.primary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.chip}
                  >
                    <Ionicons name={chip.icon} size={14} color="#FFFFFF" />
                    <Text style={styles.chipTextActive}>{chip.label}</Text>
                  </LinearGradient>
                ) : (
                  <View style={[styles.chip, styles.chipInactive]}>
                    <Ionicons name={chip.icon} size={14} color={COLORS.textSecondary} />
                    <Text style={styles.chipText}>{chip.label}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Senin İçin Seçilenler */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>✨ Senin İçin Seçilenler</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={featured}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.cardsList}
          renderItem={({ item }) => (
            <RecommendationCard
              item={item}
              onSave={handleSave}
              onRate={handleRate}
              onFindSimilar={handleFindSimilar}
              style={styles.cardSpacing}
            />
          )}
        />

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
    paddingTop: Platform.OS === 'android' ? SPACING.lg : SPACING.sm,
    marginBottom: SPACING.md,
  },
  greeting: {
    ...FONTS.body,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  headerTitle: {
    ...FONTS.h1,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  headerSubtitle: {
    ...FONTS.body,
    color: COLORS.textSecondary,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    borderRadius: RADIUS.lg,
    marginHorizontal: SPACING.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    ...FONTS.body,
    maxHeight: 70,
    paddingTop: Platform.OS === 'ios' ? 4 : 0,
  },
  searchSendButton: {
    marginLeft: 4,
  },
  searchSendGradient: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipsRow: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.pill,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginRight: SPACING.sm,
    gap: 6,
  },
  chipInactive: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  chipText: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    marginLeft: 6,
    fontWeight: '600',
  },
  chipTextActive: {
    ...FONTS.caption,
    color: '#FFFFFF',
    marginLeft: 6,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.textPrimary,
  },
  sectionAction: {
    ...FONTS.caption,
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  cardsList: {
    paddingHorizontal: SPACING.lg,
  },
  cardSpacing: {
    marginRight: SPACING.md,
  },
});

export default HomeScreen;