"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import RemoveFromCartButton from "@/components/RemoveFromCartButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import PDFGenerator from "@/components/PDFGenerator";
import {  pdf } from "@react-pdf/renderer";

export default function ChartPage() {
  const [chartItems, setChartItems] = useState([]);
  const [noteValue, setNoteValue] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  const [pdfBlobUrl, setPdfBlobUrl] = useState("")

  // 處理preferences勾選
const handleTogglePreference = (index, value) => {
  setChartItems((prev) => {
    return prev.map((item, i) => {
      if (i !== index) return item;

      const currentPreferences = item.preferences || [];
      const newPreferences = currentPreferences.includes(value)
        ? currentPreferences.filter((p) => p !== value)
        : [...currentPreferences, value];

      return {
        ...item,
        preferences: newPreferences,
      };
    });
  });
};

// 處理文字框
const handleTextareaChange = (e) => {
  setNoteValue(e.target.value)
}

// 處理信件發送
const handleSend = async () => {
  // 生成PDF Blob
  const blob = await pdf(
    <PDFGenerator items={chartItems} noteValue={noteValue} />
  ).toBlob();

  const blobUrl = URL.createObjectURL(blob)
  setPdfBlobUrl(blobUrl)
  setShowPopup(true)
}


  useEffect(() => {
    const cartState = JSON.parse(localStorage.getItem("cartState"));
    if (cartState.cart) {
      const itemsWithPreferences = cartState.cart.map((item) => ({
        ...item,
        preferences: ["garment"], // 每筆商品自己有個 preferences 陣列
      }));
      setChartItems(itemsWithPreferences);
    }
  }, []);

  return (
    <div className="max-w-[1280px] mx-auto pt-[8rem]">
      <ul className="cart-container">
        <h2 className="border-b pb-[2rem]">SELECTED LIST</h2>
        {chartItems && chartItems.length > 0 ? (
          chartItems.map((item, index) => {
            const styleNo = item.product?.tProductStyleCode;
            const fabricCode = item.product?.tFabricCode;
            const name = item.product?.tStyleName;
            const styleType = item.product?.tStyleTypeName;
            const image = item.product?.tFilePath[0];
            const fabricType = item.fabric?.tFabricType;
            const composition = item.fabric?.tFabricComposition;
            // 印繡花商品資訊
            const printNo = item.print?.tArticleNo;
            const printImage = item.print?.tFilePath[0];
            const printTech = item.print?.tTechName;

            // 成衣款式
            return styleNo ? (
              <li key={`style-${styleNo}`}>
                <Link
                  href={`/home_label/products/garment/${item.product?.tProductStyleSysCode}`}
                >
                  <Image src={image} alt={styleNo} width={100} height={100} />
                </Link>
                <div>
                  <h2>Garment No: {styleNo}</h2>
                  <p>{name}</p>
                  <p>{styleType}</p>
                </div>
                <div>
                  <h2>Fabric No: {fabricCode}</h2>
                  <p>{fabricType}</p>
                  <p>{composition}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`garment-${index}`}
                      checked={item.preferences.includes("garment")}
                      onCheckedChange={() =>
                        handleTogglePreference(index, "garment")
                      }
                    />
                    <Label htmlFor={`garment-${index}`}>Garment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`fabric-${index}`}
                      checked={item.preferences.includes("fabric")}
                      onCheckedChange={() =>
                        handleTogglePreference(index, "fabric")
                      }
                    />
                    <Label htmlFor={`fabric-${index}`}>Fabric</Label>
                  </div>
                </div>
                <div>
                  <RemoveFromCartButton
                    product={item.product}
                    fabric={item.fabric}
                    onRemove={() => {
                      setChartItems((prev) =>
                        prev.filter(
                          (ci) =>
                            ci.product.tProductStyleCode !== styleNo ||
                            ci.fabric.tFabricCode !== fabricCode
                        )
                      );
                    }}
                  />
                </div>
              </li>
            ) : (
              <li key={`print-${printNo}`}>
                <Image
                  src={printImage}
                  alt={printNo}
                  width={100}
                  height={100}
                />
                <h2>Print No: {printNo}</h2>
                <div>
                  {printTech &&
                    printTech.map((tech) => (
                      <p key={`${printNo}-${tech}`}>{tech}</p>
                    ))}
                </div>
                <div></div>
                <div>
                  <RemoveFromCartButton
                    print={item.print}
                    onRemove={() => {
                      setChartItems((prev) =>
                        prev.filter((ci) => ci.print.tArticleNo !== printNo)
                      );
                    }}
                  />
                </div>
              </li>
            );
          })
        ) : (
          <p className="text-gray-500 py-8">Your cart is currently empty.</p>
        )}

        <div className="px-8 py-4">
          <Label htmlFor="client-note">Note: </Label>
          <Textarea
            id="client-note"
            value={noteValue}
            onChange={handleTextareaChange}
            placeholder="Enter your message here..."
            rows={5} // 設置行數
          />
        </div>
      </ul>
      <button
        className="cart-btn mb-[4rem] mx-auto w-[20rem]"
        onClick={handleSend}
      >
        SEND TO FENC
      </button>

      {/* 發送成功彈出框 */}
      {showPopup && (
        <div className="popup-container relative">
          <h3 className="animate-slide-up">ALREADY SENT TO FENC</h3>
          {pdfBlobUrl && (
            <div className="flex flex-col gap-8 mt-12">
              <button className="cart-btn ">
                <Link
                  href={pdfBlobUrl}
                  download="cart-summary.pdf"
                  target="_blank"
                >
                  <p>DOWNLOAD PDF</p>
                </Link>
              </button>
              <button
                className="cart-btn remove-btn"
                onClick={() => setShowPopup(false)}
              >
                <Image
                  src="/svg/back.svg"
                  alt="back"
                  width={15}
                  height={15}
                  className="invert"
                />
                <p>BACK</p>
              </button>
              <button
                className="absolute top-5 end-5"
                onClick={() => setShowPopup(false)}
              >
                <Image src="/svg/close.svg" alt="back" width={20} height={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
