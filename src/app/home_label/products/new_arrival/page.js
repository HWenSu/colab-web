"use client";
import APIFetcher from "@/components/APIFetcher";
import ProductCard from "@/components/ProductCard";

const  api_url_path_g = "/data/Product_Garment.json";
// const api_url_path_g = "http://localhost:53866/api/product/garment";


const NewArrivalPage = () => {

  return (
    <div className="pt-30">
      <section>
        <APIFetcher url={api_url_path_g}>
          {(products) => {
            const filtered = products.filter(
              (product) =>
                product.tNewArrival === true
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

export default NewArrivalPage;
