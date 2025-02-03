import {useCallback, useRef} from 'react';

const useDebounce = (callback: (...args: string[]) => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounceCallback = useCallback(
    (...args: string[]) => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debounceCallback;
};

export default useDebounce;
