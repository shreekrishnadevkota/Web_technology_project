import axios from "axios";

// Share the configured API URL and send the HTTP-only login cookie on requests.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default api;