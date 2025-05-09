"use client";
import ProductsList from "@/components/ProductsList";

const api_url_path = "http://localhost:53866/api/product/garment";

const Garment = () => {
  return (
    <div className="pt-[10rem]">
      {/* 所有款式選染 */}
      <ProductsList url={api_url_path} />
    </div>
  );
};

export default Garment;
