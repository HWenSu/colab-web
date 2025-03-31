"use client"; // 用 app router，互動式組件需要加這行
import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import Search from "./Search";


const Navbar = () => {
  const [isProductsHover, setIsProductsHover] = useState(false);

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
              src="/colab.svg"
              alt="colab logo"
              width={60}
              height={38}
              priority
            />
            <span className="font-bold ">COLAB</span>
          </Link>
          <ul className="main-nav">
            <li
              className="product-items"
              onMouseEnter={() => setIsProductsHover(true)}
              onMouseLeave={() => setIsProductsHover(false)}
            >
              <Link href="/products" className="flex">
                <span className="mr-2">PRODUCTS</span>
                <Image
                  className="invert "
                  src="/downArrow.svg"
                  alt="dropdown-icon"
                  width={10}
                  height={5}
                  priority
                />
              </Link>
              {/* Products 下拉選單清單 */}
              <ul className="products-drop-down-container">
                <li>
                  <Link href="/products">ALL ITEMS</Link>
                </li>
                <li>
                  <Link href="/products/men" className="flex">
                    <span>MEN</span>
                    <Image
                      className="invert "
                      src="/downArrow.svg"
                      alt="dropdown-icon"
                      width={10}
                      height={5}
                      priority
                    />
                  </Link>
                </li>
                <li>
                  <Link href="/products/women" className="flex">
                    WOMEN
                    <Image
                      className="invert"
                      src="/downArrow.svg"
                      alt="dropdown-icon"
                      width={10}
                      height={10}
                      priority
                    />
                  </Link>
                </li>
                <li>
                  <Link href="/products/print&emb">PRINT & EMB</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/about">ABOUT</Link>
            </li>
            <li>
              <Link href="/contact">CONTACT</Link>
            </li>
          </ul>
          <ul className="main-nav ">
            <li>
              <Link href="/search">SEARCH</Link>
            </li>
            <li>
              <Link href="/login">LOG IN</Link>
            </li>
          </ul>
          {/* 下拉選單背景框 */}
        </header>
      </div>
      <div
        className={`dropdown-bg ${isProductsHover ? "scale-y-short" : ""} `}
      ></div>
    </nav>
  );
};

export default Navbar;
