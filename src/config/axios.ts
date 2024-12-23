import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface CacheEntry {
  timestamp: number;
  data: AxiosResponse;
}

// In-memory cache
const cache: Record<string, CacheEntry> = {};
const CACHE_TTL = 5 * 60 * 1000; // Time to live: 5 minutes

// Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Set your backend URL in .env
  withCredentials: true, // Enables cookie sharing
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const key = `${config.method}-${config.url}`;
    const cacheEntry = cache[key];

    if (cacheEntry && Date.now() - cacheEntry.timestamp < CACHE_TTL) {
      return Promise.reject({ __fromCache: true, response: cacheEntry.data });
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    const key = `${response.config.method}-${response.config.url}`;
    cache[key] = { timestamp: Date.now(), data: response };
    return response;
  },
  (error) => {
    if (error.__fromCache) {
      return Promise.resolve(error.response);
    }
    return Promise.reject(error);
  }
);

// Utility to clear cache (useful for logout or specific events)
export const clearCache = () => {
  Object.keys(cache).forEach((key) => delete cache[key]);
};

export default api;
