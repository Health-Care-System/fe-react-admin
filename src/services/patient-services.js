import { useQuery } from "@tanstack/react-query"
import client from "../utils/auth"

export const useGetAllDoctorTransaction = () => {
  const doctorTransaction = useQuery({
    queryKey: ['doctorTransaction'],
    queryFn: async () => {
      const res = await client.get('/consultDoctor');
      return res.data;
    }
  })
  return doctorTransaction;
}

export const useGetAllDrugTransaction = () => {
  const doctorTransaction = useQuery({
    queryKey: ['drugTransaction'],
    queryFn: async () => {
      const res = await client.get('/drugTransaction');
      return res.data;
    }
  })
  return doctorTransaction;
}
export const useGetAllPatients = () => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      const res = await client.get('/patients');
      return res.data;
    }
  })
  return {
    data,
    isError,
    isPending,
    refetch
  };
}