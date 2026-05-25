# ⚙️ ISSUE-04b: Optimalisasi Arsitektural JS — Event Delegation & Lifecycle Cleanup

> ⚠️ **LEVEL: SENIOR DEV ONLY** — Task ini memerlukan pemahaman arsitektur framework yang mendalam.

## 📄 Deskripsi Isu
Beberapa masalah JS pada [index.html](file:///Users/ikhda/Downloads/Test/index.html) bersifat arsitektural dan terkait erat dengan bagaimana framework mengelola lifecycle komponen. Task ini **TIDAK** cocok untuk junior developer atau AI murah karena membutuhkan pemahaman konteks yang lebih luas.

---

## 🔗 Dependensi
- **Blocked by**: ISSUE-01 (framework harus sudah di-setup sepenuhnya)
- **Blocks**: Tidak ada
- **File target**: Seluruh komponen yang mendaftarkan event listener global

---

## 🛠️ Task 1: Event Delegation (Masalah 13 - Baris 502)

**Deskripsi**: Pengikatan event inline pada elemen HTML (`onclick="addToCart(...)"`) dinilai buruk untuk skalabilitas proyek dan menyulitkan pelacakan event.

**Perbaikan:**
- Jika sudah migrasi ke React/Vue, gunakan declarative event binding bawaan framework:
  ```jsx
  // React
  <button onClick={() => addToCart(product.id)}>加入購物車</button>

  // Vue
  <button @click="addToCart(product.id)">加入購物車</button>
  ```
- React dan Vue secara internal sudah mengimplementasikan event delegation (synthetic events).
- Pastikan tidak ada sisa inline event handler di string HTML mentah (e.g., `innerHTML += '...onclick="..."...'`).

**Konteks penting**: Jika ISSUE-01 dikerjakan dengan benar, masalah ini seharusnya sudah otomatis terselesaikan. Issue ini berfungsi sebagai **verification checkpoint**.

### ✅ Acceptance Criteria:
- [ ] Tidak ada `onclick="..."` inline di HTML string atau template
- [ ] Semua event handler menggunakan JSX `onClick` (React) atau `@click` (Vue)
- [ ] Event handler bisa di-trace di React DevTools / Vue DevTools

---

## 🛠️ Task 2: Cleanup Global Event Listeners (Masalah 16 - Baris 514)

**Deskripsi**: Event listener global (`click` untuk menutup sidebar, `resize`) didaftarkan tanpa pernah dibersihkan. Ini menyebabkan memory leak saat komponen di-mount ulang.

**Perbaikan (React):**
```jsx
// Di komponen yang mendaftarkan global click listener (misalnya App atau CartSidebar)
useEffect(() => {
    function handleClickOutside(e) {
        if (e.target.closest('.cart-sidebar') || e.target.closest('.cart-icon')) return;
        closeCart();
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
}, [closeCart]);
```

**Perbaikan (Vue):**
```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'

function handleClickOutside(e) {
    if (e.target.closest('.cart-sidebar') || e.target.closest('.cart-icon')) return;
    closeCart();
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>
```

**Yang harus diperiksa:**
1. `document.addEventListener('click', ...)` — untuk close-on-outside-click
2. `window.addEventListener('resize', ...)` — untuk resize handler
3. `setTimeout` / `setInterval` yang belum di-clear

### ✅ Acceptance Criteria:
- [ ] Setiap `addEventListener` memiliki pasangan `removeEventListener` di cleanup
- [ ] Setiap `setTimeout` / `setInterval` memiliki `clearTimeout` / `clearInterval` di cleanup
- [ ] React: Cleanup function dikembalikan dari `useEffect`
- [ ] Vue: `onUnmounted` membersihkan semua listener
- [ ] Buka React DevTools/Vue DevTools → mount/unmount komponen berulang kali → tidak ada listener yang menumpuk
- [ ] Profiling memory: tidak ada trend naik (memory leak) saat komponen di-toggle berulang kali

---

## 🛠️ Task 3: Eliminasi DOM Query Berulang (Masalah 8 & 11)

**Deskripsi**: Fungsi `updateCartDisplay()` dan `renderProducts()` melakukan `document.getElementById(...)` setiap kali dipanggil. Dengan framework, ini seharusnya sudah tidak relevan.

**Verification:** Pastikan tidak ada `document.getElementById`, `document.querySelector`, atau `document.createElement` yang tersisa di codebase setelah migrasi framework.

### ✅ Acceptance Criteria:
- [ ] Grep codebase: 0 hasil untuk `document.getElementById`
- [ ] Grep codebase: 0 hasil untuk `document.querySelector` (kecuali di test utilities)
- [ ] Grep codebase: 0 hasil untuk `.innerHTML =`
- [ ] Semua rendering menggunakan JSX (React) atau template (Vue)

---

## 🎯 Kriteria Penerimaan Global
- [ ] Seluruh 3 task di atas terverifikasi
- [ ] Tidak ada memory leak (profiling Chrome DevTools > Memory tab)
- [ ] Tidak ada console warning terkait event listener atau deprecated API
