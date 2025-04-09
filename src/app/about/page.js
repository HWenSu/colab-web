"use client";
import Image from "next/image";
import ShaderImg from "@/components/ShaderImg";
import CustomCursor from "@/components/CustomCursor";
import { useCustomCursor } from "@/hooks/useCustomCursor";

const page = () => {
  // 調用自訂義鼠標Hook
  const { cursorActive, cursorText, handleCursor, resetCursor } =
    useCustomCursor()

  return (
    <div className="about-page-container">
      {/* 自訂義滑鼠 */}
      <CustomCursor active={cursorActive} cursorText={cursorText} />
      {/* 主介紹區 */}
      <section className="about-design-section">
        <Image
          src="/image/about-bg.png"
          alt="about-bg"
          width={400}
          height={200}
          className="w-[80vw] absolute top-[50vh] -left-[10vw]"
        />
        <div
          className="cursor-none"
          onMouseEnter={() => handleCursor("Hover")}
          onMouseLeave={resetCursor}
        >
          <ShaderImg imgUrl={"/image/about.png"} />
        </div>
        <div className="about-items-container">
          <div className="about-item">
            <Image
              src="/decorationArrow.svg"
              alt="deco arrow"
              width={20}
              height={10}
            />
            <div className="about-large-w">
              <h3>MATERIAL</h3>
              <p>INHOUSE 70% KNIT 30% WOVEN</p>
            </div>
            <Image
              className="col-start-4 rotate-270"
              src="/decorationArrow.svg"
              alt="deco arrow"
              width={20}
              height={10}
            />
            <h3 className="about-large-w about-item-right text-secondary">
              WHAT WE CAN DO ?
            </h3>
          </div>
          <div className="about-item">
            <h2 className="about-item-center">FENC</h2>
            <div className="about-large-w about-item-right">
              <h3>CREATE</h3>
              <p>
                2 SEASON IN 1 YEAR OVER 100 STYLES NEW SEASONAL SAMPLES SHOWCASE
                DESIGN CONCEPT SHARING
              </p>
            </div>
          </div>
          <div className="about-item">
            <Image
              className="about-item-center"
              src="/decorationSlash.svg"
              alt="decoration slash"
              width={60}
              height={40}
            />
            <h3 className="about-item-right">CO-CREATION</h3>
          </div>
          <div className="about-item">
            <div className="col-start-2">
              <h3 className="about-large-w ">DESIGN </h3>
              <h3>MEN'S WOMEN'S</h3>
              <h3>GRAPHIC</h3>
            </div>
            <h2 className="about-item-center">COLAB</h2>
            <h3 className="about-large-w about-item-right">
              UPDATE THE EXISTING STYLE TO 2.0
            </h3>
          </div>
        </div>
      </section>
      <section className="h-screen"></section>
    </div>
  );
};

export default page;
