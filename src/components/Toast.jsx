import React from 'react';

/**
 * Toast item component displaying individual notification message
 */
export function ToastItem({ id, message, onClose }) {
  return (
    <div className="toast" role="alert">
      <span className="toast-text">{message}</span>
      <button className="toast-close" onClick={() => onClose(id)} aria-label="Close notification">
        &times;
      </button>
    </div>
  );
}

/**
 * Container component for active toast notifications, positioned in the top-right corner
 */
export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          id={toast.id}
          message={toast.message}
          onClose={removeToast}
        />
      ))}
    </div>
  );
}
