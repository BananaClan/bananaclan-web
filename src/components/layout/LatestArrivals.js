import React, { useState, useEffect } from "react";

import { ProductCard } from "../common/ProductCard";
import { productApi } from "../../api/productApi";

export const LatestArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
 // Calculate dimensions and styles
 const cardWidth = 315; // Width of each card
 const gapWidth = 16; // Gap between cards

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

 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getLatestArrivals(8); // Fetching 4 products as shown in your original code
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch latest arrivals");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="mx-24 w-[1320px] h-[528px] mt-[72px] mb-4 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-24 w-[1320px] h-[528px] mt-[72px] mb-4 flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }
  console.log('Current products:', products);

  return (
    <div className="mx-24 w-[1320px] h-fit min-h-[528px] mt-[72px] flex flex-col gap-3">
      <div className="flex relative gap-2  flex-row py-[11.5px] justify-between items-center">
        <div className="text-[40px] font-normal font-helvetica leading-[46px]">
          Latest Arrivals
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

      <div className="flex overflow-x-clip flex-row  gap-[16px] hover:transform hover:0.3s hover:ease-in-out ">
        {" "}
        {products.map((product) => {
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
              key={product._id}
              className="flex "
              // style={{ width: cardWidth }}
            >
              <ProductCard
                key={product._id}
                productId={product._id} // Pass the product ID
                imageUrl={product.imageUrls[0].url}
                productName={product.name}
                price={`₹ ${product.price}`}
                storeName={product.seller?.name || "v2shoestore"} // Add seller name if available
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
