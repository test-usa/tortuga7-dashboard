import axiosInstance from "./api";


export const getAllServices = async () => {
  const res = await axiosInstance.get('/services');
  return res.data;
};

export const createService = async (serviceData: any) => {
  const res = await axiosInstance.post('/services', serviceData);
  return res.data;
};
