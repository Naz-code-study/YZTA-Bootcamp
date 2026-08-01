// screens/OnboardingScreen.js
// MoodTaste AI - Başlangıç Zevk Testi (Onboarding) Akışı
// 3 adımlı, ilerleme çubuklu, çip seçimli test. Son adımda AIAnalyzingModal ile
// "profil oluşturuluyor" efekti gösterilip Ana Sayfaya yönlendirilir.

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import AIAnalyzingModal from '../components/AIAnalyzingModal';
import { ONBOARDING_STEPS } from '../data/mockData';
import { COLORS, GRADIENTS, SPACING, RADIUS, FONTS } from '../constants/theme';

const GENERATING_MESSAGES = [
  'Seçimlerin analiz ediliyor...',
  "Zevk DNA'n oluşturuluyor...",
  'Kişisel profilin hazırlanıyor...',
];

const OnboardingScreen = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [generating, setGenerating] = useState(false);

  const progressAnim = useRef(new Animated.Value(1 / ONBOARDING_STEPS.length)).current;
  const stepFade = useRef(new Animated.Value(1)).current;

  const step = ONBOARDING_STEPS[currentStep];
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (currentStep + 1) / ONBOARDING_STEPS.length,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const animateStepChange = (nextStepFn) => {
    Animated.timing(stepFade, { toValue: 0, duration: 150, useNativeDriver: true }).start(() => {
      nextStepFn();
      Animated.timing(stepFade, { toValue: 1, duration: 260, useNativeDriver: true }).start();
    });
  };

  const isOptionSelected = (option) => {
    const value = selections[step.id];
    if (step.multiSelect) return (value || []).includes(option.id);
    return value === option.id;
  };

  const handleOptionPress = (option) => {
    setSelections((prev) => {
      if (step.multiSelect) {
        const existing = prev[step.id] || [];
        const alreadySelected = existing.includes(option.id);
        const updated = alreadySelected
          ? existing.filter((id) => id !== option.id)
          : [...existing, option.id];
        return { ...prev, [step.id]: updated };
      }
      return { ...prev, [step.id]: option.id };
    });
  };

  const currentSelectionValue = selections[step.id];
  const isStepValid = step.multiSelect
    ? Array.isArray(currentSelectionValue) && currentSelectionValue.length > 0
    : !!currentSelectionValue;

  const handleBack = () => {
    if (currentStep === 0) return;
    animateStepChange(() => setCurrentStep((prev) => prev - 1));
  };

  const handleContinue = () => {
    if (!isStepValid) return;

    if (isLastStep) {
      setGenerating(true);
      return;
    }
    animateStepChange(() => setCurrentStep((prev) => prev + 1));
  };

  const handleGeneratingComplete = () => {
    setGenerating(false);
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* Üst Bar: Geri butonu + İlerleme Çubuğu */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={handleBack}
          disabled={currentStep === 0}
          style={[styles.backButton, currentStep === 0 && styles.backButtonDisabled]}
          hitSlop={8}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={currentStep === 0 ? COLORS.textMuted : COLORS.textPrimary}
          />
        </TouchableOpacity>

        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, { width: progressWidth }]}>
            <LinearGradient
              colors={GRADIENTS.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>

        <Text style={styles.stepCounter}>
          {currentStep + 1}/{ONBOARDING_STEPS.length}
        </Text>
      </View>

      {/* Adım İçeriği */}
      <Animated.View style={[styles.stepContent, { opacity: stepFade }]}>
        <View style={styles.eyebrowRow}>
          <Ionicons name="sparkles-outline" size={14} color={COLORS.primaryLight} />
          <Text style={styles.eyebrow}>ZEVK DNA'SI OLUŞTURMA</Text>
        </View>
        <Text style={styles.stepTitle}>{step.title}</Text>
        <Text style={styles.stepSubtitle}>{step.subtitle}</Text>

        <ScrollView
          style={styles.optionsScroll}
          contentContainerStyle={styles.optionsGrid}
          showsVerticalScrollIndicator={false}
        >
          {step.options.map((option) => {
            const selected = isOptionSelected(option);
            return (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleOptionPress(option)}
                activeOpacity={0.85}
                style={styles.optionWrap}
              >
                {selected ? (
                  <LinearGradient
                    colors={GRADIENTS.primary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.optionChip}
                  >
                    <Ionicons name={option.icon} size={16} color="#FFFFFF" />
                    <Text style={styles.optionTextActive}>{option.label}</Text>
                    <View style={styles.checkBadge}>
                      <Ionicons name="checkmark" size={11} color={COLORS.primary} />
                    </View>
                  </LinearGradient>
                ) : (
                  <View style={[styles.optionChip, styles.optionChipInactive]}>
                    <Ionicons name={option.icon} size={16} color={COLORS.textSecondary} />
                    <Text style={styles.optionText}>{option.label}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>

      {/* Alt Aksiyon Butonu */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleContinue}
          activeOpacity={0.85}
          disabled={!isStepValid}
          style={{ opacity: isStepValid ? 1 : 0.4 }}
        >
          <LinearGradient
            colors={GRADIENTS.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.continueButton}
          >
            {isLastStep ? (
              <>
                <Ionicons name="sparkles" size={17} color="#FFFFFF" />
                <Text style={styles.continueButtonText}>AI Profilimi Oluştur</Text>
              </>
            ) : (
              <>
                <Text style={styles.continueButtonText}>Devam Et</Text>
                <Ionicons name="arrow-forward" size={17} color="#FFFFFF" />
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <AIAnalyzingModal
        visible={generating}
        messages={GENERATING_MESSAGES}
        duration={2800}
        footerLabel="Zevk DNA'n İnşa Ediliyor"
        onComplete={handleGeneratingComplete}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonDisabled: {
    opacity: 0.4,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
    marginHorizontal: SPACING.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: RADIUS.pill,
    overflow: 'hidden',
  },
  stepCounter: {
    ...FONTS.tiny,
    color: COLORS.textMuted,
    minWidth: 30,
    textAlign: 'right',
  },
  stepContent: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: SPACING.sm,
  },
  eyebrow: {
    ...FONTS.tiny,
    color: COLORS.primaryLight,
    letterSpacing: 1.4,
    marginLeft: 6,
  },
  stepTitle: {
    ...FONTS.h1,
    fontSize: 25,
    color: COLORS.textPrimary,
    marginBottom: 8,
    lineHeight: 32,
  },
  stepSubtitle: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  optionsScroll: {
    flex: 1,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    paddingBottom: SPACING.lg,
  },
  optionWrap: {
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  optionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.pill,
    paddingHorizontal: 16,
    paddingVertical: 13,
    gap: 8,
  },
  optionChipInactive: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  optionText: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    marginLeft: 8,
    fontWeight: '600',
  },
  optionTextActive: {
    ...FONTS.body,
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '700',
  },
  checkBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.md,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.pill,
    paddingVertical: 15,
    gap: 8,
  },
  continueButtonText: {
    ...FONTS.body,
    color: '#FFFFFF',
    fontWeight: '700',
    marginHorizontal: 4,
  },
});

export default OnboardingScreen;