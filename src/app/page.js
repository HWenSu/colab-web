"use client";
import Link from "next/link";
import Image from "next/image";
import ShaderImg from "@/components/ShaderImg";


export default function Home() {

  return (
    <div className="home-page-container">
      <div className="grid-bg">
        <div className="grid-item"></div>
        <div className="grid-item"></div>
        <div className="grid-item"></div>
        <div className="grid-item"></div>
        <div className="grid-item"></div>
      </div>
      <div className="circle-item"></div>
      <section className="hero-grid">
        <div></div>
        <aside className="hero-grid-1">
          <Link href="/products">
            <p>MAN'S</p>
            <Image
              className=""
              src="/image/hero-man.png"
              alt="mens"
              width={300}
              height={400}
              priority
            />
          </Link>
          <Link href="/products">
            <p>WOMAN'S</p>
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
          <ShaderImg imgUrl={"/image/hero-section.png"} />
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
              2 SEASION IN 1 YEAR OVER 100 STYLES NEW SEASONAL SAMPLES SHOWCASE
              DESIGN CONCEPT SHARING
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
      </section>
    </div>
  );
}
