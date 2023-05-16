import { useCallback, useState } from "react";

export default function useFetch(fetcher) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = useCallback(() => {
    setIsLoading(true);
    fetcher()
      .then((res) => {
        setData(res);
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return { data, error, isLoading, handleFetch };
}
