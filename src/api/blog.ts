import axiosInstance from "./api";


export const getAllBlogs = async () => {
  const res = await axiosInstance.get('/blogs');
  console.log(res)
  return res.data;
};

export const createService = async (blogsData: any) => {
  const res = await axiosInstance.post('/blogs', blogsData);
  return res.data;
};
