import axios from "axios";

const api = axios.create({
  baseURL: "/api", 
  withCredentials: true, // Cookie を送信
});

export default api;