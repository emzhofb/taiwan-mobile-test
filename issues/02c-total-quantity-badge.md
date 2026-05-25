# 📦 ISSUE-02c: Perhitungan Total Kuantitas Badge Keranjang

> 🟢 **LEVEL: JUNIOR DEV / AI** — Issue ini sangat sederhana, cocok untuk AI murah.

## 📄 Deskripsi Singkat
Badge angka di ikon keranjang belanja harus menampilkan **total kuantitas seluruh item**, bukan jumlah jenis produk. Misalnya, 2 unit earphone + 3 unit mouse = badge menunjukkan **5**, bukan **2**.

---

## 🔗 Dependensi
- **Blocked by**: ISSUE-01 (framework harus sudah di-setup)
- **Blocks**: Tidak ada
- **File target**: `src/components/Header.jsx` + hooks `useCart.js`

---

## 🛠️ Masalah yang Diselesaikan
- **Requirement #3**: "Count total quantity for user's shopping cart"
- Kode saat ini di [index.html baris 446-454](file:///Users/ikhda/Downloads/Test/index.html#L446-L454) sudah menghitung `totalItems` dengan benar menggunakan loop, tapi perlu dipastikan menggunakan reactive computation di framework baru.

---

## 📋 Spesifikasi Teknis

### Logika perhitungan:
```jsx
// Di useCart hook atau computed property
const totalQuantity = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}, [cart]);
```

### Contoh skenario:
| Cart Content | Total Quantity (Badge) |
| :--- | :---: |
| Kosong | **0** |
| 1x 智慧手錶 | **1** |
| 2x 智慧手錶, 3x 無線滑鼠 | **5** |
| 1x setiap produk (8 jenis) | **8** |
| 10x 無線藍牙耳機 | **10** |

### Tampilan badge:
- Angka ditampilkan di dalam lingkaran kecil (`.cart-count`) di sudut kanan atas ikon keranjang
- Jika total = 0, badge tetap tampil tapi menunjukkan "0"

---

## 🎯 Kriteria Penerimaan (Checklist)

- [ ] Badge keranjang menampilkan total kuantitas, BUKAN jumlah jenis produk
- [ ] Tambah 1 produk → badge berubah dari 0 ke 1
- [ ] Tambah produk yang sama 3 kali → badge menunjukkan 3
- [ ] Tambah 2 produk berbeda masing-masing 1x → badge menunjukkan 2
- [ ] Kurangi kuantitas di cart → badge otomatis berkurang
- [ ] Hapus item dari cart → badge otomatis berkurang
- [ ] Checkout berhasil (cart kosong) → badge kembali ke 0
- [ ] Perhitungan menggunakan `useMemo` (React) atau `computed` (Vue) — bukan dihitung manual setiap render
