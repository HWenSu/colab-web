"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductsList from "@/components/ProductsList";
import useApiFetch from "@/hooks/useApiFetch";

export default function SearchPage() {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q")?.toLowerCase() || "";

  // 使用 useApiFetch 載入所有資料
  // const {
  //   data: fabricDetails,
  //   loading: fabricLoading,
  //   error: fabricError,
  // } = useApiFetch("/data/Product_Fabric.json");

  const {
    data: garmentDetails,
    loading: garmentLoading,
    error: garmentError,
  } = useApiFetch("/data/Product_Garment.json");

  const {
    data: PETechDetails,
    loading: PETechLoading,
    error: PETechError,
  } = useApiFetch("/data/Product_PETech.json");

  //在資料加載完成時格式化
  useEffect(() => {
    if (garmentDetails && PETechDetails) {
      // 為每組資料添加 type 標識，並合併
      const formattedData = [
        // ...fabricDetails.map((item) => ({ ...item, type: "fabric" })),
        ...garmentDetails.map((item) => ({ ...item, type: "product" })),
        ...PETechDetails.map((item) => ({ ...item, type: "article" })),
      ];
      setData(formattedData);
    } else if (garmentError || PETechError) {
      console.error("資料加載錯誤:", garmentError || PETechError);
      setData([]); // 錯誤時清空資料，避免基於不完整資料渲染
    }
  }, [garmentDetails, PETechDetails]);

  //過濾資料
  useEffect(() => {
    if (data.length) {
      const filteredResults = data.filter((item) =>
        Object.values(item).some((value) => {
          if (Array.isArray(value)) {
            return value.some((v) =>
              v.toString().toLowerCase().includes(searchTerm)
            );
          }
          return value?.toString().toLowerCase().includes(searchTerm);
        })
      );
      setResults(filteredResults);
    }
  }, [data, searchTerm]);

  // 渲染時檢查載入和錯誤狀態
  if (garmentLoading || PETechLoading) return <p>載入中...</p>;
  if (garmentError || PETechError)
    return (
      <p className="text-red-500">
        無法加載資料: {garmentError || PETechError}
      </p>
    );

  return (
    <div className="pt-[10rem]">
      {results.length > 0 ? (
        <ProductsList filteredData={results} />
      ) : (
        <p className="text-gray-500 text-center">
          Oops… no results found. Please try different keywords.
        </p>
      )}
    </div>
  );
}
