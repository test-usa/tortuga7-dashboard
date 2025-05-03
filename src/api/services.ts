import api from "./api";

export const getAllServices = async () => {
  const res = await api.get("/services");
  return res.data;
};

export const createService = async (serviceData: any) => {
  const res = await api.post("/services", serviceData);
  return res.data;
};
