// productService.ts
import { Product } from "../types/type";
import api from "./api";


export const getProducts = async () => {
  const res = await api.get<{ success: boolean; data: Product[] }>("/custom-server-build");
  return res.data.data;
};

export const getProductById = async (id: string) => {
  const res = await api.get<{ success: boolean; data: Product }>(`/custom-server-build/${id}`);
  return res.data.data;
};

export const createProduct = async (product: Partial<Product>) => {
  const res = await api.post<{ success: boolean; data: Product }>("/custom-server-build", product);
  return res.data.data;
};

export const updateProduct = async (id: string, product: Partial<Product>) => {
  const res = await api.patch<{ success: boolean; data: Product }>(`/custom-server-build/${id}`, product);
  return res.data.data;
};

export const deleteProduct = async (id: string) => {
  const res = await api.delete<{ success: boolean }>(`/custom-server-build/${id}`);
  return res.data.success;
};
