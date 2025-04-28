"use client";
import APIFetcher from "@/components/APIFetcher";
import ProductCard from "@/components/ProductCard";

const WomenPage = () => {
  return (
    <div className="pt-30">
      {/* 女裝款式選染 */}
      <section>
        <APIFetcher url={"/data/Product_Garment.json"}>
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
