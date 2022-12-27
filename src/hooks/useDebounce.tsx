import { useEffect, useRef } from 'react';

function useDebounce(callBack: () => void, debounceTime = 500, dependencies: any[]) {
  const firstTime = useRef(true);
  const previous = useRef<number>();

  useEffect(() => {
    if (!firstTime.current) {
      clearTimeout(previous.current);
      previous.current = setTimeout(callBack, debounceTime) as unknown as number;
    } else {
      firstTime.current = false;
    }
    return () => {
      clearTimeout(previous.current);
    };
  }, [...dependencies, debounceTime]);
}

export default useDebounce;
