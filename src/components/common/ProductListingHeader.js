import React, { useState } from "react";

const FilterDrawer = ({ isOpen, onClose }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    size: [],
    price: [],
    color: [],
  });
  // Filter options data
  const filterData = {
    brand: [
      { id: "adidas", label: "Adidas" },
      { id: "nike", label: "Nike" },
      { id: "new-balance", label: "New Balance" },
      { id: "onitsuka-tiger", label: "Onitsuka Tiger" },
      { id: "puma", label: "Puma" },
      { id: "reebok", label: "Reebok" },
    ],
    size: [
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
    price: [
      { id: "under-1500", label: "Under ₹1500", range: [0, 1500] },
      { id: "1500-2000", label: "₹1500 - ₹2000", range: [1500, 2000] },
      { id: "2000-2500", label: "₹2000 - ₹2500", range: [2000, 2500] },
      { id: "2500-3000", label: "₹2500 - ₹3000", range: [2500, 3000] },
      { id: "3000-3500", label: "₹3000 - ₹3500", range: [3000, 3500] },
      { id: "over-3500", label: "Over ₹3500", range: [3500, Infinity] },
    ],
    color: [
      { id: "black", label: "Black", hex: "#000000" },
      { id: "teal", label: "Teal", hex: "#008080" },
      { id: "pink", label: "Pink", hex: "#FFC0CB" },
      { id: "green", label: "Green", hex: "#008000" },
      { id: "yellow", label: "Yellow", hex: "#FFFF00" },
      { id: "red", label: "Red", hex: "#FF0000" },
    ],
  };
  // Handle filter selection
  const handleFilterSelect = (type, value) => {
    setSelectedFilters((prev) => {
      const currentFilters = [...prev[type]];
      const index = currentFilters.indexOf(value);

      if (index === -1) {
        currentFilters.push(value);
      } else {
        currentFilters.splice(index, 1);
      }

      return {
        ...prev,
        [type]: currentFilters,
      };
    });
  };
  // Remove single filter
  const handleRemoveFilter = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item !== value),
    }));
  };
  const handleClearAll = () => {
    setSelectedFilters({
      brand: [],
      size: [],
      price: [],
      color: [],
    });
  };
  // Render applied filters section
  const AppliedFilters = () => {
    const hasFilters = Object.values(selectedFilters).some(
      (arr) => arr.length > 0
    );

    if (!hasFilters) return null;

    return (
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="font-helvetica text-xl pb-5">Applied Filters</span>
          <span className="text-base text-gray-500">
            {Object.values(selectedFilters).flat().length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(selectedFilters).map(([type, values]) =>
            values.map((value) => (
              <div
                key={`${type}-${value}`}
                className="flex items-center gap-2 px-2 py-[6px] bg-gray-100 "
              >
                <span className="text-lg leading-5">{value}</span>
                <button
                  onClick={() => handleRemoveFilter(type, value)}
                  className="text-gray-500 hover:text-black"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // Render filter section
  const FilterSection = ({ title, type }) => {
    const isExpanded = expandedSection === type;
    
    const renderContent = () => {
      switch (type) {
        case 'brand':
          return (
            <div className="grid grid-cols-2 gap-2">
              {filterData.brand.map(brand => (
                <label key={brand.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFilters.brand.includes(brand.id)}
                    onChange={() => handleFilterSelect('brand', brand.id)}
                    className="accent-black w-5 h-5 rounded border-gray-300"
                  />
                  <span>{brand.label}</span>
                </label>
              ))}
            </div>
          );
          
        case 'size':
          return (
            <div className="grid grid-cols-4 gap-2">
              {filterData.size.map(size => (
                <button
                  key={size}
                  onClick={() => handleFilterSelect('size', size)}
                  className={`px-3 py-2 border rounded ${
                    selectedFilters.size.includes(size)
                      ? 'border-black bg-black text-white'
                      : 'border-black hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          );
          
        case 'price':
          return (
            <div className="grid grid-cols-2 gap-2">
              {filterData.price.map(range => (
                <label key={range.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFilters.price.includes(range.id)}
                    onChange={() => handleFilterSelect('price', range.id)}
                    className="accent-black w-5 h-5 rounded border-gray-300 text-black"
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          );
          
        case 'color':
          return (
            <div className="grid grid-cols-2 gap-2">
              {filterData.color.map(color => (
                <label key={color.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFilters.color.includes(color.id)}
                    onChange={() => handleFilterSelect('color', color.id)}
                    className="form-checkbox h-4 w-4"
                  />
                  <span className="flex items-center gap-2">
                    <span
                      className="w-5 h-5  rounded-full border border-gray-300 "
                      style={{ backgroundColor: color.hex }}
                    />
                    {color.label}
                  </span>
                </label>
              ))}
            </div>
          );
      }
    };

    return (
      <div className="border-b border-gray-100">
        <button
          className="w-full flex items-center justify-between p-4"
          onClick={() => setExpandedSection(isExpanded ? null : type)}
        >
          <span className="font-helvetica text-lg font-normal text-black">
            {title}
            {selectedFilters[type].length > 0 && 
              <span className="ml-2 text-sm text-gray-500">
                ({selectedFilters[type].length})
              </span>
            }
          </span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {isExpanded && (
          <div className="p-4 border-t border-gray-100">
            {renderContent()}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[96]"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[483px] bg-white transform transition-transform duration-300 ease-in-out z-[97] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-8 py-6">
          <div className="flex items-center justify-between p-6  gap-4">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-2xl font-helvetica font-normal leading-7">
                Filter
              </h1>
              <button
                onClick={handleClearAll}
                className="text-base font-satoshi underline"
              >
                Clear All
              </button>
            </div>
            <button onClick={onClose}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
 {/* Applied Filters */}
 <AppliedFilters />


          <div className="flex-1 overflow-y-auto px-2 ">
          <FilterSection title="Brand" type="brand" />
            <FilterSection title="Size" type="size" />
            <FilterSection title="Price" type="price" />
            <FilterSection title="Color" type="color" />
          </div>

          <div className="p-6 border-t border-gray-100">
            <div className="text-center mb-4 font-helvetica text-gray-600">
              289 Sneakers Filtered
            </div>
            <button
              onClick={onClose}
              className="w-full bg-black text-white py-4 font-helvetica"
            >
              APPLY FILTER
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const ProductListingHeader = ({ totalProducts, onSortChange }) => {
  const [sortBy, setSortBy] = useState("Lowest Price");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    onSortChange(newSort);
  };

  return (
    <div className="w-full max-w-[1512px] px-6 lg:px-24 xl:px-0 mx-auto">
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 font-satoshi">Home</span>
          <span className="text-sm text-black font-satoshi">/</span>
          <span className="text-sm py-3">New Arrivals</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-medium text-[40px] font-helvetica">
              New Arrivals
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[19px] font-satoshi text-gray-500">
              {totalProducts} Sneakers
            </span>

            <div className="flex items-center gap-2 justify-center h-[38px] w-[235px] py-2 px-5 border">
              <span className="text-[19px] text-gray-500 font-satoshi">
                SORT BY:
              </span>
              <div className="relative group">
                <button className="flex items-center gap-2 text-sm">
                  {sortBy}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className="hidden group-hover:block absolute right-0 top-full mt-2 bg-white shadow-lg rounded-md py-2 w-48 z-10">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-base font-satoshi_B"
                    onClick={() => handleSortChange("Lowest Price")}
                  >
                    Lowest Price
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-base"
                    onClick={() => handleSortChange("Highest Price")}
                  >
                    Highest Price
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-base"
                    onClick={() => handleSortChange("Newest")}
                  >
                    Newest
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-black"
            >
              <span className="text-base font-satoshi text-black">FILTER</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 13.125C7.5 12.9592 7.56585 12.8003 7.68306 12.6831C7.80027 12.5658 7.95924 12.5 8.125 12.5H11.875C12.0408 12.5 12.1997 12.5658 12.3169 12.6831C12.4342 12.8003 12.5 12.9592 12.5 13.125C12.5 13.2908 12.4342 13.4497 12.3169 13.5669C12.1997 13.6842 12.0408 13.75 11.875 13.75H8.125C7.95924 13.75 7.80027 13.6842 7.68306 13.5669C7.56585 13.4497 7.5 13.2908 7.5 13.125ZM5 9.375C5 9.20924 5.06585 9.05027 5.18306 8.93306C5.30027 8.81585 5.45924 8.75 5.625 8.75H14.375C14.5408 8.75 14.6997 8.81585 14.8169 8.93306C14.9342 9.05027 15 9.20924 15 9.375C15 9.54076 14.9342 9.69973 14.8169 9.81694C14.6997 9.93415 14.5408 10 14.375 10H5.625C5.45924 10 5.30027 9.93415 5.18306 9.81694C5.06585 9.69973 5 9.54076 5 9.375ZM2.5 5.625C2.5 5.45924 2.56585 5.30027 2.68306 5.18306C2.80027 5.06585 2.95924 5 3.125 5H16.875C17.0408 5 17.1997 5.06585 17.3169 5.18306C17.4342 5.30027 17.5 5.45924 17.5 5.625C17.5 5.79076 17.4342 5.94973 17.3169 6.06694C17.1997 6.18415 17.0408 6.25 16.875 6.25H3.125C2.95924 6.25 2.80027 6.18415 2.68306 6.06694C2.56585 5.94973 2.5 5.79076 2.5 5.625Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
};

export default ProductListingHeader;
