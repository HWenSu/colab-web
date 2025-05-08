"use client"; // 用 app router，互動式組件需要加這行
import {useState, useRef} from "react";
import Link from "next/link";
import Image from "next/image";
import Search from "./Search";

const Navbar = () => {
  const [isProductsHover, setIsProductsHover] = useState(false);
  const [isGarmentHover, setIsGarmentHover] = useState(false);
  // 儲存 timeout ID
  const hoverTimeout = useRef(null);

  const handleMouseEnter = (menu) => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current); // 清除任何現有的計時器
    }
    if (menu === "products") {
      setIsProductsHover(true);
    } else if (menu === "garment") {
      setIsGarmentHover(true);
    }
  };

  const handleMouseLeave = (menu) => {
    hoverTimeout.current = setTimeout(() => {
      if (menu === "products") {
        setIsProductsHover(false);
        setIsGarmentHover(false); // 同時收起子選單
      } else if (menu === "garment") {
        setIsGarmentHover(false);
      }
    }, 200);
  };

  return (
    <nav>
      <div className="navbar-container">
        <div className="marquee-container ">
          <h1 className="marquee-content animate-marquee">
            FAR EASTERN NEW CENTURY COLAB
          </h1>
        </div>
        <header className="header-wrap">
          <Link href="/" className="logo-wrap">
            <Image
              className="dark:invert" //深色模式反轉顏色
              src="/svg/colab.svg"
              alt="colab logo"
              width={50}
              height={38}
              priority
            />
            <span className="font-bold ">COLAB</span>
          </Link>
          <ul className="main-nav">
            <li
              className="product-items"
              onMouseEnter={() => handleMouseEnter("products")}
              onMouseLeave={() => handleMouseLeave("products")}
            >
              <Link href="/home_label/products" className="flex">
                <span className="mr-2">PRODUCTS</span>
                <Image
                  className="invert "
                  src="/svg/downArrow.svg"
                  alt="dropdown-icon"
                  width={10}
                  height={5}
                  priority
                />
              </Link>
              {/* Products 下拉選單清單 */}
              {isProductsHover && (
                <ul className="products-drop-down-container">
                  <li>
                    <Link href="/home_label/products">ALL ITEMS</Link>
                  </li>
                  <li
                    onMouseEnter={() => handleMouseEnter("garment")}
                    onMouseLeave={() => handleMouseLeave("garment")}
                    className="relative"
                  >
                    <Link
                      href="/home_label/products/garment"
                      className="flex items-center"
                    >
                      <span>GARMENT</span>
                      <Image
                        className="invert ml-1"
                        src="/svg/downArrow.svg"
                        alt="dropdown-icon"
                        width={10}
                        height={5}
                        priority
                      />
                    </Link>
                    {/* Garment層下拉選單 */}
                    {isGarmentHover && (
                      <ul className="products-drop-down-container text-white -translate-x-20">
                        <li className="">
                          <Link href="/home_label/products/garment/women">
                            WOMEN
                          </Link>
                        </li>
                        <li className="">
                          <Link href="/home_label/products/garment/men">
                            MEN
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <Link href="/home_label/products/print&emb">
                      PRINT & EMB
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link href="/home_label/about">ABOUT</Link>
            </li>
            <li>
              <Link href="/home_label/contact">CONTACT</Link>
            </li>
          </ul>
          <ul className="main-nav ">
            <li>
              <Search />
            </li>
            <li>
              <Link href="/home_label/login">LOG IN</Link>
            </li>
            <li>
              <Link href="/home_label/cart">
                {" "}
                <Image
                  className="invert " //深色模式反轉顏色
                  src="/svg/cart.svg"
                  alt="cart"
                  width={20}
                  height={20}
                  priority
                />
              </Link>
            </li>
          </ul>
          {/* 下拉選單背景框 */}
        </header>
      </div>
      <div
        className={`dropdown-bg 
          ${isProductsHover ? "scale-y-short" : ""} 
          ${isGarmentHover ? "scale-y-long" : ""}
          `}
      ></div>
    </nav>
  );
};

export default Navbar;
