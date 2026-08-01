// data/api/apiClient.js
// MoodTaste AI - Merkezi API İstemcisi
//
// Bu dosya, backend'e (FastAPI, http://<yerel-IP>:8000) yapılan TÜM isteklerin
// tek geçtiği yerdir. Base URL, token ekleme ve hata ayrıştırma mantığı burada
// merkezileşir; ekranlar bu detaylarla hiç uğraşmaz.
//
// KURULUM (ilk kullanımdan önce):
// 1. npx expo install @react-native-async-storage/async-storage
// 2. Proje kök dizininde bir ".env" dosyası oluştur (yoksa) ve şunu ekle:
//      EXPO_PUBLIC_API_URL=http://<BILGISAYARININ_YEREL_IP_ADRESI>:8000
//    (localhost DEĞİL — telefon/simülatör bilgisayarın "localhost"una erişemez.
//    Yerel IP'yi macOS/Linux'ta `ifconfig | grep inet`, Windows'ta `ipconfig` ile bul.)
// 3. .env dosyasını değiştirdikten sonra Expo'yu cache temizleyerek yeniden başlat:
//      npx expo start -c

import AsyncStorage from "@react-native-async-storage/async-storage";

// .env'de EXPO_PUBLIC_API_URL tanımlı değilse diye bir fallback bırakıldı —
// AMA bu fallback'i KENDİ yerel IP'nle değiştirmeden gerçek cihazda çalışmaz.
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL;

// .env değişikliklerinin gerçekten yüklendiğini doğrulamanın en hızlı yolu:
// Uygulama açılır açılmaz bu logu kontrol et. Beklediğin URL değilse, .env
// dosyası okunmuyor demektir (çoğunlukla "npx expo start -c" ile tam önbellek
// temizleyerek yeniden başlatmayı unutmaktan kaynaklanır).
console.log("[apiClient] API_BASE_URL =", API_BASE_URL);

const TOKEN_STORAGE_KEY = "@moodtaste_auth_token";

// --- Token Depolama ---
// Backend, Firebase client SDK'sını devre dışı bıraktığı için (şifreler backend
// üzerinden geçiyor), oturum token'ını AsyncStorage'da biz saklıyoruz.
export const tokenStorage = {
  async get() {
    try {
      return await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    } catch (error) {
      console.warn("[apiClient] Token okunamadı:", error);
      return null;
    }
  },
  async set(token) {
    try {
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
    } catch (error) {
      console.warn("[apiClient] Token kaydedilemedi:", error);
    }
  },
  async clear() {
    try {
      await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch (error) {
      console.warn("[apiClient] Token temizlenemedi:", error);
    }
  },
};

// --- Hata Sınıfı ---
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// FastAPI'nin standart hata gövdesi genelde { "detail": "..." } ya da pydantic
// doğrulama hatalarında { "detail": [{ "loc": [...], "msg": "...", "type": "..." }] }
// şeklindedir. İkisini de kullanıcı dostu tek bir mesaja indirger.
function extractErrorMessage(data, status) {
  if (!data) return `İstek başarısız oldu (${status})`;
  if (typeof data.detail === "string") return data.detail;
  if (Array.isArray(data.detail) && data.detail.length > 0) {
    return (
      data.detail
        .map((d) => d.msg)
        .filter(Boolean)
        .join(", ") || `İstek başarısız oldu (${status})`
    );
  }
  if (data.message) return data.message;
  return `İstek başarısız oldu (${status})`;
}

// --- Ana İstek Fonksiyonu ---
async function request(
  path,
  { method = "GET", body, auth = false, headers = {} } = {},
) {
  const finalHeaders = { "Content-Type": "application/json", ...headers };

  if (auth) {
    const token = await tokenStorage.get();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  const fullUrl = `${API_BASE_URL}${path}`;
  console.log(`[apiClient] → ${method} ${fullUrl}`, body ? { body } : "");

  let response;
  try {
    response = await fetch(fullUrl, {
      method,
      headers: finalHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (networkError) {
    // Sunucuya hiç ulaşılamadı — genelde yanlış IP, backend kapalı, farklı Wi-Fi
    // ağı VEYA CORS tarafından engellenmiş bir istek (tarayıcı bu durumda da
    // fetch'i "network error" olarak reddeder, ayrıntıyı gizler).
    console.error("[apiClient] ✗ Ağ hatası (fetch reddedildi):", networkError);
    console.error(
      "[apiClient] Bu genelde ya backend çalışmıyordur, ya yanlış URL'dir, ya da CORS " +
        "tarafından engellenmiştir. Tarayıcı DevTools → Network sekmesinde bu isteği " +
        "(kırmızı/başarısız olarak) görüp görmediğini kontrol et.",
    );
    throw new ApiError(
      "Sunucuya ulaşılamadı. Backend çalışıyor mu, doğru portta mı ve CORS ayarları uygun mu kontrol et.",
      0,
      null,
    );
  }

  console.log(
    `[apiClient] ← ${response.status} ${response.statusText} (${fullUrl})`,
  );

  let data = null;
  const rawText = await response.text();
  if (rawText) {
    try {
      data = JSON.parse(rawText);
    } catch {
      console.warn(
        "[apiClient] Yanıt JSON değil, ham metin:",
        rawText.slice(0, 200),
      );
    }
  }

  if (!response.ok) {
    console.error("[apiClient] ✗ Sunucu hata döndü:", {
      status: response.status,
      data,
    });
    throw new ApiError(
      extractErrorMessage(data, response.status),
      response.status,
      data,
    );
  }

  console.log("[apiClient] ✓ Başarılı yanıt:", data);
  return data;
}

export const apiClient = {
  get: (path, options) => request(path, { ...options, method: "GET" }),
  post: (path, body, options) =>
    request(path, { ...options, method: "POST", body }),
  patch: (path, body, options) =>
    request(path, { ...options, method: "PATCH", body }),
  delete: (path, options) => request(path, { ...options, method: "DELETE" }),
};
