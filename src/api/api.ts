import axios from "axios";

const api = axios.create({
  baseURL: "https://tortuga7-backend.onrender.com", // change accordingly
  // baseURL: "http://localhost:8000", // change accordingly
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export default api;
