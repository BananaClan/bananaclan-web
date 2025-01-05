import axios from 'axios';

const BASE_URL = 'https://testrepo-rga0.onrender.com/api';

export const productApi = {
  // Method for recommended products
  getRecommendedProducts: async (size = 12) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/recommended?size=${size}`);
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching recommended products:', error);
      throw error;
    }
  },
  // Method for product details page

  getProductDetails: async (productId) => {
    try {
      const response = await axios.get(`${BASE_URL}/product/${productId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw error;
    }
  },

  
  // Method for latest arrivals
  getLatestArrivals: async (size = 12) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/latestArrivals?size=${size}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching latest arrivals:', error);
      throw error;
    }
  }
};