import React, { useState } from "react";
import { ProductCard } from "../common/ProductCard";

export const ProductSlider = ({ sectionTitle, products, viewAllLink = "#" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < products.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Calculate dimensions and styles
  const cardWidth = 315; // Width of each card
  const gapWidth = 16;  // Gap between cards

  return (
    <div className="w-[1320px] h-fit min-h-[528px]  flex flex-col gap-3">
      <div className="flex relative gap-2 flex-row py-[11.5px] justify-between items-center">
        <div className="text-[36px] font-normal font-helvetica leading-[46.8px]">
          {sectionTitle}
        </div>
        <div className="flex flex-row gap-5 w-[227px] h-[40px] justify-between items-center mr-3">
          <a 
            href={viewAllLink}
            className="font-satoshi font-normal text-[16px] leading-[21.6px] rounded-4xl border py-2 px-5 border-black flex items-center w-[111px] h-[38px]"
          >
            View ALL
          </a>
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className={`${
                currentIndex === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={currentIndex === 0}
            >
              <div className="border rounded-3xl border-black p-3 w-[40px] h-[40px] flex items-center justify-center">
                <img
                  src="/assets/icons/buttonIcon1.png"
                  className=""
                  alt="backwardbutton"
                />
              </div>
            </button>
            <button
              onClick={nextSlide}
              className={`${
                currentIndex >= products.length - 4
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={currentIndex >= products.length - 4}
            >
              <div className="border rounded-3xl border-black p-3 w-[40px] h-[40px] flex items-center justify-center">
                <img
                  src="/assets/icons/buttonIcon2.png"
                  className=""
                  alt="forwardbutton"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex overflow-x-clip flex-row gap-[16px] hover:transform hover:0.3s hover:ease-in-out">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex"
            style={{
              width: cardWidth,
              gap: `${gapWidth}px`,
              transition: "transform 0.3s ease-in-out",
              transform: `translateX(-${
                currentIndex * (cardWidth + gapWidth)
              }px)`,
            }}
          >
            <ProductCard
              imageUrl={product.imageUrl}
              productName={product.productName}
              price={product.price}
              navigationUrl={`/product/${product.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};