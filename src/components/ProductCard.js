import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const firstImage = product.tProductStylePicCode[0];
  const productName = product.tStyleName.toUpperCase();
  const constructure = product.constructure?.toUpperCase();
  const description = product.tDescription?.toUpperCase();


  return (
    <li className="product-card">
      <Link href={`/home_label/products/garment/${product.tProductStyleSysCode}`}>
        <div className="product-img-container">
          <Image
            src={firstImage}
            className=""
            alt={product.tProductStyleCode}
            width={300}
            height={40}
          />
        </div>
        <div className="title">
          <div>
            <h3>{productName}</h3> // {product.style_no}
          </div>
          {/* <p>{constructure && constructure}</p> */}
        </div>
        <div className="description">
          <p>{description && description}</p>
        </div>
      </Link>
    </li>
  );
};

export default ProductCard