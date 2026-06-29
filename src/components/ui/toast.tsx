import * as React from 'react';
import { X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useEffect, useState } from 'react';

const toastVariants = cva(
  'flex w-full max-w-sm items-center space-x-4 rounded-border border p-4 text-sm shadow-lg transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'border-primary bg-primary text-primary-foreground',
        destructive: 'border-destructive bg-destructive text-destructive-foreground',
        success: 'border-success bg-success text-success-foreground',
        warning: 'border-warning bg-warning text-warning-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface ToastProps {
  variant?: VariantProps<typeof toastVariants>['variant'];
  title: string;
  description?: string;
  onClose?: () => void;
  duration?: number; // milliseconds
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, title, description, onClose, duration = 5000 }, ref) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }, [duration, onClose]);

    return (
      <div
        ref={ref}
        className={toastVariants({ variant, className })}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-md bg-variant/10 text-variant">
          {/* Icon based on variant could be added here */}
          <span className="sr-only">Info</span>
        </div>
        <div className="space-y-1">
          <h3 className="font-medium">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <button
          onClick={onClose}
          className="ml-auto h-4 w-4 rounded-md text-muted-foreground hover:bg-muted/20"
          aria-label="Close"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    );
  }
);

Toast.displayName = 'Toast';

interface UseToastReturn {
  toast: (props: Omit<ToastProps, 'onClose'> & { id?: string }) => void;
  dismiss: (id?: string) => void;
}

/**
 * Hook to manage toast notifications
 */
export function useToast() {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([]);

  const toast = (props: Omit<ToastProps, 'onClose'> & { id?: string }) => {
    const id = props.id ?? Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...props, id, onClose: () => dismiss(id) }]);
  };

  const dismiss = (id?: string) => {
    if (id) {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    } else {
      setToasts([]);
    }
  };

  return { toast, dismiss };
}

export { Toast };

// ToastProvider component for context-based usage
interface ToastProviderProps {
  children: React.ReactNode;
  defaultDuration?: number;
}

export const ToastProvider = ({ children, defaultDuration = 5000 }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([]);

  const toast = (props: Omit<ToastProps, 'onClose'> & { id?: string }) => {
    const id = props.id ?? Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...props, id, onClose: () => dismiss(id), duration: props.duration ?? defaultDuration }]);
  };

  const dismiss = (id?: string) => {
    if (id) {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    } else {
      setToasts([]);
    }
  };

  return (
    <>
      {toasts.map((toastProps) => (
        <Toast key={toastProps.id} {...toastProps} />
      ))}
      {/* Expose toast functions via context if needed */}
    </>
  );
};

ToastProvider.displayName = 'ToastProvider';