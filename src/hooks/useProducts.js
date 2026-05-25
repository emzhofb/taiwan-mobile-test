import { useContext, useEffect, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { useDebounce } from './useDebounce';

const MOCK_PRODUCTS = [
  { id: 1, name: '無線藍牙耳機', price: 2999, image: 'earphones.jpg' },
  { id: 2, name: '智慧手錶', price: 8999, image: 'smartwatch.jpg' },
  { id: 3, name: '便攜式充電器', price: 1299, image: 'powerbank.jpg' },
  { id: 4, name: '無線滑鼠', price: 899, image: 'mouse.jpg' },
  { id: 5, name: '機械鍵盤', price: 3999, image: 'keyboard.jpg' },
  { id: 6, name: '網路攝影機', price: 2199, image: 'webcam.jpg' },
  { id: 7, name: 'USB隨身碟', price: 599, image: 'usb.jpg' },
  { id: 8, name: '桌面擴音器', price: 1599, image: 'speaker.jpg' },
];

export function useProducts() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useProducts must be used within an AppProvider');
  }

  const {
    products,
    setProducts,
    isLoadingProducts,
    setIsLoadingProducts,
    productsError,
    setProductsError,
    searchTerm,
    setSearchTerm,
  } = context;

  // Fetch products simulation with error handling
  const loadProducts = async (forceSuccess = false) => {
    setIsLoadingProducts(true);
    setProductsError(null);

    // Simulate API delay
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        // 25% chance of failure unless forceSuccess is true
        const shouldFail = !forceSuccess && Math.random() < 0.25;
        if (shouldFail) {
          reject(new Error('Gagal memuat produk dari server.'));
        } else {
          resolve(MOCK_PRODUCTS);
        }
      }, 1500);
    })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error('Load products error:', err);
        setProductsError('Gagal memuat produk. Silakan coba lagi.');
      })
      .finally(() => {
        setIsLoadingProducts(false);
      });
  };

  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Filtered products list based on debounced search
  const filteredProducts = useMemo(() => {
    const trimmedTerm = debouncedSearchTerm.trim().toLowerCase();
    
    // Log search execution to console as required by ISSUE-02d
    console.log(`[Search Log] Executing product filter for: "${trimmedTerm}"`);

    if (!trimmedTerm) {
      return products;
    }

    return products.filter((product) =>
      product.name.toLowerCase().includes(trimmedTerm)
    );
  }, [products, debouncedSearchTerm]);

  return {
    products,
    isLoading: isLoadingProducts,
    error: productsError,
    searchTerm,
    setSearchTerm,
    filteredProducts,
    loadProducts,
  };
}
