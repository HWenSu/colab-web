import APIFetcher from "./APIFetcher";
import ProductCard from "@/components/ProductCard";


const ProductsList = ({url, filteredData}) => {
  // 如果有 filteredData，直接使用它來渲染
  if (filteredData && filteredData.length > 0) {
    return (
      <section>
        <ul className="products-list-container">
          {filteredData.map((product, index) => (
            <ProductCard
              key={product.tFilePath ? product.tFilePath[0] : index}
              product={product}
            />
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section>
      <APIFetcher url={url}>
        {(products) => (
          <ul className="products-list-container">
            {products &&
              products.map((product) => (
                <ProductCard
                  key={product.tFilePath || product.tFilePath}
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