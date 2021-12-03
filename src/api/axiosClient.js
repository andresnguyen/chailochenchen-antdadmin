import axios from 'axios';
import { API_URL, authStorageKeys } from '../constants';

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const ACCESS_TOKEN = localStorage.getItem(authStorageKeys.TOKEN);
    if (ACCESS_TOKEN) {
      config.headers.common['Authorization'] = 'Bearer ' + ACCESS_TOKEN;
    }

    // Do something before request is sent
    return config;
  },

  function (error) {
    // Do something with request error
    return Promise.reject(error); 
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
