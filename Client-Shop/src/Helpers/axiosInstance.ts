// axiosInstance.ts
import axios from "axios";
import { toast } from "react-toastify";
import { deleteCookie, getCookie } from "../Helpers/CookieHelper";
import { BASE_URL } from "../Utils/constant";

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setHandleTokenRefresh = (handleTokenRefresh : () => void) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
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
};

export default axiosInstance;
