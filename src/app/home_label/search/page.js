"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductsList from "@/components/ProductsList";
import useApiFetch from "@/hooks/useApiFetch";
import { apiUrls } from "@/APIConnection";

const SearchContent = () => {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q")?.toLowerCase() || "";

  const {
    data: garmentDetails,
    loading: garmentLoading,
    error: garmentError,
  } = useApiFetch(apiUrls.api_url_path_g);

  const {
    data: PETechDetails,
    loading: PETechLoading,
    error: PETechError,
  } = useApiFetch(apiUrls.api_url_path_pe);

  // 在資料加載完成時格式化
  useEffect(() => {
    if (garmentDetails && PETechDetails) {
      const formattedData = [
        ...garmentDetails.map((item) => ({ ...item, type: "product" })),
        ...PETechDetails.map((item) => ({ ...item, type: "article" })),
      ];
      setData(formattedData);
    } else if (garmentError || PETechError) {
      console.error("資料加載錯誤:", garmentError || PETechError);
      setData([]);
    }
  }, [garmentDetails, PETechDetails, garmentError, PETechError]);

  // 過濾資料
  useEffect(() => {
    if (searchTerm && data.length > 0) {
      const filteredResults = data.filter((item) =>
        Object.values(item).some((value) => {
          if (Array.isArray(value)) {
            return value.some((v) =>
              v?.toString().toLowerCase().includes(searchTerm)
            );
          }
          return value?.toString().toLowerCase().includes(searchTerm);
        })
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [data, searchTerm]);

  // 渲染時檢查載入和錯誤狀態
  if (garmentLoading || PETechLoading)
    return <p className="text-center">載入中...</p>;
  if (garmentError || PETechError)
    return (
      <p className="text-red-500 text-center">
        無法加載資料: {garmentError?.message || PETechError?.message}
      </p>
    );

  return (
    <>
      {results.length > 0 ? (
        <ProductsList filteredData={results} />
      ) : (
        <p className="text-gray-500 text-center">
          Oops… 沒有找到符合「{searchTerm}」的結果，請試試別的關鍵字。
        </p>
      )}
    </>
  );
};


const SearchPage = () => (
  <div className="pt-[10rem]">
    <Suspense fallback={<p className="text-center">載入中...</p>}>
      <SearchContent />
    </Suspense>
  </div>
);

export default SearchPage;

