"use client";
import APIFetcher from "@/components/APIFetcher";
import Gallery from "@/components/Gallery";
import ProductsList from "@/components/ProductsList";
import BlurText from "@/components/BlurText";
import IntroList from "@/components/IntroList";
import CustomCursor from "@/components/CustomCursor";
import { useCustomCursor } from "@/hooks/useCustomCursor";

const page = () => {
  // 調用自訂義鼠標Hook
  const { cursorActive, cursorText, handleCursor, resetCursor } =
    useCustomCursor();

  return (
    <div className="print-page-container">
      {/* 自訂義滑鼠 */}
      <CustomCursor active={cursorActive} cursorText={cursorText} />
      {/* 輪播圖區塊 */}
      <section>
        <h2 className="sticky top-0 ">GRAPHIC</h2>
        {/*  */}
        <div
          className="w-full h-[60vh] cursor-none"
          onMouseEnter={() => handleCursor("Hover")}
          onMouseLeave={resetCursor}
        >
          <APIFetcher url="/data/productsData.json">
            {(products) => (
              <div>
                {products &&
                  products.map((product) => (
                    <Gallery key={product.id} images={product.image} />
                  ))}
              </div>
            )}
          </APIFetcher>
        </div>
      </section>
      {/* 印繡花介紹區塊 */}
      <section className="w-full h-[100vh]  ">
        <div className="w-full h-full bg-black text-white scroll-section">
          <BlurText words={"PRINT & EMBROIDERY"} />
        </div>
      </section>
      {/* 商品列表區塊 */}
      <section className="my-[10em]">
        <ProductsList url={"/data/productsData.json"} />
      </section>
      {/* 技法選單區塊 */}
      <section className="h-[100vh] relative">
        <IntroList
          videoUrl={"/video/Colab2022.mp4"}
          listItem={[
            "Create Volume with Print",
            "Soft Texture",
            "Special Techniques",
          ]}
        />
      </section>
      {/* 滾動式差背景圖片區塊 */}
      <div className="relative w-full h-[70vh] overflow-hidden bg-black">
        <div className="w-full h-full bg-[url('/image/print-hero.jpg')] bg-cover bg-center bg-fixed">
          <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
            Runway Style
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
