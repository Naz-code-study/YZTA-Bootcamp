// data/mockData.js
// MoodTaste AI - Sahte Veri Kütüphanesi (Backend bağlanana kadar kullanılır)

// Hızlı duygu durumu çipleri (Ana ekranda gösterilecek)
export const MOOD_CHIPS = [
  { id: 'm1', label: 'Mutlu', icon: 'happy-outline' },
  { id: 'm2', label: 'Yorgun', icon: 'moon-outline' },
  { id: 'm3', label: 'Gizemli Bir Şeyler', icon: 'eye-outline' },
  { id: 'm4', label: 'Kafamı Dağıt', icon: 'flash-outline' },
  { id: 'm5', label: 'Bugün Ne Yesem?', icon: 'restaurant-outline' },
  { id: 'm6', label: 'Motive Ol', icon: 'trending-up-outline' },
  { id: 'm7', label: 'Rahatlamak İstiyorum', icon: 'leaf-outline' },
];

// Ana içerik havuzu
export const RECOMMENDATIONS = [
  {
    id: 'rec-001',
    title: 'Dark',
    category: 'dizi',
    subtitle: 'Netflix Orijinal Dizisi · 3 Sezon',
    matchPercentage: 96,
    tags: ['Gizemli', 'Distopik', 'Karanlık Atmosfer', 'Zaman Yolculuğu'],
    description:
      'Küçük bir Alman kasabasında ortaya çıkan kayıplar, dört ailenin arasındaki karanlık sırları ve zamanın döngüsel doğasını gün yüzüne çıkarıyor.',
    aiNote:
      'Bu dizi sana önerildi çünkü daha önce kara mizah, karmaşık zaman kurgusu ve karanlık atmosfer içeren yapımlara yüksek puan verdin. "Gizemli Bir Şeyler" ruh haline de birebir uyuyor.',
    userRating: 5,
    saved: true,
  },
  {
    id: 'rec-002',
    title: 'Peaky Blinders',
    category: 'dizi',
    subtitle: 'BBC Dram Dizisi · 6 Sezon',
    matchPercentage: 91,
    tags: ['Anti-Kahraman', 'Gerilim', 'Dönem Draması', 'Güçlü Karakterler'],
    description:
      'Birinci Dünya Savaşı sonrası Birmingham sokaklarında hüküm süren Shelby ailesinin iktidar, ihanet ve sadakat mücadelesi.',
    aiNote:
      'Geçmişte anti-kahraman temalı ve güçlü karakter ilişkileri barındıran yapımları favorilerine eklemiştin. Bu dizi zevk profilinle yüksek örtüşme gösteriyor.',
    userRating: 0,
    saved: false,
  },
  {
    id: 'rec-003',
    title: 'Klaus',
    category: 'film',
    subtitle: 'Animasyon Film · 1sa 37dk',
    matchPercentage: 88,
    tags: ['Sıcak Atmosfer', 'Hafif Tempo', 'Duygusal', 'Görsel Şölen'],
    description:
      'Küçük bir posta memurunun donmuş bir kasabada yalnız yaşayan bir marangozla kurduğu beklenmedik dostluğun hikâyesi.',
    aiNote:
      'Bugün "Kafamı Dağıt" modunu seçtin. Ağır olmayan ama duygusal derinliği yüksek içerikleri sevdiğini biliyoruz — Klaus tam bu ihtiyaca uygun, düşük tempolu ve sıcak bir seçim.',
    userRating: 0,
    saved: false,
  },
  {
    id: 'rec-004',
    title: 'Kelebeğin Rüyası',
    category: 'film',
    subtitle: 'Türk Dram Filmi · 2013',
    matchPercentage: 85,
    tags: ['Motive Edici', 'Gerçek Hikâye', 'Duygusal', 'İlham Verici'],
    description:
      'İki genç şairin hayata, aşka ve umuda tutunma mücadelesini anlatan, gerçek olaylardan uyarlanmış duygusal bir yapım.',
    aiNote:
      'Motivasyon düşük olduğunda ilham verici ve umut temalı içerikleri tercih ettiğini gördük. Kaydettiğin önceki dram filmleriyle temel tema benzerliği yüksek.',
    userRating: 4,
    saved: true,
  },
  {
    id: 'rec-005',
    title: 'Suç ve Ceza',
    category: 'kitap',
    subtitle: 'Fyodor Dostoyevski · Roman',
    matchPercentage: 93,
    tags: ['Psikolojik Derinlik', 'Karanlık Atmosfer', 'Karakter Odaklı'],
    description:
      'Bir cinayetin ardından vicdan, suç ve ceza kavramları üzerine derinlemesine giden, edebiyat tarihinin en önemli psikolojik romanlarından biri.',
    aiNote:
      'Bu kitap, geçmişte sevdiğin psikolojik derinlik ve karakter odaklı hikâye yapısıyla yüksek benzerlik gösteriyor. Kara mizah etiketli içeriklere verdiğin puanlar da bu öneriyi güçlendirdi.',
    userRating: 5,
    saved: true,
  },
  {
    id: 'rec-006',
    title: 'Simyacı',
    category: 'kitap',
    subtitle: 'Paulo Coelho · Roman',
    matchPercentage: 82,
    tags: ['İlham Verici', 'Hafif Tempo', 'Felsefi', 'Motive Edici'],
    description:
      'Bir çobanın kişisel efsanesini gerçekleştirmek için çıktığı yolculukta hayat, hayal ve anlam üzerine felsefi bir keşif.',
    aiNote:
      '"Motive Ol" ruh halini seçtiğinde, geçmişte ilham verici ve felsefi tonlu içeriklere kaydettiğin ilgiyi tespit ettik. Bu kitap zevk profilinin bu yönüne çok uygun.',
    userRating: 0,
    saved: false,
  },
  {
    id: 'rec-007',
    title: 'Ev Yapımı Mantı',
    category: 'yemek',
    subtitle: 'Türk Mutfağı · Orta Zorluk',
    matchPercentage: 90,
    tags: ['Doyurucu', 'Ev Yapımı', 'Konfor Yemeği', 'Klasik'],
    description:
      'Yoğurtlu ve tereyağlı sos ile servis edilen, geleneksel el açması hamurla hazırlanan klasik Türk mantısı tarifi.',
    aiNote:
      'Daha önce kaydettiğin yemek önerilerinde "konfor hissi veren" ve "doyurucu" etiketli tarifleri yüksek puanlamıştın. Bu tarif damak zevkinle birebir örtüşüyor.',
    userRating: 0,
    saved: false,
  },
  {
    id: 'rec-008',
    title: 'Hızlı Menemen',
    category: 'yemek',
    subtitle: 'Türk Mutfağı · Kolay · 15dk',
    matchPercentage: 87,
    tags: ['Pratik', 'Hızlı', 'Konfor Yemeği', 'Az Malzeme'],
    description:
      'Domates, biber ve yumurta ile 15 dakikada hazırlanabilen, yorgun günler için ideal pratik bir konfor yemeği.',
    aiNote:
      'Bugün "yorgun" hissettiğini belirttin. Geçmiş verilerine göre yorgun olduğun günlerde pratik ve az malzemeli tarifleri tercih ediyorsun — bu öneri tam o ihtiyaca göre seçildi.',
    userRating: 3,
    saved: true,
  },
  {
    id: 'rec-009',
    title: 'Inception',
    category: 'film',
    subtitle: 'Bilim Kurgu / Gerilim · 2010',
    matchPercentage: 94,
    tags: ['Zihin Bükücü', 'Karmaşık Kurgu', 'Yüksek Tempo', 'Bilim Kurgu'],
    description:
      'Rüyalara girerek fikir çalan bir ekibin, imkânsız görünen bir "fikir ekme" görevine soyunduğu katmanlı bir bilim kurgu yapımı.',
    aiNote:
      'Karmaşık zaman kurgusu ve zihin bükücü hikâyelere olan ilgin (Dark dizisine verdiğin yüksek puan dahil) bu filmi senin için güçlü bir eşleşme yapıyor.',
    userRating: 0,
    saved: false,
  },
  {
    id: 'rec-010',
    title: 'The Witcher',
    category: 'dizi',
    subtitle: 'Netflix Fantastik Dizi · 3 Sezon',
    matchPercentage: 89,
    tags: ['Fantastik', 'Aksiyon', 'Karanlık Atmosfer', 'Evren Odaklı'],
    description:
      'Canavar avcısı Geralt of Rivia\'nın kaderin örülü olduğu bir dünyada verdiği mücadeleyi anlatan fantastik evren.',
    aiNote:
      'Fantastik evrenli, atmosferik ve karakter odaklı yapımlara olan güçlü eğilimin nedeniyle önerildi. Ayrıca bu diziyi sevenlere genellikle mitoloji temalı kitaplar da öneriyoruz — ister misin?',
    userRating: 0,
    saved: false,
  },
];

// Ana ekranda "Senin İçin Seçilenler" bölümünde gösterilecek öne çıkan öneriler
export const FEATURED_IDS = ['rec-001', 'rec-003', 'rec-005', 'rec-007', 'rec-009', 'rec-010'];

export const getFeaturedRecommendations = () =>
  RECOMMENDATIONS.filter((item) => FEATURED_IDS.includes(item.id));

// --- Kayıtlı Önerilerim Ekranı için Yardımcılar ---

// Filtre çiplerinde gösterilecek kategoriler
export const SAVED_FILTERS = [
  { id: 'all', label: 'Tümü', icon: 'apps-outline' },
  { id: 'film', label: 'Film', icon: 'film-outline' },
  { id: 'dizi', label: 'Dizi', icon: 'tv-outline' },
  { id: 'kitap', label: 'Kitap', icon: 'book-outline' },
  { id: 'yemek', label: 'Yemek', icon: 'restaurant-outline' },
];

export const getSavedRecommendations = (categoryFilter = 'all') => {
  const saved = RECOMMENDATIONS.filter((item) => item.saved);
  if (categoryFilter === 'all') return saved;
  return saved.filter((item) => item.category === categoryFilter);
};

// --- AI Analiz Animasyonu için Basit Eşleştirme Motoru ---
// Gerçek bir NLP servisi bağlanana kadar, kullanıcının yazdığı/seçtiği duygu
// metnini anahtar kelimelerle etiketlere eşleyip en uygun içerikleri skorlar.

const KEYWORD_TAG_MAP = [
  {
    keywords: ['yorgun', 'yoruldum', 'dinlenmek', 'bitkin'],
    tags: ['Hafif Tempo', 'Rahatlatıcı', 'Sıcak Atmosfer', 'Pratik'],
  },
  {
    keywords: ['gizem', 'gizemli', 'merak', 'sürükleyici'],
    tags: ['Gizemli', 'Distopik', 'Karanlık Atmosfer'],
  },
  {
    keywords: ['kafamı dağıt', 'dağıtmak', 'eğlen', 'komik', 'mizah'],
    tags: ['Kara Mizah', 'Hafif Tempo', 'Görsel Şölen'],
  },
  {
    keywords: ['ye', 'yemek', 'aç', 'doyur', 'lezzet'],
    categories: ['yemek'],
  },
  {
    keywords: ['motive', 'motivasyon', 'ilham', 'umut'],
    tags: ['Motive Edici', 'İlham Verici'],
  },
  {
    keywords: ['rahatla', 'sakin', 'huzur', 'stresli', 'stres'],
    tags: ['Rahatlatıcı', 'Sıcak Atmosfer', 'Hafif Tempo'],
  },
  {
    keywords: ['mutlu', 'neşeli', 'keyifli'],
    tags: ['Görsel Şölen', 'Sıcak Atmosfer', 'Duygusal'],
  },
];

export const getMoodBasedRecommendations = (moodQuery = '', limit = 2) => {
  const query = moodQuery.toLowerCase();

  let matchedTags = [];
  let matchedCategories = [];

  KEYWORD_TAG_MAP.forEach((entry) => {
    const hit = entry.keywords.some((kw) => query.includes(kw));
    if (hit) {
      if (entry.tags) matchedTags = [...matchedTags, ...entry.tags];
      if (entry.categories) matchedCategories = [...matchedCategories, ...entry.categories];
    }
  });

  let pool = RECOMMENDATIONS;
  if (matchedCategories.length > 0) {
    pool = pool.filter((item) => matchedCategories.includes(item.category));
  }

  const scored = pool.map((item) => {
    const tagHits = item.tags.filter((tag) => matchedTags.includes(tag)).length;
    return { item, score: tagHits * 10 + item.matchPercentage };
  });

  scored.sort((a, b) => b.score - a.score);

  const results = scored.slice(0, limit).map((entry) => entry.item);
  if (results.length > 0) return results;

  // Eşleşme bulunamazsa en yüksek uyum skorlu içerikleri döndür
  return [...RECOMMENDATIONS].sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, limit);
};

// Baskın profil özeti (üst kart)
export const DOMINANT_PROFILE = {
  title: 'Karanlık Atmosfer & Distopik Evrenler',
  description:
    'Puanladığın içeriklerin büyük çoğunluğu kara mizah, gizem ve distopik evren temaları taşıyor. Yüzeysel türlerden çok, karakterlerin iç dünyasına inen katmanlı anlatılara yöneliyorsun.',
};

// Radar (örümcek ağı) grafiği verisi — her eksen 0-100 arası değer alır
export const TASTE_DNA_DATA = [
  { id: 'axis-1', label: 'Kara Mizah', value: 88 },
  { id: 'axis-2', label: 'Gizem', value: 92 },
  { id: 'axis-3', label: 'Distopik', value: 80 },
  { id: 'axis-4', label: 'Karakter\nDerinliği', value: 85 },
  { id: 'axis-5', label: 'Fantastik', value: 58 },
  { id: 'axis-6', label: 'Rahatlatıcı', value: 64 },
];

// Kategoriye göre uyum yüzdeleri (ilerleme barları)
export const CATEGORY_PROGRESS = [
  { category: 'dizi', percentage: 91 },
  { category: 'film', percentage: 84 },
  { category: 'kitap', percentage: 78 },
  { category: 'yemek', percentage: 69 },
  { category: 'muzik', percentage: 55 },
  { category: 'oyun', percentage: 61 },
];

// Kullanıcının genelde kaçındığı temalar
export const AVOIDED_THEMES = [
  'Aşırı Romantik',
  'Yavaş Aile Draması',
  'Bol Şarkılı Müzikaller',
  'Klasik Slasher Korku',
];

// Kullanıcının keşfetmeye açık olduğu yeni alanlar
export const EXPLORE_THEMES = [
  'Mitolojik Evrenler',
  'Sürreal Kısa Filmler',
  'Bilim Kurgu Podcastleri',
  'Deneysel Caz',
];

// --- Onboarding (Başlangıç Zevk Testi) Verileri ---

export const ONBOARDING_CONTENT_TYPES = [
  { id: 'film', label: 'Film', icon: 'film-outline' },
  { id: 'dizi', label: 'Dizi', icon: 'tv-outline' },
  { id: 'kitap', label: 'Kitap', icon: 'book-outline' },
  { id: 'muzik', label: 'Müzik', icon: 'musical-notes-outline' },
  { id: 'oyun', label: 'Oyun', icon: 'game-controller-outline' },
  { id: 'podcast', label: 'Podcast', icon: 'mic-outline' },
  { id: 'yemek', label: 'Yemek', icon: 'restaurant-outline' },
];

export const ONBOARDING_ATMOSPHERES = [
  { id: 'karanlik', label: 'Karanlık & Gizemli', icon: 'moon-outline' },
  { id: 'eglenceli', label: 'Eğlenceli & Çerezlik', icon: 'happy-outline' },
  { id: 'dusundurucu', label: 'Düşündürücü & Felsefi', icon: 'bulb-outline' },
  { id: 'pratik', label: 'Pratik & Konforlu', icon: 'home-outline' },
  { id: 'romantik', label: 'Romantik & Sıcak', icon: 'heart-outline' },
  { id: 'enerjik', label: 'Enerjik & Aksiyon Dolu', icon: 'flash-outline' },
];

export const ONBOARDING_NEEDS = [
  { id: 'kafa_dagit', label: 'Kafamı Dağıtmaya', icon: 'game-controller-outline' },
  { id: 'ilham', label: 'İlham Almaya', icon: 'bulb-outline' },
  { id: 'lezzet', label: 'Yeni Lezzetler Denemeye', icon: 'restaurant-outline' },
  { id: 'rahatlama', label: 'Rahatlamaya', icon: 'leaf-outline' },
  { id: 'heyecan', label: 'Heyecana', icon: 'flash-outline' },
  { id: 'baglanti', label: 'Duygusal Bağ Kurmaya', icon: 'heart-outline' },
];

// Onboarding akışının 3 adımını tanımlayan merkezi yapı
export const ONBOARDING_STEPS = [
  {
    id: 'step1',
    title: 'Hangi İçerik Türleri İlgini Çeker?',
    subtitle: 'Birden fazla seçim yapabilirsin',
    options: ONBOARDING_CONTENT_TYPES,
    multiSelect: true,
  },
  {
    id: 'step2',
    title: 'Nasıl Bir Atmosfer Ararsın?',
    subtitle: 'Sana en çok hitap edeni seç',
    options: ONBOARDING_ATMOSPHERES,
    multiSelect: false,
  },
  {
    id: 'step3',
    title: 'Bugünlerde En Çok Neye İhtiyacın Var?',
    subtitle: 'Şu anki ruh haline en yakın olanı seç',
    options: ONBOARDING_NEEDS,
    multiSelect: false,
  },
];

// --- AI Analiz Animasyonu için Ruh Hali -> Öneri Eşlemesi ---

// Hızlı duygu çipi id'lerine göre önceden hazırlanmış öneri eşlemesi
export const MOOD_RECOMMENDATION_MAP = {
  m1: ['rec-003', 'rec-010'], // Mutlu -> Klaus, The Witcher
  m2: ['rec-008', 'rec-003'], // Yorgun -> Hızlı Menemen, Klaus
  m3: ['rec-001', 'rec-005'], // Gizemli Bir Şeyler -> Dark, Suç ve Ceza
  m4: ['rec-009', 'rec-002'], // Kafamı Dağıt -> Inception, Peaky Blinders
  m5: ['rec-007', 'rec-008'], // Bugün Ne Yesem? -> Ev Yapımı Mantı, Hızlı Menemen
  m6: ['rec-004', 'rec-006'], // Motive Ol -> Kelebeğin Rüyası, Simyacı
  m7: ['rec-006', 'rec-008'], // Rahatlamak İstiyorum -> Simyacı, Hızlı Menemen
};

// Serbest metin girişleri için basit anahtar kelime eşleme tablosu (mock NLP)
const FREE_TEXT_KEYWORD_MAP = [
  { keywords: ['yorgun', 'yorucu', 'bitkin', 'bitkinim'], ids: ['rec-008', 'rec-003'] },
  { keywords: ['gizem', 'gizemli', 'sürükleyici', 'meraklı'], ids: ['rec-001', 'rec-005'] },
  { keywords: ['motivasyon', 'ilham', 'motive'], ids: ['rec-004', 'rec-006'] },
  { keywords: ['yemek', 'aç', 'acık', 'ye'], ids: ['rec-007', 'rec-008'] },
  { keywords: ['rahat', 'sakin', 'huzur'], ids: ['rec-006', 'rec-008'] },
  { keywords: ['eğlen', 'komik', 'kafa dağıt', 'mutlu'], ids: ['rec-009', 'rec-002'] },
  { keywords: ['korku', 'gerilim', 'karanlık'], ids: ['rec-001', 'rec-010'] },
];

// Verilen bir duygu çipi id'sine veya serbest metne göre 2 adet öneri döndürür (mock AI motoru)
export const getAIRecommendationsForMood = (moodKey, freeText = '') => {
  if (moodKey && MOOD_RECOMMENDATION_MAP[moodKey]) {
    const ids = MOOD_RECOMMENDATION_MAP[moodKey];
    return RECOMMENDATIONS.filter((item) => ids.includes(item.id));
  }

  const normalizedText = (freeText || '').toLocaleLowerCase('tr-TR');
  for (const entry of FREE_TEXT_KEYWORD_MAP) {
    if (entry.keywords.some((keyword) => normalizedText.includes(keyword))) {
      return RECOMMENDATIONS.filter((item) => entry.ids.includes(item.id));
    }
  }

  // Eşleşme bulunamazsa en yüksek uyum skorlu 2 içeriği döndür
  return [...RECOMMENDATIONS]
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 2);
};

// --- Keşfet (ExploreScreen) Ekranı için Filtreler ---

// Her filtre, RECOMMENDATIONS içindeki `tags` alanıyla eşleşecek bir veya birkaç etiket taşır.
export const EXPLORE_FILTERS = [
  { id: 'all', label: 'Tümü', icon: 'apps-outline', tagMatch: null },
  { id: 'ters-kose', label: 'Ters Köşe', icon: 'shuffle-outline', tagMatch: ['Zihin Bükücü', 'Anti-Kahraman'] },
  { id: 'distopik', label: 'Distopik', icon: 'planet-outline', tagMatch: ['Distopik'] },
  { id: 'yuksek-tempo', label: 'Yüksek Tempo', icon: 'flash-outline', tagMatch: ['Yüksek Tempo', 'Aksiyon'] },
  { id: 'konfor-yemek', label: 'Konfor Yemeği', icon: 'restaurant-outline', tagMatch: ['Konfor Yemeği'] },
  { id: 'karanlik', label: 'Karanlık Atmosfer', icon: 'moon-outline', tagMatch: ['Karanlık Atmosfer'] },
  { id: 'ilham', label: 'İlham Verici', icon: 'bulb-outline', tagMatch: ['İlham Verici', 'Motive Edici'] },
  { id: 'fantastik', label: 'Fantastik', icon: 'sparkles-outline', tagMatch: ['Fantastik'] },
];

// Seçilen filtreye göre içerikleri döndürür. `sourceItemId` verilirse, o içerik
// listenin en üstüne alınır ve kendisi listeden çıkarılmaz (kullanıcı referans olarak görsün diye).
export const getExploreRecommendations = (filterId = 'all', sourceItemId = null) => {
  const filter = EXPLORE_FILTERS.find((f) => f.id === filterId);
  let results = RECOMMENDATIONS;

  if (filter && filter.tagMatch) {
    results = RECOMMENDATIONS.filter((item) =>
      item.tags?.some((tag) => filter.tagMatch.includes(tag))
    );
  }

  if (sourceItemId) {
    const sourceIndex = results.findIndex((item) => item.id === sourceItemId);
    if (sourceIndex > 0) {
      const [sourceItem] = results.splice(sourceIndex, 1);
      results = [sourceItem, ...results];
    }
  }

  return results;
};