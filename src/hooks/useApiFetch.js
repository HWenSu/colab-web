// src/hooks/useApiFetch.js
import { useState, useEffect } from "react";

export default function useApiFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        setData(null);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (url) {
      fetchData();
    }
  }, [url]); // 當 url 改變時重新執行 fetch

  return { data, loading, error };
}
