import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ShippingPage = () => {
  const navigate = useNavigate();
  const { getSelectedProducts, calculateSubtotal } = useCart();
  const selectedProducts = getSelectedProducts();

  const [selectedAddress, setSelectedAddress] = useState("ijas");
  const [showAllProducts, setShowAllProducts] = useState(false);

  const addresses = [
    {
      id: "ijas",
      name: "Ijas Ahammed J",
      isDefault: true,
      address:
        "marketfeed, BHIVE HoneyKomb, 3/B 19th Main Road,\nHSR Layout Sector 3 Bangalore, Karnataka, 560102",
      phone: "+91 9446852476",
    },
    {
      id: "pranav",
      name: "Pranav M V",
      isDefault: false,
      address:
        "Government Engineering College, Ramavarmapuram,\nThrissur, Kerala, 680009",
      phone: "+91 8281992453",
    },
    {
      id: "rahul",
      name: "Rahul R Nair",
      isDefault: false,
      address:
        "marketfeed, BHIVE HoneyKomb, 3/B 19th Main Road,\nHSR Layout Sector 3 Bangalore, Karnataka, 560102",
      phone: "+91 9446852476",
    },
  ];

  const handleAddressClick = (addressId) => {
    setSelectedAddress(addressId);
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1512px] mx-auto px-4 lg:px-[180px] py-8">
        {/* Progress Indicator */}
        <div className="flex justify-center items-center space-x-3 mb-14">
          <div className="flex items-center">
            <span className="font-satoshi text-base font-bold text-black">
              My Bag
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-gray-400">---------</span>
            <span className="font-satoshi text-base font-bold text-black">
              Shipping
            </span>
            <span className="text-gray-400">---------</span>
            <span className="font-satoshi text-base font-normal text-gray-400">
              Payment
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-11">
          {/* Left Column - Address Selection */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="font-Helvetica font-normal text-4xl">
                Select Delivery Address
              </h1>
              <button className="flex items-center text-sm px-8 py-4 border border-gray-300 font-satoshi font-medium">
                <span className="mr-2 font-satoshi font-medium">+</span>
                ADD NEW ADDRESS
              </button>
            </div>

            <div className="space-y-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => handleAddressClick(addr.id)}
                  className="p-6 border-b border-gray-300 cursor-pointer transition-colors"
                >
                  <div className="flex justify-between items-baseline">
                    <div className="flex items-baseline space-x-3">
                      <img
                        src={
                          selectedAddress === addr.id
                            ? "/assets/icons/radio_button_checked.svg"
                            : "/assets/icons/radio_button.svg"
                        }
                        alt="radio button"
                        className="w-6 h-6 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddressClick(addr.id);
                        }}
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-satoshi font-bold text-xl">
                            {addr.name}
                          </span>
                          {addr.isDefault && (
                            <span className="font-satoshi font-medium text-sm">
                              Default Address
                            </span>
                          )}
                        </div>
                        <p className="font-satoshi font-normal text-xl text-gray-700 mt-4 whitespace-pre-line">
                          {addr.address}
                        </p>
                        <p className="font-satoshi font-medium text-gray-700 text-xl mt-3">
                          {addr.phone}
                        </p>
                      </div>
                    </div>
                    {selectedAddress === addr.id && (
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add edit functionality here
                        }}
                      >
                        <img src="/assets/icons/edit_icon.svg" alt="Delete" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Preview and Order Summary */}
          <div className="space-y-6">
            {/* Product Preview - Now outside the grey box */}
            <div className="mb-6">
              {selectedProducts.length > 0 && (
                <div className="flex items-center space-x-4 mb-[12px]">
                  <div className="w-[72px] h-[72px] relative">
                    <img
                      src={selectedProducts[0].image}
                      alt={selectedProducts[0].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <p>
                      <span className="text-[16px] font-satoshi font-Regular text-bcBlack">
                        Size:{" "}
                      </span>
                      <span className="text-[16px] font-satoshi font-medium text-bcBlack">
                        {" "}
                        {selectedProducts[0].size}
                      </span>
                    </p>
                    <p>
                      <span className="text-[16px] font-satoshi font-Regular text-bcBlack">
                        Quantity:{" "}
                      </span>
                      <span className="text-[16px] font-satoshi font-medium text-bcBlack">
                        {selectedProducts[0].quantity}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-[16px] font-satoshi font-medium text-bcBlack">
                      ₹ {selectedProducts[0].price}
                    </p>
                  </div>
                </div>
              )}

              {selectedProducts.length > 1 && (
                <>
                  {!showAllProducts ? (
                    <div className="relative ">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-dashed border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <button
                          onClick={() => setShowAllProducts(true)}
                          className="bg-white px-4 text-base text-gray-600 hover:text-black flex items-center font-satoshi"
                        >
                          View All {selectedProducts.length} ↓
                        </button>
                      </div>
                    </div>
                  ) : (
                    selectedProducts.slice(1).map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center space-x-4 mt-4"
                      >
                        <div className="w-[72px] h-[72px] relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <p>
                            <span className="text-[16px] font-satoshi font-Regular text-bcBlack">
                              Size:{" "}
                            </span>
                            <span className="text-[16px] font-satoshi font-medium text-bcBlack">
                              {" "}
                              {product.size}
                            </span>
                          </p>
                          <p>
                            <span className="text-[16px] font-satoshi font-Regular text-bcBlack">
                              Quantity:{" "}
                            </span>
                            <span className="text-[16px] font-satoshi font-medium text-bcBlack">
                              {product.quantity}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-[16px] font-satoshi font-medium text-bcBlack">
                            ₹ {product.price}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>

            {/* Grey Box - Order Summary Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="font-helvetica font-normal text-[24px] mb-6">
                Order Summary
              </h2>
              <div className="space-y-[10px]">
                <div className="flex justify-between font-satoshi text-[16px] font-normal">
                  <span>Sub Total</span>
                  <span className="font-satoshi text-[16px] font-medium">
                    ₹ {calculateSubtotal()}
                  </span>
                </div>
                <div className="flex justify-between  font-satoshi text-[16px] font-normal">
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

                <button className=" bg-black text-white w-full py-[16px] px-4 font-satoshi text-[20px] font-normal">
                  PROCEED TO CHECKOUT
                </button>

                {/* Razorpay Banner */}
                <div className=" text-center">
                  <div className="flex justify-center mt-6 items-center text-sm text-gray-600">
                    <span className="text-xs mr-1">Powered by</span>
                    <img
                      src="/razorpay-logo.png"
                      alt="Razorpay"
                      className="h-4"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Payment will be done using razorpay, third party payment
                    app. You will be redirected to that platform.
                  </p>
                </div>

                {/* Features */}
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
  );
};

export default ShippingPage;
