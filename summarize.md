# Ringkasan Sistem DonateYours

## Tujuan

DonateYours adalah platform donasi barang yang mempertemukan **donatur** dengan **penerima**. Donatur dapat mempublikasikan barang layak pakai; penerima dapat mencari, mengajukan permintaan, lalu berkomunikasi dengan donatur setelah permintaan disetujui.

## Pengguna dan Hak Akses

| Peran | Kemampuan utama |
| --- | --- |
| Pengunjung | Melihat beranda, cara kerja, tentang kami, serta mencari barang publik. |
| Donatur | Mengelola donasi, meninjau permintaan masuk, menyetujui/menolak permintaan, mengobrol, memperbarui status transaksi, melihat riwayat. |
| Penerima | Menjelajah barang, mengajukan atau membatalkan permintaan, mengobrol setelah disetujui, melihat notifikasi dan riwayat. |

Pendaftaran mewajibkan nama, email, nomor telepon, kata sandi, persetujuan syarat, serta peran `donor` atau `recipient`.

## Fitur Utama

### Autentikasi dan Akun

- Registrasi, masuk, lupa/reset kata sandi, verifikasi email, dan konfirmasi kata sandi.
- Pengaturan profil, avatar, kata sandi, tampilan, passkey, serta autentikasi dua faktor.
- Halaman sistem utama dilindungi autentikasi dan verifikasi email.

### Donasi Barang

- Donatur membuat, mengubah, melihat, dan menghapus donasi miliknya.
- Data donasi: judul, kategori, deskripsi, kondisi, kuantitas, alamat pengambilan, kota, provinsi, status, serta gambar.
- Kondisi barang: `new`, `very_good`, `good`, `fair`, atau `damaged`.
- Gambar divalidasi sebagai gambar maksimal 2 MB per berkas dan disimpan pada disk publik di `storage/app/public/donations`.
- Donasi dapat berstatus draft, terpublikasi, selesai, dibatalkan, dan status proses lain yang tersedia pada basis data.

### Pencarian dan Eksplorasi

- Barang terpublikasi dapat dicari berdasarkan judul.
- Filter kategori dan kondisi barang.
- Urutkan terbaru atau terlama.
- Pagination 12 barang per halaman.
- Halaman pencarian publik tersedia tanpa login; eksplorasi detail dan pengajuan permintaan memerlukan akun terverifikasi.

### Permintaan Donasi

- Hanya penerima dapat mengajukan permintaan terhadap donasi terpublikasi.
- Satu penerima hanya dapat memiliki satu permintaan per barang.
- Pesan pengajuan bersifat opsional, maksimal 500 karakter.
- Penerima dapat membatalkan permintaan berstatus `pending`.
- Donatur dapat menyetujui atau menolak permintaan milik donasinya.
- Persetujuan mengurangi kuantitas barang; donasi ditandai `completed` saat stok habis.

### Percakapan dan Notifikasi

- Persetujuan permintaan otomatis membuat percakapan antara donatur dan penerima.
- Peserta dapat mengirim pesan hingga 1.000 karakter.
- Donatur dapat menandai transaksi yang disetujui sebagai `completed`, `rejected`, atau `cancelled`.
- Sistem membuat notifikasi ketika permintaan disetujui, ditolak, atau status transaksi diperbarui.
- Membuka daftar notifikasi menandai notifikasi pengguna sebagai telah dibaca.

### Dashboard dan Riwayat

- Dashboard berbeda per peran.
- Donatur melihat jumlah donasi, permintaan menunggu, transaksi aktif, donasi selesai, serta donasi terbaru.
- Penerima melihat jumlah permintaan, permintaan disetujui, selesai, ditolak/batal, serta permintaan terbaru.
- Riwayat terpisah untuk donatur dan penerima.

## Alur Bisnis Utama

1. Pengguna mendaftar sebagai donatur atau penerima, lalu memverifikasi email.
2. Donatur membuat dan mempublikasikan barang beserta gambar dan lokasi pengambilan.
3. Penerima mencari barang lalu mengajukan permintaan.
4. Donatur meninjau permintaan dan menyetujui atau menolak.
5. Jika disetujui, stok berkurang, penerima memperoleh notifikasi, dan percakapan dibuat.
6. Kedua pihak membahas pengambilan melalui percakapan.
7. Donatur memperbarui status transaksi; kedua peran dapat melihat riwayatnya.

## Arsitektur dan Teknologi

| Lapisan | Teknologi |
| --- | --- |
| Backend | PHP 8.3, Laravel 13 |
| Frontend | React 19, TypeScript, Inertia.js 3 |
| UI | Tailwind CSS 4, Radix UI, Lucide |
| Build tool | Vite 8 |
| Autentikasi | Laravel Fortify, passkey, two-factor authentication |
| Basis data | Laravel Eloquent dan migration |
| Pengujian | PHPUnit |
| Kualitas kode | Laravel Pint, PHPStan/Larastan, ESLint, Prettier, TypeScript |
| Container | Docker dengan Nginx dan Supervisor |

Aplikasi menggunakan pola server-driven SPA: Laravel menangani rute, otorisasi, validasi, dan data; Inertia mengirim halaman React tanpa membangun REST API terpisah.

## Struktur Data Inti

| Entitas | Peran |
| --- | --- |
| `users` | Akun pengguna, peran, nomor telepon, avatar, dan kredensial keamanan. |
| `categories` | Kategori barang donasi. |
| `donations` | Barang yang didonasikan dan informasi pengambilannya. |
| `donation_images` | Gambar milik donasi. |
| `donation_requests` | Pengajuan penerima terhadap barang. |
| `conversations` | Ruang percakapan untuk permintaan yang disetujui. |
| `conversation_participants` | Relasi pengguna dengan percakapan. |
| `messages` | Pesan dalam percakapan. |
| `notifications` | Notifikasi internal pengguna. |
| `donation_histories`, `request_logs`, `activity_logs` | Data pendukung histori dan pencatatan aktivitas. |

Relasi utama: pengguna memiliki donasi; donasi memiliki gambar dan permintaan; permintaan menghubungkan donasi dengan penerima; permintaan disetujui memiliki percakapan dan pesan.

## Rute Penting

| Area | Rute |
| --- | --- |
| Publik | `/`, `/cara-kerja`, `/tentang-kami`, `/cari-barang` |
| Dashboard | `/dashboard` |
| Donasi | `/donations` |
| Eksplorasi | `/explore`, `/explore/{id}` |
| Permintaan penerima | `/requests` |
| Permintaan masuk donatur | `/notifications` |
| Pesan | `/chats` |
| Notifikasi pengguna | `/user-notifications` |
| Riwayat | `/donor-history`, `/recipient-history` |
| Pengaturan | `/settings/profile`, `/settings/security`, `/settings/appearance` |

## Menjalankan Proyek

```bash
composer setup
composer dev
```

Perintah `composer setup` memasang dependensi, menyiapkan `.env`, membuat application key, menjalankan migrasi, memasang dependensi frontend, dan membangun aset.

## Pemeriksaan Kualitas

```bash
npm run lint:check
npm run format:check
npm run types:check
composer lint:check
composer types:check
composer test
```

## Lokasi Implementasi Utama

- Rute aplikasi: `routes/web.php`
- Rute pengaturan: `routes/settings.php`
- Logika donasi: `app/Http/Controllers/DonationController.php`
- Pencarian dan permintaan: `app/Http/Controllers/ExploreController.php`
- Persetujuan/penolakan: `app/Http/Controllers/IncomingRequestController.php`
- Percakapan: `app/Http/Controllers/ChatController.php`
- Halaman frontend: `resources/js/pages/`
- Model domain: `app/Models/`
- Skema basis data: `database/migrations/`
