import React, { useState } from "react";

const Card = ({ image, title, description, width, height }) => (
  <div
    style={{ width, height }}
    className=" overflow-hidden flex-shrink-0"
  >
    <img
      src={image}
      alt={title}
      style={{ height: `${parseInt(height) * 0.75}px` }}
      className="w-full object-cover"
    />
    <div >
    


   <div className="flex items-center gap-3 pt-4 bg-white justify-between">
    <div className="flex ">
      <div className="w-12 h-12 rounded-full bg-yellow-300 flex items-center justify-center">
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
      <div className="flex flex-col pl-2">
        <span className="font-medium font-satoshi text-xl">{title}</span>
        <span className="text-gray-500 text-sm font-satoshi ">Calicut, Kerala</span>
      </div>
      </div>
      <div className="ml-8">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 17L16 8M16 8H7M16 8V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>


    </div>
  </div>
);

const SlidingCards = ({ name, cardData, cardWidth, cardHeight }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < cardData.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const cardWidthValue = parseFloat(cardWidth);
  const gapWidth = 16; // Gap between cards
  const visibleWidth = cardWidthValue * 4 + gapWidth * 3; // Width of 4 cards + 3 gaps
  const fifthCardVisibleWidth = 50; // Width of visible portion of 5th card

  const containerStyle = {
    width: `${visibleWidth + fifthCardVisibleWidth}px`,
    overflow: "hidden",
  };

  const sliderStyle = {
    display: "flex",
    gap: `${gapWidth}px`,
    transition: "transform 0.3s ease-in-out",
    transform: `translateX(-${currentIndex * (cardWidthValue + gapWidth)}px)`,
  };

  return (
    <div style={containerStyle}>
      <div className="flex justify-between items-center mb-4 mr-16">
        <h2 className="text-[40px] font-normal font-helvetica">{name}</h2>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className={`p-2 rounded-full ${
              currentIndex === 0
                ? "bg-white text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-slate-100"
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
            className={`p-2 rounded-full ${
              currentIndex >= cardData.length - 4
                ? "bg-white text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-slate-100 "
            }`}
            disabled={currentIndex >= cardData.length - 4}
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
      <div className="relative overflow-hidden">
        <div style={sliderStyle}>
          {cardData.map((card, index) => (
            <Card
              key={index}
              image={card.imageUrl}
              title={card.productName}
              description={card.description}
              width={cardWidth}
              height={cardHeight}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlidingCards;
