// screens/ProfileScreen.js
// MoodTaste AI - Kullanıcı Profili ve Ayarlar Ekranı

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { DOMINANT_PROFILE } from '../data/mockData';
import { COLORS, GRADIENTS, SPACING, RADIUS, FONTS } from '../constants/theme';

const USER = {
  name: 'Dilay',
  handle: 'Zevk Kâşifi',
  initials: 'D',
};

// Yeniden kullanılabilir ayar satırı bileşeni
const SettingRow = ({ icon, iconColor, label, description, right, onPress, danger }) => {
  const content = (
    <View style={styles.settingRow}>
      <View style={[styles.settingIconWrap, danger && styles.settingIconWrapDanger]}>
        <Ionicons name={icon} size={17} color={danger ? '#F87171' : iconColor || COLORS.primaryLight} />
      </View>
      <View style={styles.settingTextWrap}>
        <Text style={[styles.settingLabel, danger && styles.settingLabelDanger]}>{label}</Text>
        {!!description && <Text style={styles.settingDescription}>{description}</Text>}
      </View>
      {right}
    </View>
  );

  if (!onPress) return content;

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      {content}
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('tr'); // 'tr' | 'en'

  const handleRetakeTest = () => {
    router.push('/onboarding');
  };

  const handleViewTasteDNA = () => {
    router.push('/taste-dna');
  };

  const handleResetData = () => {
    Alert.alert(
      'Verileri Sıfırla',
      'Tüm zevk profilin, puanlamaların ve kayıtlı önerilerin sıfırlanacak. Bu işlem geri alınamaz.',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Sıfırla',
          style: 'destructive',
          onPress: () => {
            // Mock ortamda gerçek bir veri silme işlemi yok; backend bağlanınca
            // burası ilgili API çağrısını (örn. DELETE /users/me/data) tetikleyecek.
            console.log('[Mock] Kullanıcı verileri sıfırlandı');
            Alert.alert('Tamamlandı', 'Verilerin sıfırlandı (mock).');
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert('Hesaptan Çıkış Yap', 'Hesabından çıkış yapmak istediğine emin misin?', [
      { text: 'Vazgeç', style: 'cancel' },
      {
        text: 'Çıkış Yap',
        style: 'destructive',
        onPress: () => {
          console.log('[Mock] Çıkış yapıldı');
          router.replace('/auth');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Kullanıcı Karşılama Bloğu */}
        <View style={styles.headerBlock}>
          <LinearGradient
            colors={GRADIENTS.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>{USER.initials}</Text>
          </LinearGradient>
          <Text style={styles.userName}>{USER.name}</Text>
          <View style={styles.userHandleRow}>
            <Ionicons name="sparkles" size={12} color={COLORS.primaryLight} />
            <Text style={styles.userHandle}>{USER.handle}</Text>
          </View>
        </View>

        {/* Mini Zevk Özeti Kartı */}
        <View style={styles.tasteSummaryCard}>
          <View style={styles.tasteSummaryHeader}>
            <Ionicons name="finger-print-outline" size={16} color={COLORS.primaryLight} />
            <Text style={styles.tasteSummaryLabel}>Baskın Zevk Profilin</Text>
          </View>
          <Text style={styles.tasteSummaryTitle}>{DOMINANT_PROFILE.title}</Text>

          <TouchableOpacity onPress={handleViewTasteDNA} activeOpacity={0.85}>
            <LinearGradient
              colors={GRADIENTS.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.tasteSummaryButton}
            >
              <Ionicons name="analytics-outline" size={15} color="#FFFFFF" />
              <Text style={styles.tasteSummaryButtonText}>Zevk DNA Haritamı İncele</Text>
              <Ionicons name="chevron-forward" size={15} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Ayarlar */}
        <Text style={styles.sectionTitle}>Tercihler</Text>
        <View style={styles.settingsCard}>
          <SettingRow
            icon="refresh-outline"
            label="Zevk Testini Yeniden Çöz"
            description="Zevk DNA'nı sıfırdan oluştur"
            onPress={handleRetakeTest}
            right={<Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />}
          />
          <View style={styles.settingDivider} />

          <SettingRow
            icon={darkMode ? 'moon' : 'sunny-outline'}
            label="Karanlık / Açık Tema"
            description={darkMode ? 'Karanlık mod aktif' : 'Açık mod aktif'}
            right={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: COLORS.cardBorder, true: COLORS.primary }}
                thumbColor="#FFFFFF"
                ios_backgroundColor={COLORS.cardBorder}
              />
            }
          />
          <View style={styles.settingDivider} />

          <SettingRow
            icon="language-outline"
            label="Dil Seçimi"
            description="Uygulama arayüz dili"
            right={
              <View style={styles.languageToggle}>
                <TouchableOpacity
                  onPress={() => setLanguage('tr')}
                  style={[styles.languagePill, language === 'tr' && styles.languagePillActive]}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.languagePillText,
                      language === 'tr' && styles.languagePillTextActive,
                    ]}
                  >
                    TR
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setLanguage('en')}
                  style={[styles.languagePill, language === 'en' && styles.languagePillActive]}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.languagePillText,
                      language === 'en' && styles.languagePillTextActive,
                    ]}
                  >
                    EN
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
          <View style={styles.settingDivider} />

          <SettingRow
            icon="notifications-outline"
            label="Bildirimler"
            description="Yeni öneriler için haber ver"
            right={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: COLORS.cardBorder, true: COLORS.primary }}
                thumbColor="#FFFFFF"
                ios_backgroundColor={COLORS.cardBorder}
              />
            }
          />
        </View>

        <Text style={styles.sectionTitle}>Hesap</Text>
        <View style={styles.settingsCard}>
          <SettingRow
            icon="trash-outline"
            label="Verileri Sıfırla"
            description="Zevk profili, puanlar ve kayıtlar silinir"
            onPress={handleResetData}
            danger
            right={<Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />}
          />
          <View style={styles.settingDivider} />
          <SettingRow
            icon="log-out-outline"
            label="Hesaptan Çıkış Yap"
            description="Tekrar giriş ekranına dönersin"
            onPress={handleLogout}
            danger
            right={<Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />}
          />
        </View>

        <Text style={styles.versionText}>MoodTaste AI · v1.0.0 (Prototip)</Text>

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
    alignItems: 'center',
    paddingTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  userName: {
    ...FONTS.h1,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  userHandleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  userHandle: {
    ...FONTS.caption,
    color: COLORS.primaryLight,
    marginLeft: 5,
    fontWeight: '600',
  },
  tasteSummaryCard: {
    marginHorizontal: SPACING.lg,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  tasteSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  tasteSummaryLabel: {
    ...FONTS.tiny,
    color: COLORS.primaryLight,
    letterSpacing: 0.8,
    marginLeft: 6,
  },
  tasteSummaryTitle: {
    ...FONTS.h3,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  tasteSummaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.pill,
    paddingVertical: 12,
    gap: 6,
  },
  tasteSummaryButtonText: {
    ...FONTS.caption,
    color: '#FFFFFF',
    fontWeight: '700',
    marginHorizontal: 4,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.textPrimary,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  settingsCard: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.lg,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm + 2,
  },
  settingIconWrap: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(139,92,246,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  settingIconWrapDanger: {
    backgroundColor: 'rgba(248,113,113,0.1)',
  },
  settingTextWrap: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  settingLabel: {
    ...FONTS.body,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  settingLabelDanger: {
    color: '#F87171',
  },
  settingDescription: {
    ...FONTS.tiny,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  settingDivider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
  },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: RADIUS.pill,
    padding: 3,
    gap: 2,
  },
  languagePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
  },
  languagePillActive: {
    backgroundColor: COLORS.primary,
  },
  languagePillText: {
    ...FONTS.tiny,
    color: COLORS.textMuted,
    fontWeight: '700',
  },
  languagePillTextActive: {
    color: '#FFFFFF',
  },
  versionText: {
    ...FONTS.tiny,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
});

export default ProfileScreen;