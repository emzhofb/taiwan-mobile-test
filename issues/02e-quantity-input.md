# 📦 ISSUE-02e: Input Kuantitas Langsung & Perbaikan Update Kelipatan

> 🟡 **LEVEL: JUNIOR DEV / AI (dengan pengawasan)** — Edge case validasi input perlu perhatian.

## 📄 Deskripsi Singkat
Ubah tampilan kuantitas statis di keranjang belanja menjadi **input angka yang bisa diedit langsung** oleh pengguna. Saat ini, user hanya bisa menambah/mengurangi 1 per klik. Harus bisa langsung ketik angka tertentu (misal: 10 unit sekaligus).

---

## 🔗 Dependensi
- **Blocked by**: ISSUE-01 (framework harus sudah di-setup), ISSUE-02a (dialog konfirmasi untuk hapus item)
- **Blocks**: Tidak ada
- **File target**: `src/components/CartItem.jsx`

---

## 🛠️ Masalah yang Diselesaikan
- **Requirement #5**: "Fix quantity couldn't update by multiples"
- Kode saat ini di [index.html baris 427-438](file:///Users/ikhda/Downloads/Test/index.html#L427-L438) hanya support `+1` / `-1` per klik.

---

## 📋 Spesifikasi Teknis

### Perubahan UI di `<CartItem>`:

**Sebelum (saat ini):**
```
[ - ]  3  [ + ]
```
Angka "3" adalah `<span>` statis, tidak bisa diedit.

**Sesudah (target):**
```
[ - ]  [_3_]  [ + ]
```
Angka "3" berubah menjadi `<input type="number">` yang bisa langsung diketik.

### Contoh implementasi:
```jsx
<div className="quantity-controls">
    <button
        className="quantity-btn"
        onClick={() => updateQuantity(item.product.id, -1)}
    >
        −
    </button>

    <input
        type="number"
        className="quantity-input"
        value={item.quantity}
        min="0"
        onChange={(e) => {
            const newQty = parseInt(e.target.value, 10);
            if (isNaN(newQty) || newQty < 0) return;
            if (newQty === 0) {
                // Trigger dialog konfirmasi hapus (dari ISSUE-02a)
                showDeleteDialog(item.product);
            } else {
                setQuantity(item.product.id, newQty);
            }
        }}
        onBlur={(e) => {
            // Jika input kosong saat blur, kembalikan ke 1
            if (!e.target.value || parseInt(e.target.value) <= 0) {
                setQuantity(item.product.id, 1);
            }
        }}
    />

    <button
        className="quantity-btn"
        onClick={() => updateQuantity(item.product.id, 1)}
    >
        +
    </button>
</div>
```

### Contoh CSS:
```css
.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 4px;
    font-size: 14px;
    font-weight: bold;
    -moz-appearance: textfield; /* hilangkan spinner Firefox */
}

/* Hilangkan spinner Chrome/Safari */
.quantity-input::-webkit-inner-spin-button,
.quantity-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
```

### Aturan validasi input:
| Input user | Perilaku |
| :--- | :--- |
| `5` | Set kuantitas ke 5 |
| `0` | Tampilkan dialog konfirmasi hapus item |
| `-3` | Abaikan (jangan update) |
| `abc` | Abaikan (NaN check) |
| *(kosong lalu blur)* | Kembalikan ke 1 |
| `999` | Set ke 999 (tidak ada batas atas saat ini) |

---

## 🎯 Kriteria Penerimaan (Checklist)

- [ ] Kuantitas di cart bisa langsung diketik (bukan hanya +1/-1)
- [ ] Ketik "5" di input → kuantitas berubah ke 5, total harga di-update
- [ ] Ketik "10" → kuantitas berubah ke 10
- [ ] Ketik "0" → muncul dialog konfirmasi hapus (dari ISSUE-02a)
- [ ] Ketik huruf/karakter → input tidak berubah / diabaikan
- [ ] Kosongkan input lalu klik di tempat lain (blur) → kuantitas kembali ke 1
- [ ] Tombol [ - ] dan [ + ] tetap berfungsi normal
- [ ] Klik [ - ] saat kuantitas = 1 → muncul dialog konfirmasi hapus
- [ ] Total harga di cart ter-update real-time saat kuantitas berubah
- [ ] Badge kuantitas di header ter-update real-time
