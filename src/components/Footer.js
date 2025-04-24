import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className="bg-black flex text-white justify-between items-center px-[4rem] h-[5rem]">
      <div className="w-[3rem]">
        <Image
          src="/colab.svg"
          alt="colab logo"
          width={20}
          height={10}
          className="invert object-cover w-full h-full"
        />
      </div>
      <p>© 2025 All rights reserved COLAB.</p>
      <div className="w-[15rem]">
        <Image
          src="/fe.svg"
          alt="fe logo"
          width={20}
          height={10}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}

export default Footer