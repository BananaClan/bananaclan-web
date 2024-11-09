import React, { useState } from "react";

const ProfileDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState("main");
  const [selectedOption, setSelectedOption] = useState("");

  const menuOptions = [
    { id: "orders", label: "Orders" },
    { id: "wishlist", label: "Wishlist" },
    { id: "profile", label: "Manage Profile" },
    { id: "help", label: "Help Centre" },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setCurrentView("detail");
  };

  const handleBack = () => {
    setCurrentView("main");
    setSelectedOption("");
  };

  const handleOverlayClick = () => {
    if (currentView === "main") {
      setIsOpen(false);
    }
  };

  return (
    <div className="z-50">
      {/* Profile Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-100"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleOverlayClick}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[483px] bg-white transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Fixed Close Button - Outside of sliding content */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 z-10"
        >
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

        {/* Content Container with sliding animation */}
        <div className="relative h-full overflow-hidden">
          {/* Main View */}
          <div
            className={`absolute w-full transition-transform duration-300 ease-in-out ${
              currentView === "main" ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="px-6 pt-16">
              {/* Profile Info */}
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="/p1.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">Hi Pranav!</h2>
                  <p className="text-gray-500">Clan Member #420</p>
                </div>
              </div>

              {/* Menu Options */}
              <div className="mt-4">
                {menuOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option)}
                    className="w-full py-4 px-6 text-left border-b border-gray-200 flex justify-between items-center hover:bg-gray-50"
                  >
                    {option.label}
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Detail View */}
          <div
            className={`absolute w-full transition-transform duration-300 ease-in-out ${
              currentView === "detail" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="px-6 pt-16">
              {/* Back Button */}
              <button onClick={handleBack} className="flex items-center mb-4">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                {selectedOption}
              </button>
              {/* Detail View Content */}
              <div className="p-4">
                <p>Content for {selectedOption}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDrawer;
