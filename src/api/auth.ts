// src/api/auth.ts
import axios from 'axios';

const BASE_URL = 'https://tortuga7-backend.onrender.com';

export const loginAdmin = async (email: string, password: string) => {
  const res = await axios.post(`${BASE_URL}/auth/signin`, {
    email,
    password,
  });
  return res.data;
};
