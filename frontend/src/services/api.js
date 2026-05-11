// Pre-configured Axios instance — sends cookies (JWT) with every request to the backend API
import axios from "axios";

const api = axios.create({
  baseURL: "https://pulsepress-news-portal.onrender.com",
  withCredentials: true,
});

export default api;
