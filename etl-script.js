const { sequelize, Customer } = require('./src/models');

// SENARYODAKİ BOZUK EXCEL VERİLERİ (Birebir kopyalandı)
const rawData = [
    { ad: "Ahmet", soyad: "Yılmaz", tel: "+90 532 111 22 33", email: "ahmet.yilmaz@mail.com", adres: "İstanbul, Kadıköy", not: "" },
    { ad: "Mehmet Ali", soyad: "", tel: "05321112233", email: "", adres: "Ankara", not: "Soyadı yok" },
    { ad: "Ayşe", soyad: "KARA", tel: "5321112233", email: "ayse.kara@mail", adres: "", not: "Email hatalı" }, // Hatalı email
    { ad: "Hasan", soyad: "Demir", tel: "+90532 1112233", email: "hasan.demir@mail.com", adres: "İzmir", not: "" },
    { ad: "Hakan A.", soyad: "Çelik", tel: "905321112233", email: "hakan.celik@gmail.com", adres: "İstanbul", not: "" },
    { ad: "Fatma Nur", soyad: "Yilmaz", tel: "0 532 111 22 33", email: "", adres: "Adana", not: "Duplicate olabilir" },
    { ad: "Ali", soyad: "Öztürk", tel: "+90 555 444 3322", email: "", adres: "", not: "Email yok" },
    { ad: "\"Merve\"", soyad: "Kaya", tel: "0532-111-22-33", email: "mervekaya@mail.com", adres: "Manisa", not: "Ad alanında tırnak var" }, // Tırnaklı isim
    { ad: "Esra", soyad: "Arslan", tel: "+90-532-111-22-33", email: "esra_arslanmail.com", adres: "Antalya", not: "@eksik" } // Bozuk email
];

async function runETL() {
    console.log('🔄 ETL İşlemi Başlıyor (Veri Temizleme ve Aktarım)...\n');
    
    try {
        await sequelize.authenticate();
        
        let eklenen = 0;
        let atlanan = 0;

        for (const row of rawData) {
            // 1. TEMİZLİK: İsimdeki tırnak işaretlerini temizle
            const cleanName = row.ad ? row.ad.replace(/"/g, '') : 'Bilinmiyor';

            // 2. TEMİZLİK: Telefon numarasını sadece rakam yap
            // (Hoca "Ben karışmıyorum siz halledin" demişti)
            const cleanPhone = row.tel ? row.tel.replace(/[^0-9]/g, '') : null;

            // 3. KONTROL: Email geçerli mi?
            if (!row.email || !row.email.includes('@') || !row.email.includes('.')) {
                console.log(`⚠️  ATLANDI (Geçersiz Email): ${cleanName} ${row.soyad} - Sebep: ${row.not || 'Format hatalı'}`);
                atlanan++;
                continue; 
            }

            // 4. KONTROL: Mükerrer kayıt (Duplicate) kontrolü
            const existing = await Customer.findOne({ where: { email: row.email } });
            if (existing) {
                console.log(`⚠️  ATLANDI (Zaten Var): ${cleanName} ${row.soyad} - Email: ${row.email}`);
                atlanan++;
                continue;
            }

            // VERİYİ KAYDET
            await Customer.create({
                firstName: cleanName,
                lastName: row.soyad || 'Belirtilmedi', // Soyad yoksa doldur
                phone: cleanPhone,
                email: row.email,
                address: row.adres,
                isActive: true
            });

            console.log(`✅ EKLENDİ: ${cleanName} ${row.soyad}`);
            eklenen++;
        }

        console.log('\n------------------------------------------------');
        console.log(`📊 SONUÇ RAPORU:`);
        console.log(`✅ Başarıyla Eklenen: ${eklenen}`);
        console.log(`❌ Hatalı/Atlanan : ${atlanan}`);
        console.log('------------------------------------------------');

        process.exit(0);
    } catch (error) {
        console.error('BÜYÜK HATA:', error);
        process.exit(1);
    }
}

runETL();