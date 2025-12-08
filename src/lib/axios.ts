import axios from 'axios';
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


// Attach access token to each request
api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.user?.accessToken) {
    config.headers.Authorization = `Bearer ${session.user.accessToken}`;
  }

  return config;
});

// Handle 401 -> trigger NextAuth token refresh
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // Already retried once?
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Force NextAuth to refresh session (runs jwt callback)
      await fetch("/api/auth/session?update");

      // Retry request with new accessToken
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);