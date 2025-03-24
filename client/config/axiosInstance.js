import axios from 'axios';
import { useSelector } from 'react-redux';

// Define the base URL for your API
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Create a function to set up the axios instance
const createAxiosInstance = (token) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  // Interceptor to add the token to the headers
  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

// Export a custom hook to use the axios instance with the token
export const useAxiosInstance = () => {
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser?.accessToken;
  return createAxiosInstance(token);
};
