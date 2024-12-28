import React, { useState, useRef, useEffect } from "react";
import { brands } from "../../services/products";
import { ProductCard } from "../common/ProductCard";
import { NewArrivalproducts } from "../../services/products";

const BrandCollection = ({ brand, logo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef(null);
  const cardWidth = 315; // Width of each card
  const gapWidth = 16; // Gap between cards

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < NewArrivalproducts.length - 4) {
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

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -302 : 302;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
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
    <div className="border-b border-black py-4">
      <div
        className="flex justify-between items-center cursor-pointer w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <img
            src={logo}
            alt={`${brand} logo`}
            className="w-[128px] h-[96px] mr-4"
          />
          <h2 className="font-futurac font-condensed text-5xl leading-[54.11px]">
            {brand} COLLECTIONS
          </h2>
        </div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            d="M4 4L12 12M12 12H6M12 12V6"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="mt-4 flex flex-col">
          <div className="flex relative gap-2  flex-row py-[11.5px] justify-between items-center">
            <div className="text-[40px] font-normal font-helvetica leading-[46px]"></div>
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
          <div className="relative overflow-visible">
          <div
    ref={scrollContainerRef}
    className="flex overflow-x-auto hide-scrollbar gap-[16px] py-20 -my-20"
    style={{
      scrollSnapType: 'x mandatory',
      WebkitOverflowScrolling: 'touch'
    }}
  >
            {NewArrivalproducts.map((product) => {
              return (
                <div
  key={product.id}
  className="flex-shrink-0 relative"
  style={{
    width: cardWidth,
    scrollSnapAlign: 'start'
  }}
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
        </div>
      </div>
    </div>
  );
};

const ExpandableBrandCollections = () => {
  return (
    <div className="w-full flex justify-center px-6 mt-[72px]">
      <div className="w-full max-w-[1320px]">
        {brands.map((brand) => (
          <BrandCollection
            key={brand.name}
            brand={brand.name}
            logo={brand.logo}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpandableBrandCollections;
