import React from "react";

const SizeSelectorSheet = ({
  isOpen,
  onClose,
  sizes,
  availableSizes,
  selectedSize,
  onSizeSelect,
  onAddToBag,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 bg-white z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="relative p-4">
          {/* Header with close button */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-satoshi">Select size</h2>
            <button onClick={onClose} className="p-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Size Grid */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {sizes.map((size) => {
              const isAvailable = availableSizes.includes(size);
              const isSelected = selectedSize === size;

              return (
                <button
                  key={size}
                  onClick={() => isAvailable && onSizeSelect(size)}
                  disabled={!isAvailable}
                  className={`
                    h-12 border font-satoshi
                    ${
                      isAvailable
                        ? isSelected
                          ? "bg-black text-white border-black"
                          : "border-black text-black hover:bg-black/5"
                        : "bg-gray-100 text-gray-400 border-gray-200"
                    }
                    transition-colors duration-200
                  `}
                >
                  {size}
                </button>
              );
            })}
          </div>

          {/* Add to Bag Button */}
          <button
            onClick={onAddToBag}
            disabled={!selectedSize}
            className="w-full bg-black text-white py-4 font-satoshi text-base disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
          >
            ADD TO BAG
          </button>
        </div>
      </div>
    </>
  );
};

export default SizeSelectorSheet;
