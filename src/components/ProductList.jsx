import React from 'react';
import { ProductCard } from './ProductCard';
import { SearchBox } from './SearchBox';

/**
 * ProductList renders the list of filtered products in a grid.
 * If no products match the search query, it renders an empty search message.
 */
export function ProductList({
  products,
  filteredProducts,
  searchTerm,
  setSearchTerm,
  onAddToCart,
}) {
  return (
    <div className="product-list-section">
      <div className="product-list-header">
        <h2 className="section-title">熱門商品 (Popular Products)</h2>
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-results" role="status">
          <div className="no-results-emoji">😔</div>
          <p className="no-results-text">
            Produk dengan nama <strong>"{searchTerm}"</strong> tidak ditemukan
          </p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
