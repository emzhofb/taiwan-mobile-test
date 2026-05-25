import React, { useEffect } from 'react';

/**
 * Reusable Custom Modal Dialog component
 */
export function Dialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Ya, Lanjutkan',
  cancelText = 'Batal',
}) {
  // Listen for the Escape key to close the dialog
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (onCancel) onCancel();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  // Handle click on backdrop overlay
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('dialog-overlay')) {
      if (onCancel) onCancel();
    }
  };

  return (
    <div className="dialog-overlay" onClick={handleOverlayClick} aria-modal="true" role="dialog">
      <div className="dialog-box">
        <h3 className="dialog-title">{title}</h3>
        <p className="dialog-message">{message}</p>
        <div className="dialog-actions">
          <button className="dialog-btn cancel" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="dialog-btn confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
