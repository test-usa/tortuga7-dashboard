import axios from 'axios';

const BASE_URL = 'https://tortuga7-backend.onrender.com';

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true, // if using cookies
// });

// Add token to every request if stored in localStorage
// axiosInstance.interceptors.request.use((config: any) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosInstance;



// api.ts


const api = axios.create({
  baseURL: "https://tortuga7-backend.onrender.com", // change accordingly
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
