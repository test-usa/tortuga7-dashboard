import axios from "axios";

const api = axios.create({
  baseURL: "https://tortuga7-backend.onrender.com", // change accordingly
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
