// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { SignIn, SignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [authMode, setAuthMode] = useState('sign-in');
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    const formContainer = document.querySelector('.auth-form-container');
    formContainer?.classList.add('opacity-0');
    
    setTimeout(() => {
      setAuthMode(prevMode => prevMode === 'sign-in' ? 'sign-up' : 'sign-in');
      formContainer?.classList.remove('opacity-0');
    }, 200);
  };

  // Enhanced appearance settings to position social buttons at the top
  const commonAppearance = {
    elements: {
      // Styling for the main form elements
      formButtonPrimary: 
        "bg-black hover:bg-gray-900 text-white w-full rounded-lg py-3 font-medium transition-colors duration-200",
      card: "bg-white shadow-none p-0 mb-0",
      headerTitle: "hidden",
      headerSubtitle: "hidden",
      footerAction: "hidden",
      formFieldInput: 
        "w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black",
      formFieldLabel: 
        "text-gray-700 font-medium",
      
      // Social button styling
      socialButtonsIconButton: 
        "border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 w-full flex justify-center py-3 rounded-lg mb-3",
      socialButtonsProviderIcon: 
        "mr-2 h-5 w-5",
      
      // Divider styling
      dividerLine: "bg-gray-200",
      dividerText: "bg-white text-gray-500 px-3",
      
      // Container settings for fixed width
      rootBox: "w-[400px]",
      card: "w-full",
      form: "w-full"
    },
    layout: {
      socialButtonsPlacement: "top", // This moves social buttons to the top
      socialButtonsVariant: "blockButton", // Makes social buttons full width
      helpPageUrl: "#", // Remove help page link
    },
    terms: {
      // Hide default terms text and control this through the parent component
      termsPageUrl: "#",
      privacyPageUrl: "#",
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-[400px] space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {authMode === 'sign-in' ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {authMode === 'sign-in' 
              ? 'Sign in to access your account' 
              : 'Join us and start your journey'}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex rounded-lg border border-gray-200 p-1 bg-gray-50">
          <button
            onClick={() => setAuthMode('sign-in')}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              authMode === 'sign-in'
                ? 'bg-black text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthMode('sign-up')}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              authMode === 'sign-up'
                ? 'bg-black text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Auth Forms Container */}
        <div className="auth-form-container transition-opacity duration-200 ease-in-out">
          {authMode === 'sign-in' ? (
            <SignIn 
              routing="path" 
              path="/auth"
              afterSignInUrl="/"
              appearance={commonAppearance}
            />
          ) : (
            <SignUp 
              routing="path" 
              path="/auth"
              afterSignUpUrl="/"
              appearance={commonAppearance}
            />
          )}
        </div>

        {/* Help Text */}
        <div className="text-center text-sm pt-4 border-t border-gray-100">
          <p className="text-gray-600">
            {authMode === 'sign-in' ? (
              <>
                Don't have an account yet?{' '}
                <button
                  onClick={toggleAuthMode}
                  className="text-black font-medium hover:underline transition-colors duration-200"
                >
                  Create one here
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={toggleAuthMode}
                  className="text-black font-medium hover:underline transition-colors duration-200"
                >
                  Sign in here
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;