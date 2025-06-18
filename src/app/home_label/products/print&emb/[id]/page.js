"use client"
import {use, useState} from 'react'
import Image from "next/image";
import APIFetcher from "@/components/APIFetcher";
import ImageCarousel from '@/components/ImageCarousel';
import AddToCartButton from '@/components/AddToCartButton';
import RemoveFromCartButton from '@/components/RemoveFromCartButton';
import { apiUrls } from '@/APIConnection';


export default function ProductPage({ params }) {
  // 確保 params 被正確解析
  const resolvedParams = use(params); // 解包 Promise
  const id = resolvedParams?.id; // 安全存取 id，防止 undefined

  const [isImgOpen, setIsImgOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(0);

  // 判斷商品是否在購物車內
  const [isAdd, setIsAdd] = useState(false);

  const handleImgClicked = (index) => {
    setIsImgOpen(true);
    setClickedIndex(index);
  };

  const handleClose = () => {
    setIsImgOpen(false);
  };

  return (
    <div>
      <APIFetcher url={apiUrls.api_url_path_pe}>
        {(products) => {
          // 確保 id 已初始化後再執行篩選
          const product = Array.isArray(products)
            ? products.find((item) => item.tArticleNo === id)
            : null;

          // 如果找不到產品，顯示錯誤訊息或空狀態
          if (!product) {
            return <div>Product not found</div>;
          }

          // 定義項目變數
          const image = product?.tFilePath;
          const styleNo = product?.tArticleNo;
          const description = product?.tDescription;
          const PEtech = product?.tTechName;

          const firstImage = image ? image[0] : null;
          const restImages = Array.isArray(image) ? image.slice(1) : [];
          return (
            firstImage && (
              <div className="product-info-page">
                {/* 圖片區塊 */}
                <section className="image-section">
                  <div
                    className="product-big-image"
                    onClick={() => handleImgClicked(0)}
                  >
                    <Image
                      src={firstImage}
                      alt="PRODUCT-19"
                      width={400}
                      height={900}
                    />
                  </div>
                  <div className="detail-img-container">
                    {restImages.map((img, index) => (
                      <div
                        className="detail-img"
                        key={img}
                        onClick={() => handleImgClicked(index + 1)}
                      >
                        <Image
                          src={img}
                          alt="PRODUCTS"
                          width={400}
                          height={900}
                        />
                      </div>
                    ))}
                    {/* <video
                      src={product.video}
                      controls
                      autoPlay
                      muted
                      loop
                      className="w-full col-span-2"
                    /> */}
                  </div>
                </section>
                {/* 文字區塊 */}
                <section className="info-section">
                  <h3>ARTICLE NO // {styleNo?.toUpperCase()}</h3>
                  <p>{description?.toUpperCase()}</p>
                  <ul className="info-list-container">
                    <li>
                      <h4>TECHNIQUES // </h4>
                      <ul className="mx-2 ">
                        {PEtech?.map((item, index) => (
                          <li key={`${item}-${index}`}>{item.toUpperCase()}</li>
                        ))}
                      </ul>
                    </li>
                    {/* 加入購物車按鈕 */}
                    <div className="py-8 flex gap-4">
                      <AddToCartButton
                        print={product}
                        onStatusChange={(val) => setIsAdd(val)}
                      />
                      {/* 加入購物車才出現remove btn */}
                      {isAdd && <RemoveFromCartButton print={product} />}
                    </div>
                  </ul>
                </section>
                {/* 點擊圖片彈出輪播圖 */}
                {isImgOpen && (
                  <ImageCarousel
                    images={image}
                    handleClose={handleClose}
                    clickedIndex={clickedIndex}
                  />
                )}
                {isImgOpen && <div className="image-carousel-bg"></div>}
              </div>
            )
          );
        }}
      </APIFetcher>
      <Image
        className="absolute -top-[5vh] right-[10vw] w-[10vw]"
        src={"/image/Decoration/PRODUCT-tape-yellow.png"}
        alt="PRODUCT-tape-yellow"
        width={200}
        height={400}
      />
    </div>
  );
}
