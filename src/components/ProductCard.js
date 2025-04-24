import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const firstImage = product.image[0]
  const productName = product.name.toUpperCase();
  const constructure = product.constructure?.toUpperCase();
  const description = product.description?.toUpperCase();


  return (
    <li className="product-card">
      <Link href={`/products/${product.id}`}>
        <div className="product-img-container">
          <Image
            src={firstImage}
            className=""
            alt={product.id}
            width={300}
            height={40}
          />
        </div>
        <div className="title">
          <div>
            <h3>{productName}</h3> // {product.style_no}
          </div>
          <p>{constructure && constructure}</p>
        </div>
        <div className="description">
          <p>{description&& description}</p>
        </div>
      </Link>
    </li>
  );
};

export default ProductCard