import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

const useUsers = () => {
  const {
    data: usersData = [],
    isLoading: usersLoading,
    refetch: usersRefetch,
  } = useQuery({
    queryKey: ["usersData"],
    queryFn: async () => {
      const res = await api.get(`https://tortuga7-backend.onrender.com/users`);
      return res.data;
    },
  });

  return { usersData, usersLoading, usersRefetch };
};

export default useUsers;
