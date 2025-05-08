"use client"
import { useGlobalState } from "@/context/GlobalContext"
import Image from "next/image"

export default function RemoveFromCartButton({ product, fabric, print, onRemove }) {
  const { state, dispatch } = useGlobalState();

  const inChart = state.cart.some(
    (item) =>
      item.product?.tProductStyleCode === product?.tProductStyleCode ||
      item.print?.tArticleNo === print?.tArticleNo
  );

  const handleClick = () => {
    if (inChart) {
      dispatch({
        type: "REMOVE_ITEM",
        payload: { product, fabric, print },
      });
    }

    // 通知父層更新畫面
    if (onRemove) onRemove();
  };

  return (
    <button onClick={handleClick} className="cart-btn remove-btn">
      <p>REMOVE </p>
      <Image
        className="invert w-[1.5rem]"
        src={"/svg/removeCart.svg"}
        alt="remove from cart btn"
        width={50}
        height={50}
      />
    </button>
  );
}