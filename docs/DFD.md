# Dokumentasi Data Flow Diagram (DFD) - DonateYours

Dokumen ini berisi dokumentasi dan spesifikasi lengkap **Data Flow Diagram (DFD)** untuk sistem aplikasi **DonateYours** (Sistem Informasi Donasi Barang Bekas Layak Pakai).

File diagram Draw.io dapat diakses pada: [`docs/dfd.drawio`](dfd.drawio).

---

## 1. Hirarki & Struktur Tingkatan DFD

Sistem DonateYours dimodelkan dalam 3 tingkatan diagram alir data (*Data Flow Diagram*):
1. **DFD Level 0 (Diagram Konteks)**: Memetakan batas sistem (*system boundary*), sistem sebagai satu proses tunggal `0.0`, dan interaksi dengan seluruh entitas luar (*external entities*). *(Lihat juga: [`docs/context_diagram.drawio`](context_diagram.drawio) & [`docs/CONTEXT_DIAGRAM.md`](CONTEXT_DIAGRAM.md))*.
2. **DFD Level 1 (Diagram Alir Data Utama)**: Mendekomposisi proses `0.0` menjadi **6 proses utama**, memetakan seluruh aliran data antar entitas luar dan **9 Data Store (D1 - D9)**.
3. **DFD Level 2 (Dekomposisi Rinci Sub-Proses)**:
   - **Level 2 - Proses 2.0**: Manajemen Donasi, Pengelolaan Kategori Master, Upload Foto & Katalog Pencarian.
   - **Level 2 - Proses 3.0 & 4.0**: Pengajuan Permohonan, Review & Persetujuan Donor, Log Status, Penjemputan & Arsip Riwayat Serah Terima.

---

## 2. Visualisasi DFD Level 1 (Mermaid Diagram)

```mermaid
flowchart TB
    %% Styling Classes
    classDef entity fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20,font-weight:bold;
    classDef entityRec fill:#fff3e0,stroke:#ef6c00,stroke-width:2px,color:#e65100,font-weight:bold;
    classDef entityAdm fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c,font-weight:bold;
    classDef process fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1,font-weight:bold;
    classDef datastore fill:#fffde7,stroke:#fbc02d,stroke-width:2px,color:#f57f17,font-weight:bold;

    %% External Entities
    DONOR["👤 DONOR<br/>(Pemberi Donasi)"]:::entity
    RECIPIENT["🏢 RECIPIENT<br/>(Penerima / Yayasan)"]:::entityRec
    ADMIN["🛡️ ADMINISTRATOR<br/>(Pengelola Platform)"]:::entityAdm

    %% Level 1 Processes
    P1(("1.0<br/><b>Autentikasi &<br/>Manajemen Akun</b>")):::process
    P2(("2.0<br/><b>Manajemen Donasi &<br/>Katalog Barang</b>")):::process
    P3(("3.0<br/><b>Pengajuan &<br/>Verifikasi Permohonan</b>")):::process
    P4(("4.0<br/><b>Serah Terima &<br/>Pencatatan Riwayat</b>")):::process
    P5(("5.0<br/><b>Komunikasi &<br/>Pesan Langsung (Chat)</b>")):::process
    P6(("6.0<br/><b>Notifikasi &<br/>Audit Log Aktivitas</b>")):::process

    %% Data Stores
    D1[("D1 | Users & Passkeys")]:::datastore
    D2[("D2 | Profil Penerima")]:::datastore
    D3[("D3 | Kategori Barang")]:::datastore
    D4[("D4 | Donasi & Foto")]:::datastore
    D5[("D5 | Pengajuan & Log")]:::datastore
    D6[("D6 | Riwayat Donasi")]:::datastore
    D7[("D7 | Percakapan & Pesan")]:::datastore
    D8[("D8 | Notifikasi Sistem")]:::datastore
    D9[("D9 | Log Aktivitas")]:::datastore

    %% Flows Process 1.0 (Auth & Profiles)
    DONOR -- "Data Registrasi & Login" --> P1
    RECIPIENT -- "Data Akun & Profil Organisasi" --> P1
    P1 -- "Status Akun & Sesi Login" --> DONOR
    P1 -- "Status Profil & Verifikasi" --> RECIPIENT
    P1 <--> "Simpan/Validasi Akun" D1
    P1 <--> "Simpan/Validasi Profil" D2

    %% Flows Process 2.0 (Donation Management)
    DONOR -- "Form Donasi & Foto Barang" --> P2
    ADMIN -- "Master Kategori Donasi" --> P2
    P2 -- "Katalog Barang Donasi" --> RECIPIENT
    P2 -- "Status Donasi Terpublikasi" --> DONOR
    P2 <--> "Simpan Data Donasi & Foto" D4
    D3 --> "Data Kategori" P2

    %% Flows Process 3.0 (Request & Approval)
    RECIPIENT -- "Pengajuan Permohonan Donasi" --> P3
    P3 -- "Notifikasi Pengajuan Masuk" --> DONOR
    DONOR -- "Keputusan (Approve/Reject)" --> P3
    P3 -- "Status Pengajuan" --> RECIPIENT
    P3 <--> "Simpan Pengajuan & Log" D5
    P3 --> "Update Status Donasi" D4

    %% Flows Process 4.0 (Handover & History)
    DONOR -- "Konfirmasi Serah Terima Selesai" --> P4
    RECIPIENT -- "Konfirmasi Barang Diterima" --> P4
    P4 -- "Arsip Riwayat Selesai" --> DONOR
    P4 -- "Arsip Riwayat Selesai" --> RECIPIENT
    P4 --> "Simpan Riwayat Transaksi" D6
    P4 --> "Update Status Selesai" D4

    %% Flows Process 5.0 (Chat System)
    DONOR <--> "Pesan Chat & Koordinasi" P5
    RECIPIENT <--> "Pesan Chat & Koordinasi" P5
    P5 <--> "Simpan/Baca Pesan" D7

    %% Flows Process 6.0 (Notifications & Audit)
    ADMIN -- "Permintaan Laporan & Statistik" --> P6
    P6 -- "Dashboard Analitik & Audit Trail" --> ADMIN
    P6 <--> "Kirim/Baca Notifikasi" D8
    P6 --> "Rekam Log Audit" D9
```

---

## 3. Kamus Penyimpanan Data (*Data Stores Dictionary*)

| ID Data Store | Nama Data Store | Tabel Basis Data Terkait | Deskripsi Informasi yang Disimpan |
| :--- | :--- | :--- | :--- |
| **D1** | **Users & Passkeys** | `users`, `passkeys`, `sessions` | Data kredensial pengguna, password hash, email, phone, role (admin/donor/recipient), token 2FA, dan biometric passkey. |
| **D2** | **Profil Penerima** | `recipient_profiles` | Detail legalitas/organisasi penerima (nama lembaga, alamat, domisili kota/provinsi, deskripsi, foto). |
| **D3** | **Kategori Barang** | `categories` | Data master klasifikasi barang donasi (nama kategori, icon). |
| **D4** | **Donasi & Foto** | `donations`, `donation_images` | Data barang donasi (judul, deskripsi, kondisi, kuantitas, alamat pengambilan, status alur donasi) dan URL/path foto dokumentasi. |
| **D5** | **Pengajuan & Log** | `donation_requests`, `request_logs` | Data permohonan donasi dari penerima beserta jejak riwayat perubahan statusnya (*pending, approved, rejected, cancelled, completed*). |
| **D6** | **Riwayat Donasi** | `donation_histories` | Arsip permanen transaksi donasi yang telah sukses diserahterimakan dan diselesaikan (*completed*). |
| **D7** | **Percakapan & Pesan** | `conversations`, `conversation_participants`, `messages` | Sesi obrolan pesan langsung antar pengguna terkait donasi atau permohonan, riwayat pesan teks, dan status terbaca (*read receipt*). |
| **D8** | **Notifikasi Sistem** | `notifications` | Notifikasi realtime/in-app mengenai status pengajuan, pesan baru, atau aktivitas sistem. |
| **D9** | **Log Aktivitas** | `activity_logs` | Rekam jejak audit keamanan dan operasional (*audit trail*) atas aksi yang dilakukan pengguna pada tabel sistem. |

---

## 4. Rincian Proses DFD Level 1

### **1.0 Autentikasi & Manajemen Pengguna**
- **Deskripsi**: Menangani seluruh proses pendaftaran akun baru, verifikasi email, login aman (Password, 2FA, Passkey WebAuthn), serta pembaruan profil pengguna dan profil organisasi penerima.
- **Entitas Terkait**: Donor, Recipient, Admin.
- **Data Store**: `D1 (Users & Passkeys)`, `D2 (Profil Penerima)`, `D9 (Log Aktivitas)`.

### **2.0 Manajemen Donasi & Katalog Barang**
- **Deskripsi**: Memfasilitasi donor dalam membuat postingan barang donasi, mengunggah foto, menentukan lokasi pengambilan barang, serta memfasilitasi penerima dalam mencari dan memfilter katalog donasi aktif.
- **Entitas Terkait**: Donor, Recipient, Admin (kelola kategori).
- **Data Store**: `D3 (Kategori)`, `D4 (Donasi & Foto)`.

### **3.0 Pengajuan & Verifikasi Permohonan**
- **Deskripsi**: Mengelola permohonan pengajuan barang dari pihak penerima, menyampaikan pengajuan ke dashboard donor, serta mencatat keputusan donor (*Approve* atau *Reject*) ke dalam log status permohonan.
- **Entitas Terkait**: Recipient, Donor.
- **Data Store**: `D4 (Donasi & Foto)`, `D5 (Pengajuan & Log)`, `D8 (Notifikasi)`.

### **4.0 Serah Terima & Pencatatan Riwayat**
- **Deskripsi**: Mengawal tahapan pengambilan barang (*picked up*) hingga konfirmasi penyelesaian serah terima (*completed*), lalu membukukannya secara permanen ke dalam tabel arsip riwayat donasi.
- **Entitas Terkait**: Donor, Recipient.
- **Data Store**: `D4 (Donasi)`, `D5 (Pengajuan)`, `D6 (Riwayat Donasi)`, `D8 (Notifikasi)`.

### **5.0 Komunikasi & Pesan Langsung (Chat)**
- **Deskripsi**: Menyediakan saluran chat langsung (*direct messaging*) antara donor dan penerima (atau admin) untuk berkoordinasi mengenai waktu, alamat, dan teknis serah terima barang donasi.
- **Entitas Terkait**: Donor, Recipient, Admin.
- **Data Store**: `D7 (Percakapan & Pesan)`, `D8 (Notifikasi)`.

### **6.0 Notifikasi & Audit Log Aktivitas**
- **Deskripsi**: Mengirimkan notifikasi peringatan kepada pengguna, mencatat seluruh riwayat aktivitas sistem untuk audit keamanan, serta menyajikan dashboard statistik analitik untuk administrator.
- **Entitas Terkait**: Donor, Recipient, Admin.
- **Data Store**: `D8 (Notifikasi)`, `D9 (Log Aktivitas)`.

---

## 5. Struktur Halaman pada [`docs/dfd.drawio`](dfd.drawio)

File diagram draw.io tersusun rapi dalam **3 tab halaman**:

1. **Halaman 1: `1. DFD Level 1 - Sistem Lengkap`**  
   Menampilkan diagram sistem DFD Level 1 menyeluruh (3 Entitas Luar, 6 Proses Utama `1.0` - `6.0`, 9 Data Store `D1` - `D9`, dan seluruh aliran data terhubung rapi).
2. **Halaman 2: `2. DFD Level 2 - Proses 2.0 (Donasi)`**  
   Dekomposisi rinci sub-proses `2.1` (Kelola Kategori), `2.2` (Form Donasi), `2.3` (Upload Foto), `2.4` (Publikasi Status), dan `2.5` (Eksplorasi Katalog).
3. **Halaman 3: `3. DFD Level 2 - Proses 3.0 & 4.0 (Pengajuan & Riwayat)`**  
   Dekomposisi rinci sub-proses `3.1` (Ajukan Request), `3.2` (Review Permohonan), `3.3` (Approval/Reject), `4.1` (Konfirmasi Pengambilan), dan `4.2` (Pencatatan Riwayat Transaksi).

---

## 6. Cara Membuka & Mengedit File `dfd.drawio`

1. **Di Browser Web**:
   - Buka [app.diagrams.net](https://app.diagrams.net/)
   - Pilih menu `File` > `Open From` > `Device...` lalu pilih [`docs/dfd.drawio`](dfd.drawio).
2. **Di VS Code**:
   - Pasang ekstensi **Draw.io Integration** (oleh *Henning Dieterichs*).
   - Klik langsung file [`docs/dfd.drawio`](dfd.drawio) pada file explorer VS Code.
