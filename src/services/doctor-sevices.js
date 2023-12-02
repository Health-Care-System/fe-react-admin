import { useQuery } from "@tanstack/react-query";
import client from "../utils/auth";

export const useGetAllDoctors = () => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      try {
        const res = await client.get("/admins/doctors");
        return res.data.results;
      } catch (error) {
        console.error("Error fetching doctors:", error);
        throw new Error("Failed to fetch doctors");
      }
    },
  });
  return {
    data,
    isError,
    isPending,
    refetch,
  };
};
