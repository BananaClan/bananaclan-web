import React, { useState } from 'react';


const Card = ({ image, title, description, width, height }) => (
  <div style={{ width, height }} className="bg-white overflow-hidden flex-shrink-0">
    <img src={image} alt={title} style={{ height: `${parseInt(height) * 0.75}px` }} className="w-full object-cover" />
    <div className="p-4">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <button className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800">
        SHOP NOW
      </button>
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
    overflow: 'hidden'
  };

  const sliderStyle = {
    display: 'flex',
    gap: `${gapWidth}px`,
    transition: 'transform 0.3s ease-in-out',
    transform: `translateX(-${currentIndex * (cardWidthValue + gapWidth)}px)`
  };

  return (
    <div style={containerStyle}>
      <div className="flex justify-between items-center mb-4 mr-16">
        <h2 className="text-[40px] font-normal font-helvetica">{name}</h2>
        <div className="flex gap-2">
          <button 
            onClick={prevSlide} 
            className={`p-2 rounded-full ${currentIndex === 0 ? 'bg-white text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-slate-100'}`}
            disabled={currentIndex === 0}
          >
                <div className='border rounded-3xl border-black p-3 w-[40px] h-[40px] flex items-center justify-center'><img src="/assets/icons/buttonIcon1.png" className='' alt='backwardbutton'/></div>
                </button>
          <button 
            onClick={nextSlide} 
            className={`p-2 rounded-full ${currentIndex >= cardData.length - 4 ? 'bg-white text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-slate-100 '}`}
            disabled={currentIndex >= cardData.length - 4}
          >
                <div className='border rounded-3xl border-black p-3 w-[40px] h-[40px] flex items-center justify-center'><img src="/assets/icons/buttonIcon2.png" className='' alt='forwardbutton'/></div>
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