import { useQuery } from "@tanstack/react-query";
import client from "../utils/auth";

export const useGetQuery = (key, endpoint) => {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await client.get(endpoint);
      return res.data;
    },
  });
};

// cara memakainya cukup dengan:
// const {
//   data,
//   isPending,
//   isError,
//   refetch
// } = useGetQuery('namaKeyYangUnik', '/endpoint')
