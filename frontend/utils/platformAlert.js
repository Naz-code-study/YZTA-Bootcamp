// utils/platformAlert.js
// MoodTaste AI - Platforma Duyarlı Alert Yardımcısı
//
// SORUN: react-native-web'in Alert.alert() implementasyonu birçok sürümde web'de
// SESSİZCE HİÇBİR ŞEY YAPMAZ (no-op) — ne görsel bir çıktı, ne konsol uyarısı.
// Bu proje boyunca yaşanan "buton basılıyor ama hiçbir şey olmuyor, hata da
// görünmüyor" sorunlarının kök nedeni büyük ihtimalle budur: kod aslında hatayı
// doğru yakalıyor ve Alert.alert()'i çağırıyor, ama web'de bu çağrı hiçbir şey
// üretmiyor.
//
// ÇÖZÜM: Web'de doğrudan window.alert() kullan (garantili görünür), native'de
// gerçek Alert.alert() kullan. Projedeki TÜM Alert.alert(title, message) çağrıları
// bundan sonra bu fonksiyon üzerinden yapılmalı.

import { Alert, Platform } from 'react-native';

export function showAlert(title, message) {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
  // Web'de görünür olsun olmasın, HER durumda konsola da yazalım — DevTools
  // Console'dan da takip edilebilsin diye.
  console.log(`[Alert] ${title}: ${message}`);
}