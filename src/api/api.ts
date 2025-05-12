import axios from "axios";

const api = axios.create({
  baseURL: "https://tortuga7-backend.onrender.com",
});

export default api;
