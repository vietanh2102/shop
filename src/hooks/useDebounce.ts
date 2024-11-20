import { useEffect, useState } from "react";
const useDebounce = (value: string, delay: number) => {
  const [debounce, setDebounce] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounce(value), delay);
    return () => clearTimeout(handler);
  }, [delay, value]);

  return debounce;
};
export default useDebounce;
