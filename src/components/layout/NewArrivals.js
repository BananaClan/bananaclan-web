import React, { useState } from "react";
import { ProductCard } from "../common/ProductCard";
import { NewArrivalproducts } from "../../services/products";

export const NewArrivals = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < NewArrivalproducts.length - 4) {
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
  const gapWidth = 16; // Gap between cards
  const visibleWidth = cardWidth * 4 + gapWidth * 3; // Width for 4 cards + gaps

  const sliderStyle = {
    display: "flex flex-row  w-screen overflow-x-hidden ",
    gap: `${gapWidth}px`,
    transition: "transform 0.3s ease-in-out",
    transform: `translateX(-${currentIndex * (cardWidth + gapWidth)}px)`,
  };

  return (
    <div className="mx-24 w-[1320px] h-fit min-h-[528px] mt-[72px] flex flex-col gap-3">
      <div className="flex relative gap-2  flex-row py-[11.5px] justify-between items-center">
        <div className="text-[40px] font-normal font-helvetica leading-[46px]">
          New Arrivals
        </div>
        <div className="flex flex-row gap-5 w-[227px] h-[40px] justify-between items-center mr-3">
          <div className="font-satoshi font-normal text-[16px] leading-[21.6px] rounded-4xl border py-2 px-5 border-black flex items-center w-[111px] h-[38px]">
            View ALL
          </div>
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
                currentIndex >= NewArrivalproducts.length - 4
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={currentIndex >= NewArrivalproducts.length - 4}
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
      {/* <div className="flex overflow-y-visible">  */}
      {/* <div className="flex flex-row w-screen overflow-x-hidden">
          <div style={sliderStyle}> */}
      <div
        // style={{overflow:'inherit'}}
        className="flex overflow-x-clip flex-row  gap-[16px] hover:transform hover:0.3s hover:ease-in-out "
      >
        {NewArrivalproducts.map((product) => {
          return (
            <div
              style={{
                width: cardWidth,
                gap: `${gapWidth}px`,
                transition: "transform 0.3s ease-in-out",
                transform: `translateX(-${
                  currentIndex * (cardWidth + gapWidth)
                }px)`,
              }}
              key={product.id}
              className="flex  "
              // style={{ width: cardWidth }}
            >
              <ProductCard
                imageUrl={product.imageUrl}
                productName={product.productName}
                price={product.price}
                navigationUrl={`/product/${product.id}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
