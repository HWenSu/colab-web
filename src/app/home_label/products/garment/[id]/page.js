"use client"
import {use, useState, useEffect} from 'react'
import Image from "next/image";
import APIFetcher from "@/components/APIFetcher";
import ImageCarousel from '@/components/ImageCarousel';

export default function ProductPage({ params }) {
  // 確保 params 被正確解析
  const resolvedParams = use(params); // 解包 Promise
  const id = resolvedParams?.id; // 安全存取 id，防止 undefined

  const [product, setProduct] = useState(null);
  const [fabric, setFabric] = useState(null);
  const [isImgOpen, setIsImgOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(0);

  const handleImgClicked = (index) => {
    setIsImgOpen(true);
    setClickedIndex(index);
  };

  const handleClose = () => {
    setIsImgOpen(false);
  };

  // 如果 id 不存在，提前返回錯誤 UI
  if (!id) {
    return <div>Invalid product ID</div>;
  }

  return (
    <div>
      {/* 巢狀 APIFetcher 來載入兩個 JSON 檔案 */}
      <APIFetcher url={"/data/Product_Garment.json"}>
        {(products) => {
          // 確保 id 已初始化後再執行篩選
          const product = Array.isArray(products)
            ? products.find((item) => item.tProductStyleSysCode === id)
            : null;

          // 如果找不到產品，顯示錯誤訊息或空狀態
          if (!product) {
            return <div>Product not found</div>;
          }

          // 載入 Product_Fabric.json
          return (
            <APIFetcher url={"/data/Product_Fabric.json"}>
              {(fabricDetails) => {
                const fabric = Array.isArray(fabricDetails)
                  ? fabricDetails.find(
                      (item) => item.tFabricCode === product.tFabricCode
                    )
                  : null;

                console.log(fabricDetails);
                console.log(fabric);

                // 定義項目變數
                const image = product?.tProductStylePicCode;
                const name = product?.tStyleName;
                const styleNo = product?.tProductStyleCode;
                const description = product?.tDescription;
                const fabricCode = product?.tFabricCode;
                const size = product?.tSize;
                // 確保所有依賴 fabric 的變數都在 fabric 定義之後
                const fabricType = fabric?.tFabricType;
                const constructure = fabric?.tFabricConstructionCode;
                const composition = fabric?.tFabricComposition;
                const fabricFunction = fabric?.tFabricFunctionCode;

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
                        <h2>{name.toUpperCase()}</h2>
                        <h3>STYLE NO // {styleNo.toUpperCase()}</h3>
                        <p>{description.toUpperCase()}</p>
                        <ul className="info-list-container">
                          <li>
                            <h4>SIZE - </h4>
                            <p>{size.toUpperCase()}</p>
                          </li>
                          <li>
                            <h4>FABRIC NO. - </h4>
                            <p>{fabricCode.toUpperCase()}</p>
                          </li>
                          <li>
                            <h4>MATERIAL - </h4>
                            <p>{fabric?.fabricType?.toUpperCase()}</p>
                          </li>
                          <li>
                            <h4>CONSTRUCTURE - </h4>
                            <p>{fabric?.constructure?.toUpperCase()}</p>
                          </li>
                          <li>
                            <h4>FUNCTION - </h4>
                            {fabric?.fabricFunction?.map((item, index) => (
                              <p key={`${item}-${index}`}>
                                {item.toUpperCase()}
                              </p>
                            ))}
                          </li>
                        </ul>
                      </section>
                      {/* 點擊圖片彈出輪播圖 */}
                      {isImgOpen && (
                        <ImageCarousel
                          images={product.image}
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
