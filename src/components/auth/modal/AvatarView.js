// src/components/auth/modal/AvatarView.js
import React, { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { useSignIn } from "@clerk/clerk-react";

const AvatarView = () => {
  const avatars = [
    {
      id: 1,
      name: "Mighty",
      subtitle: "Apenos",
      image: "/assets/images/ape1.png",
    },
    { 
      id: 2, 
      name: "Morpheape", 
      image: "/assets/images/ape2.png" 
    },
    {
      id: 3,
      name: "Tupac",
      subtitle: "Shakape",
      image: "/assets/images/ape3.png",
    },
    { 
      id: 4, 
      name: "Lord Chimpton", 
      image: "/assets/images/ape4.png" 
    },
    { 
      id: 5, 
      name: "LeBanana James", 
      image: "/assets/images/ape5.png" 
    },
  ];

  // Randomly select a default avatar
  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    const randomIndex = Math.floor(Math.random() * avatars.length);
    return avatars[randomIndex].id;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { navigateToView, updateAuthData, closeModal } = useAuthContext();
  const { signIn } = useSignIn();

  const handleAvatarClick = (avatarId) => {
    setSelectedAvatar(avatarId);
    if (error) setError('');
  };

  const handleSubmit = async () => {
    if (!selectedAvatar) {
      setError('Please select an avatar');
      return;
    }

    setLoading(true);
    try {
      const selectedAvatarData = avatars.find(avatar => avatar.id === selectedAvatar);
      
      // Update auth context with selected avatar
      updateAuthData({
        userDetails: {
          selectedAvatar: selectedAvatarData
        }
      });

      // Complete the sign-up process
      navigateToView('complete');
      
      // Close modal after a delay
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (err) {
      console.error('Avatar selection error:', err);
      setError('Failed to update avatar. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const AvatarItem = ({ avatar, isSelected }) => (
    <div
      className="text-center cursor-pointer"
      onClick={() => handleAvatarClick(avatar.id)}
    >
      <div className="relative">
        <div
          className={`w-24 h-24 rounded-full mx-auto mb-2 overflow-hidden ${
            isSelected ? 'ring-4 ring-black ring-offset-2' : ''
          }`}
        >
          <img
            src={avatar.image}
            alt={avatar.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <p className="text-sm font-medium">{avatar.name}</p>
      {avatar.subtitle && (
        <p className="text-xs text-gray-500">{avatar.subtitle}</p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-2">Almost there!</h2>
        <h3 className="text-lg mb-8">Choose your avatar</h3>

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

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <p className="text-sm text-gray-500 mb-8 text-center">
          You can change this later on also
        </p>

        <button
          className="w-full bg-black text-white p-4 font-medium hover:bg-gray-900 transition-colors duration-200"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'UPDATING...' : 'CONTINUE'}
        </button>
      </div>
    </div>
  );
};

export default AvatarView;