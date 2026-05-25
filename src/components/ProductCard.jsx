import React from 'react';

// Maps product IDs to premium gradient themes and icons
const PRODUCT_THEMES = {
  1: { grad: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', icon: '🎧', tag: 'Audio' },
  2: { grad: 'linear-gradient(135deg, #b19ffb 0%, #5d3df8 100%)', icon: '⌚', tag: 'Wearable' },
  3: { grad: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', icon: '⚡', tag: 'Power' },
  4: { grad: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', icon: '🖱️', tag: 'Input' },
  5: { grad: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', icon: '⌨️', tag: 'Input' },
  6: { grad: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)', icon: '📷', tag: 'Video' },
  7: { grad: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)', icon: '💾', tag: 'Storage' },
  8: { grad: 'linear-gradient(135deg, #f9d423 0%, #ff4e50 100%)', icon: '🔊', tag: 'Audio' },
};

export function ProductCard({ product, onAddToCart }) {
  const theme = PRODUCT_THEMES[product.id] || {
    grad: 'linear-gradient(135deg, #e2ebf0 0%, #cfd9df 100%)',
    icon: '📦',
    tag: 'Utility',
  };

  return (
    <div className="product-card">
      <div className="product-image-container" style={{ background: theme.grad }}>
        <span className="product-card-tag">{theme.tag}</span>
        <span className="product-card-emoji" role="img" aria-label={product.name}>
          {theme.icon}
        </span>
      </div>
      <div className="product-card-info">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-price-container">
          <span className="price-currency">NT$</span>
          <span className="product-price">{product.price.toLocaleString()}</span>
        </div>
        <button
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product)}
        >
          加入購物車
        </button>
      </div>
    </div>
  );
}
