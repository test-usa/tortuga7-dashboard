import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

const useConsultations = () => {
  const {
    data: consultationsData = [],
    isLoading: consultationsLoading,
    refetch: consultationsRefetch,
  } = useQuery({
    queryKey: ["consultationsData"],
    queryFn: async () => {
      const res = await api.get(`/consultants`);
      return res.data;
    },
  });

  return { consultationsData, consultationsLoading, consultationsRefetch };
};

export default useConsultations;
