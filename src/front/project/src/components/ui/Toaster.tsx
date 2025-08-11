import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Toast from './Toast';
import { useToast } from '../../hooks/useToast';

export const Toaster: React.FC = () => {
  const { toasts, removeToast } = useToast();

  // Auto dismiss toasts after 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      toasts.forEach((toast) => {
        if (Date.now() - toast.createdAt > 5000) {
          removeToast(toast.id);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [toasts, removeToast]);

  if (toasts.length === 0) return null;

  return createPortal(
    <div 
      className="fixed top-0 right-0 p-4 z-50 w-full max-w-sm flex flex-col gap-2"
      style={{
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={removeToast}
        />
      ))}
    </div>,
    document.body
  );
};