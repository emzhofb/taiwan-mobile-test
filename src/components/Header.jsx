import React from 'react';

/**
 * Header component representing the main navigation bar.
 * Forwards a ref for the cart icon button to enable outside click detection.
 */
export const Header = React.forwardRef(({ totalQuantity, onCartToggle }, ref) => {
  return (
    <header className="header">
      <div className="header-logo">
        <span className="logo-icon">💎</span>
        <h1>精品商店</h1>
      </div>
      <button
        ref={ref}
        id="cartIcon"
        className="cart-icon"
        onClick={onCartToggle}
        aria-label={`Open shopping cart. ${totalQuantity} items inside.`}
      >
        <span className="cart-icon-emoji">🛒</span>
        <span className="cart-text">購物車</span>
        <div className="cart-count" id="cartCount">
          {totalQuantity}
        </div>
      </button>
    </header>
  );
});

Header.displayName = 'Header';
