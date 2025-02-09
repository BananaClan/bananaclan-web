// src/components/auth/modal/ProfileView.js
import React, { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { useSignIn } from "@clerk/clerk-react";

const ProfileView = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    day: '',
    month: '',
    year: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { navigateToView, updateAuthData } = useAuthContext();

  const handleSubmit = async () => {
    // Basic validation
    const newErrors = {};
    if (!userDetails.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Optional DOB validation if any field is filled
    if (userDetails.day || userDetails.month || userDetails.year) {
      const day = parseInt(userDetails.day);
      const month = parseInt(userDetails.month);
      const year = parseInt(userDetails.year);

      if (!(day >= 1 && day <= 31)) {
        newErrors.date = 'Please enter a valid date';
      }
      if (!month) {
        newErrors.date = 'Please select a month';
      }
      if (!(year >= 1900 && year <= new Date().getFullYear())) {
        newErrors.date = 'Please enter a valid year';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        // Save user details in context
        updateAuthData({
          userDetails: {
            name: userDetails.name,
            dateOfBirth: userDetails.day && userDetails.month && userDetails.year ? 
              `${userDetails.year}-${userDetails.month}-${userDetails.day}` : null
          }
        });
        
        // Navigate to avatar selection
        navigateToView('avatar');
      } catch (error) {
        console.error('Profile update error:', error);
        setErrors({ submit: 'Failed to update profile. Please try again.' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Tell us about yourself
        </h2>
        
        <div className="space-y-6 w-full">
          {/* Name Input */}
          <div>
            <label className="block text-[15px] font-medium text-gray-900 mb-2">
              What should we call you
            </label>
            <input
              type="text"
              placeholder="Example: Johny Depp"
              className={`w-full h-[56px] px-4 border border-gray-200 focus:outline-none focus:border-gray-300 rounded-sm text-base placeholder:text-gray-400 ${
                errors.name ? 'border-red-500' : ''
              }`}
              value={userDetails.name}
              onChange={(e) => {
                setUserDetails(prev => ({ ...prev, name: e.target.value }));
                if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
              }}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-[15px] font-medium text-gray-900">
                Date of birth
              </label>
              <span className="text-[13px] text-gray-500">(optional)</span>
            </div>
            <div className="flex gap-3">
              {/* Day */}
              <input
                type="text"
                placeholder="DD"
                maxLength="2"
                className="w-[88px] h-[56px] px-4 border border-gray-200 focus:outline-none focus:border-gray-300 rounded-sm text-base text-center placeholder:text-gray-400"
                value={userDetails.day}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setUserDetails(prev => ({ ...prev, day: value }));
                  if (errors.date) setErrors(prev => ({ ...prev, date: '' }));
                }}
              />

              {/* Month */}
              <div className="relative w-[280px]">
                <select
                  className={`w-full h-[56px] px-4 border border-gray-200 focus:outline-none focus:border-gray-300 rounded-sm appearance-none ${
                    userDetails.month ? 'text-black' : 'text-gray-400'
                  } bg-white cursor-pointer`}
                  value={userDetails.month}
                  onChange={(e) => {
                    setUserDetails(prev => ({ ...prev, month: e.target.value }));
                    if (errors.date) setErrors(prev => ({ ...prev, date: '' }));
                  }}
                >
                  <option value="">Month</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <option key={month} value={month}>
                      {new Date(2000, month - 1).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
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

              {/* Year */}
              <input
                type="text"
                placeholder="YYYY"
                maxLength="4"
                className="w-[104px] h-[56px] px-4 border border-gray-200 focus:outline-none focus:border-gray-300 rounded-sm text-base text-center placeholder:text-gray-400"
                value={userDetails.year}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setUserDetails(prev => ({ ...prev, year: value }));
                  if (errors.date) setErrors(prev => ({ ...prev, date: '' }));
                }}
              />
            </div>
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>

          {errors.submit && (
            <p className="text-red-500 text-sm text-center">{errors.submit}</p>
          )}

          <button
            className={`w-full h-[56px] ${
              userDetails.name.trim()
                ? 'bg-black hover:bg-gray-900'
                : 'bg-gray-400'
            } text-white font-medium mt-8 transition-colors duration-200`}
            onClick={handleSubmit}
            disabled={loading || !userDetails.name.trim()}
          >
            {loading ? 'UPDATING...' : 'CONTINUE'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;