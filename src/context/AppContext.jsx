import React, { createContext, useState, useCallback } from 'react';

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Products states
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Cart states
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Toast notifications states
  const [toasts, setToasts] = useState([]);

  // Confirmation Dialog states
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Ya, Lanjutkan',
    cancelText: 'Batal',
    onConfirm: null,
    onCancel: null,
  });

  // Toast actions
  const showToast = useCallback((message) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message }]);
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Dialog actions
  const triggerDialog = useCallback(({ title, message, onConfirm, onCancel, confirmText, cancelText }) => {
    setDialog({
      isOpen: true,
      title,
      message,
      confirmText: confirmText || 'Ya, Lanjutkan',
      cancelText: cancelText || 'Batal',
      onConfirm: () => {
        if (onConfirm) onConfirm();
        setDialog((prev) => ({ ...prev, isOpen: false }));
      },
      onCancel: () => {
        if (onCancel) onCancel();
        setDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  }, []);

  const closeDialog = useCallback(() => {
    setDialog((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        isLoadingProducts,
        setIsLoadingProducts,
        productsError,
        setProductsError,
        searchTerm,
        setSearchTerm,
        cart,
        setCart,
        isCartOpen,
        setIsCartOpen,
        isCheckingOut,
        setIsCheckingOut,
        toasts,
        showToast,
        removeToast,
        dialog,
        triggerDialog,
        closeDialog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
