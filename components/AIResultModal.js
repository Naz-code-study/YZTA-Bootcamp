// components/AIResultModal.js
// MoodTaste AI - Analiz Tamamlandığında Gösterilen Sonuç Sheet'i

import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import RecommendationCard from './RecommendationCard';
import { COLORS, GRADIENTS, SPACING, RADIUS, FONTS } from '../constants/theme';

const AIResultModal = ({ visible, moodLabel, items = [], onClose, onSave, onRate, onFindSimilar }) => {
  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={onClose} />

        <View style={styles.sheet}>
          <View style={styles.grabber} />

          <View style={styles.headerRow}>
            <View style={styles.headerIconWrap}>
              <LinearGradient
                colors={GRADIENTS.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.headerIconGradient}
              >
                <Ionicons name="sparkles" size={16} color="#FFFFFF" />
              </LinearGradient>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>İşte Senin İçin AI Önerisi!</Text>
              {!!moodLabel && (
                <Text style={styles.headerSubtitle} numberOfLines={1}>
                  "{moodLabel}" ruh haline özel seçildi
                </Text>
              )}
            </View>
            <TouchableOpacity onPress={onClose} hitSlop={10} style={styles.closeButton}>
              <Ionicons name="close" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.cardsList}
          >
            {items.map((item) => (
              <RecommendationCard
                key={item.id}
                item={item}
                onSave={onSave}
                onRate={onRate}
                onFindSimilar={onFindSimilar}
                style={styles.fullWidthCard}
              />
            ))}
          </ScrollView>

          <TouchableOpacity onPress={onClose} activeOpacity={0.85}>
            <View style={styles.dismissButton}>
              <Text style={styles.dismissButtonText}>Ana Sayfaya Dön</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(5,5,10,0.6)',
  },
  sheet: {
    maxHeight: '82%',
    backgroundColor: COLORS.backgroundAlt,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.lg,
  },
  grabber: {
    width: 40,
    height: 4,
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'center',
    marginBottom: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  headerIconWrap: {
    marginRight: SPACING.sm,
  },
  headerIconGradient: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...FONTS.h3,
    color: COLORS.textPrimary,
  },
  headerSubtitle: {
    ...FONTS.caption,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsList: {
    paddingBottom: SPACING.md,
    gap: SPACING.md,
  },
  fullWidthCard: {
    width: '100%',
    marginBottom: SPACING.md,
  },
  dismissButton: {
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.pill,
    paddingVertical: 13,
    alignItems: 'center',
  },
  dismissButtonText: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
});

export default AIResultModal;