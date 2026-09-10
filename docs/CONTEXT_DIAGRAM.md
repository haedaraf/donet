# Dokumentasi Context Diagram (DFD Level 0) - DonateYours

Dokumen ini berisi penjelasan detail dan spesifikasi **Diagram Konteks (*Context Diagram* / DFD Level 0)** untuk sistem aplikasi **DonateYours** (Sistem Informasi Donasi Barang Bekas Layak Pakai).

File diagram Draw.io dapat diakses pada: [`docs/context_diagram.drawio`](context_diagram.drawio).

---

## 1. Visualisasi Diagram Konteks (Mermaid)

```mermaid
flowchart TD
    %% Styling
    classDef process fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1,font-weight:bold;
    classDef donor fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20,font-weight:bold;
    classDef rec fill:#fff3e0,stroke:#ef6c00,stroke-width:2px,color:#e65100,font-weight:bold;
    classDef admin fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c,font-weight:bold;
    classDef ext fill:#eceff1,stroke:#546e7a,stroke-width:1.5px,stroke-dasharray: 5 5,color:#263238;

    %% Entities & Process
    SYSTEM(("0.0<br/><b>SISTEM INFORMASI DONASI BARANG</b><br/>(DonateYours Platform)")):::process
    DONOR["👤 DONOR<br/>(Pemberi Donasi)"]:::donor
    RECIPIENT["🏢 RECIPIENT<br/>(Penerima Donasi / Organisasi)"]:::rec
    ADMIN["🛡️ ADMINISTRATOR<br/>(Pengelola Platform)"]:::admin
    WEBAUTHN["🔐 WEBAUTHN / FIDO2<br/>(Passkey Authenticator)"]:::ext
    MAIL_SVC["✉️ MAIL SERVER / SMTP<br/>(Layanan Email Notifikasi)"]:::ext

    %% Data Flow Donor
    DONOR -- "1. Data Registrasi & Akun<br/>2. Postingan Donasi & Foto Barang<br/>3. Keputusan Pengajuan (Approve/Reject)<br/>4. Pesan Chat & Koordinasi<br/>5. Konfirmasi Donasi Selesai<br/>6. Pengaturan Profil & Keamanan (2FA)" --> SYSTEM
    SYSTEM -- "1. Status Verifikasi & Sesi Login<br/>2. Notifikasi Permohonan Masuk<br/>3. Data Profil Penerima Pemohon<br/>4. Pesan Chat dari Penerima/Admin<br/>5. Dashboard & Riwayat Donasi Diberikan" --> DONOR

    %% Data Flow Recipient
    RECIPIENT -- "1. Data Registrasi & Profil Organisasi<br/>2. Permohonan Donasi (Request & Alasan)<br/>3. Pembatalan Pengajuan Donasi<br/>4. Pesan Chat & Koordinasi Penjemputan<br/>5. Konfirmasi Barang Diterima<br/>6. Pencarian & Filter Barang" --> SYSTEM
    SYSTEM -- "1. Katalog & Detail Barang Donasi<br/>2. Notifikasi Status Pengajuan (Approve/Reject)<br/>3. Detail Kontak & Lokasi Pengambilan<br/>4. Pesan Chat dari Donor/Admin<br/>5. Dashboard & Riwayat Penerimaan" --> RECIPIENT

    %% Data Flow Admin
    ADMIN -- "1. Kredensial Login Admin<br/>2. Manajemen Kategori Barang<br/>3. Moderasi & Manajemen Pengguna<br/>4. Moderasi Donasi & Pengajuan" --> SYSTEM
    SYSTEM -- "1. Dashboard Statistik & Analitik Donasi<br/>2. Laporan Rekapitulasi Donasi & Riwayat<br/>3. Data Seluruh Pengguna & Profil<br/>4. Log Aktivitas Sistem & Log Status" --> ADMIN

    %% External Services Data Flow
    WEBAUTHN -. "Payload Autentikasi Publik & Verifikasi Passkey" .-> SYSTEM
    SYSTEM -. "Request Email Verifikasi, 2FA & Notifikasi" .-> MAIL_SVC
```

---

## 2. Struktur Halaman pada `docs/context_diagram.drawio`

File [`docs/context_diagram.drawio`](context_diagram.drawio) memiliki 2 halaman utama:

1. **Halaman 1: `1. Diagram Konteks (Utama)`**  
   Fokus pada interaksi 3 entitas luar utama: **Donor**, **Recipient**, dan **Administrator** terhadap Sistem Utama `0.0`.
2. **Halaman 2: `2. Diagram Konteks (+ Layanan Eksternal)`**  
   Menyertakan layanan eksternal (*third-party services*): **WebAuthn/Passkey Authenticator** dan **Mail Server/SMTP Service**.

---

## 3. Rincian Entitas Luar (*External Entities / Terminators*)

### 3.1. Entitas: **DONOR (Pemberi Donasi)**
Pengguna perorangan atau pihak yang mendonasikan barang bekas layak pakai ke platform.

#### Aliran Data Masuk (*Input to System*):
- **Data Registrasi & Akun**: Nama, email, password, nomor telepon, dan foto avatar.
- **Data Postingan Donasi & Foto**: Judul barang, deskripsi, kategori, kondisi barang, jumlah (*quantity*), alamat pengambilan (*pickup address*), kota, provinsi, dan file foto/gambar.
- **Keputusan Pengajuan Donasi**: Tindakan menyetujui (*Approve*) atau menolak (*Reject*) permohonan yang diajukan oleh Recipient.
- **Pesan Chat**: Komunikasi langsung dengan pemohon untuk membahas teknis serah terima / penjemputan barang.
- **Konfirmasi Donasi Selesai**: Penandaan bahwa barang telah berhasil diambil / diserahkan (*Completed*).
- **Pengaturan Profil & Keamanan**: Pengaturan two-factor authentication (2FA), perubahan sandi, dan pendaftaran passkey.

#### Aliran Informasi Keluar (*Output from System*):
- **Status Verifikasi & Sesi Login**: Notifikasi email terverifikasi dan status login akun.
- **Notifikasi Permohonan Donasi Masuk**: Pemberitahuan saat ada penerima yang mengajukan minat terhadap barang yang didonasikan.
- **Data Profil Pemohon**: Informasi profil, nama organisasi, domisili, dan deskripsi kebutuhan penerima.
- **Pesan Chat Masuk**: Pesan teks dari calon penerima atau administrator.
- **Dashboard & Riwayat Donasi**: Statistik total donasi yang diposting, donasi aktif, dan riwayat donasi yang telah selesai.

---

### 3.2. Entitas: **RECIPIENT (Penerima Donasi / Organisasi / Yayasan)**
Pihak penerima manfaat (pribadi atau lembaga/organisasi/panti asuhan) yang mencari dan mengajukan permohonan donasi.

#### Aliran Data Masuk (*Input to System*):
- **Data Registrasi & Profil Organisasi**: Nama organisasi, alamat lengkap, kota, provinsi, deskripsi yayasan/latar belakang, dan foto profil/legalitas.
- **Permohonan Pengajuan Donasi**: Pesan/alasan kebutuhan saat meminta barang donasi tertentu.
- **Pembatalan Pengajuan Donasi**: Permintaan membatalkan pengajuan yang masih berstatus pending.
- **Pesan Chat & Koordinasi Penjemputan**: Komunikasi terkait waktu dan teknis pengambilan barang dengan donor.
- **Konfirmasi Penerimaan Barang**: Konfirmasi bahwa barang donasi telah diterima dengan baik.
- **Pencarian & Filter Kategori**: Kata kunci pencarian barang dan pemilihan filter kategori/lokasi.

#### Aliran Informasi Keluar (*Output from System*):
- **Katalog & Detail Barang Donasi**: Daftar barang donasi yang dipublikasikan lengkap dengan foto, deskripsi, kondisi, dan lokasi.
- **Notifikasi Status Pengajuan**: Update status pengajuan apakah `pending`, `approved`, `rejected`, atau `completed`.
- **Detail Kontak & Lokasi Pengambilan**: Alamat lengkap pengambilan barang dari donor setelah permohonan disetujui.
- **Pesan Chat Masuk**: Respons dan arahan penjemputan dari donor/admin.
- **Dashboard & Riwayat Penerimaan**: Rekapitulasi pengajuan aktif dan riwayat barang donasi yang berhasil diperoleh.

---

### 3.3. Entitas: **ADMINISTRATOR (Pengelola Platform)**
Pengelola internal yang bertanggung jawab atas pengawasan, kelancaran operasional, dan pengelolaan data master platform.

#### Aliran Data Masuk (*Input to System*):
- **Kredensial Login Admin**: Email dan kata sandi khusus administrator.
- **Manajemen Kategori Barang**: Penambahan nama kategori baru, pengubahan ikon/nama, dan penghapusan kategori donasi.
- **Moderasi & Manajemen Pengguna**: Pemantauan akun donor dan penerima, verifikasi profil organisasi, atau tindakan suspend/blokir pengguna bermasalah.
- **Moderasi Donasi & Pengajuan**: Pengawasan konten postingan donasi agar sesuai norma dan syarat ketentuan platform.

#### Aliran Informasi Keluar (*Output from System*):
- **Dashboard Analitik & Statistik**: Grafik jumlah donasi, total transaksi serah terima, rasio donor vs recipient, dan statistik bulanan.
- **Laporan Rekapitulasi Donasi & Riwayat**: Laporan komprehensif data barang yang telah disalurkan beserta log penyelesaiannya.
- **Data Seluruh Pengguna**: Daftar seluruh pengguna terdaftar, peran akun, dan profil detail penerima.
- **Log Aktivitas Sistem & Log Status**: Catatan audit trail tindakan pengguna (*activity logs*) dan rekam jejak riwayat status (*request logs*).

---

### 3.4. Entitas Layanan Eksternal (*External Services*)

#### A. **WebAuthn / FIDO2 (Passkey Authenticator)**
- **Aliran Masuk ke Sistem**: Kredensial publik WebAuthn, signature biometrik, dan validasi kunci keamanan perangkat.
- **Aliran Keluar dari Sistem**: Tantangan autentikasi (*challenge payload*) untuk otentikasi login tanpa kata sandi.

#### B. **Mail Server / SMTP (Layanan Notifikasi Email)**
- **Aliran Keluar dari Sistem**: Permintaan pengiriman email aktivasi/verifikasi akun, reset password, dan pemberitahuan transaksi donasi.

---

## 4. Cara Membuka & Mengedit File `context_diagram.drawio`

1. **Via Browser**:
   - Buka [app.diagrams.net](https://app.diagrams.net/)
   - Pilih `File` > `Open From` > `Device...` lalu pilih [`docs/context_diagram.drawio`](context_diagram.drawio).
2. **Via VS Code**:
   - Instal ekstensi **Draw.io Integration**.
   - Buka file [`docs/context_diagram.drawio`](context_diagram.drawio) langsung di VS Code.
