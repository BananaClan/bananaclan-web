import React, { useState } from "react";
import CartDrawer from "./CartDrawer";
import UserProfileDrawer from "./UserProfileDrawer";

const NavBar = () => {
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

  const sections = {
    "Threads Tell Tales": ["Adidas", "Nike", "Asics"],
    "Shop by category": ["Stan Smith", "YEEZY", "Sweatshirts", "Hoodies"],
    "Bold Sticker Statements": [
      "Posters",
      "Canvas Prints",
      "Tapestries",
      "Stickers",
      "Desk Mats",
      "Macbook Skins",
    ],
  };

  return (
    <div className="relative">
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out 
        ${isCollectionsOpen ? "bg-black" : "bg-white"}`}
      >
        <div className="flex flex-row justify-between items-center px-10 h-16">
          {/* Logo */}
          <div
            className={`font-bold text-2xl transition-all duration-300 ease-in-out
            ${isCollectionsOpen ? "text-white" : "text-black"}`}
          >
            bananaclan
          </div>

          {/* Center Navigation */}
          <div className="flex gap-8">
            <div
              className="relative group"
              onMouseEnter={() => setIsCollectionsOpen(true)}
              onMouseLeave={() => setIsCollectionsOpen(false)}
            >
              <button
                className={`transition-all duration-300 ease-in-out relative
                ${isCollectionsOpen ? "text-white" : "text-black"} 
                hover:opacity-70 py-2`}
              >
                Collections
                {/* Animated underline */}
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-all duration-300
                  ${
                    isCollectionsOpen
                      ? "bg-white scale-x-100"
                      : "bg-black scale-x-0"
                  }`}
                />
              </button>

              <div
                className={`fixed left-0 w-full bg-black transition-all duration-300 ease-in-out
                ${
                  isCollectionsOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4 pointer-events-none"
                }
                shadow-xl`}
                style={{ top: "64px" }}
              >
                <div className="max-w-7xl mx-auto px-10 py-12">
                  <div className="grid grid-cols-4 gap-16">
                    {/* Categories Section */}
                    <div className="col-span-3">
                      {Object.entries(sections).map(
                        ([sectionTitle, items], sectionIndex) => (
                          <div
                            key={sectionTitle}
                            className={`mb-8 transition-all duration-300 ease-in-out
                          ${
                            isCollectionsOpen
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-4"
                          }`}
                            style={{
                              transitionDelay: `${sectionIndex * 100}ms`,
                            }}
                          >
                            <h3 className="text-white text-xl mb-4">
                              {sectionTitle}
                            </h3>
                            <div className="flex flex-wrap gap-x-8 gap-y-4">
                              {items.map((item, itemIndex) => (
                                <div
                                  key={item}
                                  className={`text-gray-400 hover:text-white cursor-pointer transition-all duration-300 ease-in-out
                                ${
                                  isCollectionsOpen
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-4"
                                }`}
                                  style={{
                                    transitionDelay: `${
                                      sectionIndex * 100 + itemIndex * 50
                                    }ms`,
                                  }}
                                >
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {/* Featured Image Section */}
                    <div
                      className={`col-span-1 transition-all duration-300 ease-in-out
                      ${
                        isCollectionsOpen
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-4"
                      }`}
                      style={{ transitionDelay: "300ms" }}
                    >
                      <div className="text-white text-xl mb-4">Featured</div>
                      <img
                        src="/api/placeholder/400/300"
                        alt="Featured Collection"
                        className="w-full rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Regular Nav Items */}
            {["Nike", "Adidas"].map((item) => (
              <button
                key={item}
                className={`transition-all duration-300 ease-in-out relative py-2
                  ${isCollectionsOpen ? "text-white" : "text-black"} 
                  hover:opacity-70`}
              >
                {item}
                {/* Animated underline */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-0 transition-transform duration-300 origin-left hover:scale-x-100" />
              </button>
            ))}
          </div>

          {/* Right Side Icons */}
          <div
            className={`flex items-center gap-4 transition-all duration-300 ease-in-out
            ${isCollectionsOpen ? "text-white" : "text-black"}`}
          >
            <CartDrawer />
            <UserProfileDrawer
              isLoggedIn={false}
              userAvatar="/assets/images/img-avatar.gif"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
