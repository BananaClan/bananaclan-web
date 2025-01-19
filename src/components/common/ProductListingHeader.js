import React, { useState } from "react";

const ProductListingHeader = ({ totalProducts, onSortChange }) => {
  const [sortBy, setSortBy] = useState("Lowest Price");

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    onSortChange(newSort);
  };

  return (
    <div className="w-full max-w-[1512px] px-6 lg:px-24 xl:px-0 mx-auto">
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 font-satoshi ">Home</span>
          <span className="text-sm text-black font-satoshi">/</span>
          <span className="text-sm py-3 ">New Arrivals</span>
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
            
            <div className="flex items-center gap-2 justify-center h-[38px] w-[235px] py-2 px-5 border ">

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
                <div className="hidden group-hover:block absolute right-0 top-full mt-2 bg-white shadow-lg rounded-md py-2 w-48 z-10 ">
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

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 ">
             
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
    </div>
  );
};

export default ProductListingHeader;
