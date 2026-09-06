import axios from 'axios';

// 1. CREATE AXIOS INSTANCE
// TODO: move baseURL to configs.js
const API = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. API METHODS / FETCH HELPERS

/**
 * Fetches products from json-server with optional search filtering.
 * @param {string} searchQuery - The search term typed by the user.
 * @returns {Promise<Array>} Array of product objects.
 */
export const getProducts = async (searchQuery = '') => {
  try {
    // json-server supports full-text search using the `q` query parameter: `/products?q=searchTerm`
    const params = searchQuery ? { name_contains: searchQuery } : {};
    const response = await API.get('/products', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches a single product by its ID.
 * @param {string|number} id - Product ID
 * @returns {Promise<Object>} Single product object.
 */
export const getProductById = async (id) => {
  try {
    const response = await API.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

export default API;
