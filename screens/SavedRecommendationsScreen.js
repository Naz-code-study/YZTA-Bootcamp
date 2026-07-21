// screens/SavedRecommendationsScreen.js
// MoodTaste AI - Kayıtlı Önerilerim Ekranı

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
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
import { COLORS, FONTS, GRADIENTS, RADIUS, SPACING } from "../constants/theme";
import { SAVED_FILTERS, getSavedRecommendations } from "../data/mockData";

const SavedRecommendationsScreen = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");

  const savedItems = useMemo(
    () => getSavedRecommendations(activeFilter),
    [activeFilter],
  );

  const activeFilterMeta = SAVED_FILTERS.find((f) => f.id === activeFilter);

  const handleSave = (id, isSaved) => {
    console.log(`[Mock] ${id} kaydetme durumu:`, isSaved);
  };

  const handleRate = (id, value) => {
    console.log(`[Mock] ${id} puanlandı:`, value);
  };

  const handleFindSimilar = (item) => {
    console.log("[Mock] Benzerleri aranıyor:", item.title);
  };

  const goToHome = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Başlık */}
      <View style={styles.headerBlock}>
        <Text style={styles.headerTitle}>Kayıtlı Önerilerim</Text>
        <Text style={styles.headerSubtitle}>
          Beğendiğin ama sırası gelmeyen keşiflerin burada seni bekliyor
        </Text>
      </View>

      {/* Kategori Filtre Çipleri */}
      <FlatList
        data={SAVED_FILTERS}
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
                  <Ionicons name={item.icon} size={14} color="#FFFFFF" />
                  <Text style={styles.filterChipTextActive}>{item.label}</Text>
                </LinearGradient>
              ) : (
                <View style={[styles.filterChip, styles.filterChipInactive]}>
                  <Ionicons
                    name={item.icon}
                    size={14}
                    color={COLORS.textSecondary}
                  />
                  <Text style={styles.filterChipText}>{item.label}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />

      {/* İçerik Listesi veya Boş Durum */}
      {savedItems.length > 0 ? (
        <FlatList
          data={savedItems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <RecommendationCard
              item={item}
              onSave={handleSave}
              onRate={handleRate}
              onFindSimilar={handleFindSimilar}
              style={styles.fullWidthCard}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: SPACING.md }} />}
        />
      ) : (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconWrap}>
            <Ionicons
              name="bookmark-outline"
              size={38}
              color={COLORS.textMuted}
            />
          </View>
          <Text style={styles.emptyTitle}>
            Henüz bu kategoride bir öneri kaydetmedin
          </Text>
          <Text style={styles.emptySubtitle}>
            {activeFilterMeta && activeFilterMeta.id !== "all"
              ? `${activeFilterMeta.label} kategorisinde beğendiğin bir öneriyi kaydet, burada listelensin.`
              : "Beğendiğin önerileri kaydet butonuna dokunarak burada biriktirebilirsin."}
          </Text>
          <TouchableOpacity onPress={goToHome} activeOpacity={0.85}>
            <LinearGradient
              colors={GRADIENTS.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.emptyButton}
            >
              <Ionicons name="compass-outline" size={16} color="#FFFFFF" />
              <Text style={styles.emptyButtonText}>Keşfetmeye Başla</Text>
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
  filtersList: {
    flexGrow: 0,
    height: 56,
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
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginRight: SPACING.sm,
    gap: 6,
  },
  filterChipInactive: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  filterChipText: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    marginLeft: 6,
    fontWeight: "600",
  },
  filterChipTextActive: {
    ...FONTS.caption,
    color: "#FFFFFF",
    marginLeft: 6,
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

export default SavedRecommendationsScreen;
