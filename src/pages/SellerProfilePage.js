import React, { useState, useEffect, useMemo } from "react";
import { ProductCard } from "../components/common/ProductCard";
import { NewArrivalproducts, WeRecommendedProducts } from "../services/products";
import { Footer } from "../components/common/Footer";

const GalleryImage = ({ src, width, height }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden"
      style={{ width, height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={src}
        alt="Gallery image"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "all 0.9s",
          filter: isHovered ? "none" : "grayscale(100%)",
          transform: `scale(${isHovered ? 1.05 : 1})`,
        }}
      />
    </div>
  );
};

const AboutSection = () => {
  const galleryImages = [
    { src: "/assets/images/store2.jpg" },
    { src: "/assets/images/store1.jpg" },
    { src: "/assets/images/store3.jpg" },
    { src: "/assets/images/store1.jpg" },
    { src: "/assets/images/store2.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const nextGallery = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, galleryImages.length - 3)
    );
  };

  const prevGallery = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const getImageForPosition = (position) => {
    const index = currentIndex + position;
    return index < galleryImages.length ? galleryImages[index].src : null;
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">

      <div>
        <h2 className="text-2xl font-bold mb-4">Bio</h2>
        <p className="text-gray-700 mb-8">
          Lorem ipsum dolor sit amet consectetur. Fermentum vitae posuere massa
          elementum quis. Sit in arcu fermentum ut.Lorem ipsum dolor sit amet
          consectetur. Fermentum vitae posuere massa elementum quis. Sit in arcu
          fermentum ut.
        </p>

        <div className="flex justify-between items-center mb-4">
  <h2 className="text-2xl font-bold">Gallery</h2>
  <div className="flex space-x-[-8px]">
    <button
      onClick={prevGallery}
      className={`p-2 rounded-full ${
        currentIndex === 0 ? "opacity-60 cursor-not-allowed" : ""
      }`}
      disabled={currentIndex === 0}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}
        style={{
          transform: "rotate(180deg)", 
          filter: currentIndex === 0 ? "opacity(0.6)" : "none",
          mixBlendMode: currentIndex === 0 ? "luminosity" : "normal"
        }}
      >
        <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <path d="M16 12l-4-4m4 4l-4 4m4-4H8"/>
        </g>
      </svg>
    </button>
    <button
      onClick={nextGallery}
      className={`p-2 rounded-full ${
        currentIndex >= galleryImages.length - 3 ? "opacity-60 cursor-not-allowed" : ""
      }`}
      disabled={currentIndex >= galleryImages.length - 3}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}
        style={{
          filter: currentIndex >= galleryImages.length - 3 ? "opacity(0.6)" : "none",
          mixBlendMode: currentIndex >= galleryImages.length - 3 ? "luminosity" : "normal"
        }}
      >
        <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <path d="M16 12l-4-4m4 4l-4 4m4-4H8"/>
        </g>
      </svg>
    </button>
  </div>
</div>
        <div className="flex space-x-1">
          {[0, 1, 2].map((position) => {
            const imageSrc = getImageForPosition(position);
            return imageSrc ? (
              <GalleryImage
                key={position}
                src={imageSrc}
                width={position === 1 ? 235 : 164}
                height={160}
              />
            ) : null;
          })}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Socials</h2>
        <div className="flex flex-row space-y-2 mb-8 gap-10">
          <a href="#" className="flex items-center space-x-2">
            <span className="w-6 h-6 inline-block">📷</span>
            <span>Instagram</span>
          </a>
          <a href="#" className="flex items-center space-x-2">
            <span className="w-6 h-6 inline-block">📱</span>
            <span>Whatsapp</span>
          </a>
          <a href="#" className="flex items-center space-x-2">
            <span className="w-6 h-6 inline-block">🐦</span>
            <span>Twitter</span>
          </a>
        </div>

        <h2 className="text-2xl font-bold mb-4">Address</h2>
        <p className="text-gray-700 mb-8">
          Shabeena Mazil 108, Hafiz Manzil
          <br />
          Mangamanpalaya, Bengaluru Urban,
          <br />
          560068
        </p>

        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <p className="text-gray-700">
          +91 9923457376 | theshoestorecalicut@gmail.com
        </p>
      </div>

     

    </div>
    <h1 className=' text-[40px] font-normal font-futura m-2 my-4'>Top Seller</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-4">
        {WeRecommendedProducts.slice(0,8).map((WeRecommendedProducts) => (
          <ProductCard
            key={WeRecommendedProducts.id}
            imageUrl={WeRecommendedProducts.imageUrl}
            productName={WeRecommendedProducts.productName}
            price={WeRecommendedProducts.price}
            width={280}
          />
        ))}
      </div>
    </>
  );
};

function SellerProfilePage() {
  const [selectedOption, setSelectedOption] = useState("Trending");

  const navOptions = ["Trending", "New Arrivals", "All Collections", "About"];

  const renderContent = () => {
    switch (selectedOption) {
      case "Trending":
        return <h2 className="text-2xl font-bold">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-4">
        {WeRecommendedProducts.map((WeRecommendedProducts) => (
          <ProductCard
            key={WeRecommendedProducts.id}
            imageUrl={WeRecommendedProducts.imageUrl}
            productName={WeRecommendedProducts.productName}
            price={WeRecommendedProducts.price}
            width={280}
          />
        ))}
      </div>
        </h2>;
      case "New Arrivals":
        return <h2 className="text-2xl font-bold mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-4">
        {WeRecommendedProducts.map((WeRecommendedProducts) => (
          <ProductCard
            key={WeRecommendedProducts.id}
            imageUrl={WeRecommendedProducts.imageUrl}
            productName={WeRecommendedProducts.productName}
            price={WeRecommendedProducts.price}
            width={280}
          />
        ))}
      </div>
        </h2>;
      case "All Collections":
        return <h2 className="text-2xl font-bold mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-4">
        {WeRecommendedProducts.map((WeRecommendedProducts) => (
          <ProductCard
            key={WeRecommendedProducts.id}
            imageUrl={WeRecommendedProducts.imageUrl}
            productName={WeRecommendedProducts.productName}
            price={WeRecommendedProducts.price}
            width={280}
          />
        ))}
      </div>
        </h2>;
      case "About":
        return <AboutSection />;
      default:
        return null;
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <div className="w-full relative bg-white">
        <img
          className="w-full h-[352px] object-cover"
          src="/assets/images/banner.png"
          alt="Header banner"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center -mt-32">
            <img
              className="w-40 h-40 rounded-full border-8 border-white"
              src="/assets/images/Nike.png"
              alt="Store logo"
            />
            <div className="mt-4 flex items-center">
              <h1 className="text-4xl font-bold text-black">The Shoe Store</h1>
            </div>
            <div className="mt-2 flex items-center text-[#aeaeae] text-xl">
              <span className="mr-2">📍</span> Calicut, Kerala
            </div>
          </div>

          <nav className="mt-16">
            <div className="flex items-center space-x-10 mb-2 relative">
              {navOptions.map((option) => (
                <button
                  key={option}
                  className={`text-2xl font-['Satoshi'] relative ${
                    option === selectedOption ? "font-medium" : "font-normal"
                  }`}
                  onClick={() => setSelectedOption(option)}
                >
                  {option}
                  {option === selectedOption && (
                    <div className="h-1 bg-black absolute bottom-[-8px] left-0 right-0"></div>
                  )}
                </button>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="w-full h-[1px] bg-[#e7e7e7]"></div>
            </div>
          </nav>

          {renderContent()}
        </div>
        <Footer/>
      </div>
    </main>
  );
}

export default SellerProfilePage;
