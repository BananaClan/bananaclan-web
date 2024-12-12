import React, { useState, useMemo, useEffect } from "react";

const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Cart items in their own useMemo to prevent recreation on every render
  const cartItems = useMemo(
    () => [
      {
        id: 1,
        name: "Adidas Samba Brazil Edition",
        seller: "V2 Shoes",
        size: "UK 9",
        quantity: 1,
        price: 3199,
        image: "/assets/images/WeRecommendImage.jpg",
      },
      {
        id: 2,
        name: "Adidas Samba Brazil Edition",
        seller: "V2 Shoes",
        size: "UK 9",
        quantity: 1,
        price: 2799,
        image: "/assets/images/WRimage.jpg",
      },
      {
        id: 3,
        name: "Adidas Samba Brazil Edition",
        seller: "V2 Shoes",
        size: "UK 9",
        quantity: 1,
        price: 1277,
        image: "/assets/images/WeRecommendImage.jpg",
      },
      {
        id: 4,
        name: "Adidas Samba Brazil Edition",
        seller: "V2 Shoes",
        size: "UK 9",
        quantity: 1,
        price: 4178,
        image: "/assets/images/WRimage.jpg",
      },
      {
        id: 5,
        name: "Adidas Samba Brazil Edition",
        seller: "V2 Shoes",
        size: "UK 9",
        quantity: 1,
        price: 1299,
        image: "/assets/images/WRimage.jpg",
      },
      {
        id: 6,
        name: "Adidas Samba Brazil Edition",
        seller: "V2 Shoes",
        size: "UK 9",
        quantity: 1,
        price: 1499,
        image: "/assets/images/WRimage.jpg",
      },
      {
        id: 7,
        name: "Adidas Samba Brazil Edition",
        seller: "V2 Shoes",
        size: "UK 9",
        quantity: 1,
        price: 3289,
        image: "/assets/images/WeRecommendImage.jpg",
      },
    ],
    []
  ); // Empty dependency array as this data doesn't change

  // Initialize selectedItems with all items selected
  const [selectedItems, setSelectedItems] = useState(() =>
    cartItems.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: true,
      }),
      {}
    )
  );

  // Handle body scroll
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position and add styles
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    }

    // Cleanup function
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  // Calculate totals based on selected items
  const totals = useMemo(() => {
    const selectedCount = Object.values(selectedItems).filter(Boolean).length;
    const totalPrice = cartItems.reduce((sum, item) => {
      return sum + (selectedItems[item.id] ? item.price : 0);
    }, 0);
    return { selectedCount, totalPrice };
  }, [selectedItems, cartItems]);

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const CartItem = ({ item }) => (
    <div className="py-4 border-b border-gray-200">
      <div className="flex items-start">
        {/* Checkbox and Image Container */}
        <div className="relative">
          <input
            type="checkbox"
            className="absolute top-1 left-1 z-10 w-4 h-4 cursor-pointer"
            checked={selectedItems[item.id] || false}
            onChange={() => handleCheckboxChange(item.id)}
          />
          <img
            src={item.image}
            alt={item.name}
            className="w-[152px] h-[152px] object-cover"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 ml-4">
          <h3 className="font-medium text-lg">{item.name}</h3>
          <div className="flex items-center mt-1">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-yellow-400 mr-1">
              <path
                fill="currentColor"
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              />
            </svg>
            <p className="text-sm text-gray-600">Sold by {item.seller}</p>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-600">Size:</span>
              <select
                value={item.size}
                onChange={() => {}}
                className="ml-2 border rounded px-2 py-1 text-sm"
              >
                <option>{item.size}</option>
              </select>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600">Quantity:</span>
              <select
                value={item.quantity}
                onChange={() => {}}
                className="ml-2 border rounded px-2 py-1 text-sm"
              >
                <option>{item.quantity}</option>
              </select>
            </div>
            <p className="font-medium">₹ {item.price.toLocaleString()}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center space-y-4 ml-4">
          <button className="p-1">
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button className="p-1">
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="z-50">
      {/* Cart Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full bg-gray-100"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[483px] bg-white transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-medium">
            Your Bag ({cartItems.length} Items)
          </h2>
          <button onClick={() => setIsOpen(false)}>
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Cart Items - Added relative positioning */}
        <div className="relative flex-1 overflow-y-auto px-6 pb-40">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Fixed Bottom Section - Added higher z-index */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 z-10">
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">
                Total ({totals.selectedCount} Sneakers)
              </p>
              <p className="text-lg font-medium">
                ₹ {totals.totalPrice.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Inclusive of all taxes</p>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 py-3 px-4 border border-black text-black font-medium">
              VIEW BAG
            </button>
            <button className="flex-1 py-3 px-4 bg-black text-white font-medium">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;