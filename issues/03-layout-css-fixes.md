# 🎨 ISSUE-03: Perbaikan Layout & Gaya CSS (Responsivitas & Struktur)

> 🟢 **LEVEL: JUNIOR DEV / AI** — Issue ini sangat cocok untuk junior developer atau AI assistant. Sudah ada contoh kode CSS untuk setiap perbaikan.

## 📄 Deskripsi Isu
Gaya tampilan pada halaman katalog [index.html](file:///Users/ikhda/Downloads/Test/index.html) memiliki beberapa masalah visual, terutama kurangnya kemampuan adaptasi pada perangkat seluler (mobile responsiveness) dan struktur penulisan kode CSS yang kurang baik (over-nested). Tugas ini bertujuan untuk memperbaiki gaya visual, menerapkan grid layout yang dinamis, serta merestrukturisasi selector CSS agar lebih modular dan mudah dikelola.

---

## 🔗 Dependensi
- **Blocked by**: ISSUE-01 (sebaiknya, tapi bisa juga dikerjakan langsung di CSS file framework)
- **Blocks**: Tidak ada
- **File target**: File CSS utama (`src/styles/` atau CSS module terkait)

> **Catatan**: Issue ini bisa dikerjakan **paralel** dengan ISSUE-01 jika CSS ditulis di file terpisah. Perbaikan CSS ini tetap relevan di framework apa pun.

---

## 🛠️ Masalah CSS & Layout yang Harus Diperbaiki (dari [index.html](file:///Users/ikhda/Downloads/Test/index.html))

### 1. Lebar Kontainer Statis (Masalah 1 - Baris 19)
* **Deskripsi**: Gaya `.container` menggunakan lebar statis `width: 1200px`. Hal ini menyebabkan layout terpotong horizontal pada layar yang lebih kecil dari 1200px.
* **Perbaikan**: Ubah menjadi lebar fleksibel dengan batas maksimum:
  ```css
  .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
  }
  ```

### 2. Posisi Ikon Keranjang Belanja (Masalah 2 - Baris 38)
* **Deskripsi**: Posisi ikon keranjang menggunakan `float: right`, yang menyulitkan penyelarasan vertikal dan sering pecah ketika berada di dalam flexbox header pada layar kecil.
* **Perbaikan**: Gunakan layout **Flexbox** pada header untuk menyelaraskan judul toko dan ikon keranjang secara otomatis dan seimbang:
  ```css
  .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      /* proper padding & styling */
  }
  ```

### 3. Grid Produk yang Pecah (Masalah 3 - Baris 64)
* **Deskripsi**: Kode asal memaksakan 4 kolom (`grid-template-columns: repeat(4, 1fr)`) tanpa memperhitungkan penyusutan lebar kartu produk pada layar sedang dan kecil.
* **Perbaikan**: Buat grid yang adaptif menggunakan CSS Grid dengan `auto-fit` atau media queries yang bertingkat:
  ```css
  .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
  }
  ```

### 4. Kurangnya Media Query Mobile yang Tepat (Masalah 4 - Baris 251)
* **Deskripsi**: Halaman tidak memiliki breakpoint yang cukup untuk menangani tablet (lebar 768px hingga 1024px) dan mobile (< 768px). Sidebar keranjang belanja selebar `400px` akan melampaui lebar layar pada ponsel kecil (lebar 320px - 375px).
* **Perbaikan**:
  - Terapkan breakpoints standar untuk layout responsif:
    - **Desktop (> 1024px)**: 4 kolom produk.
    - **Tablet (600px - 1024px)**: 2 atau 3 kolom produk.
    - **Mobile (< 600px)**: 1 atau 2 kolom produk.
  - Buat lebar `.cart-sidebar` fleksibel di perangkat mobile:
    ```css
    @media (max-width: 480px) {
        .cart-sidebar {
            width: 100%;
            right: -100%;
        }
        .cart-sidebar.open {
            right: 0;
        }
    }
    ```

### 5. Penulisan CSS Selector Terlalu Nested (Masalah 5 - Baris 264)
* **Deskripsi**: Selector `.container .products-grid .product-card .product-image` terlalu spesifik dan bersarang dalam. Ini melanggar prinsip modularitas CSS dan menurunkan performa render browser.
* **Perbaikan**: 
  - Gunakan selector kelas tunggal yang flat: `.product-image` saja
  - Jika perlu namespace, gunakan BEM: `.product-card__image`
  - Contoh:
    ```css
    /* ❌ BURUK: terlalu nested */
    .container .products-grid .product-card .product-image { ... }

    /* ✅ BAIK: flat selector */
    .product-image { ... }

    /* ✅ BAIK: BEM naming */
    .product-card__image { ... }
    ```

---

## 🎯 Kriteria Penerimaan (Checklist)

### Responsivitas
- [ ] Buka di browser lebar 1440px → layout 4 kolom, tidak ada horizontal scroll
- [ ] Buka di browser lebar 1024px → layout 3 kolom, semua kartu terlihat utuh
- [ ] Buka di browser lebar 768px → layout 2 kolom, kartu tidak saling tumpuk
- [ ] Buka di browser lebar 375px (iPhone) → layout 1-2 kolom, tidak ada overflow horizontal
- [ ] Buka di browser lebar 320px (SE/kecil) → layout tetap rapi

### Header
- [ ] Header menggunakan flexbox (bukan float)
- [ ] Judul toko dan ikon keranjang sejajar secara vertikal (align-items: center)
- [ ] Di mobile, header tidak pecah/break ke dua baris

### Cart Sidebar
- [ ] Di desktop: sidebar lebar 400px, slide dari kanan
- [ ] Di mobile (< 480px): sidebar lebar 100% layar
- [ ] Sidebar tidak ada bagian yang terpotong di mobile

### CSS Quality
- [ ] Tidak ada selector CSS yang nested lebih dari 2 level
- [ ] Container menggunakan `max-width: 1200px` (bukan `width: 1200px`)
- [ ] Grid produk menggunakan `auto-fill` atau `auto-fit` dengan `minmax`
- [ ] Semua gambar placeholder produk terpusat dan berukuran konsisten
