// components/FloatingTabBar.js
// MoodTaste AI - Premium Floating Bottom Navigation
// expo-router tabanlı, cam efektli (BlurView), 3 sekmeli özel alt navigasyon.

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, RADIUS, FONTS } from '../constants/theme';

const TABS = [
  { key: 'home', path: '/', label: 'Ana Sayfa', iconActive: 'home', iconInactive: 'home-outline' },
  {
    key: 'taste-dna',
    path: '/taste-dna',
    label: 'Zevk DNA',
    iconActive: 'finger-print',
    iconInactive: 'finger-print-outline',
  },
  {
    key: 'saved',
    path: '/saved',
    label: 'Kayıtlı',
    iconActive: 'bookmark',
    iconInactive: 'bookmark-outline',
  },
];

const FloatingTabBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const isActive = (tabPath) => {
    if (tabPath === '/') return pathname === '/' || pathname === '/index';
    return pathname === tabPath;
  };

  const handlePress = (tabPath) => {
    if (isActive(tabPath)) return;
    router.replace(tabPath);
  };

  return (
    <View style={[styles.wrapper, { bottom: insets.bottom + 14 }]} pointerEvents="box-none">
      <BlurView intensity={Platform.OS === 'ios' ? 45 : 90} tint="dark" style={styles.blurContainer}>
        <View style={styles.innerBorder}>
          {TABS.map((tab) => {
            const active = isActive(tab.path);
            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.tabButton}
                activeOpacity={0.8}
                onPress={() => handlePress(tab.path)}
              >
                {active ? (
                  <LinearGradient
                    colors={GRADIENTS.primary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.activePill}
                  >
                    <Ionicons name={tab.iconActive} size={18} color="#FFFFFF" />
                    <Text style={styles.activeLabel}>{tab.label}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.inactivePill}>
                    <Ionicons name={tab.iconInactive} size={20} color={COLORS.textMuted} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  blurContainer: {
    borderRadius: RADIUS.pill,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 12,
  },
  innerBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(21,21,33,0.55)',
    paddingHorizontal: 6,
    paddingVertical: 6,
    gap: 4,
  },
  tabButton: {
    borderRadius: RADIUS.pill,
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.pill,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 6,
  },
  activeLabel: {
    ...FONTS.caption,
    color: '#FFFFFF',
    fontWeight: '700',
    marginLeft: 6,
  },
  inactivePill: {
    width: 44,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FloatingTabBar;