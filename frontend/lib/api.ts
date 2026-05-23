import axios, { AxiosHeaders } from "axios";
import { useAuthStore } from "../store/authStore";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }
    (config.headers as AxiosHeaders).set(
      "Authorization",
      `Bearer ${accessToken}`
    );
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const { refreshToken, setTokens, logout } = useAuthStore.getState();

      if (!refreshToken) {
        logout();
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await axios.post(`${baseURL}/auth/refresh`, {
          refreshToken,
        });
        setTokens(refreshResponse.data.accessToken, refreshResponse.data.refreshToken);
        if (!original.headers) {
          original.headers = new AxiosHeaders();
        }
        (original.headers as AxiosHeaders).set(
          "Authorization",
          `Bearer ${refreshResponse.data.accessToken}`
        );
        return api(original);
      } catch (refreshError) {
        logout();
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
