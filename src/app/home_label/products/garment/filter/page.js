// /app/home_label/products/garment/filter/page.js
"use client";
import { useSearchParams } from "next/navigation";
import APIFetcher from "@/components/APIFetcher";
import ProductCard from "@/components/ProductCard";
import { apiUrls } from "@/APIConnection";


const FilterPage = () => {
  const searchParams = useSearchParams();
  const sex = searchParams.get("sex")?.toLowerCase();
  const styleType = searchParams.get("styleType")?.toLowerCase();

  return (
    <div className="pt-30">
      <section>
        <APIFetcher url={apiUrls.api_url_path_g}>
          {(products) => {
            const filtered = products.filter(
              (product) =>
                product.tSex.trim().toLowerCase() === sex &&
                product.tStyleTypeName.trim().toLowerCase() === styleType
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
      </section>
    </div>
  );
};

export default FilterPage;
