import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  
  console.log(product)
  
  const firstImage =
    product.tProductStylePicCode?.[0] || product.tProductPETechPicCode[0]; ;
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
            alt={product.tProductStyleCode || product.tArticleNo}
            width={300}
            height={40}
          />
        </div>
        <div className="title">
          <div>
            <h3>{productName}</h3> / { product.style_no}
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