import { axiosInstance } from "./axios";

export const checkAuthAPI = async () => {
  const response = await axiosInstance.get("/api/v1/auth/check");

  return response.data;
};

export const loginAPI = async (data) => {
  const response = await axiosInstance.post("/api/v1/auth/login", data);

  return response.data;
};

export const registerAPI = async (data) => {
  const response = await axiosInstance.post("/api/v1/auth/register", data);

  return response.data;
};

export const updateUserProfileAPI = async (data) => {
  const response = await axiosInstance.put("/api/v1/auth/update-profile", data);

  return response.data.data;
}
