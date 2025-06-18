"use client";
import ProductsList from "@/components/ProductsList";
import { apiUrls } from "@/APIConnection";


const Garment = () => {
  return (
    <div className="pt-[10rem]">
      {/* 所有款式選染 */}
      <ProductsList url={apiUrls.api_url_path_pe} />
    </div>
  );
};

export default Garment;
