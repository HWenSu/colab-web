"use client"
import CategoryCard from "@/components/CategoryCard";
import APIFetcher from "@/components/APIFetcher";
import Image from "next/image";
import ProductsList from "@/components/ProductsList";

const api_url_path_g = "http://localhost:53866/api/product/garment";
const api_url_path_pe = "http://localhost:53866/api/product/petech";

// const api_url_path_g = "/data/Product_Garment.json";
// const api_url_path_pe = "/data/Product_PETech.json";

const page = () => {
  return (
    <div className="w-screen overflow-hidden">
      {/* 版面裝飾元素 */}
      <Image
        className="absolute md:top-[15vh] md:left-[28vw] z-[10]"
        src="/image/Decoration/product-tape-01.png"
        alt="mens"
        width={120}
        height={40}
      />
      <Image
        className="absolute top-[60vh] left-[85vw] md:top-[70vh] md:left-[63vw] z-[10] "
        src="/image/Decoration/product-tape-02.png"
        alt="mens"
        width={70}
        height={40}
      />
      <Image
        className="absolute top-[20vh] left-[20vw] md:w-[12rem] md:top-[40vh] md:left-[20vw] z-[10] w-[40vw]"
        src="/image/Decoration/product-tape-03.png"
        alt="mens"
        width={220}
        height={40}
      />
      <Image
        className="absolute top-[80vh] left-[35vw] md:top-[35vh] md:left-[40vw] z-[10] md:w-[12vw] w-[40vw]"
        src="/image/Decoration/product-tape-04.png"
        alt="mens"
        width={200}
        height={40}
      />
      <Image
        className="absolute top-[145vh] left-[30vw] md:top-[40vh] md:left-[72vw] z-[10] md:w-[12vw] w-[40vw]"
        src="/image/Decoration/product-tape-03.png"
        alt="mens"
        width={220}
        height={40}
      />
      {/* 大分類卡片 */}
      <CategoryCard />
      {/* 所有款式選染 */}
      <ProductsList url={api_url_path_g} />
      <ProductsList url={api_url_path_pe} />
    </div>
  );
};

export default page;
