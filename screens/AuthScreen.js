// screens/AuthScreen.js
// MoodTaste AI - Kayıt Ol / Giriş Yap Ekranı
// Kayıt olan kullanıcı doğrudan onboarding'e (Zevk Testi), giriş yapan kullanıcı
// doğrudan Ana Sayfa'ya yönlendirilir.

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS, FONTS, GRADIENTS, RADIUS, SPACING } from "../constants/theme";

const AuthScreen = () => {
  const router = useRouter();
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const isRegister = mode === "register";

  const handleSwitchMode = (nextMode) => {
    setMode(nextMode);
  };

  const validate = () => {
    if (isRegister && fullName.trim().length < 2) {
      Alert.alert("Eksik Bilgi", "Lütfen adını ve soyadını gir.");
      return false;
    }
    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Eksik Bilgi", "Lütfen geçerli bir e-posta adresi gir.");
      return false;
    }
    if (password.trim().length < 4) {
      Alert.alert("Eksik Bilgi", "Şifren en az 4 karakter olmalı.");
      return false;
    }
    return true;
  };

  const handlePrimaryAction = () => {
    if (!validate()) return;

    if (isRegister) {
      // Yeni üye: doğrudan 3 adımlı Zevk Testi'ne yönlendir
      router.replace("/onboarding");
    } else {
      // Mevcut üye: doğrudan Ana Sayfa'ya yönlendir
      router.replace("/");
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`[Mock] ${provider} ile giriş denendi`);
    router.replace("/");
  };

  const getInputStyle = (fieldName) => [
    styles.input,
    focusedField === fieldName && styles.inputFocused,
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo / Marka Bloğu */}
          <View style={styles.brandBlock}>
            <View style={styles.logoGlowWrap}>
              <LinearGradient
                colors={GRADIENTS.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logoOrb}
              >
                <Ionicons name="sparkles" size={30} color="#FFFFFF" />
              </LinearGradient>
            </View>
            <Text style={styles.brandTitle}>MoodTaste AI</Text>
            <Text style={styles.brandSubtitle}>
              Zevk DNA'nı keşfetmeye başla
            </Text>
          </View>

          {/* Sekmeli Geçiş: Giriş Yap / Kayıt Ol */}
          <View style={styles.tabSwitch}>
            <TouchableOpacity
              style={styles.tabButtonWrap}
              activeOpacity={0.85}
              onPress={() => handleSwitchMode("login")}
            >
              {!isRegister ? (
                <LinearGradient
                  colors={GRADIENTS.primary}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.tabButton}
                >
                  <Text style={styles.tabButtonTextActive}>Giriş Yap</Text>
                </LinearGradient>
              ) : (
                <View style={styles.tabButton}>
                  <Text style={styles.tabButtonText}>Giriş Yap</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tabButtonWrap}
              activeOpacity={0.85}
              onPress={() => handleSwitchMode("register")}
            >
              {isRegister ? (
                <LinearGradient
                  colors={GRADIENTS.primary}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.tabButton}
                >
                  <Text style={styles.tabButtonTextActive}>Kayıt Ol</Text>
                </LinearGradient>
              ) : (
                <View style={styles.tabButton}>
                  <Text style={styles.tabButtonText}>Kayıt Ol</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Form Alanları */}
          <View style={styles.formBlock}>
            {isRegister && (
              <View style={styles.fieldWrap}>
                <Text style={styles.fieldLabel}>Ad Soyad</Text>
                <View style={getInputStyle("fullName")}>
                  <Ionicons
                    name="person-outline"
                    size={17}
                    color={COLORS.textMuted}
                  />
                  <TextInput
                    style={styles.inputText}
                    placeholder="Adın ve soyadın"
                    placeholderTextColor={COLORS.textMuted}
                    value={fullName}
                    onChangeText={setFullName}
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => setFocusedField(null)}
                    autoCapitalize="words"
                  />
                </View>
              </View>
            )}

            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>E-posta</Text>
              <View style={getInputStyle("email")}>
                <Ionicons
                  name="mail-outline"
                  size={17}
                  color={COLORS.textMuted}
                />
                <TextInput
                  style={styles.inputText}
                  placeholder="ornek@email.com"
                  placeholderTextColor={COLORS.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Şifre</Text>
              <View style={getInputStyle("password")}>
                <Ionicons
                  name="lock-closed-outline"
                  size={17}
                  color={COLORS.textMuted}
                />
                <TextInput
                  style={styles.inputText}
                  placeholder="En az 4 karakter"
                  placeholderTextColor={COLORS.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  secureTextEntry={!passwordVisible}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible((prev) => !prev)}
                  hitSlop={8}
                >
                  <Ionicons
                    name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                    size={17}
                    color={COLORS.textMuted}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Ana Aksiyon Butonu */}
            <TouchableOpacity
              onPress={handlePrimaryAction}
              activeOpacity={0.88}
            >
              <LinearGradient
                colors={GRADIENTS.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.primaryButton}
              >
                <Ionicons
                  name={isRegister ? "sparkles" : "log-in-outline"}
                  size={17}
                  color="#FFFFFF"
                />
                <Text style={styles.primaryButtonText}>
                  {isRegister ? "AI Hesabımı Oluştur" : "Giriş Yap"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Ayraç */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>veya</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Sosyal Giriş */}
          <View style={styles.socialBlock}>
            <TouchableOpacity
              style={styles.socialButton}
              activeOpacity={0.8}
              onPress={() => handleSocialLogin("Google")}
            >
              <Ionicons
                name="logo-google"
                size={18}
                color={COLORS.textPrimary}
              />
              <Text style={styles.socialButtonText}>Google ile Devam Et</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              activeOpacity={0.8}
              onPress={() => handleSocialLogin("Apple")}
            >
              <Ionicons
                name="logo-apple"
                size={19}
                color={COLORS.textPrimary}
              />
              <Text style={styles.socialButtonText}>Apple ile Devam Et</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerNote}>
            Devam ederek MoodTaste AI'ın Kullanım Koşulları'nı kabul etmiş
            olursun.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  brandBlock: {
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  logoGlowWrap: {
    marginBottom: SPACING.md,
  },
  logoOrb: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 24,
    elevation: 12,
  },
  brandTitle: {
    ...FONTS.h1,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  brandSubtitle: {
    ...FONTS.body,
    color: COLORS.textSecondary,
  },
  tabSwitch: {
    flexDirection: "row",
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.pill,
    padding: 4,
    marginBottom: SPACING.lg,
  },
  tabButtonWrap: {
    flex: 1,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.pill,
    paddingVertical: 11,
  },
  tabButtonText: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    fontWeight: "700",
  },
  tabButtonTextActive: {
    ...FONTS.body,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  formBlock: {
    marginBottom: SPACING.lg,
  },
  fieldWrap: {
    marginBottom: SPACING.md,
  },
  fieldLabel: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: Platform.OS === "ios" ? 13 : 4,
    gap: SPACING.sm,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 3,
  },
  inputText: {
    flex: 1,
    color: COLORS.textPrimary,
    ...FONTS.body,
    marginLeft: SPACING.sm,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.pill,
    paddingVertical: 15,
    gap: 8,
    marginTop: SPACING.sm,
  },
  primaryButtonText: {
    ...FONTS.body,
    color: "#FFFFFF",
    fontWeight: "700",
    marginHorizontal: 4,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.cardBorder,
  },
  dividerText: {
    ...FONTS.tiny,
    color: COLORS.textMuted,
    marginHorizontal: SPACING.sm,
    letterSpacing: 0.6,
  },
  socialBlock: {
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.pill,
    paddingVertical: 13,
    gap: 10,
    marginBottom: SPACING.sm,
  },
  socialButtonText: {
    ...FONTS.body,
    color: COLORS.textPrimary,
    fontWeight: "600",
    marginLeft: 10,
  },
  footerNote: {
    ...FONTS.tiny,
    color: COLORS.textMuted,
    textAlign: "center",
    lineHeight: 16,
  },
});

export default AuthScreen;
