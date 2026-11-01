// Edremit HEM Bilgisayar İşletmenliği Kursu - Bölüm & Modül Listesi
const COURSE_MODULES = [
    {
        id: 1,
        slug: "fare-uygulamasi",
        title: "1. Fare Uygulaması",
        category: "Temel Beceriler",
        categoryColor: "#ec4899", // Pembe
        menuPosition: "left",
        path: "html/fare_klavye/fare_oyunu.html",
        icon: "🖱️",
        description: "Sol ve sağ tık, sürükle-bırak ve sayı yakalama pratikleri."
    },
    {
        id: 2,
        slug: "klavye-uygulamasi",
        title: "2. Klavye Uygulaması",
        category: "Temel Beceriler",
        categoryColor: "#3b82f6", // Mavi
        menuPosition: "left",
        path: "html/fare_klavye/klavye oyunu.html",
        icon: "⌨️",
        description: "Hızlı ve doğru yazma, harf ve sembol çalışmaları."
    },
    {
        id: 3,
        slug: "eslestirme-uygulamasi",
        title: "3. Eşleştirme Uygulaması",
        category: "Temel Beceriler",
        categoryColor: "#ec4899",
        menuPosition: "left",
        path: "html/fare_klavye/eslestir/ogrenci/1.tur.html",
        icon: "🧩",
        description: "Görsel hafıza ve fare hakimiyeti eşleştirme oyunu."
    },
    {
        id: 4,
        slug: "yon-tusu-uygulamasi",
        title: "4. Yön Tuşu Uygulaması",
        category: "Klavye Becerileri",
        categoryColor: "#3b82f6",
        menuPosition: "left",
        path: "html/giris/yon.html",
        icon: "🎮",
        description: "Yön tuşları ile engelleri aşma ve labirent görevi."
    },
    {
        id: 5,
        slug: "topu-dusurme-oyunu",
        title: "5. Topu Düşürme Oyunu",
        category: "Temel Beceriler",
        categoryColor: "#ec4899",
        menuPosition: "left",
        path: "html/topudusurme/index.html",
        icon: "⚪",
        description: "Refleks ve fare koordinasyon geliştirme oyunu."
    },
    {
        id: 6,
        slug: "silme-tusu-uygulamasi",
        title: "6. Silme Tuşu Uygulaması",
        category: "Klavye Becerileri",
        categoryColor: "#3b82f6",
        menuPosition: "left",
        path: "html/giris/sil.html",
        icon: "⌫",
        description: "Backspace ve Delete tuşları arasındaki farklar ve uygulama."
    },
    {
        id: 7,
        slug: "simgeleri-tanima",
        title: "7. Simgeleri Tanıma",
        category: "Windows & İşletim Sistemi",
        categoryColor: "#ec4899",
        menuPosition: "left",
        path: "html/uzantilar/sinav.html",
        icon: "🖼️",
        description: "Dosya uzantıları ve sistem simgelerini tanıma testi."
    },
    {
        id: 8,
        slug: "geri-donusum-kutusu",
        title: "8. Geri Dönüşüm Kutusu",
        category: "Windows & İşletim Sistemi",
        categoryColor: "#3b82f6",
        menuPosition: "left",
        path: "html/giris/gdk.html",
        icon: "🗑️",
        description: "Dosya silme, geri yükleme ve kalıcı silme kuralları."
    },
    {
        id: 9,
        slug: "kes-kopyala-yapistir",
        title: "9. Kes - Kopyala - Yapıştır",
        category: "Windows & İşletim Sistemi",
        categoryColor: "#ec4899",
        menuPosition: "left",
        path: "html/giris/kopyala.html",
        icon: "📋",
        description: "Ctrl+C, Ctrl+X, Ctrl+V klavye kısayolları ve dosya yönetimi."
    },
    {
        id: 10,
        slug: "sistem-kurma-uygulamasi",
        title: "10. Sistem Kurma Uygulaması",
        category: "Donanım & Sistem",
        categoryColor: "#3b82f6",
        menuPosition: "left",
        path: "html/giris/sistem.html",
        icon: "💻",
        description: "Bilgisayar bileşenleri ve işletim sistemi kurulum simülasyonu."
    },
    {
        id: 11,
        slug: "donanim-bilgisi",
        title: "11. Donanım Bilgisi",
        category: "Donanım & Sistem",
        categoryColor: "#ec4899",
        menuPosition: "left",
        path: "html/kur/index.html",
        icon: "🖥️",
        description: "İç ve dış donanım birimleri, anakart, RAM, işlemci detayları."
    },
    {
        id: 12,
        slug: "bakim-islemi-uygulamasi",
        title: "12. Bakım İşlemi Uygulaması",
        category: "Donanım & Sistem",
        categoryColor: "#ec4899",
        menuPosition: "left",
        path: "html/bakim/sinav.html",
        icon: "🛠️",
        description: "Disk birleştirme, disk temizleme ve bilgisayar bakım adımları."
    },
    {
        id: 13,
        slug: "bilgisayari-tanima",
        title: "13. Bilgisayarı Tanıma",
        category: "Donanım & Sistem",
        categoryColor: "#3b82f6",
        menuPosition: "right",
        path: "html/bilgisayarinizi_taniyormusunuz/sinav.html",
        icon: "🧠",
        description: "Temel bilgisayar kavramları ve donanım tanıma testi."
    },
    {
        id: 14,
        slug: "deneme-sinavi-1",
        title: "Deneme Sınavı - 1",
        category: "Modül Sınavları",
        categoryColor: "#ef4444", // Kırmızı
        menuPosition: "right",
        path: "html/sinav/modul1.html",
        icon: "📝",
        description: "1. Modül genel değerlendirme ve pekiştirme sınavı."
    },
    {
        id: 15,
        slug: "internete-giris",
        title: "14. İnternete Giriş",
        category: "İnternet & Ağ",
        categoryColor: "#3b82f6",
        menuPosition: "right",
        path: "html/internet/internet.html",
        icon: "🌐",
        description: "Tarayıcılar, arama motorları, e-posta ve web güvenliği."
    },
    {
        id: 16,
        slug: "deneme-sinavi-2",
        title: "Deneme Sınavı - 2",
        category: "Modül Sınavları",
        categoryColor: "#ef4444",
        menuPosition: "right",
        path: "html/sinav/modul2.html",
        icon: "📝",
        description: "İnternet ve ağ modülü değerlendirme sınavı."
    },
    {
        id: 17,
        slug: "word-programi-ekrani",
        title: "15. Word Programı Ekranı",
        category: "Microsoft Word",
        categoryColor: "#3b82f6",
        menuPosition: "right",
        path: "html/word/word_ekrani.html",
        icon: "📄",
        description: "Word arayüzü, şerit menü, araç çubukları ve sayfa düzeni."
    },
    {
        id: 18,
        slug: "deneme-sinavi-3",
        title: "Deneme Sınavı - 3",
        category: "Modül Sınavları",
        categoryColor: "#ef4444",
        menuPosition: "right",
        path: "html/sinav/modul3/modul3.html",
        icon: "📝",
        description: "Kelime işlemci (Word) modülü teorik deneme sınavı."
    },
    {
        id: 19,
        slug: "word-gorsel-sinavi",
        title: "Word Görsel Sınavı",
        category: "Microsoft Word",
        categoryColor: "#ef4444",
        menuPosition: "right",
        path: "html/word/word_gorsel/etkilesimli_sinav.html",
        icon: "👁️",
        description: "Word simgeleri ve menü elemanlarını etkileşimli bulma sınavı."
    },
    {
        id: 20,
        slug: "excel-e-giris",
        title: "16. Excel'e Giriş",
        category: "Microsoft Excel",
        categoryColor: "#10b981", // Yeşil
        menuPosition: "right",
        path: "html/excel/excelgiris.html",
        icon: "📊",
        description: "Hücreler, satırlar, sütunlar, formüller ve temel tablolar."
    },
    {
        id: 21,
        slug: "excel-gorsel-sinavi",
        title: "Excel Görsel Sınavı",
        category: "Microsoft Excel",
        categoryColor: "#ef4444",
        menuPosition: "right",
        path: "html/excel/excel_gorsel/excel_gorsel.html",
        icon: "👁️",
        description: "Excel formülleri ve araç çubuğu öğeleri görsel testi."
    },
    {
        id: 22,
        slug: "excel-cozumlu-sorulari",
        title: "Excel Çözümlü Soruları",
        category: "Microsoft Excel",
        categoryColor: "#ef4444",
        menuPosition: "right",
        path: "html/excel/excel_cozumlu/cozumlu.html",
        icon: "💡",
        description: "Excel formül mantığı ve açıklamalı örnek sorular."
    },
    {
        id: 23,
        slug: "excel-dogru-yanlis-testi",
        title: "Excel Doğru - Yanlış Testi",
        category: "Microsoft Excel",
        categoryColor: "#ef4444",
        menuPosition: "right",
        path: "html/excel/D_Y_excel/dogru_yanlis.html",
        icon: "⚖️",
        description: "Excel çalışma kuralları doğru-yanlış pekiştirme sınavı."
    },
    {
        id: 24,
        slug: "deneme-sinavi-4",
        title: "Deneme Sınavı - 4",
        category: "Modül Sınavları",
        categoryColor: "#ef4444",
        menuPosition: "right",
        path: "html/excel/excel_email/excel_email_test.html",
        icon: "📝",
        description: "Excel ve E-posta kapsamlı modül değerlendirme sınavı."
    },
    {
        id: 25,
        slug: "powerpoint-e-giris",
        title: "PowerPoint'e Giriş",
        category: "Microsoft PowerPoint",
        categoryColor: "#f59e0b", // Amber
        menuPosition: "right",
        path: "html/ppt/Tur_1.html",
        icon: "📽️",
        description: "Sunum hazırlama, slayt geçişleri ve animasyonlara giriş."
    },
    {
        id: 26,
        slug: "deneme-sinavi-5",
        title: "Deneme Sınavı - 5",
        category: "Modül Sınavları",
        categoryColor: "#ef4444",
        menuPosition: "right",
        path: "html/ppt/powerpoint.html",
        icon: "🏆",
        description: "PowerPoint ve Kurs Sonu Genel Bitirme Deneme Sınavı."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { COURSE_MODULES };
}
