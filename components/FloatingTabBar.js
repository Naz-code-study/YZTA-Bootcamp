// components/FloatingTabBar.js
// MoodTaste AI - Premium Floating Bottom Navigation
// expo-router tabanlı, cam efektli (BlurView), 5 sekmeli özel alt navigasyon.

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, RADIUS } from '../constants/theme';

const TABS = [
  { key: 'home', path: '/', label: 'Ana Sayfa', iconActive: 'home', iconInactive: 'home-outline' },
  {
    key: 'explore',
    path: '/explore',
    label: 'Keşfet',
    iconActive: 'compass',
    iconInactive: 'compass-outline',
  },
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
  {
    key: 'profile',
    path: '/profile',
    label: 'Profil',
    iconActive: 'person-circle',
    iconInactive: 'person-circle-outline',
  },
];

const FloatingTabBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  // Onboarding (zevk testi) ve Auth (giriş/kayıt) tam ekran akışlar olduğu için
  // nav barı bu rotalarda göstermiyoruz
  if (pathname === '/onboarding' || pathname === '/auth') return null;

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
                    <Ionicons name={tab.iconActive} size={16} color="#FFFFFF" />
                    <Text style={styles.activeLabel}>{tab.label}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.inactivePill}>
                    <Ionicons name={tab.iconInactive} size={19} color={COLORS.textMuted} />
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
    paddingHorizontal: 5,
    paddingVertical: 5,
    gap: 3,
  },
  tabButton: {
    borderRadius: RADIUS.pill,
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.pill,
    paddingHorizontal: 13,
    paddingVertical: 9,
    gap: 5,
  },
  activeLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 5,
  },
  inactivePill: {
    width: 40,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FloatingTabBar;