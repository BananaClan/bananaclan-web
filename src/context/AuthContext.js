// src/context/AuthContext.js
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useClerk, useSession } from "@clerk/clerk-react";

// Create the context that will hold our authentication state and methods
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Add state for tracking initialization
  const [isInitializing, setIsInitializing] = useState(true);
  const clerk = useClerk();
  const session = useSession();
  // Track both initialization and readiness
  const [initState, setInitState] = useState({
    isChecking: true,    // Are we checking initialization?
    isReady: false,      // Is everything fully ready?
    retryCount: 0,       // How many times have we checked?
    error: null          // Any initialization errors
  });
  // Add initialization check effect
  React.useEffect(() => {
    if (clerk) {
      setIsInitializing(false);
    }
    if(clerk){
      console.log("clerk",{clerk});
    }
  }, [clerk]);
  // State for managing the authentication modal and its views
  const [modalState, setModalState] = useState({
    isOpen: false,
    view: "email", // Possible values: 'email', 'otp', 'profile', 'avatar'
    randomImage: null, // Will store the current random image path
  });

  // State for storing authentication data during the flow
  const [authData, setAuthData] = useState({
    email: "",
    signInAttempt: null,
    isNewUser: false,
    userDetails: {
      name: "",
      dateOfBirth: "",
      selectedAvatar: null,
    },
  });
  // const clerk = useClerk();
  // // Get Clerk's authentication methods
  // const { signIn, signUp, session } = useClerk();
  // Handle Google OAuth authentication
  // Enhanced initialization check
  useEffect(() => {
    let timeoutId;
    
    const checkClerkReady =   () => {
      // Log current state for debugging
      console.log('Checking Clerk state:', {
        clerk: !!clerk,
        signIn: !!clerk?.signIn,
        mounted: !!clerk?.__mounted,
        retryCount: initState.retryCount
      });

      if (clerk && clerk.signIn && clerk.__mounted) {
        console.log('Clerk is ready');
        // Everything is ready
        setInitState(prev => ({
          ...prev,
          isChecking: false,
          isReady: true
        }));
        return true;
      }

      if (initState.retryCount >= 10) {
        // Give up after 10 attempts
        setInitState(prev => ({
          ...prev,
          isChecking: false,
          error: "Failed to initialize authentication service after multiple attempts"
        }));
        return false;
      }

      // Try again in 500ms
      timeoutId = setTimeout(() => {
        setInitState(prev => ({
          ...prev,
          retryCount: prev.retryCount + 1
        }));
      }, 500);

      return false;
    };

    checkClerkReady();
     // Cleanup timeout on unmount
     return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [clerk, initState.retryCount]);

  const handleGoogleAuth = useCallback(async () => {
    try {
      console.log('Auth attempt with state:', {
        isChecking: initState.isChecking,
        isReady: initState.isReady,
        retryCount: initState.retryCount
      });
  
      if (!initState.isReady) {
        throw new Error("Please wait, authentication service is initializing...");
      }
  
      if (!clerk?.signIn) {
        throw new Error("Authentication service not properly initialized");
      }
 // Log the attempt
 console.log('Initiating Google auth with state:', {
  initState,
  sessionStatus: session?.status
});
      // Log the state for debugging
      console.log("Clerk state:", {
        isInitialized: !isInitializing,
        hasSignIn: !!clerk?.signIn,
        sessionStatus: session?.status,
      });
      // // Check if clerk and clerk.signIn are available
      // if (!clerk || !clerk.signIn) {
      //   throw new Error("Authentication service not initialized");
      // }
      await clerk.signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: `${window.location.origin}/sso-callback`,
        redirectUrlComplete: window.location.origin,
      });
    } catch (error) {
      console.error("Google authentication error:", error);
      throw error;
    }
  }, [clerk,session]);

   // Handle email authentication using clerk instance
   const handleEmailAuth = useCallback(async (email) => {
    try {
      if (!clerk?.signIn) {
        throw new Error("Authentication service not initialized");
      }

      const signInAttempt = await clerk.signIn.create({
        identifier: email,
        strategy: "email_code",
      });

      setAuthData((prev) => ({
        ...prev,
        email,
        signInAttempt,
        isNewUser:
          signInAttempt.firstFactorVerification.status === "needs_first_factor",
      }));

      return signInAttempt;
    } catch (error) {
      console.error("Email authentication error:", error);
      throw error;
    }
  }, [clerk]);

  // Function to rotate random login images
  const rotateRandomImage = useCallback(() => {
    const images = [
      "/assets/images/login-flow-temp.png",
      "/assets/images/login-flow-temp-2.png",
      "/assets/images/login-flow-temp-3.png",
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    setModalState((prev) => ({
      ...prev,
      randomImage: images[randomIndex],
    }));
  }, []);

  // Modal control functions
  const openModal = useCallback(() => {
    rotateRandomImage();
    setModalState((prev) => ({
      ...prev,
      isOpen: true,
      view: "email",
    }));
  }, [rotateRandomImage]);

  const closeModal = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
    // Reset auth data when modal closes
    setAuthData({
      email: "",
      signInAttempt: null,
      isNewUser: false,
      userDetails: {
        name: "",
        dateOfBirth: "",
        selectedAvatar: null,
      },
    });
  }, []);

  // Navigation between modal views
  const navigateToView = useCallback((view) => {
    setModalState((prev) => ({
      ...prev,
      view,
    }));
  }, []);

  // Update authentication data during the flow
  const updateAuthData = useCallback((data) => {
    setAuthData((prev) => ({
      ...prev,
      ...data,
    }));
  }, []);

  // Create the context value object with all our state and methods
  const contextValue = {
    modalState,
    authData,
    openModal,
    closeModal,
    navigateToView,
    updateAuthData,
    handleEmailAuth,
    handleGoogleAuth,
    clerk,
    session,
    rotateRandomImage,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook for accessing the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
