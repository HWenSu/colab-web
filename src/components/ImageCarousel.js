
import Image from "next/image"
import { useState } from "react";

const ImageCarousel = ({ images, handleClose, clickedIndex }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(clickedIndex);
  //設定初始圖片放大中心
  const [transformOrigin, setTransformOrigin] = useState("50% 50%");

  // 處理輪播圖點擊項目
  const handleDotClicked = (index) => {
    setCurrentImgIndex(index);
  };

  console.log(clickedIndex)

  // 處理圖片放大處理
  const handleMouseMove = (e) => {
    const {
      left,
      top,
      width: imgWidth,
      height: imgHeight,
    } = e.target.getBoundingClientRect();
    const x = e.clientX - left; // 滑鼠相對於圖片左上角的 X 座標
    const y = e.clientY - top; // 滑鼠相對於圖片左上角的 Y 座標
    const xPercent = (x / imgWidth) * 100; // 轉換為百分比
    const yPercent = (y / imgHeight) * 100; // 轉換為百分比
    setTransformOrigin(`${xPercent}% ${yPercent}%`); // 更新放大中心
  };

  const handleMouseLeave = () => {
    setTransformOrigin("50% 50%"); // 滑鼠離開時恢復中心
  };

  return (
    <div className="image-carousel-container">
      {/* 主圖 */}
      <div className="img-center-wrap">
        <Image
          className="img-center"
          src={images[currentImgIndex]}
          alt={images[0]}
          width={400}
          height={200}
          style={{ transformOrigin }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      </div>

      {/* 縮圖導航（點點） */}
      <div className="image-carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              handleDotClicked(index);
            }}
            className={`${
              index === currentImgIndex ? "bg-secondary" : "bg-gray-200"
            }  `}
          />
        ))}
      </div>
      {/* 關閉按鈕 */}
      <button onClick={handleClose} className="close-btn">x</button>
    </div>
  );
};

export default ImageCarousel