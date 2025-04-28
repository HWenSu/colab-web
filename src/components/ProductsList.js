import APIFetcher from "./APIFetcher";
import ProductCard from "@/components/ProductCard";


const ProductsList = ({url}) => {
  return (
    <section>
      <APIFetcher url={url}>
        {(products) => (
          <ul className="products-list-container">
            {products &&
              products.map((product) => (
                <ProductCard
                  key={product.tProductStyleSysCode}
                  product={product}
                />
              ))}
          </ul>
        )}
      </APIFetcher>
    </section>
  );
}

export default ProductsList