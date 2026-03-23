import { useState, useEffect } from 'react';

const STORAGE_KEY = 'gitclass_bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggle = (subjectName) => {
    setBookmarks((prev) =>
      prev.includes(subjectName)
        ? prev.filter((b) => b !== subjectName)
        : [...prev, subjectName]
    );
  };

  const isBookmarked = (subjectName) => bookmarks.includes(subjectName);

  return { bookmarks, toggle, isBookmarked };
}
