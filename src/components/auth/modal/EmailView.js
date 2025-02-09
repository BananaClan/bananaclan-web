// src/components/auth/modal/EmailView.js
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { validateEmail } from "../utils/validators";
import { useAuthContext } from "../../../context/AuthContext";
import { useSignIn } from "@clerk/clerk-react";

const EmailView = () => {
  // State for managing email input and validation
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const { isInitializing, navigateToView } = useAuthContext();
  // Use Clerk's signIn hook directly
  const { signIn, isLoaded } = useSignIn();
  // Get authentication methods and loading state from our hook
  // Get all necessary methods from useAuth, including handleGoogleAuth
  // const {
  //   handleEmailSubmit,
  //   handleGoogleSignIn,
  //   loading,
  //   error: authError,
  // } = useAuth();

  // Handle real-time email validation
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Clear errors when user starts typing
    if (emailError) setEmailError("");
  };
  // Handle Google sign-in click
  //  const handleGoogleClick = async (e) => {
  //   e.preventDefault();
  //   await handleGoogleAuth();
  // };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email.trim()) {
      setEmailError("Please enter your email");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      // Create email code (OTP) verification
      const signInAttempt = await signIn.create({
        identifier: email,
        strategy: "email_code"
      });

      // Start the email code verification process
      await signInAttempt.prepareFirstFactor({
        strategy: "email_code",
        emailAddressId: signInAttempt.supportedFirstFactors.find(
          factor => factor.strategy === 'email_code'
        ).emailAddressId
      });

      // Navigate to OTP view on success
      navigateToView('otp');
    } catch (err) {
      console.error('Email verification error:', err);
      setEmailError('Failed to send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };
 // Handle Google OAuth
 const handleGoogleSignIn = async () => {
  try {
    setLoading(true);
    await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: `${window.location.origin}/sso-callback`,
      redirectUrlComplete: window.location.origin
    });
  } catch (err) {
    console.error('Google authentication error:', err);
    setEmailError('Google authentication failed. Please try again.');
    setLoading(false);
  }
};
if (!isLoaded) {
  return <div>Loading...</div>;
}
  // Disable buttons while initializing
  const isDisabled = loading || isInitializing;
  return (
    <div className="w-full mt-[60px]">
      <p>Enter Email</p>
      <input
        type="email"
        placeholder="jujutsukaizen@apenation.com"
        className={`w-full p-4 border focus:outline-none focus:ring-1 focus:ring-black mt-3 ${
          emailError ? "border-red-500" : ""
        }`}
        value={email}
        onChange={handleEmailChange}
        disabled={loading}
      />

      {/* Error messages */}
      {emailError && (
        <p className="text-red-500 text-sm mt-1">{emailError}</p>
      )}

      {/* Submit button */}
      <button
        className={`w-full bg-black text-white p-4 font-medium mt-6 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "SENDING OTP..." : "REQUEST OTP"}
      </button>

      {/* Google authentication option */}
      <div className="relative text-center mt-4 mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <span className="relative px-4 bg-white text-sm text-gray-500">OR</span>
      </div>

      {/* Google sign-in button */}
      <button
        className="w-full text-black p-4 font-medium ring-1 ring-gray-200 flex items-center justify-center gap-2"
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        <img
          src="/assets/images/googleLogo.png"
          alt="Google"
          className="w-5 h-5"
        />
                {loading ? "CONNECTING TO GOOGLE..." : "SIGN IN USING GOOGLE"}

      </button>
      {/* Show initialization state if needed */}
      {isInitializing && (
        <p className="text-sm text-gray-500 mt-2 text-center">
          Please wait while we initialize the authentication service...
        </p>
      )}

      {/* Error messages
      {(emailError || authError) && (
        <p className="text-red-500 text-sm mt-1">{emailError || authError}</p>
      )} */}
      {/* Help text */}
      <p className="text-sm text-gray-500 mt-12 text-center">
        Having trouble in signing up?{" "}
        <span className="underline underline-offset-4 cursor-pointer text-black">
          Contact Us
        </span>
      </p>
    </div>
  );
};

export default EmailView;
