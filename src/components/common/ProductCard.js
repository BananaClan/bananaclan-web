import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const ProductCard = ({
  imageUrl,
  productName,
  price,
  productId,
  navigationUrl = "/",
  width = 318,
  height = 425,
  storeName = "v2shoestore"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const imageHeight = Math.round(height * 0.8);
  const contentHeight = height - imageHeight;
  const navigate = useNavigate();

  const ArrowIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={isHovered ? "#FFFFFF" : "#1D4ED8"}
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={`w-4 h-4 transition-transform duration-300 ${isHovered ? '-rotate-45' : ''}`}
    >
      <path d="M5 12h12" />
      <path d="M12 6l6 6-6 6" />
    </svg>
  );

  const ArrowButton = () => {
    const navigate = useNavigate();
    return (
      <button 
        onClick={() => navigate(navigationUrl)}
        className={`w-8 h-8 rounded-full border border-blue-700 flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'bg-blue-700' : 'hover:bg-blue-50'
        }`}
        aria-label="Navigate to next page"
      >
        <ArrowIcon />
      </button>
    );
  };

  // Handle click on the entire card
  const handleCardClick = () => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  // Handle arrow button click separately to prevent event bubbling
  const handleArrowClick = (e) => {
    e.stopPropagation(); // Prevent the card click event from firing
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  return (
    <div
      className="flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      style={{ width: `${width}px` }}
    >
      {/* Top store info div - slides down */}
      <div 
        className={` flex w-full px-4 py-3 bg-white  items-center gap-2  shadow-md transition-all duration-300 ease-in-out  ${
          isHovered ? '  opacity-100 -translate-y-20 ' : ' opacity-0 -top-0  translate-y-20'
        }`}
        style={{
          boxShadow: isHovered ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
          // transform: isHovered ? 'translateY(0)' : 'translateY(-100%)'
        }}
      >
        <div className="w-14 h-14 bg-yellow-300 rounded-full flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            className="w-8 h-8"
          >
            
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="text-base  font-medium pl-4"><div className="flex flex-col"><div className="font-satoshi">Sole by</div><div className="text-xl font-Satoshi"> {storeName}</div></div></span>
      </div>

      {/* Main card content */}
      <div className="bg-white -mt-20">
        <div className="overflow-hidden" style={{ height: `${imageHeight}px` }}>
          <img
            src={imageUrl}
            alt={productName}
            className={`object-cover w-full transition-transform duration-300 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            style={{ height: `${imageHeight}px` }}
          />
        </div>
        <div
          className="p-4 flex gap-3 justify-between bg-white"
          style={{ height: `${contentHeight}px` }}
        >
          <div>
            <h2 className="font-satoshi text-base font-medium mb-2">
              {productName}
            </h2>
            <p className="font-helvetica font-medium text-[20px] leading-7">
              {price}
            </p>
          </div>
          <div className="flex items-center justify-center">
          <button 
              onClick={handleArrowClick}
              className={`w-8 h-8 rounded-full border border-blue-700 flex items-center justify-center transition-all duration-300 ${
                isHovered ? 'bg-blue-700' : 'hover:bg-blue-50'
              }`}
              aria-label="View product details"
            >
            <ArrowButton />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};