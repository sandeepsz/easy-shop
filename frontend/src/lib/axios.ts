import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.mode === "development" ? "http://localhost:8000/api" : "/api",
  withCredentials: true, // send cookies to the server
});

export const isAxiosError = axios.isAxiosError;

export default axiosInstance;
