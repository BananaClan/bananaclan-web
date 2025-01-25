import React, { useState, useEffect } from "react";
import UserProfileDrawer from "./UserProfileDrawer";
import {
  useAuth,
  useUser,
  SignInButton,
  UserButton,
  useClerk,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const IntegratedAuth = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (isSignedIn) {
      setIsDrawerOpen(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const LoginModal = () => {
    const [step, setStep] = useState("email");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [otpError, setOtpError] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [randomImage, setRandomImage] = useState("");

    const imageUrls = [
      "/assets/images/login-flow-temp.png",
      "/assets/images/login-flow-temp-2.png",
      "/assets/images/login-flow-temp-3.png",
    ];

    useEffect(() => {
      const randomIndex = Math.floor(Math.random() * imageUrls.length);
      setRandomImage(imageUrls[randomIndex]);
    }, []);

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const handleRequestOTP = () => {
      if (!email.trim()) {
        setEmailError("Please enter your email");
        return;
      }

      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email");
        return;
      }

      setEmailError("");
      setStep("otp");
    };

    const handleOtpChange = (index, value) => {
      if (value.length <= 1 && /^\d*$/.test(value)) {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
          const nextInput = document.querySelector(
            `input[name="otp-${index + 1}"]`
          );
          if (nextInput) nextInput.focus();
        }
      }
    };

    const handleOtpKeyDown = (index, e) => {
      if (e.key === "Backspace") {
        if (!otp[index] && index > 0) {
          const prevInput = document.querySelector(
            `input[name="otp-${index - 1}"]`
          );
          if (prevInput) {
            prevInput.focus();
          }
        }
      }
    };

    const handleOtpContinue = () => {
      if (otp.every((digit) => digit !== "")) {
        const enteredOtp = otp.join("");
        if (enteredOtp === "1234") {
          setOtpError("");
          setOtpVerified(true);
          setTimeout(() => {
            setStep("profile");
          }, 1000);
        } else {
          setOtpError("OTP is incorrect");
          setOtpVerified(false);
        }
      }
    };

    const handleProfileContinue = () => {
      setStep("avatar");
    };

    const ResendOTP = () => {
      const [countdown, setCountdown] = useState(30);
      const [canResend, setCanResend] = useState(false);

      useEffect(() => {
        let timer;
        if (countdown > 0) {
          timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
          }, 1000);
        } else {
          setCanResend(true);
        }

        return () => {
          if (timer) clearInterval(timer);
        };
      }, [countdown]);

      const handleResend = () => {
        if (canResend) {
          setCountdown(30);
          setCanResend(false);
          // Add your OTP resend logic here
        }
      };

      return (
        <div className="mb-8 text-center">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-black underline underline-offset-4 cursor-pointer"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-gray-500">Resend OTP in {countdown}s..</p>
          )}
        </div>
      );
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
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>

            {step === "email" && (
              <>
                <h2 className="text-2xl font-semibold mb-1">Join the</h2>
                <img
                  src="/assets/images/clan_text.png"
                  alt="Featured sneaker"
                />
                <div className="w-full mt-[60px]">
                  <p>Enter Email</p>
                  <input
                    type="email"
                    placeholder="jujutsukaizen@apenation.com"
                    className={`w-full p-4 border focus:outline-none focus:ring-1 focus:ring-black mt-3 ${
                      emailError ? "border-red-500" : ""
                    }`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                  <button
                    className="w-full bg-black text-white p-4 font-medium mt-6"
                    onClick={handleRequestOTP}
                  >
                    REQUEST OTP
                  </button>
                  <div className="relative text-center mt-4 mb-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <span className="relative px-4 bg-white text-sm text-gray-500">
                      OR
                    </span>
                  </div>
                  <button className="w-full text-black p-4 font-medium ring-1 ring-gray-200 flex items-center justify-center gap-2">
                    <img
                      src="/assets/images/googleLogo.png"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    SIGN IN USING GOOGLE
                  </button>
                  <p className="text-sm text-gray-500 mt-12 text-center">
                    Having trouble in signing up?{" "}
                    <span className="underline underline-offset-4 cursor-pointer text-black">
                      Contact Us
                    </span>
                  </p>
                </div>
              </>
            )}

            {step === "otp" && (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="flex flex-col items-center max-w-sm w-full">
                  <h2 className="text-2xl font-semibold mb-2 text-center">
                    We emailed you a code!
                  </h2>
                  <p className="text-gray-500 mb-8 text-center">
                    Verification code sent to:{" "}
                    <span className="text-black">{email}</span>
                  </p>
                  <div className="flex gap-4 mb-4 justify-center">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        name={`otp-${index}`}
                        maxLength="1"
                        autoComplete="off"
                        inputMode="numeric"
                        className="w-12 h-12 border text-center text-xl"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      />
                    ))}
                  </div>
                  {otpVerified && (
                    <p className="text-green-500 text-sm mb-4 text-center">
                      OTP is verified
                    </p>
                  )}
                  {otpError && (
                    <p className="text-red-500 text-sm mb-4 text-center">
                      {otpError}
                    </p>
                  )}
                  <ResendOTP />

                  <button
                    className={`w-full p-4 font-medium mb-4 ${
                      otp.every((digit) => digit !== "")
                        ? "bg-black text-white cursor-pointer"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                    onClick={handleOtpContinue}
                    disabled={!otp.every((digit) => digit !== "")}
                  >
                    CONTINUE
                  </button>
                  <button
                    className="w-full p-4 text-black font-medium ring-1 ring-gray-200"
                    onClick={() => setStep("email")}
                  >
                    CHANGE EMAIL ID
                  </button>
                </div>
              </div>
            )}
            {step === "profile" && (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="flex flex-col items-center max-w-sm w-full">
                  <h2 className="text-2xl font-semibold mb-8 text-center">
                    Tell us about yourself
                  </h2>
                  <div className="space-y-6 w-full">
                    <div>
                      <label className="block text-[15px] font-medium text-gray-900 mb-2">
                        What should we call you
                      </label>
                      <input
                        type="text"
                        placeholder="Example: Johny Depp"
                        className="w-full h-[56px] px-4 border border-gray-200 focus:outline-none focus:border-gray-300 rounded-sm text-base placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <label className="block text-[15px] font-medium text-gray-900">
                          Date of birth
                        </label>
                        <span className="text-[13px] text-gray-500">
                          (optional)
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="DD"
                          className="w-[88px] h-[56px] px-4 border border-gray-200 focus:outline-none focus:border-gray-300 rounded-sm text-base text-center placeholder:text-gray-400"
                        />
                        <div className="relative w-[280px]">
                          <select className="w-full h-[56px] px-4 border border-gray-200 focus:outline-none focus:border-gray-300 rounded-sm appearance-none text-gray-400 bg-white cursor-pointer">
                            <option value="">Month</option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg
                              width="12"
                              height="8"
                              viewBox="0 0 12 8"
                              fill="none"
                            >
                              <path
                                d="M1 1.5L6 6.5L11 1.5"
                                stroke="#666666"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        <input
                          type="text"
                          placeholder="YYYY"
                          className="w-[104px] h-[56px] px-4 border border-gray-200 focus:outline-none focus:border-gray-300 rounded-sm text-base text-center placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                    <button
                      className="w-full h-[56px] bg-gray-400 text-white font-medium mt-8 hover:bg-black transition-colors duration-200"
                      onClick={handleProfileContinue}
                    >
                      CONTINUE
                    </button>
                  </div>
                </div>
              </div>
            )}
            {step === "avatar" && (
              <>
                <h2 className="text-2xl font-semibold mb-2">Almost there!</h2>
                <h3 className="text-lg mb-8">Choose your avatar</h3>
                <AvatarSelector />
                <p className="text-sm text-gray-500 mb-8 text-center">
                  You can change this later on also
                </p>
                <button className="w-full bg-black text-white p-4 font-medium">
                  CONTINUE
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const AvatarSelector = () => {
    const avatars = [
      {
        id: 1,
        name: "Mighty",
        subtitle: "Apenos",
        image: "/assets/images/ape1.png",
      },
      { id: 2, name: "Morpheape", image: "/assets/images/ape2.png" },
      {
        id: 3,
        name: "Tupac",
        subtitle: "Shakape",
        image: "/assets/images/ape3.png",
      },
      { id: 4, name: "Lord Chimpton", image: "/assets/images/ape4.png" },
      { id: 5, name: "LeBanana James", image: "/assets/images/ape5.png" },
    ];

    // Randomly select a default avatar
    const [selectedAvatar, setSelectedAvatar] = useState(() => {
      const randomIndex = Math.floor(Math.random() * avatars.length);
      return avatars[randomIndex].id;
    });

    const handleAvatarClick = (avatarId) => {
      setSelectedAvatar(avatarId);
    };

    const AvatarItem = ({ avatar, isSelected }) => (
      <div
        className="text-center cursor-pointer"
        onClick={() => handleAvatarClick(avatar.id)}
      >
        <div className="relative">
          <div className="relative">
            <div
              className={`w-24 h-24 rounded-full mx-auto mb-2 overflow-hidden ${
                isSelected ? "ring-4 ring-black ring-offset-2" : ""
              }`}
            >
              <img
                src={avatar.image}
                alt={avatar.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <p className="text-sm font-medium">{avatar.name}</p>
        {avatar.subtitle && (
          <p className="text-xs text-gray-500">{avatar.subtitle}</p>
        )}
      </div>
    );

    return (
      <div className="flex flex-col items-center mb-8">
        {/* First row with 3 avatars */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {avatars.slice(0, 3).map((avatar) => (
            <AvatarItem
              key={avatar.id}
              avatar={avatar}
              isSelected={selectedAvatar === avatar.id}
            />
          ))}
        </div>

        {/* Second row with 2 centered avatars */}
        <div className="grid grid-cols-2 gap-6">
          {avatars.slice(3).map((avatar) => (
            <AvatarItem
              key={avatar.id}
              avatar={avatar}
              isSelected={selectedAvatar === avatar.id}
            />
          ))}
        </div>
      </div>
    );
  };

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
          onClick={handleProfileClick}
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
      <button onClick={handleProfileClick} className="cursor-pointer">
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
      </button>
    );
  };

  return (
    <>
      {renderProfileButton()}

      {showLoginModal && <LoginModal />}

      {isDrawerOpen && (
        <UserProfileDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}
    </>
  );
};

export default IntegratedAuth;
