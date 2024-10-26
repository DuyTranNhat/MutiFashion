// axiosInstance.ts
import axios from "axios";
import { toast } from "react-toastify";
import { deleteCookie, getCookie } from "../Helpers/CookieHelper";
import { BASE_URL } from "../Utils/constant";
import { useAuth } from "../Context/UseAuth";

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`, // Set your base API URL here
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
        const { handleTokenRefresh } = useAuth()
      try {
        await handleTokenRefresh();
        return axiosInstance(error.config); 
      } catch (refreshError) {
        toast.error("Session expired. Please log in again.");
        deleteCookie("accessToken");
        window.location.href = "/login";
      }
    } else {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;