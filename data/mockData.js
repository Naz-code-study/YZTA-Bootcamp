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

// --- Zevk DNA Ekranı için Veriler ---

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