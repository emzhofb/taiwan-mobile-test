# 📦 ISSUE-02b: Toast Notification (Feedback Tambah ke Keranjang)

> 🟢 **LEVEL: JUNIOR DEV / AI** — Issue ini cocok untuk junior developer atau AI assistant.

## 📄 Deskripsi Singkat
Tambahkan sistem **notifikasi melayang (toast)** yang muncul otomatis ketika pengguna menekan tombol "加入購物車" (Tambah ke Keranjang). Saat ini, setelah item ditambahkan, tidak ada feedback visual sama sekali.

---

## 🔗 Dependensi
- **Blocked by**: ISSUE-01 (framework harus sudah di-setup)
- **Blocks**: Tidak ada
- **File target**: `src/components/Toast.jsx` (BARU) + integrasi di `App.jsx` atau context

---

## 🛠️ Masalah yang Diselesaikan
- **Masalah 10 (Baris 414 di index.html)**: "沒有使用者反饋，加入購物車後沒有提示" — Tidak ada feedback visual setelah menambahkan item ke keranjang.
- **Requirement #2**: "Create notifications when user add item to the shopping cart"

---

## 📋 Spesifikasi Teknis

### Komponen `<Toast>`

**Perilaku:**
- Muncul di **pojok kanan atas** layar
- Otomatis hilang setelah **3 detik**
- Bisa **stack/menumpuk** jika user klik cepat beberapa produk
- Toast baru muncul di bawah toast sebelumnya

**Contoh tampilan teks:**
```
✅ 智慧手錶 berhasil ditambahkan ke keranjang!
```

### Contoh penggunaan:
```jsx
// Di dalam fungsi addToCart:
function addToCart(productId) {
    // ... logika tambah ke cart ...
    showToast(`✅ ${product.name} berhasil ditambahkan ke keranjang!`);
}
```

### State management untuk toast:
```jsx
// Contoh state
const [toasts, setToasts] = useState([]);

function showToast(message) {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);

    // Auto-dismiss setelah 3 detik
    setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
}
```

### Contoh CSS referensi:
```css
.toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 3000;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.toast {
    background: #333;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.3s ease;
    max-width: 350px;
    font-size: 14px;
}

.toast.exiting {
    animation: slideOut 0.3s ease forwards;
}

@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}
```

---

## 🎯 Kriteria Penerimaan (Checklist)

- [ ] Komponen `<Toast>` dibuat di `src/components/Toast.jsx`
- [ ] Klik "加入購物車" pada produk apa pun → toast muncul di kanan atas
- [ ] Toast menampilkan nama produk yang ditambahkan (misal: "✅ 智慧手錶 berhasil ditambahkan!")
- [ ] Toast otomatis hilang setelah 3 detik
- [ ] Klik 3 produk berturut-turut dalam 1 detik → 3 toast muncul bersamaan (stacked)
- [ ] Ada animasi slide-in saat toast muncul
- [ ] Ada animasi slide-out/fade-out saat toast hilang
- [ ] Toast tidak menghalangi interaksi dengan halaman di bawahnya (pointer-events)
- [ ] Toast tampil dengan baik di layar mobile (tidak keluar layar)
