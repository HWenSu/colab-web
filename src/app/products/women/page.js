"use client";
import APIFetcher from "@/components/APIFetcher";
import ProductCard from "@/components/ProductCard";

const page = () => {
  return (
    <div className="pt-30">
      {/* 女裝款式選染 */}
      <section>
        <APIFetcher url={"/data/productsData.json"}>
          {(products) => {
            const manProducts = products.filter(
              (product) => product.category.toLowerCase() === "women"
            )
            return (
              <ul className="products-list-container">
                {manProducts &&
                  manProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </ul>
            );
          }}
        </APIFetcher>
      </section>
    </div>
  );
};

export default page;
