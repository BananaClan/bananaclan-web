import React, { useState, useRef, useEffect } from "react";
import { ProductCard } from "../common/ProductCard";

export const ProductSlider = ({ sectionTitle, products, viewAllLink = "#" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef(null);

  // Calculate dimensions
  const cardWidth = 315;
  const gapWidth = 16;

  const nextSlide = () => {
    if (currentIndex < products.length - 4) {
      const nextIndex = currentIndex + 1;
      scrollContainerRef.current?.scrollTo({
        left: nextIndex * (cardWidth + gapWidth),
        behavior: "smooth",
      });
      setCurrentIndex(nextIndex);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      scrollContainerRef.current?.scrollTo({
        left: prevIndex * (cardWidth + gapWidth),
        behavior: "smooth",
      });
      setCurrentIndex(prevIndex);
    }
  };

  // Mouse/Touch handlers for dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scrolling speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Track scroll position and update currentIndex
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollPosition = scrollContainerRef.current.scrollLeft;
        const newIndex = Math.round(scrollPosition / (cardWidth + gapWidth));
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [currentIndex, cardWidth, gapWidth]);

  return (
    <div className="w-[1320px] h-fit min-h-[528px] flex flex-col gap-3 ">
      <div className="flex relative gap-2 flex-row py-[11.5px] justify-between items-center">
        <div className="text-[40px] font-normal font-helvetica leading-[46.8px]">
          {sectionTitle}
        </div>
        <div className="flex flex-row gap-5 w-[227px] h-[40px] justify-between items-center mr-3">
          <a
            href={viewAllLink}
            className="font-satoshi font-normal text-black hover:text-white text-base leading-[21.6px] rounded-4xl border py-2 px-5 border-black hover:bg-black transition-colors duration-300 flex items-center w-28 h-[38px]"
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

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto hide-scrollbar"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="flex gap-[16px] ">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0"
              style={{
                width: cardWidth,
                scrollSnapAlign: "start",
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
    </div>
  );
};