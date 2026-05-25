# 📦 ISSUE-02d: Kotak Pencarian Produk dengan Debounce

> 🟡 **LEVEL: JUNIOR DEV / AI (dengan pengawasan)** — Bagian debounce memerlukan sedikit perhatian ekstra.

## 📄 Deskripsi Singkat
Tambahkan **kolom pencarian (search box)** di area atas halaman produk agar pengguna bisa memfilter produk berdasarkan nama. Pencarian harus menggunakan mekanisme **debounce** agar tidak membebani performa.

---

## 🔗 Dependensi
- **Blocked by**: ISSUE-01 (framework harus sudah di-setup)
- **Blocks**: Tidak ada
- **File target**: `src/components/SearchBox.jsx` (BARU) + update `ProductList.jsx`

---

## 🛠️ Masalah yang Diselesaikan
- **Masalah 9 (Baris 353 di index.html)**: Fungsi `searchProducts()` berjalan di setiap keystroke tanpa throttling/debouncing.
- **Requirement #4**: "Add a search box for user to find products easier"

---

## 📋 Spesifikasi Teknis

### Komponen `<SearchBox>`

**Posisi**: Di antara Header dan grid produk (atau di dalam Header).

**HTML struktur:**
```jsx
<div className="search-box">
    <input
        type="text"
        placeholder="🔍 Cari produk..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
    />
</div>
```

### Logika Debounce:

Buat custom hook `useDebounce` atau implementasi langsung:

```jsx
// Custom hook useDebounce
function useDebounce(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer); // cleanup
    }, [value, delay]);

    return debouncedValue;
}

// Penggunaan di komponen
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 300);

const filteredProducts = useMemo(() => {
    if (!debouncedSearch.trim()) return products;
    return products.filter(p =>
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
}, [products, debouncedSearch]);
```

### Empty State (produk tidak ditemukan):
```jsx
{filteredProducts.length === 0 && (
    <div className="no-results">
        <p>😔 Produk dengan nama "{searchTerm}" tidak ditemukan</p>
    </div>
)}
```

### Contoh CSS referensi:
```css
.search-box {
    margin-bottom: 20px;
}

.search-box input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s;
}

.search-box input:focus {
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.no-results {
    text-align: center;
    color: #999;
    padding: 40px 20px;
    grid-column: 1 / -1; /* span semua kolom grid */
}
```

---

## 🎯 Kriteria Penerimaan (Checklist)

- [ ] Kolom pencarian muncul di atas grid produk
- [ ] Ketik "藍牙" → hanya produk "無線藍牙耳機" yang tampil
- [ ] Ketik "無線" → produk "無線藍牙耳機" dan "無線滑鼠" tampil
- [ ] Kosongkan search box → semua 8 produk tampil kembali
- [ ] Ketik "xyz" (tidak ada match) → tampil pesan "Produk tidak ditemukan"
- [ ] Filter berjalan case-insensitive
- [ ] Debounce bekerja: filter baru dieksekusi 300ms setelah user berhenti ketik (bisa diverifikasi via console.log)
- [ ] Tidak ada error di console saat mengetik cepat
- [ ] Search box tampil responsif di mobile (full-width, font tidak terlalu kecil)
