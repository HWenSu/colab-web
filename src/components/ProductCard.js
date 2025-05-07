import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const firstImage = product.tFilePath?.[0] || "";
  const secondImage = product.tFilePath?.[1] || firstImage; // 沒第二張就 fallback 成第一張
  const productName = product.tStyleName?.toUpperCase() || product.tArticleNo;

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
          {/* 第一張圖片 */}
          <Image
            src={firstImage}
            alt={product.tProductStyleCode || product.tArticleNo}
            width={300}
            height={40}
            className="first-img"
          />
          {/* 第二張圖片（滑入時推進） */}
          <Image
            src={secondImage}
            alt="product-image-2"
            fill
            className="second-img"
          />
        </div>
        <div className="title">
          <div>
            <h3>{productName}</h3> / {product.tProductStyleCode}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductCard