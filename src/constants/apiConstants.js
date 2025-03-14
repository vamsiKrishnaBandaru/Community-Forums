import axios from 'axios';
import config from '../constants/config';

// Create axios instance with base URL from config
const axiosInstance = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.baseURL + config.url);
    
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response status:', response.status);
    return response;
  },
  (error) => {
    // Handle session expiration
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login if token is invalid
      if (localStorage.getItem('user')) {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    console.error('Response error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/users/register',
    LOGIN: '/api/users/login',
  },
  FORUMS: {
    BASE: '/api/forums',
    DETAIL: (id) => `/api/forums/${id}`,
  },
  COMMENTS: {
    BASE: (forumId) => `/api/comments/${forumId}`,
    DETAIL: (forumId) => `/api/comments/${forumId}`,
  },
};

export default axiosInstance; 