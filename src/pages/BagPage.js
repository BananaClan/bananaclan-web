import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProgressIndicator = () => {
  return (
    <div className="flex justify-center items-center space-x-3 mb-8">
      <div className="flex items-center">
        <span className="font-satoshi text-[16px] font-bold text-base text-black">
          My Bag
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-[#ACACAC]">---------</span>
        <span className="font-satoshi text-[16px] font-normal text-base text-[#ACACAC]">
          Shipping
        </span>
        <span className="text-[#ACACAC]">---------</span>
        <span className="font-satoshi text-[16px] font-normal text-base text-[#ACACAC]">
          Payment
        </span>
      </div>
    </div>
  );
};

const BagPage = () => {
  const navigate = useNavigate();
  const { selectedItems, setSelectedItems, cartItems, calculateSubtotal } =
    useCart();
  const [wishlistedItems, setWishlistedItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDeleteModal && !event.target.closest(".delete-modal")) {
        event.preventDefault();
        event.stopPropagation();
        setShowDeleteModal(null);

        // Create a one-time overlay to prevent immediate clicks
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.right = "0";
        overlay.style.bottom = "0";
        overlay.style.zIndex = "1000";
        document.body.appendChild(overlay);

        // Remove the overlay on the next tick
        setTimeout(() => {
          document.body.removeChild(overlay);
        }, 0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDeleteModal]);

  const handleWishlist = (itemId) => {
    setWishlistedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleDeleteClick = (item) => {
    setShowDeleteModal(item.id);
  };

  const handleItemSelect = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleProceedToShipping = () => {
    if (selectedItems.length > 0) {
      navigate("/shipping");
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1512px] mx-auto px-4 lg:px-[180px] py-8">
        <ProgressIndicator />

        <div className="flex mb-[52px] items-baseline">
          <h1 className="font-helvetica text-[36px] font-normal">Your Bag</h1>
          <span className="text-xl font-satoshi text-[20px] font-normal ml-3">
            ({selectedItems.length}/{cartItems.length} Item selected)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-11">
          {/* Left Column - Product List */}
          <div className="space-y-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="pb-4 border-b border-[#ECECEC] relative"
              >
                <div className="flex relative z-10">
                  {/* Image with checkbox */}
                  <div className="relative">
                    <button
                      onClick={() => handleItemSelect(item.id)}
                      className="absolute top-2 left-2 z-10 w-6 h-6 bg-transparent border-none p-0 cursor-pointer"
                    >
                      <img
                        src={
                          selectedItems.includes(item.id)
                            ? "/assets/icons/checkbox_checked.svg"
                            : "/assets/icons/checkbox_unchecked.svg"
                        }
                        alt={
                          selectedItems.includes(item.id)
                            ? "Checked"
                            : "Unchecked"
                        }
                        className="w-full h-full"
                      />
                    </button>
                    <div className="w-[200px] h-[200px] flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="pl-5 flex-grow h-[200px] flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-[16px] font-satoshi font-Regular text-bcBlack">
                          {item.name}
                        </h3>
                        <div className="flex flex-row mt-2 items-center">
                          <div className="w-6 h-6 rounded-full bg-[#E6FF00] flex items-center justify-center mr-[6px]">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7 0L0 7.5L3 10L12 2V0H7Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                          <p className="text-[12px] text-[#ACACAC] font-satoshi font-Regular ">
                            Sold by
                          </p>
                          <p className="text-[12px]  text-bcBlack font-satoshi font-Regular ml-1">
                            {item.seller}
                          </p>
                        </div>
                      </div>

                      {/* Action Icons */}
                      <div className="flex">
                        <button
                          onClick={() => handleWishlist(item.id)}
                          className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-600"
                        >
                          <img
                            src={
                              wishlistedItems.includes(item.id)
                                ? "/assets/icons/wishlisted_icon.svg"
                                : "/assets/icons/wishlist_icon.svg"
                            }
                            alt={
                              wishlistedItems.includes(item.id)
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                            }
                            className="w-6 h-6"
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item)}
                          className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-600"
                        >
                          <img
                            src="/assets/icons/delete.svg"
                            alt="Delete"
                            className="w-6 h-6"
                          />
                        </button>
                      </div>
                    </div>

                    {/* Delete Modal */}
                    {showDeleteModal === item.id && (
                      <div className="absolute right-1/2 top-1/2 bg-white shadow-lg w-[464px] z-50 translate-x-1/2 -translate-y-1/2 origin-center delete-modal">
                        <div className="p-6">
                          <h2 className="font-satoshi text-[20px] font-medium mb-2">
                            Remove from Cart
                          </h2>
                          <p className="font-satoshi text-[16px] font-normal mb-6">
                            Are you sure you want to remove this sneaker?
                          </p>

                          <div className="flex space-x-4">
                            <button
                              onClick={() => setShowDeleteModal(null)}
                              className="flex-1 py-3 px-4 border border-black hover:bg-gray-50 font-satoshi text-[16px] font-medium"
                            >
                              REMOVE
                            </button>
                            <button
                              onClick={() => {
                                handleWishlist(item.id);
                                setShowDeleteModal(null);
                              }}
                              className="flex-1 py-3 px-4 bg-black text-white hover:bg-gray-900 font-satoshi text-[16px] font-medium"
                            >
                              MOVE TO WISHLIST
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Overlay when delete modal is visible */}
                    {showDeleteModal === item.id && (
                      <div className="absolute inset-0 bg-[#121212] bg-opacity-40 z-20" />
                    )}

                    <div className="mt-[12px]">
                      {/* Size Dropdown */}
                      <div className="relative">
                        <span className="text-base mr-2">Size:</span>
                        <select
                          value={item.size}
                          onChange={() => {}}
                          className="appearance-none bg-transparent border border-transparent hover:border-gray-300 rounded pl-2 pr-6 text-base cursor-pointer"
                        >
                          <option value="UK 5">UK 5</option>
                          <option value="UK 5.5">UK 5.5</option>
                          <option value="UK 6">UK 6</option>
                          <option value="UK 6.5">UK 6.5</option>
                          <option value="UK 7">UK 7</option>
                          <option value="UK 7.5">UK 7.5</option>
                          <option value="UK 8">UK 8</option>
                          <option value="UK 8.5">UK 8.5</option>
                        </select>
                      </div>

                      {/* Quantity Dropdown */}
                      <div className="relative mt-2">
                        <span className="text-base mr-2">Quantity:</span>
                        <select
                          value={item.quantity}
                          onChange={() => {}}
                          className="appearance-none bg-transparent border border-transparent hover:border-gray-300 rounded pl-2 pr-6 text-base cursor-pointer"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                      </div>
                    </div>

                    {/* Price aligned with bottom of image */}
                    <div className="mt-auto flex flex-row items-baseline">
                      <p className="text-2xl font-helveticaNeue font-medium">
                        ₹{" "}
                      </p>
                      <p className="text-[24px]  text-bcBlack font-satoshi font-Medium ml-1">
                        {item.price}
                      </p>
                      <span className="text-2xl font-medium"></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="bg-[#f5f5f5] sticky top-4">
              <div className="p-[24px]">
                <h2 className="font-helvetica text-[24px] font-normal mb-[24px]">
                  Order Summary
                </h2>
                <div className="space-y-[10px]">
                  <div className="flex justify-between font-satoshi text-[16px] font-normal">
                    <span>Sub Total</span>
                    <span className="font-satoshi text-[16px] font-medium">
                      ₹ {calculateSubtotal()}
                    </span>
                  </div>
                  <div className="flex justify-between  font-satoshi text-[16px] font-normal pb-[8px]">
                    <span>Delivery</span>
                    <span className="font-helvetica text-[16px] font-medium">
                      Free
                    </span>
                  </div>
                  <div className="border-t pt-[18px]">
                    <div className="flex justify-between font-medium font-satoshi text-[16px]">
                      <span>Total</span>
                      <span>₹ {calculateSubtotal()}</span>
                    </div>
                    <p className=" text-[#ABABAB] font-satoshi text-[16px] font-normal mt-[4px] mb-[34px]">
                      Inclusive of all taxes
                    </p>
                  </div>
                  <button
                    disabled={selectedItems.length === 0}
                    onClick={handleProceedToShipping}
                    className={`w-full py-[16px] px-4 ${
                      selectedItems.length > 0
                        ? "bg-black text-white"
                        : "bg-gray-300 text-gray-400 cursor-not-allowed"
                    } font-satoshi text-[20px] font-normal`}
                  >
                    PROCEED TO SHIPPING
                  </button>
                  <div className="space-y-2 pt-[24px]">
                    <div className="flex items-center font-satoshi text-[16px] font-normal text-gray-600">
                      <img
                        src="/assets/icons/green_check.svg"
                        alt="Delete"
                        className="w-[16px] h-[16px] mr-[16px]"
                      />
                      Free Delivery
                    </div>
                    <div className="flex items-center font-satoshi text-[16px] font-normal text-gray-600">
                      <img
                        src="/assets/icons/green_check.svg"
                        alt="Delete"
                        className="w-[16px] h-[16px] mr-[16px]"
                      />
                      COD Available
                    </div>
                    <div className="flex items-center font-satoshi text-[16px] font-normal text-gray-600">
                      <img
                        src="/assets/icons/green_check.svg"
                        alt="Delete"
                        className="w-[16px] h-[16px] mr-[16px]"
                      />
                      14* Days Free Return
                    </div>
                    <div className="flex items-center font-satoshi text-[16px] font-normal text-gray-600">
                      <img
                        src="/assets/icons/green_check.svg"
                        alt="Delete"
                        className="w-[16px] h-[16px] mr-[16px]"
                      />
                      Safe & Secure Payment Option
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BagPage;
