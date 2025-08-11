import React from 'react';
import { X } from 'lucide-react';
import { Check, AlertTriangle, Info } from 'lucide-react';
import { cva } from 'class-variance-authority';

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: 'success' | 'error' | 'info';
  onClose: (id: string) => void;
}

// Define toast variants
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
  {
    variants: {
      variant: {
        success: "bg-green-50 border-green-200",
        error: "bg-red-50 border-red-200",
        info: "bg-blue-50 border-blue-200",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const iconMap = {
  success: <Check className="h-5 w-5 text-green-600" />,
  error: <AlertTriangle className="h-5 w-5 text-red-600" />,
  info: <Info className="h-5 w-5 text-blue-600" />,
};

const Toast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  variant = 'info',
  onClose,
}) => {
  return (
    <div 
      className={toastVariants({ variant })}
      style={{ 
        animation: 'slideIn 0.2s ease-out',
      }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {iconMap[variant]}
        </div>
        <div className="flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${
              variant === 'success' ? 'text-green-900' : 
              variant === 'error' ? 'text-red-900' : 
              'text-blue-900'
            }`}>
              {title}
            </h3>
          )}
          {description && (
            <p className={`mt-1 text-sm ${
              variant === 'success' ? 'text-green-700' : 
              variant === 'error' ? 'text-red-700' : 
              'text-blue-700'
            }`}>
              {description}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={() => onClose(id)}
        className={`absolute right-2 top-2 rounded-md p-1 ${
          variant === 'success' ? 'text-green-600 hover:bg-green-100' : 
          variant === 'error' ? 'text-red-600 hover:bg-red-100' : 
          'text-blue-600 hover:bg-blue-100'
        } transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          variant === 'success' ? 'focus:ring-green-500' : 
          variant === 'error' ? 'focus:ring-red-500' : 
          'focus:ring-blue-500'
        } focus:ring-offset-white`}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;