import { useState } from "react";
import MobileMenuContent from "./MobileMenuContent";
import Image from "next/image";
import useUniqueStyleTypes from "@/hooks/useUniqueStyleTypes";



const MobileMenu = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  // 傳入不重複 styeTypeName
  const styleTypeNameData = useUniqueStyleTypes();

  const menuConfig = [
    { id: "main", items: ["NEW ARRIVAL", "PRODUCTS", "ABOUT", "CONTACT"] },
    { id: "products", items: ["ALL ITEMS", "GARMENT", "PRINT & EMB"] },
    { id: "garment", items: ["ALL GARMENT", "WOMEN'S", "MEN'S"] },
    { id: "women", items: [] },
    { id: "men", items: [] },
  ];

  // 將所有 tSex 對應的 styleTypeName 自動放進 menuConfig 對應 id
  styleTypeNameData.forEach(({ tSex, tStyleTypeName }) => {
    const id = tSex.toLowerCase()
    const target = menuConfig.find((menu) => menu.id === id)
    if(target) target.items = tStyleTypeName
  })

  // 堆疊管理選單層級
  const [menuStack, setMenuStack] = useState(["main"]);

  // 連結對照表
  const menuLinks = {
    "ABOUT" : "/home_label/about",
    "CONTACT" : "/home_label/contact",
    "PRINT & EMB": "/home_label/products/print&emb", 
    "ALL ITEMS": "/home_label/products",
    "ALL GARMENT": "/home_label/products/garment",
    "NEW ARRIVAL": "/home_label/products/new_arrival",
  };

  // 取得連結函式
  const getHref = (item) => menuLinks[item] || null;

  // 通用點擊處理
  const handleMenuClick = (item) => {
    if (item === "PRODUCTS") setMenuStack(["main", "products"]);
    if (item === "GARMENT") setMenuStack((prev) => [...prev, "garment"]);
    if (item === "WOMEN'S") setMenuStack((prev) => [...prev, "women"]);
    if (item === "MEN'S") setMenuStack((prev) => [...prev, "men"]);
  };

  // 處理返回
  const handleBack = () => {
    setMenuStack((prev) => prev.slice(0, -1));
  };

  // 處理關閉並重置
  const handleCloseReset = () => {
    toggleMobileMenu()
    setMenuStack(["main"])
  }

  // 動態渲染手機版側邊選單
  const currentLevel = menuStack[menuStack.length - 1];
  const config = menuConfig.find((c) => c.id === currentLevel);

  // 控制選單絕對位置
  const getMenuTranslate = (id) => {
    // 該層目前在堆疊中的位置（找不到就是 -1）
    const currentIndex = menuStack.indexOf(id);
    // 最上層，也就是目前正在顯示的那層
    const topIndex = menuStack.length - 1;

    // 這層不在 stack 裡（根本還沒進入這層）
    if (currentIndex === -1) return "translate-x-full";
    // 目前正在顯示的那一層
    if (currentIndex === topIndex) return "translate-x-0";
    // 往畫面左邊退場
    if (currentIndex < topIndex) return "-translate-x-full";

    // 預設情況
    return "translate-x-full";
  };

  return (
    <div>
      <div
        className={`mobile-sidebar overflow-hidden transition-transform duration-300  
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"} `}
      >
        <button
          className="absolute top-16 right-16 z-999"
          onClick={handleCloseReset}
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
              d={"M6 18L18 6M6 6l12 12"}
            />
          </svg>
        </button>
        {/* 菜單容器 */}
        {menuConfig.map((menu) => (
          <div
            key={menu.id}
            className={`mobileMenuContent
              ${getMenuTranslate(menu.id)}
              `}
          >
            {/* 子選單項目渲染 */}
            {config.items.map((item) => (
              <MobileMenuContent
                id={menu.id}
                key={item}
                item={item}
                label={item}
                arrow={["PRODUCTS", "GARMENT", "WOMEN'S", "MEN'S"].includes(
                  item
                )}
                href={getHref(item)}
                onClick={() => handleMenuClick(item)}
                onLinkClick={handleCloseReset}
              />
            ))}
          </div>
        ))}

        {menuStack.length > 1 && (
          <button
            className="flex justify-center items-center absolute top-[4rem] left-[4rem] text-4xl"
            onClick={handleBack}
          >
            <Image
              className="invert rotate-90 mr-2"
              src="/svg/downArrow.svg"
              alt="dropdown-icon"
              width={10}
              height={5}
              priority
            />
            BACK
          </button>
        )}
      </div>
      {isMobileMenuOpen && (
        <div className="overlay" onClick={handleCloseReset}></div>
      )}
    </div>
  );
};

export default MobileMenu