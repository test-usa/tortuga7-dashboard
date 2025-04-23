import axios from 'axios';
import { Blog, BlogResponse } from '../types/blog';


const BASE_URL = 'https://tortuga7-backend.onrender.com';
const API_URL = 'https://tortuga7-backend.onrender.com/blog';


const accessToken = localStorage.getItem('accessToken');

export const fetchBlogs = async (): Promise<BlogResponse> => {
  const res = await axios.get(`${BASE_URL}/blog`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

// export const createBlog = async (blog: Blog) => {
//   const res = await axios.post(`${BASE_URL}/blog`, blog, {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });
//   return res.data;
// };

export const createBlog = async (blog: Blog): Promise<Blog> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blog),
  });

  if (!response.ok) {
    throw new Error('Failed to create blog');
  }

  const data = await response.json();
  return data;
};

export const updateBlog = async (id: string, blog: Blog) => {
  const res = await axios.put(`${BASE_URL}/blog/${id}`, blog, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

export const deleteBlog = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/blog/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};
