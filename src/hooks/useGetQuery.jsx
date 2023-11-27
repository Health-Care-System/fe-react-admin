import { useQuery } from "@tanstack/react-query";
import client from "../utils/auth";

export const useGetQuery = ( key, endpoint) => {
  const { data, isPending, isError,refetch } = useQuery({
		queryKey: [key],
		queryFn: async () => {
			const res = await client.get(endpoint);
			return res.data;
		}
	});
	return {
		data,
		isPending,
		isError,
		refetch
	}
}

// cara memakainya cukup dengan:
// const {
//   data,
//   isPending,
//   isError,
//   refetch
// } = useGetQuery('namaKeyYangUnik', '/endpoint')