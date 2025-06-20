"use client";
import Image from "next/image";
import ShaderImg from "@/components/ShaderImg";
import CustomCursor from "@/components/CustomCursor";
import { useCustomCursor } from "@/hooks/useCustomCursor";
import StaffCard from "@/components/StaffCard";
import BlurText from "@/components/BlurText";

const About = () => {
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
          src="/image/OtherPages/About/about-bg.png"
          alt="about-bg"
          width={400}
          height={200}
          className="w-[80vw] absolute top-[30vh] -left-[10vw]"
        />
        <div
          className="cursor-none "
          onMouseEnter={() => handleCursor("Hover")}
          onMouseLeave={resetCursor}
        >
          <ShaderImg imgUrl={"/image/OtherPages/About/about.png"} />
        </div>
        <div className="about-items-container">
          <div className="about-item">
            <Image
              src="/svg/decorationArrow.svg"
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
              src="/svg/decorationArrow.svg"
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
              src="/svg/decorationSlash.svg"
              alt="decoration slash"
              width={60}
              height={40}
            />
            <h3 className="about-item-right">CO-CREATION</h3>
          </div>
          <div className="about-item">
            <div className="col-start-2">
              <h3 className="about-large-w ">DESIGN </h3>
              <h3>MEN WOMEN</h3>
              <h3>GRAPHIC</h3>
            </div>
            <h2 className="about-item-center">COLAB</h2>
            <h3 className="about-large-w about-item-right">
              UPDATE THE EXISTING STYLE TO 2.0
            </h3>
          </div>
        </div>
      </section>
      <section className="max-w-[1980px] px-4 mx-auto org-chart">
        <Image
          src="/svg/decorationArrow.svg"
          alt="deco arrow"
          width={20}
          height={10}
          className="m-auto sm:pt-[50vh]"
        />
        <div className="relative ">
          <div className="flex items-end text-[1.2rem] px-[4rem] pt-[5rem]">
            {/* <Image
              className="invert w-[3rem] mx-8" //深色模式反轉顏色
              src="/colab.svg"
              alt="colab logo"
              width={60}
              height={38}
            /> */}
            <p>OUR TEAM</p>
          </div>
          {/* 背景圖片 */}
          <Image
            src={"/image/OtherPages/About/about-org.png"}
            alt="colab-org"
            width={1800}
            height={200}
          />
          <div>
            <Image
              src="/svg/decorationArrow.svg"
              alt="deco arrow"
              width={20}
              height={10}
              className="m-auto pt-[10rem]"
            />
          </div>
        </div>
      </section>
      <section className="about-info-section">
        <div className="m-auto text-center text-[4rem] py-[5rem] scroll-section ">
          <BlurText words="WHAT" />
          <BlurText words="WE CAN DO ?" />
        </div>
        <div>
          <div className="gradient-deco">
            <ul className="flex justify-center gap-15 items-start">
              <li className=" flex flex-col justify-center items-center ">
                <div className="triangle"></div>
                <h2 className="text-[4rem]">CREATE</h2>
                <p className="text-[1.8rem]">200 NEW STYLES</p>
                <p className="text-[1.8rem]">BY-YEARLY</p>
              </li>
              <li className=" flex flex-col justify-center items-center ">
                <div className="triangle"></div>
                <h2 className="text-[4rem]">UPDATE</h2>
                <p className="text-[1.8rem]">CO-CREATION</p>
                <p className="text-[1.8rem]">2.0 VERSION</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="relative mt-[10rem] h-[30rem] overflow-hidden">
          <Image
            src="/image/OtherPages/About/about-bottom-bg.png"
            alt="about-bottom-bg.png"
            width={1000}
            height={800}
            className="absolute top-[20rem] left-1/2 translate-x-[-50%] object-top xl:scale-[3]"
          />
        </div>
      </section>
    </div>
  );
};

export default About;
