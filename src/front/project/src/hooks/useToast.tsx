import React, { createContext, useContext, useState, useCallback } from 'react';

export type ToastVariant = 'success' | 'error' | 'info'  | 'destructive';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  createdAt: number;
}

interface ToastContextType {
  toasts: Toast[];
  toast: (props: { title?: string; description?: string; variant?: ToastVariant }) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(
    ({ title, description, variant = 'info' }: { title?: string; description?: string; variant?: ToastVariant }) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [
        ...prev,
        {
          id,
          title,
          description,
          variant,
          createdAt: Date.now(),
        },
      ]);

      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};