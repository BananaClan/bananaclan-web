import React, { useState, useRef, useEffect } from "react";

const Card = ({ image, title, description, width, height }) => (
  <div
    style={{ width, height }}
    className="overflow-hidden flex-shrink-0"
  >
    <img
      src={image}
      alt={title}
      style={{ height: `${parseInt(height) * 0.75}px` }}
      className="w-full object-cover"
    />
    <div>
      <div className="flex items-center gap-3 pt-4 bg-white justify-between">
        <div className="flex">
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
            <span className="text-gray-500 text-sm font-satoshi">Calicut, Kerala</span>
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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef(null);

  const cardWidthValue = parseFloat(cardWidth);
  const gapWidth = 16;
  const visibleWidth = cardWidthValue * 4 + gapWidth * 3;
  const fifthCardVisibleWidth = 50;

  const containerStyle = {
    width: `${visibleWidth + fifthCardVisibleWidth}px`,
    overflow: "hidden",
  };

  const nextSlide = () => {
    if (currentIndex < cardData.length - 4) {
      const nextIndex = currentIndex + 1;
      scrollContainerRef.current?.scrollTo({
        left: nextIndex * (cardWidthValue + gapWidth),
        behavior: "smooth",
      });
      setCurrentIndex(nextIndex);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      scrollContainerRef.current?.scrollTo({
        left: prevIndex * (cardWidthValue + gapWidth),
        behavior: "smooth",
      });
      setCurrentIndex(prevIndex);
    }
  };

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

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollPosition = scrollContainerRef.current.scrollLeft;
        const newIndex = Math.round(scrollPosition / (cardWidthValue + gapWidth));
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
  }, [currentIndex, cardWidthValue, gapWidth]);

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
                : "bg-white hover:bg-slate-100"
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
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {cardData.map((card, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{
                width: cardWidth,
                scrollSnapAlign: "start",
              }}
            >
              <Card
                image={card.imageUrl}
                title={card.productName}
                description={card.description}
                width={cardWidth}
                height={cardHeight}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlidingCards;