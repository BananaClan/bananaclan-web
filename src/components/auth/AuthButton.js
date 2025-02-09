// src/components/auth/AuthButton.js
import React, { useState } from 'react';
import { useUser } from "@clerk/clerk-react";
import { useAuthContext } from '../../context/AuthContext';
import AuthModal from './modal/AuthModal';
import UserProfileDrawer from '../common/UserProfileDrawer';

const AuthButton = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { modalState, openModal } = useAuthContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);  // Add this

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <button className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" disabled>
        <span className="sr-only">Loading...</span>
      </button>
    );
  }
  const handleClick = () => {
    if (isSignedIn) {
      setIsDrawerOpen(true);
    } else {
      openModal();
    }
  };
  return (
    <>
      {/* Auth Button */}
      <button onClick={handleClick} className="cursor-pointer">
        {isSignedIn ? (
          <img
            src={user?.imageUrl || "/assets/images/default-avatar.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        ) : (
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
        )}
      </button>

      {/* Auth Modal */}
      {modalState.isOpen && (
        <AuthModal 
          isOpen={modalState.isOpen} 
          view={modalState.view}
          randomImage={modalState.randomImage}
        />
      )}
      {/* User Profile Drawer */}
      {isDrawerOpen && (
        <UserProfileDrawer 
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}
    </>
  );
};

export default AuthButton;