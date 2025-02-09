// src/components/auth/hooks/useAuth.js
import { useState, useCallback } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { validateEmail } from '../utils/validators';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // const { signIn, navigateToView, updateAuthData } = useAuthContext();
  const { handleEmailAuth, handleGoogleAuth, navigateToView } = useAuthContext();

  const handleEmailSubmit = useCallback(async (email) => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await handleEmailAuth(email);
      navigateToView('otp');
    } catch (err) {
      setError('Failed to send verification code. Please try again.');
      console.error('Email submission error:', err);
    } finally {
      setLoading(false);
    }
  }, [handleEmailAuth, navigateToView]);

 // Handle Google sign-in
 const handleGoogleSignIn = useCallback(async () => {
  setLoading(true);
  setError(null);

  try {
    await handleGoogleAuth();
  } catch (err) {
    setError('Google authentication failed. Please try again.');
    console.error('Google auth error:', err);
  } finally {
    setLoading(false);
  }
}, [handleGoogleAuth]);


  return {
    loading,
    error,
    handleEmailSubmit,
    handleGoogleSignIn,
    setError
  };
};