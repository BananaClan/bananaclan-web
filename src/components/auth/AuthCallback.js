import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';

export const AuthCallback = () => {
  const navigate = useNavigate();
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    handleRedirectCallback()
      .then(() => navigate('/'))
      .catch((err) => {
        console.error('OAuth callback error:', err);
        navigate('/');
      });
  }, [handleRedirectCallback, navigate]);

  return <div>Processing authentication...</div>;
};