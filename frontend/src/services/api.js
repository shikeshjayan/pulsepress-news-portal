// Pre-configured Axios instance — sends cookies (JWT) with every request to the backend API
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL.endsWith("/api") ? BASE_URL : `${BASE_URL}/api`,
  withCredentials: true,
});

export default api;
