"use client";
import ProductsList from "@/components/ProductsList";

const Garment = () => {
  return (
    <div className="pt-[10rem]">
      {/* 所有款式選染 */}
      <ProductsList url={"/data/Product_Garment.json"} />
    </div>
  );
};

export default Garment;
