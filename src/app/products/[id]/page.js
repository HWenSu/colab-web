"use client"
import {use, useState, useEffect} from 'react'
import Image from "next/image";
import APIFetcher from "@/components/APIFetcher";
import ImageCarousel from '@/components/ImageCarousel';

export default function ProductPage({ params }) {
  const resolvedParams = use(params); // 解包 Promise
  const id = resolvedParams.id; // 安全存取 id

  const [isImgOpen, setIsImgOpen] = useState(false)
  const [clickedIndex, setClickedIndex] = useState(0)
  
  const handleImgClicked = (index)=>{
    setIsImgOpen(true)
    setClickedIndex(index)
  }

  const handleClose = () => {
    setIsImgOpen(false);
  }

  
  return (
    <div>
      <APIFetcher url={"/data/productData.json"}>
        {(product) => {
          const firstImage = Array.isArray(product?.image)
            ? product.image[0]
            : null;
          const restImages = Array.isArray(product?.image)
            ? product.image.slice(1)
            : [];
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
                    <video
                      src={product.video}
                      controls
                      autoPlay
                      muted
                      loop
                      className="w-full col-span-2"
                    />
                  </div>
                </section>
                {/* 文字區塊 */}
                <section className="info-section">
                 
                    <h2>{product.name.toUpperCase()}</h2>
                    <h3>STYLE NO // {product.style_no.toUpperCase()}</h3>
                    <p>{product.description.toUpperCase()}</p>
                    <ul className="info-list-container">
                      <li>
                        <h4>MATERIAL - </h4>
                        <p>{product.material.toUpperCase()}</p>
                      </li>
                      <li>
                        <h4>CONSTRUCTURE - </h4>
                        <p>{product.constructure.toUpperCase()}</p>
                      </li>
                      <li>
                        <h4>FABRIC NO. - </h4>
                        <p>{product.fabric_no.toUpperCase()}</p>
                      </li>
                      <li>
                        <h4>FEATURE - </h4>
                        {product.feature.map((item, index) => (
                          <p key={`${item}-${index}`}>{item.toUpperCase()}</p>
                        ))}
                      </li>
                      <li>
                        <h4>FUNCTION - </h4>
                        {product.function.map((item, index) => (
                          <p key={`${item}-${index}`}>{item.toUpperCase()}</p>
                        ))}
                      </li>
                      <li>
                        <h4>SIZE - </h4>
                        <p>{product.size.toUpperCase()}</p>
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
      <Image
        className="absolute -top-[5vh] right-[10vw] w-[10vw]"
        src={"/image/PRODUCT-tape-yellow.png"}
        alt="PRODUCT-tape-yellow"
        width={200}
        height={400}
      />
     
    </div>
  );
}
