// src/api/axiosInstance.ts
import axios from "axios";
import { TMDB_BASE_URL } from "./constants";

export const apiClient = axios.create({
  baseURL: TMDB_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
