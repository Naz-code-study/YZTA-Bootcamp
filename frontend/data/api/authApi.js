// data/api/authApi.js
// MoodTaste AI - Auth API Fonksiyonları

import { apiClient } from './apiClient';

/**
 * Backend'in /auth/register yanıtındaki Firebase ID Token'ın hangi alan adıyla
 * geldiğini tek noktadan yönetmek için ayrı bir fonksiyon. Backend ekibinden
 * KESİN alan adını öğrendiğinde, bu fonksiyonu tek satıra indirebilirsin:
 *
 *   return response?.idToken;
 *
 * Şimdilik en yaygın 3 olası adı sırayla deniyoruz (savunmacı yaklaşım).
 */
function extractIdToken(response) {
  return response?.idToken || response?.token || response?.id_token || null;
}

/**
 * POST /auth/register
 * Body: { fullName, email, password }
 * Beklenen yanıt: bir Firebase ID Token içeren bir JSON (bkz. extractIdToken)
 */
export async function registerUser({ fullName, email, password }) {
  const response = await apiClient.post('/auth/register', {
    fullName,
    email,
    password,
  });

  const idToken = extractIdToken(response);

  if (!idToken) {
    // Backend'in gerçek yanıt şeklini konsola basıyoruz ki entegrasyon sırasında
    // hangi alan adının kullanıldığı ilk denemede görülsün.
    console.warn('[authApi] /auth/register yanıtında token bulunamadı. Gelen yanıt:', response);
    throw new Error(
      'Kayıt başarılı görünüyor ama sunucudan oturum anahtarı (token) alınamadı. Backend ekibine yanıt şeklini sor.'
    );
  }

  return {
    idToken,
    user: normalizeUser(response?.user) ?? null,
  };
}

/**
 * Backend'in kullanıcı objesindeki alan adları netleşene kadar (snake_case vs
 * camelCase ihtimali) her iki varyantı da destekleyen savunmacı bir normalize
 * fonksiyonu. Kesinleşince tek satıra indirilebilir.
 */
function normalizeUser(raw) {
  if (!raw) return null;
  return {
    userId: raw.userId ?? raw.user_id ?? raw.uid ?? null,
    name: raw.name ?? raw.fullName ?? raw.full_name ?? '',
    email: raw.email ?? '',
    onboardingCompleted: raw.onboardingCompleted ?? raw.onboarding_completed ?? false,
    tasteProfile: raw.tasteProfile ?? raw.taste_profile ?? null,
  };
}

/**
 * GET /users/me
 * Header: Authorization: Bearer <idToken> (apiClient bunu auth:true ile otomatik ekler)
 * Beklenen yanıt: { userId, name, email, onboardingCompleted, tasteProfile? }
 *
 * NOT: Bu endpoint backend'de henüz doğrulanmadıysa (var mı, tam olarak bu
 * şekli mi döndürüyor), AuthContext bu çağrı başarısız olsa bile register
 * sırasında dönen `user` objesiyle idare edecek şekilde tasarlandı — yani bu
 * endpoint eksikse uygulama çökmez, sadece profil bazı ekranlarda eksik kalır.
 */
export async function getCurrentUser() {
  const response = await apiClient.get('/users/me', { auth: true });
  return normalizeUser(response);
}