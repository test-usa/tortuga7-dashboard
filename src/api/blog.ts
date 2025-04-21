import axios from 'axios';
import { Blog } from '../types/blog';


const BASE_URL = 'https://tortuga7-backend.onrender.com';

const accessToken = localStorage.getItem('accessToken');

export const fetchBlogs = async (): Promise<Blog[]> => {
  const res = await axios.get(`${BASE_URL}/blog`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

export const createBlog = async (blog: Blog) => {
  const res = await axios.post(`${BASE_URL}/blogs`, blog, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

export const updateBlog = async (id: string, blog: Blog) => {
  const res = await axios.put(`${BASE_URL}/blogs/${id}`, blog, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

export const deleteBlog = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/blogs/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};
