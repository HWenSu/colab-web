"use client"
import {use, useState} from 'react'
import Image from "next/image";
import APIFetcher from "@/components/APIFetcher";
import ImageCarousel from '@/components/ImageCarousel';
import useApiFetch from "@/hooks/useApiFetch";

export default function ProductPage({ params }) {
  // 確保 params 被正確解析
  const resolvedParams = use(params); // 解包 Promise
  const id = resolvedParams?.id; // 安全存取 id，防止 undefined

  const [isImgOpen, setIsImgOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(0);

  // 使用 useApiFetch 載入 Product_Fabric.json
  const {
    data: fabricDetails,
    loading: fabricLoading,
    error: fabricError,
  } = useApiFetch("/data/Product_Fabric.json");

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

          // 檢查 fabric 是否正在載入
          if (fabricLoading) {
            return <div>Loading fabric details...</div>;
          }

          // 檢查 fabric 載入是否有錯誤
          if (fabricError) {
            console.error("Fabric fetch error:", fabricError);
            // 仍可渲染產品資訊，但 fabric 相關欄位使用預設值
          }

          // 查找匹配的 fabric 資料
          const fabric = Array.isArray(fabricDetails)
            ? fabricDetails.find(
                (item) => item.tFabricCode === product.tFabricCode
              ) || null
            : null;

          // 定義項目變數
          const image = product?.tFilePath;
          const name = product?.tStyleName;
          const styleNo = product?.tProductStyleCode;
          const description = product?.tDescription;
          const fabricCode = product?.tFabricCode;
          const size = product?.tSize;
          // 確保所有依賴 fabric 的變數都在 fabric 定義之後
          const fabricType = fabric?.tFabricType;
          const constructure = fabric?.tFabricConstructionName;
          const composition = fabric?.tFabricComposition;
          const fabricFunction = fabric?.tFabricFunctionName;

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
                  <h2>{name?.toUpperCase()}</h2>
                  <h3>STYLE NO // {styleNo?.toUpperCase()}</h3>
                  <p>{description?.toUpperCase()}</p>
                  <ul className="info-list-container">
                    <li>
                      <h4>SIZE - </h4>
                      <p>{size?.toUpperCase()}</p>
                    </li>
                    <li>
                      <h4>FABRIC NO. - </h4>
                      <p>{fabricCode?.toUpperCase()}</p>
                    </li>
                    <li>
                      <h4>MATERIAL - </h4>
                      <p>{fabricType?.toUpperCase()}</p>
                    </li>
                    <li>
                      <h4>CONSTRUCTURE - </h4>
                      <p>{constructure?.toUpperCase()}</p>
                    </li>
                    <li>
                      <h4>FUNCTION - </h4>
                      {fabricFunction?.map((item, index) => (
                        <p key={`${item}-${index}`}>{item.toUpperCase()}</p>
                      ))}
                    </li>
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
