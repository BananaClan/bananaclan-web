import React, { useState } from "react";

export const HeroImageContainer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="relative w-full max-w-[1512px] mx-auto mt-10">
      <div
        className="relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Base Image */}
        <img
          src="/assets/images/Hero.webp"
          className="w-full object-cover"
          alt="Hero"
        />

        {/* Overlay Image with Circular Mask */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            opacity: isHovering ? 1 : 0,
            transition: "opacity 0.2s ease",
            maskImage: `radial-gradient(circle 80px at ${mousePosition.x}px ${mousePosition.y}px, black 100%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 80px at ${mousePosition.x}px ${mousePosition.y}px, black 100%, transparent 100%)`,
          }}
        >
          <img
            src="/assets/images/hero2.webp"
            className="w-full h-full object-cover"
            alt="Hero 2"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroImageContainer;
