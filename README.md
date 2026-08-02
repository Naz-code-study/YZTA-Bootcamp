# Takım İsmi

Takım 67

# Ürün İle İlgili Bilgiler

## Takım Elemanları

* **Dilay Bayrak:** Scrum Master
* **Naz Erdoğdu:** Product Owner
* **Vedat Ayaz:** Team Member / Developer
* **Ayşe Feyza Kedersiz:** Team Member / Developer
* **Yahya Mert İmal:** Team Member / Developer

## Ürün İsmi

MoodTaste AI (Zevk DNA)

## Ürün Açıklaması

* **MoodTaste AI**, kullanıcıların geçmişte tükettiği (film, dizi, kitap, müzik, oyun, podcast, yemek) içerikleri ve bunlara verdikleri tepkileri analiz ederek kişisel bir "Zevk DNA'sı" çıkaran, aynı zamanda kullanıcının **anlık duygu durumuna (mood)** göre yapay zekâ destekli çapraz medya önerileri sunan akıllı bir mobil asistandır. Yalnızca "benzer içerik" önermekle kalmaz; kullanıcının o anki ruh haline uygun türleri eşleştirir ve her önerinin **neden** yapıldığını şeffaf bir şekilde açıklar.

## Ürün Özellikleri

* **Çoklu Kategori ve Çapraz Medya Önerisi:** Film, dizi, kitap, müzik, oyun, podcast ve yemek kategorilerini tek bir yapay zeka haritasında birleştirir.
* **Anlık Duygu Durumu (Mood Engine) Analizi:** Hazır duygu butonları ("Mutlu", "Yorgun", "Gizemli bir şey istiyorum") veya doğal dil metin girişiyle kullanıcının o anki ruh halini tespit eder.
* **Kişisel Zevk DNA Çıkarımı:** Kullanıcının geçmiş puanlamalarını, yorumlarını ve favorilerini analiz ederek görsel bir zevk grafiği sunar.
* **Açıklanabilir Yapay Zekâ (Explainable AI):** Her öneri kartında *"Bu dizi sana önerildi çünkü daha önce kara mizah ve anti-kahraman temalarını yüksek puanladın"* şeklinde mantıksal açıklamalar sunar.
* **Vektörel Benzerlik ve RAG Altyapısı:** İçeriklerin özetlerini ve duygu etiketlerini anlamsal vektörlere dönüştürerek klasik anahtar kelime aramasının ötesinde nokta atışı eşleşmeler yakalar.
* **Cross-Platform Deneyim:** React Native tabanlı arayüzü ve Firebase entegrasyonu ile iOS ve Android platformlarında sorunsuz çalışır.

## Hedef Kitle

* Film, dizi ve içerik platformları arasında "Ne izlesem/dinlesem?" kararsızlığı yaşayan dijital tüketiciler
* Ruh haline ve anlık moduna göre kişiselleştirilmiş bir asistan arayan kullanıcılar
* Yeni kitap, oyun, podcast veya yemek kültürü keşfetmek isteyen yenilikçi bireyler
* Kültür-sanat ve eğlence içeriklerini aktif tüketen 15 - 45 yaş arası kullanıcılar

## Product Backlog URL

[Jira Projects Backlog Board Linki](https://dilaybayrak04.atlassian.net/jira/software/projects/SCRUM/boards/1?isInsightsOpen=true)

---
<details>
  <summary><h2>Sprint 1</h2></summary>

  * **Backlog düzeni ve Story seçimleri:** Bu sprint ağırlıklı olarak proje yönetimi, projenin çapının (scope) belirlenmesi ve fikirler üzerinde uzlaşma süreçlerine ayrılmıştır. Bu nedenle Product Backlog'umuz, doğrudan teknik geliştirmelerden ziyade analiz, teknoloji seçimi ve mimari planlama story'lerine göre düzenlenmiştir. Sprint başına tahmin edilen puan sayısını geçmeyecek şekilde, kullanılacak teknolojilerin araştırılması ve ürün sınırlarının çizilmesi task'leri puanlanmış, kapasiteye uygun seçimler yapılmıştır.

  * **Daily Scrum:** Daily Scrum toplantılarımızın ve genel proje süreçlerimizin WhatsApp üzerinden düzenli iletişim kurularak ve Google Meet üzerinden online toplantılar yapılarak yürütülmesine karar verilmiştir. Daily Scrum toplantısı örneği ekran görüntüsü olarak Readme'de tarafımızdan paylaşılmaktadır: 
    [Sprint 1 Daily Scrum Sohbet Kanıtları](https://docs.google.com/document/d/1Jaj8YmphBXVd0JHIo-K1nHgAs3c4NuTV/edit?usp=sharing&ouid=103046258349654356650&rtpof=true&sd=true)

  * **Sprint board update:** Sprint board screenshotları:
    ![Sprint 1 Board Görüntüsü 1] <img width="967" height="836" alt="Ekran görüntüsü 2026-07-04 173623" src="https://github.com/user-attachments/assets/56217bc4-1d51-48db-9d06-2fea41546545" />
    ![Sprint 1 Board Görüntüsü 2] <img width="963" height="925" alt="Ekran görüntüsü 2026-07-04 174002" src="https://github.com/user-attachments/assets/f77c0da0-d526-410d-a6cf-d2fb32e3d89c" />

  * **Ürün Durumu:** Bu sprintte henüz aktif kodlama aşamasına geçilmemiş olup, ürünün genel mimarisi, hedef kitlesi ve teknoloji yığını (tech stack) tasarlanmıştır.

  * **Sprint Review:** 
    * **Alınan Kararlar:** Takım içi değerlendirmeler sonucunda projenin hedeflenen kullanıcı deneyimini en iyi şekilde sunabilmesi için bir web projesi yerine **mobil uygulama** olarak geliştirilmesine kesin karar verilmiştir.
    * Mobil uygulamanın arayüzü ve arka planda çalışacak yapay zeka/öneri motoru için kullanılacak teknolojiler (kullanılacak kütüphaneler, veritabanı mimarisi) üzerine mutabakata varılmıştır. 
    * Sprint Review Katılımcıları: Dilay Bayrak, Vedat Ayaz, Naz Erdoğdu, Ayşe Feyza Kadersiz, Yahya Mert İmal

  * **Sprint Retrospective:**
    * Fikir bulma, uygulamanın çapını belirleme ve uzlaşma sürecinin planlanandan biraz daha uzun sürmesi nedeniyle, sonraki sprintlerde kodlama ve teknik geliştirme süreçlerine daha fazla ivme kazandırılması kararı alınmıştır.
    * Takım içindeki görev dağılımları, belirlenen yeni teknolojilere (mobil geliştirme, yapay zeka entegrasyonu) göre daha net sınırlandırılmıştır.
    * Sprint planlama toplantılarında zaman kazanmak adına teknik araştırmaların toplantı öncesinde tamamlanıp hazır sunulması gerektiğine karar verilmiştir.

</details>
---

<details>
  <summary><h2>Sprint 2</h2></summary>
  
  * **Backlog düzeni ve Story seçimleri:** Bu sprint, projenin aktif geliştirme evresi olarak kurgulanmış; temel arayüzlerin (UI/UX) kodlanması, veri setlerinin bulunması ve backend mimarisinin temellerinin atılması story'lerine odaklanmıştır. Product Backlog'umuzdan efor yüksekliği göz önüne alınarak frontend ekranları ve Kaggle veri seti hazırlıkları önceliklendirilmiştir. Sprint başına tahmin edilen puan kapasitesi aşılmadan, görevler (task'ler) dengeli bir şekilde dağıtılmış ve teknik altyapı işlerine ağırlık verilmiştir.

  * **Daily Scrum:** Daily Scrum toplantılarımızın ve genel proje süreçlerimizin WhatsApp üzerinden düzenli iletişim kurularak ve Google Meet üzerinden online toplantılar yapılarak yürütülmesine karar verilmiştir: 
    [Sprint 2 Daily Scrum Sohbet Kanıtları](https://docs.google.com/document/d/1gmG1KjJijPBOwsU2HHUjajL9HbkTeJw1/edit?usp=sharing&ouid=103046258349654356650&rtpof=true&sd=true)

  * **Sprint board update:** Sprint board screenshotları:
    ![Sprint 2 Board Görüntüsü 1] <img width="1462" height="871" alt="Ekran görüntüsü 2026-07-19 195823" src="https://github.com/user-attachments/assets/bec4c795-66e4-46f2-b3bd-00c2dcc3315c" />
    ![Sprint 2 Board Görüntüsü 2] <img width="1091" height="919" alt="Ekran görüntüsü 2026-07-19 200045" src="https://github.com/user-attachments/assets/35c0d8a3-d9e6-40c3-83fc-333069952a40" />

  * **Ürün Durumu:** Bu sprintte frontend geliştirme süreci başarıyla tamamlanmış; React Native kullanılarak mobil uygulamanın giriş/kayıt, onboarding (zevk testi) ve ana sayfa arayüzleri çalışan kod tabanına dönüştürülmüştür. Aynı zamanda Kaggle üzerinden film, dizi ve müzik veri setleri indirilerek Keşifçi Veri Analizi (EDA) adımlarına başlanmış, Python (FastAPI/Flask) backend ortamının kurulumları yapılmıştır.
<img width="400" height="867" alt="WhatsApp Image 2026kjnknkn34 48" src="https://github.com/user-attachments/assets/37b88d51-5d7f-4e84-bede-20b033773bd1" />

<img width="400" height="867" alt="WhatsApp Image 2026-07-19 at 19 34 48" src="https://github.com/user-attachments/assets/bc605de9-97d0-4213-a7cb-e4b20782ddd3" />

<img width="400" height="867" alt="jhbuygı 34 48" src="https://github.com/user-attachments/assets/055e1bee-7a30-467f-a5de-77bc54a3d4eb" />

<img width="400" height="867" alt="WhatsAöknlkjnçöknlkı7-19 at 19 34 48" src="https://github.com/user-attachments/assets/5b52150a-3134-4844-9ac0-f3e4860aabe6" />

  * **Sprint Review:** 
    * **Alınan Kararlar:** Mobil uygulamanın arayüz kodlamasında tasarım tutarlılığı sağlandığı görülmüş ve frontend tarafının MVP (İlk Çalışan Sürüm) için yeterli olduğuna karar verilmiştir.
    * Veri seti büyüklüğünün performansı etkilememesi adına model eğitiminde ve benzerlik aramalarında vektör tabanlı yaklaşım (embedding) kullanılması kesinleşmiştir.
    * Firebase Authentication ve Firestore veritabanı şemalarının Python backend API servisleriyle entegrasyonu bir sonraki sprintin (Sprint 3) ana odağı olarak belirlenmiştir. 
    * Sprint Review Katılımcıları: Dilay Bayrak, Vedat Ayaz, Naz Erdoğdu, Ayşe Feyza Kadersiz, Yahya Mert İmal

  * **Sprint Retrospective:**
    * Frontend arayüz kodlamalarının planlanan sürede başarıyla bitirilmesi takımın motivasyonunu artırmış, geliştirme temposunun korunmasına karar verilmiştir.
    * Veri seti temizliği ve backend API uçlarının (endpoint) bağlanması aşamasında daha yoğun bir teknik koordinasyon gerekeceği için, sonraki sprintte geliştiriciler arası ikili programlama (pair programming) yapılması kararlaştırılmıştır.
    * Sprint sonlarında yapılan genel testlere ek olarak, kod entegrasyonu sırasında ara kontrollerin artırılması gerektiğine dikkat çekilmiştir.

</details>
---

<details>
  <summary><h2>Sprint 3</h2></summary>
  
  * **Backlog düzeni ve Story seçimleri:** 
    * Bu sprint, projenin en kapsamlı mimari dönüşüm evresi olarak planlanmıştır. Temel hedeflerimiz; frontend klasör yapısının monorepo standartlarına taşınması, FastAPI tabanlı Python backend servislerinin sıfırdan ayağa kaldırılması, Firebase (Auth + Firestore) veritabanı altyapısının kurulması ve projenin "Ürün Tanıtım / Final Video Sunumunun" tamamlanmasıdır.
    * Product Backlog kapsamında; backend ortamının (venv, requirements) hazırlanması, REST API uç noktalarının (endpoints) kodlanması, Firestore koleksiyonlarının yapılandırılması ve iki aşamalı öneri algoritmasının tasarlanması önceliklendirilmiştir. 
    * Jira board üzerindeki task'ler bu teknik ihtiyaçlara göre güncellenmiş ve sprint eforu frontend temizliği ile backend inşası arasında dengeli bir şekilde paylaştırılmıştır.

  * **Daily Scrum:** 
    * Toplantılarımız ve proje koordinasyonumuz WhatsApp üzerinden günlük iletişim ve Google Meet üzerinden gerçekleştirilen online toplantılar ile yürütülmüştür. 
    * Sprint 3 Daily Scrum kanıtları:  
      [Sprint 3 Daily Scrum Sohbet Kanıtları]()

  * **Sprint board update:** 
    * Sprint süresince Jira backlog yönetiminin ve task ilerlemelerinin takibi için kullanılan board ekran görüntüleri:
      ![Sprint 3 Jira Board Görüntüsü 1]
      ![Sprint 3 Jira Board Görüntüsü 2] 

  * **Ürün Durumu:** 
    * **Backend & Veritabanı (FastAPI + Firestore):** `backend/` dizini altında uygulamanın temel omurgası başarıyla kurulmuştur. 
      * Firebase projesi (moodtaste) oluşturulmuş, servis hesabı anahtarları (`firebase-credentials.json`) ve `.env` yapılandırmaları güvenli bir şekilde sisteme dahil edilmiştir.
      * `app.seed.seed_catalog` scripti yazılarak Firestore veritabanına başlangıç içerik kataloğu (starter recommendations) başarıyla yüklenmiştir (seed edilmiştir).
    * **Güvenlik ve Auth Akışı:** Kimlik doğrulama süreci tamamen Firebase Identity Toolkit üzerinden yapılandırılmıştır. Backend, kullanıcıların ham şifrelerini asla tutmaz veya işlemez. İstemci `POST /auth/register` veya `/auth/login` attığında bir Firebase ID Token alır ve diğer tüm güvenli isteklere `Authorization: Bearer <token>` başlığıyla erişir. Backend bu token'ı Firebase Admin SDK ile doğrular.
    * **Geliştirilen API Uç Noktaları (Endpoints):**
      * *Kullanıcı/Auth:* Kayıt, giriş, sosyal giriş, çıkış ve veri sıfırlama (`DELETE /users/me/data`).
      * *Profil Yönetimi:* Profil bilgileri (`GET /users/me`), onboarding süreci (`POST /users/me/onboarding`), ayarlar (`PATCH /users/me/settings`) ve zevk profili (`GET /users/me/taste-profile`).
      * *Öneriler & Etkileşim:* Öne çıkanlar, keşfet filtreleri, içerik kaydetme/silme ve 0-5 arası puanlama (rating) uç noktaları tamamlanmıştır. Tüm dokümantasyon `/docs` (Swagger UI) üzerinde interaktif hale getirilmiştir.
    * **Öneri Motoru (İki Katmanlı Mood Eşleştirme):** `POST /recommendations/mood` uç noktası iki katmanlı hibrit bir algoritma ile kodlanmıştır:
      1. *Kural Tabanlı (Keyword Rules):* Frontend mock datasından taşınan Türkçe anahtar kelimeler ile etiketler eşleştirilir (`scoring.KEYWORD_TAG_MAP`).
      2. *Vektörel Benzerlik (Vector Similarity):* Serbest metin girildiğinde, `scikit-learn` kullanılarak içeriklerin başlık/açıklama/etiket verileri üzerinden TF-IDF vektörleri oluşturulur ve kosinüs benzerliğine (cosine similarity) göre sıralama yapılır. Bu, ürünün "Vektörel Benzerlik" özelliğinin ilk çalışan halidir. (Şu an için kelime bazlı -lexical- çalışmakta olup, gelecekte neural embedding'e geçiş için altyapı hazırdır). Eşleşme bulunamazsa sistem popülerlik sıralamasına (popularity ranking) geri döner.
    * **Frontend & Monorepo Mimarisi:** Proje, kök dizindeki karmaşadan kurtarılarak modern bir monorepo yapısına geçirilmiştir. Tüm React Native/Expo dosyaları `frontend/` klasörüne taşınmış, `.gitignore` dosyaları birleştirilmiş, kopuk import yolları ve tema (`useThemeColor`) çakışmaları çözülmüştür. 
    * **Entegrasyon Durumu & Video Sunumu:** Bu sprint itibarıyla Backend tamamen hazır, Frontend ise görsel/navigasyon olarak sorunsuzdur. **Faz 2 olarak adlandırılan, Frontend'in gerçek API uçlarına (Onboarding verilerinin POST edilmesi vb.) bağlanması işlemi bir sonraki aşamaya bırakılmıştır.** Uygulamanın mevcut durumuyla Ürün Tanıtım/Final Video Sunumu başarıyla çekilmiştir.

  * **Sprint Review:** 
    * **Alınan Kararlar:** Python backend mimarisinin (FastAPI) oldukça hızlı çalıştığı, Firebase token doğrulama akışının güvenli olduğu ve TF-IDF vektörel aramasının beklendiği gibi tepki verdiği görülmüştür.
    * Uygulamanın mevcut stabil hali üzerinden final sunum videosunun tamamlanması onaylanmıştır.
    * Sıradaki en kritik ve tek önceliğin (Faz 2), frontend'deki mock dataların kaldırılarak yazılan bu gerçek backend uç noktalarına (API) HTTP istekleriyle bağlanması olduğuna karar verilmiştir.
    * **Sprint Review Katılımcıları:** Dilay Bayrak, Vedat Ayaz, Naz Erdoğdu, Ayşe Feyza Kadersiz, Yahya Mert İmal

  * **Sprint Retrospective:**
    * **Olumlu Yönler:** Backend ekibinin veritabanı şemalarını ve iki katmanlı arama algoritmasını çok detaylı ve temiz bir mimariyle kurması, Frontend tarafında ise monorepo geçişinin hatasız atlatılması ekibe büyük bir özgüven kazandırmıştır. Video sunumunun aradan çıkması da zaman yönetimi açısından takımı rahatlatmıştır.
    * **Gelişime Açık Alanlar/Aksiyonlar:** Faz 2 (API entegrasyonu) henüz başlamadığı için bir sonraki aşamada Axios/Fetch yapılandırmaları, CORS ayarları ve asenkron veri yönetimi (state management) konularında frontend ve backend ekiplerinin daha sıkı bir ikili çalışma yürütmesi kararlaştırılmıştır.

</details>
---
