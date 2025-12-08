import { useEffect, useState } from "react";

export function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    // value가 바뀔 때마다 이전 타이머 취소
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
