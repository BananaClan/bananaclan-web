// src/pages/OrderSuccessPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const { getSelectedProducts } = useCart();
  const selectedProducts = getSelectedProducts();

  const handleRatingClick = (value) => {
    setRating(value);
    // Auto submit logic here if needed
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1512px] mx-auto px-4 lg:px-[180px] py-8">
        {/* Order Confirmation Section */}
        <div className="mb-12">
          <h1 className="text-4xl mb-2">Hey Pranav!</h1>
          <div className="flex items-center mb-4">
            <svg
              className="w-6 h-6 text-green-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-2xl">Your order is successfully placed!</span>
          </div>
          <p className="text-gray-500">
            You will also receive an email confirmation on your registered email
            id.
          </p>
        </div>

        {/* Product Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-11">
          <div>
            {/* Whats Next Section */}
            <div className="bg-white p-6 rounded-lg mb-8">
              <h2 className="text-xl font-medium mb-4">Whats Next?</h2>
              <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet consectetur. Leo pellentesque ut
                interdum nec tristique ultrices. Leo pellentesque ut interdum
                nec tristique ultrices.
              </p>

              {/* Progress Steps */}
              <div className="flex justify-between items-center relative">
                <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gray-200 -z-10"></div>
                {/* Step 1 */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mb-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm">Ordered</span>
                </div>
                {/* Step 2 */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mb-2"></div>
                  <span className="text-sm text-gray-500">
                    Seller Order
                    <br />
                    Confirmed
                  </span>
                </div>
                {/* Step 3 */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mb-2"></div>
                  <span className="text-sm text-gray-500">Shipped</span>
                </div>
                {/* Step 4 */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mb-2"></div>
                  <span className="text-sm text-gray-500">Delivered</span>
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-medium mb-6">Help us get better!</h2>
              <p className="mb-4">
                Based on your experience, on a scale of 1 - 5, how likely are
                you to recommend Banana Clan to your friends and family?
              </p>

              {/* Rating */}
              <div className="flex gap-4 mb-6">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleRatingClick(value)}
                    className={`w-12 h-12 rounded-lg ${
                      rating === value ? "bg-black text-white" : "bg-gray-100"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>

              {/* Feedback Text */}
              <div className="mb-6">
                <label className="block mb-2">
                  Anything specific you want to share with us?
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full h-32 p-3 border rounded-lg resize-none"
                  placeholder="Lorem ipsum dolor sit amet consectetur..."
                />
              </div>

              <button
                className="bg-black text-white px-6 py-3 rounded"
                onClick={() => navigate("/")}
              >
                SUBMIT RESPONSE
              </button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-medium mb-6">Order Summary</h2>

              {/* Summary Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Sub Total</span>
                  <span>₹ 3,199</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹ 3,199</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Inclusive of all taxes
                  </p>
                </div>
              </div>

              {/* Shipment Details */}
              <div className="mb-6">
                <h3 className="flex items-center text-lg mb-2">
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                  Shipment
                </h3>
                <div className="text-sm">
                  <p className="font-medium">Ijas Ahammed J</p>
                  <p className="text-gray-600 mt-1">
                    marketfeed, BHIVE HoneyKomb, 3/B 19th Main Road, HSR Layout
                    Sector 3
                    <br />
                    Bangalore, Karnataka, 560102
                  </p>
                  <p className="text-gray-600 mt-1">+91 9446852476</p>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h3 className="flex items-center text-lg mb-2">
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Payment
                </h3>
                <p className="text-sm text-gray-600">
                  Payment Done Using HDFC Card Ending in XXXX 8932
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Shopping Button */}
        <div className="mt-8 text-right">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center text-black hover:text-gray-700"
          >
            CONTINUE SHOPPING →
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
