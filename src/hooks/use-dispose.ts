import { useEffect } from 'react';

interface Disposable {
  dispose: () => void;
}

/**
 * Hook to automatically dispose of resources when component unmounts.
 * Useful for cleaning up subscriptions, observers, etc.
 */
export function useDispose(disposable: Disposable | (() => void)): void {
  useEffect(() => {
    return () => {
      if (typeof disposable === 'function') {
        disposable();
      } else if (disposable && typeof disposable.dispose === 'function') {
        disposable.dispose();
      }
    };
  }, [disposable]);
}

export default useDispose;