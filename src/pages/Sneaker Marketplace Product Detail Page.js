import React, { useState } from "react";
import { Footer } from "../components/common/Footer";
import FAQSection from "../components/landingPagecomponents/FAQSection";
import {
  NewArrivalproducts,
  WeRecommendedProducts,
} from "../services/products";
import { NavandSearchSection } from "../components/layout/NavandSearchSection";
import { ProductSlider } from "../components/common/ProductSlider";

const ProductDetailPage = () => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [expandedSections, setExpandedSections] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const product = {
    name: "Adidas Samba Brazil Edition",
    price: 3099,
    colors: [
      {
        name: "Blue",
        image: "/assets/images/WRimage.jpg",
        productImages: [
          "/assets/images/WRimage.jpg",
          "/assets/images/WRimage.jpg",
          "/assets/images/WRimage.jpg",
          "/assets/images/WRimage.jpg",
        ],
      },
      {
        name: "Black",
        image: "/assets/images/NewArrivalImage1.png",
        productImages: [
          "/assets/images/NewArrivalImage1.png",
          "/assets/images/NewArrivalImage1.png",
          "/assets/images/NewArrivalImage1.png",
          "/assets/images/NewArrivalImage1.png",
        ],
      },
      {
        name: "White",
        image: "/assets/images/WRimage.jpg",
        productImages: [
          "/assets/images/WRimage.jpg",
          "/assets/images/WRimage.jpg",
          "/assets/images/WRimage.jpg",
          "/assets/images/WRimage.jpg",
        ],
      },
      {
        name: "Red",
        image: "/assets/images/NewArrivalImage1.png",
        productImages: [
          "/assets/images/NewArrivalImage1.png",
          "/assets/images/NewArrivalImage1.png",
          "/assets/images/NewArrivalImage1.png",
          "/assets/images/NewArrivalImage1.png",
        ],
      },
      {
        name: "Green",
        image: "/assets/images/WeRecommendImage.jpg",
        productImages: [
          "/assets/images/WeRecommendImage.jpg",
          "/assets/images/WeRecommendImage.jpg",
          "/assets/images/WeRecommendImage.jpg",
          "/assets/images/WeRecommendImage.jpg",
        ],
      },
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
      "UK 11.5",
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
  };

  // Initialize images array with the first color's productImages
  const [currentImages, setCurrentImages] = useState(
    product.colors[0].productImages
  );

  const handleColorSelect = (index) => {
    setSelectedColor(index);
    setMainImageIndex(0); // Reset to first image position
    setCurrentImages(product.colors[index].productImages);
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
    setMainImageIndex((prevIndex) => (prevIndex + 1) % currentImages.length);
  };

  const prevImage = () => {
    setMainImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + currentImages.length) % currentImages.length
    );
  };

  return (
    <div className="flex flex-col min-h-screen px-4 md:px-6 lg:px-8">
      {/* Header placeholder */}
      <div className="mt-[50px]">
        <NavandSearchSection />
      </div>

      {/* Main content */}
      <main className="flex-grow  ">
        <div className=" px-4 py-8 container mx-auto max-w-[1512px] ">
          {/* Breadcrumbs */}
          <div className="max-w-[1320px] mx-auto">
    <div className="flex flex-row text-sm font-normal mb-5">
      <div className="font-satoshi">
        Home &gt; European Classics &gt; Adidas Samba &gt;
      </div>
      <div className="font-medium">Adidas Samba OG Black</div>
    </div>
  </div>

          {/* Product section */}
          <div className="flex flex-col md:flex-row   max-w-[1320px] mx-auto">
            {/* Image gallery */}
            <div className="md:w-1/2 flex gap-4">
              <div className="flex flex-col">
                {currentImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Product view ${index + 1}`}
                    className="w-[60px] h-[60px] object-cover mb-2 cursor-pointer"
                    onClick={() => setMainImageIndex(index)}
                  />
                ))}
              </div>
              <div className="relative">
                <img
                  src={currentImages[mainImageIndex]}
                  alt="Main product view"
                  className="w-[535px] h-[626px] object-cover"
                />
                <div className="w-[96px] absolute bottom-[580px] right-10 flex gap-4">
                  <button
                    onClick={prevImage}
                    className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Product info */}
            <div className="w-full md:w-[498px]">
              <div className="flex flex-row justify-between">
                <h1 className="text-2xl leading-8 mb-2 font-satoshi ">
                  {product.name}
                </h1>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="35"
                    height="35"
                    rx="17.5"
                    fill="white"
                  />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="35"
                    height="35"
                    rx="17.5"
                    stroke="black"
                  />
                  <path
                    d="M21.5008 20.0001C21.1266 20.002 20.7575 20.0879 20.4209 20.2514C20.0842 20.415 19.7886 20.652 19.5558 20.9451L15.9008 18.6601C16.034 18.2302 16.034 17.77 15.9008 17.3401L19.5558 15.0551C19.9268 15.5145 20.4484 15.8277 21.0282 15.9393C21.608 16.0509 22.2086 15.9537 22.7236 15.6649C23.2386 15.3761 23.6347 14.9143 23.8419 14.3614C24.049 13.8085 24.0538 13.2001 23.8553 12.644C23.6568 12.0879 23.2679 11.62 22.7575 11.3232C22.2471 11.0264 21.6481 10.9198 21.0666 11.0224C20.4851 11.1249 19.9587 11.43 19.5806 11.8835C19.2025 12.337 18.9971 12.9097 19.0008 13.5001C19.0033 13.7237 19.0369 13.9458 19.1008 14.1601L15.4458 16.4451C15.1231 16.0389 14.6821 15.7431 14.1838 15.5988C13.6855 15.4545 13.1547 15.4687 12.6648 15.6396C12.175 15.8105 11.7505 16.1295 11.4501 16.5525C11.1497 16.9754 10.9883 17.4813 10.9883 18.0001C10.9883 18.5189 11.1497 19.0248 11.4501 19.4478C11.7505 19.8707 12.175 20.1897 12.6648 20.3606C13.1547 20.5315 13.6855 20.5457 14.1838 20.4014C14.6821 20.2571 15.1231 19.9613 15.4458 19.5551L19.1008 21.8401C19.0369 22.0544 19.0033 22.2765 19.0008 22.5001C19.0008 22.9946 19.1474 23.4779 19.4222 23.889C19.6969 24.3002 20.0873 24.6206 20.5441 24.8098C21.0009 24.999 21.5036 25.0485 21.9886 24.9521C22.4735 24.8556 22.919 24.6175 23.2686 24.2679C23.6182 23.9182 23.8563 23.4728 23.9528 22.9878C24.0493 22.5029 23.9997 22.0002 23.8105 21.5434C23.6213 21.0866 23.3009 20.6961 22.8898 20.4214C22.4786 20.1467 21.9953 20.0001 21.5008 20.0001ZM21.5008 12.0001C21.7975 12.0001 22.0875 12.0881 22.3342 12.2529C22.5809 12.4177 22.7731 12.652 22.8866 12.9261C23.0002 13.2002 23.0299 13.5018 22.972 13.7927C22.9141 14.0837 22.7713 14.351 22.5615 14.5608C22.3517 14.7705 22.0844 14.9134 21.7935 14.9713C21.5025 15.0292 21.2009 14.9995 20.9268 14.8859C20.6527 14.7724 20.4184 14.5801 20.2536 14.3335C20.0888 14.0868 20.0008 13.7968 20.0008 13.5001C20.0008 13.1023 20.1589 12.7207 20.4402 12.4394C20.7215 12.1581 21.103 12.0001 21.5008 12.0001ZM13.5008 19.5001C13.2042 19.5001 12.9141 19.4121 12.6675 19.2473C12.4208 19.0825 12.2285 18.8482 12.115 18.5741C12.0015 18.3 11.9718 17.9984 12.0296 17.7075C12.0875 17.4165 12.2304 17.1492 12.4402 16.9394C12.6499 16.7297 12.9172 16.5868 13.2082 16.5289C13.4992 16.471 13.8008 16.5008 14.0749 16.6143C14.3489 16.7278 14.5832 16.9201 14.748 17.1667C14.9129 17.4134 15.0008 17.7034 15.0008 18.0001C15.0008 18.3979 14.8428 18.7795 14.5615 19.0608C14.2802 19.3421 13.8986 19.5001 13.5008 19.5001ZM21.5008 24.0001C21.2042 24.0001 20.9141 23.9121 20.6675 23.7473C20.4208 23.5825 20.2285 23.3482 20.115 23.0741C20.0015 22.8 19.9718 22.4984 20.0296 22.2075C20.0875 21.9165 20.2304 21.6492 20.4402 21.4394C20.6499 21.2297 20.9172 21.0868 21.2082 21.0289C21.4992 20.971 21.8008 21.0008 22.0749 21.1143C22.3489 21.2278 22.5832 21.4201 22.748 21.6667C22.9129 21.9134 23.0008 22.2034 23.0008 22.5001C23.0008 22.8979 22.8428 23.2795 22.5615 23.5608C22.2802 23.8421 21.8987 24.0001 21.5008 24.0001Z"
                    fill="#252525"
                  />
                </svg>
              </div>
              <div className="flex items-center mb-5">
                <div className="flex items-center">
                  <img
                    src="/assets/images/brandLogo.png"
                    alt="Brand logo"
                    className="mr-2 w-6 h-6 rounded-full"
                  />
                  <span className="mr-4">Nike</span>
                  <div className="h-5 border-r border-gray-300 mx-4"></div>
                </div>
                <div className="flex items-center">
                  <img
                    src="/assets/images/store1.jpg"
                    alt="Seller profile"
                    className="mr-2 w-6 h-6 rounded-full"
                  />
                  <span className="flex gap-1">
                    <div className="text-gray-500 ">Sold By</div>
                    <div className="font-semibold underline underline-offset-4">
                      V2 Shoes
                    </div>
                  </span>
                  <div className="h-5 border-r border-gray-300 mx-4"></div>
                </div>
                <div className="flex">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1133_396)">
                      <g clip-path="url(#clip1_1133_396)">
                        <path
                          d="M11.3461 15.3335C11.3851 15.4492 11.4061 15.5726 11.4061 15.7012C11.4061 16.337 10.8854 16.8577 10.2496 16.8577C9.61254 16.8577 9.09308 16.3375 9.09308 15.7012C9.09308 15.5728 9.11415 15.4492 9.15291 15.3337L8.21278 15.3338C8.01279 15.3338 7.84747 15.1849 7.82174 14.9918L6.5558 8.44243H4.44927C4.23138 8.44243 4.05469 8.26573 4.05469 8.04785C4.05469 7.82996 4.23138 7.65327 4.44927 7.65327H6.87452C7.05718 7.6542 7.2212 7.78188 7.25978 7.9677L8.5315 14.5447H16.7726L17.8691 9.35681H9.06569C8.8478 9.35681 8.67111 9.18011 8.67111 8.96223C8.67111 8.74434 8.8478 8.56765 9.06569 8.56765H18.3546C18.5725 8.56765 18.7492 8.74434 18.7492 8.96223C18.7492 9.00062 18.7436 9.0379 18.7333 9.07294L17.4765 15.0194C17.438 15.2052 17.2739 15.3329 17.0913 15.3327L16.1508 15.3329C16.1897 15.4486 16.211 15.5724 16.211 15.7012C16.211 16.337 15.6902 16.8577 15.0545 16.8577C14.4174 16.8577 13.8979 16.3375 13.8979 15.7012C13.8979 15.5726 13.919 15.4488 13.9579 15.3331L11.3461 15.3335ZM9.06569 12.2499C8.8478 12.2499 8.67111 12.0732 8.67111 11.8553C8.67111 11.6374 8.8478 11.4607 9.06569 11.4607H14.8004C15.0183 11.4607 15.195 11.6374 15.195 11.8553C15.195 12.0732 15.0183 12.2499 14.8004 12.2499H9.06569ZM9.06569 10.8035C8.8478 10.8035 8.67111 10.6268 8.67111 10.409C8.67111 10.1911 8.8478 10.0144 9.06569 10.0144H14.8004C15.0183 10.0144 15.195 10.1911 15.195 10.409C15.195 10.6268 15.0183 10.8035 14.8004 10.8035H9.06569ZM15.3143 15.4406C15.249 15.3747 15.157 15.3338 15.0545 15.3338C14.9531 15.3338 14.861 15.375 14.7946 15.4414C14.7283 15.5077 14.6871 15.5998 14.6871 15.7012C14.6871 15.9049 14.8502 16.0686 15.0545 16.0686C15.2595 16.0686 15.4218 15.9062 15.4218 15.7012C15.4218 15.5998 15.3806 15.5077 15.3143 15.4406ZM10.5094 15.4406C10.4442 15.3747 10.3521 15.3338 10.2496 15.3338C10.1482 15.3338 10.0561 15.375 9.98979 15.4414C9.92343 15.5077 9.88224 15.5998 9.88224 15.7012C9.88224 15.9049 10.0453 16.0686 10.2496 16.0686C10.4546 16.0686 10.617 15.9062 10.617 15.7012C10.617 15.5998 10.5758 15.5077 10.5094 15.4406Z"
                          fill="black"
                        />
                      </g>
                    </g>
                    <rect
                      x="0.375"
                      y="0.375"
                      width="23.25"
                      height="23.25"
                      rx="11.625"
                      stroke="black"
                      stroke-width="0.75"
                    />
                    <defs>
                      <clipPath id="clip0_1133_396">
                        <rect width="24" height="24" rx="12" fill="white" />
                      </clipPath>
                      <clipPath id="clip1_1133_396">
                        <rect
                          width="15.06"
                          height="12.9678"
                          fill="white"
                          transform="translate(3.68945 5.30225)"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  <span className="ml-2">42 sold till date</span>
                </div>
              </div>
              <p className="text-2xl leading-[29.3px] font-helvetica font-medium mb-1 flex gap-1">
                ₹ <div className="font-satoshi">{product.price}</div>
              </p>
              <p className="text-base font-normal font-satoshi text-gray-500 ">
                Inclusive of all taxes
              </p>

              {/* Color selection */}
              <div className="my-7">
                <h2 className="font-semibold mb-2">Color</h2>
                <div className="flex gap-[7px]">
                  {product.colors.map((color, index) => (
                    <button
                      key={color.name}
                      className={`w-[70px] h-[70px] relative ${
                        selectedColor === index
                          ? "ring-2 ring-blue-500 after:absolute after:inset-0 after:bg-black/20 "
                          : ""
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
              <div className="my-3">
                <div className="flex justify-between">
                  <h2 className="font-satoshi text-base leading-5 mb-5">
                    Select Size
                  </h2>
                  <div className="font-satoshi text-base leading-5 text-gray-500">
                    Size Guide
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`p-2 border border-black  ${
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
              </div>

              {/* Add to cart */}

              <button className="w-full h-[67px] font-satoshi text-xl leading-[27px] bg-black text-white py-3 rounded-4xl mt-[83px] mb-4">
                ADD TO CART
              </button>
              <button className="w-full h-[67px] font-satoshi text-xl leading-[27px] border text-black py-3 rounded-4xl  mb-4">
                ADD TO WISHLIST
              </button>
              <div className="flex text-base items-center justify-center font-satoshi leading-[21.6px] mt-5 mb-8">
                <div className="flex justify-between items-center gap-6">
                  <span>COD Available</span>
                  <div className="h-5 border-r border-gray-300"></div>
                  <span>7 Day Return</span>
                  <div className="h-5 border-r border-gray-300"></div>
                  <span>Quality Assured</span>
                </div>
              </div>

              {/* Product details accordion */}
              <div className="border-t mt-[52px]">
                {[
                  "know-your-kicks",
                  "size-and-fit",
                  "shipping-and-return",
                  "caring-and-usage",
                ].map((section) => (
                  <div
                    key={section}
                    className="border-b font-satoshi text-xl leading-[27px] p-3"
                  >
                    <button
                      className="w-full flex justify-between items-center pb-5 "
                      onClick={() => toggleSection(section)}
                    >
                      <span className="font-semibold">
                        {section
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transform transition-transform duration-300 ${
                          expandedSections.includes(section) ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M4 4L12 12M12 12H6M12 12V6"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
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
        </div>
        {/* You Might Also Like section */}
        <div className="w-full container  mx-auto   max-w-[1512px]">
          <section className="mt-20 max-w-[1320px] w-full mx-auto">
            <ProductSlider
              sectionTitle="You Might Also Like"
              products={NewArrivalproducts}
              viewAllLink="/new-arrivals"
            />
          </section>

          {/* More From Seller section */}
          <section className="mt-20 max-w-[1320px] w-full mx-auto">
            <ProductSlider
              sectionTitle="More From C.O.S"
              products={NewArrivalproducts}
              viewAllLink="/new-arrivals"
            />
          </section>

          {/* FAQ section */}
          <div className="mt-2">
            <FAQSection />
          </div>
        </div>
      </main>

      {/* Footer placeholder */}
    </div>
  );
};

export default ProductDetailPage;
