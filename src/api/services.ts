// import axiosInstance from "./api";


// export const getAllServices = async () => {
//   const res = await axiosInstance.get('/services');
//   return res.data;
// };

// export const createService = async (serviceData: any) => {
//   const res = await axiosInstance.post('/services', serviceData);
//   return res.data;
// };



// apiService.js
import axios from 'axios';

// This will hold the base URL for your backend
const BACKEND_URL = 'https://tortuga7-backend.onrender.com';

export const getServices = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}`);
    return response.data;  // Return the fetched data
  } catch (error: any) {
    console.error('Error fetching services:', error.message);
    throw new Error('Error fetching services');  // Throw an error to handle it on the component side
  }
};
