# Dokumentasi Entity Relationship Diagram (ERD) - DonateYours

Dokumen ini berisi dokumentasi lengkap **Entity Relationship Diagram (ERD)** untuk sistem aplikasi **DonateYours** menggunakan **Notasi Peter Chen (*Chen Notation*)**.

File diagram draw.io dapat diakses pada: [docs/erd.drawio](erd.drawio).

---

## 1. Simbol & Notasi Chen yang Digunakan

| Simbol Notasi Chen | Elemen | Keterangan dalam DonateYours |
| :--- | :--- | :--- |
| **Persegi Panjang Tunggal** | **Entitas Kuat (*Strong Entity*)** | Entitas independen yang memiliki primary key sendiri (USER, DONATION, CATEGORY, DONATION_REQUEST, DONATION_HISTORY, CONVERSATION, NOTIFICATION, ACTIVITY_LOG). |
| **Persegi Panjang Ganda** | **Entitas Lemah (*Weak Entity*)** | Entitas yang keberadaannya bergantung pada entitas lain (RECIPIENT_PROFILE, DONATION_IMAGE, REQUEST_LOG, CONVERSATION_PARTICIPANT, MESSAGE, PASSKEY). |
| **Belah Ketupat (*Rhombus*)** | **Relasi (*Relationship*)** | Hubungan asosiasi antar entitas kuat (contoh: *Membuat Donasi*, *Mengkategorikan*, *Mengajukan*). |
| **Belah Ketupat Ganda** | **Relasi Identifikasi (*Identifying Rel*)** | Hubungan antara entitas kuat dengan entitas lemah (contoh: *Memiliki Foto*, *Memiliki Log*, *Memuat Pesan*). |
| **Elips Bergaris Bawah** | **Atribut Kunci (*Primary Key*)** | Kunci utama unik setiap entitas (<u>id</u>). |
| **Elips Biasa** | **Atribut (*Simple Attribute*)** | Atribut deskriptif entitas (contoh: 
ame, 	itle, status, dll.). |
| **Label Garis Relasi** | **Kardinalitas / Multiplicity** | Derajat hubungan (1 : 1, 1 : N, M : N). |

---

## 2. Struktur Halaman pada docs/erd.drawio

File docs/erd.drawio tersusun dalam **4 Halaman (*Multi-Page Diagram*)** yang terstruktur rapi:

1. **Halaman 1: 1. ERD Chen - Sistem Lengkap**
   - Diagram menyeluruh (*full system*) memuat **14 Entitas**, **17 Relasi**, dan **seluruh atribut** yang terhubung secara radial/kolom tanpa tumpang tindih (*zero-overlap*).
2. **Halaman 2: 2. ERD Chen - Konseptual Ringkas**
   - Diagram level tinggi (*high-level architectural view*) yang menampilkan seluruh entitas, relasi, kardinalitas, dan *Primary Key* untuk presentasi atau ikhtisar arsitektur.
3. **Halaman 3: 3. Sub-Sistem Donasi & Pengajuan**
   - Fokus mendalam pada siklus hidup donasi: USER (Donor & Penerima), RECIPIENT_PROFILE, CATEGORY, DONATION, DONATION_IMAGE, DONATION_REQUEST, REQUEST_LOG, DONATION_HISTORY.
4. **Halaman 4: 4. Sub-Sistem Chat & Notifikasi**
   - Fokus mendalam pada modul komunikasi & pencatatan: USER, PASSKEY, CONVERSATION, CONVERSATION_PARTICIPANT, MESSAGE, NOTIFICATION, ACTIVITY_LOG.

---

## 3. Kamus Data Entitas & Atribut (Data Dictionary)

### 3.1. Entitas USER (users)
Entitas utama pengguna sistem yang dapat berperan sebagai Admin, Donor, atau Penerima (*Recipient*).

- <u>id</u> *(PK, BigInt)*: Identifikator unik pengguna.
- 
ame *(Varchar)*: Nama lengkap pengguna.
- email *(Varchar, Unique)*: Alamat surel pengguna.
- phone *(Varchar, Nullable)*: Nomor telepon pengguna.
- vatar *(Varchar, Nullable)*: Path URL/file avatar profil pengguna.
- 
ole *(Enum: 'admin', 'donor', 'recipient')*: Peran hak akses pengguna.
- password *(Varchar)*: Hash kata sandi pengguna.
- email_verified_at *(Timestamp, Nullable)*: Waktu verifikasi email.
- 
emember_token *(Varchar, Nullable)*: Token sesi login.
- 	wo_factor_secret *(Text, Nullable)*: Kunci rahasia 2FA.
- 	wo_factor_recovery_codes *(Text, Nullable)*: Kode pemulihan 2FA.
- 	wo_factor_confirmed_at *(Timestamp, Nullable)*: Waktu konfirmasi aktivasi 2FA.
- created_at & updated_at *(Timestamp)*: Waktu pembuatan & pembaruan data.

### 3.2. Entitas RECIPIENT_PROFILE (
ecipient_profiles)
Profil tambahan untuk pengguna bertipe *Recipient* (organisasi/yayasan/penerima manfaat).

- <u>id</u> *(PK, BigInt)*: Identifikator profil penerima.
- organization_name *(Varchar, Nullable)*: Nama organisasi/lembaga pemohon.
- ddress *(Text, Nullable)*: Alamat lengkap domisili/organisasi.
- city *(Varchar, Nullable)*: Kota/Kabupaten.
- province *(Varchar, Nullable)*: Provinsi.
- description *(Text, Nullable)*: Deskripsi profil/latar belakang organisasi.
- photo *(Varchar, Nullable)*: Foto organisasi/dokumen pendukung.
- created_at & updated_at *(Timestamp)*

### 3.3. Entitas CATEGORY (categories)
Kategori barang donasi (contoh: Pakaian, Elektronik, Buku, Makanan).

- <u>id</u> *(PK, BigInt)*: Identifikator kategori.
- 
ame *(Varchar)*: Nama kategori barang.
- icon *(Varchar, Nullable)*: Nama icon atau path gambar icon kategori.
- created_at & updated_at *(Timestamp)*

### 3.4. Entitas DONATION (donations)
Informasi barang yang didonasikan oleh *Donor*.

- <u>id</u> *(PK, BigInt)*: Identifikator donasi.
- 	itle *(Varchar)*: Judul barang yang didonasikan.
- description *(Text)*: Deskripsi detail kondisi dan spesifikasi barang.
- condition *(Enum: 'new', 'very_good', 'good', 'fair', 'damaged')*: Kondisi fisik barang.
- quantity *(Integer)*: Jumlah unit barang.
- pickup_address *(Text)*: Alamat pengambilan barang.
- city *(Varchar)*: Kota lokasi pengambilan.
- province *(Varchar)*: Provinsi lokasi pengambilan.
- status *(Enum: 'draft', 'published', 'requested', 'approved', 'rejected', 'picked_up', 'completed', 'cancelled')*: Status alur donasi.
- published_at *(Timestamp, Nullable)*: Waktu publikasi donasi.
- completed_at *(Timestamp, Nullable)*: Waktu penyelesaian serah terima donasi.
- created_at & updated_at *(Timestamp)*

### 3.5. Entitas DONATION_IMAGE (donation_images)
Foto dokumentasi barang donasi.

- <u>id</u> *(PK, BigInt)*: Identifikator foto.
- image *(Varchar)*: Path file gambar donasi.
- is_primary *(Boolean)*: Penanda apakah foto ini menjadi thumbnail utama.
- created_at & updated_at *(Timestamp)*

### 3.6. Entitas DONATION_REQUEST (donation_requests)
Pengajuan/permohonan dari *Recipient* untuk menerima donasi tertentu.

- <u>id</u> *(PK, BigInt)*: Identifikator pengajuan.
- message *(Text, Nullable)*: Pesan / alasan permohonan donasi.
- status *(Enum: 'pending', 'approved', 'rejected', 'cancelled', 'completed')*: Status pengajuan.
- 
equested_at *(Timestamp, Nullable)*: Waktu permohonan diajukan.
- pproved_at *(Timestamp, Nullable)*: Waktu permohonan disetujui donor.
- 
ejected_at *(Timestamp, Nullable)*: Waktu permohonan ditolak.
- created_at & updated_at *(Timestamp)*

### 3.7. Entitas REQUEST_LOG (
equest_logs)
Log audit jejak perubahan status pengajuan donasi.

- <u>id</u> *(PK, BigInt)*: Identifikator log.
- status *(Varchar)*: Status yang dicatat pada saat perubahan.
- 
otes *(Text, Nullable)*: Catatan tambahan perubahan status.
- created_at & updated_at *(Timestamp)*

### 3.8. Entitas DONATION_HISTORY (donation_histories)
Arsip riwayat resmi serah terima donasi yang telah sukses diselesaikan.

- <u>id</u> *(PK, BigInt)*: Identifikator riwayat.
- 
otes *(Text, Nullable)*: Catatan penyelesaian serah terima donasi.
- completed_at *(Timestamp)*: Waktu penyelesaian resmi.
- created_at & updated_at *(Timestamp)*

### 3.9. Entitas CONVERSATION (conversations)
Wadah percakapan pesan langsung antara pengguna.

- <u>id</u> *(PK, BigInt)*: Identifikator percakapan.
- 	ype *(Enum: 'donor_recipient', 'donor_admin', 'recipient_admin', 'general')*: Jenis percakapan.
- last_message_at *(Timestamp, Nullable)*: Waktu pesan terakhir terkirim.
- created_at & updated_at *(Timestamp)*

### 3.10. Entitas CONVERSATION_PARTICIPANT (conversation_participants)
Anggota/partisipan yang terlibat dalam suatu percakapan.

- <u>id</u> *(PK, BigInt)*: Identifikator partisipasi.
- last_read_at *(Timestamp, Nullable)*: Waktu terakhir membuka/membaca pesan.
- created_at & updated_at *(Timestamp)*

### 3.11. Entitas MESSAGE (messages)
Pesan individual yang dikirim dalam suatu percakapan.

- <u>id</u> *(PK, BigInt)*: Identifikator pesan.
- message *(Text)*: Isi teks pesan.
- 
ead_at *(Timestamp, Nullable)*: Waktu pesan dibaca oleh penerima.
- created_at & updated_at *(Timestamp)*

### 3.12. Entitas NOTIFICATION (
otifications)
Notifikasi sistem untuk pengguna.

- <u>id</u> *(PK, BigInt)*: Identifikator notifikasi.
- 	itle *(Varchar)*: Judul notifikasi.
- message *(Text)*: Isi pesan notifikasi.
- is_read *(Boolean)*: Status apakah notifikasi telah dibaca.
- created_at & updated_at *(Timestamp)*

### 3.13. Entitas ACTIVITY_LOG (ctivity_logs)
Catatan jejak aktivitas umum dalam sistem untuk audit keamanan dan operasional.

- <u>id</u> *(PK, BigInt)*: Identifikator log aktivitas.
- ction *(Varchar)*: Jenis aksi (misal: 'login', 'create', 'update', 'delete').
- 	able_name *(Varchar)*: Nama tabel terkait.
- 
ecord_id *(BigInt, Nullable)*: ID baris data yang terpengaruh.
- description *(Text, Nullable)*: Rincian aksi.
- created_at & updated_at *(Timestamp)*

### 3.14. Entitas PASSKEY (passkeys)
Kredensial login biometrik / WebAuthn passkey milik pengguna.

- <u>id</u> *(PK, BigInt)*: Identifikator passkey.
- 
ame *(Varchar)*: Nama perangkat / label passkey.
- credential_id *(Varchar, Unique)*: ID kredensial WebAuthn.
- credential *(JSON)*: Data payload publik WebAuthn.
- last_used_at *(Timestamp, Nullable)*: Terakhir kali digunakan untuk autentikasi.
- created_at & updated_at *(Timestamp)*

---

## 4. Matriks Relasi & Kardinalitas (Chen Notation)

| Entitas 1 | Kardinalitas 1 | Relasi (*Diamond*) | Kardinalitas 2 | Entitas 2 | Deskripsi Aturan Bisnis |
| :--- | :---: | :--- | :---: | :--- | :--- |
| USER | 1 | **Memiliki Profil** | 1 | RECIPIENT_PROFILE | Satu user recipient memiliki tepat satu profil organisasi (1:1). |
| USER | 1 | **Membuat Donasi** | N | DONATION | Satu donor dapat membuat banyak postingan donasi (1:N). |
| CATEGORY | 1 | **Mengkategorikan** | N | DONATION | Satu kategori mengelompokkan banyak barang donasi (1:N). |
| DONATION | 1 | **Memiliki Foto** | N | DONATION_IMAGE | Satu posting donasi dapat memiliki banyak foto dokumentasi (1:N). |
| USER | 1 | **Mengajukan** | N | DONATION_REQUEST | Satu user recipient dapat mengajukan banyak permohonan donasi (1:N). |
| DONATION | 1 | **Menerima Pengajuan**| N | DONATION_REQUEST | Satu barang donasi dapat diajukan oleh beberapa penerima (1:N). |
| DONATION_REQUEST| 1 | **Memiliki Log** | N | REQUEST_LOG | Satu permohonan donasi memiliki riwayat log status (1:N). |
| USER | 1 | **Membuat Log Req** | N | REQUEST_LOG | User (donor/admin/recipient) menjadi aktor pencatat log status (1:N). |
| DONATION_REQUEST| 1 | **Terselesaikan Di** | 1 | DONATION_HISTORY | Satu pengajuan yang disetujui dicatat pada satu riwayat penyelesaian (1:1). |
| USER | 1 | **Menerima Notifikasi**| N | NOTIFICATION | Satu user menerima banyak notifikasi dari sistem (1:N). |
| USER | 1 | **Mencatat Aktivitas**| N | ACTIVITY_LOG | Setiap aktivitas user dicatat dalam activity log (1:N). |
| USER | 1 | **Memiliki Passkey** | N | PASSKEY | Satu user dapat mendaftarkan beberapa perangkat passkey (1:N). |
| DONATION | 1 | **Terkait Donasi** | N | CONVERSATION | Percakapan chat dapat dikaitkan dengan barang donasi tertentu (1:N). |
| CONVERSATION | 1 | **Memiliki Partisipan**| N | CONVERSATION_PARTICIPANT| Suatu sesi chat memiliki banyak partisipan (1:N). |
| USER | 1 | **Bergabung Chat** | N | CONVERSATION_PARTICIPANT| Seorang user dapat bergabung ke dalam banyak sesi percakapan (1:N). |
| CONVERSATION | 1 | **Memuat Pesan** | N | MESSAGE | Suatu percakapan berisi banyak pesan teks (1:N). |
| USER | 1 | **Mengirim Pesan** | N | MESSAGE | Seorang user dapat mengirimkan banyak pesan dalam percakapan (1:N). |

---

## 5. Cara Membuka & Mengedit File erd.drawio

File [erd.drawio](erd.drawio) adalah file standar diagram berbasis XML yang kompatibel dengan:

1. **Browser / Web**:
   - Buka [app.diagrams.net](https://app.diagrams.net/)
   - Pilih menu File > Open From > Device...
   - Pilih file donet/docs/erd.drawio
2. **Aplikasi Desktop Draw.io**:
   - Buka aplikasi **Draw.io Desktop**
   - Buka file docs/erd.drawio
3. **VS Code Extensions**:
   - Pasang ekstensi **Draw.io Integration** (oleh *Henning Dieterichs*)
   - Klik langsung file docs/erd.drawio di VS Code explorer untuk membuka editor visual interaktif.
4. **Navigasi Halaman**:
   - Gunakan tab di bagian bawah layar Draw.io untuk berpindah antara:
     - 1. ERD Chen - Sistem Lengkap
     - 2. ERD Chen - Konseptual Ringkas
     - 3. Sub-Sistem Donasi & Pengajuan
     - 4. Sub-Sistem Chat & Notifikasi
