// src/components/auth/modal/AuthModal.js
import React from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import EmailView from './EmailView';
import OTPView from './OTPView';
import ProfileView from './ProfileView';
import AvatarView from './AvatarView';

const AuthModal = ({ isOpen, view, randomImage }) => {
  const { closeModal } = useAuthContext();

  // Return null if modal shouldn't be shown
  if (!isOpen) return null;

  // Function to render the current view
  const renderView = () => {
    switch (view) {
      case 'email':
        return (
          <>
            
            <EmailView />
          </>
        );

      case 'otp':
        return <OTPView />;

      case 'profile':
        return <ProfileView />;

      case 'avatar':
        return <AvatarView />;

      case 'complete':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-semibold mb-4">Welcome Back!</h2>
            <p className="text-gray-600">You've successfully signed in.</p>
          </div>
        );

      default:
        return (
          <>
            <h2 className="text-2xl font-semibold mb-1">Join the</h2>
            <img src="/assets/images/clan_text.png" alt="Featured sneaker" />
            <EmailView />
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[98]">
      <div className="bg-white w-[960px] h-[644px] flex overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/2 bg-gray-200">
          <img
            src={randomImage}
            alt="Featured sneaker"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-1/2 p-12 flex flex-col items-center relative">
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2 className="text-2xl font-semibold mb-1">Join the</h2>
                <img
                  src="/assets/images/clan_text.png"
                  alt="Featured sneaker"
                />
          {/* Render the current view */}
          {renderView()}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;