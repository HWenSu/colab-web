"use client"; // 用 app router，互動式組件需要加這行
import Link from "next/link";
import Image from "next/image";
import Search from "./Search";

import React from 'react'

const Navbar = () => {
  return (
    <div>
      <div class="marquee-container">
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
          <span className="font-bold">COLAB</span>
        </Link>
        <ul class="main-nav">
          <li>
            <Link href="/products" className="flex">
              PRODUCTS
              <Image
                className="dark:invert mx-2" //深色模式反轉顏色
                src="/downArrow.svg"
                alt="dropdown-icon"
                width={10}
                height={10}
                priority
              />
            </Link>
          </li>
          <li>
            <Link href="/about">ABOUT</Link>
          </li>
          <li>
            <Link href="/contact">CONTACT</Link>
          </li>
        </ul>
        <ul className="main-nav">
          <li>
            <Link href="/search">SEARCH</Link>
          </li>
          <li>
            <Link href="/login">LOG IN</Link>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Navbar