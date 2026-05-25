import React from 'react';
import { CartItem } from './CartItem';
import { useCart } from '../hooks/useCart';

/**
 * CartSidebar displays the shopping cart items in a sliding drawer panel.
 */
export const CartSidebar = React.forwardRef(({ isOpen, onClose, cartIconRef }, ref) => {
  const {
    cart,
    isCheckingOut,
    totalPrice,
    updateQuantity,
    setQuantity,
    checkout,
  } = useCart();

  // Close when clicking the overlay or when checking out
  const handleClose = () => {
    if (!isCheckingOut) {
      onClose();
    }
  };

  return (
    <div
      ref={ref}
      className={`cart-sidebar ${isOpen ? 'open' : ''}`}
      aria-hidden={!isOpen}
    >
      <div className="cart-header">
        <h2>購物車</h2>
        <button
          className="close-cart"
          onClick={handleClose}
          disabled={isCheckingOut}
          aria-label="Close cart sidebar"
        >
          &times;
        </button>
      </div>

      <div className="cart-items-container">
        {cart.length === 0 ? (
          <p className="cart-empty-message">購物車是空的</p>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              updateQuantity={updateQuantity}
              setQuantity={setQuantity}
            />
          ))
        )}
      </div>

      <div className="cart-total">
        <div className="total-price">
          總計: NT$ <span>{totalPrice}</span>
        </div>
        <button
          className="checkout-btn"
          onClick={checkout}
          disabled={isCheckingOut || cart.length === 0}
        >
          {isCheckingOut ? '⏳ Memproses...' : '結帳'}
        </button>
      </div>
    </div>
  );
});

CartSidebar.displayName = 'CartSidebar';
