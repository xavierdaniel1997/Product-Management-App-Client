import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SERVER_ORIGIN;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});