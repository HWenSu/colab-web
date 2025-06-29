"use client"; // 用 app router，互動式組件需要加這行
import {useState, useRef} from "react";
import Link from "next/link";
import Image from "next/image";
import Search from "./Search";
import MobileMenu from "./MobileMenu";
import useUniqueStyleTypes from "@/hooks/useUniqueStyleTypes";


const Navbar = () => {
  const [isProductsHover, setIsProductsHover] = useState(false);
  const [isGarmentHover, setIsGarmentHover] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false)
  const [isStyleTypeOpen, setIsStyleTypeOpen] = useState(false)
  const [currentSex, setCurrentSex] = useState(null)
  const [isStyleTypeItems, setIsStyleTypeItems] = useState([])

  // 儲存 timeout ID
  const hoverTimeout = useRef(null);

  // 獲取男女裝個別不重複的分類名稱
  const styleTypeNameData = useUniqueStyleTypes();

  // 手機版：選單開關
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // 電腦版：下拉式選單Hover觸發篩選條件
  const handleMouseEnter = (menu) => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current); // 清除任何現有的計時器
    } if (menu === "products") {
      setIsProductsHover(true);
    } if (menu === "garment") {
      setIsGarmentHover(true);
    } else if (menu === "women" || menu === "men") {
      setCurrentSex(menu)
      const styleType = styleTypeNameData.filter((data) => data.tSex.toLowerCase() === menu)
      setIsStyleTypeItems(styleType[0].tStyleTypeName);
    }
  };

  const handleMouseLeave = (menu) => {
    hoverTimeout.current = setTimeout(() => {
      if (menu === "products") {
        setIsProductsHover(false);
        setIsGarmentHover(false); // 同時收起子選單
      } else if ( menu === "garment"  ) {
        setIsGarmentHover(false)
        setIsStyleTypeOpen(false);
      }
    }, 200);
  };


  return (
    <nav>
      <div className="navbar-container">
        <div className="marquee-container invisible md:visible">
          <h1 className="marquee-content animate-marquee">
            FAR EASTERN NEW CENTURY COLAB
          </h1>
        </div>
        <header className="header-wrap">
          <Link href="/" className="logo-wrap">
            <Image
              className=" md:w-[3rem] dark:invert" //深色模式反轉顏色
              src="/svg/colab.svg"
              alt="colab logo"
              width={32}
              height={38}
              priority
            />
            <span className="font-bold ">COLAB</span>
          </Link>

          {/* 手機版-漢堡選單 */}
          <button
            className="md:hidden relative pl-8 order-3 z-999 "
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          {/* 電腦版-導航列選單 */}
          <ul className="main-nav mx-auto hidden md:flex">
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
                    <Link href="/home_label/products/new_arrival">
                      NEW ARRIVAL
                    </Link>
                  </li>
                  <li>
                    <Link href="/home_label/products">ALL ITEMS</Link>
                  </li>
                  <li
                    onMouseEnter={() => handleMouseEnter("garment")}
                    onMouseLeave={() => handleMouseLeave("garment")}
                    className="relative"
                  >
                    <Link href="/home_label/products/garment" className="flex">
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
                      <ul className="products-drop-down-container garment-layer">
                        {styleTypeNameData &&
                          styleTypeNameData?.map((item) => {
                            const sex = item?.tSex?.toLowerCase();
                            return (
                              <li
                                key={sex}
                                onMouseEnter={() => {
                                  handleMouseEnter(sex);
                                  setIsStyleTypeOpen(true);
                                }
                                }
                                onMouseLeave={() => {
                                  handleMouseLeave(sex)
                                  setIsStyleTypeOpen(false);
                                }}
                                className={`relative`}
                              >
                                <Link
                                  href={`/home_label/products/garment/${sex}`}
                                  className="flex"
                                >
                                  <span>{sex.toUpperCase()}</span>
                                  <Image
                                    className="invert ml-1"
                                    src="/svg/downArrow.svg"
                                    alt="dropdown-icon"
                                    width={10}
                                    height={5}
                                    priority
                                  />
                                </Link>
                                {/* 品項分類 */}
                                {isStyleTypeOpen && currentSex === sex && (
                                  <ul className="products-drop-down-container style-type-layer">
                                    {isStyleTypeItems &&
                                      isStyleTypeItems.map((item) => (
                                        <li key={item}>
                                          <Link
                                            href={`/home_label/products/garment/filter?sex=${currentSex}&styleType=${item.toLowerCase()}`}
                                          >
                                            <span>{item.toUpperCase()}</span>
                                          </Link>
                                        </li>
                                      ))}
                                  </ul>
                                )}
                              </li>
                            );
                          })}

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

          {/* 右側 搜尋欄, 購物車Icon  */}
          <ul
            className={`main-nav flex ml-auto ${
              isMobileMenuOpen && "invisible"
            }`}
          >
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
                  className="invert md:w-[1.8rem]" //深色模式反轉顏色
                  src="/svg/cart.svg"
                  alt="cart"
                  width={16}
                  height={16}
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
          ${isStyleTypeOpen ? "scale-y-more-long" : ""}
          `}
      ></div>
      {/* 手機側邊欄選單 */}
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
    </nav>
  );
};

export default Navbar;
