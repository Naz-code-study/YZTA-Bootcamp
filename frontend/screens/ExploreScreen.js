// screens/ExploreScreen.js
// MoodTaste AI - "Benzerlerini Bul" Keşif Akışı
// RecommendationCard'daki "Benzerlerini Bul" butonundan veya alt menüdeki
// Keşfet sekmesinden ulaşılır.

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import RecommendationCard from "../components/RecommendationCard";
import {
  CATEGORY_META,
  COLORS,
  FONTS,
  GRADIENTS,
  RADIUS,
  SPACING,
} from "../constants/theme";
import { EXPLORE_FILTERS, getExploreRecommendations } from "../data/mockData";

const ExploreScreen = () => {
  const params = useLocalSearchParams();
  const { sourceId, sourceTitle, sourceCategory } = params;

  const [activeFilter, setActiveFilter] = useState("all");
  const [bannerVisible, setBannerVisible] = useState(!!sourceTitle);

  const results = useMemo(
    () =>
      getExploreRecommendations(activeFilter, bannerVisible ? sourceId : null),
    [activeFilter, bannerVisible, sourceId],
  );

  const sourceCategoryMeta = sourceCategory
    ? CATEGORY_META[sourceCategory]
    : null;

  const handleSave = (id, isSaved) => {
    console.log(`[Mock] ${id} kaydetme durumu:`, isSaved);
  };

  const handleRate = (id, value) => {
    console.log(`[Mock] ${id} puanlandı:`, value);
  };

  const dismissBanner = () => setBannerVisible(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Başlık */}
      <View style={styles.headerBlock}>
        <View style={styles.eyebrowRow}>
          <Ionicons
            name="compass-outline"
            size={14}
            color={COLORS.primaryLight}
          />
          <Text style={styles.eyebrow}>KEŞFET</Text>
        </View>
        <Text style={styles.headerTitle}>Yeni Keşifler</Text>
        <Text style={styles.headerSubtitle}>
          Zevk profiline yakın ama alışkanlıklarının dışına çıkan içerikler
        </Text>
      </View>

      {/* Kaynak İçerik Banner'ı ("X'e benzer içerikler görüntüleniyor") */}
      {bannerVisible && !!sourceTitle && (
        <LinearGradient
          colors={GRADIENTS.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.sourceBanner}
        >
          <View style={styles.sourceBannerLeft}>
            {sourceCategoryMeta && (
              <Ionicons
                name={sourceCategoryMeta.icon}
                size={16}
                color="#FFFFFF"
              />
            )}
            <Text style={styles.sourceBannerText} numberOfLines={1}>
              <Text style={styles.sourceBannerBold}>{sourceTitle}</Text>{" "}
              içeriğine benzer öneriler
            </Text>
          </View>
          <TouchableOpacity onPress={dismissBanner} hitSlop={8}>
            <Ionicons
              name="close-circle"
              size={20}
              color="rgba(255,255,255,0.85)"
            />
          </TouchableOpacity>
        </LinearGradient>
      )}

      {/* Filtre Çipleri */}
      <FlatList
        data={EXPLORE_FILTERS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        style={styles.filtersList}
        contentContainerStyle={styles.filtersRow}
        renderItem={({ item }) => {
          const isActive = item.id === activeFilter;
          return (
            <TouchableOpacity
              onPress={() => setActiveFilter(item.id)}
              activeOpacity={0.8}
            >
              {isActive ? (
                <LinearGradient
                  colors={GRADIENTS.primary}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.filterChip}
                >
                  <Ionicons name={item.icon} size={13} color="#FFFFFF" />
                  <Text style={styles.filterChipTextActive}>{item.label}</Text>
                </LinearGradient>
              ) : (
                <View style={[styles.filterChip, styles.filterChipInactive]}>
                  <Ionicons
                    name={item.icon}
                    size={13}
                    color={COLORS.textSecondary}
                  />
                  <Text style={styles.filterChipText}>{item.label}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />

      {/* Sonuç Listesi */}
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <RecommendationCard
              item={item}
              onSave={handleSave}
              onRate={handleRate}
              style={styles.fullWidthCard}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: SPACING.md }} />}
        />
      ) : (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconWrap}>
            <Ionicons
              name="telescope-outline"
              size={34}
              color={COLORS.textMuted}
            />
          </View>
          <Text style={styles.emptyTitle}>Bu filtrede henüz içerik yok</Text>
          <Text style={styles.emptySubtitle}>
            Başka bir kategori dene, keşfedecek çok şey var.
          </Text>
          <TouchableOpacity
            onPress={() => setActiveFilter("all")}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={GRADIENTS.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.emptyButton}
            >
              <Ionicons name="apps-outline" size={16} color="#FFFFFF" />
              <Text style={styles.emptyButtonText}>Tümünü Göster</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerBlock: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  eyebrowRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  eyebrow: {
    ...FONTS.tiny,
    color: COLORS.primaryLight,
    letterSpacing: 1.4,
    marginLeft: 6,
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
  sourceBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    paddingVertical: 10,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  sourceBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 6,
    marginRight: SPACING.sm,
  },
  sourceBannerText: {
    ...FONTS.caption,
    color: "rgba(255,255,255,0.95)",
    marginLeft: 6,
    flexShrink: 1,
  },
  sourceBannerBold: {
    fontWeight: "800",
    color: "#FFFFFF",
  },
  filtersList: {
    flexGrow: 0,
    height: 50,
    marginBottom: SPACING.sm,
  },
  filtersRow: {
    paddingHorizontal: SPACING.lg,
    alignItems: "center",
    gap: SPACING.sm,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: RADIUS.pill,
    paddingHorizontal: 13,
    paddingVertical: 8,
    marginRight: SPACING.sm,
    gap: 5,
  },
  filterChipInactive: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  filterChipText: {
    ...FONTS.tiny,
    color: COLORS.textSecondary,
    marginLeft: 5,
    fontWeight: "600",
  },
  filterChipTextActive: {
    ...FONTS.tiny,
    color: "#FFFFFF",
    marginLeft: 5,
    fontWeight: "700",
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 130,
  },
  fullWidthCard: {
    width: "100%",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.xl,
    paddingBottom: 130,
  },
  emptyIconWrap: {
    width: 76,
    height: 76,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    ...FONTS.h3,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtitle: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
  emptyButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: RADIUS.pill,
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 6,
  },
  emptyButtonText: {
    ...FONTS.caption,
    color: "#FFFFFF",
    fontWeight: "700",
    marginLeft: 6,
  },
});

export default ExploreScreen;
