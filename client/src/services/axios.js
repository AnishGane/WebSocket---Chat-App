import { ENV_VAR } from "@/utils/env";
import axios from "axios";
import { getToken } from "./token";

export const axiosInstance = axios.create({
  baseURL: ENV_VAR.BACKEND_URL,
});

// Attach token automatically
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
