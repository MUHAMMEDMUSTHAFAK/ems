import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ems-m1yv.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
