import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

const useProducts = (id: string) => {
  const {
    data: productsData = [],
    isLoading: productsLoading,
    refetch: productsRefetch,
  } = useQuery({
    queryKey: ["productsData", id],
    queryFn: async () => {
      const res = await api.get(`/services/${id}`);
      return res.data.products;
    },
  });

  return { productsData, productsLoading, productsRefetch };
};

export default useProducts;
