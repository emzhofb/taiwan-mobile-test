import React, { useEffect, useRef, useContext } from 'react';
import { AppProvider, AppContext } from '../context/AppContext';
import { Header } from './Header';
import { ProductList } from './ProductList';
import { CartSidebar } from './CartSidebar';
import { Dialog } from './Dialog';
import { ToastContainer } from './Toast';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';

/**
 * AppContent houses the main interface. It binds context hooks and sets up lifecycle event listeners.
 */
function AppContent() {
  const {
    filteredProducts,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    loadProducts,
  } = useProducts();

  const {
    totalQuantity,
    isCartOpen,
    setIsCartOpen,
    addToCart,
  } = useCart();

  const { toasts, removeToast, dialog } = useContext(AppContext);

  // Refs for tracking DOM targets without query selectors
  const cartIconRef = useRef(null);
  const sidebarRef = useRef(null);

  // Fetch initial product list on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  // Debounced window resize event logging with lifecycle cleanup
  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        console.log('[Resize Log] Window size changed to:', window.innerWidth);
      }, 200); // 200ms debounce
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Click-outside handler to close the shopping cart sidebar
  useEffect(() => {
    if (!isCartOpen) return;

    const handleClickOutside = (e) => {
      // Close sidebar if click is outside both the sidebar container and the cart icon toggle button
      if (
        sidebarRef.current && !sidebarRef.current.contains(e.target) &&
        cartIconRef.current && !cartIconRef.current.contains(e.target)
      ) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isCartOpen, setIsCartOpen]);

  return (
    <div className="app-wrapper">
      <Header
        ref={cartIconRef}
        totalQuantity={totalQuantity}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
      />

      <main className="main-content">
        {isLoading ? (
          <div className="loading-container" id="loading" role="status">
            <div className="spinner"></div>
            <p>載入中 (Loading products)...</p>
          </div>
        ) : error ? (
          <div className="error-container" role="alert">
            <div className="error-icon">😵</div>
            <p className="error-message">{error}</p>
            {/* Force success on retry button to allow demonstration of success state */}
            <button className="retry-btn" onClick={() => loadProducts(true)}>
              🔄 Coba Lagi
            </button>
          </div>
        ) : (
          <ProductList
            filteredProducts={filteredProducts}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAddToCart={addToCart}
          />
        )}
      </main>

      <CartSidebar
        ref={sidebarRef}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartIconRef={cartIconRef}
      />

      <Dialog
        isOpen={dialog.isOpen}
        title={dialog.title}
        message={dialog.message}
        onConfirm={dialog.onConfirm}
        onCancel={dialog.onCancel}
        confirmText={dialog.confirmText}
        cancelText={dialog.cancelText}
      />

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

/**
 * Root component wrapping AppContent with global AppProvider context.
 */
export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
