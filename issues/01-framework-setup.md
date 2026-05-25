# 🚀 ISSUE-01: Migrasi ke Framework (React/Vue) & Setup Arsitektur

> ⚠️ **LEVEL: SENIOR DEV ONLY** — Issue ini TIDAK boleh dikerjakan oleh junior dev atau AI murah.  
> Issue ini adalah **prerequisite/blocker** untuk ISSUE-02a s/d ISSUE-02e dan sebagian ISSUE-04b.

## 📄 Deskripsi Isu
Kode awal pada [index.html](file:///Users/ikhda/Downloads/Test/index.html) menggunakan JavaScript vanilla lama (ES5) dengan variabel global dan manipulasi DOM manual yang tidak efisien. Diperlukan migrasi basis kode aplikasi ini ke dalam framework modern seperti **React** atau **Vue 3** untuk meningkatkan skalabilitas, keterbacaan, dan performa aplikasi.

Tugas ini berfokus pada pengaturan dasar arsitektur frontend, modularisasi komponen, pengelolaan state (keadaan) aplikasi secara terpusat, dan perbaikan gaya CSS agar terorganisir dengan baik.

---

## 🔗 Dependensi
- **Blocked by**: Tidak ada (ini adalah issue pertama)
- **Blocks**: ISSUE-02a, 02b, 02c, 02d, 02e, ISSUE-04b

---

## 🛠️ Detail Masalah yang Diselesaikan (dari [index.html](file:///Users/ikhda/Downloads/Test/index.html))
- **Masalah 6 (Baris 305):** Polusi variabel global (`products`, `cart`, `isLoading`) yang rentan menyebabkan tabrakan data.
- **Masalah 8 (Baris 334) & Masalah 11 (Baris 440):** Operasi DOM tidak efisien yang terus-menerus mencari dan menulis ulang `.innerHTML` di setiap interaksi. Dengan framework, manipulasi DOM akan ditangani secara efisien oleh Virtual DOM / reactive system.

---

## 📋 Spesifikasi Teknis & Persyaratan

### 1. Pilihan Framework
* **React**: Gunakan functional component dengan hooks (`useState`, `useEffect`, `useMemo`, `useCallback`).
* **Vue 3**: Gunakan Single File Components (SFC) dengan Composition API (`setup`, `ref`, `computed`, `reactive`).

### 2. Struktur Komponen (Component Separation)
Aplikasi harus dipecah menjadi komponen-komponen kecil yang reusable (dapat digunakan kembali), seperti:
- `<App>`: Komponen utama (root).
- `<Header>`: Navigasi atas, memuat judul toko dan tombol keranjang belanja.
- `<ProductList>`: Menampilkan daftar produk (grid).
- `<ProductCard>`: Kartu individu untuk masing-masing produk dengan detail gambar, nama, harga, dan tombol add to cart.
- `<CartSidebar>`: Panel geser (drawer) samping yang menampilkan daftar item belanjaan.
- `<CartItem>`: Item individu di dalam keranjang, memuat kontrol kuantitas.
- `<SearchBox>`: Komponen input pencarian produk.
- `<Dialog>` / `<Modal>`: Komponen dialog konfirmasi dinamis.
- `<Toast>` / `<Notification>`: Alert melayang untuk feedback user.

### 3. State Management (Manajemen Keadaan)
* Gunakan state management yang terstruktur untuk mengelola data produk (`products`), keranjang belanja (`cart`), status panel sidebar (`isCartOpen`), status pemuatan (`isLoading`), dan notifikasi.
* **React**: Gunakan `useContext` (React Context API) atau library state management (Redux Toolkit / Zustand) untuk mencegah prop-drilling yang dalam.
* **Vue**: Gunakan reactive state yang dibagi atau menggunakan Pinia/Vuex.

### 4. Custom Hooks / Composables
Guna memisahkan logika bisnis dari UI, buat modular reusable logic seperti:
- **React**: `useCart` (untuk logika penambahan/pengurangan item, perhitungan total) dan `useProducts` (untuk fetching/filtering data produk).
- **Vue**: `useCart` dan `useProducts` dalam bentuk composables functions.

### 5. CSS Organization
* Atur ulang CSS agar lebih terstruktur dan modular.
* Gunakan **CSS Modules**, **CSS-in-JS** (styled-components), atau framework utilitas seperti **TailwindCSS** (opsional) untuk menghindari polusi selector global.

---

## 🎯 Kriteria Penerimaan (Acceptance Criteria)
- [ ] Aplikasi berhasil diinisialisasi menggunakan bundler modern (misalnya Vite) dan bisa dijalankan dengan `npm run dev`.
- [ ] Tidak ada lagi variabel global (`window.products`, `window.cart`, dsb.) di window object.
- [ ] Seluruh manipulasi DOM manual menggunakan `.innerHTML` atau `.appendChild` dihapus dan digantikan oleh rendering deklaratif framework.
- [ ] Kode terbagi menjadi struktur folder yang bersih (misal: `/components`, `/hooks`, `/context` atau `/store`, `/styles`).
- [ ] Fungsi inisialisasi aplikasi berjalan mulus tanpa adanya kebocoran memori (memory leak) akibat event listener yang tertinggal.
- [ ] Tampilan awal (product grid + cart sidebar) sama persis secara visual dengan [index.html](file:///Users/ikhda/Downloads/Test/index.html) yang asli.

---

## 📦 Output yang Diharapkan Setelah Issue Ini Selesai
Senior dev harus menyediakan scaffolding berikut agar issue downstream bisa dikerjakan junior:

```
src/
├── components/
│   ├── App.jsx          ← root component
│   ├── Header.jsx       ← judul + cart icon
│   ├── ProductList.jsx  ← grid wrapper
│   ├── ProductCard.jsx  ← individual card
│   ├── CartSidebar.jsx  ← sliding panel
│   └── CartItem.jsx     ← item di cart
├── hooks/
│   ├── useCart.js        ← cart logic
│   └── useProducts.js   ← product data
├── styles/
│   └── (CSS modules atau global styles)
└── main.jsx             ← entry point
```
