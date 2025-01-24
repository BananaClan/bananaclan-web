import React, { useState, useEffect } from "react";
import {
  useAuth,
  useUser,
  SignInButton,
  UserButton,
  useClerk,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const UserProfileDrawer = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("profile");
  const [slideDirection, setSlideDirection] = useState("forward");
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  // Add debug logging
  useEffect(() => {
    console.log("Auth State:", { isLoaded, isSignedIn, user });
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      setCurrentPage("profile");
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  const handlePageChange = (page) => {
    setSlideDirection("forward");
    setCurrentPage(page);
  };

  // const renderProfileButton = () => {
  //   if (isLoggedIn && userAvatar) {
  //     return (
  //       <img
  //         src={userAvatar}
  //         alt="Profile"
  //         className="w-10 h-10 rounded-full object-cover ]"
  //       />
  //     );
  //   }

  // Updated profile button renderer using Clerk

  const renderProfileButton = () => {
    if (!isLoaded) {
      return (
        <button
          className="w-10 h-10 rounded-full bg-gray-200 animate-pulse flex items-center justify-center"
          disabled
        >
          <span className="sr-only">Loading...</span>
        </button>
      );
    }

    if (isSignedIn) {
      return (
        <button
          onClick={() => setIsOpen(true)}
          className="w-10 h-10 rounded-full overflow-hidden"
        >
          <img
            src={user?.imageUrl || "/assets/images/default-avatar.png"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>
      );
    }

    return (
      <button onClick={() => navigate("/auth")} className="cursor-pointer">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.667969"
              width="39"
              height="39"
              rx="19.5"
              fill="#322FEE"
            />
            <rect
              x="0.5"
              y="0.667969"
              width="39"
              height="39"
              rx="19.5"
              stroke="#322FEE"
            />
            <path
              d="M28.0407 26.7306C26.8508 24.6736 25.0172 23.1986 22.8774 22.4994C23.9358 21.8693 24.7582 20.9091 25.2182 19.7664C25.6781 18.6237 25.7503 17.3616 25.4235 16.1739C25.0968 14.9862 24.3892 13.9386 23.4094 13.192C22.4296 12.4454 21.2318 12.041 20 12.041C18.7682 12.041 17.5704 12.4454 16.5907 13.192C15.6109 13.9386 14.9033 14.9862 14.5765 16.1739C14.2498 17.3616 14.3219 18.6237 14.7819 19.7664C15.2419 20.9091 16.0642 21.8693 17.1227 22.4994C14.9828 23.1978 13.1492 24.6728 11.9594 26.7306C11.9158 26.8018 11.8868 26.881 11.8743 26.9635C11.8617 27.046 11.8659 27.1302 11.8864 27.2111C11.9069 27.292 11.9434 27.3679 11.9938 27.4345C12.0441 27.5011 12.1073 27.5569 12.1796 27.5986C12.2519 27.6403 12.3318 27.6672 12.4146 27.6776C12.4974 27.6879 12.5814 27.6816 12.6618 27.6589C12.7421 27.6363 12.8171 27.5978 12.8823 27.5457C12.9475 27.4936 13.0016 27.429 13.0414 27.3556C14.5133 24.8119 17.1149 23.2931 20 23.2931C22.8852 23.2931 25.4867 24.8119 26.9586 27.3556C26.9985 27.429 27.0526 27.4936 27.1178 27.5457C27.183 27.5978 27.258 27.6363 27.3383 27.6589C27.4186 27.6816 27.5027 27.6879 27.5855 27.6776C27.6683 27.6672 27.7482 27.6403 27.8205 27.5986C27.8927 27.5569 27.9559 27.5011 28.0063 27.4345C28.0566 27.3679 28.0932 27.292 28.1137 27.2111C28.1342 27.1302 28.1383 27.046 28.1258 26.9635C28.1132 26.881 28.0843 26.8018 28.0407 26.7306ZM15.625 17.6681C15.625 16.8028 15.8816 15.957 16.3623 15.2375C16.8431 14.5181 17.5264 13.9573 18.3258 13.6262C19.1252 13.295 20.0049 13.2084 20.8535 13.3772C21.7022 13.546 22.4818 13.9627 23.0936 14.5745C23.7055 15.1864 24.1222 15.966 24.291 16.8146C24.4598 17.6633 24.3731 18.543 24.042 19.3424C23.7109 20.1418 23.1501 20.8251 22.4306 21.3058C21.7112 21.7866 20.8653 22.0431 20 22.0431C18.8401 22.0419 17.728 21.5806 16.9078 20.7604C16.0876 19.9402 15.6263 18.8281 15.625 17.6681Z"
              fill="white"
            />
          </svg>
        </svg>
      </button>
    );
  };

  // Updated profile section using Clerk user data
  const renderProfileSection = () => {
    if (!isSignedIn) return null;

    return (
      <div className="mt-16 mx-6 pb-5 pt-5 px-6 bg-[#f9f9f9] rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={user?.imageUrl || "/assets/images/default-avatar.png"}
            alt="Profile"
            className="w-[62px] h-[62px] rounded-full object-cover"
          />
          <div>
            <h2 className="font-helvetica text-[20px] font-normal">
              Hi {user?.firstName || user?.username || "User"}!
            </h2>
            <p className="font-helvetica text-[14px] font-normal text-[#c3c3c3]">
              {user?.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <button
          onClick={() => handlePageChange("profile-management")}
          className="font-satoshi text-[16px] underline underline-offset-4 decoration-1"
        >
          Edit Profile
        </button>
      </div>
    );
  };
  const handleBack = () => {
    setSlideDirection("backward");
    setCurrentPage("profile");
  };

  const handleOverlayClick = () => {
    if (currentPage === "profile") {
      setIsOpen(false);
    }
  };

  const PageHeader = ({ title }) => (
    <div className="flex items-center p-6 border-b border-[#ECECEC]">
      <button onClick={handleBack} className="mr-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <h1 className="font-helvetica text-[24px] font-normal">{title}</h1>
    </div>
  );

  const PageContainer = ({ children }) => (
    <div
      className={`absolute top-0 left-0 w-full h-full bg-white transform transition-transform duration-300 ease-in-out
    ${
      currentPage === "profile"
        ? "translate-x-0"
        : slideDirection === "forward"
        ? "translate-x-[483px]"
        : "-translate-x-[483px]"
    }
    `}
      style={{
        transform:
          currentPage === "profile"
            ? "translateX(0)"
            : slideDirection === "forward"
            ? "translateX(0)"
            : "translateX(-483px)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      {children}
    </div>
  );

  const SavedAddressPage = () => (
    <PageContainer>
      <PageHeader title="Saved Address" />
      <div className="p-6 space-y-6">
        {/* Add New Address Button */}
        <button className="w-full flex items-center justify-center gap-2 p-4 border border-black font-helvetica text-base">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M10 5v10M5 10h10" />
          </svg>
          Add new Address
        </button>

        {/* Address Cards */}
        <div className="space-y-6">
          {/* First Address Card */}
          <div className="border border-gray-200 p-4 rounded">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-helvetica text-base font-medium">
                  Ijas Ahammed J
                </h3>
                <p className="font-helvetica text-sm mt-1">
                  marketfeed, BHIVE HoneyKomb, 3/B 19th Main Road, HSR Layout
                  Sector 3 Bangalore, Karnataka, 560102
                </p>
                <p className="font-helvetica text-sm mt-2">+91 9446852476</p>
              </div>
              <span className="px-3 py-1 text-xs bg-gray-100 rounded">
                Default Address
              </span>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-black">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M11.333 2.667H4.667A2 2 0 002.667 4.667v6.666a2 2 0 002 2h6.666a2 2 0 002-2V4.667a2 2 0 00-2-2z" />
                  <path d="M7.333 6L8.667 7.333 10 6M5.333 9.333h5.334" />
                </svg>
                Edit Address
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-black">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M2.667 4h10.666M5.333 4V2.667h5.334V4M6.667 6.667v5M9.333 6.667v5" />
                  <path d="M3.333 4l.534 8a2 2 0 002 1.867h4.266a2 2 0 002-1.867l.534-8" />
                </svg>
                Delete Address
              </button>
            </div>
          </div>

          {/* Second Address Card */}
          <div className="border border-gray-200 p-4 rounded">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-helvetica text-base font-medium">
                  Bitta Sinha
                </h3>
                <p className="font-helvetica text-sm mt-1">
                  Shabeena Manzil, 108, 2nd Floor, Mangampalaya, Bommanahalli,
                  Bangalore, 560103
                </p>
                <p className="font-helvetica text-sm mt-2">+91 94019 31478</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-black">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M11.333 2.667H4.667A2 2 0 002.667 4.667v6.666a2 2 0 002 2h6.666a2 2 0 002-2V4.667a2 2 0 00-2-2z" />
                  <path d="M7.333 6L8.667 7.333 10 6M5.333 9.333h5.334" />
                </svg>
                Edit Address
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-black">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M2.667 4h10.666M5.333 4V2.667h5.334V4M6.667 6.667v5M9.333 6.667v5" />
                  <path d="M3.333 4l.534 8a2 2 0 002 1.867h4.266a2 2 0 002-1.867l.534-8" />
                </svg>
                Delete Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );

  const OrdersPage = () => (
    <PageContainer>
      <PageHeader title="Orders" />
      <div className="p-6">{/* Orders content */}</div>
    </PageContainer>
  );

  const ManageProfilePage = () => (
    <PageContainer>
      <PageHeader title="Manage Profile" />
      <div className="p-6">{/* Profile management content */}</div>
    </PageContainer>
  );

  const HelpCentrePage = () => (
    <PageContainer>
      <PageHeader title="Help Centre" />
      <div className="p-6">{/* Help content */}</div>
    </PageContainer>
  );

  const renderPage = () => {
    if (!isSignedIn) {
      return (
        <div className="h-full flex items-center justify-center">
          <SignInButton mode="modal">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
              Sign in to continue
            </button>
          </SignInButton>
        </div>
      );
    }
    switch (currentPage) {
      case "orders":
        return <OrdersPage />;
      case "address":
        return <SavedAddressPage />;
      case "profile-management":
        return <ManageProfilePage />;
      case "help":
        return <HelpCentrePage />;
      default:
        return (
          <PageContainer>
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>

            {renderProfileSection()}

            {/* Profile Section */}
            {/* <div className="mt-16 mx-6 pb-5 pt-5 px-6 bg-[#f9f9f9] rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src="/assets/images/img-avatar.gif"
                  alt="Profile"
                  className="w-[62px] h-[62px] rounded-full object-cover"
                />
                <div>
                  <h2 className="font-helvetica text-[20px] font-normal">
                    Hi Pranav!
                  </h2>
                  <p className="font-helvetica text-[14px] font-normal text-[#c3c3c3]">
                    Clan Member #231
                  </p>
                </div>
              </div>
              <button className="font-satoshi text-[16px] underline underline-offset-4 decoration-1">
                Edit Profile
              </button>
            </div> */}

            {/* Menu Items */}
            <div className="mt-6 mx-6">
              {[
                { id: "orders", title: "Orders", svgPath: "" },
                { id: "address", title: "Saved Address", svgPath: "" },
                {
                  id: "profile-management",
                  title: "Manage Profile",
                  svgPath: "",
                },
                { id: "help", title: "Help Centre", svgPath: "" },
              ].map((item) => (
                <button
                  key={item.id}
                  className="w-full flex items-center justify-between py-4 border-b"
                  onClick={() => handlePageChange(item.id)}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.1875 12C9.1875 12.0829 9.15458 12.1624 9.09597 12.221C9.03737 12.2796 8.95788 12.3125 8.875 12.3125C8.79212 12.3125 8.71263 12.2796 8.65403 12.221C8.59542 12.1624 8.5625 12.0829 8.5625 12C8.5625 11.9171 8.59542 11.8376 8.65403 11.779C8.71263 11.7204 8.79212 11.6875 8.875 11.6875C8.95788 11.6875 9.03737 11.7204 9.09597 11.779C9.15458 11.8376 9.1875 11.9171 9.1875 12ZM9.1875 12H8.875M12.3125 12C12.3125 12.0829 12.2796 12.1624 12.221 12.221C12.1624 12.2796 12.0829 12.3125 12 12.3125C11.9171 12.3125 11.8376 12.2796 11.779 12.221C11.7204 12.1624 11.6875 12.0829 11.6875 12C11.6875 11.9171 11.7204 11.8376 11.779 11.779C11.8376 11.7204 11.9171 11.6875 12 11.6875C12.0829 11.6875 12.1624 11.7204 12.221 11.779C12.2796 11.8376 12.3125 11.9171 12.3125 12ZM12.3125 12H12M15.4375 12C15.4375 12.0829 15.4046 12.1624 15.346 12.221C15.2874 12.2796 15.2079 12.3125 15.125 12.3125C15.0421 12.3125 14.9626 12.2796 14.904 12.221C14.8454 12.1624 14.8125 12.0829 14.8125 12C14.8125 11.9171 14.8454 11.8376 14.904 11.779C14.9626 11.7204 15.0421 11.6875 15.125 11.6875C15.2079 11.6875 15.2874 11.7204 15.346 11.779C15.4046 11.8376 15.4375 11.9171 15.4375 12ZM15.4375 12H15.125M19.5 12C19.5 15.7967 16.1417 18.875 12 18.875C11.281 18.8759 10.565 18.7814 9.87083 18.5942C8.8923 19.2824 7.6986 19.5951 6.50833 19.475C6.376 19.4622 6.24422 19.4442 6.11333 19.4208C6.52406 18.9368 6.80456 18.356 6.92833 17.7333C7.00333 17.3525 6.8175 16.9825 6.53917 16.7117C5.275 15.4817 4.5 13.8242 4.5 12C4.5 8.20333 7.85833 5.125 12 5.125C16.1417 5.125 19.5 8.20333 19.5 12Z"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span className="font-helvetica text-[20px] font-normal">
                      {item.title}
                    </span>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Logout Button */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <button
                onClick={() => signOut()}
                className="w-full flex items-center justify-center gap-[10px] p-[16.5px] bg-black text-white font-helvetica text-[20px] font-normal"
              >
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.03267 12.8303C7.93875 12.8303 7.93875 11.1686 9.03267 11.1686H18.8638L17.1096 9.41443C16.3361 8.64091 17.5111 7.46611 18.2844 8.23963L21.457 11.4122C21.7815 11.7367 21.7815 12.2627 21.457 12.5872L18.2844 15.7598C17.5109 16.5333 16.3361 15.3583 17.1096 14.5847L18.864 12.8303H9.03267ZM15.3283 6.48283V4.77859C15.3283 3.68803 14.4394 2.79883 13.3486 2.79883H5.27859C4.18779 2.79883 3.29883 3.68803 3.29883 4.77859V19.2206C3.29883 19.7627 3.52179 20.2576 3.88131 20.6179L3.87963 20.6195C4.23795 20.9779 4.73307 21.2003 5.27859 21.2003H13.3486C14.4396 21.2003 15.3283 20.3111 15.3283 19.2206V17.5166C15.3283 16.4227 13.6666 16.4227 13.6666 17.5166V19.2206C13.6666 19.3939 13.5219 19.5386 13.3483 19.5386H5.27859C5.19195 19.5386 5.11251 19.5026 5.05443 19.4445L5.05275 19.4462L4.96035 19.2206V4.77883C4.96035 4.60579 5.10555 4.46083 5.27859 4.46083H13.3486C13.5221 4.46083 13.6668 4.60579 13.6668 4.77883V6.48307C13.6668 7.57675 15.3283 7.57675 15.3283 6.48283Z"
                    fill="#F0F0F0"
                  />
                </svg>
                <span>Log Out</span>
              </button>
            </div>
          </PageContainer>
        );
    }
  };

  return (
    <div className="z-40">
      {/* <button onClick={() => setIsOpen(true)}>{renderProfileButton()}</button> */}
      {renderProfileButton()}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[96]"
          // onClick={handleOverlayClick}
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[483px] bg-white transform transition-transform duration-300 ease-in-out z-[97] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {renderPage()}
      </div>
    </div>
  );
};

export default UserProfileDrawer;
