import { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';

export function useCart() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useCart must be used within an AppProvider');
  }

  const {
    cart,
    setCart,
    isCartOpen,
    setIsCartOpen,
    isCheckingOut,
    setIsCheckingOut,
    showToast,
    triggerDialog,
  } = context;

  // Compute total quantity reactively using useMemo
  const totalQuantity = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Compute total price reactively using useMemo
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  // Add a product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });

    // Show feedback toast notification
    showToast(`✅ ${product.name} berhasil ditambahkan ke keranjang!`);
  };

  // Remove a product from the cart completely
  const removeFromCart = (productId) => {
    const item = cart.find((i) => i.product.id === productId);
    if (!item) return;

    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    showToast(`🗑️ ${item.product.name} dihapus dari keranjang.`);
  };

  // Update item quantity by a relative change (+1, -1)
  const updateQuantity = (productId, change) => {
    const item = cart.find((i) => i.product.id === productId);
    if (!item) return;

    const newQty = item.quantity + change;
    if (newQty <= 0) {
      // Trigger confirmation dialog for deletion
      triggerDialog({
        title: 'Konfirmasi Hapus Item',
        message: `Apakah Anda yakin ingin menghapus "${item.product.name}" dari keranjang?`,
        confirmText: 'Ya, Hapus',
        cancelText: 'Batal',
        onConfirm: () => {
          setCart((prev) => prev.filter((i) => i.product.id !== productId));
          showToast(`🗑️ ${item.product.name} dihapus dari keranjang.`);
        },
        onCancel: () => {
          // Restore to 1
          setCart((prev) =>
            prev.map((i) =>
              i.product.id === productId ? { ...i, quantity: 1 } : i
            )
          );
        },
      });
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === productId ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  // Set quantity directly (supports multiples)
  const setQuantity = (productId, newQty) => {
    const item = cart.find((i) => i.product.id === productId);
    if (!item) return;

    if (newQty <= 0) {
      triggerDialog({
        title: 'Konfirmasi Hapus Item',
        message: `Apakah Anda yakin ingin menghapus "${item.product.name}" dari keranjang?`,
        confirmText: 'Ya, Hapus',
        cancelText: 'Batal',
        onConfirm: () => {
          setCart((prev) => prev.filter((i) => i.product.id !== productId));
          showToast(`🗑️ ${item.product.name} dihapus dari keranjang.`);
        },
        onCancel: () => {
          // Restore to 1
          setCart((prev) =>
            prev.map((i) =>
              i.product.id === productId ? { ...i, quantity: 1 } : i
            )
          );
        },
      });
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === productId ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  // Checkout process with confirmation dialog and double-submit prevention
  const checkout = () => {
    if (cart.length === 0 || isCheckingOut) return;

    triggerDialog({
      title: 'Konfirmasi Checkout',
      message: `Apakah Anda yakin ingin checkout dengan total belanjaan NT$ ${totalPrice}?`,
      confirmText: 'Ya, Lanjutkan',
      cancelText: 'Batal',
      onConfirm: async () => {
        setIsCheckingOut(true);
        try {
          // Simulate checkout network latency (2 seconds)
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setCart([]);
          setIsCartOpen(false);
          showToast('🎉 Checkout sukses! Terima kasih.');
        } catch (err) {
          console.error(err);
          showToast('❌ Checkout gagal. Silakan coba lagi.');
        } finally {
          setIsCheckingOut(false);
        }
      },
    });
  };

  return {
    cart,
    isCartOpen,
    setIsCartOpen,
    isCheckingOut,
    totalQuantity,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    setQuantity,
    checkout,
  };
}
