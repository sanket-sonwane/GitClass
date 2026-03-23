import { useState, useMemo } from 'react';

export function useSearch(items, keys = ['name', 'description']) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase();
    return items.filter((item) =>
      keys.some((key) => item[key]?.toLowerCase().includes(lower))
    );
  }, [items, query, keys]);

  return { query, setQuery, filtered };
}
