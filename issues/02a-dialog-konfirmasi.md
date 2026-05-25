# 📦 ISSUE-02a: Dialog Konfirmasi (Checkout & Hapus Item)

> 🟢 **LEVEL: JUNIOR DEV / AI** — Issue ini cocok untuk junior developer atau AI assistant.

## 📄 Deskripsi Singkat
Ganti fungsi `alert()` bawaan browser pada saat **checkout** dan **penghapusan item** dari keranjang belanja dengan **dialog modal kustom** yang lebih menarik secara visual.

---

## 🔗 Dependensi
- **Blocked by**: ISSUE-01 (framework harus sudah di-setup)
- **Blocks**: Tidak ada
- **File target**: `src/components/Dialog.jsx` (BARU) + integrasi di `CartSidebar.jsx`

---

## 🛠️ Masalah yang Diselesaikan
- **Masalah 12 (Baris 486 di index.html)**: Checkout menggunakan `alert()` biasa, bukan dialog kustom.
- **Requirement #1**: "Create dialog window when user want to checkout or remove item from shopping cart"

---

## 📋 Spesifikasi Teknis

### Komponen `<Dialog>` / `<Modal>`

**Props yang harus diterima:**

```jsx
<Dialog
  isOpen={true/false}        // tampil atau tidak
  title="Konfirmasi"         // judul dialog
  message="Apakah Anda..."   // isi pesan
  onConfirm={() => {}}       // callback saat klik Konfirmasi
  onCancel={() => {}}        // callback saat klik Batal
  confirmText="Ya, Lanjutkan" // teks tombol konfirmasi (opsional)
  cancelText="Batal"          // teks tombol batal (opsional)
/>
```

### Skenario Trigger:
1. **Checkout**: Ketika user klik tombol "結帳" di panel keranjang.
   - Pesan: `"Apakah Anda yakin ingin checkout dengan total belanjaan NT$ {totalPrice}?"`
   - Konfirmasi → jalankan logika checkout
   - Batal → tutup dialog, tidak terjadi apa-apa

2. **Hapus item**: Ketika user mengurangi kuantitas hingga 0 atau klik tombol hapus.
   - Pesan: `"Apakah Anda yakin ingin menghapus {namaProduct} dari keranjang?"`
   - Konfirmasi → hapus item dari cart
   - Batal → kembalikan kuantitas ke 1

### Gaya Visual & Animasi:
- **Backdrop**: Overlay gelap semi-transparan (`rgba(0,0,0,0.5)`)
- **Dialog box**: Kotak putih di tengah layar, `border-radius: 12px`, shadow
- **Animasi masuk**: fade-in backdrop + scale-up dialog (0.9 → 1.0, durasi 200ms)
- **Animasi keluar**: fade-out + scale-down (durasi 150ms)

### Contoh CSS referensi:
```css
.dialog-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    animation: fadeIn 0.2s ease;
}

.dialog-box {
    background: white;
    border-radius: 12px;
    padding: 24px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: scaleIn 0.2s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes scaleIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}
```

---

## 🎯 Kriteria Penerimaan (Checklist)

- [ ] Komponen `<Dialog>` dibuat di `src/components/Dialog.jsx`
- [ ] Klik tombol "結帳" di cart → muncul dialog konfirmasi checkout (bukan `alert()`)
- [ ] Dialog checkout menampilkan total belanjaan yang benar (misal: "NT$ 11998")
- [ ] Klik "Konfirmasi" di dialog checkout → cart dikosongkan, dialog tertutup
- [ ] Klik "Batal" di dialog checkout → dialog tertutup, cart tetap utuh
- [ ] Kurangi kuantitas item ke 0 → muncul dialog konfirmasi hapus
- [ ] Dialog bisa ditutup dengan menekan tombol `Esc`
- [ ] Dialog bisa ditutup dengan mengklik area backdrop (di luar dialog box)
- [ ] Ada animasi transisi saat dialog muncul dan hilang
- [ ] Dialog tampil dengan baik di layar mobile (max-width: 90%)
