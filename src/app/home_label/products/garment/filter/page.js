// /app/home_label/products/garment/filter/page.js
"use client";
import { useSearchParams } from "next/navigation";
import APIFetcher from "@/components/APIFetcher";
import ProductCard from "@/components/ProductCard";
import { apiUrls } from "@/APIConnection";
import { Suspense } from "react"; // 新增 Suspense

const FilterContent = () => {
  const searchParams = useSearchParams();
  const sex = searchParams.get("sex")?.toLowerCase() || "";
  const styleType = searchParams.get("styleType")?.toLowerCase() || "";

  return (
    <APIFetcher url={apiUrls.api_url_path_g}>
      {(products) => {
        const filtered = products.filter(
          (product) =>
            product.tSex?.trim().toLowerCase() === sex && // 安全访问属性
            product.tStyleTypeName?.trim().toLowerCase() === styleType
        );
        return (
          <ul className="products-list-container">
            {filtered.map((product) => (
              <ProductCard
                key={product.tProductStyleCode}
                product={product}
              />
            ))}
          </ul>
        );
      }}
    </APIFetcher>
  );
};

const FilterPage = () => (
  <div className="pt-30">
    <section>
      {/* 用 Suspense 包裹避免预渲染崩溃 */}
      <Suspense fallback={<div>Loading filters...</div>}>
        <FilterContent />
      </Suspense>
    </section>
  </div>
);


export default FilterPage;
