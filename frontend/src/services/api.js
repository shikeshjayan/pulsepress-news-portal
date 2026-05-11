// Pre-configured Axios instance — sends cookies (JWT) with every request to the backend API
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
});

export default api;
