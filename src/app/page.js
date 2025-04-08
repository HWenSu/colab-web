"use client";
import Link from "next/link";
import Image from "next/image";
import ShaderImg from "@/components/ShaderImg";
import CategoryCard from "@/components/CategoryCard";
import BlurText from "@/components/BlurText";
import IntroList from "@/components/IntroList";

export default function Home() {
  return (
    <div className="home-page-container">
      {/* 影片區塊 */}
      <section className="video-section ">
        <video
          src={"/video/Co-web.mp4"}
          autoPlay
          muted
          loop
          className="w-full h-auto sticky top-0"
        />
        <div className="h-[30vh] z-10 relative">
          <div className="sticky top-[80vh] w-full">
            <h2 className="text-white text-[2rem] font-bold text-center animate-scale-up">
              FE INNOVATION DESIGN
            </h2>
          </div>
        </div>
      </section>
      {/* 主圖區塊 */}
      <section className="hero-section relative ">
        <div className="grid-bg">
          <div className="grid-item"></div>
          <div className="grid-item"></div>
          <div className="grid-item"></div>
          <div className="grid-item"></div>
          <div className="grid-item"></div>
        </div>
        <ShaderImg imgUrl={"/image/TNB_background_removed(3).png"} />
        <div className="circle-item"></div>
        <div className="hero-grid">
          <div></div>
          <aside className="hero-grid-1">
            <Link href="/products">
              {/* <p>MEN&apos;S</p> */}
              <Image
                src="/image/hero-man.png"
                alt="mens"
                width={300}
                height={400}
                priority
              />
            </Link>
            <Link href="/products">
              {/* <p>WOMEN&apos;S</p> */}
              <Image
                src="/image/hero-woman.png"
                alt="mens"
                width={300}
                height={400}
                priority
              />
            </Link>
          </aside>
          <div className="hero-grid-2">
            <div className="hero-center-text">
              <p>COOPERATION</p>
            </div>
            <div className="hero-center-text">
              <p>INHOUSE MATERIAL</p>
              <p>70% KNIT</p>
              <p>30% WOVEN</p>
            </div>
            <div className="hero-center-text">
              <p>APPAREL</p>
              <p>GRAPHIC</p>
            </div>
          </div>
          <div className="hero-grid-3"></div>
          <div className="hero-grid-4"></div>
          <div className="hero-grid-5">
            <div>
              <h2>WHAT WE CAN DO?</h2>
            </div>
            <div>
              <h2>CREATE</h2>
              <p>
                2 SEASION IN 1 YEAR OVER 100 STYLES NEW SEASONAL SAMPLES
                SHOWCASE DESIGN CONCEPT SHARING
              </p>
            </div>
            <div>
              <h2>CO-CREATION</h2>
            </div>
            <div>
              <h2>UPDATE</h2>
              <p>THE EXISTING STYLE TO 2.0</p>
            </div>
          </div>
        </div>
      </section>
      {/* 文字說明區塊 */}
      <section className="bg-black  flex flex-col pt-[20rem]  scroll-section text-[4rem]">
        <div className="sticky top-40 pr-[5rem]">
          <div className="invert flex justify-end ">
            <BlurText words={"COLAB is the creative and innovation center"} />
          </div>
          <div className="flex h-[60rem] justify-end">
            <div className="invert ">
              <BlurText words={"for Far Eastern New Century"} />
            </div>
            <div className="animate-scroll-broaden w-[10rem] overflow-hidden">
              <Image
                src="/image/The New Black 003.jpeg"
                alt="mens"
                width={300}
                height={400}
                className="w-full object-cover pl-[1rem]"
              />
            </div>
          </div>
        </div>
        <div className=" bg-[#232323] z-10 py-15 rounded-t-[8rem]  mx-[2rem]">
          <IntroList
            invert={"invert"}
            videoUrl={"/video/Colab2022.mp4"}
            listItem={
              (["Create Volume with Print", "Soft Texture", "Special Techniques"])
            }
          />
        </div>
      </section>
      {/* 分類卡片區塊 */}
      <section className="bg-white h-[100vh] w-full">
        <CategoryCard />
      </section>
    </div>
  );
}
