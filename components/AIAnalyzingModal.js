// components/AIAnalyzingModal.js
// MoodTaste AI - Fütüristik "AI Analiz Ediyor" Overlay'i
// Sadece React Native'in kendi Animated API'si + LinearGradient + expo-blur kullanılır.
// Hem HomeScreen (duygu durumu analizi) hem de OnboardingScreen (profil oluşturma) tarafından
// farklı `messages` prop'larıyla yeniden kullanılır.

import React, { useEffect, useRef, useState } from 'react';
import { Modal, View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, SPACING, FONTS } from '../constants/theme';

const DEFAULT_MESSAGES = [
  'Duygu durumun çözümleniyor...',
  "Geçmiş zevk DNA'nla eşleştiriliyor...",
  'En uygun içerikler seçiliyor...',
];

const AIAnalyzingModal = ({
  visible,
  messages = DEFAULT_MESSAGES,
  duration = 2700,
  footerLabel = 'MoodTaste AI Motoru Çalışıyor',
  onComplete,
}) => {
  const [messageIndex, setMessageIndex] = useState(0);

  const textOpacity = useRef(new Animated.Value(1)).current;
  const pulseAnim1 = useRef(new Animated.Value(0)).current;
  const pulseAnim2 = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return undefined;

    setMessageIndex(0);
    textOpacity.setValue(1);

    const runningAnimations = [];

    // Nabız gibi genişleyip kaybolan halkalar (iki halka, faz farkıyla)
    const createPulseLoop = (animValue, delay) => {
      animValue.setValue(0);
      const loop = Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 1800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      loop.start();
      runningAnimations.push(loop);
    };
    createPulseLoop(pulseAnim1, 0);
    createPulseLoop(pulseAnim2, 900);

    // Merkez etrafında sürekli dönen "tarama" halkası
    rotateAnim.setValue(0);
    const rotateLoop = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2600,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotateLoop.start();
    runningAnimations.push(rotateLoop);

    // Zıplayan üç nokta ("yazıyor" hissi)
    const createDotLoop = (animValue, delay) => {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, { toValue: 1, duration: 320, useNativeDriver: true }),
          Animated.timing(animValue, { toValue: 0, duration: 320, useNativeDriver: true }),
          Animated.delay(320),
        ])
      );
      loop.start();
      runningAnimations.push(loop);
    };
    createDotLoop(dot1, 0);
    createDotLoop(dot2, 160);
    createDotLoop(dot3, 320);

    // Mesajları belirli aralıklarla fade-out / fade-in ile değiştir
    const stepDuration = duration / messages.length;
    const messageInterval = setInterval(() => {
      Animated.timing(textOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setMessageIndex((prev) => (prev + 1 < messages.length ? prev + 1 : prev));
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }).start();
      });
    }, stepDuration);

    const completeTimeout = setTimeout(() => {
      if (onComplete) onComplete();
    }, duration);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(completeTimeout);
      runningAnimations.forEach((anim) => anim.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;

  const ringScale1 = pulseAnim1.interpolate({ inputRange: [0, 1], outputRange: [1, 1.9] });
  const ringOpacity1 = pulseAnim1.interpolate({ inputRange: [0, 1], outputRange: [0.55, 0] });
  const ringScale2 = pulseAnim2.interpolate({ inputRange: [0, 1], outputRange: [1, 1.9] });
  const ringOpacity2 = pulseAnim2.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0] });
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <BlurView intensity={55} tint="dark" style={StyleSheet.absoluteFill}>
        <View style={styles.overlay}>
          <View style={styles.orbWrap}>
            <Animated.View
              style={[
                styles.pulseRing,
                { transform: [{ scale: ringScale1 }], opacity: ringOpacity1 },
              ]}
            />
            <Animated.View
              style={[
                styles.pulseRing,
                { transform: [{ scale: ringScale2 }], opacity: ringOpacity2 },
              ]}
            />
            <Animated.View
              style={[styles.rotatingRing, { transform: [{ rotate: rotateInterpolate }] }]}
            />
            <LinearGradient
              colors={GRADIENTS.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.centerOrb}
            >
              <Ionicons name="sparkles" size={30} color="#FFFFFF" />
            </LinearGradient>
          </View>

          <Animated.Text style={[styles.messageText, { opacity: textOpacity }]}>
            {messages[messageIndex]}
          </Animated.Text>

          <View style={styles.dotsRow}>
            {[dot1, dot2, dot3].map((dot, index) => {
              const translateY = dot.interpolate({ inputRange: [0, 1], outputRange: [0, -6] });
              return (
                <Animated.View key={index} style={[styles.dot, { transform: [{ translateY }] }]} />
              );
            })}
          </View>

          <Text style={styles.footerLabel}>{footerLabel}</Text>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  orbWrap: {
    width: 170,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  pulseRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
  },
  rotatingRing: {
    position: 'absolute',
    width: 148,
    height: 148,
    borderRadius: 74,
    borderWidth: 2,
    borderColor: 'transparent',
    borderTopColor: COLORS.secondary,
    borderRightColor: COLORS.secondary,
  },
  centerOrb: {
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 22,
    elevation: 10,
  },
  messageText: {
    ...FONTS.h3,
    color: COLORS.textPrimary,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    minHeight: 44,
  },
  dotsRow: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.matchGreen,
    marginHorizontal: 4,
  },
  footerLabel: {
    ...FONTS.tiny,
    color: COLORS.textMuted,
    letterSpacing: 1.2,
  },
});

export default AIAnalyzingModal;