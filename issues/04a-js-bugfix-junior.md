# ⚙️ ISSUE-04a: Bug Fix JS — Error Handling, Debounce, & Double-Submit Prevention

> 🟢 **LEVEL: JUNIOR DEV / AI** — Task-task di issue ini straightforward dengan pattern yang umum.

## 📄 Deskripsi Isu
Kode JavaScript pada [index.html](file:///Users/ikhda/Downloads/Test/index.html) memiliki beberapa bug logika yang langsung bisa diperbaiki tanpa perlu perubahan arsitektur besar. Issue ini hanya berisi perbaikan yang bisa dikerjakan oleh junior developer.

---

## 🔗 Dependensi
- **Blocked by**: ISSUE-01 (framework harus sudah di-setup)
- **Blocks**: Tidak ada
- **File target**: `src/hooks/useProducts.js`, `src/hooks/useCart.js`, dan komponen terkait

---

## 🛠️ Task 1: Error Handling pada Load Produk

**Masalah 7 (Baris 310) & Masalah 15 (Baris 509):** Fungsi `loadProducts()` tidak punya error handling. Jika API gagal, loading spinner berjalan selamanya.

**Perbaikan:**

```jsx
// Di useProducts hook
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);

async function loadProducts() {
    setIsLoading(true);
    setError(null);
    try {
        // simulasi API call
        const data = await fetchProducts();
        setProducts(data);
    } catch (err) {
        setError('Gagal memuat produk. Silakan coba lagi.');
        console.error('Load products error:', err);
    } finally {
        setIsLoading(false); // SELALU matikan loading, baik sukses atau gagal
    }
}
```

**UI error state:**
```jsx
{error && (
    <div className="error-state">
        <p>😵 {error}</p>
        <button onClick={loadProducts}>🔄 Coba Lagi</button>
    </div>
)}
```

### ✅ Acceptance Criteria Task 1:
- [ ] Jika load produk gagal, spinner loading berhenti (tidak berputar selamanya)
- [ ] Pesan error ditampilkan ke user: "Gagal memuat produk. Silakan coba lagi."
- [ ] Ada tombol "Coba Lagi" yang memanggil ulang loadProducts
- [ ] Klik "Coba Lagi" → loading muncul lagi → produk ter-load (jika berhasil)
- [ ] `isLoading` diset `false` di block `finally` (bukan hanya di success path)

---

## 🛠️ Task 2: Prevent Double-Submit pada Checkout

**Masalah 12 (Baris 486):** Tombol checkout tetap aktif selama proses checkout berjalan (2 detik). User bisa klik berkali-kali.

**Perbaikan:**

```jsx
const [isCheckingOut, setIsCheckingOut] = useState(false);

async function checkout() {
    if (cart.length === 0 || isCheckingOut) return;

    setIsCheckingOut(true);
    try {
        // simulasi API checkout
        await new Promise(resolve => setTimeout(resolve, 2000));
        clearCart();
        // tampilkan sukses
    } catch (err) {
        // tampilkan error
    } finally {
        setIsCheckingOut(false);
    }
}
```

**UI tombol:**
```jsx
<button
    className="checkout-btn"
    onClick={checkout}
    disabled={isCheckingOut || cart.length === 0}
>
    {isCheckingOut ? '⏳ Memproses...' : '結帳'}
</button>
```

### ✅ Acceptance Criteria Task 2:
- [ ] Klik checkout → tombol langsung menjadi disabled dan teks berubah ke "⏳ Memproses..."
- [ ] Selama proses checkout, tombol TIDAK bisa diklik lagi
- [ ] Setelah checkout selesai → tombol kembali normal
- [ ] Tidak ada double-submit (klik cepat 2x → checkout hanya berjalan 1x)

---

## 🛠️ Task 3: Debounce pada Event Resize

**Masalah 14 (Baris 503):** Event `resize` memicu eksekusi di setiap piksel perubahan. Membebani CPU.

**Perbaikan:**

```jsx
useEffect(() => {
    let timeoutId;

    function handleResize() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            // logika resize di sini (jika ada)
            console.log('Window resized:', window.innerWidth);
        }, 200); // debounce 200ms
    }

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(timeoutId);
    };
}, []);
```

### ✅ Acceptance Criteria Task 3:
- [ ] Resize window → handler TIDAK berjalan di setiap piksel
- [ ] Handler hanya berjalan 200ms setelah user berhenti resize (bisa diverifikasi via console.log)
- [ ] Event listener dibersihkan saat komponen unmount (tidak ada memory leak)
- [ ] `clearTimeout` dipanggil di cleanup function

---

## 🎯 Kriteria Penerimaan Global
- [ ] Seluruh 3 task di atas berfungsi tanpa error di console
- [ ] Tidak ada regression pada fitur yang sudah ada (cart, product display, dll)
