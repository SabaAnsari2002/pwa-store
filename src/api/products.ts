import axios from 'axios';

const API_URL = 'http://localhost:8000/api/products';

export const getProductsBySubcategory = async (subcategoryName: string) => {
  const encodedName = encodeURIComponent(subcategoryName);
  const response = await axios.get(`${API_URL}/by-subcategory/${encodedName}/`);
  return response.data;
};

export const getProductsByCategory = async (categoryName: string) => {
  const encodedName = encodeURIComponent(categoryName);
  const response = await axios.get(`${API_URL}/by-category/${encodedName}/`);
  return response.data;
};