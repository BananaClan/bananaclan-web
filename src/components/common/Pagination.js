import React from 'react';

const ChevronLeftIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  
  // Generate page numbers
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  // Get visible pages without ellipsis
  const getVisiblePages = () => {
    if (totalPages <= 7) return pages;
    
    // Always show first page, current page and neighbors, and last page
    let visiblePages = [];
    
    visiblePages.push(1, currentPage - 1, currentPage, currentPage + 1, totalPages);
    
    // Filter out numbers less than 1 or greater than totalPages
    return [...new Set(visiblePages)].filter(
      page => page >= 1 && page <= totalPages
    ).sort((a, b) => a - b);
  };

  return (
    <div className="flex items-center justify-center  mt-[80px] py-2 ">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 p-2 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed mr-11"
        aria-label="Previous page"
      >
        <ChevronLeftIcon />
        <span className="text-base font-satoshi_B">Previous</span>
      </button>

      <div className="flex items-center gap-4">
        {getVisiblePages().map((page, index) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`relative px-2 py-1 ${
              currentPage === page 
                ? 'text-black' 
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <span>{page}</span>
            {currentPage === page && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"/>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 p-2 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed ml-11"
        aria-label="Next page"
      >
        <span className="text-base font-satoshi_B">Next</span>
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default Pagination;