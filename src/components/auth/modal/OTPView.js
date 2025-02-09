// src/components/auth/modal/OTPView.js
import React, { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { useSignIn } from "@clerk/clerk-react"; // Added this

const OTPView = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(30);
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  const { authData, navigateToView,updateAuthData } = useAuthContext();
  const { signIn, setActive } = useSignIn(); // Added this
  const [loading, setLoading] = useState(false); // Manage loading state locally
  // Handle countdown for resend functionality
  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCountdown]);

  // Handle OTP input changes
  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // // Clear any existing errors
      // if (otpError) setOtpError("");
      // if (authError) setError(null);

      // Move to next input if available
      if (value && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs[index - 1].current.focus();
      }
    }
  };

  // Verify OTP with Clerk
  const handleVerification = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setOtpError("Please enter the complete verification code");
      return;
    }

    setLoading(true);
    try {
      const firstFactor = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code: otpString,
      });

      if (firstFactor.status === "complete") {
        setIsVerified(true);
        await setActive({ session: firstFactor.createdSessionId }); // Added this
// Update auth context with user status
updateAuthData({
  isNewUser: firstFactor.firstFactorVerification.firstTimeUser
});


      // Navigate after a brief delay to show success message
      setTimeout(() => {
        if (firstFactor.firstFactorVerification.firstTimeUser) {
          navigateToView("profile");
        } else {
          navigateToView("complete");
        }
      }, 1000);
    }
    }  catch (err) {
      console.error("OTP verification error:", err);
      setOtpError(
        err.message || "Invalid verification code. Please try again."
      );
      // Clear OTP fields on error
      setOtp(["", "", "", "", "", ""]);
      inputRefs[0].current.focus();
    } finally {
      setLoading(false);
    }
  };
  // Handle OTP resend
  const handleResendOTP = async () => {
    try {
      setLoading(true);
      await signIn.create({
        identifier: authData.email,
        strategy: "email_code",
      });

      setResendCountdown(30);
      setOtp(["", "", "", "", "", ""]);
      inputRefs[0].current.focus();
    } catch (err) {
      console.error("Resend OTP error:", err);
      setOtpError("Failed to resend code. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          We emailed you a code!
        </h2>
        <p className="text-gray-500 mb-8 text-center">
          Verification code sent to:{" "}
          <span className="text-black">{authData.email}</span>
        </p>
        {/* OTP Input Fields */}
        <div className="flex gap-3 mb-4 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength="1"
              className="w-12 h-12 border text-center text-xl"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={loading || isVerified}
            />
          ))}
        </div>
        {/* Success/Error Messages */}
        {isVerified && (
          <p className="text-green-500 text-sm mb-4 text-center">
            OTP verified successfully!
          </p>
        )}
        {/* // Changed to */}
        {otpError && (
          <p className="text-red-500 text-sm mb-4 text-center">{otpError}</p>
        )}
        {/* Resend OTP Section */}
        <div className="mb-8 text-center">
          {resendCountdown > 0 ? (
            <p className="text-gray-500">Resend OTP in {resendCountdown}s..</p>
          ) : (
            <button
              onClick={handleResendOTP}
              className="text-black underline underline-offset-4 cursor-pointer"
              disabled={loading}
            >
              Resend OTP
            </button>
          )}
        </div>
        {/* Action Buttons */}
        <button
          className={`w-full p-4 font-medium mb-4 ${
            otp.every((digit) => digit !== "")
              ? "bg-black text-white cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          onClick={handleVerification}
          disabled={
            !otp.every((digit) => digit !== "") || loading || isVerified
          }
        >
          {loading ? "VERIFYING..." : "CONTINUE"}
        </button>
        <button
          className="w-full p-4 text-black font-medium ring-1 ring-gray-200"
          onClick={() => navigateToView("email")}
          disabled={loading || isVerified}
        >
          CHANGE EMAIL ID
        </button>
      </div>
    </div>
  );
};

export default OTPView;
