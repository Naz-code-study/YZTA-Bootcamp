# Transcribed 1:1 from data/mockData.js RECOMMENDATIONS (matchPercentage -> basePopularity,
# aiNote intentionally dropped — it's generated per-request instead of stored statically).
# FEATURED_IDS from mockData.js -> featured=True below.

from app.firebase import get_firestore_client

CONTENT = [
    {
        "id": "rec-001", "title": "Dark", "category": "dizi",
        "subtitle": "Netflix Orijinal Dizisi · 3 Sezon",
        "tags": ["Gizemli", "Distopik", "Karanlık Atmosfer", "Zaman Yolculuğu"],
        "description": "Küçük bir Alman kasabasında ortaya çıkan kayıplar, dört ailenin arasındaki karanlık sırları ve zamanın döngüsel doğasını gün yüzüne çıkarıyor.",
        "basePopularity": 96, "featured": True,
    },
    {
        "id": "rec-002", "title": "Peaky Blinders", "category": "dizi",
        "subtitle": "BBC Dram Dizisi · 6 Sezon",
        "tags": ["Anti-Kahraman", "Gerilim", "Dönem Draması", "Güçlü Karakterler"],
        "description": "Birinci Dünya Savaşı sonrası Birmingham sokaklarında hüküm süren Shelby ailesinin iktidar, ihanet ve sadakat mücadelesi.",
        "basePopularity": 91, "featured": False,
    },
    {
        "id": "rec-003", "title": "Klaus", "category": "film",
        "subtitle": "Animasyon Film · 1sa 37dk",
        "tags": ["Sıcak Atmosfer", "Hafif Tempo", "Duygusal", "Görsel Şölen"],
        "description": "Küçük bir posta memurunun donmuş bir kasabada yalnız yaşayan bir marangozla kurduğu beklenmedik dostluğun hikâyesi.",
        "basePopularity": 88, "featured": True,
    },
    {
        "id": "rec-004", "title": "Kelebeğin Rüyası", "category": "film",
        "subtitle": "Türk Dram Filmi · 2013",
        "tags": ["Motive Edici", "Gerçek Hikâye", "Duygusal", "İlham Verici"],
        "description": "İki genç şairin hayata, aşka ve umuda tutunma mücadelesini anlatan, gerçek olaylardan uyarlanmış duygusal bir yapım.",
        "basePopularity": 85, "featured": False,
    },
    {
        "id": "rec-005", "title": "Suç ve Ceza", "category": "kitap",
        "subtitle": "Fyodor Dostoyevski · Roman",
        "tags": ["Psikolojik Derinlik", "Karanlık Atmosfer", "Karakter Odaklı"],
        "description": "Bir cinayetin ardından vicdan, suç ve ceza kavramları üzerine derinlemesine giden, edebiyat tarihinin en önemli psikolojik romanlarından biri.",
        "basePopularity": 93, "featured": True,
    },
    {
        "id": "rec-006", "title": "Simyacı", "category": "kitap",
        "subtitle": "Paulo Coelho · Roman",
        "tags": ["İlham Verici", "Hafif Tempo", "Felsefi", "Motive Edici"],
        "description": "Bir çobanın kişisel efsanesini gerçekleştirmek için çıktığı yolculukta hayat, hayal ve anlam üzerine felsefi bir keşif.",
        "basePopularity": 82, "featured": False,
    },
    {
        "id": "rec-007", "title": "Ev Yapımı Mantı", "category": "yemek",
        "subtitle": "Türk Mutfağı · Orta Zorluk",
        "tags": ["Doyurucu", "Ev Yapımı", "Konfor Yemeği", "Klasik"],
        "description": "Yoğurtlu ve tereyağlı sos ile servis edilen, geleneksel el açması hamurla hazırlanan klasik Türk mantısı tarifi.",
        "basePopularity": 90, "featured": True,
    },
    {
        "id": "rec-008", "title": "Hızlı Menemen", "category": "yemek",
        "subtitle": "Türk Mutfağı · Kolay · 15dk",
        "tags": ["Pratik", "Hızlı", "Konfor Yemeği", "Az Malzeme"],
        "description": "Domates, biber ve yumurta ile 15 dakikada hazırlanabilen, yorgun günler için ideal pratik bir konfor yemeği.",
        "basePopularity": 87, "featured": False,
    },
    {
        "id": "rec-009", "title": "Inception", "category": "film",
        "subtitle": "Bilim Kurgu / Gerilim · 2010",
        "tags": ["Zihin Bükücü", "Karmaşık Kurgu", "Yüksek Tempo", "Bilim Kurgu"],
        "description": "Rüyalara girerek fikir çalan bir ekibin, imkânsız görünen bir \"fikir ekme\" görevine soyunduğu katmanlı bir bilim kurgu yapımı.",
        "basePopularity": 94, "featured": True,
    },
    {
        "id": "rec-010", "title": "The Witcher", "category": "dizi",
        "subtitle": "Netflix Fantastik Dizi · 3 Sezon",
        "tags": ["Fantastik", "Aksiyon", "Karanlık Atmosfer", "Evren Odaklı"],
        "description": "Canavar avcısı Geralt of Rivia'nın kaderin örülü olduğu bir dünyada verdiği mücadeleyi anlatan fantastik evren.",
        "basePopularity": 89, "featured": True,
    },
]


def run() -> None:
    db = get_firestore_client()
    for item in CONTENT:
        item = dict(item)
        doc_id = item.pop("id")
        db.collection("content").document(doc_id).set(item, merge=True)
    print(f"Seeded {len(CONTENT)} content docs.")


if __name__ == "__main__":
    run()
