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
    [Sprint 1 Daily Scrum Sohbet Kanıtları](sprint1-scrum-gorsel-linki)

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
  
  *(Sprint 2 bittiğinde detaylar buraya eklenecektir...)*
  
</details>

---

<details>
  <summary><h2>Sprint 3</h2></summary>
  
  *(Sprint 3 bittiğinde detaylar buraya eklenecektir...)*
  
</details>
