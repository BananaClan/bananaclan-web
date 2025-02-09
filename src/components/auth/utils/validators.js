// src/components/auth/utils/validators.js
/**
 * Validates email format using regex
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Validates the 4-digit OTP code
   * @param {string[]} otp - Array of OTP digits
   * @returns {boolean} - Whether the OTP is valid
   */
  export const validateOTP = (otp) => {
    return otp.every(digit => digit !== '') && otp.length === 4;
  };
  
  /**
   * Validates user profile details
   * @param {Object} details - User details object
   * @param {string} details.name - User's name
   * @param {string} details.dateOfBirth - User's date of birth (optional)
   * @returns {Object} - Validation result with isValid flag and errors object
   */
  export const validateUserDetails = (details) => {
    const { name } = details;
    const errors = {};
  
    if (!name || name.trim().length < 2) {
      errors.name = 'Please enter a valid name (minimum 2 characters)';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  // Helper function to validate date of birth (optional)
  export const validateDateOfBirth = (day, month, year) => {
    if (!day && !month && !year) return true; // Optional field
    
    const date = new Date(year, month - 1, day);
    const today = new Date();
    
    return (
      date instanceof Date && 
      !isNaN(date) && 
      date < today && 
      year >= 1900
    );
  };