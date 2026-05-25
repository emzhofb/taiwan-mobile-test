import React, { useState, useEffect } from 'react';

/**
 * CartItem renders a single item row in the shopping cart sidebar.
 * It features a direct quantity editor with typing buffers and validation checks.
 */
export function CartItem({ item, updateQuantity, setQuantity }) {
  // Local input state to support natural typing (e.g. temporary blank spaces)
  const [inputValue, setInputValue] = useState(item.quantity.toString());

  // Keep local state in sync with external global cart quantity changes
  useEffect(() => {
    setInputValue(item.quantity.toString());
  }, [item.quantity]);

  const handleChange = (e) => {
    const val = e.target.value;

    // Allow empty input so user can backspace to type a new value
    if (val === '') {
      setInputValue('');
      return;
    }

    const parsed = parseInt(val, 10);

    // Ignore negative numbers or invalid number entries (NaN)
    if (isNaN(parsed) || parsed < 0) {
      return;
    }

    setInputValue(parsed.toString());

    // If 0, trigger the confirm delete dialog
    if (parsed === 0) {
      setQuantity(item.product.id, 0);
    } else {
      setQuantity(item.product.id, parsed);
    }
  };

  const handleBlur = () => {
    // If input is left empty or <= 0 upon leaving the field, restore to 1
    if (inputValue === '' || parseInt(inputValue, 10) <= 0) {
      setQuantity(item.product.id, 1);
      setInputValue('1');
    }
  };

  // Inline styling helper for generic placeholder matching original styles
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <span style={{ fontSize: '24px' }}>📦</span>
      </div>
      <div className="cart-item-details">
        <div className="cart-item-title">{item.product.name}</div>
        <div className="cart-item-price">NT$ {item.product.price}</div>
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() => updateQuantity(item.product.id, -1)}
            aria-label="Decrease quantity"
          >
            &minus;
          </button>
          <input
            type="number"
            className="quantity-input"
            value={inputValue}
            min="0"
            onChange={handleChange}
            onBlur={handleBlur}
            aria-label={`Quantity for ${item.product.name}`}
          />
          <button
            className="quantity-btn"
            onClick={() => updateQuantity(item.product.id, 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
