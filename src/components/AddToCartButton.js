"use client"
import { useState, useEffect } from "react"
import { useGlobalState } from "@/context/GlobalContext"
import Image from "next/image"
import Link from "next/link";


export default function AddToCartButton({ product, fabric, print, onStatusChange }) {
  const { state, dispatch } = useGlobalState();
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    const isInCart = state.cart.some((item) => {
      const isSameProduct =
        product?.tProductStyleCode &&
        item.product?.tProductStyleCode === product.tProductStyleCode;

      const isSamePrint =
        print?.tArticleNo && item.print?.tArticleNo === print.tArticleNo;

      return isSameProduct || isSamePrint;
    });
    setIsAdd(isInCart);
    onStatusChange?.(isInCart); // 觸發父層的狀態更新
  }, [state.cart, product, print]);

  // 判斷是否已經加入購物車
  const handleClick = () => {
    if (!isAdd) {
      dispatch({
        type: "ADD_ITEM",
        payload: { product, fabric, print },
      });
    }
  };

  return (
    <button onClick={handleClick} className={`cart-btn ${isAdd && "inCart"} `}>
      {!isAdd ? (
        <div className="flex gap-2  items-center">
          <p>ADD TO CART</p>
          <Image
            className="w-[1.5rem] invert no-invert"
            src={"/svg/addCart.svg"}
            alt="add to cart btn"
            width={50}
            height={50}
          />
        </div>
      ) : (
        <Link href="/home_label/cart">
          <div className="flex gap-2  items-center ">
            <p>IN CART</p>
            <Image
              className=" w-[1.5rem]"
              src={"/svg/successAddCart.svg"}
              alt="in cart btn"
              width={50}
              height={50}
            />
          </div>
        </Link>
      )}
    </button>
  );
}