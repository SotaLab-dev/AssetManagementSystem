import axios from "axios";
import { getCsrfToken } from "../../utils/csrf";

const api = axios.create({
  baseURL: "/api", 
  withCredentials: true, // Cookie を送信
});

api.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken(); // Cookie から CSRF トークンを取得

  const isCsrfTarget = config.method &&
    ["post", "put", "patch", "delete"].includes(config.method) &&
    !config.url?.includes("/auth/login") &&
    !config.url?.includes("/auth/logout");

  if (isCsrfTarget && csrfToken) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }
  return config;
});

export default api;