// contexts/AuthContext.js
// MoodTaste AI - Merkezi Kullanıcı Kimliği Yönetimi
//
// Bu context, uygulama genelinde "şu an giriş yapmış kullanıcı kim" sorusunun
// TEK doğru cevabı olur. ProfileScreen'deki sabit "Dilay" ismi, Onboarding'in
// kimin adına kaydedileceğini bilmesi ve Ana Sayfa'nın kişiselleştirilmesi —
// hepsi buradaki `user` ve `token` değerlerine dayanacak.

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { getCurrentUser } from '../data/api/authApi';
import { tokenStorage } from '../data/api/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  // isLoading: uygulama açılışında AsyncStorage'daki token kontrol edilirken true.
  // Bu sürede ekranlar "yükleniyor" göstermeli, yoksa kısa bir an için yanlışlıkla
  // "giriş yapılmamış" durumu gösterilebilir.
  const [isLoading, setIsLoading] = useState(true);

  // Uygulama her açıldığında: cihazda kayıtlı bir token var mı diye bak,
  // varsa kullanıcı bilgisini backend'den tazele.
  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      try {
        const storedToken = await tokenStorage.get();
        if (!storedToken) {
          if (isMounted) setIsLoading(false);
          return;
        }

        if (isMounted) setToken(storedToken);

        try {
          const freshUser = await getCurrentUser();
          if (isMounted) setUser(freshUser);
        } catch (error) {
          // GET /users/me henüz backend'de yoksa veya token geçersizse buraya düşer.
          // Token'ı silmiyoruz (henüz endpoint eksik olabilir) ama konsola not düşüyoruz.
          console.warn('[AuthContext] Kullanıcı bilgisi tazelenemedi:', error.message);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    bootstrap();
    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Kayıt/Giriş başarılı olduğunda çağrılır. `initialUser` backend'in
   * /auth/register veya /auth/login yanıtında zaten kullanıcı bilgisi
   * döndürdüğü durumlar için — varsa anında kullanılır, yoksa GET /users/me
   * ile tazelenmeye çalışılır (sessizce başarısız olabilir, sorun değil).
   */
  const login = useCallback(async (idToken, initialUser = null) => {
    await tokenStorage.set(idToken);
    setToken(idToken);

    if (initialUser) {
      setUser(initialUser);
      return;
    }

    try {
      const freshUser = await getCurrentUser();
      setUser(freshUser);
    } catch (error) {
      console.warn('[AuthContext] login sonrası kullanıcı bilgisi alınamadı:', error.message);
    }
  }, []);

  const logout = useCallback(async () => {
    await tokenStorage.clear();
    setToken(null);
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const freshUser = await getCurrentUser();
      setUser(freshUser);
      return freshUser;
    } catch (error) {
      console.warn('[AuthContext] refreshUser başarısız:', error.message);
      return null;
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated: !!token,
      login,
      logout,
      refreshUser,
    }),
    [user, token, isLoading, login, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth() yalnızca <AuthProvider> içinde kullanılabilir.');
  }
  return context;
}