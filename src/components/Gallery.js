"use client";
import Image from "next/image";
import { useRef, useState } from "react";

const Gallery = ({ images }) => {
  const galleryContainer = useRef();
  const galleryItem = useRef();
  const indicator = useRef();
  const [hoveredIndex, setHoveredIndex] = useState(null) //預設

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  } 


  return (
    <div className="gallery-container" ref={galleryContainer}>
      <div className="gallery">
        {images &&
          images.map((image, index) => (
            <div
              className={`gallery-item ${ 
                 hoveredIndex === index
                  ? "hover-item"
                  : ""
              }`}
              key={image}
              ref={galleryItem}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Image src={image} alt={image} width={400} height={900} />
            </div>
          ))}
      </div>
    </div>
  );
};
export default Gallery;
