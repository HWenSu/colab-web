"use client";
import { useState, useEffect } from "react";

const APIFetcher = ({ url, children, fallback }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        //假資料測試
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setIsError(true);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  if (isLoading) {
    return <div>{fallback || "LOADING..."}</div>;
  }

  if (isError) {
    return <div>Something wrong!</div>;
  }

  // 確保 children 是一個函數，並且正確調用它
  if (typeof children === "function") {
    return children(data);
  }

  return null;
};

export default APIFetcher;
