import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // timeout: 10000, // Optional: Set a timeout limit
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token from cookies
axiosInstance.interceptors.request.use(
  (config) => {
    const userToken = Cookies.get('vestier-token'); // Get the token from cookies
    const token = userToken ? JSON.parse(userToken) : null;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Example: Clear token and redirect to login on unauthorized
      // Cookies.remove('vestier-token');
      // window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
