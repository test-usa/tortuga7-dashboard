import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

const useSingleProduct = (id: string) => {
  const {
    data: singleProductData = [],
    isLoading: singleProductLoading,
    refetch: singleProductRefetch,
  } = useQuery({
    queryKey: ["singleProductData", id],
    queryFn: async () => {
      const res = await api.get(`/products/${id}`);
      return res.data;
    },
  });

  return { singleProductData, singleProductLoading, singleProductRefetch };
};

export default useSingleProduct;
