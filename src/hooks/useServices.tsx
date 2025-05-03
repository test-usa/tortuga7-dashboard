import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

const useServices = () => {
  const {
    data: servicesData = [],
    isLoading: servicesLoading,
    refetch: servicesRefetch,
  } = useQuery({
    queryKey: ["servicesData"],
    queryFn: async () => {
      const res = await api.get(`/services`);
      return res.data;
    },
  });

  return { servicesData, servicesLoading, servicesRefetch };
};

export default useServices;
