"use client"
import APIFetcher from "@/components/APIFetcher";
import ProductCard from "@/components/ProductCard";
import { apiUrls } from "@/APIConnection";

const MenPage = () => {
  return (
    <div className="pt-30">
      {/* 男裝款式選染 */}
      <section>
        <APIFetcher url={apiUrls.api_url_path_g}>
          {(products) => {
            const manProducts = products.filter(
              (product) => product.tSex.toLowerCase() === "men"
            );
            return (
              <ul className="products-list-container">
                {manProducts &&
                  manProducts.map((product) => (
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

export default MenPage;
