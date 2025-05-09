"use client"
import APIFetcher from "@/components/APIFetcher";
import ProductCard from "@/components/ProductCard";

const api_url_path = "http://localhost:53866/api/product/garment";

const MenPage = () => {
  return (
    <div className="pt-30">
      {/* 男裝款式選染 */}
      <section>
        <APIFetcher url={api_url_path}>
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
