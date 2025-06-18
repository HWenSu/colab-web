"use client";
import APIFetcher from "@/components/APIFetcher";
import ProductCard from "@/components/ProductCard";
import { apiUrls } from "@/APIConnection";

const WomenPage = () => {
  return (
    <div className="pt-30">
      {/* 女裝款式選染 */}
      <section>
        <APIFetcher url={apiUrls.api_url_path_g}>
          {(products) => {
            const womenProducts = products.filter(
              (product) => product.tSex.toLowerCase() === "women"
            );
            return (
              <ul className="products-list-container">
                {womenProducts &&
                  womenProducts.map((product) => (
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

export default WomenPage;
