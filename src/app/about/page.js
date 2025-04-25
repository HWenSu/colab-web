"use client";
import Image from "next/image";
import ShaderImg from "@/components/ShaderImg";
import CustomCursor from "@/components/CustomCursor";
import { useCustomCursor } from "@/hooks/useCustomCursor";
import StaffCard from "@/components/StaffCard";
import BlurText from "@/components/BlurText";

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
          className="w-[80vw] absolute top-[30vh] -left-[10vw]"
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
      <section className="max-w-[1980px] px-4 mx-auto org-chart">
        <Image
          src="/decorationArrow.svg"
          alt="deco arrow"
          width={20}
          height={10}
          className="m-auto pt-[50vh]"
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
          <div className="absolute w-full">
            <Image
              className="w-full opacity-60 "
              src="/image/org-bg.png"
              alt="org-bg"
              width={500}
              height={400}
            />
          </div>
          <div className="flex gap-6 justify-center py-10 relative z-[5]">
            <StaffCard
              name="JENNIFER"
              lastName="LEE"
              jobPosition="DESIGNER ASSISTANT"
              imgUrl="/image/org-jen.png"
              yPosition="14"
            />
            <StaffCard
              name="PENNIE"
              lastName="CHEONG"
              jobPosition="SENIOR DESIGNER"
              imgUrl="/image/org-pennie.png"
              yPosition="9"
            />
            <StaffCard
              name="ETHAN"
              lastName="CHOU"
              jobPosition="SENIOR DESIGNER"
              imgUrl="/image/org-ethan.png"
              yPosition="6"
            />
            <StaffCard
              name="YANG"
              lastName="CHEN"
              jobPosition="DESIGN MANAGER"
              imgUrl="/image/org-yang.png"
            />
            <StaffCard
              name="SUNNY"
              lastName="HUANG"
              jobPosition="SENIOR DESIGNER"
              imgUrl="/image/org-sunny.png"
              yPosition="7"
            />
            <StaffCard
              name="ELVA"
              lastName="SU"
              jobPosition="SENIOR DESIGNER"
              imgUrl="/image/org-elva.png"
              yPosition="5"
            />
            <StaffCard
              name="REKI"
              lastName="CHANG"
              jobPosition="DESIGNER ASSISTANT"
              imgUrl="/image/org-reki.png"
              yPosition="10"
            />
          </div>
          <div className="">
            <Image
              src="/decorationArrow.svg"
              alt="deco arrow"
              width={20}
              height={10}
              className="m-auto pt-[50vh]"
            />
            <Image
              src="/decorationArrow.svg"
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
                <p className="text-[1.8rem]">NEW 100s STYLE</p>
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
            src="/image/about-bottom-bg.png"
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

export default page;
