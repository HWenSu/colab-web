"use client"
import CategoryCard from "@/components/CategoryCard";
import APIFetcher from "@/components/APIFetcher";
import Image from "next/image";
import ProductsList from "@/components/ProductsList";

const page = () => {
  return (
    <div>
      {/* 版面裝飾元素 */}
      <Image
        className="absolute top-[15vh] left-[28vw] z-[10]"
        src="/image/product-tape-01.png"
        alt="mens"
        width={120}
        height={40}
      />
      <Image
        className="absolute top-[70vh] left-[63vw] z-[10] "
        src="/image/product-tape-02.png"
        alt="mens"
        width={70}
        height={40}
      />
      <Image
        className="absolute top-[40vh] left-[20vw] z-[10] w-[12vw]"
        src="/image/product-tape-03.png"
        alt="mens"
        width={220}
        height={40}
      />
      <Image
        className="absolute top-[35vh] left-[40vw] z-[10] w-[12vw] "
        src="/image/product-tape-04.png"
        alt="mens"
        width={200}
        height={40}
      />
      <Image
        className="absolute top-[40vh] left-[72vw] z-[10] w-[12vw] "
        src="/image/product-tape-03.png"
        alt="mens"
        width={220}
        height={40}
      />
      {/* 大分類卡片 */}
      <CategoryCard />
      {/* 所有款式選染 */}
      <ProductsList url={"/data/productsData.json"} />
    </div>
  );
};

export default page;
