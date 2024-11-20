import { useEffect, useState } from "react";
import { ProductType } from "../types";
import instance from "../axios/api";
import useDebounce from "./useDebounce";

const useSearch = (searchValue: string) => {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<ProductType[]>([]);
  const debounced = useDebounce(searchValue, 1000);
  useEffect(() => {
    (async () => {
      if (debounced === "") {
        return;
      }
      setLoading(true);
      const res = await instance.get(`products?q=${debounced}`);
      setSearchResult(res.data);
      setLoading(false);
    })();
  }, [debounced]);
  return { loading, searchResult, debounced };
};
export default useSearch;
