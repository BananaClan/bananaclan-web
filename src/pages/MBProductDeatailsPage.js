import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { productApi } from "../api/productApi";
import { useCart } from "../context/CartContext";
import SizeSelectorSheet from "../components/mobile/SizeSelectorSheet";

const MobileProductDetailPage = () => {
  const { addToCart, setIsOpen } = useCart();
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [expandedSections, setExpandedSections] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isSticky, setIsSticky] = useState(true);
  const [isSizeSelectorOpen, setIsSizeSelectorOpen] = useState(false);

  const sizeContainerRef = useRef(null);

  // Handle scroll behavior for sticky buttons
  useEffect(() => {
    const handleScroll = () => {
      if (!sizeContainerRef.current) return;

      const sizeContainer = sizeContainerRef.current;
      const sizeContainerBottom =
        sizeContainer.offsetTop + sizeContainer.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight;

      // If we've scrolled past the size container
      if (scrollPosition > sizeContainerBottom + 100) {
        // Adding 100px buffer
        setIsSticky(false); // Make buttons relative
      } else {
        setIsSticky(true); // Make buttons stick to viewport bottom
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch product data
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await productApi.getProductDetails(productId);
        const mainProduct = response.product;
        const similarProducts = response.similarProducts;
        setAllProducts([mainProduct, ...similarProducts]);
        setCurrentProduct(mainProduct);
        setProductData(mainProduct);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product details");
        console.log("Error fetching product details:", err);
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  // Image swipe handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && mainImageIndex < currentProduct.images.length - 1) {
      setMainImageIndex((prev) => prev + 1);
    }
    if (isRightSwipe && mainImageIndex > 0) {
      setMainImageIndex((prev) => prev - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setIsSizeSelectorOpen(true);
      return;
    }

    const cartItem = {
      id: currentProduct._id,
      name: currentProduct.name,
      seller: currentProduct.seller?.name || "V2 Shoes",
      size: selectedSize,
      quantity: 1,
      price: currentProduct.price,
      image: currentProduct.images[0].url,
    };
    addToCart(cartItem);
    setIsOpen(true);
  };

  const handleAddToBag = () => {
    if (selectedSize) {
      handleAddToCart();
      setIsSizeSelectorOpen(false);
    }
  };
  const getImageContainerWidth = () => {
    const screenWidth = window.innerWidth;
    // For screens <= 360px, image width is 328px
    // For screens > 360px, image width is screenWidth - 32px (16px padding on each side)
    return screenWidth <= 360 ? 328 : screenWidth - 32;
  };

  const ALL_POSSIBLE_SIZES = [
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
    "UK 11.5",
    "UK 12",
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/assets/animations/nike_loading.gif" alt="loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!currentProduct) return null;

  const availableSizes = currentProduct.variants
    .filter((v) => v.stockQuantity > 0)
    .map((v) => v.size);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-4 py-3">
        <button className="p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 19L5 12L12 5"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="flex space-x-4">
          <button className="p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <main className="flex-1">
        {/* Product Images with Dynamic Width */}
        <div className="px-4">
          <div
            className="relative mx-auto overflow-hidden"
            style={{
              width: `${getImageContainerWidth()}px`,
              height: `${getImageContainerWidth()}px`, // Maintain aspect ratio
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out h-full"
              style={{ transform: `translateX(-${mainImageIndex * 100}%)` }}
            >
              {currentProduct?.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`${currentProduct?.name} view ${index + 1}`}
                  style={{
                    width: `${getImageContainerWidth()}px`,
                    height: `${getImageContainerWidth()}px`,
                  }}
                  className="object-cover flex-shrink-0"
                />
              ))}
            </div>
          </div>
          {/* Image Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-4">
            {currentProduct?.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setMainImageIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  mainImageIndex === index ? "bg-black" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-satoshi font-semibold">
              {currentProduct?.name}
            </h1>
            <button className="p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"
                  stroke="black"
                  strokeWidth="2"
                />
                <path
                  d="M16 6l-4-4-4 4m4-4v13"
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>

          {/* Brand and Seller Info */}
          <div className="flex items-center space-x-4 mb-4">
            <img
              src="/assets/images/brandLogo.png"
              alt="Brand"
              className="w-6 h-6 rounded-full"
            />
            <span>{currentProduct?.brand}</span>
            <div className="h-5 border-l border-gray-300" />
            <div className="flex items-center">
              <img
                src="/assets/images/store1.jpg"
                alt="Seller"
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="text-sm text-gray-500">
                Sold By{" "}
                <span className="font-semibold underline">
                  {currentProduct?.seller?.name || "V2 Shoes"}
                </span>
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <p className="text-2xl font-bold font-helvetica">
              ₹{currentProduct?.price}
            </p>
            <p className="text-sm text-gray-500">Inclusive of all taxes</p>
          </div>

          {/* Size Selection */}
          <div ref={sizeContainerRef} className="mb-6">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold">Select Size</h2>
              <button className="text-gray-500">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {ALL_POSSIBLE_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    availableSizes.includes(size) && handleSizeSelect(size)
                  }
                  className={`p-2 border ${
                    availableSizes.includes(size)
                      ? selectedSize === size
                        ? "bg-black text-white"
                        : "border-black"
                      : "bg-gray-100 text-gray-400"
                  }`}
                  disabled={!availableSizes.includes(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Sticky Buttons */}
          <div
            className={`transition-all duration-200 ${
              isSticky ? "fixed bottom-0 pl-4 pr-4" : "sticky bottom-0"
            } left-0 right-0 bg-white border-t z-10`}
          >
            <div className="flex">
              <button
                onClick={handleAddToCart}
                className="flex-1 border border-black text-black py-4 font-satoshi text-base"
              >
                ADD TO CART
              </button>
              <button className="flex-1 bg-black text-white py-4 font-satoshi text-base">
                BUY NOW
              </button>
            </div>
          </div>

          {/* Product Details Accordion */}
          <div className="mt-6 mb-32">
            {[
              {
                id: "know-your-kicks",
                title: "Know Your Kicks",
                content: currentProduct?.description?.knowYourKicks?.desc,
              },
              {
                id: "size-and-fit",
                title: "Size And Fit",
                content: currentProduct?.description?.sizeAndFit?.desc,
              },
              {
                id: "shipping-and-return",
                title: "Shipping And Return",
                content: currentProduct?.description?.shippingAndReturn?.desc,
              },
              {
                id: "caring-and-usage",
                title: "Caring And Usage",
                content: currentProduct?.description?.carriageAndusage?.desc,
              },
            ].map((section) => (
              <div key={section.id} className="border-b">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex justify-between items-center py-4"
                >
                  <span>{section.title}</span>
                  <svg
                    className={`transform transition-transform ${
                      expandedSections.includes(section.id) ? "rotate-180" : ""
                    }`}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M19 9l-7 7-7-7" stroke="black" strokeWidth="2" />
                  </svg>
                </button>
                {expandedSections.includes(section.id) && (
                  <div className="pb-4">
                    <p>{section.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      {/* Size Selector Bottom Sheet */}
      <SizeSelectorSheet
        isOpen={isSizeSelectorOpen}
        onClose={() => setIsSizeSelectorOpen(false)}
        sizes={ALL_POSSIBLE_SIZES}
        availableSizes={availableSizes}
        selectedSize={selectedSize}
        onSizeSelect={handleSizeSelect}
        onAddToBag={handleAddToBag}
      />
    </div>
  );
};

export default MobileProductDetailPage;
