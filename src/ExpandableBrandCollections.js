import React, { useState, useRef } from "react";

const ProductCard = ({ name, price, imageSrc }) => (
  <div className="w-[302px] flex-shrink-0 mr-3">
    <img
      src={imageSrc}
      alt={name}
      className="w-full h-[395px] object-cover mb-2"
    />
    <p className="text-sm">{name}</p>
    <div className="flex justify-between items-center">
      <p className="font-bold">₹ {price}</p>
      <button className="text-2xl">→</button>
    </div>
  </div>
);

const BrandCollection = ({ brand, logo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -302 : 302;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Mock data for 20 products
  const products = Array(20)
    .fill()
    .map((_, index) => ({
      name: `${brand} Air Force 1 '07 Fresh`,
      price: "3,199",
      imageSrc: "/a1.png",
    }));

  return (
    <div className="border-b border-gray-300 py-4">
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
          <h2 className="text-3xl font-bold">{brand} COLLECTIONS</h2>
        </div>
        <span
          className={`text-xl transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="mt-4">
          <div className="flex justify-end mb-2">
            <button className="bg-white text-black px-4 py-2 rounded-full mr-2">
              VIEW ALL
            </button>
            <button
              onClick={() => scroll("left")}
              className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center mr-2"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center"
            >
              →
            </button>
          </div>
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide"
          >
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ExpandableBrandCollections = () => {
  const brands = [
    { name: "NIKE", logo: "/brandLogo.png" },
    { name: "ADIDAS", logo: "/brandLogo.png" },
    { name: "NEW BALANCE", logo: "/brandLogo.png" },
    { name: "ONITSUKA TIGER", logo: "/brandLogo.png" },
    { name: "CONVERSE", logo: "/brandLogo.png" },
  ];

  return (
    <div className="w-full flex justify-center px-6">
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
