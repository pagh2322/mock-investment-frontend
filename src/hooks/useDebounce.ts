import { useEffect, useState } from "react";

const useDebounce = (keyword: string) => {
  const [debouncedValue, setDebouncedValue] = useState(keyword)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(keyword)
    }, 232);

    return () => clearTimeout(timer);
  }, [keyword]);

  return debouncedValue;
};

export default useDebounce;