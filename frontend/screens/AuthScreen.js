// screens/AuthScreen.js
// MoodTaste AI - Kayıt Ol / Giriş Yap Ekranı
// Kayıt olan kullanıcı doğrudan onboarding'e (Zevk Testi), giriş yapan kullanıcı
// doğrudan Ana Sayfa'ya yönlendirilir.
//
// STABİLİTE NOTU: Input'lar artık ortak bir "focusedField" state'i PAYLAŞMIYOR.
// Her input, kendi odak (focus) durumunu lokal olarak yönetiyor ve React.memo ile
// sarmalanıyor. Böylece bir alana dokunmak yalnızca o alanı yeniden render eder;
// logo, sekme geçişi, sosyal butonlar gibi ilgisiz kısımlar etkilenmez. Bu, önceki
// "input'lar yanıp sönüyor" sorununun kök nedeniydi.

import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { COLORS, GRADIENTS, SPACING, RADIUS, FONTS } from '../constants/theme';
import { registerUser } from '../data/api/authApi';
import { useAuth } from '../contexts/AuthContext';
import { showAlert } from '../utils/platformAlert';

// --- Yeniden Kullanılabilir, Memoize Edilmiş Input Bileşeni ---
// Kendi focus state'ini kendi içinde tutar; parent'ın (AuthScreen) her render'ında
// gereksiz yere yeniden çizilmez (React.memo + parent'tan gelen prop'lar stabil
// referanslar olduğu sürece atlanır).
const AuthTextField = React.memo(
  React.forwardRef(function AuthTextField(
    {
      label,
      icon,
      value,
      onChangeText,
      placeholder,
      secureTextEntry,
      keyboardType,
      autoCapitalize,
      returnKeyType,
      onSubmitEditing,
      rightElement,
    },
    ref
  ) {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);

    return (
      <View style={styles.fieldWrap}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <View style={[styles.input, isFocused && styles.inputFocused]}>
          <Ionicons name={icon} size={17} color={COLORS.textMuted} />
          <TextInput
            ref={ref}
            style={styles.inputText}
            placeholder={placeholder}
            placeholderTextColor={COLORS.textMuted}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={returnKeyType !== 'next'}
            // Android'de Samsung Pass / Google Autofill gibi servislerin bu input'a
            // bağlanıp kendi öneri penceresini açmasını (ve bunun tetiklediği
            // focus/blur döngüsünü) tamamen engeller. Bu ekrandaki "input'lar
            // yanıp sönüyor + klavye git-gel yapıyor" sorununun asıl kaynağı buydu.
            importantForAutofill="no"
            autoComplete="off"
          />
          {rightElement}
        </View>
      </View>
    );
  })
);

// Android'de KeyboardAvoidingView'ı ağaçtan TAMAMEN çıkarıyoruz (sadece behavior'ı
// devre dışı bırakmak yeterli değildi — bileşen yine de mount oluyordu). app.json'da
// "softwareKeyboardLayoutMode": "resize" olduğu için Android'de klavye için pencere
// zaten OS tarafından küçültülüyor; ayrıca bir de KeyboardAvoidingView (veya
// SafeAreaView'ın 'bottom' edge'i) devrede olursa iki sistem aynı anda klavye için
// yer açmaya çalışıp birbirine "çarpıyor" — titremenin asıl kaynağı buydu.
const KeyboardWrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;

const AuthScreen = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRegister = mode === 'register';

  // Klavyede "Next" ile bir sonraki alana geçiş için referanslar
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleSwitchMode = useCallback((nextMode) => {
    setMode(nextMode);
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible((prev) => !prev);
  }, []);

  // ÖNEMLİ: Bu JSX'i doğrudan JSX içinde inline yazmak yerine useMemo ile
  // sabitliyoruz. Aksi halde her AuthScreen render'ında (yani her tuşta) yeni bir
  // obje referansı oluşur ve AuthTextField'ın React.memo'su bu prop'u "değişti"
  // sanıp gereksiz yere yeniden render eder — memoizasyonu etkisiz kılan sinsi bir
  // hataydı bu.
  const passwordRightElement = useMemo(
    () => (
      <TouchableOpacity onPress={togglePasswordVisibility} hitSlop={8}>
        <Ionicons
          name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
          size={17}
          color={COLORS.textMuted}
        />
      </TouchableOpacity>
    ),
    [passwordVisible, togglePasswordVisibility]
  );

  const validate = useCallback(() => {
    if (isRegister && fullName.trim().length < 2) {
      showAlert('Eksik Bilgi', 'Lütfen adını ve soyadını gir.');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      showAlert('Eksik Bilgi', 'Lütfen geçerli bir e-posta adresi gir.');
      return false;
    }
    if (password.trim().length < 4) {
      showAlert('Eksik Bilgi', 'Şifren en az 4 karakter olmalı.');
      return false;
    }
    return true;
  }, [isRegister, fullName, email, password]);

  const handlePrimaryAction = useCallback(async () => {
    if (!validate()) return;
    if (isSubmitting) return;

    if (isRegister) {
      setIsSubmitting(true);
      console.log('[AuthScreen] Kayıt isteği başlatılıyor...', { email: email.trim() });
      try {
        const { idToken, user } = await registerUser({
          fullName: fullName.trim(),
          email: email.trim(),
          password,
        });

        console.log('[AuthScreen] Kayıt başarılı, AuthContext güncelleniyor...');
        // Token'ı ve (varsa) kullanıcı bilgisini merkezi Context'e yaz — artık
        // ProfileScreen ve diğer tüm ekranlar bunu otomatik görecek.
        await login(idToken, user);

        console.log('[AuthScreen] Onboarding\'e yönlendiriliyor.');
        // Yeni üye: doğrudan 3 adımlı Zevk Testi'ne yönlendir
        router.replace('/onboarding');
      } catch (error) {
        console.error('[AuthScreen] Kayıt başarısız:', error);
        showAlert('Kayıt Başarısız', error.message || 'Bir şeyler ters gitti, tekrar dene.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Giriş Yap akışı (POST /auth/login) bir sonraki entegrasyon adımında bağlanacak.
      // Şimdilik mevcut davranış korunuyor.
      router.replace('/');
    }
  }, [validate, isSubmitting, isRegister, fullName, email, password, router, login]);

  const handleSocialLogin = useCallback(
    (provider) => {
      console.log(`[Mock] ${provider} ile giriş denendi`);
      router.replace('/');
    },
    [router]
  );

  const focusEmailField = useCallback(() => {
    emailInputRef.current?.focus();
  }, []);

  const focusPasswordField = useCallback(() => {
    passwordInputRef.current?.focus();
  }, []);

  // iOS'a özel prop'ları (behavior, keyboardVerticalOffset) yalnızca gerçekten
  // KeyboardAvoidingView render edilecekse veriyoruz — Android'de bunlar düz bir
  // View'a hiç geçmiyor.
  const keyboardWrapperProps = useMemo(
    () =>
      Platform.OS === 'ios'
        ? { style: styles.keyboardAvoidingView, behavior: 'padding', keyboardVerticalOffset: 20 }
        : { style: styles.keyboardAvoidingView },
    []
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardWrapper {...keyboardWrapperProps}>
        <ScrollView
          style={styles.scrollView}
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
            <Text style={styles.brandSubtitle}>Zevk DNA'nı keşfetmeye başla</Text>
          </View>

          {/* Sekmeli Geçiş: Giriş Yap / Kayıt Ol */}
          <View style={styles.tabSwitch}>
            <TouchableOpacity
              style={styles.tabButtonWrap}
              activeOpacity={0.85}
              onPress={() => handleSwitchMode('login')}
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
              onPress={() => handleSwitchMode('register')}
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
              <AuthTextField
                label="Ad Soyad"
                icon="person-outline"
                placeholder="Adın ve soyadın"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={focusEmailField}
              />
            )}

            <AuthTextField
              ref={emailInputRef}
              label="E-posta"
              icon="mail-outline"
              placeholder="ornek@email.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={focusPasswordField}
            />

            <AuthTextField
              ref={passwordInputRef}
              label="Şifre"
              icon="lock-closed-outline"
              placeholder="En az 4 karakter"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={handlePrimaryAction}
              rightElement={passwordRightElement}
            />

            {/* Ana Aksiyon Butonu */}
            <TouchableOpacity
              onPress={handlePrimaryAction}
              activeOpacity={0.88}
              disabled={isSubmitting}
            >
              <LinearGradient
                colors={GRADIENTS.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.primaryButton, isSubmitting && styles.primaryButtonDisabled]}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Ionicons
                    name={isRegister ? 'sparkles' : 'log-in-outline'}
                    size={17}
                    color="#FFFFFF"
                  />
                )}
                <Text style={styles.primaryButtonText}>
                  {isSubmitting
                    ? 'Hesap Oluşturuluyor...'
                    : isRegister
                    ? 'AI Hesabımı Oluştur'
                    : 'Giriş Yap'}
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
              onPress={() => handleSocialLogin('Google')}
            >
              <Ionicons name="logo-google" size={18} color={COLORS.textPrimary} />
              <Text style={styles.socialButtonText}>Google ile Devam Et</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              activeOpacity={0.8}
              onPress={() => handleSocialLogin('Apple')}
            >
              <Ionicons name="logo-apple" size={19} color={COLORS.textPrimary} />
              <Text style={styles.socialButtonText}>Apple ile Devam Et</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerNote}>
            Devam ederek MoodTaste AI'ın Kullanım Koşulları'nı kabul etmiş olursun.
          </Text>
        </ScrollView>
      </KeyboardWrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  brandBlock: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  logoGlowWrap: {
    marginBottom: SPACING.md,
  },
  logoOrb: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
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
    flexDirection: 'row',
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.pill,
    paddingVertical: 11,
  },
  tabButtonText: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  tabButtonTextActive: {
    ...FONTS.body,
    color: '#FFFFFF',
    fontWeight: '700',
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
    fontWeight: '600',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: Platform.OS === 'ios' ? 13 : 4,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.pill,
    paddingVertical: 15,
    gap: 8,
    marginTop: SPACING.sm,
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    ...FONTS.body,
    color: '#FFFFFF',
    fontWeight: '700',
    marginHorizontal: 4,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontWeight: '600',
    marginLeft: 10,
  },
  footerNote: {
    ...FONTS.tiny,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default AuthScreen;