import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
const CartDrawer = () => {
  const navigate = useNavigate();

  // const [isOpen, setIsOpen] = useState(false);
  const {
    cartItems,
    setCartItems,
    removeFromCart,
    isOpen,
    setIsOpen,
    updateQuantity,
  } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(null); // To track which dropdown is open
  const [showDeleteModal, setShowDeleteModal] = useState(null); // Track which item's delete modal is shown

  // Initialize selectedItems based on cart items
  const [selectedItems, setSelectedItems] = useState(() =>
    cartItems.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: true,
      }),
      {}
    )
  );

  // Update selectedItems when cartItems change
  useEffect(() => {
    setSelectedItems(
      cartItems.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: true,
        }),
        {}
      )
    );
  }, [cartItems]);

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
  const totals = React.useMemo(() => {
    const selectedCount = cartItems.reduce(
      (count, cartItem) => (selectedItems[cartItem.id] ? count + 1 : count),
      0
    );

    const totalPrice = cartItems.reduce(
      (sum, cartItem) =>
        selectedItems[cartItem.id]
          ? sum + cartItem.price * cartItem.quantity
          : sum,
      0
    );

    return { selectedCount, totalPrice };
  }, [selectedItems, cartItems]);

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleDeleteItem = (itemId, size) => {
    removeFromCart(itemId, size);
    setShowDeleteModal(null); // Close the modal after deletion
  };

  // In your CartDrawer component, update the handleQuantityChange function
  // const handleQuantityChange = (itemId, newQuantity) => {
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === itemId ? { ...item, quantity: newQuantity } : item
  //     )
  //   );
  // };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".quantity-dropdown")) {
        setIsDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleWishlist = (itemId) => {
    // Implement wishlist functionality here
    console.log("Added to wishlist:", itemId);
  };
  const DeleteModal = ({ item }) => (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-[99] flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="p-6">
          <h2 className="font-satoshi text-[20px] font-medium mb-2">
            Remove from Cart
          </h2>
          <p className="font-satoshi text-[16px] font-normal mb-6">
            Are you sure you want to remove this sneaker?
          </p>

          <div className="flex space-x-4">
            <button
              onClick={() => handleDeleteItem(item.id, item.size)}
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
    </div>
  );

  const CartItem = ({ item, isLast }) => (
    <div className={`py-4 border-b border-[#ECECEC] ${isLast ? "pb-4" : ""}`}>
      <div className="flex items-start">
        <div
          className="flex flex-1 cursor-pointer"
          onClick={() => {
            navigate(`/product/${item.id}`);
            setIsOpen(false); // Close the cart drawer when navigating
          }}
        >
          {/* Checkbox and Image Container */}
          <div className="relative">
            <img
              src={
                selectedItems[item.id]
                  ? "/assets/icons/checkbox_checked.svg"
                  : "/assets/icons/checkbox_unchecked.svg"
              }
              className="absolute top-1 left-1 z-10 w-4 h-4 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigation when clicking checkbox
                handleCheckboxChange(item.id);
              }}
              alt="checkbox"
            />
            <img
              src={item.image}
              alt={item.name}
              className="w-[152px] h-[152px] object-cover"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 ml-4 flex-col h-full">
            <h3 className="font-satoshi text-[16px] font-normal">
              {item.name}
            </h3>
            <div className="flex items-center mt-1">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-yellow-400 mr-1">
                <path
                  fill="currentColor"
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                />
              </svg>
              <p className="font-satoshi text-[12px] font-normal text-gray-600">
                Sold by {item.seller}
              </p>
            </div>
            <div className="mt-2">
              <div className="flex flex-col gap-[6px]">
                <div className="flex-1">
                  <span className="text-base text-gray-900 font-light font-satoshi">
                    Size:{" "}
                  </span>
                  <span className="font-medium">{item.size}</span>
                </div>
                <div className="flex">
                  <span className="text-base text-gray-900 font-satoshi">
                    Quantity:&nbsp;
                  </span>
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent navigation when clicking dropdown
                        setIsDropdownOpen(item.id);
                      }}
                      className="flex items-center gap-1 text-medium font-medium"
                    >
                      {item.quantity} &nbsp;
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.5 4L6 7.5L9.5 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {isDropdownOpen === item.id && (
                      <div
                        className="absolute z-10 w-16 mt-1 bg-white border border-gray-300 rounded shadow-lg quantity-dropdown"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            onClick={() => {
                              updateQuantity(item.id, item.size, num);
                              setIsDropdownOpen(null);
                            }}
                            className="w-full px-2 py-1 text-left hover:bg-gray-100 text-sm"
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-auto flex flex-row h-[42px] items-end font-medium">
                <p className="text-[20px] font-helveticaNeue font-medium">₹ </p>
                <p className="text-[20px] text-bcBlack font-helveticaNeue  ml-1">
                  {(item.price * item.quantity).toLocaleString()}{" "}
                  {/* Add the multiplication here */}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className="flex flex-col items-center space-y-[12px] ml-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setShowDeleteModal(item.id)}>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.388889"
                  y="0.388889"
                  width="27.2222"
                  height="27.2222"
                  rx="13.6111"
                  fill="white"
                />
                <rect
                  x="0.388889"
                  y="0.388889"
                  width="27.2222"
                  height="27.2222"
                  rx="13.6111"
                  stroke="#545454"
                  stroke-width="0.777778"
                />
                <g clip-path="url(#clip0_566_4804)">
                  <path
                    d="M13.4576 7.77783L14.6859 7.78094C15.17 7.83943 15.5943 8.06717 15.944 8.4517C16.2296 8.7653 16.3796 9.12992 16.3883 9.5269H19.7949C19.9087 9.52756 20.0175 9.57334 20.0976 9.65419C20.1776 9.73503 20.2223 9.84434 20.2218 9.9581C20.2221 10.0718 20.1774 10.1809 20.0974 10.2616C20.0173 10.3423 19.9086 10.388 19.7949 10.3887L18.6525 10.3881V17.6226C18.6525 19.2049 18.0621 20.2223 16.7604 20.2223H11.1492C9.84748 20.2223 9.26632 19.2105 9.26632 17.6226V10.3881H8.20419C8.09075 10.3874 7.98219 10.3419 7.90221 10.2614C7.82223 10.181 7.77734 10.0722 7.77734 9.95872C7.77734 9.72041 7.96837 9.52814 8.20419 9.52814H11.6077C11.6165 9.20832 11.7353 8.88414 11.9525 8.5637C12.276 8.08583 12.7813 7.82388 13.4576 7.77783ZM17.7989 10.3881H10.1194V17.6226C10.1194 18.7974 10.4429 19.3611 11.1492 19.3611H16.7604C17.4691 19.3611 17.7995 18.7924 17.7995 17.6226L17.7989 10.3881ZM11.9562 11.7227C12.1914 11.7227 12.3824 11.9156 12.3824 12.1533V17.1622C12.3827 17.2758 12.338 17.385 12.258 17.4657C12.178 17.5464 12.0692 17.5921 11.9556 17.5928C11.842 17.5919 11.7334 17.5462 11.6536 17.4655C11.5737 17.3848 11.529 17.2757 11.5293 17.1622V12.1533C11.5293 11.9156 11.721 11.7227 11.9562 11.7227ZM13.6517 11.7227C13.8882 11.7227 14.0786 11.9156 14.0786 12.1533V17.1622C14.0789 17.2758 14.0342 17.385 13.9542 17.4657C13.8741 17.5464 13.7654 17.5921 13.6517 17.5928C13.5382 17.5919 13.4296 17.5462 13.3497 17.4655C13.2698 17.3848 13.2252 17.2757 13.2255 17.1622V12.1533C13.2255 11.9156 13.4165 11.7227 13.6517 11.7227ZM15.3492 11.7227C15.5844 11.7227 15.7754 11.9156 15.7754 12.1533V17.1622C15.7757 17.2757 15.7311 17.3848 15.6512 17.4655C15.5713 17.5462 15.4627 17.5919 15.3492 17.5928C15.2355 17.5921 15.1268 17.5464 15.0467 17.4657C14.9667 17.385 14.922 17.2758 14.9223 17.1622V12.1533C14.922 12.0396 14.9667 11.9305 15.0467 11.8498C15.1268 11.7691 15.2355 11.7234 15.3492 11.7227ZM13.4869 8.63774C13.0874 8.66574 12.8242 8.80201 12.6568 9.04965C12.5336 9.23072 12.472 9.38752 12.4621 9.52752L15.5346 9.5269C15.5259 9.34583 15.4543 9.18654 15.3156 9.0341C15.1003 8.79765 14.8613 8.66948 14.6355 8.63899L13.4869 8.63774Z"
                    fill="#545454"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_566_4804">
                    <rect
                      width="12.4444"
                      height="12.4444"
                      fill="white"
                      transform="translate(7.77734 7.77783)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
            <button>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.388889"
                  y="0.388889"
                  width="27.2222"
                  height="27.2222"
                  rx="13.6111"
                  fill="white"
                />
                <rect
                  x="0.388889"
                  y="0.388889"
                  width="27.2222"
                  height="27.2222"
                  rx="13.6111"
                  stroke="#545454"
                  stroke-width="0.777778"
                />
                <path
                  d="M14.25 20C14.25 20 8 16.5 8 12.25C8 11.4987 8.26031 10.7706 8.73664 10.1895C9.21297 9.60851 9.87589 9.21046 10.6126 9.06312C11.3494 8.91577 12.1144 9.02823 12.7775 9.38136C13.4407 9.73449 13.961 10.3065 14.25 11V11C14.539 10.3065 15.0593 9.73449 15.7225 9.38136C16.3856 9.02823 17.1506 8.91577 17.8874 9.06312C18.6241 9.21046 19.287 9.60851 19.7634 10.1895C20.2397 10.7706 20.5 11.4987 20.5 12.25C20.5 16.5 14.25 20 14.25 20Z"
                  stroke="#545454"
                  stroke-width="0.857143"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="z-49">
      {/* Cart Icon Button */}
      <button onClick={() => setIsOpen(true)}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.666992"
            width="39"
            height="39"
            rx="19.5"
            stroke="black"
          />
          <g clip-path="url(#clip0_566_2793)">
            <path
              d="M29.75 15.292H10.25C10.0426 15.292 9.875 15.46 9.875 15.667V17.917C9.875 18.124 10.0426 18.292 10.25 18.292H10.625V24.667C10.625 24.874 10.7926 25.042 11 25.042H29C29.2074 25.042 29.375 24.874 29.375 24.667V18.292H29.75C29.9574 18.292 30.125 18.124 30.125 17.917V15.667C30.125 15.46 29.9574 15.292 29.75 15.292ZM28.625 24.292H11.375V18.292H28.625V24.292ZM29.375 17.542H29H11H10.625V16.042H29.375V17.542Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_566_2793">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(8 8.16699)"
              />
            </clipPath>
          </defs>
        </svg>
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[96]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[483px] bg-white transform transition-transform duration-300 ease-in-out z-[97] flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#ECECEC]">
          <h2 className="font-helvetica text-[24px] font-normal">
            <span> Your Bag </span>
            <span className="font-satoshi text-[16px] font-normal">
              ({cartItems.length} Item)
            </span>
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

        {/* Scrollable Cart Items */}
        <div className="relative flex-1 overflow-y-auto px-6 pb-40">
          {cartItems.map((item, index) => (
            <CartItem
              key={item.id}
              item={item}
              isLast={index === cartItems.length - 1}
            />
          ))}
        </div>

        {/* Fixed Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#F1F1F1] pt-[20px] pl-[24px] pr-[24px] pb-[32px] z-10">
          <div className="mb-4">
            <div className="flex justify-between mt-auto flex-row items-baseline">
              <p className="font-satoshi text-[24px] font-medium">
                <span> Total </span>
                <span className="font-satoshi text-[16px] font-normal">
                  ({totals.selectedCount} Sneakers)
                </span>
              </p>

              <p>
                <span className="text-[24px] font-helveticaNeue font-medium">
                  ₹{" "}
                </span>
                <span className="text-[24px] text-bcBlack font-satoshi font-medium">
                  {totals.totalPrice.toLocaleString()}
                </span>
              </p>
            </div>
            <p className="font-satoshi text-[16px] font-normal text-[#ABABAB]">
              Inclusive of all taxes
            </p>
          </div>
          <div className="flex gap-[12px]">
            <button
              onClick={() => {
                navigate("/bag");
                setIsOpen(false); // Close the cart drawer when navigating
              }}
              className="px-[36px] py-4 border border-black text-black font-satoshi text-[16px] font-normal"
            >
              VIEW BAG
            </button>
            <button className="flex-1 py-3 px-4 bg-black text-white font-satoshi text-[16px] font-medium">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="absolute inset-0 top-0 right-0 h-full w-[483px]">
            <DeleteModal
              item={cartItems.find((item) => item.id === showDeleteModal)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
