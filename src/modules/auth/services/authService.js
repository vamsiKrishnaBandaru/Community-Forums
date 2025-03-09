import axiosInstance from '../../../constants/apiConstants';
import { API_ENDPOINTS } from '../../../constants/apiConstants';

// Register user
const register = async (userData) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.AUTH.REGISTER,
    userData
  );
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.AUTH.LOGIN,
    userData
  );
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  return null;
};

const authService = {
  register,
  login,
  logout
};

export default authService; 