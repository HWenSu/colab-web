import { useState, useEffect } from 'react'
import Image from "next/image"

const StaffCard = ({
  name,
  lastName,
  jobPosition,
  imgUrl,
  yPosition,
  gridPosition,
}) => {
  const [isSmUp, setIsSmUp] = useState(false);

  // 判斷螢幕大小
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    const updateMatch = () => setIsSmUp(mediaQuery.matches);
    // 初始執行
    updateMatch();
    // 再次執行
    mediaQuery.addEventListener("change", updateMatch);
  }, []);

  return (
    <div
      className={`bg-white w-[12rem] ${!isSmUp&& gridPosition} `}
      style={{ transform: isSmUp ? `translateY(${yPosition}rem)` : undefined }}
    >
      <div className="text-black px-2">
        <h2 className="text-[1.8rem] font-bold">{name}</h2>
        <p className="text-xs">{lastName}</p>
        <p className="pt-4 text-xs">{jobPosition}</p>
      </div>
      <Image
        className="w-[12rem] -translate-x-1 translate-y-1"
        src={imgUrl}
        alt={name}
        width={300}
        height={400}
      />
    </div>
  );
};

export default StaffCard