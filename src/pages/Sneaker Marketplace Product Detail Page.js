import React, { useState } from "react";
import { Footer } from "../components/common/Footer";
import FAQSection from "../components/landingPagecomponents/FAQSection";
import {
  NewArrivalproducts,
  WeRecommendedProducts,
} from "../services/products";
import { ProductCard } from "../components/common/ProductCard";
import { NavandSearchSection } from "../components/layout/NavandSearchSection";

const ProductDetailPage = () => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [expandedSections, setExpandedSections] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const product = {
    name: "Adidas Samba Brazil Edition",
    price: 3099,
    colors: [
      { name: "Blue", image: "/assets/images/WRimage.jpg" },
      { name: "Black", image: "/assets/images/NewArrivalImage1.png" },
      { name: "White", image: "/assets/images/WRimage.jpg" },
      { name: "Red", image: "/assets/images/NewArrivalImage1.png" },
      { name: "Green", image: "/assets/images/WeRecommendImage.jpg" },
    ],
    sizes: [
      "UK 6",
      "UK 6.5",
      "UK 7",
      "UK 7.5",
      "UK 8",
      "UK 8.5",
      "UK 9",
      "UK 9.5",
      "UK 10",
      "UK 10.5",
      "UK 11",
      "UK 12",
    ],
    availableSizes: [
      "UK 6",
      "UK 6.5",
      "UK 8",
      "UK 8.5",
      "UK 9",
      "UK 9.5",
      "UK 10",
      "UK 10.5",
      "UK 11",
      "UK 12",
    ],
    images: [
      "/assets/images/WeRecommendImage.jpg",
      "/assets/images/WeRecommendImage.jpg",
      "/assets/images/NewArrivalImage1.png",
      "/assets/images/WRimage.jpg",
    ],
  };

  const handleColorSelect = (index) => {
    setSelectedColor(index);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const nextImage = () => {
    setMainImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const prevImage = () => {
    setMainImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header placeholder */}
      <div className=" my-4">
        <NavandSearchSection/>
      </div>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="text-sm mb-4">
          Home &gt; European Classics &gt; Adidas Samba &gt; Adidas Samba OG
          Black
        </div>

        {/* Product section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image gallery */}
          <div className="w-full md:w-1/2 flex">
            <div className="w-1/5 pr-4 flex flex-col">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product view ${index + 1}`}
                  className="w-[60px] h-[60px] object-cover mb-2 cursor-pointer"
                  onClick={() => setMainImageIndex(index)}
                />
              ))}
            </div>
            <div className="w-4/5 relative">
              <img
                src={product.images[mainImageIndex]}
                alt="Main product view"
                className="w-[535px] h-[626px] object-cover"
              />
              <div className="absolute bottom-8.5 right-10 flex">
                <button
                  onClick={prevImage}
                  className="bg-white p-2 rounded-full mr-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={34}
                    height={34}
                    fill="none"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="14 16 10 12 14 8" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="bg-white p-2 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={34}
                    height={34}
                    fill="none"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="10 16 14 12 10 8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <img
                src="/assets/images/brandLogo.png"
                alt="Brand logo"
                className="mr-2 w-6 h-6 rounded-full"
              />
              <span className="mr-4">Adidas</span>
              <img
                src="/assets/images/store1.jpg"
                alt="Seller profile"
                className="mr-2 w-6 h-6 rounded-full"
              />
              <span className="mr-4">tommy shoes</span>
              <span>12 sales in the last month</span>
            </div>
            <p className="text-2xl font-bold mb-1">₹ {product.price}</p>
            <p className="text-sm text-gray-600 mb-4">Inclusive of all taxes</p>

            {/* Color selection */}
            <div className="mb-4">
              <h2 className="font-semibold mb-2">Color</h2>
              <div className="flex gap-2">
                {product.colors.map((color, index) => (
                  <button
                    key={color.name}
                    className={`w-[70px] h-[70px] ${
                      selectedColor === index ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => handleColorSelect(index)}
                  >
                    <img
                      src={color.image}
                      alt={color.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="mb-4">
              <h2 className="font-semibold mb-2">Select Size</h2>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`p-2 border rounded ${
                      product.availableSizes.includes(size)
                        ? selectedSize === size
                          ? "bg-black text-white"
                          : "hover:bg-gray-100"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                    onClick={() =>
                      product.availableSizes.includes(size) &&
                      handleSizeSelect(size)
                    }
                    disabled={!product.availableSizes.includes(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <a href="#" className="text-sm text-blue-500 mt-2 inline-block">
                Size Guide
              </a>
            </div>

            {/* Add to cart */}
            <button className="w-full bg-black text-white py-3 rounded-4xl mb-4">
              ADD TO CART
            </button>
            <div className="flex justify-between text-sm mb-8">
              <span>COD Available</span>
              <span>7 Day Return</span>
              <span>Quality Assured</span>
            </div>

            {/* Product details accordion */}
            <div className="border-t">
              {[
                "know-your-kicks",
                "size-and-fit",
                "shipping-and-return",
                "caring-and-usage",
              ].map((section) => (
                <div key={section} className="border-b">
                  <button
                    className="w-full py-4 flex justify-between items-center"
                    onClick={() => toggleSection(section)}
                  >
                    <span className="font-semibold">
                      {section
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                    {expandedSections.includes(section) ?  <span>▲</span>: <span> ▼</span>}
                  </button>
                  {expandedSections.includes(section) && (
                    <div className="pb-4">
                      <p>Content for {section} goes here.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* You Might Also Like section */}
        <section className="mt-12">
          <div className="flex justify-between items-center mb-4 my-4">
            <h2 className="text-xl font-bold">You Might Also Like</h2>
            <button className="text-blue-500">VIEW ALL</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-4 ">
            {WeRecommendedProducts.slice(0, 4).map((WeRecommendedProducts) => (
              <ProductCard
                key={WeRecommendedProducts.id}
                imageUrl={WeRecommendedProducts.imageUrl}
                productName={WeRecommendedProducts.productName}
                price={WeRecommendedProducts.price}
              />
            ))}
          </div>
        </section>

        {/* More From Seller section */}
        <section className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">More From C.O.S</h2>
            <button className="text-blue-500">VIEW ALL</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-4">
            {NewArrivalproducts.slice(0, 8).map((NewArrivalproducts) => (
              <ProductCard
                key={NewArrivalproducts.id}
                imageUrl={NewArrivalproducts.imageUrl}
                productName={NewArrivalproducts.productName}
                price={NewArrivalproducts.price}
              />
            ))}
          </div>
        </section>

        {/* FAQ section */}
        <FAQSection />
      </main>

      {/* Footer placeholder */}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
