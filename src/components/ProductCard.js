import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  
  const firstImage = product.tFilePath?.[0] || product.tFilePath[0]; ;
  const productName = product.tStyleName?.toUpperCase() || product.tArticleNo ;
  // const constructure = product.constructure?.toUpperCase();
  const description = product.tDescription?.toUpperCase();


  return (
    <li className="product-card">
      <Link
        href={
          product.tProductStyleCode
            ? `/home_label/products/garment/${product.tProductStyleSysCode}`
            : product.tArticleNo
            ? `/home_label/products/print&emb/${product.tArticleNo}`
            : "#" // 預設路徑，當兩者都不存在時
        }
      >
        <div className="product-img-container">
          <Image
            src={firstImage}
            className=""
            alt={product.tProductStyleCode || product.tProductStyleCode}
            width={300}
            height={40}
          />
        </div>
        <div className="title">
          <div>
            <h3>{productName}</h3> / {product.tProductStyleCode}
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