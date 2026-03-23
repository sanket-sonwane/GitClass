import { useState, useCallback, useRef } from 'react';

export function useGitHub(fetchFn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cache = useRef({});

  const execute = useCallback(async (...args) => {
    const key = JSON.stringify(args);
    if (cache.current[key]) {
      setData(cache.current[key]);
      setError(null);
      return cache.current[key];
    }
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn(...args);
      cache.current[key] = result;
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  return { data, loading, error, execute };
}
